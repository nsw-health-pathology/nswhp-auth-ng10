import { __awaiter } from "tslib";
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as HttpStatus from 'http-status-codes';
import { EMPTY, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NswhpAuthService } from '../nswhpauth.service';
import { AadService } from './aad.service';
import { IaDfpService } from './iadfp.service';
import { StorageService } from './storage.service';
import * as i0 from "@angular/core";
import * as i1 from "./aad.service";
import * as i2 from "./storage.service";
import * as i3 from "@angular/router";
import * as i4 from "@angular/common/http";
import * as i5 from "./iadfp.service";
import * as i6 from "../nswhpauth.service";
export class AuthenticationInterceptorService {
    constructor(aadService, storageService, router, http, iaDfpService, nswhpAuthService) {
        this.aadService = aadService;
        this.storageService = storageService;
        this.router = router;
        this.http = http;
        this.iaDfpService = iaDfpService;
        this.nswhpAuthService = nswhpAuthService;
        this.AAD_TOKEN_HEADER = 'AuthorizationAD';
        this.VIP_TOKEN_HEADER = 'AuthorizationVIP';
        this.domain = this.nswhpAuthService.nswhpAuthOptions.vip.domain;
        this.stepUpPath = this.nswhpAuthService.nswhpAuthOptions.vip.stepUpPath;
    }
    intercept(request, next) {
        request = this.addAuthHeaders(request);
        return next.handle(request).pipe(catchError(this.handleError.bind(this)));
    }
    addAuthHeaders(request) {
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE',
            'Access-Control-Max-Age': '3600',
            'Access-Control-Allow-Headers': 'x-requested-with'
        };
        // These have been added separately since string interpolation is not supported for object keys
        const aadToken = this.aadService.retrieveAadToken();
        if (aadToken) {
            headers[this.AAD_TOKEN_HEADER] = aadToken;
        }
        const vipToken = this.storageService.retrieveVipToken();
        if (vipToken) {
            headers[this.VIP_TOKEN_HEADER] = vipToken;
        }
        request = request.clone({
            setHeaders: headers
        });
        return request;
    }
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     *                    USER AUTHORIZATION LOGIC [401]                     *
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    // If the user is unable to reach the API endpoint we must ensure they are authenticated.
    // The user is first authenticated with Azure AD
    //     - If the user does not have a valid AAD token we redirect them to login to Azure AD
    // The user is then required to have a VIP token
    //     - The '/stepup' endpoint must be called and then the following may happen:
    //         + If the user is not risky then we are immediately provided with the VIP token
    //         + If the user is risky then they are redirect to the provided MFA medium (push or otp)
    //             = NOTE: If the user is redirect to push or otp they will be redirected
    //                     back home once they have a valid VIP token
    handleUserAuthorization(error) {
        return __awaiter(this, void 0, void 0, function* () {
            // Store the user context so we can return here after handling the 401
            this.storageService.storeLastLocation();
            // Check if the user is authenticated with Azure:
            //      If they are, we have a valid AAD Token and we can continue.
            //      If they are not, we redirect them to the Azure login page and leave
            //       them there until they successfully login. They will then be redirected to the home page
            if (this.isNewAadTokenRequired(error)) {
                yield this.router.navigate(['authentication/login']);
            }
            else {
                this.getVipToken();
            }
        });
    }
    handleError(error) {
        return __awaiter(this, void 0, void 0, function* () {
            // Handle Unauthorized error globally
            // AuthService will handle other 400 errors
            switch (error.status) {
                case HttpStatus.UNAUTHORIZED:
                    console.debug('401 received, redirecting to login');
                    yield this.handleUserAuthorization(error);
                    break;
                case HttpStatus.FORBIDDEN:
                    console.debug('403 received in AuthenticationInterceptor, redirecting to contact admin');
                    yield this.router.navigate(['/authentication/contact-admin']);
                    return EMPTY;
                default:
                    return throwError(error);
            }
        });
    }
    /**
     * If the error contains 'VIP' then we assume the AAD token is being successfully used
     * and that the 401 is caused by a missing or invalid VIP token
     * @param HttpErrorResponse returned by the call
     */
    isNewAadTokenRequired(error) {
        let required = true;
        const re = /(vip|VIP)/;
        if (error.error.message.search(re) !== -1) {
            required = false;
        }
        return required;
    }
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     *                             VIP TOKEN                                 *
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    /**
     * Initiates the steps to retrieve a VIP token from the server
     */
    getVipToken() {
        console.debug('Requesting new VIP Token...');
        this.stepUpAuthentication().subscribe((response) => __awaiter(this, void 0, void 0, function* () {
            this.logStepUpResponse(response);
            yield this.handleStepUpAuthentication(response);
        }), (error) => __awaiter(this, void 0, void 0, function* () {
            // NOTE: We specifically handle 403 and 404 errors here
            // Only 401 is handled globally. Other Auth related http calls
            // are made in AuthService that handles the other 400 errors.
            // Forbidden - Contact an admin (requestId)
            if (error.status === HttpStatus.FORBIDDEN) {
                console.error('403 received');
                // TODO: This
                yield this.handleContactAdmin(error);
                return EMPTY;
            }
            else if (error.status === HttpStatus.NOT_FOUND) {
                console.error('404 received');
                yield this.handleRegistration(error);
                return EMPTY;
            }
            else {
                yield this.handleError(error);
            }
        }));
    }
    stepUpAuthentication() {
        console.debug('User required to step up authentication: ');
        // We can assume that if we are requesting a VIP token we already have a valid AAD Token
        const authorization = this.aadService.retrieveAadToken();
        const newHeaders = new HttpHeaders().set(this.AAD_TOKEN_HEADER, authorization);
        const options = {
            headers: newHeaders,
            observe: 'response'
        };
        const newDeviceFingerprint = this.iaDfpService.IaDfp.readFingerprint();
        const json = {
            deviceFingerprint: newDeviceFingerprint
        };
        const body = JSON.stringify(json);
        const url = this.domain + this.stepUpPath;
        console.debug('Sending request: ');
        console.debug('- url: ' + url);
        console.debug('- authorization: ' + authorization);
        console.debug('- body: ' + body);
        return this.http.post(url, body, options);
    }
    handleStepUpAuthentication(response) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = response.body;
            console.debug(response);
            console.debug(res);
            // Store transactionId
            this.storageService.storeTransactionId(res.transactionId);
            // If the user is not risky we can immediately return the provided VIP Token
            // TODO: remove risky from response
            if (res.risky) {
                console.debug('User is required to use Multi-Factor Authentication');
                console.debug(`Redirecting user to ${res.medium} page...`);
                // Wait for the user to press the next button before routing to mfa page
                yield this.router.navigate([`/authentication/${res.medium.toString().toLowerCase()}`]);
            }
            else {
                // Store the token locally
                this.storageService.storeVipToken(res.vipToken);
                location.reload();
            }
        });
    }
    logStepUpResponse(response) {
        console.debug(response);
        console.debug('\'risky\': ' + response.body.risky);
        console.debug('\'requestId\': ' + response.body.requestId);
        console.debug('\'medium\': ' + response.body.medium);
        console.debug('\'transactionId\': ' + response.body.transactionId);
        console.debug('\'vipToken\': ' + response.body.vipToken);
    }
    //  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    //      *                        INTERCEPT REQUEST HEADERS                      *
    //      * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    //     // Custom headers with AAD and VIP authorization tokens
    //     getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
    //       if (options == null) {
    //           options = new RequestOptions();
    //       }
    //       if (options.headers == null) {
    //           options.headers = new Headers();
    //       }
    //       options.headers.append('Content-Type', 'application/json');
    //       // Default headers
    //       options.headers.append('Access-Control-Allow-Origin', '*');
    //       options.headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE');
    //       options.headers.append('Access-Control-Max-Age', '3600');
    //       options.headers.append('Access-Control-Allow-Headers', 'x-requested-with');
    //       // NOTE: The error interceptor handles updating the authorization tokens when we get a 401
    //       // AAD Token
    //       const authorization = this.aadService.retrieveAadToken();
    //       options.headers.append(this.AAD_TOKEN_HEADER, authorization);
    //       // VIP Token
    //       const authorizationVip = this.storage.retrieveVipToken();
    //       options.headers.append(this.VIP_TOKEN_HEADER,  authorizationVip);
    //       return options;
    //   }
    //   /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    //    *                    USER AUTHORIZATION LOGIC [401]                     *
    //    * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    //    // If the user is unable to reach the API endpoint we must ensure they are authenticated.
    //    // The user is first authenticated with Azure AD
    //    //     - If the user does not have a valid AAD token we redirect them to login to Azure AD
    //    // The user is then required to have a VIP token
    //    //     - The '/stepup' endpoint must be called and then the following may happen:
    //    //         + If the user is not risky then we are immediately provided with the VIP token
    //    //         + If the user is risky then they are redirect to the provided MFA medium (push or otp)
    //    //             = NOTE: If the user is redirect to push or otp they will be redirected
    //    //                     back home once they have a valid VIP token
    //    private handleUserAuthorization(error: Response) {
    //        // Store the user context so we can return here after handling the 401
    //        this.storage.storeLastLocation();
    //        // Check if the user is authenticated with Azure:
    //        //      If they are, we have a valid AAD Token and we can continue.
    //        //      If they are not, we redirect them to the Azure login page and leave
    //        //       them there until they successfully login. They will then be redirected to the home page
    //        if (this.checkNewAadTokenIsRequired(error)) {
    //            this.getAadToken();
    //        } else {
    //            this.getVipToken();
    //        }
    //    }
    //   /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    //    *                             AAD TOKEN                                 *
    //    * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    //   // If the 401 error response message contains 'VIP' then we know that the user
    //   // either did not proved an AAD token or the provided AAD token is invalid.
    //   // If the message does NOT contain 'VIP' then the provided AAD token was valid
    //   // and we may simple return the currently stored AAD token.
    //   private getAadToken() {
    //       // If the user has selected an Azure instance then we can simply return
    //       // their AAD token otherwise we redirect them to the /login page
    //       // TODO: DH - Look into this, is there a missing line below? Code doesn't match the comments
    //       if (this.storage.retrieveAzureInstance()) {
    //           console.debug('User has already selected an Azure instance. Redirecting to Azure login page...');
    //       } else {
    //           console.debug('User has already NOT selected an Azure instance yet. Redirecting user to login page...');
    //       }
    //       // Always send the user to select an Azure instance to log in to.
    //       // (even if they have previously selected an Azure instance)
    //       this.router.navigate(['/authentication/login']);
    //   }
    //   // When the error message contains 'VIP' we know the AAD token was valid and we can just return it
    //   private checkNewAadTokenIsRequired(error: Response) {
    //       let required = true;
    //       const re = /(vip|VIP)/;
    //       if (error.json().message.search(re) !== -1) {
    //           required = false;
    //       }
    //       return required;
    //   }
    //   /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    //    *                       CONTACT ADMIN LOGIC [403]                       *
    //    * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    handleContactAdmin(error) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = error;
            console.debug('Handling Operation Not Allowed');
            console.debug('User is unable to continue authorization process.');
            console.debug(body.error);
            console.debug('Redirecting user to contact admin page...');
            yield this.router.navigate(['/authentication/contact-admin /' + body.requestId]);
        });
    }
    //    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    //     *                       REGISTRATION LOGIC [404]                        *
    //     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    handleRegistration(error) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = error;
            console.debug('Handling Registration');
            console.debug('User has not yet registered with VIP');
            console.debug(body.error);
            console.debug('Redirecting user to registration page...');
            yield this.router.navigate(['/authentication/register']);
        });
    }
}
AuthenticationInterceptorService.ɵprov = i0.ɵɵdefineInjectable({ factory: function AuthenticationInterceptorService_Factory() { return new AuthenticationInterceptorService(i0.ɵɵinject(i1.AadService), i0.ɵɵinject(i2.StorageService), i0.ɵɵinject(i3.Router), i0.ɵɵinject(i4.HttpClient), i0.ɵɵinject(i5.IaDfpService), i0.ɵɵinject(i6.NswhpAuthService)); }, token: AuthenticationInterceptorService, providedIn: "root" });
AuthenticationInterceptorService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
AuthenticationInterceptorService.ctorParameters = () => [
    { type: AadService },
    { type: StorageService },
    { type: Router },
    { type: HttpClient },
    { type: IaDfpService },
    { type: NswhpAuthService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXV0aGVudGljYXRpb25JbnRlcmNlcHRvci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IkM6L1Byb2plY3RzL25zd2hwYXV0aC1tb2R1bGUvcHJvamVjdHMvbnN3aHBhdXRoL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9BdXRoZW50aWNhdGlvbkludGVyY2VwdG9yLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxVQUFVLEVBSVYsV0FBVyxHQUlaLE1BQU0sc0JBQXNCLENBQUM7QUFDOUIsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxLQUFLLFVBQVUsTUFBTSxtQkFBbUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsS0FBSyxFQUFjLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNyRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFJNUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7Ozs7OztBQUtuRCxNQUFNLE9BQU8sZ0NBQWdDO0lBSzNDLFlBQ1UsVUFBc0IsRUFDdEIsY0FBOEIsRUFDOUIsTUFBYyxFQUNkLElBQWdCLEVBQ2hCLFlBQTBCLEVBQzFCLGdCQUFrQztRQUxsQyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixx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RyxLQUFLLENBQUM7WUFFbkIsT0FBTyxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1lBRXZDLE9BQU8sQ0FBQyxLQUFLLENBQUMsc0NBQXNDLENBQUMsQ0FBQztZQUN0RCxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMxQixPQUFPLENBQUMsS0FBSyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7WUFFMUQsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLDBCQUEwQixDQUFDLENBQUMsQ0FBQztRQUMzRCxDQUFDO0tBQUE7Ozs7WUEvVkYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7WUFOUSxVQUFVO1lBRVYsY0FBYztZQVZkLE1BQU07WUFWYixVQUFVO1lBbUJILFlBQVk7WUFGWixnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIEh0dHBDbGllbnQsXHJcbiAgSHR0cEVycm9yUmVzcG9uc2UsXHJcbiAgSHR0cEV2ZW50LFxyXG4gIEh0dHBIYW5kbGVyLFxyXG4gIEh0dHBIZWFkZXJzLFxyXG4gIEh0dHBJbnRlcmNlcHRvcixcclxuICBIdHRwUmVxdWVzdCxcclxuICBIdHRwUmVzcG9uc2UsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCAqIGFzIEh0dHBTdGF0dXMgZnJvbSAnaHR0cC1zdGF0dXMtY29kZXMnO1xyXG5pbXBvcnQgeyBFTVBUWSwgT2JzZXJ2YWJsZSwgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBjYXRjaEVycm9yIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgSU1mYU1lc3NhZ2UgfSBmcm9tICcuLi9tb2RlbC9tZmFNZXNzYWdlJztcclxuaW1wb3J0IHsgVmlwSHR0cEVycm9yUmVzb25zZSB9IGZyb20gJy4uL21vZGVsL3ZpcEh0dHBFcnJvclJlc3BvbnNlJztcclxuaW1wb3J0IHsgTnN3aHBBdXRoU2VydmljZSB9IGZyb20gJy4uL25zd2hwYXV0aC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQWFkU2VydmljZSB9IGZyb20gJy4vYWFkLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJYURmcFNlcnZpY2UgfSBmcm9tICcuL2lhZGZwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTdG9yYWdlU2VydmljZSB9IGZyb20gJy4vc3RvcmFnZS5zZXJ2aWNlJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIEF1dGhlbnRpY2F0aW9uSW50ZXJjZXB0b3JTZXJ2aWNlIGltcGxlbWVudHMgSHR0cEludGVyY2VwdG9yIHtcclxuICBwcml2YXRlIEFBRF9UT0tFTl9IRUFERVIgPSAnQXV0aG9yaXphdGlvbkFEJztcclxuICBwcml2YXRlIFZJUF9UT0tFTl9IRUFERVIgPSAnQXV0aG9yaXphdGlvblZJUCc7XHJcbiAgcHJpdmF0ZSBkb21haW46IHN0cmluZztcclxuICBwcml2YXRlIHN0ZXBVcFBhdGg6IHN0cmluZztcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgYWFkU2VydmljZTogQWFkU2VydmljZSxcclxuICAgIHByaXZhdGUgc3RvcmFnZVNlcnZpY2U6IFN0b3JhZ2VTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcclxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcclxuICAgIHByaXZhdGUgaWFEZnBTZXJ2aWNlOiBJYURmcFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIG5zd2hwQXV0aFNlcnZpY2U6IE5zd2hwQXV0aFNlcnZpY2VcclxuICApIHtcclxuICAgIHRoaXMuZG9tYWluID0gdGhpcy5uc3docEF1dGhTZXJ2aWNlLm5zd2hwQXV0aE9wdGlvbnMudmlwLmRvbWFpbjtcclxuICAgIHRoaXMuc3RlcFVwUGF0aCA9IHRoaXMubnN3aHBBdXRoU2VydmljZS5uc3docEF1dGhPcHRpb25zLnZpcC5zdGVwVXBQYXRoO1xyXG4gIH1cclxuXHJcbiAgaW50ZXJjZXB0KHJlcXVlc3Q6IEh0dHBSZXF1ZXN0PEh0dHBBdXRoUmVxdWVzdD4sIG5leHQ6IEh0dHBIYW5kbGVyKTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4ge1xyXG5cclxuICAgIHJlcXVlc3QgPSB0aGlzLmFkZEF1dGhIZWFkZXJzKHJlcXVlc3QpO1xyXG5cclxuICAgIHJldHVybiBuZXh0LmhhbmRsZShyZXF1ZXN0KS5waXBlKFxyXG4gICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IuYmluZCh0aGlzKSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYWRkQXV0aEhlYWRlcnMocmVxdWVzdDogSHR0cFJlcXVlc3Q8SHR0cEF1dGhSZXF1ZXN0Pikge1xyXG4gICAgY29uc3QgaGVhZGVyczoge1xyXG4gICAgICBbaW5kZXg6IHN0cmluZ106IHN0cmluZ1xyXG4gICAgfSA9IHtcclxuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6ICcqJyxcclxuICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU1ldGhvZHMnOiAnUE9TVCwgR0VULCBPUFRJT05TLCBERUxFVEUnLFxyXG4gICAgICAnQWNjZXNzLUNvbnRyb2wtTWF4LUFnZSc6ICczNjAwJyxcclxuICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnMnOiAneC1yZXF1ZXN0ZWQtd2l0aCdcclxuICAgIH07XHJcblxyXG4gICAgLy8gVGhlc2UgaGF2ZSBiZWVuIGFkZGVkIHNlcGFyYXRlbHkgc2luY2Ugc3RyaW5nIGludGVycG9sYXRpb24gaXMgbm90IHN1cHBvcnRlZCBmb3Igb2JqZWN0IGtleXNcclxuICAgIGNvbnN0IGFhZFRva2VuID0gdGhpcy5hYWRTZXJ2aWNlLnJldHJpZXZlQWFkVG9rZW4oKTtcclxuICAgIGlmIChhYWRUb2tlbikge1xyXG4gICAgICBoZWFkZXJzW3RoaXMuQUFEX1RPS0VOX0hFQURFUl0gPSBhYWRUb2tlbjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB2aXBUb2tlbiA9IHRoaXMuc3RvcmFnZVNlcnZpY2UucmV0cmlldmVWaXBUb2tlbigpO1xyXG4gICAgaWYgKHZpcFRva2VuKSB7XHJcbiAgICAgIGhlYWRlcnNbdGhpcy5WSVBfVE9LRU5fSEVBREVSXSA9ICh2aXBUb2tlbiBhcyBzdHJpbmcpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlcXVlc3QgPSByZXF1ZXN0LmNsb25lKHtcclxuICAgICAgc2V0SGVhZGVyczogaGVhZGVyc1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHJlcXVlc3Q7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICpcclxuICAgKiAgICAgICAgICAgICAgICAgICAgVVNFUiBBVVRIT1JJWkFUSU9OIExPR0lDIFs0MDFdICAgICAgICAgICAgICAgICAgICAgKlxyXG4gICAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqL1xyXG5cclxuICAvLyBJZiB0aGUgdXNlciBpcyB1bmFibGUgdG8gcmVhY2ggdGhlIEFQSSBlbmRwb2ludCB3ZSBtdXN0IGVuc3VyZSB0aGV5IGFyZSBhdXRoZW50aWNhdGVkLlxyXG4gIC8vIFRoZSB1c2VyIGlzIGZpcnN0IGF1dGhlbnRpY2F0ZWQgd2l0aCBBenVyZSBBRFxyXG4gIC8vICAgICAtIElmIHRoZSB1c2VyIGRvZXMgbm90IGhhdmUgYSB2YWxpZCBBQUQgdG9rZW4gd2UgcmVkaXJlY3QgdGhlbSB0byBsb2dpbiB0byBBenVyZSBBRFxyXG4gIC8vIFRoZSB1c2VyIGlzIHRoZW4gcmVxdWlyZWQgdG8gaGF2ZSBhIFZJUCB0b2tlblxyXG4gIC8vICAgICAtIFRoZSAnL3N0ZXB1cCcgZW5kcG9pbnQgbXVzdCBiZSBjYWxsZWQgYW5kIHRoZW4gdGhlIGZvbGxvd2luZyBtYXkgaGFwcGVuOlxyXG4gIC8vICAgICAgICAgKyBJZiB0aGUgdXNlciBpcyBub3Qgcmlza3kgdGhlbiB3ZSBhcmUgaW1tZWRpYXRlbHkgcHJvdmlkZWQgd2l0aCB0aGUgVklQIHRva2VuXHJcbiAgLy8gICAgICAgICArIElmIHRoZSB1c2VyIGlzIHJpc2t5IHRoZW4gdGhleSBhcmUgcmVkaXJlY3QgdG8gdGhlIHByb3ZpZGVkIE1GQSBtZWRpdW0gKHB1c2ggb3Igb3RwKVxyXG4gIC8vICAgICAgICAgICAgID0gTk9URTogSWYgdGhlIHVzZXIgaXMgcmVkaXJlY3QgdG8gcHVzaCBvciBvdHAgdGhleSB3aWxsIGJlIHJlZGlyZWN0ZWRcclxuICAvLyAgICAgICAgICAgICAgICAgICAgIGJhY2sgaG9tZSBvbmNlIHRoZXkgaGF2ZSBhIHZhbGlkIFZJUCB0b2tlblxyXG4gIHByaXZhdGUgYXN5bmMgaGFuZGxlVXNlckF1dGhvcml6YXRpb24oZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKSB7XHJcbiAgICAvLyBTdG9yZSB0aGUgdXNlciBjb250ZXh0IHNvIHdlIGNhbiByZXR1cm4gaGVyZSBhZnRlciBoYW5kbGluZyB0aGUgNDAxXHJcbiAgICB0aGlzLnN0b3JhZ2VTZXJ2aWNlLnN0b3JlTGFzdExvY2F0aW9uKCk7XHJcblxyXG4gICAgLy8gQ2hlY2sgaWYgdGhlIHVzZXIgaXMgYXV0aGVudGljYXRlZCB3aXRoIEF6dXJlOlxyXG4gICAgLy8gICAgICBJZiB0aGV5IGFyZSwgd2UgaGF2ZSBhIHZhbGlkIEFBRCBUb2tlbiBhbmQgd2UgY2FuIGNvbnRpbnVlLlxyXG4gICAgLy8gICAgICBJZiB0aGV5IGFyZSBub3QsIHdlIHJlZGlyZWN0IHRoZW0gdG8gdGhlIEF6dXJlIGxvZ2luIHBhZ2UgYW5kIGxlYXZlXHJcbiAgICAvLyAgICAgICB0aGVtIHRoZXJlIHVudGlsIHRoZXkgc3VjY2Vzc2Z1bGx5IGxvZ2luLiBUaGV5IHdpbGwgdGhlbiBiZSByZWRpcmVjdGVkIHRvIHRoZSBob21lIHBhZ2VcclxuICAgIGlmICh0aGlzLmlzTmV3QWFkVG9rZW5SZXF1aXJlZChlcnJvcikpIHtcclxuICAgICAgYXdhaXQgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWydhdXRoZW50aWNhdGlvbi9sb2dpbiddKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZ2V0VmlwVG9rZW4oKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXN5bmMgaGFuZGxlRXJyb3IoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKSB7XHJcbiAgICAvLyBIYW5kbGUgVW5hdXRob3JpemVkIGVycm9yIGdsb2JhbGx5XHJcbiAgICAvLyBBdXRoU2VydmljZSB3aWxsIGhhbmRsZSBvdGhlciA0MDAgZXJyb3JzXHJcbiAgICBzd2l0Y2ggKGVycm9yLnN0YXR1cykge1xyXG4gICAgICBjYXNlIEh0dHBTdGF0dXMuVU5BVVRIT1JJWkVEOlxyXG4gICAgICAgIGNvbnNvbGUuZGVidWcoJzQwMSByZWNlaXZlZCwgcmVkaXJlY3RpbmcgdG8gbG9naW4nKTtcclxuICAgICAgICBhd2FpdCB0aGlzLmhhbmRsZVVzZXJBdXRob3JpemF0aW9uKGVycm9yKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBIdHRwU3RhdHVzLkZPUkJJRERFTjpcclxuICAgICAgICBjb25zb2xlLmRlYnVnKCc0MDMgcmVjZWl2ZWQgaW4gQXV0aGVudGljYXRpb25JbnRlcmNlcHRvciwgcmVkaXJlY3RpbmcgdG8gY29udGFjdCBhZG1pbicpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2F1dGhlbnRpY2F0aW9uL2NvbnRhY3QtYWRtaW4nXSk7XHJcbiAgICAgICAgcmV0dXJuIEVNUFRZO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGVycm9yKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIElmIHRoZSBlcnJvciBjb250YWlucyAnVklQJyB0aGVuIHdlIGFzc3VtZSB0aGUgQUFEIHRva2VuIGlzIGJlaW5nIHN1Y2Nlc3NmdWxseSB1c2VkXHJcbiAgICogYW5kIHRoYXQgdGhlIDQwMSBpcyBjYXVzZWQgYnkgYSBtaXNzaW5nIG9yIGludmFsaWQgVklQIHRva2VuXHJcbiAgICogQHBhcmFtIEh0dHBFcnJvclJlc3BvbnNlIHJldHVybmVkIGJ5IHRoZSBjYWxsXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBpc05ld0FhZFRva2VuUmVxdWlyZWQoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKSB7XHJcbiAgICBsZXQgcmVxdWlyZWQgPSB0cnVlO1xyXG4gICAgY29uc3QgcmUgPSAvKHZpcHxWSVApLztcclxuICAgIGlmIChlcnJvci5lcnJvci5tZXNzYWdlLnNlYXJjaChyZSkgIT09IC0xKSB7XHJcbiAgICAgIHJlcXVpcmVkID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlcXVpcmVkO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqXHJcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgIFZJUCBUT0tFTiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcclxuICAgKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKi9cclxuXHJcbiAgLyoqXHJcbiAgICogSW5pdGlhdGVzIHRoZSBzdGVwcyB0byByZXRyaWV2ZSBhIFZJUCB0b2tlbiBmcm9tIHRoZSBzZXJ2ZXJcclxuICAgKi9cclxuICBwcml2YXRlIGdldFZpcFRva2VuKCkge1xyXG4gICAgY29uc29sZS5kZWJ1ZygnUmVxdWVzdGluZyBuZXcgVklQIFRva2VuLi4uJyk7XHJcblxyXG4gICAgdGhpcy5zdGVwVXBBdXRoZW50aWNhdGlvbigpLnN1YnNjcmliZShcclxuICAgICAgYXN5bmMgcmVzcG9uc2UgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nU3RlcFVwUmVzcG9uc2UocmVzcG9uc2UpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuaGFuZGxlU3RlcFVwQXV0aGVudGljYXRpb24ocmVzcG9uc2UpO1xyXG4gICAgICB9LFxyXG4gICAgICBhc3luYyBlcnJvciA9PiB7XHJcbiAgICAgICAgLy8gTk9URTogV2Ugc3BlY2lmaWNhbGx5IGhhbmRsZSA0MDMgYW5kIDQwNCBlcnJvcnMgaGVyZVxyXG4gICAgICAgIC8vIE9ubHkgNDAxIGlzIGhhbmRsZWQgZ2xvYmFsbHkuIE90aGVyIEF1dGggcmVsYXRlZCBodHRwIGNhbGxzXHJcbiAgICAgICAgLy8gYXJlIG1hZGUgaW4gQXV0aFNlcnZpY2UgdGhhdCBoYW5kbGVzIHRoZSBvdGhlciA0MDAgZXJyb3JzLlxyXG5cclxuICAgICAgICAvLyBGb3JiaWRkZW4gLSBDb250YWN0IGFuIGFkbWluIChyZXF1ZXN0SWQpXHJcbiAgICAgICAgaWYgKGVycm9yLnN0YXR1cyA9PT0gSHR0cFN0YXR1cy5GT1JCSURERU4pIHtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJzQwMyByZWNlaXZlZCcpO1xyXG4gICAgICAgICAgLy8gVE9ETzogVGhpc1xyXG4gICAgICAgICAgYXdhaXQgdGhpcy5oYW5kbGVDb250YWN0QWRtaW4oZXJyb3IpO1xyXG4gICAgICAgICAgcmV0dXJuIEVNUFRZO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZXJyb3Iuc3RhdHVzID09PSBIdHRwU3RhdHVzLk5PVF9GT1VORCkge1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcignNDA0IHJlY2VpdmVkJyk7XHJcbiAgICAgICAgICBhd2FpdCB0aGlzLmhhbmRsZVJlZ2lzdHJhdGlvbihlcnJvcik7XHJcbiAgICAgICAgICByZXR1cm4gRU1QVFk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGF3YWl0IHRoaXMuaGFuZGxlRXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc3RlcFVwQXV0aGVudGljYXRpb24oKTogT2JzZXJ2YWJsZTxIdHRwUmVzcG9uc2U8SU1mYU1lc3NhZ2U+PiB7XHJcbiAgICBjb25zb2xlLmRlYnVnKCdVc2VyIHJlcXVpcmVkIHRvIHN0ZXAgdXAgYXV0aGVudGljYXRpb246ICcpO1xyXG5cclxuICAgIC8vIFdlIGNhbiBhc3N1bWUgdGhhdCBpZiB3ZSBhcmUgcmVxdWVzdGluZyBhIFZJUCB0b2tlbiB3ZSBhbHJlYWR5IGhhdmUgYSB2YWxpZCBBQUQgVG9rZW5cclxuICAgIGNvbnN0IGF1dGhvcml6YXRpb24gPSB0aGlzLmFhZFNlcnZpY2UucmV0cmlldmVBYWRUb2tlbigpO1xyXG4gICAgY29uc3QgbmV3SGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpLnNldCh0aGlzLkFBRF9UT0tFTl9IRUFERVIsIGF1dGhvcml6YXRpb24pO1xyXG5cclxuICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgIGhlYWRlcnM6IG5ld0hlYWRlcnMsXHJcbiAgICAgIG9ic2VydmU6ICdyZXNwb25zZScgYXMgJ2JvZHknXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IG5ld0RldmljZUZpbmdlcnByaW50ID0gdGhpcy5pYURmcFNlcnZpY2UuSWFEZnAucmVhZEZpbmdlcnByaW50KCk7XHJcblxyXG4gICAgY29uc3QganNvbiA9IHtcclxuICAgICAgZGV2aWNlRmluZ2VycHJpbnQ6IG5ld0RldmljZUZpbmdlcnByaW50XHJcbiAgICB9O1xyXG4gICAgY29uc3QgYm9keSA9IEpTT04uc3RyaW5naWZ5KGpzb24pO1xyXG4gICAgY29uc3QgdXJsID0gdGhpcy5kb21haW4gKyB0aGlzLnN0ZXBVcFBhdGg7XHJcblxyXG4gICAgY29uc29sZS5kZWJ1ZygnU2VuZGluZyByZXF1ZXN0OiAnKTtcclxuICAgIGNvbnNvbGUuZGVidWcoJy0gdXJsOiAnICsgdXJsKTtcclxuICAgIGNvbnNvbGUuZGVidWcoJy0gYXV0aG9yaXphdGlvbjogJyArIGF1dGhvcml6YXRpb24pO1xyXG4gICAgY29uc29sZS5kZWJ1ZygnLSBib2R5OiAnICsgYm9keSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0PGFueT4odXJsLCBib2R5LCBvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXN5bmMgaGFuZGxlU3RlcFVwQXV0aGVudGljYXRpb24ocmVzcG9uc2U6IEh0dHBSZXNwb25zZTxJTWZhTWVzc2FnZT4pIHtcclxuICAgIGNvbnN0IHJlcyA9IHJlc3BvbnNlLmJvZHk7XHJcbiAgICBjb25zb2xlLmRlYnVnKHJlc3BvbnNlKTtcclxuICAgIGNvbnNvbGUuZGVidWcocmVzKTtcclxuXHJcbiAgICAvLyBTdG9yZSB0cmFuc2FjdGlvbklkXHJcbiAgICB0aGlzLnN0b3JhZ2VTZXJ2aWNlLnN0b3JlVHJhbnNhY3Rpb25JZChyZXMudHJhbnNhY3Rpb25JZCk7XHJcblxyXG4gICAgLy8gSWYgdGhlIHVzZXIgaXMgbm90IHJpc2t5IHdlIGNhbiBpbW1lZGlhdGVseSByZXR1cm4gdGhlIHByb3ZpZGVkIFZJUCBUb2tlblxyXG4gICAgLy8gVE9ETzogcmVtb3ZlIHJpc2t5IGZyb20gcmVzcG9uc2VcclxuICAgIGlmIChyZXMucmlza3kpIHtcclxuICAgICAgY29uc29sZS5kZWJ1ZygnVXNlciBpcyByZXF1aXJlZCB0byB1c2UgTXVsdGktRmFjdG9yIEF1dGhlbnRpY2F0aW9uJyk7XHJcbiAgICAgIGNvbnNvbGUuZGVidWcoYFJlZGlyZWN0aW5nIHVzZXIgdG8gJHtyZXMubWVkaXVtfSBwYWdlLi4uYCk7XHJcblxyXG4gICAgICAvLyBXYWl0IGZvciB0aGUgdXNlciB0byBwcmVzcyB0aGUgbmV4dCBidXR0b24gYmVmb3JlIHJvdXRpbmcgdG8gbWZhIHBhZ2VcclxuICAgICAgYXdhaXQgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW2AvYXV0aGVudGljYXRpb24vJHtyZXMubWVkaXVtLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKX1gXSk7XHJcbiAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgLy8gU3RvcmUgdGhlIHRva2VuIGxvY2FsbHlcclxuICAgICAgdGhpcy5zdG9yYWdlU2VydmljZS5zdG9yZVZpcFRva2VuKHJlcy52aXBUb2tlbik7XHJcblxyXG4gICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgbG9nU3RlcFVwUmVzcG9uc2UocmVzcG9uc2U6IEh0dHBSZXNwb25zZTxJTWZhTWVzc2FnZT4pIHtcclxuICAgIGNvbnNvbGUuZGVidWcocmVzcG9uc2UpO1xyXG4gICAgY29uc29sZS5kZWJ1ZygnXFwncmlza3lcXCc6ICcgKyByZXNwb25zZS5ib2R5LnJpc2t5KTtcclxuICAgIGNvbnNvbGUuZGVidWcoJ1xcJ3JlcXVlc3RJZFxcJzogJyArIHJlc3BvbnNlLmJvZHkucmVxdWVzdElkKTtcclxuICAgIGNvbnNvbGUuZGVidWcoJ1xcJ21lZGl1bVxcJzogJyArIHJlc3BvbnNlLmJvZHkubWVkaXVtKTtcclxuICAgIGNvbnNvbGUuZGVidWcoJ1xcJ3RyYW5zYWN0aW9uSWRcXCc6ICcgKyByZXNwb25zZS5ib2R5LnRyYW5zYWN0aW9uSWQpO1xyXG4gICAgY29uc29sZS5kZWJ1ZygnXFwndmlwVG9rZW5cXCc6ICcgKyByZXNwb25zZS5ib2R5LnZpcFRva2VuKTtcclxuICB9XHJcblxyXG4gIC8vICAvKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKlxyXG4gIC8vICAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgIElOVEVSQ0VQVCBSRVFVRVNUIEhFQURFUlMgICAgICAgICAgICAgICAgICAgICAgKlxyXG4gIC8vICAgICAgKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKi9cclxuXHJcbiAgLy8gICAgIC8vIEN1c3RvbSBoZWFkZXJzIHdpdGggQUFEIGFuZCBWSVAgYXV0aG9yaXphdGlvbiB0b2tlbnNcclxuICAvLyAgICAgZ2V0UmVxdWVzdE9wdGlvbkFyZ3Mob3B0aW9ucz86IFJlcXVlc3RPcHRpb25zQXJncyk6IFJlcXVlc3RPcHRpb25zQXJncyB7XHJcbiAgLy8gICAgICAgaWYgKG9wdGlvbnMgPT0gbnVsbCkge1xyXG4gIC8vICAgICAgICAgICBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKCk7XHJcbiAgLy8gICAgICAgfVxyXG4gIC8vICAgICAgIGlmIChvcHRpb25zLmhlYWRlcnMgPT0gbnVsbCkge1xyXG4gIC8vICAgICAgICAgICBvcHRpb25zLmhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gIC8vICAgICAgIH1cclxuICAvLyAgICAgICBvcHRpb25zLmhlYWRlcnMuYXBwZW5kKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xyXG5cclxuICAvLyAgICAgICAvLyBEZWZhdWx0IGhlYWRlcnNcclxuICAvLyAgICAgICBvcHRpb25zLmhlYWRlcnMuYXBwZW5kKCdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nLCAnKicpO1xyXG4gIC8vICAgICAgIG9wdGlvbnMuaGVhZGVycy5hcHBlbmQoJ0FjY2Vzcy1Db250cm9sLUFsbG93LU1ldGhvZHMnLCAnUE9TVCwgR0VULCBPUFRJT05TLCBERUxFVEUnKTtcclxuICAvLyAgICAgICBvcHRpb25zLmhlYWRlcnMuYXBwZW5kKCdBY2Nlc3MtQ29udHJvbC1NYXgtQWdlJywgJzM2MDAnKTtcclxuICAvLyAgICAgICBvcHRpb25zLmhlYWRlcnMuYXBwZW5kKCdBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzJywgJ3gtcmVxdWVzdGVkLXdpdGgnKTtcclxuXHJcbiAgLy8gICAgICAgLy8gTk9URTogVGhlIGVycm9yIGludGVyY2VwdG9yIGhhbmRsZXMgdXBkYXRpbmcgdGhlIGF1dGhvcml6YXRpb24gdG9rZW5zIHdoZW4gd2UgZ2V0IGEgNDAxXHJcblxyXG4gIC8vICAgICAgIC8vIEFBRCBUb2tlblxyXG4gIC8vICAgICAgIGNvbnN0IGF1dGhvcml6YXRpb24gPSB0aGlzLmFhZFNlcnZpY2UucmV0cmlldmVBYWRUb2tlbigpO1xyXG4gIC8vICAgICAgIG9wdGlvbnMuaGVhZGVycy5hcHBlbmQodGhpcy5BQURfVE9LRU5fSEVBREVSLCBhdXRob3JpemF0aW9uKTtcclxuXHJcbiAgLy8gICAgICAgLy8gVklQIFRva2VuXHJcbiAgLy8gICAgICAgY29uc3QgYXV0aG9yaXphdGlvblZpcCA9IHRoaXMuc3RvcmFnZS5yZXRyaWV2ZVZpcFRva2VuKCk7XHJcbiAgLy8gICAgICAgb3B0aW9ucy5oZWFkZXJzLmFwcGVuZCh0aGlzLlZJUF9UT0tFTl9IRUFERVIsICBhdXRob3JpemF0aW9uVmlwKTtcclxuXHJcbiAgLy8gICAgICAgcmV0dXJuIG9wdGlvbnM7XHJcbiAgLy8gICB9XHJcblxyXG5cclxuXHJcblxyXG4gIC8vICAgLyogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICpcclxuICAvLyAgICAqICAgICAgICAgICAgICAgICAgICBVU0VSIEFVVEhPUklaQVRJT04gTE9HSUMgWzQwMV0gICAgICAgICAgICAgICAgICAgICAqXHJcbiAgLy8gICAgKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKi9cclxuXHJcbiAgLy8gICAgLy8gSWYgdGhlIHVzZXIgaXMgdW5hYmxlIHRvIHJlYWNoIHRoZSBBUEkgZW5kcG9pbnQgd2UgbXVzdCBlbnN1cmUgdGhleSBhcmUgYXV0aGVudGljYXRlZC5cclxuICAvLyAgICAvLyBUaGUgdXNlciBpcyBmaXJzdCBhdXRoZW50aWNhdGVkIHdpdGggQXp1cmUgQURcclxuICAvLyAgICAvLyAgICAgLSBJZiB0aGUgdXNlciBkb2VzIG5vdCBoYXZlIGEgdmFsaWQgQUFEIHRva2VuIHdlIHJlZGlyZWN0IHRoZW0gdG8gbG9naW4gdG8gQXp1cmUgQURcclxuICAvLyAgICAvLyBUaGUgdXNlciBpcyB0aGVuIHJlcXVpcmVkIHRvIGhhdmUgYSBWSVAgdG9rZW5cclxuICAvLyAgICAvLyAgICAgLSBUaGUgJy9zdGVwdXAnIGVuZHBvaW50IG11c3QgYmUgY2FsbGVkIGFuZCB0aGVuIHRoZSBmb2xsb3dpbmcgbWF5IGhhcHBlbjpcclxuICAvLyAgICAvLyAgICAgICAgICsgSWYgdGhlIHVzZXIgaXMgbm90IHJpc2t5IHRoZW4gd2UgYXJlIGltbWVkaWF0ZWx5IHByb3ZpZGVkIHdpdGggdGhlIFZJUCB0b2tlblxyXG4gIC8vICAgIC8vICAgICAgICAgKyBJZiB0aGUgdXNlciBpcyByaXNreSB0aGVuIHRoZXkgYXJlIHJlZGlyZWN0IHRvIHRoZSBwcm92aWRlZCBNRkEgbWVkaXVtIChwdXNoIG9yIG90cClcclxuICAvLyAgICAvLyAgICAgICAgICAgICA9IE5PVEU6IElmIHRoZSB1c2VyIGlzIHJlZGlyZWN0IHRvIHB1c2ggb3Igb3RwIHRoZXkgd2lsbCBiZSByZWRpcmVjdGVkXHJcbiAgLy8gICAgLy8gICAgICAgICAgICAgICAgICAgICBiYWNrIGhvbWUgb25jZSB0aGV5IGhhdmUgYSB2YWxpZCBWSVAgdG9rZW5cclxuICAvLyAgICBwcml2YXRlIGhhbmRsZVVzZXJBdXRob3JpemF0aW9uKGVycm9yOiBSZXNwb25zZSkge1xyXG4gIC8vICAgICAgICAvLyBTdG9yZSB0aGUgdXNlciBjb250ZXh0IHNvIHdlIGNhbiByZXR1cm4gaGVyZSBhZnRlciBoYW5kbGluZyB0aGUgNDAxXHJcbiAgLy8gICAgICAgIHRoaXMuc3RvcmFnZS5zdG9yZUxhc3RMb2NhdGlvbigpO1xyXG5cclxuICAvLyAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHVzZXIgaXMgYXV0aGVudGljYXRlZCB3aXRoIEF6dXJlOlxyXG4gIC8vICAgICAgICAvLyAgICAgIElmIHRoZXkgYXJlLCB3ZSBoYXZlIGEgdmFsaWQgQUFEIFRva2VuIGFuZCB3ZSBjYW4gY29udGludWUuXHJcbiAgLy8gICAgICAgIC8vICAgICAgSWYgdGhleSBhcmUgbm90LCB3ZSByZWRpcmVjdCB0aGVtIHRvIHRoZSBBenVyZSBsb2dpbiBwYWdlIGFuZCBsZWF2ZVxyXG4gIC8vICAgICAgICAvLyAgICAgICB0aGVtIHRoZXJlIHVudGlsIHRoZXkgc3VjY2Vzc2Z1bGx5IGxvZ2luLiBUaGV5IHdpbGwgdGhlbiBiZSByZWRpcmVjdGVkIHRvIHRoZSBob21lIHBhZ2VcclxuICAvLyAgICAgICAgaWYgKHRoaXMuY2hlY2tOZXdBYWRUb2tlbklzUmVxdWlyZWQoZXJyb3IpKSB7XHJcbiAgLy8gICAgICAgICAgICB0aGlzLmdldEFhZFRva2VuKCk7XHJcbiAgLy8gICAgICAgIH0gZWxzZSB7XHJcbiAgLy8gICAgICAgICAgICB0aGlzLmdldFZpcFRva2VuKCk7XHJcbiAgLy8gICAgICAgIH1cclxuICAvLyAgICB9XHJcblxyXG5cclxuICAvLyAgIC8qICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqXHJcbiAgLy8gICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQUFEIFRPS0VOICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxyXG4gIC8vICAgICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICovXHJcblxyXG4gIC8vICAgLy8gSWYgdGhlIDQwMSBlcnJvciByZXNwb25zZSBtZXNzYWdlIGNvbnRhaW5zICdWSVAnIHRoZW4gd2Uga25vdyB0aGF0IHRoZSB1c2VyXHJcbiAgLy8gICAvLyBlaXRoZXIgZGlkIG5vdCBwcm92ZWQgYW4gQUFEIHRva2VuIG9yIHRoZSBwcm92aWRlZCBBQUQgdG9rZW4gaXMgaW52YWxpZC5cclxuICAvLyAgIC8vIElmIHRoZSBtZXNzYWdlIGRvZXMgTk9UIGNvbnRhaW4gJ1ZJUCcgdGhlbiB0aGUgcHJvdmlkZWQgQUFEIHRva2VuIHdhcyB2YWxpZFxyXG4gIC8vICAgLy8gYW5kIHdlIG1heSBzaW1wbGUgcmV0dXJuIHRoZSBjdXJyZW50bHkgc3RvcmVkIEFBRCB0b2tlbi5cclxuICAvLyAgIHByaXZhdGUgZ2V0QWFkVG9rZW4oKSB7XHJcbiAgLy8gICAgICAgLy8gSWYgdGhlIHVzZXIgaGFzIHNlbGVjdGVkIGFuIEF6dXJlIGluc3RhbmNlIHRoZW4gd2UgY2FuIHNpbXBseSByZXR1cm5cclxuICAvLyAgICAgICAvLyB0aGVpciBBQUQgdG9rZW4gb3RoZXJ3aXNlIHdlIHJlZGlyZWN0IHRoZW0gdG8gdGhlIC9sb2dpbiBwYWdlXHJcblxyXG4gIC8vICAgICAgIC8vIFRPRE86IERIIC0gTG9vayBpbnRvIHRoaXMsIGlzIHRoZXJlIGEgbWlzc2luZyBsaW5lIGJlbG93PyBDb2RlIGRvZXNuJ3QgbWF0Y2ggdGhlIGNvbW1lbnRzXHJcbiAgLy8gICAgICAgaWYgKHRoaXMuc3RvcmFnZS5yZXRyaWV2ZUF6dXJlSW5zdGFuY2UoKSkge1xyXG4gIC8vICAgICAgICAgICBjb25zb2xlLmRlYnVnKCdVc2VyIGhhcyBhbHJlYWR5IHNlbGVjdGVkIGFuIEF6dXJlIGluc3RhbmNlLiBSZWRpcmVjdGluZyB0byBBenVyZSBsb2dpbiBwYWdlLi4uJyk7XHJcbiAgLy8gICAgICAgfSBlbHNlIHtcclxuICAvLyAgICAgICAgICAgY29uc29sZS5kZWJ1ZygnVXNlciBoYXMgYWxyZWFkeSBOT1Qgc2VsZWN0ZWQgYW4gQXp1cmUgaW5zdGFuY2UgeWV0LiBSZWRpcmVjdGluZyB1c2VyIHRvIGxvZ2luIHBhZ2UuLi4nKTtcclxuICAvLyAgICAgICB9XHJcblxyXG4gIC8vICAgICAgIC8vIEFsd2F5cyBzZW5kIHRoZSB1c2VyIHRvIHNlbGVjdCBhbiBBenVyZSBpbnN0YW5jZSB0byBsb2cgaW4gdG8uXHJcbiAgLy8gICAgICAgLy8gKGV2ZW4gaWYgdGhleSBoYXZlIHByZXZpb3VzbHkgc2VsZWN0ZWQgYW4gQXp1cmUgaW5zdGFuY2UpXHJcbiAgLy8gICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvYXV0aGVudGljYXRpb24vbG9naW4nXSk7XHJcbiAgLy8gICB9XHJcblxyXG4gIC8vICAgLy8gV2hlbiB0aGUgZXJyb3IgbWVzc2FnZSBjb250YWlucyAnVklQJyB3ZSBrbm93IHRoZSBBQUQgdG9rZW4gd2FzIHZhbGlkIGFuZCB3ZSBjYW4ganVzdCByZXR1cm4gaXRcclxuICAvLyAgIHByaXZhdGUgY2hlY2tOZXdBYWRUb2tlbklzUmVxdWlyZWQoZXJyb3I6IFJlc3BvbnNlKSB7XHJcbiAgLy8gICAgICAgbGV0IHJlcXVpcmVkID0gdHJ1ZTtcclxuICAvLyAgICAgICBjb25zdCByZSA9IC8odmlwfFZJUCkvO1xyXG4gIC8vICAgICAgIGlmIChlcnJvci5qc29uKCkubWVzc2FnZS5zZWFyY2gocmUpICE9PSAtMSkge1xyXG4gIC8vICAgICAgICAgICByZXF1aXJlZCA9IGZhbHNlO1xyXG4gIC8vICAgICAgIH1cclxuICAvLyAgICAgICByZXR1cm4gcmVxdWlyZWQ7XHJcbiAgLy8gICB9XHJcblxyXG5cclxuXHJcblxyXG4gIC8vICAgLyogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICpcclxuICAvLyAgICAqICAgICAgICAgICAgICAgICAgICAgICBDT05UQUNUIEFETUlOIExPR0lDIFs0MDNdICAgICAgICAgICAgICAgICAgICAgICAqXHJcbiAgLy8gICAgKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKi9cclxuXHJcbiAgcHJpdmF0ZSBhc3luYyBoYW5kbGVDb250YWN0QWRtaW4oZXJyb3I6IFZpcEh0dHBFcnJvclJlc29uc2UpIHtcclxuICAgIGNvbnN0IGJvZHkgPSBlcnJvcjtcclxuXHJcbiAgICBjb25zb2xlLmRlYnVnKCdIYW5kbGluZyBPcGVyYXRpb24gTm90IEFsbG93ZWQnKTtcclxuICAgIGNvbnNvbGUuZGVidWcoJ1VzZXIgaXMgdW5hYmxlIHRvIGNvbnRpbnVlIGF1dGhvcml6YXRpb24gcHJvY2Vzcy4nKTtcclxuICAgIGNvbnNvbGUuZGVidWcoYm9keS5lcnJvcik7XHJcbiAgICBjb25zb2xlLmRlYnVnKCdSZWRpcmVjdGluZyB1c2VyIHRvIGNvbnRhY3QgYWRtaW4gcGFnZS4uLicpO1xyXG5cclxuICAgIGF3YWl0IHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2F1dGhlbnRpY2F0aW9uL2NvbnRhY3QtYWRtaW4gLycgKyBib2R5LnJlcXVlc3RJZF0pO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vICAgIC8qICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqXHJcbiAgLy8gICAgICogICAgICAgICAgICAgICAgICAgICAgIFJFR0lTVFJBVElPTiBMT0dJQyBbNDA0XSAgICAgICAgICAgICAgICAgICAgICAgICpcclxuICAvLyAgICAgKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKi9cclxuXHJcbiAgcHJpdmF0ZSBhc3luYyBoYW5kbGVSZWdpc3RyYXRpb24oZXJyb3I6IFZpcEh0dHBFcnJvclJlc29uc2UpIHtcclxuICAgIGNvbnN0IGJvZHkgPSBlcnJvcjtcclxuXHJcbiAgICBjb25zb2xlLmRlYnVnKCdIYW5kbGluZyBSZWdpc3RyYXRpb24nKTtcclxuXHJcbiAgICBjb25zb2xlLmRlYnVnKCdVc2VyIGhhcyBub3QgeWV0IHJlZ2lzdGVyZWQgd2l0aCBWSVAnKTtcclxuICAgIGNvbnNvbGUuZGVidWcoYm9keS5lcnJvcik7XHJcbiAgICBjb25zb2xlLmRlYnVnKCdSZWRpcmVjdGluZyB1c2VyIHRvIHJlZ2lzdHJhdGlvbiBwYWdlLi4uJyk7XHJcblxyXG4gICAgYXdhaXQgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvYXV0aGVudGljYXRpb24vcmVnaXN0ZXInXSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8gICAvKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKlxyXG4gIC8vICAgICogICAgICAgICAgICAgICAgICAgIE9WRVJSSURFIERFRkFVTFQgSFRUUCBNRVRIT0RTICAgICAgICAgICAgICAgICAgICAgICpcclxuICAvLyAgICAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqL1xyXG5cclxuICAvLyAgIHJlcXVlc3QodXJsOiBzdHJpbmcgfCBSZXF1ZXN0LCBvcHRpb25zPzogUmVxdWVzdE9wdGlvbnNBcmdzKTogT2JzZXJ2YWJsZTxSZXNwb25zZT4ge1xyXG4gIC8vICAgICAgIHJldHVybiBzdXBlci5yZXF1ZXN0KHVybCwgb3B0aW9ucyk7XHJcbiAgLy8gICB9XHJcblxyXG4gIC8vICAgZ2V0KHVybDogc3RyaW5nLCBvcHRpb25zPzogUmVxdWVzdE9wdGlvbnNBcmdzKTogT2JzZXJ2YWJsZTxSZXNwb25zZT4ge1xyXG4gIC8vICAgICAgIGNvbnNvbGUuZGVidWcoJ0ludGVyY2VwdGVkIEdFVCBSZXF1ZXN0OicpO1xyXG4gIC8vICAgICAgIGNvbnNvbGUuZGVidWcoJy0gdXJsOiAnICsgdXJsKTtcclxuICAvLyAgICAgICByZXR1cm4gdGhpcy5pbnRlcmNlcHQoc3VwZXIuZ2V0KHVybCwgdGhpcy5nZXRSZXF1ZXN0T3B0aW9uQXJncyhvcHRpb25zKSkpO1xyXG4gIC8vICAgfVxyXG5cclxuICAvLyAgIHBvc3QodXJsOiBzdHJpbmcsIGJvZHk6IHN0cmluZywgb3B0aW9ucz86IFJlcXVlc3RPcHRpb25zQXJncyk6IE9ic2VydmFibGU8UmVzcG9uc2U+IHtcclxuICAvLyAgICAgICBjb25zb2xlLmRlYnVnKCdJbnRlcmNlcHRlZCBQT1NUIFJlcXVlc3Q6Jyk7XHJcbiAgLy8gICAgICAgY29uc29sZS5kZWJ1ZygnLSB1cmw6ICcgKyB1cmwpO1xyXG4gIC8vICAgICAgIHJldHVybiB0aGlzLmludGVyY2VwdChzdXBlci5wb3N0KHVybCwgYm9keSwgdGhpcy5nZXRSZXF1ZXN0T3B0aW9uQXJncyhvcHRpb25zKSkpO1xyXG4gIC8vICAgfVxyXG5cclxuICAvLyAgIHB1dCh1cmw6IHN0cmluZywgYm9keTogc3RyaW5nLCBvcHRpb25zPzogUmVxdWVzdE9wdGlvbnNBcmdzKTogT2JzZXJ2YWJsZTxSZXNwb25zZT4ge1xyXG4gIC8vICAgICAgIHJldHVybiB0aGlzLmludGVyY2VwdChzdXBlci5wdXQodXJsLCBib2R5LCB0aGlzLmdldFJlcXVlc3RPcHRpb25BcmdzKG9wdGlvbnMpKSk7XHJcbiAgLy8gICB9XHJcblxyXG4gIC8vICAgZGVsZXRlKHVybDogc3RyaW5nLCBvcHRpb25zPzogUmVxdWVzdE9wdGlvbnNBcmdzKTogT2JzZXJ2YWJsZTxSZXNwb25zZT4ge1xyXG4gIC8vICAgICAgIHJldHVybiB0aGlzLmludGVyY2VwdChzdXBlci5kZWxldGUodXJsLCB0aGlzLmdldFJlcXVlc3RPcHRpb25BcmdzKG9wdGlvbnMpKSk7XHJcbiAgLy8gICB9XHJcbiAgLy8gfVxyXG5cclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIEh0dHBBdXRoUmVxdWVzdCB7XHJcbiAgW2luZGV4OiBzdHJpbmddOiBzdHJpbmc7XHJcbn1cclxuIl19
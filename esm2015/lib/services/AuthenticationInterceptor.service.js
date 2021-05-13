import { __awaiter } from "tslib";
import { HttpHeaders, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as HttpStatus from 'http-status-codes';
import { EMPTY, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
AuthenticationInterceptorService.ɵfac = function AuthenticationInterceptorService_Factory(t) { return new (t || AuthenticationInterceptorService)(i0.ɵɵinject(i1.AadService), i0.ɵɵinject(i2.StorageService), i0.ɵɵinject(i3.Router), i0.ɵɵinject(i4.HttpClient), i0.ɵɵinject(i5.IaDfpService), i0.ɵɵinject(i6.NswhpAuthService)); };
AuthenticationInterceptorService.ɵprov = i0.ɵɵdefineInjectable({ token: AuthenticationInterceptorService, factory: AuthenticationInterceptorService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(AuthenticationInterceptorService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: i1.AadService }, { type: i2.StorageService }, { type: i3.Router }, { type: i4.HttpClient }, { type: i5.IaDfpService }, { type: i6.NswhpAuthService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXV0aGVudGljYXRpb25JbnRlcmNlcHRvci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IkM6L1Byb2plY3RzL25zd2hwYXV0aC1tb2R1bGUvcHJvamVjdHMvbnN3aHBhdXRoL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9BdXRoZW50aWNhdGlvbkludGVyY2VwdG9yLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFLTCxXQUFXLEdBSVosTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sS0FBSyxVQUFVLE1BQU0sbUJBQW1CLENBQUM7QUFDaEQsT0FBTyxFQUFFLEtBQUssRUFBYyxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDckQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7OztBQVk1QyxNQUFNLE9BQU8sZ0NBQWdDO0lBSzNDLFlBQ1UsVUFBc0IsRUFDdEIsY0FBOEIsRUFDOUIsTUFBYyxFQUNkLElBQWdCLEVBQ2hCLFlBQTBCLEVBQzFCLGdCQUFrQztRQUxsQyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBVnBDLHFCQUFnQixHQUFHLGlCQUFpQixDQUFDO1FBQ3JDLHFCQUFnQixHQUFHLGtCQUFrQixDQUFDO1FBVzVDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7UUFDaEUsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMs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QVEsQ0FBQyxDQUFDLDBCQUEwQixDQUFDLENBQUMsQ0FBQztRQUMzRCxDQUFDO0tBQUE7O2dIQTVWVSxnQ0FBZ0M7d0VBQWhDLGdDQUFnQyxXQUFoQyxnQ0FBZ0MsbUJBRi9CLE1BQU07a0RBRVAsZ0NBQWdDO2NBSDVDLFVBQVU7ZUFBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgSHR0cENsaWVudCxcclxuICBIdHRwRXJyb3JSZXNwb25zZSxcclxuICBIdHRwRXZlbnQsXHJcbiAgSHR0cEhhbmRsZXIsXHJcbiAgSHR0cEhlYWRlcnMsXHJcbiAgSHR0cEludGVyY2VwdG9yLFxyXG4gIEh0dHBSZXF1ZXN0LFxyXG4gIEh0dHBSZXNwb25zZSxcclxufSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0ICogYXMgSHR0cFN0YXR1cyBmcm9tICdodHRwLXN0YXR1cy1jb2Rlcyc7XHJcbmltcG9ydCB7IEVNUFRZLCBPYnNlcnZhYmxlLCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGNhdGNoRXJyb3IgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBJTWZhTWVzc2FnZSB9IGZyb20gJy4uL21vZGVsL21mYU1lc3NhZ2UnO1xyXG5pbXBvcnQgeyBWaXBIdHRwRXJyb3JSZXNvbnNlIH0gZnJvbSAnLi4vbW9kZWwvdmlwSHR0cEVycm9yUmVzcG9uc2UnO1xyXG5pbXBvcnQgeyBOc3docEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vbnN3aHBhdXRoLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBYWRTZXJ2aWNlIH0gZnJvbSAnLi9hYWQuc2VydmljZSc7XHJcbmltcG9ydCB7IElhRGZwU2VydmljZSB9IGZyb20gJy4vaWFkZnAuc2VydmljZSc7XHJcbmltcG9ydCB7IFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi9zdG9yYWdlLnNlcnZpY2UnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQXV0aGVudGljYXRpb25JbnRlcmNlcHRvclNlcnZpY2UgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xyXG4gIHByaXZhdGUgQUFEX1RPS0VOX0hFQURFUiA9ICdBdXRob3JpemF0aW9uQUQnO1xyXG4gIHByaXZhdGUgVklQX1RPS0VOX0hFQURFUiA9ICdBdXRob3JpemF0aW9uVklQJztcclxuICBwcml2YXRlIGRvbWFpbjogc3RyaW5nO1xyXG4gIHByaXZhdGUgc3RlcFVwUGF0aDogc3RyaW5nO1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBhYWRTZXJ2aWNlOiBBYWRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBzdG9yYWdlU2VydmljZTogU3RvcmFnZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxyXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxyXG4gICAgcHJpdmF0ZSBpYURmcFNlcnZpY2U6IElhRGZwU2VydmljZSxcclxuICAgIHByaXZhdGUgbnN3aHBBdXRoU2VydmljZTogTnN3aHBBdXRoU2VydmljZVxyXG4gICkge1xyXG4gICAgdGhpcy5kb21haW4gPSB0aGlzLm5zd2hwQXV0aFNlcnZpY2UubnN3aHBBdXRoT3B0aW9ucy52aXAuZG9tYWluO1xyXG4gICAgdGhpcy5zdGVwVXBQYXRoID0gdGhpcy5uc3docEF1dGhTZXJ2aWNlLm5zd2hwQXV0aE9wdGlvbnMudmlwLnN0ZXBVcFBhdGg7XHJcbiAgfVxyXG5cclxuICBpbnRlcmNlcHQocmVxdWVzdDogSHR0cFJlcXVlc3Q8SHR0cEF1dGhSZXF1ZXN0PiwgbmV4dDogSHR0cEhhbmRsZXIpOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PiB7XHJcblxyXG4gICAgcmVxdWVzdCA9IHRoaXMuYWRkQXV0aEhlYWRlcnMocmVxdWVzdCk7XHJcblxyXG4gICAgcmV0dXJuIG5leHQuaGFuZGxlKHJlcXVlc3QpLnBpcGUoXHJcbiAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvci5iaW5kKHRoaXMpKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhZGRBdXRoSGVhZGVycyhyZXF1ZXN0OiBIdHRwUmVxdWVzdDxIdHRwQXV0aFJlcXVlc3Q+KSB7XHJcbiAgICBjb25zdCBoZWFkZXJzOiB7XHJcbiAgICAgIFtpbmRleDogc3RyaW5nXTogc3RyaW5nXHJcbiAgICB9ID0ge1xyXG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogJyonLFxyXG4gICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctTWV0aG9kcyc6ICdQT1NULCBHRVQsIE9QVElPTlMsIERFTEVURScsXHJcbiAgICAgICdBY2Nlc3MtQ29udHJvbC1NYXgtQWdlJzogJzM2MDAnLFxyXG4gICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVycyc6ICd4LXJlcXVlc3RlZC13aXRoJ1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBUaGVzZSBoYXZlIGJlZW4gYWRkZWQgc2VwYXJhdGVseSBzaW5jZSBzdHJpbmcgaW50ZXJwb2xhdGlvbiBpcyBub3Qgc3VwcG9ydGVkIGZvciBvYmplY3Qga2V5c1xyXG4gICAgY29uc3QgYWFkVG9rZW4gPSB0aGlzLmFhZFNlcnZpY2UucmV0cmlldmVBYWRUb2tlbigpO1xyXG4gICAgaWYgKGFhZFRva2VuKSB7XHJcbiAgICAgIGhlYWRlcnNbdGhpcy5BQURfVE9LRU5fSEVBREVSXSA9IGFhZFRva2VuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHZpcFRva2VuID0gdGhpcy5zdG9yYWdlU2VydmljZS5yZXRyaWV2ZVZpcFRva2VuKCk7XHJcbiAgICBpZiAodmlwVG9rZW4pIHtcclxuICAgICAgaGVhZGVyc1t0aGlzLlZJUF9UT0tFTl9IRUFERVJdID0gKHZpcFRva2VuIGFzIHN0cmluZyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVxdWVzdCA9IHJlcXVlc3QuY2xvbmUoe1xyXG4gICAgICBzZXRIZWFkZXJzOiBoZWFkZXJzXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gcmVxdWVzdDtcclxuICB9XHJcblxyXG5cclxuICAvKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKlxyXG4gICAqICAgICAgICAgICAgICAgICAgICBVU0VSIEFVVEhPUklaQVRJT04gTE9HSUMgWzQwMV0gICAgICAgICAgICAgICAgICAgICAqXHJcbiAgICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICovXHJcblxyXG4gIC8vIElmIHRoZSB1c2VyIGlzIHVuYWJsZSB0byByZWFjaCB0aGUgQVBJIGVuZHBvaW50IHdlIG11c3QgZW5zdXJlIHRoZXkgYXJlIGF1dGhlbnRpY2F0ZWQuXHJcbiAgLy8gVGhlIHVzZXIgaXMgZmlyc3QgYXV0aGVudGljYXRlZCB3aXRoIEF6dXJlIEFEXHJcbiAgLy8gICAgIC0gSWYgdGhlIHVzZXIgZG9lcyBub3QgaGF2ZSBhIHZhbGlkIEFBRCB0b2tlbiB3ZSByZWRpcmVjdCB0aGVtIHRvIGxvZ2luIHRvIEF6dXJlIEFEXHJcbiAgLy8gVGhlIHVzZXIgaXMgdGhlbiByZXF1aXJlZCB0byBoYXZlIGEgVklQIHRva2VuXHJcbiAgLy8gICAgIC0gVGhlICcvc3RlcHVwJyBlbmRwb2ludCBtdXN0IGJlIGNhbGxlZCBhbmQgdGhlbiB0aGUgZm9sbG93aW5nIG1heSBoYXBwZW46XHJcbiAgLy8gICAgICAgICArIElmIHRoZSB1c2VyIGlzIG5vdCByaXNreSB0aGVuIHdlIGFyZSBpbW1lZGlhdGVseSBwcm92aWRlZCB3aXRoIHRoZSBWSVAgdG9rZW5cclxuICAvLyAgICAgICAgICsgSWYgdGhlIHVzZXIgaXMgcmlza3kgdGhlbiB0aGV5IGFyZSByZWRpcmVjdCB0byB0aGUgcHJvdmlkZWQgTUZBIG1lZGl1bSAocHVzaCBvciBvdHApXHJcbiAgLy8gICAgICAgICAgICAgPSBOT1RFOiBJZiB0aGUgdXNlciBpcyByZWRpcmVjdCB0byBwdXNoIG9yIG90cCB0aGV5IHdpbGwgYmUgcmVkaXJlY3RlZFxyXG4gIC8vICAgICAgICAgICAgICAgICAgICAgYmFjayBob21lIG9uY2UgdGhleSBoYXZlIGEgdmFsaWQgVklQIHRva2VuXHJcbiAgcHJpdmF0ZSBhc3luYyBoYW5kbGVVc2VyQXV0aG9yaXphdGlvbihlcnJvcjogSHR0cEVycm9yUmVzcG9uc2UpIHtcclxuICAgIC8vIFN0b3JlIHRoZSB1c2VyIGNvbnRleHQgc28gd2UgY2FuIHJldHVybiBoZXJlIGFmdGVyIGhhbmRsaW5nIHRoZSA0MDFcclxuICAgIHRoaXMuc3RvcmFnZVNlcnZpY2Uuc3RvcmVMYXN0TG9jYXRpb24oKTtcclxuXHJcbiAgICAvLyBDaGVjayBpZiB0aGUgdXNlciBpcyBhdXRoZW50aWNhdGVkIHdpdGggQXp1cmU6XHJcbiAgICAvLyAgICAgIElmIHRoZXkgYXJlLCB3ZSBoYXZlIGEgdmFsaWQgQUFEIFRva2VuIGFuZCB3ZSBjYW4gY29udGludWUuXHJcbiAgICAvLyAgICAgIElmIHRoZXkgYXJlIG5vdCwgd2UgcmVkaXJlY3QgdGhlbSB0byB0aGUgQXp1cmUgbG9naW4gcGFnZSBhbmQgbGVhdmVcclxuICAgIC8vICAgICAgIHRoZW0gdGhlcmUgdW50aWwgdGhleSBzdWNjZXNzZnVsbHkgbG9naW4uIFRoZXkgd2lsbCB0aGVuIGJlIHJlZGlyZWN0ZWQgdG8gdGhlIGhvbWUgcGFnZVxyXG4gICAgaWYgKHRoaXMuaXNOZXdBYWRUb2tlblJlcXVpcmVkKGVycm9yKSkge1xyXG4gICAgICBhd2FpdCB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJ2F1dGhlbnRpY2F0aW9uL2xvZ2luJ10pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5nZXRWaXBUb2tlbigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhc3luYyBoYW5kbGVFcnJvcihlcnJvcjogSHR0cEVycm9yUmVzcG9uc2UpIHtcclxuICAgIC8vIEhhbmRsZSBVbmF1dGhvcml6ZWQgZXJyb3IgZ2xvYmFsbHlcclxuICAgIC8vIEF1dGhTZXJ2aWNlIHdpbGwgaGFuZGxlIG90aGVyIDQwMCBlcnJvcnNcclxuICAgIHN3aXRjaCAoZXJyb3Iuc3RhdHVzKSB7XHJcbiAgICAgIGNhc2UgSHR0cFN0YXR1cy5VTkFVVEhPUklaRUQ6XHJcbiAgICAgICAgY29uc29sZS5kZWJ1ZygnNDAxIHJlY2VpdmVkLCByZWRpcmVjdGluZyB0byBsb2dpbicpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuaGFuZGxlVXNlckF1dGhvcml6YXRpb24oZXJyb3IpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIEh0dHBTdGF0dXMuRk9SQklEREVOOlxyXG4gICAgICAgIGNvbnNvbGUuZGVidWcoJzQwMyByZWNlaXZlZCBpbiBBdXRoZW50aWNhdGlvbkludGVyY2VwdG9yLCByZWRpcmVjdGluZyB0byBjb250YWN0IGFkbWluJyk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvYXV0aGVudGljYXRpb24vY29udGFjdC1hZG1pbiddKTtcclxuICAgICAgICByZXR1cm4gRU1QVFk7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoZXJyb3IpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSWYgdGhlIGVycm9yIGNvbnRhaW5zICdWSVAnIHRoZW4gd2UgYXNzdW1lIHRoZSBBQUQgdG9rZW4gaXMgYmVpbmcgc3VjY2Vzc2Z1bGx5IHVzZWRcclxuICAgKiBhbmQgdGhhdCB0aGUgNDAxIGlzIGNhdXNlZCBieSBhIG1pc3Npbmcgb3IgaW52YWxpZCBWSVAgdG9rZW5cclxuICAgKiBAcGFyYW0gSHR0cEVycm9yUmVzcG9uc2UgcmV0dXJuZWQgYnkgdGhlIGNhbGxcclxuICAgKi9cclxuICBwcml2YXRlIGlzTmV3QWFkVG9rZW5SZXF1aXJlZChlcnJvcjogSHR0cEVycm9yUmVzcG9uc2UpIHtcclxuICAgIGxldCByZXF1aXJlZCA9IHRydWU7XHJcbiAgICBjb25zdCByZSA9IC8odmlwfFZJUCkvO1xyXG4gICAgaWYgKGVycm9yLmVycm9yLm1lc3NhZ2Uuc2VhcmNoKHJlKSAhPT0gLTEpIHtcclxuICAgICAgcmVxdWlyZWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVxdWlyZWQ7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICpcclxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVklQIFRPS0VOICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxyXG4gICAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqL1xyXG5cclxuICAvKipcclxuICAgKiBJbml0aWF0ZXMgdGhlIHN0ZXBzIHRvIHJldHJpZXZlIGEgVklQIHRva2VuIGZyb20gdGhlIHNlcnZlclxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0VmlwVG9rZW4oKSB7XHJcbiAgICBjb25zb2xlLmRlYnVnKCdSZXF1ZXN0aW5nIG5ldyBWSVAgVG9rZW4uLi4nKTtcclxuXHJcbiAgICB0aGlzLnN0ZXBVcEF1dGhlbnRpY2F0aW9uKCkuc3Vic2NyaWJlKFxyXG4gICAgICBhc3luYyByZXNwb25zZSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2dTdGVwVXBSZXNwb25zZShyZXNwb25zZSk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5oYW5kbGVTdGVwVXBBdXRoZW50aWNhdGlvbihyZXNwb25zZSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGFzeW5jIGVycm9yID0+IHtcclxuICAgICAgICAvLyBOT1RFOiBXZSBzcGVjaWZpY2FsbHkgaGFuZGxlIDQwMyBhbmQgNDA0IGVycm9ycyBoZXJlXHJcbiAgICAgICAgLy8gT25seSA0MDEgaXMgaGFuZGxlZCBnbG9iYWxseS4gT3RoZXIgQXV0aCByZWxhdGVkIGh0dHAgY2FsbHNcclxuICAgICAgICAvLyBhcmUgbWFkZSBpbiBBdXRoU2VydmljZSB0aGF0IGhhbmRsZXMgdGhlIG90aGVyIDQwMCBlcnJvcnMuXHJcblxyXG4gICAgICAgIC8vIEZvcmJpZGRlbiAtIENvbnRhY3QgYW4gYWRtaW4gKHJlcXVlc3RJZClcclxuICAgICAgICBpZiAoZXJyb3Iuc3RhdHVzID09PSBIdHRwU3RhdHVzLkZPUkJJRERFTikge1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcignNDAzIHJlY2VpdmVkJyk7XHJcbiAgICAgICAgICAvLyBUT0RPOiBUaGlzXHJcbiAgICAgICAgICBhd2FpdCB0aGlzLmhhbmRsZUNvbnRhY3RBZG1pbihlcnJvcik7XHJcbiAgICAgICAgICByZXR1cm4gRU1QVFk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChlcnJvci5zdGF0dXMgPT09IEh0dHBTdGF0dXMuTk9UX0ZPVU5EKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCc0MDQgcmVjZWl2ZWQnKTtcclxuICAgICAgICAgIGF3YWl0IHRoaXMuaGFuZGxlUmVnaXN0cmF0aW9uKGVycm9yKTtcclxuICAgICAgICAgIHJldHVybiBFTVBUWTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgYXdhaXQgdGhpcy5oYW5kbGVFcnJvcihlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzdGVwVXBBdXRoZW50aWNhdGlvbigpOiBPYnNlcnZhYmxlPEh0dHBSZXNwb25zZTxJTWZhTWVzc2FnZT4+IHtcclxuICAgIGNvbnNvbGUuZGVidWcoJ1VzZXIgcmVxdWlyZWQgdG8gc3RlcCB1cCBhdXRoZW50aWNhdGlvbjogJyk7XHJcblxyXG4gICAgLy8gV2UgY2FuIGFzc3VtZSB0aGF0IGlmIHdlIGFyZSByZXF1ZXN0aW5nIGEgVklQIHRva2VuIHdlIGFscmVhZHkgaGF2ZSBhIHZhbGlkIEFBRCBUb2tlblxyXG4gICAgY29uc3QgYXV0aG9yaXphdGlvbiA9IHRoaXMuYWFkU2VydmljZS5yZXRyaWV2ZUFhZFRva2VuKCk7XHJcbiAgICBjb25zdCBuZXdIZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCkuc2V0KHRoaXMuQUFEX1RPS0VOX0hFQURFUiwgYXV0aG9yaXphdGlvbik7XHJcblxyXG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgaGVhZGVyczogbmV3SGVhZGVycyxcclxuICAgICAgb2JzZXJ2ZTogJ3Jlc3BvbnNlJyBhcyAnYm9keSdcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgbmV3RGV2aWNlRmluZ2VycHJpbnQgPSB0aGlzLmlhRGZwU2VydmljZS5JYURmcC5yZWFkRmluZ2VycHJpbnQoKTtcclxuXHJcbiAgICBjb25zdCBqc29uID0ge1xyXG4gICAgICBkZXZpY2VGaW5nZXJwcmludDogbmV3RGV2aWNlRmluZ2VycHJpbnRcclxuICAgIH07XHJcbiAgICBjb25zdCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoanNvbik7XHJcbiAgICBjb25zdCB1cmwgPSB0aGlzLmRvbWFpbiArIHRoaXMuc3RlcFVwUGF0aDtcclxuXHJcbiAgICBjb25zb2xlLmRlYnVnKCdTZW5kaW5nIHJlcXVlc3Q6ICcpO1xyXG4gICAgY29uc29sZS5kZWJ1ZygnLSB1cmw6ICcgKyB1cmwpO1xyXG4gICAgY29uc29sZS5kZWJ1ZygnLSBhdXRob3JpemF0aW9uOiAnICsgYXV0aG9yaXphdGlvbik7XHJcbiAgICBjb25zb2xlLmRlYnVnKCctIGJvZHk6ICcgKyBib2R5KTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Q8YW55Pih1cmwsIGJvZHksIG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhc3luYyBoYW5kbGVTdGVwVXBBdXRoZW50aWNhdGlvbihyZXNwb25zZTogSHR0cFJlc3BvbnNlPElNZmFNZXNzYWdlPikge1xyXG4gICAgY29uc3QgcmVzID0gcmVzcG9uc2UuYm9keTtcclxuICAgIGNvbnNvbGUuZGVidWcocmVzcG9uc2UpO1xyXG4gICAgY29uc29sZS5kZWJ1ZyhyZXMpO1xyXG5cclxuICAgIC8vIFN0b3JlIHRyYW5zYWN0aW9uSWRcclxuICAgIHRoaXMuc3RvcmFnZVNlcnZpY2Uuc3RvcmVUcmFuc2FjdGlvbklkKHJlcy50cmFuc2FjdGlvbklkKTtcclxuXHJcbiAgICAvLyBJZiB0aGUgdXNlciBpcyBub3Qgcmlza3kgd2UgY2FuIGltbWVkaWF0ZWx5IHJldHVybiB0aGUgcHJvdmlkZWQgVklQIFRva2VuXHJcbiAgICAvLyBUT0RPOiByZW1vdmUgcmlza3kgZnJvbSByZXNwb25zZVxyXG4gICAgaWYgKHJlcy5yaXNreSkge1xyXG4gICAgICBjb25zb2xlLmRlYnVnKCdVc2VyIGlzIHJlcXVpcmVkIHRvIHVzZSBNdWx0aS1GYWN0b3IgQXV0aGVudGljYXRpb24nKTtcclxuICAgICAgY29uc29sZS5kZWJ1ZyhgUmVkaXJlY3RpbmcgdXNlciB0byAke3Jlcy5tZWRpdW19IHBhZ2UuLi5gKTtcclxuXHJcbiAgICAgIC8vIFdhaXQgZm9yIHRoZSB1c2VyIHRvIHByZXNzIHRoZSBuZXh0IGJ1dHRvbiBiZWZvcmUgcm91dGluZyB0byBtZmEgcGFnZVxyXG4gICAgICBhd2FpdCB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbYC9hdXRoZW50aWNhdGlvbi8ke3Jlcy5tZWRpdW0udG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpfWBdKTtcclxuICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAvLyBTdG9yZSB0aGUgdG9rZW4gbG9jYWxseVxyXG4gICAgICB0aGlzLnN0b3JhZ2VTZXJ2aWNlLnN0b3JlVmlwVG9rZW4ocmVzLnZpcFRva2VuKTtcclxuXHJcbiAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBsb2dTdGVwVXBSZXNwb25zZShyZXNwb25zZTogSHR0cFJlc3BvbnNlPElNZmFNZXNzYWdlPikge1xyXG4gICAgY29uc29sZS5kZWJ1ZyhyZXNwb25zZSk7XHJcbiAgICBjb25zb2xlLmRlYnVnKCdcXCdyaXNreVxcJzogJyArIHJlc3BvbnNlLmJvZHkucmlza3kpO1xyXG4gICAgY29uc29sZS5kZWJ1ZygnXFwncmVxdWVzdElkXFwnOiAnICsgcmVzcG9uc2UuYm9keS5yZXF1ZXN0SWQpO1xyXG4gICAgY29uc29sZS5kZWJ1ZygnXFwnbWVkaXVtXFwnOiAnICsgcmVzcG9uc2UuYm9keS5tZWRpdW0pO1xyXG4gICAgY29uc29sZS5kZWJ1ZygnXFwndHJhbnNhY3Rpb25JZFxcJzogJyArIHJlc3BvbnNlLmJvZHkudHJhbnNhY3Rpb25JZCk7XHJcbiAgICBjb25zb2xlLmRlYnVnKCdcXCd2aXBUb2tlblxcJzogJyArIHJlc3BvbnNlLmJvZHkudmlwVG9rZW4pO1xyXG4gIH1cclxuXHJcbiAgLy8gIC8qICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqXHJcbiAgLy8gICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgSU5URVJDRVBUIFJFUVVFU1QgSEVBREVSUyAgICAgICAgICAgICAgICAgICAgICAqXHJcbiAgLy8gICAgICAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqL1xyXG5cclxuICAvLyAgICAgLy8gQ3VzdG9tIGhlYWRlcnMgd2l0aCBBQUQgYW5kIFZJUCBhdXRob3JpemF0aW9uIHRva2Vuc1xyXG4gIC8vICAgICBnZXRSZXF1ZXN0T3B0aW9uQXJncyhvcHRpb25zPzogUmVxdWVzdE9wdGlvbnNBcmdzKTogUmVxdWVzdE9wdGlvbnNBcmdzIHtcclxuICAvLyAgICAgICBpZiAob3B0aW9ucyA9PSBudWxsKSB7XHJcbiAgLy8gICAgICAgICAgIG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoKTtcclxuICAvLyAgICAgICB9XHJcbiAgLy8gICAgICAgaWYgKG9wdGlvbnMuaGVhZGVycyA9PSBudWxsKSB7XHJcbiAgLy8gICAgICAgICAgIG9wdGlvbnMuaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XHJcbiAgLy8gICAgICAgfVxyXG4gIC8vICAgICAgIG9wdGlvbnMuaGVhZGVycy5hcHBlbmQoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XHJcblxyXG4gIC8vICAgICAgIC8vIERlZmF1bHQgaGVhZGVyc1xyXG4gIC8vICAgICAgIG9wdGlvbnMuaGVhZGVycy5hcHBlbmQoJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbicsICcqJyk7XHJcbiAgLy8gICAgICAgb3B0aW9ucy5oZWFkZXJzLmFwcGVuZCgnQWNjZXNzLUNvbnRyb2wtQWxsb3ctTWV0aG9kcycsICdQT1NULCBHRVQsIE9QVElPTlMsIERFTEVURScpO1xyXG4gIC8vICAgICAgIG9wdGlvbnMuaGVhZGVycy5hcHBlbmQoJ0FjY2Vzcy1Db250cm9sLU1heC1BZ2UnLCAnMzYwMCcpO1xyXG4gIC8vICAgICAgIG9wdGlvbnMuaGVhZGVycy5hcHBlbmQoJ0FjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnMnLCAneC1yZXF1ZXN0ZWQtd2l0aCcpO1xyXG5cclxuICAvLyAgICAgICAvLyBOT1RFOiBUaGUgZXJyb3IgaW50ZXJjZXB0b3IgaGFuZGxlcyB1cGRhdGluZyB0aGUgYXV0aG9yaXphdGlvbiB0b2tlbnMgd2hlbiB3ZSBnZXQgYSA0MDFcclxuXHJcbiAgLy8gICAgICAgLy8gQUFEIFRva2VuXHJcbiAgLy8gICAgICAgY29uc3QgYXV0aG9yaXphdGlvbiA9IHRoaXMuYWFkU2VydmljZS5yZXRyaWV2ZUFhZFRva2VuKCk7XHJcbiAgLy8gICAgICAgb3B0aW9ucy5oZWFkZXJzLmFwcGVuZCh0aGlzLkFBRF9UT0tFTl9IRUFERVIsIGF1dGhvcml6YXRpb24pO1xyXG5cclxuICAvLyAgICAgICAvLyBWSVAgVG9rZW5cclxuICAvLyAgICAgICBjb25zdCBhdXRob3JpemF0aW9uVmlwID0gdGhpcy5zdG9yYWdlLnJldHJpZXZlVmlwVG9rZW4oKTtcclxuICAvLyAgICAgICBvcHRpb25zLmhlYWRlcnMuYXBwZW5kKHRoaXMuVklQX1RPS0VOX0hFQURFUiwgIGF1dGhvcml6YXRpb25WaXApO1xyXG5cclxuICAvLyAgICAgICByZXR1cm4gb3B0aW9ucztcclxuICAvLyAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgLy8gICAvKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKlxyXG4gIC8vICAgICogICAgICAgICAgICAgICAgICAgIFVTRVIgQVVUSE9SSVpBVElPTiBMT0dJQyBbNDAxXSAgICAgICAgICAgICAgICAgICAgICpcclxuICAvLyAgICAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqL1xyXG5cclxuICAvLyAgICAvLyBJZiB0aGUgdXNlciBpcyB1bmFibGUgdG8gcmVhY2ggdGhlIEFQSSBlbmRwb2ludCB3ZSBtdXN0IGVuc3VyZSB0aGV5IGFyZSBhdXRoZW50aWNhdGVkLlxyXG4gIC8vICAgIC8vIFRoZSB1c2VyIGlzIGZpcnN0IGF1dGhlbnRpY2F0ZWQgd2l0aCBBenVyZSBBRFxyXG4gIC8vICAgIC8vICAgICAtIElmIHRoZSB1c2VyIGRvZXMgbm90IGhhdmUgYSB2YWxpZCBBQUQgdG9rZW4gd2UgcmVkaXJlY3QgdGhlbSB0byBsb2dpbiB0byBBenVyZSBBRFxyXG4gIC8vICAgIC8vIFRoZSB1c2VyIGlzIHRoZW4gcmVxdWlyZWQgdG8gaGF2ZSBhIFZJUCB0b2tlblxyXG4gIC8vICAgIC8vICAgICAtIFRoZSAnL3N0ZXB1cCcgZW5kcG9pbnQgbXVzdCBiZSBjYWxsZWQgYW5kIHRoZW4gdGhlIGZvbGxvd2luZyBtYXkgaGFwcGVuOlxyXG4gIC8vICAgIC8vICAgICAgICAgKyBJZiB0aGUgdXNlciBpcyBub3Qgcmlza3kgdGhlbiB3ZSBhcmUgaW1tZWRpYXRlbHkgcHJvdmlkZWQgd2l0aCB0aGUgVklQIHRva2VuXHJcbiAgLy8gICAgLy8gICAgICAgICArIElmIHRoZSB1c2VyIGlzIHJpc2t5IHRoZW4gdGhleSBhcmUgcmVkaXJlY3QgdG8gdGhlIHByb3ZpZGVkIE1GQSBtZWRpdW0gKHB1c2ggb3Igb3RwKVxyXG4gIC8vICAgIC8vICAgICAgICAgICAgID0gTk9URTogSWYgdGhlIHVzZXIgaXMgcmVkaXJlY3QgdG8gcHVzaCBvciBvdHAgdGhleSB3aWxsIGJlIHJlZGlyZWN0ZWRcclxuICAvLyAgICAvLyAgICAgICAgICAgICAgICAgICAgIGJhY2sgaG9tZSBvbmNlIHRoZXkgaGF2ZSBhIHZhbGlkIFZJUCB0b2tlblxyXG4gIC8vICAgIHByaXZhdGUgaGFuZGxlVXNlckF1dGhvcml6YXRpb24oZXJyb3I6IFJlc3BvbnNlKSB7XHJcbiAgLy8gICAgICAgIC8vIFN0b3JlIHRoZSB1c2VyIGNvbnRleHQgc28gd2UgY2FuIHJldHVybiBoZXJlIGFmdGVyIGhhbmRsaW5nIHRoZSA0MDFcclxuICAvLyAgICAgICAgdGhpcy5zdG9yYWdlLnN0b3JlTGFzdExvY2F0aW9uKCk7XHJcblxyXG4gIC8vICAgICAgICAvLyBDaGVjayBpZiB0aGUgdXNlciBpcyBhdXRoZW50aWNhdGVkIHdpdGggQXp1cmU6XHJcbiAgLy8gICAgICAgIC8vICAgICAgSWYgdGhleSBhcmUsIHdlIGhhdmUgYSB2YWxpZCBBQUQgVG9rZW4gYW5kIHdlIGNhbiBjb250aW51ZS5cclxuICAvLyAgICAgICAgLy8gICAgICBJZiB0aGV5IGFyZSBub3QsIHdlIHJlZGlyZWN0IHRoZW0gdG8gdGhlIEF6dXJlIGxvZ2luIHBhZ2UgYW5kIGxlYXZlXHJcbiAgLy8gICAgICAgIC8vICAgICAgIHRoZW0gdGhlcmUgdW50aWwgdGhleSBzdWNjZXNzZnVsbHkgbG9naW4uIFRoZXkgd2lsbCB0aGVuIGJlIHJlZGlyZWN0ZWQgdG8gdGhlIGhvbWUgcGFnZVxyXG4gIC8vICAgICAgICBpZiAodGhpcy5jaGVja05ld0FhZFRva2VuSXNSZXF1aXJlZChlcnJvcikpIHtcclxuICAvLyAgICAgICAgICAgIHRoaXMuZ2V0QWFkVG9rZW4oKTtcclxuICAvLyAgICAgICAgfSBlbHNlIHtcclxuICAvLyAgICAgICAgICAgIHRoaXMuZ2V0VmlwVG9rZW4oKTtcclxuICAvLyAgICAgICAgfVxyXG4gIC8vICAgIH1cclxuXHJcblxyXG4gIC8vICAgLyogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICpcclxuICAvLyAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBQUQgVE9LRU4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXHJcbiAgLy8gICAgKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKi9cclxuXHJcbiAgLy8gICAvLyBJZiB0aGUgNDAxIGVycm9yIHJlc3BvbnNlIG1lc3NhZ2UgY29udGFpbnMgJ1ZJUCcgdGhlbiB3ZSBrbm93IHRoYXQgdGhlIHVzZXJcclxuICAvLyAgIC8vIGVpdGhlciBkaWQgbm90IHByb3ZlZCBhbiBBQUQgdG9rZW4gb3IgdGhlIHByb3ZpZGVkIEFBRCB0b2tlbiBpcyBpbnZhbGlkLlxyXG4gIC8vICAgLy8gSWYgdGhlIG1lc3NhZ2UgZG9lcyBOT1QgY29udGFpbiAnVklQJyB0aGVuIHRoZSBwcm92aWRlZCBBQUQgdG9rZW4gd2FzIHZhbGlkXHJcbiAgLy8gICAvLyBhbmQgd2UgbWF5IHNpbXBsZSByZXR1cm4gdGhlIGN1cnJlbnRseSBzdG9yZWQgQUFEIHRva2VuLlxyXG4gIC8vICAgcHJpdmF0ZSBnZXRBYWRUb2tlbigpIHtcclxuICAvLyAgICAgICAvLyBJZiB0aGUgdXNlciBoYXMgc2VsZWN0ZWQgYW4gQXp1cmUgaW5zdGFuY2UgdGhlbiB3ZSBjYW4gc2ltcGx5IHJldHVyblxyXG4gIC8vICAgICAgIC8vIHRoZWlyIEFBRCB0b2tlbiBvdGhlcndpc2Ugd2UgcmVkaXJlY3QgdGhlbSB0byB0aGUgL2xvZ2luIHBhZ2VcclxuXHJcbiAgLy8gICAgICAgLy8gVE9ETzogREggLSBMb29rIGludG8gdGhpcywgaXMgdGhlcmUgYSBtaXNzaW5nIGxpbmUgYmVsb3c/IENvZGUgZG9lc24ndCBtYXRjaCB0aGUgY29tbWVudHNcclxuICAvLyAgICAgICBpZiAodGhpcy5zdG9yYWdlLnJldHJpZXZlQXp1cmVJbnN0YW5jZSgpKSB7XHJcbiAgLy8gICAgICAgICAgIGNvbnNvbGUuZGVidWcoJ1VzZXIgaGFzIGFscmVhZHkgc2VsZWN0ZWQgYW4gQXp1cmUgaW5zdGFuY2UuIFJlZGlyZWN0aW5nIHRvIEF6dXJlIGxvZ2luIHBhZ2UuLi4nKTtcclxuICAvLyAgICAgICB9IGVsc2Uge1xyXG4gIC8vICAgICAgICAgICBjb25zb2xlLmRlYnVnKCdVc2VyIGhhcyBhbHJlYWR5IE5PVCBzZWxlY3RlZCBhbiBBenVyZSBpbnN0YW5jZSB5ZXQuIFJlZGlyZWN0aW5nIHVzZXIgdG8gbG9naW4gcGFnZS4uLicpO1xyXG4gIC8vICAgICAgIH1cclxuXHJcbiAgLy8gICAgICAgLy8gQWx3YXlzIHNlbmQgdGhlIHVzZXIgdG8gc2VsZWN0IGFuIEF6dXJlIGluc3RhbmNlIHRvIGxvZyBpbiB0by5cclxuICAvLyAgICAgICAvLyAoZXZlbiBpZiB0aGV5IGhhdmUgcHJldmlvdXNseSBzZWxlY3RlZCBhbiBBenVyZSBpbnN0YW5jZSlcclxuICAvLyAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9hdXRoZW50aWNhdGlvbi9sb2dpbiddKTtcclxuICAvLyAgIH1cclxuXHJcbiAgLy8gICAvLyBXaGVuIHRoZSBlcnJvciBtZXNzYWdlIGNvbnRhaW5zICdWSVAnIHdlIGtub3cgdGhlIEFBRCB0b2tlbiB3YXMgdmFsaWQgYW5kIHdlIGNhbiBqdXN0IHJldHVybiBpdFxyXG4gIC8vICAgcHJpdmF0ZSBjaGVja05ld0FhZFRva2VuSXNSZXF1aXJlZChlcnJvcjogUmVzcG9uc2UpIHtcclxuICAvLyAgICAgICBsZXQgcmVxdWlyZWQgPSB0cnVlO1xyXG4gIC8vICAgICAgIGNvbnN0IHJlID0gLyh2aXB8VklQKS87XHJcbiAgLy8gICAgICAgaWYgKGVycm9yLmpzb24oKS5tZXNzYWdlLnNlYXJjaChyZSkgIT09IC0xKSB7XHJcbiAgLy8gICAgICAgICAgIHJlcXVpcmVkID0gZmFsc2U7XHJcbiAgLy8gICAgICAgfVxyXG4gIC8vICAgICAgIHJldHVybiByZXF1aXJlZDtcclxuICAvLyAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgLy8gICAvKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKlxyXG4gIC8vICAgICogICAgICAgICAgICAgICAgICAgICAgIENPTlRBQ1QgQURNSU4gTE9HSUMgWzQwM10gICAgICAgICAgICAgICAgICAgICAgICpcclxuICAvLyAgICAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqL1xyXG5cclxuICBwcml2YXRlIGFzeW5jIGhhbmRsZUNvbnRhY3RBZG1pbihlcnJvcjogVmlwSHR0cEVycm9yUmVzb25zZSkge1xyXG4gICAgY29uc3QgYm9keSA9IGVycm9yO1xyXG5cclxuICAgIGNvbnNvbGUuZGVidWcoJ0hhbmRsaW5nIE9wZXJhdGlvbiBOb3QgQWxsb3dlZCcpO1xyXG4gICAgY29uc29sZS5kZWJ1ZygnVXNlciBpcyB1bmFibGUgdG8gY29udGludWUgYXV0aG9yaXphdGlvbiBwcm9jZXNzLicpO1xyXG4gICAgY29uc29sZS5kZWJ1Zyhib2R5LmVycm9yKTtcclxuICAgIGNvbnNvbGUuZGVidWcoJ1JlZGlyZWN0aW5nIHVzZXIgdG8gY29udGFjdCBhZG1pbiBwYWdlLi4uJyk7XHJcblxyXG4gICAgYXdhaXQgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvYXV0aGVudGljYXRpb24vY29udGFjdC1hZG1pbiAvJyArIGJvZHkucmVxdWVzdElkXSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8gICAgLyogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICpcclxuICAvLyAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgUkVHSVNUUkFUSU9OIExPR0lDIFs0MDRdICAgICAgICAgICAgICAgICAgICAgICAgKlxyXG4gIC8vICAgICAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqL1xyXG5cclxuICBwcml2YXRlIGFzeW5jIGhhbmRsZVJlZ2lzdHJhdGlvbihlcnJvcjogVmlwSHR0cEVycm9yUmVzb25zZSkge1xyXG4gICAgY29uc3QgYm9keSA9IGVycm9yO1xyXG5cclxuICAgIGNvbnNvbGUuZGVidWcoJ0hhbmRsaW5nIFJlZ2lzdHJhdGlvbicpO1xyXG5cclxuICAgIGNvbnNvbGUuZGVidWcoJ1VzZXIgaGFzIG5vdCB5ZXQgcmVnaXN0ZXJlZCB3aXRoIFZJUCcpO1xyXG4gICAgY29uc29sZS5kZWJ1Zyhib2R5LmVycm9yKTtcclxuICAgIGNvbnNvbGUuZGVidWcoJ1JlZGlyZWN0aW5nIHVzZXIgdG8gcmVnaXN0cmF0aW9uIHBhZ2UuLi4nKTtcclxuXHJcbiAgICBhd2FpdCB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9hdXRoZW50aWNhdGlvbi9yZWdpc3RlciddKTtcclxuICB9XHJcblxyXG5cclxuICAvLyAgIC8qICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqXHJcbiAgLy8gICAgKiAgICAgICAgICAgICAgICAgICAgT1ZFUlJJREUgREVGQVVMVCBIVFRQIE1FVEhPRFMgICAgICAgICAgICAgICAgICAgICAgKlxyXG4gIC8vICAgICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICovXHJcblxyXG4gIC8vICAgcmVxdWVzdCh1cmw6IHN0cmluZyB8IFJlcXVlc3QsIG9wdGlvbnM/OiBSZXF1ZXN0T3B0aW9uc0FyZ3MpOiBPYnNlcnZhYmxlPFJlc3BvbnNlPiB7XHJcbiAgLy8gICAgICAgcmV0dXJuIHN1cGVyLnJlcXVlc3QodXJsLCBvcHRpb25zKTtcclxuICAvLyAgIH1cclxuXHJcbiAgLy8gICBnZXQodXJsOiBzdHJpbmcsIG9wdGlvbnM/OiBSZXF1ZXN0T3B0aW9uc0FyZ3MpOiBPYnNlcnZhYmxlPFJlc3BvbnNlPiB7XHJcbiAgLy8gICAgICAgY29uc29sZS5kZWJ1ZygnSW50ZXJjZXB0ZWQgR0VUIFJlcXVlc3Q6Jyk7XHJcbiAgLy8gICAgICAgY29uc29sZS5kZWJ1ZygnLSB1cmw6ICcgKyB1cmwpO1xyXG4gIC8vICAgICAgIHJldHVybiB0aGlzLmludGVyY2VwdChzdXBlci5nZXQodXJsLCB0aGlzLmdldFJlcXVlc3RPcHRpb25BcmdzKG9wdGlvbnMpKSk7XHJcbiAgLy8gICB9XHJcblxyXG4gIC8vICAgcG9zdCh1cmw6IHN0cmluZywgYm9keTogc3RyaW5nLCBvcHRpb25zPzogUmVxdWVzdE9wdGlvbnNBcmdzKTogT2JzZXJ2YWJsZTxSZXNwb25zZT4ge1xyXG4gIC8vICAgICAgIGNvbnNvbGUuZGVidWcoJ0ludGVyY2VwdGVkIFBPU1QgUmVxdWVzdDonKTtcclxuICAvLyAgICAgICBjb25zb2xlLmRlYnVnKCctIHVybDogJyArIHVybCk7XHJcbiAgLy8gICAgICAgcmV0dXJuIHRoaXMuaW50ZXJjZXB0KHN1cGVyLnBvc3QodXJsLCBib2R5LCB0aGlzLmdldFJlcXVlc3RPcHRpb25BcmdzKG9wdGlvbnMpKSk7XHJcbiAgLy8gICB9XHJcblxyXG4gIC8vICAgcHV0KHVybDogc3RyaW5nLCBib2R5OiBzdHJpbmcsIG9wdGlvbnM/OiBSZXF1ZXN0T3B0aW9uc0FyZ3MpOiBPYnNlcnZhYmxlPFJlc3BvbnNlPiB7XHJcbiAgLy8gICAgICAgcmV0dXJuIHRoaXMuaW50ZXJjZXB0KHN1cGVyLnB1dCh1cmwsIGJvZHksIHRoaXMuZ2V0UmVxdWVzdE9wdGlvbkFyZ3Mob3B0aW9ucykpKTtcclxuICAvLyAgIH1cclxuXHJcbiAgLy8gICBkZWxldGUodXJsOiBzdHJpbmcsIG9wdGlvbnM/OiBSZXF1ZXN0T3B0aW9uc0FyZ3MpOiBPYnNlcnZhYmxlPFJlc3BvbnNlPiB7XHJcbiAgLy8gICAgICAgcmV0dXJuIHRoaXMuaW50ZXJjZXB0KHN1cGVyLmRlbGV0ZSh1cmwsIHRoaXMuZ2V0UmVxdWVzdE9wdGlvbkFyZ3Mob3B0aW9ucykpKTtcclxuICAvLyAgIH1cclxuICAvLyB9XHJcblxyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgSHR0cEF1dGhSZXF1ZXN0IHtcclxuICBbaW5kZXg6IHN0cmluZ106IHN0cmluZztcclxufVxyXG4iXX0=
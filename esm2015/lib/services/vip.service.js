import { __awaiter } from "tslib";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { NswhpAuthService } from '../nswhpauth.service';
import { IaDfpService } from './iadfp.service';
import { StorageService } from './storage.service';
// Semantics Device Fingerprint library
export class VipService {
    constructor(http, router, storage, iaDfpService, nswhpAuthService) {
        this.http = http;
        this.router = router;
        this.storage = storage;
        this.iaDfpService = iaDfpService;
        this.nswhpAuthService = nswhpAuthService;
        this.pushUrl = this.nswhpAuthService.nswhpAuthOptions.adal.pushUrl;
        this.otpUrl = this.nswhpAuthService.nswhpAuthOptions.adal.otpUrl;
        this.sendOtpUrl = this.nswhpAuthService.nswhpAuthOptions.adal.sendOtpUrl;
        this.registerUrl = this.nswhpAuthService.nswhpAuthOptions.adal.registerUrl;
    }
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     *                                 PUSH                                  *
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    // Wait for user to accept push notification
    pollUsersPushResponse() {
        console.debug('Authenticating user with PUSH...');
        const body = JSON.stringify({ transactionId: this.storage.retrieveTransactionId() });
        console.debug('TRANSACTION ID = ' + this.storage.retrieveTransactionId());
        return this.http.post(this.pushUrl, body)
            .pipe(map(res => this.extractData(res)))
            .pipe(catchError(this.handleError.bind(this)));
    }
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     *                                 OTP                                   *
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    // Send otp code for authentication
    authenticateOtpCode(otpCode) {
        console.debug('Authenticating user with OTP...');
        const newDeviceFingerprint = this.getDeviceFingerprint();
        const body = {
            deviceFingerprint: newDeviceFingerprint,
            otp: otpCode
        };
        return this.http.post(this.otpUrl, body)
            .pipe(map(res => this.extractData(res)))
            .pipe(catchError(this.handleError.bind(this)));
    }
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     *                            REGISTRATION                               *
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    // Send the user a SMS OTP code for registration
    sendOtpForRegistration() {
        console.debug('Creating VIP Account and sending user SMS OTP code...');
        const newDeviceFingerprint = this.getDeviceFingerprint();
        const body = {
            deviceFingerprint: newDeviceFingerprint
        };
        return this.http.post(this.sendOtpUrl, body)
            .pipe(map(res => this.extractData(res)))
            .pipe(catchError(this.handleError.bind(this)));
    }
    // Send user information for VIP registration
    submitVipRegistration(newCredentialId, newOtp1, newOtp2, newTempOtp) {
        console.debug('Submitting user\'s VIP registration...');
        const newDeviceFingerprint = this.getDeviceFingerprint();
        const body = {
            deviceFingerprint: newDeviceFingerprint,
            credentialId: newCredentialId,
            otp1: newOtp1,
            otp2: newOtp2,
            tempOtp: newTempOtp
        };
        console.debug('Device fingerprint: ' + newDeviceFingerprint);
        console.debug('Credential ID: ' + newCredentialId);
        console.debug('First security code: ' + newOtp1);
        console.debug('Second security code: ' + newOtp2);
        console.debug('SMS Code: ' + newTempOtp);
        return this.http.post(this.registerUrl, body)
            .pipe(tap(res => this.extractData(res), catchError(this.handleError.bind(this))));
    }
    // Return to the last location the user made a http request and got a 401
    redirectToLastLocation() {
        console.debug('### VIP SERVICE: redirectToLastLocation');
        const lastLocation = this.storage.retrieveLastLocation();
        this.storage.clearLastLocation();
        if (lastLocation) {
            console.debug('### We HAVE just returned from handling a 401 error. Redirecting to... ' + lastLocation);
            this.storage.clearLastLocation();
            // Use hreft to simplify the process of restoring and routing
            // route parameters and query parameters
            window.location.href = lastLocation;
        }
        else {
            console.debug('### We have NOT returned from handling a 401 error');
        }
    }
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    getDeviceFingerprint() {
        return this.iaDfpService.IaDfp.readFingerprint();
    }
    extractData(res) {
        console.debug('>>> VIP SERVICE: ');
        console.debug(res);
        // Store the Vip token if returned here so the components don't have to think about it
        if (res.vipToken) {
            this.storage.storeVipToken(res.vipToken);
        }
        return res;
    }
    /**
     * If the error is a 403 navigate to the Contact Admin page, otherwise bubble
     * the error up
     */
    handleError(error) {
        return __awaiter(this, void 0, void 0, function* () {
            // 403 Forbidden - Require Admin
            if (error.status === 403) {
                yield this.handleContactAdmin(error);
                return EMPTY;
            }
            else {
                return throwError(error);
            }
        });
    }
    handleContactAdmin(error) {
        return __awaiter(this, void 0, void 0, function* () {
            console.debug('Handling Operation Not Allowed');
            console.debug('User is unable to continue authorization process.');
            console.debug(error.error.detailMessage);
            console.debug('Redirecting user to contact admin page...');
            // To be implemented under DT-1138
            yield this.router.navigate(['/authentication/contact-admin/' + error.error.requestId]);
        });
    }
}
VipService.decorators = [
    { type: Injectable }
];
VipService.ctorParameters = () => [
    { type: HttpClient },
    { type: Router },
    { type: StorageService },
    { type: IaDfpService },
    { type: NswhpAuthService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlwLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiQzovUHJvamVjdHMvbnN3aHBhdXRoLW1vZHVsZS9wcm9qZWN0cy9uc3docGF1dGgvc3JjLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3ZpcC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFxQixNQUFNLHNCQUFzQixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBRSxLQUFLLEVBQWMsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3JELE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR3RELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFbkQsdUNBQXVDO0FBRXZDLE1BQU0sT0FBTyxVQUFVO0lBTXJCLFlBQ1UsSUFBZ0IsRUFDaEIsTUFBYyxFQUNkLE9BQXVCLEVBQ3ZCLFlBQTBCLEVBQzFCLGdCQUFrQztRQUpsQyxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxZQUFPLEdBQVAsT0FBTyxDQUFnQjtRQUN2QixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBRTFDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDbkUsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsZ0JBQWdC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S0FBSyxDQUFDLDJDQUEyQyxDQUFDLENBQUM7WUFFM0Qsa0NBQWtDO1lBQ2xDLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxnQ0FBZ0MsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDekYsQ0FBQztLQUFBOzs7WUFqS0YsVUFBVTs7O1lBWkYsVUFBVTtZQUVWLE1BQU07WUFPTixjQUFjO1lBRGQsWUFBWTtZQURaLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBFcnJvclJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IEVNUFRZLCBPYnNlcnZhYmxlLCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgSU1mYU1lc3NhZ2UgfSBmcm9tICcuLi9tb2RlbC9tZmFNZXNzYWdlJztcclxuaW1wb3J0IHsgTnN3aHBBdXRoU2VydmljZSB9IGZyb20gJy4uL25zd2hwYXV0aC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSWFEZnBTZXJ2aWNlIH0gZnJvbSAnLi9pYWRmcC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuL3N0b3JhZ2Uuc2VydmljZSc7XHJcblxyXG4vLyBTZW1hbnRpY3MgRGV2aWNlIEZpbmdlcnByaW50IGxpYnJhcnlcclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgVmlwU2VydmljZSB7XHJcbiAgcHJpdmF0ZSBwdXNoVXJsOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBvdHBVcmw6IHN0cmluZztcclxuICBwcml2YXRlIHNlbmRPdHBVcmw6IHN0cmluZztcclxuICBwcml2YXRlIHJlZ2lzdGVyVXJsOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxyXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcclxuICAgIHByaXZhdGUgc3RvcmFnZTogU3RvcmFnZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGlhRGZwU2VydmljZTogSWFEZnBTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBuc3docEF1dGhTZXJ2aWNlOiBOc3docEF1dGhTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICB0aGlzLnB1c2hVcmwgPSB0aGlzLm5zd2hwQXV0aFNlcnZpY2UubnN3aHBBdXRoT3B0aW9ucy5hZGFsLnB1c2hVcmw7XHJcbiAgICB0aGlzLm90cFVybCA9IHRoaXMubnN3aHBBdXRoU2VydmljZS5uc3docEF1dGhPcHRpb25zLmFkYWwub3RwVXJsO1xyXG4gICAgdGhpcy5zZW5kT3RwVXJsID0gdGhpcy5uc3docEF1dGhTZXJ2aWNlLm5zd2hwQXV0aE9wdGlvbnMuYWRhbC5zZW5kT3RwVXJsO1xyXG4gICAgdGhpcy5yZWdpc3RlclVybCA9IHRoaXMubnN3aHBBdXRoU2VydmljZS5uc3docEF1dGhPcHRpb25zLmFkYWwucmVnaXN0ZXJVcmw7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICpcclxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBVU0ggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxyXG4gICAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqL1xyXG5cclxuICAvLyBXYWl0IGZvciB1c2VyIHRvIGFjY2VwdCBwdXNoIG5vdGlmaWNhdGlvblxyXG4gIHB1YmxpYyBwb2xsVXNlcnNQdXNoUmVzcG9uc2UoKTogT2JzZXJ2YWJsZTxJTWZhTWVzc2FnZT4ge1xyXG4gICAgY29uc29sZS5kZWJ1ZygnQXV0aGVudGljYXRpbmcgdXNlciB3aXRoIFBVU0guLi4nKTtcclxuXHJcbiAgICBjb25zdCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoeyB0cmFuc2FjdGlvbklkOiB0aGlzLnN0b3JhZ2UucmV0cmlldmVUcmFuc2FjdGlvbklkKCkgfSk7XHJcbiAgICBjb25zb2xlLmRlYnVnKCdUUkFOU0FDVElPTiBJRCA9ICcgKyB0aGlzLnN0b3JhZ2UucmV0cmlldmVUcmFuc2FjdGlvbklkKCkpO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdDxJTWZhTWVzc2FnZT4odGhpcy5wdXNoVXJsLCBib2R5KVxyXG4gICAgICAucGlwZShtYXAocmVzID0+IHRoaXMuZXh0cmFjdERhdGEocmVzKSkpXHJcbiAgICAgIC5waXBlKGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvci5iaW5kKHRoaXMpKSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICpcclxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9UUCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxyXG4gICAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqL1xyXG5cclxuICAvLyBTZW5kIG90cCBjb2RlIGZvciBhdXRoZW50aWNhdGlvblxyXG4gIHB1YmxpYyBhdXRoZW50aWNhdGVPdHBDb2RlKG90cENvZGU6IHN0cmluZyk6IE9ic2VydmFibGU8SU1mYU1lc3NhZ2U+IHtcclxuICAgIGNvbnNvbGUuZGVidWcoJ0F1dGhlbnRpY2F0aW5nIHVzZXIgd2l0aCBPVFAuLi4nKTtcclxuXHJcbiAgICBjb25zdCBuZXdEZXZpY2VGaW5nZXJwcmludCA9IHRoaXMuZ2V0RGV2aWNlRmluZ2VycHJpbnQoKTtcclxuICAgIGNvbnN0IGJvZHkgPSB7XHJcbiAgICAgIGRldmljZUZpbmdlcnByaW50OiBuZXdEZXZpY2VGaW5nZXJwcmludCxcclxuICAgICAgb3RwOiBvdHBDb2RlXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdDxJTWZhTWVzc2FnZT4odGhpcy5vdHBVcmwsIGJvZHkpXHJcbiAgICAgIC5waXBlKG1hcChyZXMgPT4gdGhpcy5leHRyYWN0RGF0YShyZXMpKSlcclxuICAgICAgLnBpcGUoY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yLmJpbmQodGhpcykpKTtcclxuICB9XHJcblxyXG5cclxuICAvKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKlxyXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJFR0lTVFJBVElPTiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXHJcbiAgICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICovXHJcblxyXG4gIC8vIFNlbmQgdGhlIHVzZXIgYSBTTVMgT1RQIGNvZGUgZm9yIHJlZ2lzdHJhdGlvblxyXG4gIHB1YmxpYyBzZW5kT3RwRm9yUmVnaXN0cmF0aW9uKCkge1xyXG4gICAgY29uc29sZS5kZWJ1ZygnQ3JlYXRpbmcgVklQIEFjY291bnQgYW5kIHNlbmRpbmcgdXNlciBTTVMgT1RQIGNvZGUuLi4nKTtcclxuXHJcbiAgICBjb25zdCBuZXdEZXZpY2VGaW5nZXJwcmludCA9IHRoaXMuZ2V0RGV2aWNlRmluZ2VycHJpbnQoKTtcclxuICAgIGNvbnN0IGJvZHkgPSB7XHJcbiAgICAgIGRldmljZUZpbmdlcnByaW50OiBuZXdEZXZpY2VGaW5nZXJwcmludFxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Q8SU1mYU1lc3NhZ2U+KHRoaXMuc2VuZE90cFVybCwgYm9keSlcclxuICAgICAgLnBpcGUobWFwKHJlcyA9PiB0aGlzLmV4dHJhY3REYXRhKHJlcykpKVxyXG4gICAgICAucGlwZShjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IuYmluZCh0aGlzKSkpO1xyXG4gIH1cclxuXHJcbiAgLy8gU2VuZCB1c2VyIGluZm9ybWF0aW9uIGZvciBWSVAgcmVnaXN0cmF0aW9uXHJcbiAgcHVibGljIHN1Ym1pdFZpcFJlZ2lzdHJhdGlvbihuZXdDcmVkZW50aWFsSWQ6IHN0cmluZywgbmV3T3RwMTogc3RyaW5nLCBuZXdPdHAyOiBzdHJpbmcsIG5ld1RlbXBPdHA6IHN0cmluZykge1xyXG4gICAgY29uc29sZS5kZWJ1ZygnU3VibWl0dGluZyB1c2VyXFwncyBWSVAgcmVnaXN0cmF0aW9uLi4uJyk7XHJcblxyXG4gICAgY29uc3QgbmV3RGV2aWNlRmluZ2VycHJpbnQgPSB0aGlzLmdldERldmljZUZpbmdlcnByaW50KCk7XHJcbiAgICBjb25zdCBib2R5ID0ge1xyXG4gICAgICBkZXZpY2VGaW5nZXJwcmludDogbmV3RGV2aWNlRmluZ2VycHJpbnQsXHJcbiAgICAgIGNyZWRlbnRpYWxJZDogbmV3Q3JlZGVudGlhbElkLFxyXG4gICAgICBvdHAxOiBuZXdPdHAxLFxyXG4gICAgICBvdHAyOiBuZXdPdHAyLFxyXG4gICAgICB0ZW1wT3RwOiBuZXdUZW1wT3RwXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnNvbGUuZGVidWcoJ0RldmljZSBmaW5nZXJwcmludDogJyArIG5ld0RldmljZUZpbmdlcnByaW50KTtcclxuICAgIGNvbnNvbGUuZGVidWcoJ0NyZWRlbnRpYWwgSUQ6ICcgKyBuZXdDcmVkZW50aWFsSWQpO1xyXG4gICAgY29uc29sZS5kZWJ1ZygnRmlyc3Qgc2VjdXJpdHkgY29kZTogJyArIG5ld090cDEpO1xyXG4gICAgY29uc29sZS5kZWJ1ZygnU2Vjb25kIHNlY3VyaXR5IGNvZGU6ICcgKyBuZXdPdHAyKTtcclxuICAgIGNvbnNvbGUuZGVidWcoJ1NNUyBDb2RlOiAnICsgbmV3VGVtcE90cCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0PElNZmFNZXNzYWdlPih0aGlzLnJlZ2lzdGVyVXJsLCBib2R5KVxyXG4gICAgICAucGlwZShcclxuICAgICAgICB0YXAocmVzID0+IHRoaXMuZXh0cmFjdERhdGEocmVzKSxcclxuICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvci5iaW5kKHRoaXMpKSlcclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIC8vIFJldHVybiB0byB0aGUgbGFzdCBsb2NhdGlvbiB0aGUgdXNlciBtYWRlIGEgaHR0cCByZXF1ZXN0IGFuZCBnb3QgYSA0MDFcclxuICBwdWJsaWMgcmVkaXJlY3RUb0xhc3RMb2NhdGlvbigpIHtcclxuICAgIGNvbnNvbGUuZGVidWcoJyMjIyBWSVAgU0VSVklDRTogcmVkaXJlY3RUb0xhc3RMb2NhdGlvbicpO1xyXG4gICAgY29uc3QgbGFzdExvY2F0aW9uID0gdGhpcy5zdG9yYWdlLnJldHJpZXZlTGFzdExvY2F0aW9uKCk7XHJcbiAgICB0aGlzLnN0b3JhZ2UuY2xlYXJMYXN0TG9jYXRpb24oKTtcclxuICAgIGlmIChsYXN0TG9jYXRpb24pIHtcclxuICAgICAgY29uc29sZS5kZWJ1ZygnIyMjIFdlIEhBVkUganVzdCByZXR1cm5lZCBmcm9tIGhhbmRsaW5nIGEgNDAxIGVycm9yLiBSZWRpcmVjdGluZyB0by4uLiAnICsgbGFzdExvY2F0aW9uKTtcclxuXHJcbiAgICAgIHRoaXMuc3RvcmFnZS5jbGVhckxhc3RMb2NhdGlvbigpO1xyXG4gICAgICAvLyBVc2UgaHJlZnQgdG8gc2ltcGxpZnkgdGhlIHByb2Nlc3Mgb2YgcmVzdG9yaW5nIGFuZCByb3V0aW5nXHJcbiAgICAgIC8vIHJvdXRlIHBhcmFtZXRlcnMgYW5kIHF1ZXJ5IHBhcmFtZXRlcnNcclxuICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBsYXN0TG9jYXRpb247XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmRlYnVnKCcjIyMgV2UgaGF2ZSBOT1QgcmV0dXJuZWQgZnJvbSBoYW5kbGluZyBhIDQwMSBlcnJvcicpO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG5cclxuICAvKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKi9cclxuXHJcbiAgcHJpdmF0ZSBnZXREZXZpY2VGaW5nZXJwcmludCgpIHtcclxuICAgIHJldHVybiB0aGlzLmlhRGZwU2VydmljZS5JYURmcC5yZWFkRmluZ2VycHJpbnQoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXh0cmFjdERhdGEocmVzOiBJTWZhTWVzc2FnZSkge1xyXG4gICAgY29uc29sZS5kZWJ1ZygnPj4+IFZJUCBTRVJWSUNFOiAnKTtcclxuICAgIGNvbnNvbGUuZGVidWcocmVzKTtcclxuXHJcbiAgICAvLyBTdG9yZSB0aGUgVmlwIHRva2VuIGlmIHJldHVybmVkIGhlcmUgc28gdGhlIGNvbXBvbmVudHMgZG9uJ3QgaGF2ZSB0byB0aGluayBhYm91dCBpdFxyXG4gICAgaWYgKHJlcy52aXBUb2tlbikge1xyXG4gICAgICB0aGlzLnN0b3JhZ2Uuc3RvcmVWaXBUb2tlbihyZXMudmlwVG9rZW4pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJZiB0aGUgZXJyb3IgaXMgYSA0MDMgbmF2aWdhdGUgdG8gdGhlIENvbnRhY3QgQWRtaW4gcGFnZSwgb3RoZXJ3aXNlIGJ1YmJsZVxyXG4gICAqIHRoZSBlcnJvciB1cFxyXG4gICAqL1xyXG4gIHByaXZhdGUgYXN5bmMgaGFuZGxlRXJyb3IoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKSB7XHJcbiAgICAvLyA0MDMgRm9yYmlkZGVuIC0gUmVxdWlyZSBBZG1pblxyXG4gICAgaWYgKGVycm9yLnN0YXR1cyA9PT0gNDAzKSB7XHJcbiAgICAgIGF3YWl0IHRoaXMuaGFuZGxlQ29udGFjdEFkbWluKGVycm9yKTtcclxuICAgICAgcmV0dXJuIEVNUFRZO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRocm93RXJyb3IoZXJyb3IpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhc3luYyBoYW5kbGVDb250YWN0QWRtaW4oZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKSB7XHJcbiAgICBjb25zb2xlLmRlYnVnKCdIYW5kbGluZyBPcGVyYXRpb24gTm90IEFsbG93ZWQnKTtcclxuICAgIGNvbnNvbGUuZGVidWcoJ1VzZXIgaXMgdW5hYmxlIHRvIGNvbnRpbnVlIGF1dGhvcml6YXRpb24gcHJvY2Vzcy4nKTtcclxuICAgIGNvbnNvbGUuZGVidWcoZXJyb3IuZXJyb3IuZGV0YWlsTWVzc2FnZSk7XHJcbiAgICBjb25zb2xlLmRlYnVnKCdSZWRpcmVjdGluZyB1c2VyIHRvIGNvbnRhY3QgYWRtaW4gcGFnZS4uLicpO1xyXG5cclxuICAgIC8vIFRvIGJlIGltcGxlbWVudGVkIHVuZGVyIERULTExMzhcclxuICAgIGF3YWl0IHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2F1dGhlbnRpY2F0aW9uL2NvbnRhY3QtYWRtaW4vJyArIGVycm9yLmVycm9yLnJlcXVlc3RJZF0pO1xyXG4gIH1cclxufVxyXG4iXX0=
import { __awaiter } from "tslib";
import { Injectable } from '@angular/core';
import { EMPTY, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@angular/router";
import * as i3 from "./storage.service";
import * as i4 from "./iadfp.service";
import * as i5 from "../nswhpauth.service";
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
VipService.ɵfac = function VipService_Factory(t) { return new (t || VipService)(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.Router), i0.ɵɵinject(i3.StorageService), i0.ɵɵinject(i4.IaDfpService), i0.ɵɵinject(i5.NswhpAuthService)); };
VipService.ɵprov = i0.ɵɵdefineInjectable({ token: VipService, factory: VipService.ɵfac });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(VipService, [{
        type: Injectable
    }], function () { return [{ type: i1.HttpClient }, { type: i2.Router }, { type: i3.StorageService }, { type: i4.IaDfpService }, { type: i5.NswhpAuthService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlwLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiQzovUHJvamVjdHMvbnN3aHBhdXRoLW1vZHVsZS9wcm9qZWN0cy9uc3docGF1dGgvc3JjLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3ZpcC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxLQUFLLEVBQWMsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3JELE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7O0FBT3RELHVDQUF1QztBQUV2QyxNQUFNLE9BQU8sVUFBVTtJQU1yQixZQUNVLElBQWdCLEVBQ2hCLE1BQWMsRUFDZCxPQUF1QixFQUN2QixZQUEwQixFQUMxQixnQkFBa0M7UUFKbEMsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsWUFBTyxHQUFQLE9BQU8sQ0FBZ0I7UUFDdkIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUUxQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ25FLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDakUsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUN6RSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzdFLENBQUM7SUFH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c291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEVycm9yUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgRU1QVFksIE9ic2VydmFibGUsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBJTWZhTWVzc2FnZSB9IGZyb20gJy4uL21vZGVsL21mYU1lc3NhZ2UnO1xyXG5pbXBvcnQgeyBOc3docEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vbnN3aHBhdXRoLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJYURmcFNlcnZpY2UgfSBmcm9tICcuL2lhZGZwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTdG9yYWdlU2VydmljZSB9IGZyb20gJy4vc3RvcmFnZS5zZXJ2aWNlJztcclxuXHJcbi8vIFNlbWFudGljcyBEZXZpY2UgRmluZ2VycHJpbnQgbGlicmFyeVxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBWaXBTZXJ2aWNlIHtcclxuICBwcml2YXRlIHB1c2hVcmw6IHN0cmluZztcclxuICBwcml2YXRlIG90cFVybDogc3RyaW5nO1xyXG4gIHByaXZhdGUgc2VuZE90cFVybDogc3RyaW5nO1xyXG4gIHByaXZhdGUgcmVnaXN0ZXJVcmw6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXHJcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxyXG4gICAgcHJpdmF0ZSBzdG9yYWdlOiBTdG9yYWdlU2VydmljZSxcclxuICAgIHByaXZhdGUgaWFEZnBTZXJ2aWNlOiBJYURmcFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIG5zd2hwQXV0aFNlcnZpY2U6IE5zd2hwQXV0aFNlcnZpY2VcclxuICApIHtcclxuICAgIHRoaXMucHVzaFVybCA9IHRoaXMubnN3aHBBdXRoU2VydmljZS5uc3docEF1dGhPcHRpb25zLmFkYWwucHVzaFVybDtcclxuICAgIHRoaXMub3RwVXJsID0gdGhpcy5uc3docEF1dGhTZXJ2aWNlLm5zd2hwQXV0aE9wdGlvbnMuYWRhbC5vdHBVcmw7XHJcbiAgICB0aGlzLnNlbmRPdHBVcmwgPSB0aGlzLm5zd2hwQXV0aFNlcnZpY2UubnN3aHBBdXRoT3B0aW9ucy5hZGFsLnNlbmRPdHBVcmw7XHJcbiAgICB0aGlzLnJlZ2lzdGVyVXJsID0gdGhpcy5uc3docEF1dGhTZXJ2aWNlLm5zd2hwQXV0aE9wdGlvbnMuYWRhbC5yZWdpc3RlclVybDtcclxuICB9XHJcblxyXG5cclxuICAvKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKlxyXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUFVTSCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXHJcbiAgICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICovXHJcblxyXG4gIC8vIFdhaXQgZm9yIHVzZXIgdG8gYWNjZXB0IHB1c2ggbm90aWZpY2F0aW9uXHJcbiAgcHVibGljIHBvbGxVc2Vyc1B1c2hSZXNwb25zZSgpOiBPYnNlcnZhYmxlPElNZmFNZXNzYWdlPiB7XHJcbiAgICBjb25zb2xlLmRlYnVnKCdBdXRoZW50aWNhdGluZyB1c2VyIHdpdGggUFVTSC4uLicpO1xyXG5cclxuICAgIGNvbnN0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7IHRyYW5zYWN0aW9uSWQ6IHRoaXMuc3RvcmFnZS5yZXRyaWV2ZVRyYW5zYWN0aW9uSWQoKSB9KTtcclxuICAgIGNvbnNvbGUuZGVidWcoJ1RSQU5TQUNUSU9OIElEID0gJyArIHRoaXMuc3RvcmFnZS5yZXRyaWV2ZVRyYW5zYWN0aW9uSWQoKSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0PElNZmFNZXNzYWdlPih0aGlzLnB1c2hVcmwsIGJvZHkpXHJcbiAgICAgIC5waXBlKG1hcChyZXMgPT4gdGhpcy5leHRyYWN0RGF0YShyZXMpKSlcclxuICAgICAgLnBpcGUoY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yLmJpbmQodGhpcykpKTtcclxuICB9XHJcblxyXG5cclxuICAvKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKlxyXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT1RQICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXHJcbiAgICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICovXHJcblxyXG4gIC8vIFNlbmQgb3RwIGNvZGUgZm9yIGF1dGhlbnRpY2F0aW9uXHJcbiAgcHVibGljIGF1dGhlbnRpY2F0ZU90cENvZGUob3RwQ29kZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxJTWZhTWVzc2FnZT4ge1xyXG4gICAgY29uc29sZS5kZWJ1ZygnQXV0aGVudGljYXRpbmcgdXNlciB3aXRoIE9UUC4uLicpO1xyXG5cclxuICAgIGNvbnN0IG5ld0RldmljZUZpbmdlcnByaW50ID0gdGhpcy5nZXREZXZpY2VGaW5nZXJwcmludCgpO1xyXG4gICAgY29uc3QgYm9keSA9IHtcclxuICAgICAgZGV2aWNlRmluZ2VycHJpbnQ6IG5ld0RldmljZUZpbmdlcnByaW50LFxyXG4gICAgICBvdHA6IG90cENvZGVcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0PElNZmFNZXNzYWdlPih0aGlzLm90cFVybCwgYm9keSlcclxuICAgICAgLnBpcGUobWFwKHJlcyA9PiB0aGlzLmV4dHJhY3REYXRhKHJlcykpKVxyXG4gICAgICAucGlwZShjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IuYmluZCh0aGlzKSkpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqXHJcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgUkVHSVNUUkFUSU9OICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcclxuICAgKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKi9cclxuXHJcbiAgLy8gU2VuZCB0aGUgdXNlciBhIFNNUyBPVFAgY29kZSBmb3IgcmVnaXN0cmF0aW9uXHJcbiAgcHVibGljIHNlbmRPdHBGb3JSZWdpc3RyYXRpb24oKSB7XHJcbiAgICBjb25zb2xlLmRlYnVnKCdDcmVhdGluZyBWSVAgQWNjb3VudCBhbmQgc2VuZGluZyB1c2VyIFNNUyBPVFAgY29kZS4uLicpO1xyXG5cclxuICAgIGNvbnN0IG5ld0RldmljZUZpbmdlcnByaW50ID0gdGhpcy5nZXREZXZpY2VGaW5nZXJwcmludCgpO1xyXG4gICAgY29uc3QgYm9keSA9IHtcclxuICAgICAgZGV2aWNlRmluZ2VycHJpbnQ6IG5ld0RldmljZUZpbmdlcnByaW50XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdDxJTWZhTWVzc2FnZT4odGhpcy5zZW5kT3RwVXJsLCBib2R5KVxyXG4gICAgICAucGlwZShtYXAocmVzID0+IHRoaXMuZXh0cmFjdERhdGEocmVzKSkpXHJcbiAgICAgIC5waXBlKGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvci5iaW5kKHRoaXMpKSk7XHJcbiAgfVxyXG5cclxuICAvLyBTZW5kIHVzZXIgaW5mb3JtYXRpb24gZm9yIFZJUCByZWdpc3RyYXRpb25cclxuICBwdWJsaWMgc3VibWl0VmlwUmVnaXN0cmF0aW9uKG5ld0NyZWRlbnRpYWxJZDogc3RyaW5nLCBuZXdPdHAxOiBzdHJpbmcsIG5ld090cDI6IHN0cmluZywgbmV3VGVtcE90cDogc3RyaW5nKSB7XHJcbiAgICBjb25zb2xlLmRlYnVnKCdTdWJtaXR0aW5nIHVzZXJcXCdzIFZJUCByZWdpc3RyYXRpb24uLi4nKTtcclxuXHJcbiAgICBjb25zdCBuZXdEZXZpY2VGaW5nZXJwcmludCA9IHRoaXMuZ2V0RGV2aWNlRmluZ2VycHJpbnQoKTtcclxuICAgIGNvbnN0IGJvZHkgPSB7XHJcbiAgICAgIGRldmljZUZpbmdlcnByaW50OiBuZXdEZXZpY2VGaW5nZXJwcmludCxcclxuICAgICAgY3JlZGVudGlhbElkOiBuZXdDcmVkZW50aWFsSWQsXHJcbiAgICAgIG90cDE6IG5ld090cDEsXHJcbiAgICAgIG90cDI6IG5ld090cDIsXHJcbiAgICAgIHRlbXBPdHA6IG5ld1RlbXBPdHBcclxuICAgIH07XHJcblxyXG4gICAgY29uc29sZS5kZWJ1ZygnRGV2aWNlIGZpbmdlcnByaW50OiAnICsgbmV3RGV2aWNlRmluZ2VycHJpbnQpO1xyXG4gICAgY29uc29sZS5kZWJ1ZygnQ3JlZGVudGlhbCBJRDogJyArIG5ld0NyZWRlbnRpYWxJZCk7XHJcbiAgICBjb25zb2xlLmRlYnVnKCdGaXJzdCBzZWN1cml0eSBjb2RlOiAnICsgbmV3T3RwMSk7XHJcbiAgICBjb25zb2xlLmRlYnVnKCdTZWNvbmQgc2VjdXJpdHkgY29kZTogJyArIG5ld090cDIpO1xyXG4gICAgY29uc29sZS5kZWJ1ZygnU01TIENvZGU6ICcgKyBuZXdUZW1wT3RwKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Q8SU1mYU1lc3NhZ2U+KHRoaXMucmVnaXN0ZXJVcmwsIGJvZHkpXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIHRhcChyZXMgPT4gdGhpcy5leHRyYWN0RGF0YShyZXMpLFxyXG4gICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yLmJpbmQodGhpcykpKVxyXG4gICAgICApO1xyXG4gIH1cclxuXHJcbiAgLy8gUmV0dXJuIHRvIHRoZSBsYXN0IGxvY2F0aW9uIHRoZSB1c2VyIG1hZGUgYSBodHRwIHJlcXVlc3QgYW5kIGdvdCBhIDQwMVxyXG4gIHB1YmxpYyByZWRpcmVjdFRvTGFzdExvY2F0aW9uKCkge1xyXG4gICAgY29uc29sZS5kZWJ1ZygnIyMjIFZJUCBTRVJWSUNFOiByZWRpcmVjdFRvTGFzdExvY2F0aW9uJyk7XHJcbiAgICBjb25zdCBsYXN0TG9jYXRpb24gPSB0aGlzLnN0b3JhZ2UucmV0cmlldmVMYXN0TG9jYXRpb24oKTtcclxuICAgIHRoaXMuc3RvcmFnZS5jbGVhckxhc3RMb2NhdGlvbigpO1xyXG4gICAgaWYgKGxhc3RMb2NhdGlvbikge1xyXG4gICAgICBjb25zb2xlLmRlYnVnKCcjIyMgV2UgSEFWRSBqdXN0IHJldHVybmVkIGZyb20gaGFuZGxpbmcgYSA0MDEgZXJyb3IuIFJlZGlyZWN0aW5nIHRvLi4uICcgKyBsYXN0TG9jYXRpb24pO1xyXG5cclxuICAgICAgdGhpcy5zdG9yYWdlLmNsZWFyTGFzdExvY2F0aW9uKCk7XHJcbiAgICAgIC8vIFVzZSBocmVmdCB0byBzaW1wbGlmeSB0aGUgcHJvY2VzcyBvZiByZXN0b3JpbmcgYW5kIHJvdXRpbmdcclxuICAgICAgLy8gcm91dGUgcGFyYW1ldGVycyBhbmQgcXVlcnkgcGFyYW1ldGVyc1xyXG4gICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGxhc3RMb2NhdGlvbjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUuZGVidWcoJyMjIyBXZSBoYXZlIE5PVCByZXR1cm5lZCBmcm9tIGhhbmRsaW5nIGEgNDAxIGVycm9yJyk7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcblxyXG4gIC8qICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqL1xyXG5cclxuICBwcml2YXRlIGdldERldmljZUZpbmdlcnByaW50KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuaWFEZnBTZXJ2aWNlLklhRGZwLnJlYWRGaW5nZXJwcmludCgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBleHRyYWN0RGF0YShyZXM6IElNZmFNZXNzYWdlKSB7XHJcbiAgICBjb25zb2xlLmRlYnVnKCc+Pj4gVklQIFNFUlZJQ0U6ICcpO1xyXG4gICAgY29uc29sZS5kZWJ1ZyhyZXMpO1xyXG5cclxuICAgIC8vIFN0b3JlIHRoZSBWaXAgdG9rZW4gaWYgcmV0dXJuZWQgaGVyZSBzbyB0aGUgY29tcG9uZW50cyBkb24ndCBoYXZlIHRvIHRoaW5rIGFib3V0IGl0XHJcbiAgICBpZiAocmVzLnZpcFRva2VuKSB7XHJcbiAgICAgIHRoaXMuc3RvcmFnZS5zdG9yZVZpcFRva2VuKHJlcy52aXBUb2tlbik7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIElmIHRoZSBlcnJvciBpcyBhIDQwMyBuYXZpZ2F0ZSB0byB0aGUgQ29udGFjdCBBZG1pbiBwYWdlLCBvdGhlcndpc2UgYnViYmxlXHJcbiAgICogdGhlIGVycm9yIHVwXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhc3luYyBoYW5kbGVFcnJvcihlcnJvcjogSHR0cEVycm9yUmVzcG9uc2UpIHtcclxuICAgIC8vIDQwMyBGb3JiaWRkZW4gLSBSZXF1aXJlIEFkbWluXHJcbiAgICBpZiAoZXJyb3Iuc3RhdHVzID09PSA0MDMpIHtcclxuICAgICAgYXdhaXQgdGhpcy5oYW5kbGVDb250YWN0QWRtaW4oZXJyb3IpO1xyXG4gICAgICByZXR1cm4gRU1QVFk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdGhyb3dFcnJvcihlcnJvcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFzeW5jIGhhbmRsZUNvbnRhY3RBZG1pbihlcnJvcjogSHR0cEVycm9yUmVzcG9uc2UpIHtcclxuICAgIGNvbnNvbGUuZGVidWcoJ0hhbmRsaW5nIE9wZXJhdGlvbiBOb3QgQWxsb3dlZCcpO1xyXG4gICAgY29uc29sZS5kZWJ1ZygnVXNlciBpcyB1bmFibGUgdG8gY29udGludWUgYXV0aG9yaXphdGlvbiBwcm9jZXNzLicpO1xyXG4gICAgY29uc29sZS5kZWJ1ZyhlcnJvci5lcnJvci5kZXRhaWxNZXNzYWdlKTtcclxuICAgIGNvbnNvbGUuZGVidWcoJ1JlZGlyZWN0aW5nIHVzZXIgdG8gY29udGFjdCBhZG1pbiBwYWdlLi4uJyk7XHJcblxyXG4gICAgLy8gVG8gYmUgaW1wbGVtZW50ZWQgdW5kZXIgRFQtMTEzOFxyXG4gICAgYXdhaXQgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvYXV0aGVudGljYXRpb24vY29udGFjdC1hZG1pbi8nICsgZXJyb3IuZXJyb3IucmVxdWVzdElkXSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
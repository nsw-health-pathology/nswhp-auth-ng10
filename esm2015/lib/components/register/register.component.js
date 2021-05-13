import { __awaiter } from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VipService } from '../../services/vip.service';
export class RegisterComponent {
    constructor(router, vipService) {
        this.router = router;
        this.vipService = vipService;
        this.smsCodeSent = false;
        this.registered = false;
        this.failed = false;
        this.statusMessage = '';
        this.submitButtonText = 'Register';
        this.mobileNumber = '';
        this.invalidInputMessage = '';
        // Input values
        this.credentialIdValue = '';
        this.otp1Value = '';
        this.otp2Value = '';
        this.tempOtpValue = '';
        // Store the valid flag for each input in the form
        this.validInputs = [true, true, true, true];
        this.CREDENTIAL_ID = 0;
        this.OTP_1 = 1;
        this.OTP_2 = 2;
        this.TEMP_OTP = 3;
    }
    ngOnInit() {
        // Send SMS OTP code for registration
        this.initiateRegistrationProcess();
    }
    initiateRegistrationProcess() {
        this.smsCodeSent = false;
        this.validInputs = [true, true, true, true];
        this.vipService.sendOtpForRegistration().subscribe(response => {
            console.debug(response);
            this.smsCodeSent = true;
            this.mobileNumber = response.mobileNumber;
        }, (error) => __awaiter(this, void 0, void 0, function* () {
            console.debug('Error sending SMS code to user for registration...');
            console.debug(error);
            // TODO: Do we want to handle better
            // We need to pass in the request id to the page
            yield this.router.navigate(['/authentication/contact-admin']);
        }));
    }
    onSubmit(credentialId, otp1, otp2, tempOtp) {
        if (this.allInputsValid(credentialId, otp1, otp2, tempOtp)) {
            this.submitButtonText = 'Registering...';
            this.vipService.submitVipRegistration(credentialId, otp1, otp2, tempOtp).subscribe(response => { this.handleSuccessfulRegistration(response); }, error => { this.handleFailedRegistration(error); });
        }
        return false; // Don't cause a reload
    }
    handleSuccessfulRegistration(response) {
        console.debug('SUCCESS: User registered with VIP');
        console.debug('vipToken: ' + response.vipToken);
        console.debug(response);
        // Notify the user of successful registration and show home button
        this.registered = true;
        this.failed = false;
        this.statusMessage = response.statusMessage;
        // NOTE: VipService intercepts the response and stores the Vip token
        this.vipService.redirectToLastLocation();
    }
    // If registration fails for any reason (we assume all inputs passed validation - even though current validation is minimal)
    // we will send a new SMS code and clear all inputs so user can begin registration process again
    handleFailedRegistration(error) {
        console.debug('ERROR: Failed to register user with VIP');
        console.debug(error);
        this.failed = true;
        // Clear all inputs
        this.credentialIdValue = null;
        this.otp1Value = null;
        this.otp2Value = null;
        this.tempOtpValue = null;
        // Tell user to try again with new SMS code
        this.submitButtonText = 'Try Again';
        this.initiateRegistrationProcess();
    }
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    validateInput(input) {
        console.debug(input);
        // Assume valid
        this.validInputs[parseInt(input.id, 10)] = true;
        this.invalidInputMessage = '';
        // No whitespace
        if (/\s/.test(input.value)) {
            this.validInputs[parseInt(input.id, 10)] = false;
            this.invalidInputMessage = 'Input must not contain spaces';
        }
        // Only numbers in OTPs
        if (input.id === this.OTP_1.toString() || input.id === this.OTP_2.toString() || input.id === this.TEMP_OTP.toString()) {
            const nums = /^[0-9]*$/;
            if (!input.value.match(nums)) {
                this.validInputs[parseInt(input.id, 10)] = false;
                this.invalidInputMessage = 'Codes may only contains numbers';
            }
        }
        console.debug(this.validInputs);
    }
    allInputsValid(credentialId, otp1, otp2, tempOtp) {
        // Ensure all inputs have been entered
        if (tempOtp.length <= 0) {
            this.validInputs[this.TEMP_OTP] = false;
        }
        if (otp2.length <= 0) {
            this.validInputs[this.OTP_2] = false;
        }
        if (otp1.length <= 0) {
            this.validInputs[this.OTP_1] = false;
        }
        if (credentialId.length <= 0) {
            this.validInputs[this.CREDENTIAL_ID] = false;
        }
        if (this.validInputs.includes(false)) {
            this.invalidInputMessage = 'Please fill in all fields';
            return false;
        }
        else {
            this.invalidInputMessage = '';
            return true;
        }
    }
}
RegisterComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-register',
                template: "<section class=\"mat-elevation-z2 form-container\">\r\n  <h3 *ngIf=\"failed\">Failed Registration.<br>We have sent you a new SMS code. Please try again.</h3>\r\n\r\n  <div [ngClass]=\"{ 'hidden' : registered }\">\r\n    <p class=\"invalid-input-message\">{{invalidInputMessage}}</p>\r\n\r\n    <form autocomplete=\"off\" (submit)=\"onSubmit(credentialId.value, otp1.value, otp2.value, tempOtp.value)\">\r\n      <p>Download Symantec VIP Access for desktop or mobile\r\n        <a href=\"https://vip.symantec.com/\" target=\"_blank\" rel=\"external nofollow noopener\">here.</a>\r\n      </p>\r\n\r\n      <mat-form-field>\r\n        <input #credentialId matInput [value]=\"credentialIdValue\" name=\"credentialId\" type=\"text\" required\r\n          placeholder=\"Enter VIP Credential ID\" [ngClass]=\"{ 'invalid-input' : !validInputs[0] }\" id=\"0\"\r\n          (change)=\"validateInput(credentialId)\">\r\n      </mat-form-field>\r\n\r\n      <p>Please enter two <u>sequential</u> security codes</p>\r\n      <mat-form-field>\r\n        <input #otp1 matInput required [value]=\"otp1Value\" type=\"text\" placeholder=\"FIRST SECURITY CODE\"\r\n          [ngClass]=\"{ 'invalid-input' : !validInputs[1] }\" id=\"1\" (change)=\"validateInput(otp1)\">\r\n      </mat-form-field>\r\n\r\n      <mat-form-field>\r\n        <input #otp2 matInput required [value]=\"otp2Value\" type=\"text\" placeholder=\"SECOND SECURITY CODE\"\r\n          [ngClass]=\"{ 'invalid-input' : !validInputs[2] }\" id=\"2\" (change)=\"validateInput(otp2)\">\r\n      </mat-form-field>\r\n\r\n      <div *ngIf=\"!smsCodeSent\">\r\n        <p>Sending SMS code to your mobile device...</p>\r\n        <mat-chip-list>\r\n          <mat-chip selectable=false>Waiting for SMS code...</mat-chip>\r\n        </mat-chip-list>\r\n      </div>\r\n\r\n      <p *ngIf=\"smsCodeSent\">SMS Code has been sent to +{{mobileNumber}}</p>\r\n      <mat-form-field>\r\n        <input #tempOtp matInput required [value]=\"tempOtpValue\" type=\"text\" placeholder=\"SMS CODE\"\r\n          [ngClass]=\"{ 'invalid-input' : !validInputs[3], 'hidden' : !smsCodeSent }\" id=\"3\"\r\n          (change)=\"validateInput(tempOtp)\">\r\n      </mat-form-field>\r\n\r\n      <button mat-button mat-raised-button color=\"primary\" id=\"submit\" type=\"submit\"\r\n        [ngClass]=\"{ 'hidden' : !smsCodeSent }\">{{submitButtonText}}</button>\r\n    </form>\r\n  </div>\r\n\r\n  <div [ngClass]=\"{ 'hidden' : !registered }\">\r\n    <h3>{{statusMessage}}</h3>\r\n    <lib-tick></lib-tick>\r\n  </div>\r\n</section>\r\n",
                styles: ["form{display:flex;flex-direction:column}", ".form-container{background-color:#fff;font-weight:700;margin-bottom:12px;margin-left:5px;margin-top:12px;padding:15px}"]
            },] }
];
RegisterComponent.ctorParameters = () => [
    { type: Router },
    { type: VipService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L1Byb2plY3RzL25zd2hwYXV0aC1tb2R1bGUvcHJvamVjdHMvbnN3aHBhdXRoL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL3JlZ2lzdGVyL3JlZ2lzdGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFJekMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBT3hELE1BQU0sT0FBTyxpQkFBaUI7SUF5QjVCLFlBQ1UsTUFBYyxFQUNkLFVBQXNCO1FBRHRCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBekJoQyxnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFFZixrQkFBYSxHQUFHLEVBQUUsQ0FBQztRQUNuQixxQkFBZ0IsR0FBRyxVQUFVLENBQUM7UUFFOUIsaUJBQVksR0FBRyxFQUFFLENBQUM7UUFDbEIsd0JBQW1CLEdBQUcsRUFBRSxDQUFDO1FBRXpCLGVBQWU7UUFDZixzQkFBaUIsR0FBRyxFQUFFLENBQUM7UUFDdkIsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNmLGNBQVMsR0FBRyxFQUFFLENBQUM7UUFDZixpQkFBWSxHQUFHLEVBQUUsQ0FBQztRQUVsQixrREFBa0Q7UUFDbEQsZ0JBQVcsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3ZDLGtCQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLFVBQUssR0FBRyxDQUFDLENBQUM7UUFDVixVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsYUFBUSxHQUFH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ZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuXHJcbmltcG9ydCB7IElNZmFNZXNzYWdlIH0gZnJvbSAnLi4vLi4vbW9kZWwvbWZhTWVzc2FnZSc7XHJcbmltcG9ydCB7IFZpcEh0dHBFcnJvclJlc29uc2UgfSBmcm9tICcuLi8uLi9tb2RlbC92aXBIdHRwRXJyb3JSZXNwb25zZSc7XHJcbmltcG9ydCB7IFZpcFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy92aXAuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2xpYi1yZWdpc3RlcicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3JlZ2lzdGVyLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9yZWdpc3Rlci5jb21wb25lbnQuc2NzcycsICcuLi8uLi9tYWluLmNzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBSZWdpc3RlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gIHNtc0NvZGVTZW50ID0gZmFsc2U7XHJcbiAgcmVnaXN0ZXJlZCA9IGZhbHNlO1xyXG4gIGZhaWxlZCA9IGZhbHNlO1xyXG5cclxuICBzdGF0dXNNZXNzYWdlID0gJyc7XHJcbiAgc3VibWl0QnV0dG9uVGV4dCA9ICdSZWdpc3Rlcic7XHJcblxyXG4gIG1vYmlsZU51bWJlciA9ICcnO1xyXG4gIGludmFsaWRJbnB1dE1lc3NhZ2UgPSAnJztcclxuXHJcbiAgLy8gSW5wdXQgdmFsdWVzXHJcbiAgY3JlZGVudGlhbElkVmFsdWUgPSAnJztcclxuICBvdHAxVmFsdWUgPSAnJztcclxuICBvdHAyVmFsdWUgPSAnJztcclxuICB0ZW1wT3RwVmFsdWUgPSAnJztcclxuXHJcbiAgLy8gU3RvcmUgdGhlIHZhbGlkIGZsYWcgZm9yIGVhY2ggaW5wdXQgaW4gdGhlIGZvcm1cclxuICB2YWxpZElucHV0cyA9IFt0cnVlLCB0cnVlLCB0cnVlLCB0cnVlXTtcclxuICBDUkVERU5USUFMX0lEID0gMDtcclxuICBPVFBfMSA9IDE7XHJcbiAgT1RQXzIgPSAyO1xyXG4gIFRFTVBfT1RQID0gMztcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxyXG4gICAgcHJpdmF0ZSB2aXBTZXJ2aWNlOiBWaXBTZXJ2aWNlXHJcbiAgKSB7IH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcblxyXG4gICAgLy8gU2VuZCBTTVMgT1RQIGNvZGUgZm9yIHJlZ2lzdHJhdGlvblxyXG4gICAgdGhpcy5pbml0aWF0ZVJlZ2lzdHJhdGlvblByb2Nlc3MoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdGlhdGVSZWdpc3RyYXRpb25Qcm9jZXNzKCkge1xyXG4gICAgdGhpcy5zbXNDb2RlU2VudCA9IGZhbHNlO1xyXG4gICAgdGhpcy52YWxpZElucHV0cyA9IFt0cnVlLCB0cnVlLCB0cnVlLCB0cnVlXTtcclxuXHJcbiAgICB0aGlzLnZpcFNlcnZpY2Uuc2VuZE90cEZvclJlZ2lzdHJhdGlvbigpLnN1YnNjcmliZShcclxuICAgICAgcmVzcG9uc2UgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUuZGVidWcocmVzcG9uc2UpO1xyXG4gICAgICAgIHRoaXMuc21zQ29kZVNlbnQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubW9iaWxlTnVtYmVyID0gcmVzcG9uc2UubW9iaWxlTnVtYmVyO1xyXG4gICAgICB9LFxyXG4gICAgICBhc3luYyBlcnJvciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5kZWJ1ZygnRXJyb3Igc2VuZGluZyBTTVMgY29kZSB0byB1c2VyIGZvciByZWdpc3RyYXRpb24uLi4nKTtcclxuICAgICAgICBjb25zb2xlLmRlYnVnKGVycm9yKTtcclxuXHJcbiAgICAgICAgLy8gVE9ETzogRG8gd2Ugd2FudCB0byBoYW5kbGUgYmV0dGVyXHJcbiAgICAgICAgLy8gV2UgbmVlZCB0byBwYXNzIGluIHRoZSByZXF1ZXN0IGlkIHRvIHRoZSBwYWdlXHJcbiAgICAgICAgYXdhaXQgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvYXV0aGVudGljYXRpb24vY29udGFjdC1hZG1pbiddKTtcclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIG9uU3VibWl0KGNyZWRlbnRpYWxJZDogc3RyaW5nLCBvdHAxOiBzdHJpbmcsIG90cDI6IHN0cmluZywgdGVtcE90cDogc3RyaW5nKTogZmFsc2Uge1xyXG5cclxuICAgIGlmICh0aGlzLmFsbElucHV0c1ZhbGlkKGNyZWRlbnRpYWxJZCwgb3RwMSwgb3RwMiwgdGVtcE90cCkpIHtcclxuICAgICAgdGhpcy5zdWJtaXRCdXR0b25UZXh0ID0gJ1JlZ2lzdGVyaW5nLi4uJztcclxuICAgICAgdGhpcy52aXBTZXJ2aWNlLnN1Ym1pdFZpcFJlZ2lzdHJhdGlvbihjcmVkZW50aWFsSWQsIG90cDEsIG90cDIsIHRlbXBPdHApLnN1YnNjcmliZShcclxuICAgICAgICByZXNwb25zZSA9PiB7IHRoaXMuaGFuZGxlU3VjY2Vzc2Z1bFJlZ2lzdHJhdGlvbihyZXNwb25zZSk7IH0sXHJcbiAgICAgICAgZXJyb3IgPT4geyB0aGlzLmhhbmRsZUZhaWxlZFJlZ2lzdHJhdGlvbihlcnJvcik7IH1cclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZmFsc2U7IC8vIERvbid0IGNhdXNlIGEgcmVsb2FkXHJcbiAgfVxyXG5cclxuICBoYW5kbGVTdWNjZXNzZnVsUmVnaXN0cmF0aW9uKHJlc3BvbnNlOiBJTWZhTWVzc2FnZSkge1xyXG4gICAgY29uc29sZS5kZWJ1ZygnU1VDQ0VTUzogVXNlciByZWdpc3RlcmVkIHdpdGggVklQJyk7XHJcbiAgICBjb25zb2xlLmRlYnVnKCd2aXBUb2tlbjogJyArIHJlc3BvbnNlLnZpcFRva2VuKTtcclxuICAgIGNvbnNvbGUuZGVidWcocmVzcG9uc2UpO1xyXG5cclxuICAgIC8vIE5vdGlmeSB0aGUgdXNlciBvZiBzdWNjZXNzZnVsIHJlZ2lzdHJhdGlvbiBhbmQgc2hvdyBob21lIGJ1dHRvblxyXG4gICAgdGhpcy5yZWdpc3RlcmVkID0gdHJ1ZTtcclxuICAgIHRoaXMuZmFpbGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLnN0YXR1c01lc3NhZ2UgPSByZXNwb25zZS5zdGF0dXNNZXNzYWdlO1xyXG5cclxuICAgIC8vIE5PVEU6IFZpcFNlcnZpY2UgaW50ZXJjZXB0cyB0aGUgcmVzcG9uc2UgYW5kIHN0b3JlcyB0aGUgVmlwIHRva2VuXHJcbiAgICB0aGlzLnZpcFNlcnZpY2UucmVkaXJlY3RUb0xhc3RMb2NhdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgLy8gSWYgcmVnaXN0cmF0aW9uIGZhaWxzIGZvciBhbnkgcmVhc29uICh3ZSBhc3N1bWUgYWxsIGlucHV0cyBwYXNzZWQgdmFsaWRhdGlvbiAtIGV2ZW4gdGhvdWdoIGN1cnJlbnQgdmFsaWRhdGlvbiBpcyBtaW5pbWFsKVxyXG4gIC8vIHdlIHdpbGwgc2VuZCBhIG5ldyBTTVMgY29kZSBhbmQgY2xlYXIgYWxsIGlucHV0cyBzbyB1c2VyIGNhbiBiZWdpbiByZWdpc3RyYXRpb24gcHJvY2VzcyBhZ2FpblxyXG4gIHByaXZhdGUgaGFuZGxlRmFpbGVkUmVnaXN0cmF0aW9uKGVycm9yOiBWaXBIdHRwRXJyb3JSZXNvbnNlKSB7XHJcbiAgICBjb25zb2xlLmRlYnVnKCdFUlJPUjogRmFpbGVkIHRvIHJlZ2lzdGVyIHVzZXIgd2l0aCBWSVAnKTtcclxuICAgIGNvbnNvbGUuZGVidWcoZXJyb3IpO1xyXG5cclxuICAgIHRoaXMuZmFpbGVkID0gdHJ1ZTtcclxuXHJcbiAgICAvLyBDbGVhciBhbGwgaW5wdXRzXHJcbiAgICB0aGlzLmNyZWRlbnRpYWxJZFZhbHVlID0gbnVsbDtcclxuICAgIHRoaXMub3RwMVZhbHVlID0gbnVsbDtcclxuICAgIHRoaXMub3RwMlZhbHVlID0gbnVsbDtcclxuICAgIHRoaXMudGVtcE90cFZhbHVlID0gbnVsbDtcclxuXHJcbiAgICAvLyBUZWxsIHVzZXIgdG8gdHJ5IGFnYWluIHdpdGggbmV3IFNNUyBjb2RlXHJcbiAgICB0aGlzLnN1Ym1pdEJ1dHRvblRleHQgPSAnVHJ5IEFnYWluJztcclxuXHJcbiAgICB0aGlzLmluaXRpYXRlUmVnaXN0cmF0aW9uUHJvY2VzcygpO1xyXG4gIH1cclxuXHJcbiAgLyogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICovXHJcblxyXG4gIHZhbGlkYXRlSW5wdXQoaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQpIHtcclxuICAgIGNvbnNvbGUuZGVidWcoaW5wdXQpO1xyXG5cclxuICAgIC8vIEFzc3VtZSB2YWxpZFxyXG4gICAgdGhpcy52YWxpZElucHV0c1twYXJzZUludChpbnB1dC5pZCwgMTApXSA9IHRydWU7XHJcbiAgICB0aGlzLmludmFsaWRJbnB1dE1lc3NhZ2UgPSAnJztcclxuXHJcbiAgICAvLyBObyB3aGl0ZXNwYWNlXHJcbiAgICBpZiAoL1xccy8udGVzdChpbnB1dC52YWx1ZSkpIHtcclxuICAgICAgdGhpcy52YWxpZElucHV0c1twYXJzZUludChpbnB1dC5pZCwgMTApXSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmludmFsaWRJbnB1dE1lc3NhZ2UgPSAnSW5wdXQgbXVzdCBub3QgY29udGFpbiBzcGFjZXMnO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIE9ubHkgbnVtYmVycyBpbiBPVFBzXHJcbiAgICBpZiAoaW5wdXQuaWQgPT09IHRoaXMuT1RQXzEudG9TdHJpbmcoKSB8fCBpbnB1dC5pZCA9PT0gdGhpcy5PVFBfMi50b1N0cmluZygpIHx8IGlucHV0LmlkID09PSB0aGlzLlRFTVBfT1RQLnRvU3RyaW5nKCkpIHtcclxuICAgICAgY29uc3QgbnVtcyA9IC9eWzAtOV0qJC87XHJcbiAgICAgIGlmICghaW5wdXQudmFsdWUubWF0Y2gobnVtcykpIHtcclxuICAgICAgICB0aGlzLnZhbGlkSW5wdXRzW3BhcnNlSW50KGlucHV0LmlkLCAxMCldID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pbnZhbGlkSW5wdXRNZXNzYWdlID0gJ0NvZGVzIG1heSBvbmx5IGNvbnRhaW5zIG51bWJlcnMnO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc29sZS5kZWJ1Zyh0aGlzLnZhbGlkSW5wdXRzKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYWxsSW5wdXRzVmFsaWQoY3JlZGVudGlhbElkOiBzdHJpbmcsIG90cDE6IHN0cmluZywgb3RwMjogc3RyaW5nLCB0ZW1wT3RwOiBzdHJpbmcpOiBib29sZWFuIHtcclxuXHJcbiAgICAvLyBFbnN1cmUgYWxsIGlucHV0cyBoYXZlIGJlZW4gZW50ZXJlZFxyXG4gICAgaWYgKHRlbXBPdHAubGVuZ3RoIDw9IDApIHtcclxuICAgICAgdGhpcy52YWxpZElucHV0c1t0aGlzLlRFTVBfT1RQXSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKG90cDIubGVuZ3RoIDw9IDApIHtcclxuICAgICAgdGhpcy52YWxpZElucHV0c1t0aGlzLk9UUF8yXSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKG90cDEubGVuZ3RoIDw9IDApIHtcclxuICAgICAgdGhpcy52YWxpZElucHV0c1t0aGlzLk9UUF8xXSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKGNyZWRlbnRpYWxJZC5sZW5ndGggPD0gMCkge1xyXG4gICAgICB0aGlzLnZhbGlkSW5wdXRzW3RoaXMuQ1JFREVOVElBTF9JRF0gPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy52YWxpZElucHV0cy5pbmNsdWRlcyhmYWxzZSkpIHtcclxuICAgICAgdGhpcy5pbnZhbGlkSW5wdXRNZXNzYWdlID0gJ1BsZWFzZSBmaWxsIGluIGFsbCBmaWVsZHMnO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmludmFsaWRJbnB1dE1lc3NhZ2UgPSAnJztcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==
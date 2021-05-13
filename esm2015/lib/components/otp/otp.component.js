import { Component } from '@angular/core';
import { VipService } from '../../services/vip.service';
export class OtpComponent {
    constructor(vipService) {
        this.vipService = vipService;
        this.submitted = false;
        this.authenticated = false;
        this.failed = false;
        this.submitButtonText = 'Submit';
    }
    ngOnInit() {
    }
    onSubmit(code) {
        if (!this.submitted) {
            this.submitted = true;
            this.submitButtonText = 'Submitting...';
            this.vipService.authenticateOtpCode(code).subscribe(response => { this.handleSuccessfulOtpAuthentication(response); }, () => { this.handleFailedOtpAuthentication(); });
        }
        return false; // Don't cause a reload
    }
    handleSuccessfulOtpAuthentication(response) {
        console.debug(response);
        this.authenticated = true;
        this.failed = false;
        // NOTE: VipService intercepts the response and stores the Vip token
        this.vipService.redirectToLastLocation();
    }
    handleFailedOtpAuthentication() {
        this.submitted = false;
        this.failed = true;
        this.submitButtonText = 'Try Again';
    }
    // Turn the input green again when the user starts changing the otp code
    enteringOtp() {
        this.failed = false;
    }
}
OtpComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-otp',
                template: "<section class=\"mat-elevation-z2 form-container\">\r\n  <div *ngIf=\"!authenticated\">\r\n    <h2>Please enter your Security Code below and press Submit</h2>\r\n    <h3>You can find your Security Code in your VIP Access mobile app or desktop app</h3>\r\n    <p *ngIf=\"failed\" class=\"invalid-input-message\">Failed to authenticate OTP, please try again.</p>\r\n    <form (submit)=\"onSubmit(otpCode.value)\">\r\n      <div class=\"container-body\">\r\n        <mat-form-field class=\"search-form-field\">\r\n          <input #otpCode matFormFieldControl matInput type=\"text\" placeholder=\"SECURITY CODE\" required\r\n            [ngClass]=\"{ 'invalid-input' : failed }\" (keypress)=\"enteringOtp()\" />\r\n\r\n        </mat-form-field>\r\n\r\n        <div class=\"container-button\">\r\n          <button mat-button matSuffix color=\"accent\" mat-raised-button id=\"submit\" type=\"submit\">\r\n            {{submitButtonText}}\r\n          </button>\r\n        </div>\r\n      </div>\r\n    </form>\r\n  </div>\r\n  <div *ngIf=\"authenticated\">\r\n    <h1>Success!</h1>\r\n    <lib-tick></lib-tick>\r\n  </div>\r\n</section>\r\n",
                styles: ["", ".form-container{background-color:#fff;font-weight:700;margin-bottom:12px;margin-left:5px;margin-top:12px;padding:15px}"]
            },] }
];
OtpComponent.ctorParameters = () => [
    { type: VipService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3RwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9Qcm9qZWN0cy9uc3docGF1dGgtbW9kdWxlL3Byb2plY3RzL25zd2hwYXV0aC9zcmMvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9vdHAvb3RwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQVF4RCxNQUFNLE9BQU8sWUFBWTtJQVF2QixZQUNVLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFQaEMsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUN0QixXQUFNLEdBQUcsS0FBSyxDQUFDO1FBRWYscUJBQWdCLEdBQUcsUUFBUSxDQUFDO0lBSXhCLENBQUM7SUFFTCxRQUFRO0lBQ1IsQ0FBQztJQUVELFFBQVEsQ0FBQyxJQUFZO1FBRW5CLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ25CLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxlQUFlLENBQUM7WUFFeEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQ2pELFFBQVEsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLGlDQUFpQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNqRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsNkJBQTZCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FDaEQsQ0FBQztTQUNIO1FBRUQsT0FBTyxLQUFLLENBQUMsQ0FBQyx1QkFBdUI7SUFDdkMsQ0FBQztJQUVPLGlDQUFpQyxDQUFDLFFBQXFCO1FBQzdELE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFeEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFDMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFFcEIsb0VBQW9FO1FBRXBFLElBQUksQ0FBQyxVQUFVLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBRU8sNkJBQTZCO1FBQ25DLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25CLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxXQUFXLENBQUM7SUFDdEMsQ0FBQztJQUVELHdFQUF3RTtJQUNqRSxXQUFXO1FBQ2hCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3RCLENBQUM7OztZQXZERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFNBQVM7Z0JBQ25CLDRuQ0FBbUM7O2FBRXBDOzs7WUFQUSxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVmlwU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3ZpcC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSU1mYU1lc3NhZ2UgfSBmcm9tICcuLi8uLi9tb2RlbC9tZmFNZXNzYWdlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbGliLW90cCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL290cC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vb3RwLmNvbXBvbmVudC5zY3NzJywgJy4uLy4uL21haW4uY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIE90cENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gIHN1Ym1pdHRlZCA9IGZhbHNlO1xyXG4gIGF1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcclxuICBmYWlsZWQgPSBmYWxzZTtcclxuXHJcbiAgc3VibWl0QnV0dG9uVGV4dCA9ICdTdWJtaXQnO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgdmlwU2VydmljZTogVmlwU2VydmljZSxcclxuICApIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICB9XHJcblxyXG4gIG9uU3VibWl0KGNvZGU6IHN0cmluZyk6IGZhbHNlIHtcclxuXHJcbiAgICBpZiAoIXRoaXMuc3VibWl0dGVkKSB7XHJcbiAgICAgIHRoaXMuc3VibWl0dGVkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5zdWJtaXRCdXR0b25UZXh0ID0gJ1N1Ym1pdHRpbmcuLi4nO1xyXG5cclxuICAgICAgdGhpcy52aXBTZXJ2aWNlLmF1dGhlbnRpY2F0ZU90cENvZGUoY29kZSkuc3Vic2NyaWJlKFxyXG4gICAgICAgIHJlc3BvbnNlID0+IHsgdGhpcy5oYW5kbGVTdWNjZXNzZnVsT3RwQXV0aGVudGljYXRpb24ocmVzcG9uc2UpOyB9LFxyXG4gICAgICAgICgpID0+IHsgdGhpcy5oYW5kbGVGYWlsZWRPdHBBdXRoZW50aWNhdGlvbigpOyB9XHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlOyAvLyBEb24ndCBjYXVzZSBhIHJlbG9hZFxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBoYW5kbGVTdWNjZXNzZnVsT3RwQXV0aGVudGljYXRpb24ocmVzcG9uc2U6IElNZmFNZXNzYWdlKSB7XHJcbiAgICBjb25zb2xlLmRlYnVnKHJlc3BvbnNlKTtcclxuXHJcbiAgICB0aGlzLmF1dGhlbnRpY2F0ZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5mYWlsZWQgPSBmYWxzZTtcclxuXHJcbiAgICAvLyBOT1RFOiBWaXBTZXJ2aWNlIGludGVyY2VwdHMgdGhlIHJlc3BvbnNlIGFuZCBzdG9yZXMgdGhlIFZpcCB0b2tlblxyXG5cclxuICAgIHRoaXMudmlwU2VydmljZS5yZWRpcmVjdFRvTGFzdExvY2F0aW9uKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhbmRsZUZhaWxlZE90cEF1dGhlbnRpY2F0aW9uKCkge1xyXG4gICAgdGhpcy5zdWJtaXR0ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuZmFpbGVkID0gdHJ1ZTtcclxuICAgIHRoaXMuc3VibWl0QnV0dG9uVGV4dCA9ICdUcnkgQWdhaW4nO1xyXG4gIH1cclxuXHJcbiAgLy8gVHVybiB0aGUgaW5wdXQgZ3JlZW4gYWdhaW4gd2hlbiB0aGUgdXNlciBzdGFydHMgY2hhbmdpbmcgdGhlIG90cCBjb2RlXHJcbiAgcHVibGljIGVudGVyaW5nT3RwKCkge1xyXG4gICAgdGhpcy5mYWlsZWQgPSBmYWxzZTtcclxuICB9XHJcbn1cclxuIl19
import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../services/vip.service";
import * as i2 from "@angular/common";
import * as i3 from "@angular/material/form-field";
import * as i4 from "@angular/material/input";
import * as i5 from "@angular/material/button";
import * as i6 from "../tick/tick.component";
function OtpComponent_div_1_p_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 10);
    i0.ɵɵtext(1, "Failed to authenticate OTP, please try again.");
    i0.ɵɵelementEnd();
} }
const _c0 = function (a0) { return { "invalid-input": a0 }; };
function OtpComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelementStart(1, "h2");
    i0.ɵɵtext(2, "Please enter your Security Code below and press Submit");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h3");
    i0.ɵɵtext(4, "You can find your Security Code in your VIP Access mobile app or desktop app");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, OtpComponent_div_1_p_5_Template, 2, 0, "p", 2);
    i0.ɵɵelementStart(6, "form", 3);
    i0.ɵɵlistener("submit", function OtpComponent_div_1_Template_form_submit_6_listener() { i0.ɵɵrestoreView(_r5); const _r3 = i0.ɵɵreference(10); const ctx_r4 = i0.ɵɵnextContext(); return ctx_r4.onSubmit(_r3.value); });
    i0.ɵɵelementStart(7, "div", 4);
    i0.ɵɵelementStart(8, "mat-form-field", 5);
    i0.ɵɵelementStart(9, "input", 6, 7);
    i0.ɵɵlistener("keypress", function OtpComponent_div_1_Template_input_keypress_9_listener() { i0.ɵɵrestoreView(_r5); const ctx_r6 = i0.ɵɵnextContext(); return ctx_r6.enteringOtp(); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "div", 8);
    i0.ɵɵelementStart(12, "button", 9);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngIf", ctx_r0.failed);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(3, _c0, ctx_r0.failed));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.submitButtonText, " ");
} }
function OtpComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelementStart(1, "h1");
    i0.ɵɵtext(2, "Success!");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "lib-tick");
    i0.ɵɵelementEnd();
} }
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
OtpComponent.ɵfac = function OtpComponent_Factory(t) { return new (t || OtpComponent)(i0.ɵɵdirectiveInject(i1.VipService)); };
OtpComponent.ɵcmp = i0.ɵɵdefineComponent({ type: OtpComponent, selectors: [["lib-otp"]], decls: 3, vars: 2, consts: [[1, "mat-elevation-z2", "form-container"], [4, "ngIf"], ["class", "invalid-input-message", 4, "ngIf"], [3, "submit"], [1, "container-body"], [1, "search-form-field"], ["matFormFieldControl", "", "matInput", "", "type", "text", "placeholder", "SECURITY CODE", "required", "", 3, "ngClass", "keypress"], ["otpCode", ""], [1, "container-button"], ["mat-button", "", "matSuffix", "", "color", "accent", "mat-raised-button", "", "id", "submit", "type", "submit"], [1, "invalid-input-message"]], template: function OtpComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "section", 0);
        i0.ɵɵtemplate(1, OtpComponent_div_1_Template, 14, 5, "div", 1);
        i0.ɵɵtemplate(2, OtpComponent_div_2_Template, 4, 0, "div", 1);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.authenticated);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.authenticated);
    } }, directives: [i2.NgIf, i3.MatFormField, i4.MatInput, i2.NgClass, i5.MatButton, i3.MatSuffix, i6.TickComponent], styles: ["", ".form-container[_ngcontent-%COMP%]{background-color:#fff;font-weight:700;margin-bottom:12px;margin-left:5px;margin-top:12px;padding:15px}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(OtpComponent, [{
        type: Component,
        args: [{
                selector: 'lib-otp',
                templateUrl: './otp.component.html',
                styleUrls: ['./otp.component.scss', '../../main.css']
            }]
    }], function () { return [{ type: i1.VipService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3RwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9Qcm9qZWN0cy9uc3docGF1dGgtbW9kdWxlL3Byb2plY3RzL25zd2hwYXV0aC9zcmMvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9vdHAvb3RwLmNvbXBvbmVudC50cyIsImxpYi9jb21wb25lbnRzL290cC9vdHAuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7O0lDSTlDLDZCQUFnRDtJQUFBLDZEQUE2QztJQUFBLGlCQUFJOzs7OztJQUhuRywyQkFDRTtJQUFBLDBCQUFJO0lBQUEsc0VBQXNEO0lBQUEsaUJBQUs7SUFDL0QsMEJBQUk7SUFBQSw0RkFBNEU7SUFBQSxpQkFBSztJQUNyRiwrREFBZ0Q7SUFDaEQsK0JBQ0U7SUFESSx1TkFBa0M7SUFDdEMsOEJBQ0U7SUFBQSx5Q0FDRTtJQUFBLG1DQUdGO0lBRjZDLHNMQUEwQjtJQURyRSxpQkFHRjtJQUFBLGlCQUFpQjtJQUVqQiwrQkFDRTtJQUFBLGtDQUNFO0lBQUEsYUFDRjtJQUFBLGlCQUFTO0lBQ1gsaUJBQU07SUFDUixpQkFBTTtJQUNSLGlCQUFPO0lBQ1QsaUJBQU07OztJQWhCRCxlQUFjO0lBQWQsb0NBQWM7SUFLVCxlQUF3QztJQUF4QyxtRUFBd0M7SUFNeEMsZUFDRjtJQURFLHdEQUNGOzs7SUFLUiwyQkFDRTtJQUFBLDBCQUFJO0lBQUEsd0JBQVE7SUFBQSxpQkFBSztJQUNqQiwyQkFBcUI7SUFDdkIsaUJBQU07O0FEZlIsTUFBTSxPQUFPLFlBQVk7SUFRdkIsWUFDVSxVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBUGhDLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFDdEIsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUVmLHFCQUFnQixHQUFHLFFBQVEsQ0FBQztJQUl4QixDQUFDO0lBRUwsUUFBUTtJQUNSLENBQUM7SUFFRCxRQUFRLENBQUMsSUFBWTtRQUVuQixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNuQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUN0QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZUFBZSxDQUFDO1lBRXhDLElBQUksQ0FBQyxVQUFVLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUNqRCxRQUFRLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxpQ0FBaUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDakUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLDZCQUE2QixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQ2hELENBQUM7U0FDSDtRQUVELE9BQU8sS0FBSyxDQUFDLENBQUMsdUJBQXVCO0lBQ3ZDLENBQUM7SUFFTyxpQ0FBaUMsQ0FBQyxRQUFxQjtRQUM3RCxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXhCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQzFCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBRXBCLG9FQUFvRTtRQUVwRSxJQUFJLENBQUMsVUFBVSxDQUFDLHNCQUFzQixFQUFFLENBQUM7SUFDM0MsQ0FBQztJQUVPLDZCQUE2QjtRQUNuQyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsV0FBVyxDQUFDO0lBQ3RDLENBQUM7SUFFRCx3RUFBd0U7SUFDakUsV0FBVztRQUNoQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUN0QixDQUFDOzt3RUFsRFUsWUFBWTtpREFBWixZQUFZO1FDVHpCLGtDQUNFO1FBQUEsOERBQ0U7UUFtQkYsNkRBQ0U7UUFHSixpQkFBVTs7UUF4QkgsZUFBc0I7UUFBdEIseUNBQXNCO1FBb0J0QixlQUFxQjtRQUFyQix3Q0FBcUI7O2tERFpmLFlBQVk7Y0FMeEIsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxTQUFTO2dCQUNuQixXQUFXLEVBQUUsc0JBQXNCO2dCQUNuQyxTQUFTLEVBQUUsQ0FBQyxzQkFBc0IsRUFBRSxnQkFBZ0IsQ0FBQzthQUN0RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFZpcFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy92aXAuc2VydmljZSc7XHJcbmltcG9ydCB7IElNZmFNZXNzYWdlIH0gZnJvbSAnLi4vLi4vbW9kZWwvbWZhTWVzc2FnZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2xpYi1vdHAnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9vdHAuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL290cC5jb21wb25lbnQuc2NzcycsICcuLi8uLi9tYWluLmNzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBPdHBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICBzdWJtaXR0ZWQgPSBmYWxzZTtcclxuICBhdXRoZW50aWNhdGVkID0gZmFsc2U7XHJcbiAgZmFpbGVkID0gZmFsc2U7XHJcblxyXG4gIHN1Ym1pdEJ1dHRvblRleHQgPSAnU3VibWl0JztcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHZpcFNlcnZpY2U6IFZpcFNlcnZpY2UsXHJcbiAgKSB7IH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgfVxyXG5cclxuICBvblN1Ym1pdChjb2RlOiBzdHJpbmcpOiBmYWxzZSB7XHJcblxyXG4gICAgaWYgKCF0aGlzLnN1Ym1pdHRlZCkge1xyXG4gICAgICB0aGlzLnN1Ym1pdHRlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuc3VibWl0QnV0dG9uVGV4dCA9ICdTdWJtaXR0aW5nLi4uJztcclxuXHJcbiAgICAgIHRoaXMudmlwU2VydmljZS5hdXRoZW50aWNhdGVPdHBDb2RlKGNvZGUpLnN1YnNjcmliZShcclxuICAgICAgICByZXNwb25zZSA9PiB7IHRoaXMuaGFuZGxlU3VjY2Vzc2Z1bE90cEF1dGhlbnRpY2F0aW9uKHJlc3BvbnNlKTsgfSxcclxuICAgICAgICAoKSA9PiB7IHRoaXMuaGFuZGxlRmFpbGVkT3RwQXV0aGVudGljYXRpb24oKTsgfVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmYWxzZTsgLy8gRG9uJ3QgY2F1c2UgYSByZWxvYWRcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFuZGxlU3VjY2Vzc2Z1bE90cEF1dGhlbnRpY2F0aW9uKHJlc3BvbnNlOiBJTWZhTWVzc2FnZSkge1xyXG4gICAgY29uc29sZS5kZWJ1ZyhyZXNwb25zZSk7XHJcblxyXG4gICAgdGhpcy5hdXRoZW50aWNhdGVkID0gdHJ1ZTtcclxuICAgIHRoaXMuZmFpbGVkID0gZmFsc2U7XHJcblxyXG4gICAgLy8gTk9URTogVmlwU2VydmljZSBpbnRlcmNlcHRzIHRoZSByZXNwb25zZSBhbmQgc3RvcmVzIHRoZSBWaXAgdG9rZW5cclxuXHJcbiAgICB0aGlzLnZpcFNlcnZpY2UucmVkaXJlY3RUb0xhc3RMb2NhdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBoYW5kbGVGYWlsZWRPdHBBdXRoZW50aWNhdGlvbigpIHtcclxuICAgIHRoaXMuc3VibWl0dGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLmZhaWxlZCA9IHRydWU7XHJcbiAgICB0aGlzLnN1Ym1pdEJ1dHRvblRleHQgPSAnVHJ5IEFnYWluJztcclxuICB9XHJcblxyXG4gIC8vIFR1cm4gdGhlIGlucHV0IGdyZWVuIGFnYWluIHdoZW4gdGhlIHVzZXIgc3RhcnRzIGNoYW5naW5nIHRoZSBvdHAgY29kZVxyXG4gIHB1YmxpYyBlbnRlcmluZ090cCgpIHtcclxuICAgIHRoaXMuZmFpbGVkID0gZmFsc2U7XHJcbiAgfVxyXG59XHJcbiIsIjxzZWN0aW9uIGNsYXNzPVwibWF0LWVsZXZhdGlvbi16MiBmb3JtLWNvbnRhaW5lclwiPlxyXG4gIDxkaXYgKm5nSWY9XCIhYXV0aGVudGljYXRlZFwiPlxyXG4gICAgPGgyPlBsZWFzZSBlbnRlciB5b3VyIFNlY3VyaXR5IENvZGUgYmVsb3cgYW5kIHByZXNzIFN1Ym1pdDwvaDI+XHJcbiAgICA8aDM+WW91IGNhbiBmaW5kIHlvdXIgU2VjdXJpdHkgQ29kZSBpbiB5b3VyIFZJUCBBY2Nlc3MgbW9iaWxlIGFwcCBvciBkZXNrdG9wIGFwcDwvaDM+XHJcbiAgICA8cCAqbmdJZj1cImZhaWxlZFwiIGNsYXNzPVwiaW52YWxpZC1pbnB1dC1tZXNzYWdlXCI+RmFpbGVkIHRvIGF1dGhlbnRpY2F0ZSBPVFAsIHBsZWFzZSB0cnkgYWdhaW4uPC9wPlxyXG4gICAgPGZvcm0gKHN1Ym1pdCk9XCJvblN1Ym1pdChvdHBDb2RlLnZhbHVlKVwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyLWJvZHlcIj5cclxuICAgICAgICA8bWF0LWZvcm0tZmllbGQgY2xhc3M9XCJzZWFyY2gtZm9ybS1maWVsZFwiPlxyXG4gICAgICAgICAgPGlucHV0ICNvdHBDb2RlIG1hdEZvcm1GaWVsZENvbnRyb2wgbWF0SW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIlNFQ1VSSVRZIENPREVcIiByZXF1aXJlZFxyXG4gICAgICAgICAgICBbbmdDbGFzc109XCJ7ICdpbnZhbGlkLWlucHV0JyA6IGZhaWxlZCB9XCIgKGtleXByZXNzKT1cImVudGVyaW5nT3RwKClcIiAvPlxyXG5cclxuICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxyXG5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyLWJ1dHRvblwiPlxyXG4gICAgICAgICAgPGJ1dHRvbiBtYXQtYnV0dG9uIG1hdFN1ZmZpeCBjb2xvcj1cImFjY2VudFwiIG1hdC1yYWlzZWQtYnV0dG9uIGlkPVwic3VibWl0XCIgdHlwZT1cInN1Ym1pdFwiPlxyXG4gICAgICAgICAgICB7e3N1Ym1pdEJ1dHRvblRleHR9fVxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9mb3JtPlxyXG4gIDwvZGl2PlxyXG4gIDxkaXYgKm5nSWY9XCJhdXRoZW50aWNhdGVkXCI+XHJcbiAgICA8aDE+U3VjY2VzcyE8L2gxPlxyXG4gICAgPGxpYi10aWNrPjwvbGliLXRpY2s+XHJcbiAgPC9kaXY+XHJcbjwvc2VjdGlvbj5cclxuIl19
import { __awaiter } from "tslib";
import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "../../services/vip.service";
import * as i3 from "@angular/common";
import * as i4 from "@angular/material/form-field";
import * as i5 from "@angular/material/input";
import * as i6 from "@angular/material/button";
import * as i7 from "../tick/tick.component";
import * as i8 from "@angular/material/chips";
function RegisterComponent_h3_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h3");
    i0.ɵɵtext(1, "Failed Registration.");
    i0.ɵɵelement(2, "br");
    i0.ɵɵtext(3, "We have sent you a new SMS code. Please try again.");
    i0.ɵɵelementEnd();
} }
function RegisterComponent_div_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelementStart(1, "p");
    i0.ɵɵtext(2, "Sending SMS code to your mobile device...");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "mat-chip-list");
    i0.ɵɵelementStart(4, "mat-chip", 15);
    i0.ɵɵtext(5, "Waiting for SMS code...");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function RegisterComponent_p_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("SMS Code has been sent to +", ctx_r5.mobileNumber, "");
} }
const _c0 = function (a0) { return { "hidden": a0 }; };
const _c1 = function (a0) { return { "invalid-input": a0 }; };
const _c2 = function (a0, a1) { return { "invalid-input": a0, "hidden": a1 }; };
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
RegisterComponent.ɵfac = function RegisterComponent_Factory(t) { return new (t || RegisterComponent)(i0.ɵɵdirectiveInject(i1.Router), i0.ɵɵdirectiveInject(i2.VipService)); };
RegisterComponent.ɵcmp = i0.ɵɵdefineComponent({ type: RegisterComponent, selectors: [["lib-register"]], decls: 35, vars: 32, consts: [[1, "mat-elevation-z2", "form-container"], [4, "ngIf"], [3, "ngClass"], [1, "invalid-input-message"], ["autocomplete", "off", 3, "submit"], ["href", "https://vip.symantec.com/", "target", "_blank", "rel", "external nofollow noopener"], ["matInput", "", "name", "credentialId", "type", "text", "required", "", "placeholder", "Enter VIP Credential ID", "id", "0", 3, "value", "ngClass", "change"], ["credentialId", ""], ["matInput", "", "required", "", "type", "text", "placeholder", "FIRST SECURITY CODE", "id", "1", 3, "value", "ngClass", "change"], ["otp1", ""], ["matInput", "", "required", "", "type", "text", "placeholder", "SECOND SECURITY CODE", "id", "2", 3, "value", "ngClass", "change"], ["otp2", ""], ["matInput", "", "required", "", "type", "text", "placeholder", "SMS CODE", "id", "3", 3, "value", "ngClass", "change"], ["tempOtp", ""], ["mat-button", "", "mat-raised-button", "", "color", "primary", "id", "submit", "type", "submit", 3, "ngClass"], ["selectable", "false"]], template: function RegisterComponent_Template(rf, ctx) { if (rf & 1) {
        const _r7 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "section", 0);
        i0.ɵɵtemplate(1, RegisterComponent_h3_1_Template, 4, 0, "h3", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "p", 3);
        i0.ɵɵtext(4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "form", 4);
        i0.ɵɵlistener("submit", function RegisterComponent_Template_form_submit_5_listener() { i0.ɵɵrestoreView(_r7); const _r1 = i0.ɵɵreference(12); const _r2 = i0.ɵɵreference(20); const _r3 = i0.ɵɵreference(23); const _r6 = i0.ɵɵreference(28); return ctx.onSubmit(_r1.value, _r2.value, _r3.value, _r6.value); });
        i0.ɵɵelementStart(6, "p");
        i0.ɵɵtext(7, "Download Symantec VIP Access for desktop or mobile ");
        i0.ɵɵelementStart(8, "a", 5);
        i0.ɵɵtext(9, "here.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(10, "mat-form-field");
        i0.ɵɵelementStart(11, "input", 6, 7);
        i0.ɵɵlistener("change", function RegisterComponent_Template_input_change_11_listener() { i0.ɵɵrestoreView(_r7); const _r1 = i0.ɵɵreference(12); return ctx.validateInput(_r1); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(13, "p");
        i0.ɵɵtext(14, "Please enter two ");
        i0.ɵɵelementStart(15, "u");
        i0.ɵɵtext(16, "sequential");
        i0.ɵɵelementEnd();
        i0.ɵɵtext(17, " security codes");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(18, "mat-form-field");
        i0.ɵɵelementStart(19, "input", 8, 9);
        i0.ɵɵlistener("change", function RegisterComponent_Template_input_change_19_listener() { i0.ɵɵrestoreView(_r7); const _r2 = i0.ɵɵreference(20); return ctx.validateInput(_r2); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(21, "mat-form-field");
        i0.ɵɵelementStart(22, "input", 10, 11);
        i0.ɵɵlistener("change", function RegisterComponent_Template_input_change_22_listener() { i0.ɵɵrestoreView(_r7); const _r3 = i0.ɵɵreference(23); return ctx.validateInput(_r3); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(24, RegisterComponent_div_24_Template, 6, 0, "div", 1);
        i0.ɵɵtemplate(25, RegisterComponent_p_25_Template, 2, 1, "p", 1);
        i0.ɵɵelementStart(26, "mat-form-field");
        i0.ɵɵelementStart(27, "input", 12, 13);
        i0.ɵɵlistener("change", function RegisterComponent_Template_input_change_27_listener() { i0.ɵɵrestoreView(_r7); const _r6 = i0.ɵɵreference(28); return ctx.validateInput(_r6); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(29, "button", 14);
        i0.ɵɵtext(30);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(31, "div", 2);
        i0.ɵɵelementStart(32, "h3");
        i0.ɵɵtext(33);
        i0.ɵɵelementEnd();
        i0.ɵɵelement(34, "lib-tick");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.failed);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(17, _c0, ctx.registered));
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate(ctx.invalidInputMessage);
        i0.ɵɵadvance(7);
        i0.ɵɵproperty("value", ctx.credentialIdValue)("ngClass", i0.ɵɵpureFunction1(19, _c1, !ctx.validInputs[0]));
        i0.ɵɵadvance(8);
        i0.ɵɵproperty("value", ctx.otp1Value)("ngClass", i0.ɵɵpureFunction1(21, _c1, !ctx.validInputs[1]));
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("value", ctx.otp2Value)("ngClass", i0.ɵɵpureFunction1(23, _c1, !ctx.validInputs[2]));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", !ctx.smsCodeSent);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.smsCodeSent);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("value", ctx.tempOtpValue)("ngClass", i0.ɵɵpureFunction2(25, _c2, !ctx.validInputs[3], !ctx.smsCodeSent));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(28, _c0, !ctx.smsCodeSent));
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(ctx.submitButtonText);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(30, _c0, !ctx.registered));
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate(ctx.statusMessage);
    } }, directives: [i3.NgIf, i3.NgClass, i4.MatFormField, i5.MatInput, i6.MatButton, i7.TickComponent, i8.MatChipList, i8.MatChip], styles: ["form[_ngcontent-%COMP%]{display:flex;flex-direction:column}", ".form-container[_ngcontent-%COMP%]{background-color:#fff;font-weight:700;margin-bottom:12px;margin-left:5px;margin-top:12px;padding:15px}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(RegisterComponent, [{
        type: Component,
        args: [{
                selector: 'lib-register',
                templateUrl: './register.component.html',
                styleUrls: ['./register.component.scss', '../../main.css']
            }]
    }], function () { return [{ type: i1.Router }, { type: i2.VipService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L1Byb2plY3RzL25zd2hwYXV0aC1tb2R1bGUvcHJvamVjdHMvbnN3aHBhdXRoL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL3JlZ2lzdGVyL3JlZ2lzdGVyLmNvbXBvbmVudC50cyIsImxpYi9jb21wb25lbnRzL3JlZ2lzdGVyL3JlZ2lzdGVyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDOzs7Ozs7Ozs7OztJQ0NoRCwwQkFBbUI7SUFBQSxvQ0FBb0I7SUFBQSxxQkFBSTtJQUFBLGtFQUFrRDtJQUFBLGlCQUFLOzs7SUEyQjlGLDJCQUNFO0lBQUEseUJBQUc7SUFBQSx5REFBeUM7SUFBQSxpQkFBSTtJQUNoRCxxQ0FDRTtJQUFBLG9DQUEyQjtJQUFBLHVDQUF1QjtJQUFBLGlCQUFXO0lBQy9ELGlCQUFnQjtJQUNsQixpQkFBTTs7O0lBRU4seUJBQXVCO0lBQUEsWUFBMkM7SUFBQSxpQkFBSTs7O0lBQS9DLGVBQTJDO0lBQTNDLDZFQUEyQzs7Ozs7QUR2QnhFLE1BQU0sT0FBTyxpQkFBaUI7SUF5QjVCLFlBQ1UsTUFBYyxFQUNkLFVBQXNCO1FBRHRCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBekJoQyxnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFFZixrQkFBYSxHQUFHLEVBQUUsQ0FBQztRQUNuQixxQkFBZ0IsR0FBRyxVQUFVLENBQUM7UUFFOUIsaUJBQVksR0FBRyxFQUFFLENBQUM7UUFDbEIsd0JBQW1CLEdBQUcsRUFBRSxDQUFDO1FBRXpCLGVBQWU7UUFDZixzQkFBaUIsR0FBRyxFQUFFLENBQUM7UUFDdkIsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNmLGNBQVMsR0FBRyxFQUFFLENBQUM7UUFDZixpQkFBWSxHQUFHLEVBQUUsQ0FBQztRQUVsQixrREFBa0Q7UUFDbEQsZ0JBQVcsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3ZDLGtCQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLFVBQUssR0FBRyxDQUFDLENBQUM7UUFDVixVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsYUFBUSxHQUFHLENBQUMsQ0FBQztJQUtULENBQUM7SUFFTCxRQUFRO1FBRU4scUNBQXFDO1FBQ3JDLElBQUksQ0FBQywyQkFBMkIsRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFTywyQkFBMkI7UUFDakMsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRTVDLElBQUksQ0FBQyxVQUFVLENBQUMsc0JBQXNCLEVBQUUsQ0FBQyxTQUFTLENBQ2hELFFBQVEsQ0FBQyxFQUFFO1lBQ1QsT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztZQUN4QixJQUFJLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUM7UUFDNUMsQ0FBQyxFQUNELENBQU0sS0FBSyxFQUFDLEVBQUU7WUFDWixPQUFPLENBQUMsS0FBSyxDQUFDLG9EQUFvRCxDQUFDLENBQUM7WUFDcEUsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUVyQixvQ0FBb0M7WUFDcEMsZ0RBQWdEO1lBQ2hELE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDLENBQUM7UUFDaEUsQ0FBQyxDQUFBLENBQ0YsQ0FBQztJQUNKLENBQUM7SUFFRCxRQUFRLENBQUMsWUFBb0IsRUFBRSxJQUFZLEVBQUUsSUFBWSxFQUFFLE9BQWU7UUFFeEUsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxFQUFFO1lBQzFELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztZQUN6QyxJQUFJLENBQUMsVUFBVSxDQUFDLHFCQUFxQixDQUFDLFlBQVksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FDaEYsUUFBUSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsNEJBQTRCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQzVELEtBQUssQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUNuRCxDQUFDO1NBQ0g7UUFFRCxPQUFPLEtBQUssQ0FBQyxDQUFDLHVCQUF1QjtJQUN2QyxDQUFDO0lBRUQsNEJBQTRCLENBQUMsUUFBcUI7UUFDaEQsT0FBTyxDQUFDLEtBQUssQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO1FBQ25ELE9BQU8sQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoRCxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXhCLGtFQUFrRTtRQUNsRSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUN2QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUM7UUFFNUMsb0VBQW9FO1FBQ3BFLElBQUksQ0FBQyxVQUFVLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBRUQsNEhBQTRIO0lBQzVILGdHQUFnRztJQUN4Rix3QkFBd0IsQ0FBQyxLQUEwQjtRQUN6RCxPQUFPLENBQUMsS0FBSyxDQUFDLHlDQUF5QyxDQUFDLENBQUM7UUFDekQsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVyQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUVuQixtQkFBbUI7UUFDbkIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztRQUM5QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUV6QiwyQ0FBMkM7UUFDM0MsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFdBQVcsQ0FBQztRQUVwQyxJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRUQsMkVBQTJFO0lBRTNFLGFBQWEsQ0FBQyxLQUF1QjtRQUNuQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXJCLGVBQWU7UUFDZixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ2hELElBQUksQ0FBQyxtQkFBbUIsR0FBRyxFQUFFLENBQUM7UUFFOUIsZ0JBQWdCO1FBQ2hCLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDMUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztZQUNqRCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsK0JBQStCLENBQUM7U0FDNUQ7UUFFRCx1QkFBdUI7UUFDdkIsSUFBSSxLQUFLLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLElBQUksS0FBSyxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxJQUFJLEtBQUssQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUNySCxNQUFNLElBQUksR0FBRyxVQUFVLENBQUM7WUFDeEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUM1QixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO2dCQUNqRCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsaUNBQWlDLENBQUM7YUFDOUQ7U0FDRjtRQUVELE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFTyxjQUFjLENBQUMsWUFBb0IsRUFBRSxJQUFZLEVBQUUsSUFBWSxFQUFFLE9BQWU7UUFFdEYsc0NBQXNDO1FBQ3RDLElBQUksT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7WUFDdkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsS0FBSyxDQUFDO1NBQ3pDO1FBQ0QsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtZQUNwQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUM7U0FDdEM7UUFDRCxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQztTQUN0QztRQUNELElBQUksWUFBWSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7WUFDNUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsS0FBSyxDQUFDO1NBQzlDO1FBRUQsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNwQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsMkJBQTJCLENBQUM7WUFDdkQsT0FBTyxLQUFLLENBQUM7U0FDZDthQUFNO1lBQ0wsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEVBQUUsQ0FBQztZQUM5QixPQUFPLElBQUksQ0FBQztTQUNiO0lBQ0gsQ0FBQzs7a0ZBMUpVLGlCQUFpQjtzREFBakIsaUJBQWlCOztRQ1o5QixrQ0FDRTtRQUFBLGdFQUFtQjtRQUVuQiw4QkFDRTtRQUFBLDRCQUFpQztRQUFBLFlBQXVCO1FBQUEsaUJBQUk7UUFFNUQsK0JBQ0U7UUFEdUIscVBBQVUsd0RBQW1FLElBQUM7UUFDckcseUJBQUc7UUFBQSxtRUFDRDtRQUFBLDRCQUFxRjtRQUFBLHFCQUFLO1FBQUEsaUJBQUk7UUFDaEcsaUJBQUk7UUFFSix1Q0FDRTtRQUFBLG9DQUdGO1FBREksdUpBQVUsc0JBQTJCLElBQUM7UUFGeEMsaUJBR0Y7UUFBQSxpQkFBaUI7UUFFakIsMEJBQUc7UUFBQSxrQ0FBaUI7UUFBQSwwQkFBRztRQUFBLDJCQUFVO1FBQUEsaUJBQUk7UUFBQyxnQ0FBYztRQUFBLGlCQUFJO1FBQ3hELHVDQUNFO1FBQUEsb0NBRUY7UUFENkQsdUpBQVUsc0JBQW1CLElBQUM7UUFEekYsaUJBRUY7UUFBQSxpQkFBaUI7UUFFakIsdUNBQ0U7UUFBQSxzQ0FFRjtRQUQ2RCx1SkFBVSxzQkFBbUIsSUFBQztRQUR6RixpQkFFRjtRQUFBLGlCQUFpQjtRQUVqQixvRUFDRTtRQU1GLGdFQUF1QjtRQUN2Qix1Q0FDRTtRQUFBLHNDQUdGO1FBREksdUpBQVUsc0JBQXNCLElBQUM7UUFGbkMsaUJBR0Y7UUFBQSxpQkFBaUI7UUFFakIsbUNBQzBDO1FBQUEsYUFBb0I7UUFBQSxpQkFBUztRQUN6RSxpQkFBTztRQUNULGlCQUFNO1FBRU4sK0JBQ0U7UUFBQSwyQkFBSTtRQUFBLGFBQWlCO1FBQUEsaUJBQUs7UUFDMUIsNEJBQXFCO1FBQ3ZCLGlCQUFNO1FBQ1IsaUJBQVU7O1FBbERKLGVBQWM7UUFBZCxpQ0FBYztRQUViLGVBQXFDO1FBQXJDLHFFQUFxQztRQUNQLGVBQXVCO1FBQXZCLDZDQUF1QjtRQVF0QixlQUEyQjtRQUEzQiw2Q0FBMkIsNkRBQUE7UUFPMUIsZUFBbUI7UUFBbkIscUNBQW1CLDZEQUFBO1FBS25CLGVBQW1CO1FBQW5CLHFDQUFtQiw2REFBQTtRQUkvQyxlQUFvQjtRQUFwQix1Q0FBb0I7UUFPdEIsZUFBbUI7UUFBbkIsc0NBQW1CO1FBRWMsZUFBc0I7UUFBdEIsd0NBQXNCLCtFQUFBO1FBTXhELGVBQXVDO1FBQXZDLHVFQUF1QztRQUFDLGVBQW9CO1FBQXBCLDBDQUFvQjtRQUk3RCxlQUFzQztRQUF0QyxzRUFBc0M7UUFDckMsZUFBaUI7UUFBakIsdUNBQWlCOztrRERwQ1osaUJBQWlCO2NBTDdCLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsY0FBYztnQkFDeEIsV0FBVyxFQUFFLDJCQUEyQjtnQkFDeEMsU0FBUyxFQUFFLENBQUMsMkJBQTJCLEVBQUUsZ0JBQWdCLENBQUM7YUFDM0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5cclxuaW1wb3J0IHsgSU1mYU1lc3NhZ2UgfSBmcm9tICcuLi8uLi9tb2RlbC9tZmFNZXNzYWdlJztcclxuaW1wb3J0IHsgVmlwSHR0cEVycm9yUmVzb25zZSB9IGZyb20gJy4uLy4uL21vZGVsL3ZpcEh0dHBFcnJvclJlc3BvbnNlJztcclxuaW1wb3J0IHsgVmlwU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3ZpcC5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbGliLXJlZ2lzdGVyJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vcmVnaXN0ZXIuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3JlZ2lzdGVyLmNvbXBvbmVudC5zY3NzJywgJy4uLy4uL21haW4uY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFJlZ2lzdGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgc21zQ29kZVNlbnQgPSBmYWxzZTtcclxuICByZWdpc3RlcmVkID0gZmFsc2U7XHJcbiAgZmFpbGVkID0gZmFsc2U7XHJcblxyXG4gIHN0YXR1c01lc3NhZ2UgPSAnJztcclxuICBzdWJtaXRCdXR0b25UZXh0ID0gJ1JlZ2lzdGVyJztcclxuXHJcbiAgbW9iaWxlTnVtYmVyID0gJyc7XHJcbiAgaW52YWxpZElucHV0TWVzc2FnZSA9ICcnO1xyXG5cclxuICAvLyBJbnB1dCB2YWx1ZXNcclxuICBjcmVkZW50aWFsSWRWYWx1ZSA9ICcnO1xyXG4gIG90cDFWYWx1ZSA9ICcnO1xyXG4gIG90cDJWYWx1ZSA9ICcnO1xyXG4gIHRlbXBPdHBWYWx1ZSA9ICcnO1xyXG5cclxuICAvLyBTdG9yZSB0aGUgdmFsaWQgZmxhZyBmb3IgZWFjaCBpbnB1dCBpbiB0aGUgZm9ybVxyXG4gIHZhbGlkSW5wdXRzID0gW3RydWUsIHRydWUsIHRydWUsIHRydWVdO1xyXG4gIENSRURFTlRJQUxfSUQgPSAwO1xyXG4gIE9UUF8xID0gMTtcclxuICBPVFBfMiA9IDI7XHJcbiAgVEVNUF9PVFAgPSAzO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXHJcbiAgICBwcml2YXRlIHZpcFNlcnZpY2U6IFZpcFNlcnZpY2VcclxuICApIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuXHJcbiAgICAvLyBTZW5kIFNNUyBPVFAgY29kZSBmb3IgcmVnaXN0cmF0aW9uXHJcbiAgICB0aGlzLmluaXRpYXRlUmVnaXN0cmF0aW9uUHJvY2VzcygpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0aWF0ZVJlZ2lzdHJhdGlvblByb2Nlc3MoKSB7XHJcbiAgICB0aGlzLnNtc0NvZGVTZW50ID0gZmFsc2U7XHJcbiAgICB0aGlzLnZhbGlkSW5wdXRzID0gW3RydWUsIHRydWUsIHRydWUsIHRydWVdO1xyXG5cclxuICAgIHRoaXMudmlwU2VydmljZS5zZW5kT3RwRm9yUmVnaXN0cmF0aW9uKCkuc3Vic2NyaWJlKFxyXG4gICAgICByZXNwb25zZSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5kZWJ1ZyhyZXNwb25zZSk7XHJcbiAgICAgICAgdGhpcy5zbXNDb2RlU2VudCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5tb2JpbGVOdW1iZXIgPSByZXNwb25zZS5tb2JpbGVOdW1iZXI7XHJcbiAgICAgIH0sXHJcbiAgICAgIGFzeW5jIGVycm9yID0+IHtcclxuICAgICAgICBjb25zb2xlLmRlYnVnKCdFcnJvciBzZW5kaW5nIFNNUyBjb2RlIHRvIHVzZXIgZm9yIHJlZ2lzdHJhdGlvbi4uLicpO1xyXG4gICAgICAgIGNvbnNvbGUuZGVidWcoZXJyb3IpO1xyXG5cclxuICAgICAgICAvLyBUT0RPOiBEbyB3ZSB3YW50IHRvIGhhbmRsZSBiZXR0ZXJcclxuICAgICAgICAvLyBXZSBuZWVkIHRvIHBhc3MgaW4gdGhlIHJlcXVlc3QgaWQgdG8gdGhlIHBhZ2VcclxuICAgICAgICBhd2FpdCB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9hdXRoZW50aWNhdGlvbi9jb250YWN0LWFkbWluJ10pO1xyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgb25TdWJtaXQoY3JlZGVudGlhbElkOiBzdHJpbmcsIG90cDE6IHN0cmluZywgb3RwMjogc3RyaW5nLCB0ZW1wT3RwOiBzdHJpbmcpOiBmYWxzZSB7XHJcblxyXG4gICAgaWYgKHRoaXMuYWxsSW5wdXRzVmFsaWQoY3JlZGVudGlhbElkLCBvdHAxLCBvdHAyLCB0ZW1wT3RwKSkge1xyXG4gICAgICB0aGlzLnN1Ym1pdEJ1dHRvblRleHQgPSAnUmVnaXN0ZXJpbmcuLi4nO1xyXG4gICAgICB0aGlzLnZpcFNlcnZpY2Uuc3VibWl0VmlwUmVnaXN0cmF0aW9uKGNyZWRlbnRpYWxJZCwgb3RwMSwgb3RwMiwgdGVtcE90cCkuc3Vic2NyaWJlKFxyXG4gICAgICAgIHJlc3BvbnNlID0+IHsgdGhpcy5oYW5kbGVTdWNjZXNzZnVsUmVnaXN0cmF0aW9uKHJlc3BvbnNlKTsgfSxcclxuICAgICAgICBlcnJvciA9PiB7IHRoaXMuaGFuZGxlRmFpbGVkUmVnaXN0cmF0aW9uKGVycm9yKTsgfVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmYWxzZTsgLy8gRG9uJ3QgY2F1c2UgYSByZWxvYWRcclxuICB9XHJcblxyXG4gIGhhbmRsZVN1Y2Nlc3NmdWxSZWdpc3RyYXRpb24ocmVzcG9uc2U6IElNZmFNZXNzYWdlKSB7XHJcbiAgICBjb25zb2xlLmRlYnVnKCdTVUNDRVNTOiBVc2VyIHJlZ2lzdGVyZWQgd2l0aCBWSVAnKTtcclxuICAgIGNvbnNvbGUuZGVidWcoJ3ZpcFRva2VuOiAnICsgcmVzcG9uc2UudmlwVG9rZW4pO1xyXG4gICAgY29uc29sZS5kZWJ1ZyhyZXNwb25zZSk7XHJcblxyXG4gICAgLy8gTm90aWZ5IHRoZSB1c2VyIG9mIHN1Y2Nlc3NmdWwgcmVnaXN0cmF0aW9uIGFuZCBzaG93IGhvbWUgYnV0dG9uXHJcbiAgICB0aGlzLnJlZ2lzdGVyZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5mYWlsZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuc3RhdHVzTWVzc2FnZSA9IHJlc3BvbnNlLnN0YXR1c01lc3NhZ2U7XHJcblxyXG4gICAgLy8gTk9URTogVmlwU2VydmljZSBpbnRlcmNlcHRzIHRoZSByZXNwb25zZSBhbmQgc3RvcmVzIHRoZSBWaXAgdG9rZW5cclxuICAgIHRoaXMudmlwU2VydmljZS5yZWRpcmVjdFRvTGFzdExvY2F0aW9uKCk7XHJcbiAgfVxyXG5cclxuICAvLyBJZiByZWdpc3RyYXRpb24gZmFpbHMgZm9yIGFueSByZWFzb24gKHdlIGFzc3VtZSBhbGwgaW5wdXRzIHBhc3NlZCB2YWxpZGF0aW9uIC0gZXZlbiB0aG91Z2ggY3VycmVudCB2YWxpZGF0aW9uIGlzIG1pbmltYWwpXHJcbiAgLy8gd2Ugd2lsbCBzZW5kIGEgbmV3IFNNUyBjb2RlIGFuZCBjbGVhciBhbGwgaW5wdXRzIHNvIHVzZXIgY2FuIGJlZ2luIHJlZ2lzdHJhdGlvbiBwcm9jZXNzIGFnYWluXHJcbiAgcHJpdmF0ZSBoYW5kbGVGYWlsZWRSZWdpc3RyYXRpb24oZXJyb3I6IFZpcEh0dHBFcnJvclJlc29uc2UpIHtcclxuICAgIGNvbnNvbGUuZGVidWcoJ0VSUk9SOiBGYWlsZWQgdG8gcmVnaXN0ZXIgdXNlciB3aXRoIFZJUCcpO1xyXG4gICAgY29uc29sZS5kZWJ1ZyhlcnJvcik7XHJcblxyXG4gICAgdGhpcy5mYWlsZWQgPSB0cnVlO1xyXG5cclxuICAgIC8vIENsZWFyIGFsbCBpbnB1dHNcclxuICAgIHRoaXMuY3JlZGVudGlhbElkVmFsdWUgPSBudWxsO1xyXG4gICAgdGhpcy5vdHAxVmFsdWUgPSBudWxsO1xyXG4gICAgdGhpcy5vdHAyVmFsdWUgPSBudWxsO1xyXG4gICAgdGhpcy50ZW1wT3RwVmFsdWUgPSBudWxsO1xyXG5cclxuICAgIC8vIFRlbGwgdXNlciB0byB0cnkgYWdhaW4gd2l0aCBuZXcgU01TIGNvZGVcclxuICAgIHRoaXMuc3VibWl0QnV0dG9uVGV4dCA9ICdUcnkgQWdhaW4nO1xyXG5cclxuICAgIHRoaXMuaW5pdGlhdGVSZWdpc3RyYXRpb25Qcm9jZXNzKCk7XHJcbiAgfVxyXG5cclxuICAvKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKi9cclxuXHJcbiAgdmFsaWRhdGVJbnB1dChpbnB1dDogSFRNTElucHV0RWxlbWVudCkge1xyXG4gICAgY29uc29sZS5kZWJ1ZyhpbnB1dCk7XHJcblxyXG4gICAgLy8gQXNzdW1lIHZhbGlkXHJcbiAgICB0aGlzLnZhbGlkSW5wdXRzW3BhcnNlSW50KGlucHV0LmlkLCAxMCldID0gdHJ1ZTtcclxuICAgIHRoaXMuaW52YWxpZElucHV0TWVzc2FnZSA9ICcnO1xyXG5cclxuICAgIC8vIE5vIHdoaXRlc3BhY2VcclxuICAgIGlmICgvXFxzLy50ZXN0KGlucHV0LnZhbHVlKSkge1xyXG4gICAgICB0aGlzLnZhbGlkSW5wdXRzW3BhcnNlSW50KGlucHV0LmlkLCAxMCldID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuaW52YWxpZElucHV0TWVzc2FnZSA9ICdJbnB1dCBtdXN0IG5vdCBjb250YWluIHNwYWNlcyc7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gT25seSBudW1iZXJzIGluIE9UUHNcclxuICAgIGlmIChpbnB1dC5pZCA9PT0gdGhpcy5PVFBfMS50b1N0cmluZygpIHx8IGlucHV0LmlkID09PSB0aGlzLk9UUF8yLnRvU3RyaW5nKCkgfHwgaW5wdXQuaWQgPT09IHRoaXMuVEVNUF9PVFAudG9TdHJpbmcoKSkge1xyXG4gICAgICBjb25zdCBudW1zID0gL15bMC05XSokLztcclxuICAgICAgaWYgKCFpbnB1dC52YWx1ZS5tYXRjaChudW1zKSkge1xyXG4gICAgICAgIHRoaXMudmFsaWRJbnB1dHNbcGFyc2VJbnQoaW5wdXQuaWQsIDEwKV0gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmludmFsaWRJbnB1dE1lc3NhZ2UgPSAnQ29kZXMgbWF5IG9ubHkgY29udGFpbnMgbnVtYmVycyc7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zb2xlLmRlYnVnKHRoaXMudmFsaWRJbnB1dHMpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhbGxJbnB1dHNWYWxpZChjcmVkZW50aWFsSWQ6IHN0cmluZywgb3RwMTogc3RyaW5nLCBvdHAyOiBzdHJpbmcsIHRlbXBPdHA6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG5cclxuICAgIC8vIEVuc3VyZSBhbGwgaW5wdXRzIGhhdmUgYmVlbiBlbnRlcmVkXHJcbiAgICBpZiAodGVtcE90cC5sZW5ndGggPD0gMCkge1xyXG4gICAgICB0aGlzLnZhbGlkSW5wdXRzW3RoaXMuVEVNUF9PVFBdID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAob3RwMi5sZW5ndGggPD0gMCkge1xyXG4gICAgICB0aGlzLnZhbGlkSW5wdXRzW3RoaXMuT1RQXzJdID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAob3RwMS5sZW5ndGggPD0gMCkge1xyXG4gICAgICB0aGlzLnZhbGlkSW5wdXRzW3RoaXMuT1RQXzFdID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAoY3JlZGVudGlhbElkLmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgIHRoaXMudmFsaWRJbnB1dHNbdGhpcy5DUkVERU5USUFMX0lEXSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnZhbGlkSW5wdXRzLmluY2x1ZGVzKGZhbHNlKSkge1xyXG4gICAgICB0aGlzLmludmFsaWRJbnB1dE1lc3NhZ2UgPSAnUGxlYXNlIGZpbGwgaW4gYWxsIGZpZWxkcyc7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaW52YWxpZElucHV0TWVzc2FnZSA9ICcnO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiPHNlY3Rpb24gY2xhc3M9XCJtYXQtZWxldmF0aW9uLXoyIGZvcm0tY29udGFpbmVyXCI+XHJcbiAgPGgzICpuZ0lmPVwiZmFpbGVkXCI+RmFpbGVkIFJlZ2lzdHJhdGlvbi48YnI+V2UgaGF2ZSBzZW50IHlvdSBhIG5ldyBTTVMgY29kZS4gUGxlYXNlIHRyeSBhZ2Fpbi48L2gzPlxyXG5cclxuICA8ZGl2IFtuZ0NsYXNzXT1cInsgJ2hpZGRlbicgOiByZWdpc3RlcmVkIH1cIj5cclxuICAgIDxwIGNsYXNzPVwiaW52YWxpZC1pbnB1dC1tZXNzYWdlXCI+e3tpbnZhbGlkSW5wdXRNZXNzYWdlfX08L3A+XHJcblxyXG4gICAgPGZvcm0gYXV0b2NvbXBsZXRlPVwib2ZmXCIgKHN1Ym1pdCk9XCJvblN1Ym1pdChjcmVkZW50aWFsSWQudmFsdWUsIG90cDEudmFsdWUsIG90cDIudmFsdWUsIHRlbXBPdHAudmFsdWUpXCI+XHJcbiAgICAgIDxwPkRvd25sb2FkIFN5bWFudGVjIFZJUCBBY2Nlc3MgZm9yIGRlc2t0b3Agb3IgbW9iaWxlXHJcbiAgICAgICAgPGEgaHJlZj1cImh0dHBzOi8vdmlwLnN5bWFudGVjLmNvbS9cIiB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJleHRlcm5hbCBub2ZvbGxvdyBub29wZW5lclwiPmhlcmUuPC9hPlxyXG4gICAgICA8L3A+XHJcblxyXG4gICAgICA8bWF0LWZvcm0tZmllbGQ+XHJcbiAgICAgICAgPGlucHV0ICNjcmVkZW50aWFsSWQgbWF0SW5wdXQgW3ZhbHVlXT1cImNyZWRlbnRpYWxJZFZhbHVlXCIgbmFtZT1cImNyZWRlbnRpYWxJZFwiIHR5cGU9XCJ0ZXh0XCIgcmVxdWlyZWRcclxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgVklQIENyZWRlbnRpYWwgSURcIiBbbmdDbGFzc109XCJ7ICdpbnZhbGlkLWlucHV0JyA6ICF2YWxpZElucHV0c1swXSB9XCIgaWQ9XCIwXCJcclxuICAgICAgICAgIChjaGFuZ2UpPVwidmFsaWRhdGVJbnB1dChjcmVkZW50aWFsSWQpXCI+XHJcbiAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XHJcblxyXG4gICAgICA8cD5QbGVhc2UgZW50ZXIgdHdvIDx1PnNlcXVlbnRpYWw8L3U+IHNlY3VyaXR5IGNvZGVzPC9wPlxyXG4gICAgICA8bWF0LWZvcm0tZmllbGQ+XHJcbiAgICAgICAgPGlucHV0ICNvdHAxIG1hdElucHV0IHJlcXVpcmVkIFt2YWx1ZV09XCJvdHAxVmFsdWVcIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiRklSU1QgU0VDVVJJVFkgQ09ERVwiXHJcbiAgICAgICAgICBbbmdDbGFzc109XCJ7ICdpbnZhbGlkLWlucHV0JyA6ICF2YWxpZElucHV0c1sxXSB9XCIgaWQ9XCIxXCIgKGNoYW5nZSk9XCJ2YWxpZGF0ZUlucHV0KG90cDEpXCI+XHJcbiAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XHJcblxyXG4gICAgICA8bWF0LWZvcm0tZmllbGQ+XHJcbiAgICAgICAgPGlucHV0ICNvdHAyIG1hdElucHV0IHJlcXVpcmVkIFt2YWx1ZV09XCJvdHAyVmFsdWVcIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiU0VDT05EIFNFQ1VSSVRZIENPREVcIlxyXG4gICAgICAgICAgW25nQ2xhc3NdPVwieyAnaW52YWxpZC1pbnB1dCcgOiAhdmFsaWRJbnB1dHNbMl0gfVwiIGlkPVwiMlwiIChjaGFuZ2UpPVwidmFsaWRhdGVJbnB1dChvdHAyKVwiPlxyXG4gICAgICA8L21hdC1mb3JtLWZpZWxkPlxyXG5cclxuICAgICAgPGRpdiAqbmdJZj1cIiFzbXNDb2RlU2VudFwiPlxyXG4gICAgICAgIDxwPlNlbmRpbmcgU01TIGNvZGUgdG8geW91ciBtb2JpbGUgZGV2aWNlLi4uPC9wPlxyXG4gICAgICAgIDxtYXQtY2hpcC1saXN0PlxyXG4gICAgICAgICAgPG1hdC1jaGlwIHNlbGVjdGFibGU9ZmFsc2U+V2FpdGluZyBmb3IgU01TIGNvZGUuLi48L21hdC1jaGlwPlxyXG4gICAgICAgIDwvbWF0LWNoaXAtbGlzdD5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICA8cCAqbmdJZj1cInNtc0NvZGVTZW50XCI+U01TIENvZGUgaGFzIGJlZW4gc2VudCB0byAre3ttb2JpbGVOdW1iZXJ9fTwvcD5cclxuICAgICAgPG1hdC1mb3JtLWZpZWxkPlxyXG4gICAgICAgIDxpbnB1dCAjdGVtcE90cCBtYXRJbnB1dCByZXF1aXJlZCBbdmFsdWVdPVwidGVtcE90cFZhbHVlXCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIlNNUyBDT0RFXCJcclxuICAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ2ludmFsaWQtaW5wdXQnIDogIXZhbGlkSW5wdXRzWzNdLCAnaGlkZGVuJyA6ICFzbXNDb2RlU2VudCB9XCIgaWQ9XCIzXCJcclxuICAgICAgICAgIChjaGFuZ2UpPVwidmFsaWRhdGVJbnB1dCh0ZW1wT3RwKVwiPlxyXG4gICAgICA8L21hdC1mb3JtLWZpZWxkPlxyXG5cclxuICAgICAgPGJ1dHRvbiBtYXQtYnV0dG9uIG1hdC1yYWlzZWQtYnV0dG9uIGNvbG9yPVwicHJpbWFyeVwiIGlkPVwic3VibWl0XCIgdHlwZT1cInN1Ym1pdFwiXHJcbiAgICAgICAgW25nQ2xhc3NdPVwieyAnaGlkZGVuJyA6ICFzbXNDb2RlU2VudCB9XCI+e3tzdWJtaXRCdXR0b25UZXh0fX08L2J1dHRvbj5cclxuICAgIDwvZm9ybT5cclxuICA8L2Rpdj5cclxuXHJcbiAgPGRpdiBbbmdDbGFzc109XCJ7ICdoaWRkZW4nIDogIXJlZ2lzdGVyZWQgfVwiPlxyXG4gICAgPGgzPnt7c3RhdHVzTWVzc2FnZX19PC9oMz5cclxuICAgIDxsaWItdGljaz48L2xpYi10aWNrPlxyXG4gIDwvZGl2PlxyXG48L3NlY3Rpb24+XHJcbiJdfQ==
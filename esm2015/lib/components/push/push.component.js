import { __awaiter } from "tslib";
import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "../../services/vip.service";
import * as i3 from "@angular/common";
import * as i4 from "../spinner/spinner.component";
import * as i5 from "@angular/material/button";
import * as i6 from "../tick/tick.component";
function PushComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelementStart(1, "h2");
    i0.ɵɵtext(2, "A push notification has been sent to your mobile device.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h3");
    i0.ɵɵtext(4, "Waiting for Sign in Request to be approved...");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(5, "lib-spinner", 2);
    i0.ɵɵelementStart(6, "h3");
    i0.ɵɵtext(7, "Please do not refresh this page");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "button", 3);
    i0.ɵɵlistener("click", function PushComponent_div_1_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r3); const ctx_r2 = i0.ɵɵnextContext(); return ctx_r2.useOTP(); });
    i0.ɵɵtext(9, "Use OTP Instead");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("isRunning", ctx_r0.waiting);
} }
function PushComponent_div_2_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelement(1, "lib-tick");
    i0.ɵɵelementEnd();
} }
function PushComponent_div_2_div_6_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelementStart(1, "button", 3);
    i0.ɵɵlistener("click", function PushComponent_div_2_div_6_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r7); const ctx_r6 = i0.ɵɵnextContext(2); return ctx_r6.useOTP(); });
    i0.ɵɵtext(2, "Use OTP Instead");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function PushComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelementStart(1, "h1");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h2");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, PushComponent_div_2_div_5_Template, 2, 0, "div", 1);
    i0.ɵɵtemplate(6, PushComponent_div_2_div_6_Template, 3, 0, "div", 1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.statusMessage);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.detailMessage);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.success);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r1.success);
} }
export class PushComponent {
    constructor(router, vipService) {
        this.router = router;
        this.vipService = vipService;
        this.statusMessage = '';
        this.detailMessage = '';
    }
    ngOnInit() {
        // Call API and wait for response
        this.waiting = true;
        this.vipService.pollUsersPushResponse().subscribe(response => {
            this.handleSuccessfulPush(response);
        }, error => {
            this.handleFailedPush(error);
        });
    }
    handleSuccessfulPush(response) {
        console.debug('SUCCESS: User accepted push notification');
        console.debug('vipToken: ' + response.vipToken);
        console.debug(response);
        // Hide the waiting screen and show success!
        this.waiting = false;
        this.success = true;
        this.statusMessage = response.statusMessage;
        this.detailMessage = response.detailMessage;
        // NOTE: VipService intercepts the response and stores the Vip token
        this.vipService.redirectToLastLocation();
    }
    handleFailedPush(error) {
        console.debug('ERROR: Did not receive user\'s push acceptance');
        console.error(error);
        console.error(error.error);
        // Hide the waiting screen and show failure!
        this.waiting = false;
        this.success = false;
        const err = error.error;
        this.statusMessage = err.statusMessage;
        this.detailMessage = err.detailMessage;
    }
    useOTP() {
        return __awaiter(this, void 0, void 0, function* () {
            console.debug('User has selected to use OTP instead of Push. Redirecting...');
            yield this.router.navigate(['authentication/otp']);
        });
    }
}
PushComponent.ɵfac = function PushComponent_Factory(t) { return new (t || PushComponent)(i0.ɵɵdirectiveInject(i1.Router), i0.ɵɵdirectiveInject(i2.VipService)); };
PushComponent.ɵcmp = i0.ɵɵdefineComponent({ type: PushComponent, selectors: [["lib-push"]], decls: 3, vars: 2, consts: [[1, "mat-elevation-z2", "form-container"], [4, "ngIf"], [3, "isRunning"], ["mat-button", "", "mat-raised-button", "", "color", "primary", 3, "click"]], template: function PushComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "section", 0);
        i0.ɵɵtemplate(1, PushComponent_div_1_Template, 10, 1, "div", 1);
        i0.ɵɵtemplate(2, PushComponent_div_2_Template, 7, 4, "div", 1);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.waiting);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.waiting);
    } }, directives: [i3.NgIf, i4.SpinnerComponent, i5.MatButton, i6.TickComponent], styles: ["", ".form-container[_ngcontent-%COMP%]{background-color:#fff;font-weight:700;margin-bottom:12px;margin-left:5px;margin-top:12px;padding:15px}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(PushComponent, [{
        type: Component,
        args: [{
                selector: 'lib-push',
                templateUrl: './push.component.html',
                styleUrls: ['./push.component.scss', '../../main.css']
            }]
    }], function () { return [{ type: i1.Router }, { type: i2.VipService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVzaC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovUHJvamVjdHMvbnN3aHBhdXRoLW1vZHVsZS9wcm9qZWN0cy9uc3docGF1dGgvc3JjLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvcHVzaC9wdXNoLmNvbXBvbmVudC50cyIsImxpYi9jb21wb25lbnRzL3B1c2gvcHVzaC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7OztJQ0FoRCwyQkFDRTtJQUFBLDBCQUFJO0lBQUEsd0VBQXdEO0lBQUEsaUJBQUs7SUFDakUsMEJBQUk7SUFBQSw2REFBNkM7SUFBQSxpQkFBSztJQUN0RCxpQ0FBaUQ7SUFDakQsMEJBQUk7SUFBQSwrQ0FBK0I7SUFBQSxpQkFBSztJQUN4QyxpQ0FBd0U7SUFBbkIsNktBQWtCO0lBQUMsK0JBQWU7SUFBQSxpQkFBUztJQUNsRyxpQkFBTTs7O0lBSFMsZUFBcUI7SUFBckIsMENBQXFCOzs7SUFPbEMsMkJBQ0U7SUFBQSwyQkFBcUI7SUFDdkIsaUJBQU07Ozs7SUFDTiwyQkFDRTtJQUFBLGlDQUF3RTtJQUFuQixvTEFBa0I7SUFBQywrQkFBZTtJQUFBLGlCQUFTO0lBQ2xHLGlCQUFNOzs7SUFSUiwyQkFDRTtJQUFBLDBCQUFJO0lBQUEsWUFBaUI7SUFBQSxpQkFBSztJQUMxQiwwQkFBSTtJQUFBLFlBQWlCO0lBQUEsaUJBQUs7SUFDMUIsb0VBQ0U7SUFFRixvRUFDRTtJQUVKLGlCQUFNOzs7SUFSQSxlQUFpQjtJQUFqQiwwQ0FBaUI7SUFDakIsZUFBaUI7SUFBakIsMENBQWlCO0lBQ2hCLGVBQWU7SUFBZixxQ0FBZTtJQUdmLGVBQWdCO0lBQWhCLHNDQUFnQjs7QUREekIsTUFBTSxPQUFPLGFBQWE7SUFReEIsWUFDVSxNQUFjLEVBQ2QsVUFBc0I7UUFEdEIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLGVBQVUsR0FBVixVQUFVLENBQVk7UUFMekIsa0JBQWEsR0FBRyxFQUFFLENBQUM7UUFDbkIsa0JBQWEsR0FBRyxFQUFFLENBQUM7SUFLdEIsQ0FBQztJQUVMLFFBQVE7UUFFTixpQ0FBaUM7UUFDakMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFFcEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLFNBQVMsQ0FDL0MsUUFBUSxDQUFDLEVBQUU7WUFDVCxJQUFJLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEMsQ0FBQyxFQUNELEtBQUssQ0FBQyxFQUFFO1lBQ04sSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9CLENBQUMsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUVPLG9CQUFvQixDQUFDLFFBQXFCO1FBQ2hELE9BQU8sQ0FBQyxLQUFLLENBQUMsMENBQTBDLENBQUMsQ0FBQztRQUMxRCxPQUFPLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEQsT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUV4Qiw0Q0FBNEM7UUFDNUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFFcEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDO1FBQzVDLElBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQztRQUU1QyxvRUFBb0U7UUFFcEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFFTyxnQkFBZ0IsQ0FBQyxLQUF3QjtRQUMvQyxPQUFPLENBQUMsS0FBSyxDQUFDLGdEQUFnRCxDQUFDLENBQUM7UUFDaEUsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUzQiw0Q0FBNEM7UUFDNUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFFckIsTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLEtBQWdDLENBQUM7UUFFbkQsSUFBSSxDQUFDLGFBQWEsR0FBRyxHQUFHLENBQUMsYUFBYSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFDLGFBQWEsQ0FBQztJQUN6QyxDQUFDO0lBR1ksTUFBTTs7WUFDakIsT0FBTyxDQUFDLEtBQUssQ0FBQyw4REFBOEQsQ0FBQyxDQUFDO1lBQzlFLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7UUFDckQsQ0FBQztLQUFBOzswRUFoRVUsYUFBYTtrREFBYixhQUFhO1FDYjFCLGtDQUNFO1FBQUEsK0RBQ0U7UUFNRiw4REFDRTtRQVNKLGlCQUFVOztRQWpCSCxlQUFlO1FBQWYsa0NBQWU7UUFPZixlQUFnQjtRQUFoQixtQ0FBZ0I7O2tEREtWLGFBQWE7Y0FMekIsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxVQUFVO2dCQUNwQixXQUFXLEVBQUUsdUJBQXVCO2dCQUNwQyxTQUFTLEVBQUUsQ0FBQyx1QkFBdUIsRUFBRSxnQkFBZ0IsQ0FBQzthQUN2RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBFcnJvclJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5cclxuaW1wb3J0IHsgSU1mYU1lc3NhZ2VFcnJvck1lc3NhZ2UgfSBmcm9tICcuLi8uLi9tb2RlbC9tZmFFcnJvck1lc3NhZ2UnO1xyXG5pbXBvcnQgeyBJTWZhTWVzc2FnZSB9IGZyb20gJy4uLy4uL21vZGVsL21mYU1lc3NhZ2UnO1xyXG5pbXBvcnQgeyBWaXBTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvdmlwLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdsaWItcHVzaCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3B1c2guY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3B1c2guY29tcG9uZW50LnNjc3MnLCAnLi4vLi4vbWFpbi5jc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUHVzaENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gIHdhaXRpbmc6IGJvb2xlYW47XHJcbiAgcHVibGljIHN1Y2Nlc3M6IGJvb2xlYW47XHJcblxyXG4gIHB1YmxpYyBzdGF0dXNNZXNzYWdlID0gJyc7XHJcbiAgcHVibGljIGRldGFpbE1lc3NhZ2UgPSAnJztcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxyXG4gICAgcHJpdmF0ZSB2aXBTZXJ2aWNlOiBWaXBTZXJ2aWNlXHJcbiAgKSB7IH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcblxyXG4gICAgLy8gQ2FsbCBBUEkgYW5kIHdhaXQgZm9yIHJlc3BvbnNlXHJcbiAgICB0aGlzLndhaXRpbmcgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMudmlwU2VydmljZS5wb2xsVXNlcnNQdXNoUmVzcG9uc2UoKS5zdWJzY3JpYmUoXHJcbiAgICAgIHJlc3BvbnNlID0+IHtcclxuICAgICAgICB0aGlzLmhhbmRsZVN1Y2Nlc3NmdWxQdXNoKHJlc3BvbnNlKTtcclxuICAgICAgfSxcclxuICAgICAgZXJyb3IgPT4ge1xyXG4gICAgICAgIHRoaXMuaGFuZGxlRmFpbGVkUHVzaChlcnJvcik7XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhbmRsZVN1Y2Nlc3NmdWxQdXNoKHJlc3BvbnNlOiBJTWZhTWVzc2FnZSkge1xyXG4gICAgY29uc29sZS5kZWJ1ZygnU1VDQ0VTUzogVXNlciBhY2NlcHRlZCBwdXNoIG5vdGlmaWNhdGlvbicpO1xyXG4gICAgY29uc29sZS5kZWJ1ZygndmlwVG9rZW46ICcgKyByZXNwb25zZS52aXBUb2tlbik7XHJcbiAgICBjb25zb2xlLmRlYnVnKHJlc3BvbnNlKTtcclxuXHJcbiAgICAvLyBIaWRlIHRoZSB3YWl0aW5nIHNjcmVlbiBhbmQgc2hvdyBzdWNjZXNzIVxyXG4gICAgdGhpcy53YWl0aW5nID0gZmFsc2U7XHJcbiAgICB0aGlzLnN1Y2Nlc3MgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuc3RhdHVzTWVzc2FnZSA9IHJlc3BvbnNlLnN0YXR1c01lc3NhZ2U7XHJcbiAgICB0aGlzLmRldGFpbE1lc3NhZ2UgPSByZXNwb25zZS5kZXRhaWxNZXNzYWdlO1xyXG5cclxuICAgIC8vIE5PVEU6IFZpcFNlcnZpY2UgaW50ZXJjZXB0cyB0aGUgcmVzcG9uc2UgYW5kIHN0b3JlcyB0aGUgVmlwIHRva2VuXHJcblxyXG4gICAgdGhpcy52aXBTZXJ2aWNlLnJlZGlyZWN0VG9MYXN0TG9jYXRpb24oKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFuZGxlRmFpbGVkUHVzaChlcnJvcjogSHR0cEVycm9yUmVzcG9uc2UpIHtcclxuICAgIGNvbnNvbGUuZGVidWcoJ0VSUk9SOiBEaWQgbm90IHJlY2VpdmUgdXNlclxcJ3MgcHVzaCBhY2NlcHRhbmNlJyk7XHJcbiAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IuZXJyb3IpO1xyXG5cclxuICAgIC8vIEhpZGUgdGhlIHdhaXRpbmcgc2NyZWVuIGFuZCBzaG93IGZhaWx1cmUhXHJcbiAgICB0aGlzLndhaXRpbmcgPSBmYWxzZTtcclxuICAgIHRoaXMuc3VjY2VzcyA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0IGVyciA9IGVycm9yLmVycm9yIGFzIElNZmFNZXNzYWdlRXJyb3JNZXNzYWdlO1xyXG5cclxuICAgIHRoaXMuc3RhdHVzTWVzc2FnZSA9IGVyci5zdGF0dXNNZXNzYWdlO1xyXG4gICAgdGhpcy5kZXRhaWxNZXNzYWdlID0gZXJyLmRldGFpbE1lc3NhZ2U7XHJcbiAgfVxyXG5cclxuXHJcbiAgcHVibGljIGFzeW5jIHVzZU9UUCgpIHtcclxuICAgIGNvbnNvbGUuZGVidWcoJ1VzZXIgaGFzIHNlbGVjdGVkIHRvIHVzZSBPVFAgaW5zdGVhZCBvZiBQdXNoLiBSZWRpcmVjdGluZy4uLicpO1xyXG4gICAgYXdhaXQgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWydhdXRoZW50aWNhdGlvbi9vdHAnXSk7XHJcbiAgfVxyXG59XHJcbiIsIjxzZWN0aW9uIGNsYXNzPVwibWF0LWVsZXZhdGlvbi16MiBmb3JtLWNvbnRhaW5lclwiPlxyXG4gIDxkaXYgKm5nSWY9XCJ3YWl0aW5nXCI+XHJcbiAgICA8aDI+QSBwdXNoIG5vdGlmaWNhdGlvbiBoYXMgYmVlbiBzZW50IHRvIHlvdXIgbW9iaWxlIGRldmljZS48L2gyPlxyXG4gICAgPGgzPldhaXRpbmcgZm9yIFNpZ24gaW4gUmVxdWVzdCB0byBiZSBhcHByb3ZlZC4uLjwvaDM+XHJcbiAgICA8bGliLXNwaW5uZXIgW2lzUnVubmluZ109XCJ3YWl0aW5nXCI+PC9saWItc3Bpbm5lcj5cclxuICAgIDxoMz5QbGVhc2UgZG8gbm90IHJlZnJlc2ggdGhpcyBwYWdlPC9oMz5cclxuICAgIDxidXR0b24gbWF0LWJ1dHRvbiBtYXQtcmFpc2VkLWJ1dHRvbiBjb2xvcj1cInByaW1hcnlcIiAoY2xpY2spPVwidXNlT1RQKClcIj5Vc2UgT1RQIEluc3RlYWQ8L2J1dHRvbj5cclxuICA8L2Rpdj5cclxuICA8ZGl2ICpuZ0lmPVwiIXdhaXRpbmdcIj5cclxuICAgIDxoMT57e3N0YXR1c01lc3NhZ2V9fTwvaDE+XHJcbiAgICA8aDI+e3tkZXRhaWxNZXNzYWdlfX08L2gyPlxyXG4gICAgPGRpdiAqbmdJZj1cInN1Y2Nlc3NcIj5cclxuICAgICAgPGxpYi10aWNrPjwvbGliLXRpY2s+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgKm5nSWY9XCIhc3VjY2Vzc1wiPlxyXG4gICAgICA8YnV0dG9uIG1hdC1idXR0b24gbWF0LXJhaXNlZC1idXR0b24gY29sb3I9XCJwcmltYXJ5XCIgKGNsaWNrKT1cInVzZU9UUCgpXCI+VXNlIE9UUCBJbnN0ZWFkPC9idXR0b24+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC9zZWN0aW9uPlxyXG4iXX0=
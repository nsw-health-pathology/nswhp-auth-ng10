import { __awaiter } from "tslib";
import { Component } from '@angular/core';
import { AadService } from '../../services/aad.service';
import * as i0 from "@angular/core";
import * as i1 from "../../services/aad.service";
import * as i2 from "@angular/router";
import * as i3 from "../../services/storage.service";
import * as i4 from "@angular/material/button";
export class AzureLoginComponent {
    constructor(aadService, router, activatedRoute, storage) {
        this.aadService = aadService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.storage = storage;
        this.azureInstanceAD = 'NSW Health Employee';
    }
    handleLoginRouting() {
        return __awaiter(this, void 0, void 0, function* () {
            const routeParams = this.activatedRoute.snapshot.params.tenantConfigId;
            // If we're returning from a login, initialise ADAL with the supplied config index
            if (routeParams) {
                this.aadService.initialiseAdalServiceWithConfig(routeParams);
                this.aadService.handleWindowCallbackFromAzureLogin();
                const lastLocation = this.storage.retrieveLastLocation();
                this.storage.clearLastLocation();
                if (lastLocation) {
                    // Use href to simplify the process of restoring and routing
                    // route parameters and query parameters
                    // When we return from a 401 back to a route that has query params
                    // e.g. the Diagnostic Report screen, we want those query params
                    // to be included
                    window.location.href = lastLocation;
                }
                else {
                    yield this.router.navigate(['']);
                }
            }
            else {
                // there is only one login for this app, just pick it
                this.selectAzureInstance(this.azureInstanceAD);
            }
        });
    }
    ngOnInit() {
        return __awaiter(this, void 0, void 0, function* () {
            console.debug('LOGIN onInit');
            yield this.handleLoginRouting();
        });
    }
    selectAzureInstance(instance) {
        console.debug('Selecting Azure instance: ' + instance);
        // Whilst this is redundant (because we will only ever pass in `this.azureInstanceAD`)
        // We want to keep the structure of the ADAL initialisation the same as the base PoC
        // from when there were multiple ADs
        if (instance === this.azureInstanceAD) {
            this.aadService.initialiseAdalServiceWithConfig(AadService.AZURE_AD_INSTANCE);
        }
        // Log the user into the selected Azure instance
        // When Azure responds, it will have the tenantConfig of 0 which will
        // then route the user to their last window location in the constructor above.
        this.aadService.loginToAzure();
    }
}
AzureLoginComponent.ɵfac = function AzureLoginComponent_Factory(t) { return new (t || AzureLoginComponent)(i0.ɵɵdirectiveInject(i1.AadService), i0.ɵɵdirectiveInject(i2.Router), i0.ɵɵdirectiveInject(i2.ActivatedRoute), i0.ɵɵdirectiveInject(i3.StorageService)); };
AzureLoginComponent.ɵcmp = i0.ɵɵdefineComponent({ type: AzureLoginComponent, selectors: [["lib-azure-login"]], decls: 3, vars: 1, consts: [[1, "mat-elevation-z2", "form-container"], ["color", "accent", "mat-raised-button", "", 1, "big", 3, "click"]], template: function AzureLoginComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "section", 0);
        i0.ɵɵelementStart(1, "button", 1);
        i0.ɵɵlistener("click", function AzureLoginComponent_Template_button_click_1_listener() { return ctx.selectAzureInstance(ctx.azureInstanceAD); });
        i0.ɵɵtext(2);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate1(" ", ctx.azureInstanceAD, " ");
    } }, directives: [i4.MatButton], styles: [".big[_ngcontent-%COMP%]{font-size:20px;margin:50px}", ".form-container[_ngcontent-%COMP%]{background-color:#fff;font-weight:700;margin-bottom:12px;margin-left:5px;margin-top:12px;padding:15px}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(AzureLoginComponent, [{
        type: Component,
        args: [{
                selector: 'lib-azure-login',
                templateUrl: './azure-login.component.html',
                styleUrls: ['./azure-login.component.css', '../../main.css']
            }]
    }], function () { return [{ type: i1.AadService }, { type: i2.Router }, { type: i2.ActivatedRoute }, { type: i3.StorageService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXp1cmUtbG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L1Byb2plY3RzL25zd2hwYXV0aC1tb2R1bGUvcHJvamVjdHMvbnN3aHBhdXRoL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2F6dXJlLWxvZ2luL2F6dXJlLWxvZ2luLmNvbXBvbmVudC50cyIsImxpYi9jb21wb25lbnRzL2F6dXJlLWxvZ2luL2F6dXJlLWxvZ2luLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBR2xELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7Ozs7O0FBUXhELE1BQU0sT0FBTyxtQkFBbUI7SUFJOUIsWUFDVSxVQUFzQixFQUN0QixNQUFjLEVBQ2QsY0FBOEIsRUFDOUIsT0FBdUI7UUFIdkIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLFlBQU8sR0FBUCxPQUFPLENBQWdCO1FBTmpCLG9CQUFlLEdBQUcscUJBQXFCLENBQUM7SUFPcEQsQ0FBQztJQUVTLGtCQUFrQjs7WUFDOUIsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGNBQStCLENBQUM7WUFFeEYsa0ZBQWtGO1lBQ2xGLElBQUksV0FBVyxFQUFFO2dCQUNmLElBQUksQ0FBQyxVQUFVLENBQUMsK0JBQStCLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQzdELElBQUksQ0FBQyxVQUFVLENBQUMsa0NBQWtDLEVBQUUsQ0FBQztnQkFFckQsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO2dCQUN6RCxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLENBQUM7Z0JBRWpDLElBQUksWUFBWSxFQUFFO29CQUNoQiw0REFBNEQ7b0JBQzVELHdDQUF3QztvQkFDeEMsa0VBQWtFO29CQUNsRSxnRUFBZ0U7b0JBQ2hFLGlCQUFpQjtvQkFDakIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDO2lCQUNyQztxQkFBTTtvQkFDTCxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDbEM7YUFDRjtpQkFBTTtnQkFDTCxxREFBcUQ7Z0JBQ3JELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7YUFDaEQ7UUFDSCxDQUFDO0tBQUE7SUFFSyxRQUFROztZQUNaLE9BQU8sQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDOUIsTUFBTSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUNsQyxDQUFDO0tBQUE7SUFFTSxtQkFBbUIsQ0FBQyxRQUFnQjtRQUN6QyxPQUFPLENBQUMsS0FBSyxDQUFDLDRCQUE0QixHQUFHLFFBQVEsQ0FBQyxDQUFDO1FBRXZELHNGQUFzRjtRQUN0RixvRkFBb0Y7UUFDcEYsb0NBQW9DO1FBQ3BDLElBQUksUUFBUSxLQUFLLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDckMsSUFBSSxDQUFDLFVBQVUsQ0FBQywrQkFBK0IsQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQztTQUMvRTtRQUVELGdEQUFnRDtRQUNoRCxxRUFBcUU7UUFDckUsOEVBQThFO1FBQzlFLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDakMsQ0FBQzs7c0ZBekRVLG1CQUFtQjt3REFBbkIsbUJBQW1CO1FDWGhDLGtDQUNFO1FBQUEsaUNBQ0U7UUFEbUQsZ0dBQVMsNENBQW9DLElBQUM7UUFDakcsWUFDRjtRQUFBLGlCQUFTO1FBQ1gsaUJBQVU7O1FBRk4sZUFDRjtRQURFLG9EQUNGOztrRERRVyxtQkFBbUI7Y0FML0IsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLFdBQVcsRUFBRSw4QkFBOEI7Z0JBQzNDLFNBQVMsRUFBRSxDQUFDLDZCQUE2QixFQUFFLGdCQUFnQixDQUFDO2FBQzdEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcblxyXG5pbXBvcnQgeyBBYWRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYWFkLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTdG9yYWdlU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3N0b3JhZ2Uuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2xpYi1henVyZS1sb2dpbicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2F6dXJlLWxvZ2luLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9henVyZS1sb2dpbi5jb21wb25lbnQuY3NzJywgJy4uLy4uL21haW4uY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIEF6dXJlTG9naW5Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICBwdWJsaWMgcmVhZG9ubHkgYXp1cmVJbnN0YW5jZUFEID0gJ05TVyBIZWFsdGggRW1wbG95ZWUnO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgYWFkU2VydmljZTogQWFkU2VydmljZSxcclxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXHJcbiAgICBwcml2YXRlIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgIHByaXZhdGUgc3RvcmFnZTogU3RvcmFnZVNlcnZpY2VcclxuICApIHsgfVxyXG5cclxuICBwcml2YXRlIGFzeW5jIGhhbmRsZUxvZ2luUm91dGluZygpIHtcclxuICAgIGNvbnN0IHJvdXRlUGFyYW1zID0gdGhpcy5hY3RpdmF0ZWRSb3V0ZS5zbmFwc2hvdC5wYXJhbXMudGVuYW50Q29uZmlnSWQgYXMgbnVtYmVyIHwgbnVsbDtcclxuXHJcbiAgICAvLyBJZiB3ZSdyZSByZXR1cm5pbmcgZnJvbSBhIGxvZ2luLCBpbml0aWFsaXNlIEFEQUwgd2l0aCB0aGUgc3VwcGxpZWQgY29uZmlnIGluZGV4XHJcbiAgICBpZiAocm91dGVQYXJhbXMpIHtcclxuICAgICAgdGhpcy5hYWRTZXJ2aWNlLmluaXRpYWxpc2VBZGFsU2VydmljZVdpdGhDb25maWcocm91dGVQYXJhbXMpO1xyXG4gICAgICB0aGlzLmFhZFNlcnZpY2UuaGFuZGxlV2luZG93Q2FsbGJhY2tGcm9tQXp1cmVMb2dpbigpO1xyXG5cclxuICAgICAgY29uc3QgbGFzdExvY2F0aW9uID0gdGhpcy5zdG9yYWdlLnJldHJpZXZlTGFzdExvY2F0aW9uKCk7XHJcbiAgICAgIHRoaXMuc3RvcmFnZS5jbGVhckxhc3RMb2NhdGlvbigpO1xyXG5cclxuICAgICAgaWYgKGxhc3RMb2NhdGlvbikge1xyXG4gICAgICAgIC8vIFVzZSBocmVmIHRvIHNpbXBsaWZ5IHRoZSBwcm9jZXNzIG9mIHJlc3RvcmluZyBhbmQgcm91dGluZ1xyXG4gICAgICAgIC8vIHJvdXRlIHBhcmFtZXRlcnMgYW5kIHF1ZXJ5IHBhcmFtZXRlcnNcclxuICAgICAgICAvLyBXaGVuIHdlIHJldHVybiBmcm9tIGEgNDAxIGJhY2sgdG8gYSByb3V0ZSB0aGF0IGhhcyBxdWVyeSBwYXJhbXNcclxuICAgICAgICAvLyBlLmcuIHRoZSBEaWFnbm9zdGljIFJlcG9ydCBzY3JlZW4sIHdlIHdhbnQgdGhvc2UgcXVlcnkgcGFyYW1zXHJcbiAgICAgICAgLy8gdG8gYmUgaW5jbHVkZWRcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGxhc3RMb2NhdGlvbjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhd2FpdCB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJyddKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gdGhlcmUgaXMgb25seSBvbmUgbG9naW4gZm9yIHRoaXMgYXBwLCBqdXN0IHBpY2sgaXRcclxuICAgICAgdGhpcy5zZWxlY3RBenVyZUluc3RhbmNlKHRoaXMuYXp1cmVJbnN0YW5jZUFEKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIG5nT25Jbml0KCkge1xyXG4gICAgY29uc29sZS5kZWJ1ZygnTE9HSU4gb25Jbml0Jyk7XHJcbiAgICBhd2FpdCB0aGlzLmhhbmRsZUxvZ2luUm91dGluZygpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNlbGVjdEF6dXJlSW5zdGFuY2UoaW5zdGFuY2U6IHN0cmluZykge1xyXG4gICAgY29uc29sZS5kZWJ1ZygnU2VsZWN0aW5nIEF6dXJlIGluc3RhbmNlOiAnICsgaW5zdGFuY2UpO1xyXG5cclxuICAgIC8vIFdoaWxzdCB0aGlzIGlzIHJlZHVuZGFudCAoYmVjYXVzZSB3ZSB3aWxsIG9ubHkgZXZlciBwYXNzIGluIGB0aGlzLmF6dXJlSW5zdGFuY2VBRGApXHJcbiAgICAvLyBXZSB3YW50IHRvIGtlZXAgdGhlIHN0cnVjdHVyZSBvZiB0aGUgQURBTCBpbml0aWFsaXNhdGlvbiB0aGUgc2FtZSBhcyB0aGUgYmFzZSBQb0NcclxuICAgIC8vIGZyb20gd2hlbiB0aGVyZSB3ZXJlIG11bHRpcGxlIEFEc1xyXG4gICAgaWYgKGluc3RhbmNlID09PSB0aGlzLmF6dXJlSW5zdGFuY2VBRCkge1xyXG4gICAgICB0aGlzLmFhZFNlcnZpY2UuaW5pdGlhbGlzZUFkYWxTZXJ2aWNlV2l0aENvbmZpZyhBYWRTZXJ2aWNlLkFaVVJFX0FEX0lOU1RBTkNFKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBMb2cgdGhlIHVzZXIgaW50byB0aGUgc2VsZWN0ZWQgQXp1cmUgaW5zdGFuY2VcclxuICAgIC8vIFdoZW4gQXp1cmUgcmVzcG9uZHMsIGl0IHdpbGwgaGF2ZSB0aGUgdGVuYW50Q29uZmlnIG9mIDAgd2hpY2ggd2lsbFxyXG4gICAgLy8gdGhlbiByb3V0ZSB0aGUgdXNlciB0byB0aGVpciBsYXN0IHdpbmRvdyBsb2NhdGlvbiBpbiB0aGUgY29uc3RydWN0b3IgYWJvdmUuXHJcbiAgICB0aGlzLmFhZFNlcnZpY2UubG9naW5Ub0F6dXJlKCk7XHJcbiAgfVxyXG59XHJcbiIsIjxzZWN0aW9uIGNsYXNzPVwibWF0LWVsZXZhdGlvbi16MiBmb3JtLWNvbnRhaW5lclwiPlxyXG4gIDxidXR0b24gY29sb3I9XCJhY2NlbnRcIiBtYXQtcmFpc2VkLWJ1dHRvbiBjbGFzcz1cImJpZ1wiIChjbGljayk9XCJzZWxlY3RBenVyZUluc3RhbmNlKGF6dXJlSW5zdGFuY2VBRClcIj5cclxuICAgIHt7YXp1cmVJbnN0YW5jZUFEfX1cclxuICA8L2J1dHRvbj5cclxuPC9zZWN0aW9uPlxyXG4iXX0=
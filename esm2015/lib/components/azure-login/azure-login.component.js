import { __awaiter } from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AadService } from '../../services/aad.service';
import { StorageService } from '../../services/storage.service';
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
AzureLoginComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-azure-login',
                template: "<section class=\"mat-elevation-z2 form-container\">\r\n  <button color=\"accent\" mat-raised-button class=\"big\" (click)=\"selectAzureInstance(azureInstanceAD)\">\r\n    {{azureInstanceAD}}\r\n  </button>\r\n</section>\r\n",
                styles: [".big{font-size:20px;margin:50px}", ".form-container{background-color:#fff;font-weight:700;margin-bottom:12px;margin-left:5px;margin-top:12px;padding:15px}"]
            },] }
];
AzureLoginComponent.ctorParameters = () => [
    { type: AadService },
    { type: Router },
    { type: ActivatedRoute },
    { type: StorageService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXp1cmUtbG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L1Byb2plY3RzL25zd2hwYXV0aC1tb2R1bGUvcHJvamVjdHMvbnN3aHBhdXRoL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2F6dXJlLWxvZ2luL2F6dXJlLWxvZ2luLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXpELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFPaEUsTUFBTSxPQUFPLG1CQUFtQjtJQUk5QixZQUNVLFVBQXNCLEVBQ3RCLE1BQWMsRUFDZCxjQUE4QixFQUM5QixPQUF1QjtRQUh2QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsWUFBTyxHQUFQLE9BQU8sQ0FBZ0I7UUFOakIsb0JBQWUsR0FBRyxxQkFBcUIsQ0FBQztJQU9wRCxDQUFDO0lBRVMsa0JBQWtCOztZQUM5QixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsY0FBK0IsQ0FBQztZQUV4RixrRkFBa0Y7WUFDbEYsSUFBSSxXQUFXLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLFVBQVUsQ0FBQywrQkFBK0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDN0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxrQ0FBa0MsRUFBRSxDQUFDO2dCQUVyRCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLG9CQUFvQixFQUFFLENBQUM7Z0JBQ3pELElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztnQkFFakMsSUFBSSxZQUFZLEVBQUU7b0JBQ2hCLDREQUE0RDtvQkFDNUQsd0NBQXdDO29CQUN4QyxrRUFBa0U7b0JBQ2xFLGdFQUFnRTtvQkFDaEUsaUJBQWlCO29CQUNqQixNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxZQUFZLENBQUM7aUJBQ3JDO3FCQUFNO29CQUNMLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2lCQUNsQzthQUNGO2lCQUFNO2dCQUNMLHFEQUFxRDtnQkFDckQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQzthQUNoRDtRQUNILENBQUM7S0FBQTtJQUVLLFFBQVE7O1lBQ1osT0FBTyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUM5QixNQUFNLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQ2xDLENBQUM7S0FBQTtJQUVNLG1CQUFtQixDQUFDLFFBQWdCO1FBQ3pDLE9BQU8sQ0FBQyxLQUFLLENBQUMsNEJBQTRCLEdBQUcsUUFBUSxDQUFDLENBQUM7UUFFdkQsc0ZBQXNGO1FBQ3RGLG9GQUFvRjtRQUNwRixvQ0FBb0M7UUFDcEMsSUFBSSxRQUFRLEtBQUssSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUNyQyxJQUFJLENBQUMsVUFBVSxDQUFDLCtCQUErQixDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1NBQy9FO1FBRUQsZ0RBQWdEO1FBQ2hELHFFQUFxRTtRQUNyRSw4RUFBOEU7UUFDOUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNqQyxDQUFDOzs7WUE5REYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLDJPQUEyQzs7YUFFNUM7OztZQVBRLFVBQVU7WUFGTSxNQUFNO1lBQXRCLGNBQWM7WUFHZCxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcblxyXG5pbXBvcnQgeyBBYWRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYWFkLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTdG9yYWdlU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3N0b3JhZ2Uuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2xpYi1henVyZS1sb2dpbicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2F6dXJlLWxvZ2luLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9henVyZS1sb2dpbi5jb21wb25lbnQuY3NzJywgJy4uLy4uL21haW4uY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIEF6dXJlTG9naW5Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICBwdWJsaWMgcmVhZG9ubHkgYXp1cmVJbnN0YW5jZUFEID0gJ05TVyBIZWFsdGggRW1wbG95ZWUnO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgYWFkU2VydmljZTogQWFkU2VydmljZSxcclxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXHJcbiAgICBwcml2YXRlIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgIHByaXZhdGUgc3RvcmFnZTogU3RvcmFnZVNlcnZpY2VcclxuICApIHsgfVxyXG5cclxuICBwcml2YXRlIGFzeW5jIGhhbmRsZUxvZ2luUm91dGluZygpIHtcclxuICAgIGNvbnN0IHJvdXRlUGFyYW1zID0gdGhpcy5hY3RpdmF0ZWRSb3V0ZS5zbmFwc2hvdC5wYXJhbXMudGVuYW50Q29uZmlnSWQgYXMgbnVtYmVyIHwgbnVsbDtcclxuXHJcbiAgICAvLyBJZiB3ZSdyZSByZXR1cm5pbmcgZnJvbSBhIGxvZ2luLCBpbml0aWFsaXNlIEFEQUwgd2l0aCB0aGUgc3VwcGxpZWQgY29uZmlnIGluZGV4XHJcbiAgICBpZiAocm91dGVQYXJhbXMpIHtcclxuICAgICAgdGhpcy5hYWRTZXJ2aWNlLmluaXRpYWxpc2VBZGFsU2VydmljZVdpdGhDb25maWcocm91dGVQYXJhbXMpO1xyXG4gICAgICB0aGlzLmFhZFNlcnZpY2UuaGFuZGxlV2luZG93Q2FsbGJhY2tGcm9tQXp1cmVMb2dpbigpO1xyXG5cclxuICAgICAgY29uc3QgbGFzdExvY2F0aW9uID0gdGhpcy5zdG9yYWdlLnJldHJpZXZlTGFzdExvY2F0aW9uKCk7XHJcbiAgICAgIHRoaXMuc3RvcmFnZS5jbGVhckxhc3RMb2NhdGlvbigpO1xyXG5cclxuICAgICAgaWYgKGxhc3RMb2NhdGlvbikge1xyXG4gICAgICAgIC8vIFVzZSBocmVmIHRvIHNpbXBsaWZ5IHRoZSBwcm9jZXNzIG9mIHJlc3RvcmluZyBhbmQgcm91dGluZ1xyXG4gICAgICAgIC8vIHJvdXRlIHBhcmFtZXRlcnMgYW5kIHF1ZXJ5IHBhcmFtZXRlcnNcclxuICAgICAgICAvLyBXaGVuIHdlIHJldHVybiBmcm9tIGEgNDAxIGJhY2sgdG8gYSByb3V0ZSB0aGF0IGhhcyBxdWVyeSBwYXJhbXNcclxuICAgICAgICAvLyBlLmcuIHRoZSBEaWFnbm9zdGljIFJlcG9ydCBzY3JlZW4sIHdlIHdhbnQgdGhvc2UgcXVlcnkgcGFyYW1zXHJcbiAgICAgICAgLy8gdG8gYmUgaW5jbHVkZWRcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGxhc3RMb2NhdGlvbjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhd2FpdCB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJyddKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gdGhlcmUgaXMgb25seSBvbmUgbG9naW4gZm9yIHRoaXMgYXBwLCBqdXN0IHBpY2sgaXRcclxuICAgICAgdGhpcy5zZWxlY3RBenVyZUluc3RhbmNlKHRoaXMuYXp1cmVJbnN0YW5jZUFEKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIG5nT25Jbml0KCkge1xyXG4gICAgY29uc29sZS5kZWJ1ZygnTE9HSU4gb25Jbml0Jyk7XHJcbiAgICBhd2FpdCB0aGlzLmhhbmRsZUxvZ2luUm91dGluZygpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNlbGVjdEF6dXJlSW5zdGFuY2UoaW5zdGFuY2U6IHN0cmluZykge1xyXG4gICAgY29uc29sZS5kZWJ1ZygnU2VsZWN0aW5nIEF6dXJlIGluc3RhbmNlOiAnICsgaW5zdGFuY2UpO1xyXG5cclxuICAgIC8vIFdoaWxzdCB0aGlzIGlzIHJlZHVuZGFudCAoYmVjYXVzZSB3ZSB3aWxsIG9ubHkgZXZlciBwYXNzIGluIGB0aGlzLmF6dXJlSW5zdGFuY2VBRGApXHJcbiAgICAvLyBXZSB3YW50IHRvIGtlZXAgdGhlIHN0cnVjdHVyZSBvZiB0aGUgQURBTCBpbml0aWFsaXNhdGlvbiB0aGUgc2FtZSBhcyB0aGUgYmFzZSBQb0NcclxuICAgIC8vIGZyb20gd2hlbiB0aGVyZSB3ZXJlIG11bHRpcGxlIEFEc1xyXG4gICAgaWYgKGluc3RhbmNlID09PSB0aGlzLmF6dXJlSW5zdGFuY2VBRCkge1xyXG4gICAgICB0aGlzLmFhZFNlcnZpY2UuaW5pdGlhbGlzZUFkYWxTZXJ2aWNlV2l0aENvbmZpZyhBYWRTZXJ2aWNlLkFaVVJFX0FEX0lOU1RBTkNFKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBMb2cgdGhlIHVzZXIgaW50byB0aGUgc2VsZWN0ZWQgQXp1cmUgaW5zdGFuY2VcclxuICAgIC8vIFdoZW4gQXp1cmUgcmVzcG9uZHMsIGl0IHdpbGwgaGF2ZSB0aGUgdGVuYW50Q29uZmlnIG9mIDAgd2hpY2ggd2lsbFxyXG4gICAgLy8gdGhlbiByb3V0ZSB0aGUgdXNlciB0byB0aGVpciBsYXN0IHdpbmRvdyBsb2NhdGlvbiBpbiB0aGUgY29uc3RydWN0b3IgYWJvdmUuXHJcbiAgICB0aGlzLmFhZFNlcnZpY2UubG9naW5Ub0F6dXJlKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
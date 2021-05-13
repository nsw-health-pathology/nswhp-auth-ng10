import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AzureLoginComponent } from './components/azure-login/azure-login.component';
import { AzureLogoutComponent } from './components/azure-logout/azure-logout.component';
import { ContactAdminComponent } from './components/contact-admin/contact-admin.component';
import { OtpComponent } from './components/otp/otp.component';
import { PushComponent } from './components/push/push.component';
import { RegisterComponent } from './components/register/register.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
const routes = [
    { path: 'authentication/otp', component: OtpComponent },
    { path: 'authentication/login', component: AzureLoginComponent },
    { path: 'authentication/login/:tenantConfigId', component: AzureLoginComponent },
    { path: 'authentication/logout', component: AzureLogoutComponent },
    { path: 'authentication/register', component: RegisterComponent },
    { path: 'authentication/push', component: PushComponent },
    { path: 'authentication/contact-admin', component: ContactAdminComponent }
];
export class NswhpAuthRoutingModule {
}
NswhpAuthRoutingModule.ɵmod = i0.ɵɵdefineNgModule({ type: NswhpAuthRoutingModule });
NswhpAuthRoutingModule.ɵinj = i0.ɵɵdefineInjector({ factory: function NswhpAuthRoutingModule_Factory(t) { return new (t || NswhpAuthRoutingModule)(); }, imports: [[RouterModule.forRoot(routes)], RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NswhpAuthRoutingModule, { imports: [i1.RouterModule], exports: [RouterModule] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NswhpAuthRoutingModule, [{
        type: NgModule,
        args: [{
                imports: [RouterModule.forRoot(routes)],
                exports: [RouterModule]
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnN3aHBhdXRoLnJvdXRpbmcubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IkM6L1Byb2plY3RzL25zd2hwYXV0aC1tb2R1bGUvcHJvamVjdHMvbnN3aHBhdXRoL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9uc3docGF1dGgucm91dGluZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQVUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDckYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDeEYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFDM0YsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzlELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNqRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQzs7O0FBRTdFLE1BQU0sTUFBTSxHQUFXO0lBQ3JCLEVBQUUsSUFBSSxFQUFFLG9CQUFvQixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUU7SUFDdkQsRUFBRSxJQUFJLEVBQUUsc0JBQXNCLEVBQUUsU0FBUyxFQUFFLG1CQUFtQixFQUFFO0lBQ2hFLEVBQUUsSUFBSSxFQUFFLHNDQUFzQyxFQUFFLFNBQVMsRUFBRSxtQkFBbUIsRUFBRTtJQUNoRixFQUFFLElBQUksRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsb0JBQW9CLEVBQUU7SUFDbEUsRUFBRSxJQUFJLEVBQUUseUJBQXlCLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFFO0lBQ2pFLEVBQUUsSUFBSSxFQUFFLHFCQUFxQixFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUU7SUFDekQsRUFBRSxJQUFJLEVBQUUsOEJBQThCLEVBQUUsU0FBUyxFQUFFLHFCQUFxQixFQUFFO0NBQzNFLENBQUM7QUFNRixNQUFNLE9BQU8sc0JBQXNCOzswREFBdEIsc0JBQXNCOzJIQUF0QixzQkFBc0Isa0JBSHhCLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUM3QixZQUFZO3dGQUVYLHNCQUFzQiwwQ0FGdkIsWUFBWTtrREFFWCxzQkFBc0I7Y0FKbEMsUUFBUTtlQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3ZDLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQzthQUN4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlcywgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQXp1cmVMb2dpbkNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9henVyZS1sb2dpbi9henVyZS1sb2dpbi5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBBenVyZUxvZ291dENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9henVyZS1sb2dvdXQvYXp1cmUtbG9nb3V0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENvbnRhY3RBZG1pbkNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jb250YWN0LWFkbWluL2NvbnRhY3QtYWRtaW4uY29tcG9uZW50JztcclxuaW1wb3J0IHsgT3RwQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL290cC9vdHAuY29tcG9uZW50JztcclxuaW1wb3J0IHsgUHVzaENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9wdXNoL3B1c2guY29tcG9uZW50JztcclxuaW1wb3J0IHsgUmVnaXN0ZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvcmVnaXN0ZXIvcmVnaXN0ZXIuY29tcG9uZW50JztcclxuXHJcbmNvbnN0IHJvdXRlczogUm91dGVzID0gW1xyXG4gIHsgcGF0aDogJ2F1dGhlbnRpY2F0aW9uL290cCcsIGNvbXBvbmVudDogT3RwQ29tcG9uZW50IH0sXHJcbiAgeyBwYXRoOiAnYXV0aGVudGljYXRpb24vbG9naW4nLCBjb21wb25lbnQ6IEF6dXJlTG9naW5Db21wb25lbnQgfSxcclxuICB7IHBhdGg6ICdhdXRoZW50aWNhdGlvbi9sb2dpbi86dGVuYW50Q29uZmlnSWQnLCBjb21wb25lbnQ6IEF6dXJlTG9naW5Db21wb25lbnQgfSxcclxuICB7IHBhdGg6ICdhdXRoZW50aWNhdGlvbi9sb2dvdXQnLCBjb21wb25lbnQ6IEF6dXJlTG9nb3V0Q29tcG9uZW50IH0sXHJcbiAgeyBwYXRoOiAnYXV0aGVudGljYXRpb24vcmVnaXN0ZXInLCBjb21wb25lbnQ6IFJlZ2lzdGVyQ29tcG9uZW50IH0sXHJcbiAgeyBwYXRoOiAnYXV0aGVudGljYXRpb24vcHVzaCcsIGNvbXBvbmVudDogUHVzaENvbXBvbmVudCB9LFxyXG4gIHsgcGF0aDogJ2F1dGhlbnRpY2F0aW9uL2NvbnRhY3QtYWRtaW4nLCBjb21wb25lbnQ6IENvbnRhY3RBZG1pbkNvbXBvbmVudCB9XHJcbl07XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtSb3V0ZXJNb2R1bGUuZm9yUm9vdChyb3V0ZXMpXSxcclxuICBleHBvcnRzOiBbUm91dGVyTW9kdWxlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTnN3aHBBdXRoUm91dGluZ01vZHVsZSB7IH1cclxuIl19
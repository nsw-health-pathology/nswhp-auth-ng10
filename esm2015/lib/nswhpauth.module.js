import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NswhpAuthMaterialModule } from './authentication-material/nswhpauth-material.module';
import { AzureLoginComponent } from './components/azure-login/azure-login.component';
import { AzureLogoutComponent } from './components/azure-logout/azure-logout.component';
import { ContactAdminComponent } from './components/contact-admin/contact-admin.component';
import { OtpComponent } from './components/otp/otp.component';
import { PushComponent } from './components/push/push.component';
import { RegisterComponent } from './components/register/register.component';
import { AadService } from './services/aad.service';
import { AuthenticationInterceptorService } from './services/AuthenticationInterceptor.service';
import { IaDfpService } from './services/iadfp.service';
import { StorageService } from './services/storage.service';
import { VipService } from './services/vip.service';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { TickComponent } from './components/tick/tick.component';
import { NSWHP_AUTH_CONFIG } from './nswhpauth-config';
import { AdalService } from 'adal-angular4';
export class NswhpAuthModule {
    static forRoot(config) {
        return {
            ngModule: NswhpAuthModule,
            providers: [
                { provide: NSWHP_AUTH_CONFIG, useValue: config },
            ]
        };
    }
}
NswhpAuthModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    AzureLoginComponent,
                    AzureLogoutComponent,
                    OtpComponent,
                    PushComponent,
                    RegisterComponent,
                    SpinnerComponent,
                    TickComponent,
                    ContactAdminComponent,
                ],
                exports: [
                    AzureLoginComponent,
                    AzureLogoutComponent,
                    OtpComponent,
                    PushComponent,
                    RegisterComponent,
                    SpinnerComponent,
                    TickComponent,
                    ContactAdminComponent,
                ],
                imports: [
                    CommonModule,
                    NswhpAuthMaterialModule,
                ],
                providers: [
                    StorageService,
                    IaDfpService,
                    NswhpAuthMaterialModule,
                    {
                        provide: HTTP_INTERCEPTORS,
                        useClass: AuthenticationInterceptorService,
                        multi: true
                    },
                    AadService,
                    VipService,
                    AdalService
                ],
                entryComponents: [
                    AzureLoginComponent,
                    AzureLogoutComponent,
                    OtpComponent,
                    PushComponent,
                    RegisterComponent,
                    SpinnerComponent,
                    TickComponent,
                    ContactAdminComponent,
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnN3aHBhdXRoLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJDOi9Qcm9qZWN0cy9uc3docGF1dGgtbW9kdWxlL3Byb2plY3RzL25zd2hwYXV0aC9zcmMvIiwic291cmNlcyI6WyJsaWIvbnN3aHBhdXRoLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDekQsT0FBTyxFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0scURBQXFELENBQUM7QUFDOUYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDckYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDeEYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFDM0YsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzlELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNqRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDcEQsT0FBTyxFQUFFLGdDQUFnQyxFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDaEcsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDcEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDMUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ2pFLE9BQU8sRUFBNEIsaUJBQWlCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNqRixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBcUQ1QyxNQUFNLE9BQU8sZUFBZTtJQUMxQixNQUFNLENBQUMsT0FBTyxDQUFDLE1BQWdDO1FBQzdDLE9BQU87WUFDTCxRQUFRLEVBQUUsZUFBZTtZQUN6QixTQUFTLEVBQUU7Z0JBQ1QsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRTthQUNqRDtTQUNGLENBQUM7SUFDSixDQUFDOzs7WUF6REYsUUFBUSxTQUFDO2dCQUNSLFlBQVksRUFBRTtvQkFDWixtQkFBbUI7b0JBQ25CLG9CQUFvQjtvQkFDcEIsWUFBWTtvQkFDWixhQUFhO29CQUNiLGlCQUFpQjtvQkFDakIsZ0JBQWdCO29CQUNoQixhQUFhO29CQUNiLHFCQUFxQjtpQkFDdEI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLG1CQUFtQjtvQkFDbkIsb0JBQW9CO29CQUNwQixZQUFZO29CQUNaLGFBQWE7b0JBQ2IsaUJBQWlCO29CQUNqQixnQkFBZ0I7b0JBQ2hCLGFBQWE7b0JBQ2IscUJBQXFCO2lCQUN0QjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsWUFBWTtvQkFDWix1QkFBdUI7aUJBQ3hCO2dCQUNELFNBQVMsRUFBRTtvQkFDVCxjQUFjO29CQUNkLFlBQVk7b0JBQ1osdUJBQXVCO29CQUN2Qjt3QkFDRSxPQUFPLEVBQUUsaUJBQWlCO3dCQUMxQixRQUFRLEVBQUUsZ0NBQWdDO3dCQUMxQyxLQUFLLEVBQUUsSUFBSTtxQkFDWjtvQkFDRCxVQUFVO29CQUNWLFVBQVU7b0JBQ1YsV0FBVztpQkFDWjtnQkFDRCxlQUFlLEVBQUU7b0JBQ2YsbUJBQW1CO29CQUNuQixvQkFBb0I7b0JBQ3BCLFlBQVk7b0JBQ1osYUFBYTtvQkFDYixpQkFBaUI7b0JBQ2pCLGdCQUFnQjtvQkFDaEIsYUFBYTtvQkFDYixxQkFBcUI7aUJBQ3RCO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSFRUUF9JTlRFUkNFUFRPUlMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTnN3aHBBdXRoTWF0ZXJpYWxNb2R1bGUgfSBmcm9tICcuL2F1dGhlbnRpY2F0aW9uLW1hdGVyaWFsL25zd2hwYXV0aC1tYXRlcmlhbC5tb2R1bGUnO1xuaW1wb3J0IHsgQXp1cmVMb2dpbkNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9henVyZS1sb2dpbi9henVyZS1sb2dpbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgQXp1cmVMb2dvdXRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvYXp1cmUtbG9nb3V0L2F6dXJlLWxvZ291dC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29udGFjdEFkbWluQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2NvbnRhY3QtYWRtaW4vY29udGFjdC1hZG1pbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3RwQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL290cC9vdHAuY29tcG9uZW50JztcbmltcG9ydCB7IFB1c2hDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvcHVzaC9wdXNoLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSZWdpc3RlckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9yZWdpc3Rlci9yZWdpc3Rlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgQWFkU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvYWFkLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXV0aGVudGljYXRpb25JbnRlcmNlcHRvclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL0F1dGhlbnRpY2F0aW9uSW50ZXJjZXB0b3Iuc2VydmljZSc7XG5pbXBvcnQgeyBJYURmcFNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2lhZGZwLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3N0b3JhZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBWaXBTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy92aXAuc2VydmljZSc7XG5pbXBvcnQgeyBTcGlubmVyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3NwaW5uZXIvc3Bpbm5lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGlja0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy90aWNrL3RpY2suY29tcG9uZW50JztcbmltcG9ydCB7IElOc3docEF1dGhTZXJ2aWNlT3B0aW9ucywgTlNXSFBfQVVUSF9DT05GSUcgfSBmcm9tICcuL25zd2hwYXV0aC1jb25maWcnO1xuaW1wb3J0IHsgQWRhbFNlcnZpY2UgfSBmcm9tICdhZGFsLWFuZ3VsYXI0JztcblxuXG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEF6dXJlTG9naW5Db21wb25lbnQsXG4gICAgQXp1cmVMb2dvdXRDb21wb25lbnQsXG4gICAgT3RwQ29tcG9uZW50LFxuICAgIFB1c2hDb21wb25lbnQsXG4gICAgUmVnaXN0ZXJDb21wb25lbnQsXG4gICAgU3Bpbm5lckNvbXBvbmVudCxcbiAgICBUaWNrQ29tcG9uZW50LFxuICAgIENvbnRhY3RBZG1pbkNvbXBvbmVudCxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIEF6dXJlTG9naW5Db21wb25lbnQsXG4gICAgQXp1cmVMb2dvdXRDb21wb25lbnQsXG4gICAgT3RwQ29tcG9uZW50LFxuICAgIFB1c2hDb21wb25lbnQsXG4gICAgUmVnaXN0ZXJDb21wb25lbnQsXG4gICAgU3Bpbm5lckNvbXBvbmVudCxcbiAgICBUaWNrQ29tcG9uZW50LFxuICAgIENvbnRhY3RBZG1pbkNvbXBvbmVudCxcbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBOc3docEF1dGhNYXRlcmlhbE1vZHVsZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgU3RvcmFnZVNlcnZpY2UsXG4gICAgSWFEZnBTZXJ2aWNlLFxuICAgIE5zd2hwQXV0aE1hdGVyaWFsTW9kdWxlLFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IEhUVFBfSU5URVJDRVBUT1JTLFxuICAgICAgdXNlQ2xhc3M6IEF1dGhlbnRpY2F0aW9uSW50ZXJjZXB0b3JTZXJ2aWNlLFxuICAgICAgbXVsdGk6IHRydWVcbiAgICB9LFxuICAgIEFhZFNlcnZpY2UsXG4gICAgVmlwU2VydmljZSxcbiAgICBBZGFsU2VydmljZVxuICBdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICBBenVyZUxvZ2luQ29tcG9uZW50LFxuICAgIEF6dXJlTG9nb3V0Q29tcG9uZW50LFxuICAgIE90cENvbXBvbmVudCxcbiAgICBQdXNoQ29tcG9uZW50LFxuICAgIFJlZ2lzdGVyQ29tcG9uZW50LFxuICAgIFNwaW5uZXJDb21wb25lbnQsXG4gICAgVGlja0NvbXBvbmVudCxcbiAgICBDb250YWN0QWRtaW5Db21wb25lbnQsXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTnN3aHBBdXRoTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoY29uZmlnOiBJTnN3aHBBdXRoU2VydmljZU9wdGlvbnMpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPE5zd2hwQXV0aE1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTnN3aHBBdXRoTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHsgcHJvdmlkZTogTlNXSFBfQVVUSF9DT05GSUcsIHVzZVZhbHVlOiBjb25maWcgfSxcbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG4iXX0=
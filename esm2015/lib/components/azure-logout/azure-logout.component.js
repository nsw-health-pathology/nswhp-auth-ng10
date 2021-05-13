import { Component } from '@angular/core';
import { AadService } from '../../services/aad.service';
export class AzureLogoutComponent {
    constructor(aadService) {
        this.aadService = aadService;
    }
    ngOnInit() {
        this.aadService.logoutOfAzure();
    }
}
AzureLogoutComponent.decorators = [
    { type: Component, args: [{
                template: '',
                selector: 'lib-azure-logout'
            },] }
];
AzureLogoutComponent.ctorParameters = () => [
    { type: AadService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXp1cmUtbG9nb3V0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9Qcm9qZWN0cy9uc3docGF1dGgtbW9kdWxlL3Byb2plY3RzL25zd2hwYXV0aC9zcmMvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9henVyZS1sb2dvdXQvYXp1cmUtbG9nb3V0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQU14RCxNQUFNLE9BQU8sb0JBQW9CO0lBQy9CLFlBQW9CLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7SUFBSSxDQUFDO0lBRS9DLFFBQVE7UUFDTixJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ2xDLENBQUM7OztZQVRGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsRUFBRTtnQkFDWixRQUFRLEVBQUUsa0JBQWtCO2FBQzdCOzs7WUFMUSxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQWFkU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FhZC5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHRlbXBsYXRlOiAnJyxcclxuICBzZWxlY3RvcjogJ2xpYi1henVyZS1sb2dvdXQnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBenVyZUxvZ291dENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhYWRTZXJ2aWNlOiBBYWRTZXJ2aWNlKSB7IH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmFhZFNlcnZpY2UubG9nb3V0T2ZBenVyZSgpO1xyXG4gIH1cclxufVxyXG4iXX0=
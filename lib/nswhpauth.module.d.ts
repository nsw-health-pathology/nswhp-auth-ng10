import { ModuleWithProviders } from '@angular/core';
import { INswhpAuthServiceOptions } from './nswhpauth-config';
import * as i0 from "@angular/core";
import * as i1 from "./components/azure-login/azure-login.component";
import * as i2 from "./components/azure-logout/azure-logout.component";
import * as i3 from "./components/otp/otp.component";
import * as i4 from "./components/push/push.component";
import * as i5 from "./components/register/register.component";
import * as i6 from "./components/spinner/spinner.component";
import * as i7 from "./components/tick/tick.component";
import * as i8 from "./components/contact-admin/contact-admin.component";
import * as i9 from "@angular/common";
import * as i10 from "./authentication-material/nswhpauth-material.module";
export declare class NswhpAuthModule {
    static forRoot(config: INswhpAuthServiceOptions): ModuleWithProviders<NswhpAuthModule>;
    static ɵmod: i0.ɵɵNgModuleDefWithMeta<NswhpAuthModule, [typeof i1.AzureLoginComponent, typeof i2.AzureLogoutComponent, typeof i3.OtpComponent, typeof i4.PushComponent, typeof i5.RegisterComponent, typeof i6.SpinnerComponent, typeof i7.TickComponent, typeof i8.ContactAdminComponent], [typeof i9.CommonModule, typeof i10.NswhpAuthMaterialModule], [typeof i1.AzureLoginComponent, typeof i2.AzureLogoutComponent, typeof i3.OtpComponent, typeof i4.PushComponent, typeof i5.RegisterComponent, typeof i6.SpinnerComponent, typeof i7.TickComponent, typeof i8.ContactAdminComponent]>;
    static ɵinj: i0.ɵɵInjectorDef<NswhpAuthModule>;
}
//# sourceMappingURL=nswhpauth.module.d.ts.map
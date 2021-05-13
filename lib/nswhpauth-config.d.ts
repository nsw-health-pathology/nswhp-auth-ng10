import { InjectionToken } from '@angular/core';
export interface INswhpAuthServiceOptions {
    vip: {
        stepUpPath: string;
        domain: string;
    };
    adalConfig: adal.Config[];
    adal: {
        pushUrl: string;
        otpUrl: string;
        sendOtpUrl: string;
        registerUrl: string;
    };
}
export declare const NSWHP_AUTH_CONFIG: InjectionToken<INswhpAuthServiceOptions>;
//# sourceMappingURL=nswhpauth-config.d.ts.map
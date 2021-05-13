import { OnInit } from '@angular/core';
import { VipService } from '../../services/vip.service';
import * as i0 from "@angular/core";
export declare class OtpComponent implements OnInit {
    private vipService;
    submitted: boolean;
    authenticated: boolean;
    failed: boolean;
    submitButtonText: string;
    constructor(vipService: VipService);
    ngOnInit(): void;
    onSubmit(code: string): false;
    private handleSuccessfulOtpAuthentication;
    private handleFailedOtpAuthentication;
    enteringOtp(): void;
    static ɵfac: i0.ɵɵFactoryDef<OtpComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<OtpComponent, "lib-otp", never, {}, {}, never, never>;
}
//# sourceMappingURL=otp.component.d.ts.map
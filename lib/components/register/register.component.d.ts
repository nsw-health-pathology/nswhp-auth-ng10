import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMfaMessage } from '../../model/mfaMessage';
import { VipService } from '../../services/vip.service';
import * as i0 from "@angular/core";
export declare class RegisterComponent implements OnInit {
    private router;
    private vipService;
    smsCodeSent: boolean;
    registered: boolean;
    failed: boolean;
    statusMessage: string;
    submitButtonText: string;
    mobileNumber: string;
    invalidInputMessage: string;
    credentialIdValue: string;
    otp1Value: string;
    otp2Value: string;
    tempOtpValue: string;
    validInputs: boolean[];
    CREDENTIAL_ID: number;
    OTP_1: number;
    OTP_2: number;
    TEMP_OTP: number;
    constructor(router: Router, vipService: VipService);
    ngOnInit(): void;
    private initiateRegistrationProcess;
    onSubmit(credentialId: string, otp1: string, otp2: string, tempOtp: string): false;
    handleSuccessfulRegistration(response: IMfaMessage): void;
    private handleFailedRegistration;
    validateInput(input: HTMLInputElement): void;
    private allInputsValid;
    static ɵfac: i0.ɵɵFactoryDef<RegisterComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<RegisterComponent, "lib-register", never, {}, {}, never, never>;
}
//# sourceMappingURL=register.component.d.ts.map
import { OnInit } from '@angular/core';
import { VipService } from '../../services/vip.service';
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
}

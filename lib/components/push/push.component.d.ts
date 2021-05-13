import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VipService } from '../../services/vip.service';
export declare class PushComponent implements OnInit {
    private router;
    private vipService;
    waiting: boolean;
    success: boolean;
    statusMessage: string;
    detailMessage: string;
    constructor(router: Router, vipService: VipService);
    ngOnInit(): void;
    private handleSuccessfulPush;
    private handleFailedPush;
    useOTP(): Promise<void>;
}

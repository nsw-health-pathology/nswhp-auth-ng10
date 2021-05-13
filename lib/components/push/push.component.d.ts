import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VipService } from '../../services/vip.service';
import * as i0 from "@angular/core";
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
    static ɵfac: i0.ɵɵFactoryDef<PushComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<PushComponent, "lib-push", never, {}, {}, never, never>;
}
//# sourceMappingURL=push.component.d.ts.map
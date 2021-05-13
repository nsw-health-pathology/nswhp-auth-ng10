import { __awaiter } from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VipService } from '../../services/vip.service';
export class PushComponent {
    constructor(router, vipService) {
        this.router = router;
        this.vipService = vipService;
        this.statusMessage = '';
        this.detailMessage = '';
    }
    ngOnInit() {
        // Call API and wait for response
        this.waiting = true;
        this.vipService.pollUsersPushResponse().subscribe(response => {
            this.handleSuccessfulPush(response);
        }, error => {
            this.handleFailedPush(error);
        });
    }
    handleSuccessfulPush(response) {
        console.debug('SUCCESS: User accepted push notification');
        console.debug('vipToken: ' + response.vipToken);
        console.debug(response);
        // Hide the waiting screen and show success!
        this.waiting = false;
        this.success = true;
        this.statusMessage = response.statusMessage;
        this.detailMessage = response.detailMessage;
        // NOTE: VipService intercepts the response and stores the Vip token
        this.vipService.redirectToLastLocation();
    }
    handleFailedPush(error) {
        console.debug('ERROR: Did not receive user\'s push acceptance');
        console.error(error);
        console.error(error.error);
        // Hide the waiting screen and show failure!
        this.waiting = false;
        this.success = false;
        const err = error.error;
        this.statusMessage = err.statusMessage;
        this.detailMessage = err.detailMessage;
    }
    useOTP() {
        return __awaiter(this, void 0, void 0, function* () {
            console.debug('User has selected to use OTP instead of Push. Redirecting...');
            yield this.router.navigate(['authentication/otp']);
        });
    }
}
PushComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-push',
                template: "<section class=\"mat-elevation-z2 form-container\">\r\n  <div *ngIf=\"waiting\">\r\n    <h2>A push notification has been sent to your mobile device.</h2>\r\n    <h3>Waiting for Sign in Request to be approved...</h3>\r\n    <lib-spinner [isRunning]=\"waiting\"></lib-spinner>\r\n    <h3>Please do not refresh this page</h3>\r\n    <button mat-button mat-raised-button color=\"primary\" (click)=\"useOTP()\">Use OTP Instead</button>\r\n  </div>\r\n  <div *ngIf=\"!waiting\">\r\n    <h1>{{statusMessage}}</h1>\r\n    <h2>{{detailMessage}}</h2>\r\n    <div *ngIf=\"success\">\r\n      <lib-tick></lib-tick>\r\n    </div>\r\n    <div *ngIf=\"!success\">\r\n      <button mat-button mat-raised-button color=\"primary\" (click)=\"useOTP()\">Use OTP Instead</button>\r\n    </div>\r\n  </div>\r\n</section>\r\n",
                styles: ["", ".form-container{background-color:#fff;font-weight:700;margin-bottom:12px;margin-left:5px;margin-top:12px;padding:15px}"]
            },] }
];
PushComponent.ctorParameters = () => [
    { type: Router },
    { type: VipService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVzaC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovUHJvamVjdHMvbnN3aHBhdXRoLW1vZHVsZS9wcm9qZWN0cy9uc3docGF1dGgvc3JjLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvcHVzaC9wdXNoLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFJekMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBT3hELE1BQU0sT0FBTyxhQUFhO0lBUXhCLFlBQ1UsTUFBYyxFQUNkLFVBQXNCO1FBRHRCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBTHpCLGtCQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ25CLGtCQUFhLEdBQUcsRUFBRSxDQUFDO0lBS3RCLENBQUM7SUFFTCxRQUFRO1FBRU4saUNBQWlDO1FBQ2pDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBRXBCLElBQUksQ0FBQyxVQUFVLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxTQUFTLENBQy9DLFFBQVEsQ0FBQyxFQUFFO1lBQ1QsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RDLENBQUMsRUFDRCxLQUFLLENBQUMsRUFBRTtZQUNOLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQixDQUFDLENBQ0YsQ0FBQztJQUNKLENBQUM7SUFFTyxvQkFBb0IsQ0FBQyxRQUFxQjtRQUNoRCxPQUFPLENBQUMsS0FBSyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7UUFDMUQsT0FBTyxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hELE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFeEIsNENBQTRDO1FBQzVDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBRXBCLElBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQztRQUM1QyxJQUFJLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUM7UUFFNUMsb0VBQW9FO1FBRXBFLElBQUksQ0FBQyxVQUFVLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBRU8sZ0JBQWdCLENBQUMsS0FBd0I7UUFDL0MsT0FBTyxDQUFDLEtBQUssQ0FBQyxnREFBZ0QsQ0FBQyxDQUFDO1FBQ2hFLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckIsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFM0IsNENBQTRDO1FBQzVDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBRXJCLE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxLQUFnQyxDQUFDO1FBRW5ELElBQUksQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFDLGFBQWEsQ0FBQztRQUN2QyxJQUFJLENBQUMsYUFBYSxHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQUM7SUFDekMsQ0FBQztJQUdZLE1BQU07O1lBQ2pCLE9BQU8sQ0FBQyxLQUFLLENBQUMsOERBQThELENBQUMsQ0FBQztZQUM5RSxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDO1FBQ3JELENBQUM7S0FBQTs7O1lBckVGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsVUFBVTtnQkFDcEIsOHlCQUFvQzs7YUFFckM7OztZQVZRLE1BQU07WUFJTixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cEVycm9yUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcblxyXG5pbXBvcnQgeyBJTWZhTWVzc2FnZUVycm9yTWVzc2FnZSB9IGZyb20gJy4uLy4uL21vZGVsL21mYUVycm9yTWVzc2FnZSc7XHJcbmltcG9ydCB7IElNZmFNZXNzYWdlIH0gZnJvbSAnLi4vLi4vbW9kZWwvbWZhTWVzc2FnZSc7XHJcbmltcG9ydCB7IFZpcFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy92aXAuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2xpYi1wdXNoJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vcHVzaC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vcHVzaC5jb21wb25lbnQuc2NzcycsICcuLi8uLi9tYWluLmNzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQdXNoQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgd2FpdGluZzogYm9vbGVhbjtcclxuICBwdWJsaWMgc3VjY2VzczogYm9vbGVhbjtcclxuXHJcbiAgcHVibGljIHN0YXR1c01lc3NhZ2UgPSAnJztcclxuICBwdWJsaWMgZGV0YWlsTWVzc2FnZSA9ICcnO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXHJcbiAgICBwcml2YXRlIHZpcFNlcnZpY2U6IFZpcFNlcnZpY2VcclxuICApIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuXHJcbiAgICAvLyBDYWxsIEFQSSBhbmQgd2FpdCBmb3IgcmVzcG9uc2VcclxuICAgIHRoaXMud2FpdGluZyA9IHRydWU7XHJcblxyXG4gICAgdGhpcy52aXBTZXJ2aWNlLnBvbGxVc2Vyc1B1c2hSZXNwb25zZSgpLnN1YnNjcmliZShcclxuICAgICAgcmVzcG9uc2UgPT4ge1xyXG4gICAgICAgIHRoaXMuaGFuZGxlU3VjY2Vzc2Z1bFB1c2gocmVzcG9uc2UpO1xyXG4gICAgICB9LFxyXG4gICAgICBlcnJvciA9PiB7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVGYWlsZWRQdXNoKGVycm9yKTtcclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFuZGxlU3VjY2Vzc2Z1bFB1c2gocmVzcG9uc2U6IElNZmFNZXNzYWdlKSB7XHJcbiAgICBjb25zb2xlLmRlYnVnKCdTVUNDRVNTOiBVc2VyIGFjY2VwdGVkIHB1c2ggbm90aWZpY2F0aW9uJyk7XHJcbiAgICBjb25zb2xlLmRlYnVnKCd2aXBUb2tlbjogJyArIHJlc3BvbnNlLnZpcFRva2VuKTtcclxuICAgIGNvbnNvbGUuZGVidWcocmVzcG9uc2UpO1xyXG5cclxuICAgIC8vIEhpZGUgdGhlIHdhaXRpbmcgc2NyZWVuIGFuZCBzaG93IHN1Y2Nlc3MhXHJcbiAgICB0aGlzLndhaXRpbmcgPSBmYWxzZTtcclxuICAgIHRoaXMuc3VjY2VzcyA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5zdGF0dXNNZXNzYWdlID0gcmVzcG9uc2Uuc3RhdHVzTWVzc2FnZTtcclxuICAgIHRoaXMuZGV0YWlsTWVzc2FnZSA9IHJlc3BvbnNlLmRldGFpbE1lc3NhZ2U7XHJcblxyXG4gICAgLy8gTk9URTogVmlwU2VydmljZSBpbnRlcmNlcHRzIHRoZSByZXNwb25zZSBhbmQgc3RvcmVzIHRoZSBWaXAgdG9rZW5cclxuXHJcbiAgICB0aGlzLnZpcFNlcnZpY2UucmVkaXJlY3RUb0xhc3RMb2NhdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBoYW5kbGVGYWlsZWRQdXNoKGVycm9yOiBIdHRwRXJyb3JSZXNwb25zZSkge1xyXG4gICAgY29uc29sZS5kZWJ1ZygnRVJST1I6IERpZCBub3QgcmVjZWl2ZSB1c2VyXFwncyBwdXNoIGFjY2VwdGFuY2UnKTtcclxuICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG4gICAgY29uc29sZS5lcnJvcihlcnJvci5lcnJvcik7XHJcblxyXG4gICAgLy8gSGlkZSB0aGUgd2FpdGluZyBzY3JlZW4gYW5kIHNob3cgZmFpbHVyZSFcclxuICAgIHRoaXMud2FpdGluZyA9IGZhbHNlO1xyXG4gICAgdGhpcy5zdWNjZXNzID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3QgZXJyID0gZXJyb3IuZXJyb3IgYXMgSU1mYU1lc3NhZ2VFcnJvck1lc3NhZ2U7XHJcblxyXG4gICAgdGhpcy5zdGF0dXNNZXNzYWdlID0gZXJyLnN0YXR1c01lc3NhZ2U7XHJcbiAgICB0aGlzLmRldGFpbE1lc3NhZ2UgPSBlcnIuZGV0YWlsTWVzc2FnZTtcclxuICB9XHJcblxyXG5cclxuICBwdWJsaWMgYXN5bmMgdXNlT1RQKCkge1xyXG4gICAgY29uc29sZS5kZWJ1ZygnVXNlciBoYXMgc2VsZWN0ZWQgdG8gdXNlIE9UUCBpbnN0ZWFkIG9mIFB1c2guIFJlZGlyZWN0aW5nLi4uJyk7XHJcbiAgICBhd2FpdCB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJ2F1dGhlbnRpY2F0aW9uL290cCddKTtcclxuICB9XHJcbn1cclxuIl19
import { __awaiter } from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
export class ContactAdminComponent {
    constructor(router) {
        this.router = router;
        this.email = 'NSWPATH-TestCatalogue@health.nsw.gov.au';
        this.subject = 'Requesting Access to the Statewide Test Catalogue';
        this.href = `mailto:${this.email}?subject=${this.subject}`;
    }
    redirect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.router.navigate(['authentication/login']);
        });
    }
}
ContactAdminComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-contact-admin',
                template: "<div class=\"container h-50\">\r\n  <div class=\"row align-items-center h-100\">\r\n    <div class=\"col-10 mx-auto\">\r\n      <div class=\"jumbotron\">\r\n        <h1 class=\"display-4\">Access Denied</h1>\r\n        <hr class=\"my-4\">\r\n        <p class=\"lead\">\r\n          Unfortunately, If you have reached this page after logging in, it means you do not have the required\r\n          permissions to proceed. Please contact us at (<a rel=\"noopener noreferrer\" href=\"{{href}}\">{{email}}</a>) to\r\n          request access. We apologize for any inconvenience.\r\n        </p>\r\n        <button mat-raised-button color=\"primary\" (click)=\"redirect()\">Return to login</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n",
                styles: ["", ".form-container{background-color:#fff;font-weight:700;margin-bottom:12px;margin-left:5px;margin-top:12px;padding:15px}"]
            },] }
];
ContactAdminComponent.ctorParameters = () => [
    { type: Router }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFjdC1hZG1pbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovUHJvamVjdHMvbnN3aHBhdXRoLW1vZHVsZS9wcm9qZWN0cy9uc3docGF1dGgvc3JjLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvY29udGFjdC1hZG1pbi9jb250YWN0LWFkbWluLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFPekMsTUFBTSxPQUFPLHFCQUFxQjtJQUtoQyxZQUE2QixNQUFjO1FBQWQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUgzQixVQUFLLEdBQVcseUNBQXlDLENBQUM7UUFDMUQsWUFBTyxHQUFXLG1EQUFtRCxDQUFDO1FBQ3RFLFNBQUksR0FBVyxVQUFVLElBQUksQ0FBQyxLQUFLLFlBQVksSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFbkMsUUFBUTs7WUFDbkIsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQztRQUN2RCxDQUFDO0tBQUE7OztZQWRGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsbUJBQW1CO2dCQUM3Qix3dkJBQTZDOzthQUU5Qzs7O1lBTlEsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2xpYi1jb250YWN0LWFkbWluJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vY29udGFjdC1hZG1pbi5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vY29udGFjdC1hZG1pbi5jb21wb25lbnQuc2NzcycsICcuLi8uLi9tYWluLmNzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb250YWN0QWRtaW5Db21wb25lbnQge1xyXG5cclxuICBwdWJsaWMgcmVhZG9ubHkgZW1haWw6IHN0cmluZyA9ICdOU1dQQVRILVRlc3RDYXRhbG9ndWVAaGVhbHRoLm5zdy5nb3YuYXUnO1xyXG4gIHB1YmxpYyByZWFkb25seSBzdWJqZWN0OiBzdHJpbmcgPSAnUmVxdWVzdGluZyBBY2Nlc3MgdG8gdGhlIFN0YXRld2lkZSBUZXN0IENhdGFsb2d1ZSc7XHJcbiAgcHVibGljIHJlYWRvbmx5IGhyZWY6IHN0cmluZyA9IGBtYWlsdG86JHt0aGlzLmVtYWlsfT9zdWJqZWN0PSR7dGhpcy5zdWJqZWN0fWA7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSByb3V0ZXI6IFJvdXRlcikgeyB9XHJcblxyXG4gIHB1YmxpYyBhc3luYyByZWRpcmVjdCgpIHtcclxuICAgIGF3YWl0IHRoaXMucm91dGVyLm5hdmlnYXRlKFsnYXV0aGVudGljYXRpb24vbG9naW4nXSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
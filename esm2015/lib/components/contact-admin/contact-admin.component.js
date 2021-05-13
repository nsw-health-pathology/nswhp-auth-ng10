import { __awaiter } from "tslib";
import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@angular/material/button";
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
ContactAdminComponent.ɵfac = function ContactAdminComponent_Factory(t) { return new (t || ContactAdminComponent)(i0.ɵɵdirectiveInject(i1.Router)); };
ContactAdminComponent.ɵcmp = i0.ɵɵdefineComponent({ type: ContactAdminComponent, selectors: [["lib-contact-admin"]], decls: 14, vars: 2, consts: [[1, "container", "h-50"], [1, "row", "align-items-center", "h-100"], [1, "col-10", "mx-auto"], [1, "jumbotron"], [1, "display-4"], [1, "my-4"], [1, "lead"], ["rel", "noopener noreferrer", 3, "href"], ["mat-raised-button", "", "color", "primary", 3, "click"]], template: function ContactAdminComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "div", 3);
        i0.ɵɵelementStart(4, "h1", 4);
        i0.ɵɵtext(5, "Access Denied");
        i0.ɵɵelementEnd();
        i0.ɵɵelement(6, "hr", 5);
        i0.ɵɵelementStart(7, "p", 6);
        i0.ɵɵtext(8, " Unfortunately, If you have reached this page after logging in, it means you do not have the required permissions to proceed. Please contact us at (");
        i0.ɵɵelementStart(9, "a", 7);
        i0.ɵɵtext(10);
        i0.ɵɵelementEnd();
        i0.ɵɵtext(11, ") to request access. We apologize for any inconvenience. ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(12, "button", 8);
        i0.ɵɵlistener("click", function ContactAdminComponent_Template_button_click_12_listener() { return ctx.redirect(); });
        i0.ɵɵtext(13, "Return to login");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(9);
        i0.ɵɵpropertyInterpolate("href", ctx.href, i0.ɵɵsanitizeUrl);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(ctx.email);
    } }, directives: [i2.MatButton], styles: ["", ".form-container[_ngcontent-%COMP%]{background-color:#fff;font-weight:700;margin-bottom:12px;margin-left:5px;margin-top:12px;padding:15px}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ContactAdminComponent, [{
        type: Component,
        args: [{
                selector: 'lib-contact-admin',
                templateUrl: './contact-admin.component.html',
                styleUrls: ['./contact-admin.component.scss', '../../main.css']
            }]
    }], function () { return [{ type: i1.Router }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFjdC1hZG1pbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovUHJvamVjdHMvbnN3aHBhdXRoLW1vZHVsZS9wcm9qZWN0cy9uc3docGF1dGgvc3JjLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvY29udGFjdC1hZG1pbi9jb250YWN0LWFkbWluLmNvbXBvbmVudC50cyIsImxpYi9jb21wb25lbnRzL2NvbnRhY3QtYWRtaW4vY29udGFjdC1hZG1pbi5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQzs7OztBQVFsRCxNQUFNLE9BQU8scUJBQXFCO0lBS2hDLFlBQTZCLE1BQWM7UUFBZCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBSDNCLFVBQUssR0FBVyx5Q0FBeUMsQ0FBQztRQUMxRCxZQUFPLEdBQVcsbURBQW1ELENBQUM7UUFDdEUsU0FBSSxHQUFXLFVBQVUsSUFBSSxDQUFDLEtBQUssWUFBWSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDL0IsQ0FBQztJQUVuQyxRQUFROztZQUNuQixNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELENBQUM7S0FBQTs7MEZBVFUscUJBQXFCOzBEQUFyQixxQkFBcUI7UUNSbEMsOEJBQ0U7UUFBQSw4QkFDRTtRQUFBLDhCQUNFO1FBQUEsOEJBQ0U7UUFBQSw2QkFBc0I7UUFBQSw2QkFBYTtRQUFBLGlCQUFLO1FBQ3hDLHdCQUNBO1FBQUEsNEJBQ0U7UUFBQSxvS0FDOEM7UUFBQSw0QkFBNkM7UUFBQSxhQUFTO1FBQUEsaUJBQUk7UUFBQSwwRUFFMUc7UUFBQSxpQkFBSTtRQUNKLGtDQUErRDtRQUFyQixtR0FBUyxjQUFVLElBQUM7UUFBQyxnQ0FBZTtRQUFBLGlCQUFTO1FBQ3pGLGlCQUFNO1FBQ1IsaUJBQU07UUFDUixpQkFBTTtRQUNSLGlCQUFNOztRQVArRSxlQUFlO1FBQWYsNERBQWU7UUFBQyxlQUFTO1FBQVQsK0JBQVM7O2tEREFqRyxxQkFBcUI7Y0FMakMsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLFdBQVcsRUFBRSxnQ0FBZ0M7Z0JBQzdDLFNBQVMsRUFBRSxDQUFDLGdDQUFnQyxFQUFFLGdCQUFnQixDQUFDO2FBQ2hFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbGliLWNvbnRhY3QtYWRtaW4nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9jb250YWN0LWFkbWluLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9jb250YWN0LWFkbWluLmNvbXBvbmVudC5zY3NzJywgJy4uLy4uL21haW4uY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIENvbnRhY3RBZG1pbkNvbXBvbmVudCB7XHJcblxyXG4gIHB1YmxpYyByZWFkb25seSBlbWFpbDogc3RyaW5nID0gJ05TV1BBVEgtVGVzdENhdGFsb2d1ZUBoZWFsdGgubnN3Lmdvdi5hdSc7XHJcbiAgcHVibGljIHJlYWRvbmx5IHN1YmplY3Q6IHN0cmluZyA9ICdSZXF1ZXN0aW5nIEFjY2VzcyB0byB0aGUgU3RhdGV3aWRlIFRlc3QgQ2F0YWxvZ3VlJztcclxuICBwdWJsaWMgcmVhZG9ubHkgaHJlZjogc3RyaW5nID0gYG1haWx0bzoke3RoaXMuZW1haWx9P3N1YmplY3Q9JHt0aGlzLnN1YmplY3R9YDtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IHJvdXRlcjogUm91dGVyKSB7IH1cclxuXHJcbiAgcHVibGljIGFzeW5jIHJlZGlyZWN0KCkge1xyXG4gICAgYXdhaXQgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWydhdXRoZW50aWNhdGlvbi9sb2dpbiddKTtcclxuICB9XHJcbn1cclxuIiwiPGRpdiBjbGFzcz1cImNvbnRhaW5lciBoLTUwXCI+XHJcbiAgPGRpdiBjbGFzcz1cInJvdyBhbGlnbi1pdGVtcy1jZW50ZXIgaC0xMDBcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJjb2wtMTAgbXgtYXV0b1wiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwianVtYm90cm9uXCI+XHJcbiAgICAgICAgPGgxIGNsYXNzPVwiZGlzcGxheS00XCI+QWNjZXNzIERlbmllZDwvaDE+XHJcbiAgICAgICAgPGhyIGNsYXNzPVwibXktNFwiPlxyXG4gICAgICAgIDxwIGNsYXNzPVwibGVhZFwiPlxyXG4gICAgICAgICAgVW5mb3J0dW5hdGVseSwgSWYgeW91IGhhdmUgcmVhY2hlZCB0aGlzIHBhZ2UgYWZ0ZXIgbG9nZ2luZyBpbiwgaXQgbWVhbnMgeW91IGRvIG5vdCBoYXZlIHRoZSByZXF1aXJlZFxyXG4gICAgICAgICAgcGVybWlzc2lvbnMgdG8gcHJvY2VlZC4gUGxlYXNlIGNvbnRhY3QgdXMgYXQgKDxhIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIiBocmVmPVwie3tocmVmfX1cIj57e2VtYWlsfX08L2E+KSB0b1xyXG4gICAgICAgICAgcmVxdWVzdCBhY2Nlc3MuIFdlIGFwb2xvZ2l6ZSBmb3IgYW55IGluY29udmVuaWVuY2UuXHJcbiAgICAgICAgPC9wPlxyXG4gICAgICAgIDxidXR0b24gbWF0LXJhaXNlZC1idXR0b24gY29sb3I9XCJwcmltYXJ5XCIgKGNsaWNrKT1cInJlZGlyZWN0KClcIj5SZXR1cm4gdG8gbG9naW48L2J1dHRvbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcbiJdfQ==
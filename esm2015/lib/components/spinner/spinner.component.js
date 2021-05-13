import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
export class SpinnerComponent {
    constructor() {
        this.isDelayedRunning = false;
    }
    set isRunning(value) {
        this.isDelayedRunning = value;
    }
}
SpinnerComponent.ɵfac = function SpinnerComponent_Factory(t) { return new (t || SpinnerComponent)(); };
SpinnerComponent.ɵcmp = i0.ɵɵdefineComponent({ type: SpinnerComponent, selectors: [["lib-spinner"]], inputs: { isRunning: "isRunning" }, decls: 3, vars: 1, consts: [[1, "spinner", 3, "hidden"], [1, "double-bounce1"], [1, "double-bounce2"]], template: function SpinnerComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelement(1, "div", 1);
        i0.ɵɵelement(2, "div", 2);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("hidden", !ctx.isDelayedRunning);
    } }, styles: [".spinner[_ngcontent-%COMP%]{height:250px;margin:50px auto;position:relative;width:250px}.double-bounce1[_ngcontent-%COMP%], .double-bounce2[_ngcontent-%COMP%]{animation:sk-bounce 2s ease-in-out infinite;background-color:rgba(155,255,177,.5);border-radius:50%;height:100%;left:0;opacity:.6;position:absolute;top:0;width:100%}.double-bounce2[_ngcontent-%COMP%]{animation-delay:-1s}@keyframes sk-bounce{0%,to{-webkit-transform:scale(0);transform:scale(0)}50%{-webkit-transform:scale(1);transform:scale(1)}}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(SpinnerComponent, [{
        type: Component,
        args: [{
                selector: 'lib-spinner',
                templateUrl: './spinner.component.html',
                styleUrls: ['./spinner.component.css']
            }]
    }], function () { return []; }, { isRunning: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bpbm5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovUHJvamVjdHMvbnN3aHBhdXRoLW1vZHVsZS9wcm9qZWN0cy9uc3docGF1dGgvc3JjLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvc3Bpbm5lci9zcGlubmVyLmNvbXBvbmVudC50cyIsImxpYi9jb21wb25lbnRzL3NwaW5uZXIvc3Bpbm5lci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFPakQsTUFBTSxPQUFPLGdCQUFnQjtJQUczQjtRQUZBLHFCQUFnQixHQUFHLEtBQUssQ0FBQztJQUVULENBQUM7SUFFakIsSUFDVyxTQUFTLENBQUMsS0FBYztRQUNqQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO0lBQ2hDLENBQUM7O2dGQVJVLGdCQUFnQjtxREFBaEIsZ0JBQWdCO1FDUDdCLDhCQUNFO1FBQUEseUJBQWtDO1FBQ2xDLHlCQUFrQztRQUNwQyxpQkFBTTs7UUFIRCw4Q0FBNEI7O2tERE9wQixnQkFBZ0I7Y0FMNUIsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxhQUFhO2dCQUN2QixXQUFXLEVBQUUsMEJBQTBCO2dCQUN2QyxTQUFTLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQzthQUN2QztzQ0FPWSxTQUFTO2tCQURuQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdsaWItc3Bpbm5lcicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3NwaW5uZXIuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3NwaW5uZXIuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTcGlubmVyQ29tcG9uZW50IHtcclxuICBpc0RlbGF5ZWRSdW5uaW5nID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgcHVibGljIHNldCBpc1J1bm5pbmcodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuaXNEZWxheWVkUnVubmluZyA9IHZhbHVlO1xyXG4gIH1cclxufVxyXG4iLCI8ZGl2IFtoaWRkZW5dPVwiIWlzRGVsYXllZFJ1bm5pbmdcIiBjbGFzcz1cInNwaW5uZXJcIj5cclxuICA8ZGl2IGNsYXNzPVwiZG91YmxlLWJvdW5jZTFcIj48L2Rpdj5cclxuICA8ZGl2IGNsYXNzPVwiZG91YmxlLWJvdW5jZTJcIj48L2Rpdj5cclxuPC9kaXY+XHJcbiJdfQ==
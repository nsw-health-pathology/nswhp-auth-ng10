import { Component, Input } from '@angular/core';
export class SpinnerComponent {
    constructor() {
        this.isDelayedRunning = false;
    }
    set isRunning(value) {
        this.isDelayedRunning = value;
    }
}
SpinnerComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-spinner',
                template: "<div [hidden]=\"!isDelayedRunning\" class=\"spinner\">\r\n  <div class=\"double-bounce1\"></div>\r\n  <div class=\"double-bounce2\"></div>\r\n</div>\r\n",
                styles: [".spinner{height:250px;margin:50px auto;position:relative;width:250px}.double-bounce1,.double-bounce2{animation:sk-bounce 2s ease-in-out infinite;background-color:rgba(155,255,177,.5);border-radius:50%;height:100%;left:0;opacity:.6;position:absolute;top:0;width:100%}.double-bounce2{animation-delay:-1s}@keyframes sk-bounce{0%,to{-webkit-transform:scale(0);transform:scale(0)}50%{-webkit-transform:scale(1);transform:scale(1)}}"]
            },] }
];
SpinnerComponent.ctorParameters = () => [];
SpinnerComponent.propDecorators = {
    isRunning: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bpbm5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovUHJvamVjdHMvbnN3aHBhdXRoLW1vZHVsZS9wcm9qZWN0cy9uc3docGF1dGgvc3JjLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvc3Bpbm5lci9zcGlubmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQU9qRCxNQUFNLE9BQU8sZ0JBQWdCO0lBRzNCO1FBRkEscUJBQWdCLEdBQUcsS0FBSyxDQUFDO0lBRVQsQ0FBQztJQUVqQixJQUNXLFNBQVMsQ0FBQyxLQUFjO1FBQ2pDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7SUFDaEMsQ0FBQzs7O1lBYkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxhQUFhO2dCQUN2QixvS0FBdUM7O2FBRXhDOzs7O3dCQU1FLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2xpYi1zcGlubmVyJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vc3Bpbm5lci5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vc3Bpbm5lci5jb21wb25lbnQuY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFNwaW5uZXJDb21wb25lbnQge1xyXG4gIGlzRGVsYXllZFJ1bm5pbmcgPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgQElucHV0KClcclxuICBwdWJsaWMgc2V0IGlzUnVubmluZyh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5pc0RlbGF5ZWRSdW5uaW5nID0gdmFsdWU7XHJcbiAgfVxyXG59XHJcbiJdfQ==
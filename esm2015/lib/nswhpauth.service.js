import { Inject, Injectable } from '@angular/core';
import { NSWHP_AUTH_CONFIG } from './nswhpauth-config';
import * as i0 from "@angular/core";
export class NswhpAuthService {
    constructor(options) {
        this.nswhpAuthOptions = options;
    }
}
NswhpAuthService.ɵfac = function NswhpAuthService_Factory(t) { return new (t || NswhpAuthService)(i0.ɵɵinject(NSWHP_AUTH_CONFIG)); };
NswhpAuthService.ɵprov = i0.ɵɵdefineInjectable({ token: NswhpAuthService, factory: NswhpAuthService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NswhpAuthService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [NSWHP_AUTH_CONFIG]
            }] }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnN3aHBhdXRoLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiQzovUHJvamVjdHMvbnN3aHBhdXRoLW1vZHVsZS9wcm9qZWN0cy9uc3docGF1dGgvc3JjLyIsInNvdXJjZXMiOlsibGliL25zd2hwYXV0aC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBNEIsaUJBQWlCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7QUFPakYsTUFBTSxPQUFPLGdCQUFnQjtJQUUzQixZQUM2QixPQUFpQztRQUU1RCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsT0FBTyxDQUFDO0lBQ2xDLENBQUM7O2dGQU5VLGdCQUFnQixjQUdqQixpQkFBaUI7d0RBSGhCLGdCQUFnQixXQUFoQixnQkFBZ0IsbUJBRmYsTUFBTTtrREFFUCxnQkFBZ0I7Y0FINUIsVUFBVTtlQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COztzQkFJSSxNQUFNO3VCQUFDLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSU5zd2hwQXV0aFNlcnZpY2VPcHRpb25zLCBOU1dIUF9BVVRIX0NPTkZJRyB9IGZyb20gJy4vbnN3aHBhdXRoLWNvbmZpZyc7XG5cblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBOc3docEF1dGhTZXJ2aWNlIHtcbiAgcHVibGljIG5zd2hwQXV0aE9wdGlvbnM6IElOc3docEF1dGhTZXJ2aWNlT3B0aW9ucztcbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChOU1dIUF9BVVRIX0NPTkZJRykgb3B0aW9uczogSU5zd2hwQXV0aFNlcnZpY2VPcHRpb25zLFxuICApIHtcbiAgICB0aGlzLm5zd2hwQXV0aE9wdGlvbnMgPSBvcHRpb25zO1xuICB9XG59XG4iXX0=
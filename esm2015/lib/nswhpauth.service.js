import { Inject, Injectable } from '@angular/core';
import { NSWHP_AUTH_CONFIG } from './nswhpauth-config';
import * as i0 from "@angular/core";
import * as i1 from "./nswhpauth-config";
export class NswhpAuthService {
    constructor(options) {
        this.nswhpAuthOptions = options;
    }
}
NswhpAuthService.ɵprov = i0.ɵɵdefineInjectable({ factory: function NswhpAuthService_Factory() { return new NswhpAuthService(i0.ɵɵinject(i1.NSWHP_AUTH_CONFIG)); }, token: NswhpAuthService, providedIn: "root" });
NswhpAuthService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
NswhpAuthService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [NSWHP_AUTH_CONFIG,] }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnN3aHBhdXRoLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiQzovUHJvamVjdHMvbnN3aHBhdXRoLW1vZHVsZS9wcm9qZWN0cy9uc3docGF1dGgvc3JjLyIsInNvdXJjZXMiOlsibGliL25zd2hwYXV0aC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBNEIsaUJBQWlCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7O0FBT2pGLE1BQU0sT0FBTyxnQkFBZ0I7SUFFM0IsWUFDNkIsT0FBaUM7UUFFNUQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLE9BQU8sQ0FBQztJQUNsQyxDQUFDOzs7O1lBVEYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7NENBSUksTUFBTSxTQUFDLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSU5zd2hwQXV0aFNlcnZpY2VPcHRpb25zLCBOU1dIUF9BVVRIX0NPTkZJRyB9IGZyb20gJy4vbnN3aHBhdXRoLWNvbmZpZyc7XG5cblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBOc3docEF1dGhTZXJ2aWNlIHtcbiAgcHVibGljIG5zd2hwQXV0aE9wdGlvbnM6IElOc3docEF1dGhTZXJ2aWNlT3B0aW9ucztcbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChOU1dIUF9BVVRIX0NPTkZJRykgb3B0aW9uczogSU5zd2hwQXV0aFNlcnZpY2VPcHRpb25zLFxuICApIHtcbiAgICB0aGlzLm5zd2hwQXV0aE9wdGlvbnMgPSBvcHRpb25zO1xuICB9XG59XG4iXX0=
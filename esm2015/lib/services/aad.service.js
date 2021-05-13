import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "adal-angular4";
import * as i2 from "./storage.service";
import * as i3 from "../nswhpauth.service";
export class AadService {
    constructor(adalService, storage, nswhpAuthService) {
        this.adalService = adalService;
        this.storage = storage;
        this.nswhpAuthService = nswhpAuthService;
        this.adalConfigs = this.nswhpAuthService.nswhpAuthOptions.adalConfig;
    }
    /** Takes an integer and returns true if it is in a valid range for the config array */
    isValidAdalConfigIndex(index) {
        return index !== null && index >= 0 && index < this.adalConfigs.length;
    }
    /**
     * initialises the Adal service with the config specified by configIndex
     * @param configIndex - Determines which config will be selected, used as an index on `this.adalConfigs`
     * @example
     * if (aadService.isValidAdalConfigIndex(index)) {
     *     intialiseAdalServiceWithConfig(index);
     * }
     */
    initialiseAdalServiceWithConfig(configIndex) {
        if (!this.isValidAdalConfigIndex(configIndex)) {
            throw new Error('ConfigIndex out of bounds. Consider checking with the isValidAdalConfigIndex helper method before calling.');
        }
        console.debug(`Initialising adal4Service with config index: ` + configIndex);
        const config = this.adalConfigs[configIndex];
        console.debug(`Adal config: `);
        console.debug('- tenant: ' + config.tenant);
        console.debug('- clientId: ' + config.clientId);
        this.adalService.init(this.adalConfigs[configIndex]);
        console.debug('>>>>>>> Actual config after init:');
        console.debug(this.adalService.config);
    }
    /**
     * Each AD token contains its tenant. Given a token, the tenant can be
     * extracted and passed into getConfigIndexByTenant which will return the
     * config index for that tenant
     */
    getConfigIndexByTenant(tenant) {
        if (tenant === this.adalConfigs[0].tenant) {
            return 0;
        }
        throw Error(`Unknown tenant passed in: ${tenant}`);
    }
    handleWindowCallbackFromAzureLogin() {
        this.adalService.handleWindowCallback();
    }
    loginToAzure() {
        // Whenever the user gets a new AAD token we clear any existing VIP token
        // TODO: Why do we need to clear the VIP token, does this really make sense?
        this.storage.clearVipToken();
        this.storage.clearTransactionId();
        this.adalService.login();
    }
    logoutOfAzure() {
        // Delete the user's Azure instance selection when they logout
        this.storage.clearAzureInstance();
        this.adalService.logOut();
    }
    retrieveAadToken() {
        return this.adalService.userInfo.token;
    }
}
AadService.AZURE_AD_INSTANCE = 0;
AadService.AZURE_B2C_INSTANCE = 1; // Not used because the app only supports Health AD Logins.
AadService.ɵfac = function AadService_Factory(t) { return new (t || AadService)(i0.ɵɵinject(i1.AdalService), i0.ɵɵinject(i2.StorageService), i0.ɵɵinject(i3.NswhpAuthService)); };
AadService.ɵprov = i0.ɵɵdefineInjectable({ token: AadService, factory: AadService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(AadService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: i1.AdalService }, { type: i2.StorageService }, { type: i3.NswhpAuthService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWFkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiQzovUHJvamVjdHMvbnN3aHBhdXRoLW1vZHVsZS9wcm9qZWN0cy9uc3docGF1dGgvc3JjLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2FhZC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7O0FBUTNDLE1BQU0sT0FBTyxVQUFVO0lBY3JCLFlBQ1UsV0FBd0IsRUFDeEIsT0FBdUIsRUFDdkIsZ0JBQWtDO1FBRmxDLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLFlBQU8sR0FBUCxPQUFPLENBQWdCO1FBQ3ZCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFFMUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDO0lBQ3ZFLENBQUM7SUFYRCx1RkFBdUY7SUFDaEYsc0JBQXNCLENBQUMsS0FBYTtRQUN6QyxPQUFPLEtBQUssS0FBSyxJQUFJLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7SUFDekUsQ0FBQztJQVVEOzs7Ozs7O09BT0c7SUFDSSwrQkFBK0IsQ0FBQyxXQUFtQjtRQUN4RCxJQUFJLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQzdDLE1BQU0sSUFBSSxLQUFLLENBQUMsNEdBQTRHLENBQUMsQ0FBQztTQUMvSDtRQUVELE9BQU8sQ0FBQyxLQUFLLENBQUMsK0NBQStDLEdBQUcsV0FBVyxDQUFDLENBQUM7UUFFN0UsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM3QyxPQUFPLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQy9CLE9BQU8sQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1QyxPQUFPLENBQUMsS0FBSyxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFaEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBRXJELE9BQU8sQ0FBQyxLQUFLLENBQUMsbUNBQW1DLENBQUMsQ0FBQztRQUNuRCxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxzQkFBc0IsQ0FBQyxNQUFjO1FBQzFDLElBQUksTUFBTSxLQUFLLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFO1lBQ3pDLE9BQU8sQ0FBQyxDQUFDO1NBQ1Y7UUFFRCxNQUFNLEtBQUssQ0FBQyw2QkFBNkIsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRU0sa0NBQWtDO1FBQ3ZDLElBQUksQ0FBQyxXQUFXLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBRU0sWUFBWTtRQUNqQix5RUFBeUU7UUFDekUsNEVBQTRFO1FBQzVFLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBRWxDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVNLGFBQWE7UUFDbEIsOERBQThEO1FBQzlELElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUVsQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFTSxnQkFBZ0I7UUFDckIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7SUFDekMsQ0FBQzs7QUFsRmUsNEJBQWlCLEdBQUcsQ0FBQyxDQUFDO0FBQ3RCLDZCQUFrQixHQUFHLENBQUMsQ0FBQyxDQUFDLDJEQUEyRDtvRUFGeEYsVUFBVTtrREFBVixVQUFVLFdBQVYsVUFBVSxtQkFGVCxNQUFNO2tEQUVQLFVBQVU7Y0FIdEIsVUFBVTtlQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBZGFsU2VydmljZSB9IGZyb20gJ2FkYWwtYW5ndWxhcjQnO1xyXG5pbXBvcnQgeyBTdG9yYWdlU2VydmljZSB9IGZyb20gJy4vc3RvcmFnZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTnN3aHBBdXRoU2VydmljZSB9IGZyb20gJy4uL25zd2hwYXV0aC5zZXJ2aWNlJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIEFhZFNlcnZpY2Uge1xyXG4gIHN0YXRpYyByZWFkb25seSBBWlVSRV9BRF9JTlNUQU5DRSA9IDA7XHJcbiAgc3RhdGljIHJlYWRvbmx5IEFaVVJFX0IyQ19JTlNUQU5DRSA9IDE7IC8vIE5vdCB1c2VkIGJlY2F1c2UgdGhlIGFwcCBvbmx5IHN1cHBvcnRzIEhlYWx0aCBBRCBMb2dpbnMuXHJcblxyXG4gIC8qKiBUaGUgaW5kZXggb2YgdGhlIGFkYWxDb25maWcgdG8gdXNlIHNldCBieSBjbGlja2luZyB0aGUgbG9naW4gYnV0dG9ucyBvciB0aHJvdWdoIHRoZSByb3V0ZSBwYXJhbWV0ZXIgKi9cclxuICBwdWJsaWMgY29uZmlnSW5kZXg6IG51bWJlcjtcclxuICAvLyBBZGFsIGNvbmZpZ3NcclxuICBwcml2YXRlIGFkYWxDb25maWdzOiBhZGFsLkNvbmZpZ1tdO1xyXG5cclxuICAvKiogVGFrZXMgYW4gaW50ZWdlciBhbmQgcmV0dXJucyB0cnVlIGlmIGl0IGlzIGluIGEgdmFsaWQgcmFuZ2UgZm9yIHRoZSBjb25maWcgYXJyYXkgKi9cclxuICBwdWJsaWMgaXNWYWxpZEFkYWxDb25maWdJbmRleChpbmRleDogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gaW5kZXggIT09IG51bGwgJiYgaW5kZXggPj0gMCAmJiBpbmRleCA8IHRoaXMuYWRhbENvbmZpZ3MubGVuZ3RoO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGFkYWxTZXJ2aWNlOiBBZGFsU2VydmljZSxcclxuICAgIHByaXZhdGUgc3RvcmFnZTogU3RvcmFnZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIG5zd2hwQXV0aFNlcnZpY2U6IE5zd2hwQXV0aFNlcnZpY2VcclxuICApIHtcclxuICAgIHRoaXMuYWRhbENvbmZpZ3MgPSB0aGlzLm5zd2hwQXV0aFNlcnZpY2UubnN3aHBBdXRoT3B0aW9ucy5hZGFsQ29uZmlnO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogaW5pdGlhbGlzZXMgdGhlIEFkYWwgc2VydmljZSB3aXRoIHRoZSBjb25maWcgc3BlY2lmaWVkIGJ5IGNvbmZpZ0luZGV4XHJcbiAgICogQHBhcmFtIGNvbmZpZ0luZGV4IC0gRGV0ZXJtaW5lcyB3aGljaCBjb25maWcgd2lsbCBiZSBzZWxlY3RlZCwgdXNlZCBhcyBhbiBpbmRleCBvbiBgdGhpcy5hZGFsQ29uZmlnc2BcclxuICAgKiBAZXhhbXBsZVxyXG4gICAqIGlmIChhYWRTZXJ2aWNlLmlzVmFsaWRBZGFsQ29uZmlnSW5kZXgoaW5kZXgpKSB7XHJcbiAgICogICAgIGludGlhbGlzZUFkYWxTZXJ2aWNlV2l0aENvbmZpZyhpbmRleCk7XHJcbiAgICogfVxyXG4gICAqL1xyXG4gIHB1YmxpYyBpbml0aWFsaXNlQWRhbFNlcnZpY2VXaXRoQ29uZmlnKGNvbmZpZ0luZGV4OiBudW1iZXIpIHtcclxuICAgIGlmICghdGhpcy5pc1ZhbGlkQWRhbENvbmZpZ0luZGV4KGNvbmZpZ0luZGV4KSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvbmZpZ0luZGV4IG91dCBvZiBib3VuZHMuIENvbnNpZGVyIGNoZWNraW5nIHdpdGggdGhlIGlzVmFsaWRBZGFsQ29uZmlnSW5kZXggaGVscGVyIG1ldGhvZCBiZWZvcmUgY2FsbGluZy4nKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zb2xlLmRlYnVnKGBJbml0aWFsaXNpbmcgYWRhbDRTZXJ2aWNlIHdpdGggY29uZmlnIGluZGV4OiBgICsgY29uZmlnSW5kZXgpO1xyXG5cclxuICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMuYWRhbENvbmZpZ3NbY29uZmlnSW5kZXhdO1xyXG4gICAgY29uc29sZS5kZWJ1ZyhgQWRhbCBjb25maWc6IGApO1xyXG4gICAgY29uc29sZS5kZWJ1ZygnLSB0ZW5hbnQ6ICcgKyBjb25maWcudGVuYW50KTtcclxuICAgIGNvbnNvbGUuZGVidWcoJy0gY2xpZW50SWQ6ICcgKyBjb25maWcuY2xpZW50SWQpO1xyXG5cclxuICAgIHRoaXMuYWRhbFNlcnZpY2UuaW5pdCh0aGlzLmFkYWxDb25maWdzW2NvbmZpZ0luZGV4XSk7XHJcblxyXG4gICAgY29uc29sZS5kZWJ1ZygnPj4+Pj4+PiBBY3R1YWwgY29uZmlnIGFmdGVyIGluaXQ6Jyk7XHJcbiAgICBjb25zb2xlLmRlYnVnKHRoaXMuYWRhbFNlcnZpY2UuY29uZmlnKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEVhY2ggQUQgdG9rZW4gY29udGFpbnMgaXRzIHRlbmFudC4gR2l2ZW4gYSB0b2tlbiwgdGhlIHRlbmFudCBjYW4gYmVcclxuICAgKiBleHRyYWN0ZWQgYW5kIHBhc3NlZCBpbnRvIGdldENvbmZpZ0luZGV4QnlUZW5hbnQgd2hpY2ggd2lsbCByZXR1cm4gdGhlXHJcbiAgICogY29uZmlnIGluZGV4IGZvciB0aGF0IHRlbmFudFxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXRDb25maWdJbmRleEJ5VGVuYW50KHRlbmFudDogc3RyaW5nKSB7XHJcbiAgICBpZiAodGVuYW50ID09PSB0aGlzLmFkYWxDb25maWdzWzBdLnRlbmFudCkge1xyXG4gICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuXHJcbiAgICB0aHJvdyBFcnJvcihgVW5rbm93biB0ZW5hbnQgcGFzc2VkIGluOiAke3RlbmFudH1gKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBoYW5kbGVXaW5kb3dDYWxsYmFja0Zyb21BenVyZUxvZ2luKCkge1xyXG4gICAgdGhpcy5hZGFsU2VydmljZS5oYW5kbGVXaW5kb3dDYWxsYmFjaygpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGxvZ2luVG9BenVyZSgpIHtcclxuICAgIC8vIFdoZW5ldmVyIHRoZSB1c2VyIGdldHMgYSBuZXcgQUFEIHRva2VuIHdlIGNsZWFyIGFueSBleGlzdGluZyBWSVAgdG9rZW5cclxuICAgIC8vIFRPRE86IFdoeSBkbyB3ZSBuZWVkIHRvIGNsZWFyIHRoZSBWSVAgdG9rZW4sIGRvZXMgdGhpcyByZWFsbHkgbWFrZSBzZW5zZT9cclxuICAgIHRoaXMuc3RvcmFnZS5jbGVhclZpcFRva2VuKCk7XHJcbiAgICB0aGlzLnN0b3JhZ2UuY2xlYXJUcmFuc2FjdGlvbklkKCk7XHJcblxyXG4gICAgdGhpcy5hZGFsU2VydmljZS5sb2dpbigpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGxvZ291dE9mQXp1cmUoKSB7XHJcbiAgICAvLyBEZWxldGUgdGhlIHVzZXIncyBBenVyZSBpbnN0YW5jZSBzZWxlY3Rpb24gd2hlbiB0aGV5IGxvZ291dFxyXG4gICAgdGhpcy5zdG9yYWdlLmNsZWFyQXp1cmVJbnN0YW5jZSgpO1xyXG5cclxuICAgIHRoaXMuYWRhbFNlcnZpY2UubG9nT3V0KCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmV0cmlldmVBYWRUb2tlbigpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuYWRhbFNlcnZpY2UudXNlckluZm8udG9rZW47XHJcbiAgfVxyXG59XHJcbiJdfQ==
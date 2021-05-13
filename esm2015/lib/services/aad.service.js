import { Injectable } from '@angular/core';
import { AdalService } from 'adal-angular4';
import { StorageService } from './storage.service';
import { NswhpAuthService } from '../nswhpauth.service';
import * as i0 from "@angular/core";
import * as i1 from "adal-angular4/index";
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
AadService.ɵprov = i0.ɵɵdefineInjectable({ factory: function AadService_Factory() { return new AadService(i0.ɵɵinject(i1.AdalService), i0.ɵɵinject(i2.StorageService), i0.ɵɵinject(i3.NswhpAuthService)); }, token: AadService, providedIn: "root" });
AadService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
AadService.ctorParameters = () => [
    { type: AdalService },
    { type: StorageService },
    { type: NswhpAuthService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWFkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiQzovUHJvamVjdHMvbnN3aHBhdXRoLW1vZHVsZS9wcm9qZWN0cy9uc3docGF1dGgvc3JjLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2FhZC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7Ozs7O0FBS3hELE1BQU0sT0FBTyxVQUFVO0lBY3JCLFlBQ1UsV0FBd0IsRUFDeEIsT0FBdUIsRUFDdkIsZ0JBQWtDO1FBRmxDLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLFlBQU8sR0FBUCxPQUFPLENBQWdCO1FBQ3ZCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFFMUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDO0lBQ3ZFLENBQUM7SUFYRCx1RkFBdUY7SUFDaEYsc0JBQXNCLENBQUMsS0FBYTtRQUN6QyxPQUFPLEtBQUssS0FBSyxJQUFJLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7SUFDekUsQ0FBQztJQVVEOzs7Ozs7O09BT0c7SUFDSSwrQkFBK0IsQ0FBQyxXQUFtQjtRQUN4RCxJQUFJLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQzdDLE1BQU0sSUFBSSxLQUFLLENBQUMsNEdBQTRHLENBQUMsQ0FBQztTQUMvSDtRQUVELE9BQU8sQ0FBQyxLQUFLLENBQUMsK0NBQStDLEdBQUcsV0FBVyxDQUFDLENBQUM7UUFFN0UsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM3QyxPQUFPLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQy9CLE9BQU8sQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1QyxPQUFPLENBQUMsS0FBSyxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFaEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBRXJELE9BQU8sQ0FBQyxLQUFLLENBQUMsbUNBQW1DLENBQUMsQ0FBQztRQUNuRCxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxzQkFBc0IsQ0FBQyxNQUFjO1FBQzFDLElBQUksTUFBTSxLQUFLLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFO1lBQ3pDLE9BQU8sQ0FBQyxDQUFDO1NBQ1Y7UUFFRCxNQUFNLEtBQUssQ0FBQyw2QkFBNkIsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRU0sa0NBQWtDO1FBQ3ZDLElBQUksQ0FBQyxXQUFXLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBRU0sWUFBWTtRQUNqQix5RUFBeUU7UUFDekUsNEVBQTRFO1FBQzVFLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBRWxDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVNLGFBQWE7UUFDbEIsOERBQThEO1FBQzlELElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUVsQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFTSxnQkFBZ0I7UUFDckIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7SUFDekMsQ0FBQzs7QUFsRmUsNEJBQWlCLEdBQUcsQ0FBQyxDQUFDO0FBQ3RCLDZCQUFrQixHQUFHLENBQUMsQ0FBQyxDQUFDLDJEQUEyRDs7O1lBTHBHLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7O1lBTlEsV0FBVztZQUNYLGNBQWM7WUFDZCxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEFkYWxTZXJ2aWNlIH0gZnJvbSAnYWRhbC1hbmd1bGFyNCc7XHJcbmltcG9ydCB7IFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi9zdG9yYWdlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBOc3docEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vbnN3aHBhdXRoLnNlcnZpY2UnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQWFkU2VydmljZSB7XHJcbiAgc3RhdGljIHJlYWRvbmx5IEFaVVJFX0FEX0lOU1RBTkNFID0gMDtcclxuICBzdGF0aWMgcmVhZG9ubHkgQVpVUkVfQjJDX0lOU1RBTkNFID0gMTsgLy8gTm90IHVzZWQgYmVjYXVzZSB0aGUgYXBwIG9ubHkgc3VwcG9ydHMgSGVhbHRoIEFEIExvZ2lucy5cclxuXHJcbiAgLyoqIFRoZSBpbmRleCBvZiB0aGUgYWRhbENvbmZpZyB0byB1c2Ugc2V0IGJ5IGNsaWNraW5nIHRoZSBsb2dpbiBidXR0b25zIG9yIHRocm91Z2ggdGhlIHJvdXRlIHBhcmFtZXRlciAqL1xyXG4gIHB1YmxpYyBjb25maWdJbmRleDogbnVtYmVyO1xyXG4gIC8vIEFkYWwgY29uZmlnc1xyXG4gIHByaXZhdGUgYWRhbENvbmZpZ3M6IGFkYWwuQ29uZmlnW107XHJcblxyXG4gIC8qKiBUYWtlcyBhbiBpbnRlZ2VyIGFuZCByZXR1cm5zIHRydWUgaWYgaXQgaXMgaW4gYSB2YWxpZCByYW5nZSBmb3IgdGhlIGNvbmZpZyBhcnJheSAqL1xyXG4gIHB1YmxpYyBpc1ZhbGlkQWRhbENvbmZpZ0luZGV4KGluZGV4OiBudW1iZXIpIHtcclxuICAgIHJldHVybiBpbmRleCAhPT0gbnVsbCAmJiBpbmRleCA+PSAwICYmIGluZGV4IDwgdGhpcy5hZGFsQ29uZmlncy5sZW5ndGg7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgYWRhbFNlcnZpY2U6IEFkYWxTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBzdG9yYWdlOiBTdG9yYWdlU2VydmljZSxcclxuICAgIHByaXZhdGUgbnN3aHBBdXRoU2VydmljZTogTnN3aHBBdXRoU2VydmljZVxyXG4gICkge1xyXG4gICAgdGhpcy5hZGFsQ29uZmlncyA9IHRoaXMubnN3aHBBdXRoU2VydmljZS5uc3docEF1dGhPcHRpb25zLmFkYWxDb25maWc7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBpbml0aWFsaXNlcyB0aGUgQWRhbCBzZXJ2aWNlIHdpdGggdGhlIGNvbmZpZyBzcGVjaWZpZWQgYnkgY29uZmlnSW5kZXhcclxuICAgKiBAcGFyYW0gY29uZmlnSW5kZXggLSBEZXRlcm1pbmVzIHdoaWNoIGNvbmZpZyB3aWxsIGJlIHNlbGVjdGVkLCB1c2VkIGFzIGFuIGluZGV4IG9uIGB0aGlzLmFkYWxDb25maWdzYFxyXG4gICAqIEBleGFtcGxlXHJcbiAgICogaWYgKGFhZFNlcnZpY2UuaXNWYWxpZEFkYWxDb25maWdJbmRleChpbmRleCkpIHtcclxuICAgKiAgICAgaW50aWFsaXNlQWRhbFNlcnZpY2VXaXRoQ29uZmlnKGluZGV4KTtcclxuICAgKiB9XHJcbiAgICovXHJcbiAgcHVibGljIGluaXRpYWxpc2VBZGFsU2VydmljZVdpdGhDb25maWcoY29uZmlnSW5kZXg6IG51bWJlcikge1xyXG4gICAgaWYgKCF0aGlzLmlzVmFsaWRBZGFsQ29uZmlnSW5kZXgoY29uZmlnSW5kZXgpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ29uZmlnSW5kZXggb3V0IG9mIGJvdW5kcy4gQ29uc2lkZXIgY2hlY2tpbmcgd2l0aCB0aGUgaXNWYWxpZEFkYWxDb25maWdJbmRleCBoZWxwZXIgbWV0aG9kIGJlZm9yZSBjYWxsaW5nLicpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnNvbGUuZGVidWcoYEluaXRpYWxpc2luZyBhZGFsNFNlcnZpY2Ugd2l0aCBjb25maWcgaW5kZXg6IGAgKyBjb25maWdJbmRleCk7XHJcblxyXG4gICAgY29uc3QgY29uZmlnID0gdGhpcy5hZGFsQ29uZmlnc1tjb25maWdJbmRleF07XHJcbiAgICBjb25zb2xlLmRlYnVnKGBBZGFsIGNvbmZpZzogYCk7XHJcbiAgICBjb25zb2xlLmRlYnVnKCctIHRlbmFudDogJyArIGNvbmZpZy50ZW5hbnQpO1xyXG4gICAgY29uc29sZS5kZWJ1ZygnLSBjbGllbnRJZDogJyArIGNvbmZpZy5jbGllbnRJZCk7XHJcblxyXG4gICAgdGhpcy5hZGFsU2VydmljZS5pbml0KHRoaXMuYWRhbENvbmZpZ3NbY29uZmlnSW5kZXhdKTtcclxuXHJcbiAgICBjb25zb2xlLmRlYnVnKCc+Pj4+Pj4+IEFjdHVhbCBjb25maWcgYWZ0ZXIgaW5pdDonKTtcclxuICAgIGNvbnNvbGUuZGVidWcodGhpcy5hZGFsU2VydmljZS5jb25maWcpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRWFjaCBBRCB0b2tlbiBjb250YWlucyBpdHMgdGVuYW50LiBHaXZlbiBhIHRva2VuLCB0aGUgdGVuYW50IGNhbiBiZVxyXG4gICAqIGV4dHJhY3RlZCBhbmQgcGFzc2VkIGludG8gZ2V0Q29uZmlnSW5kZXhCeVRlbmFudCB3aGljaCB3aWxsIHJldHVybiB0aGVcclxuICAgKiBjb25maWcgaW5kZXggZm9yIHRoYXQgdGVuYW50XHJcbiAgICovXHJcbiAgcHVibGljIGdldENvbmZpZ0luZGV4QnlUZW5hbnQodGVuYW50OiBzdHJpbmcpIHtcclxuICAgIGlmICh0ZW5hbnQgPT09IHRoaXMuYWRhbENvbmZpZ3NbMF0udGVuYW50KSB7XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxuICAgIHRocm93IEVycm9yKGBVbmtub3duIHRlbmFudCBwYXNzZWQgaW46ICR7dGVuYW50fWApO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGhhbmRsZVdpbmRvd0NhbGxiYWNrRnJvbUF6dXJlTG9naW4oKSB7XHJcbiAgICB0aGlzLmFkYWxTZXJ2aWNlLmhhbmRsZVdpbmRvd0NhbGxiYWNrKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbG9naW5Ub0F6dXJlKCkge1xyXG4gICAgLy8gV2hlbmV2ZXIgdGhlIHVzZXIgZ2V0cyBhIG5ldyBBQUQgdG9rZW4gd2UgY2xlYXIgYW55IGV4aXN0aW5nIFZJUCB0b2tlblxyXG4gICAgLy8gVE9ETzogV2h5IGRvIHdlIG5lZWQgdG8gY2xlYXIgdGhlIFZJUCB0b2tlbiwgZG9lcyB0aGlzIHJlYWxseSBtYWtlIHNlbnNlP1xyXG4gICAgdGhpcy5zdG9yYWdlLmNsZWFyVmlwVG9rZW4oKTtcclxuICAgIHRoaXMuc3RvcmFnZS5jbGVhclRyYW5zYWN0aW9uSWQoKTtcclxuXHJcbiAgICB0aGlzLmFkYWxTZXJ2aWNlLmxvZ2luKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbG9nb3V0T2ZBenVyZSgpIHtcclxuICAgIC8vIERlbGV0ZSB0aGUgdXNlcidzIEF6dXJlIGluc3RhbmNlIHNlbGVjdGlvbiB3aGVuIHRoZXkgbG9nb3V0XHJcbiAgICB0aGlzLnN0b3JhZ2UuY2xlYXJBenVyZUluc3RhbmNlKCk7XHJcblxyXG4gICAgdGhpcy5hZGFsU2VydmljZS5sb2dPdXQoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZXRyaWV2ZUFhZFRva2VuKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5hZGFsU2VydmljZS51c2VySW5mby50b2tlbjtcclxuICB9XHJcbn1cclxuIl19
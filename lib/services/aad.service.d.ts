import { AdalService } from 'adal-angular4';
import { StorageService } from './storage.service';
import { NswhpAuthService } from '../nswhpauth.service';
import * as i0 from "@angular/core";
export declare class AadService {
    private adalService;
    private storage;
    private nswhpAuthService;
    static readonly AZURE_AD_INSTANCE = 0;
    static readonly AZURE_B2C_INSTANCE = 1;
    /** The index of the adalConfig to use set by clicking the login buttons or through the route parameter */
    configIndex: number;
    private adalConfigs;
    /** Takes an integer and returns true if it is in a valid range for the config array */
    isValidAdalConfigIndex(index: number): boolean;
    constructor(adalService: AdalService, storage: StorageService, nswhpAuthService: NswhpAuthService);
    /**
     * initialises the Adal service with the config specified by configIndex
     * @param configIndex - Determines which config will be selected, used as an index on `this.adalConfigs`
     * @example
     * if (aadService.isValidAdalConfigIndex(index)) {
     *     intialiseAdalServiceWithConfig(index);
     * }
     */
    initialiseAdalServiceWithConfig(configIndex: number): void;
    /**
     * Each AD token contains its tenant. Given a token, the tenant can be
     * extracted and passed into getConfigIndexByTenant which will return the
     * config index for that tenant
     */
    getConfigIndexByTenant(tenant: string): number;
    handleWindowCallbackFromAzureLogin(): void;
    loginToAzure(): void;
    logoutOfAzure(): void;
    retrieveAadToken(): string;
    static ɵfac: i0.ɵɵFactoryDef<AadService, never>;
    static ɵprov: i0.ɵɵInjectableDef<AadService>;
}
//# sourceMappingURL=aad.service.d.ts.map
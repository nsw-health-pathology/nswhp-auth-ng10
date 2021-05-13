import { InjectionToken, ɵɵinject, ɵɵdefineInjectable, ɵsetClassMetadata, Injectable, Inject, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule, ɵɵdirectiveInject, ɵɵdefineComponent, ɵɵelementStart, ɵɵlistener, ɵɵtext, ɵɵelementEnd, ɵɵadvance, ɵɵtextInterpolate1, Component, ɵɵelement, ɵɵpropertyInterpolate, ɵɵsanitizeUrl, ɵɵtextInterpolate, ɵɵnamespaceSVG, ɵɵgetCurrentView, ɵɵtemplate, ɵɵrestoreView, ɵɵreference, ɵɵnextContext, ɵɵproperty, ɵɵpureFunction1, Input, ɵɵpureFunction2 } from '@angular/core';
import { NgIf, NgClass, CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatButtonModule, MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule, MatChipList, MatChip } from '@angular/material/chips';
import { MatFormFieldModule, MatFormField, MatSuffix } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule, MatInput } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { __awaiter } from 'tslib';
import { AdalService } from 'adal-angular4';
import * as jwtDecode_ from 'jwt-decode';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { EMPTY, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { FORBIDDEN, UNAUTHORIZED, NOT_FOUND } from 'http-status-codes';

const NSWHP_AUTH_CONFIG = new InjectionToken('NSWHP_AUTH_CONFIG');

class NswhpAuthService {
    constructor(options) {
        this.nswhpAuthOptions = options;
    }
}
NswhpAuthService.ɵfac = function NswhpAuthService_Factory(t) { return new (t || NswhpAuthService)(ɵɵinject(NSWHP_AUTH_CONFIG)); };
NswhpAuthService.ɵprov = ɵɵdefineInjectable({ token: NswhpAuthService, factory: NswhpAuthService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { ɵsetClassMetadata(NswhpAuthService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [NSWHP_AUTH_CONFIG]
            }] }]; }, null); })();

const modules = [
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
];
class NswhpAuthMaterialModule {
}
NswhpAuthMaterialModule.ɵmod = ɵɵdefineNgModule({ type: NswhpAuthMaterialModule });
NswhpAuthMaterialModule.ɵinj = ɵɵdefineInjector({ factory: function NswhpAuthMaterialModule_Factory(t) { return new (t || NswhpAuthMaterialModule)(); }, imports: [[
            modules
        ], MatButtonModule,
        MatCardModule,
        MatChipsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatRadioModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(NswhpAuthMaterialModule, { imports: [MatButtonModule,
        MatCardModule,
        MatChipsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatRadioModule], exports: [MatButtonModule,
        MatCardModule,
        MatChipsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatRadioModule] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(NswhpAuthMaterialModule, [{
        type: NgModule,
        args: [{
                imports: [
                    modules
                ],
                exports: [
                    modules
                ]
            }]
    }], null, null); })();

const jwtDecode = jwtDecode_;
class StorageService {
    constructor() {
        // Storage keys
        this.TRANSACTION_ID = 'TRANSACTION_ID';
        this.VIP_TOKEN = 'VIP_TOKEN';
        this.AZURE_INSTANCE = 'AZURE_INSTANCE';
        this.LAST_LOCATION = 'LAST_LOCATION';
    }
    // VIP TOKEN
    storeVipToken(token) {
        localStorage.setItem(this.VIP_TOKEN, token);
    }
    retrieveVipToken() {
        return localStorage.getItem(this.VIP_TOKEN);
    }
    clearVipToken() {
        localStorage.removeItem(this.VIP_TOKEN);
    }
    // LAST LAST_LOCATION
    storeLastLocation() {
        const location = `${window.location.pathname}${window.location.search}`;
        console.debug('### Storing last location:');
        console.debug(window.location);
        console.debug('### location = ' + location);
        localStorage.setItem(this.LAST_LOCATION, location);
    }
    retrieveLastLocation() {
        console.debug(`### Retrieving last location: ${localStorage.getItem(this.LAST_LOCATION)}`);
        return localStorage.getItem(this.LAST_LOCATION);
    }
    clearLastLocation() {
        console.debug('### Clearing the last location');
        localStorage.removeItem(this.LAST_LOCATION);
    }
    // TRANSACTION ID
    storeTransactionId(token) {
        localStorage.setItem(this.TRANSACTION_ID, token);
    }
    retrieveTransactionId() {
        return localStorage.getItem(this.TRANSACTION_ID);
    }
    clearTransactionId() {
        localStorage.removeItem(this.TRANSACTION_ID);
    }
    // AZURE INSTANCE
    storeAzureInstance(instance) {
        localStorage.setItem(this.AZURE_INSTANCE, instance.toString());
    }
    retrieveAzureInstance() {
        return parseInt(localStorage.getItem(this.AZURE_INSTANCE), 10);
    }
    retrieveAzureTenantId() {
        const azureToken = localStorage.getItem('adal.idtoken');
        if (azureToken) {
            const decodedToken = jwtDecode(azureToken);
            // tslint:disable-next-line: no-string-literal
            return decodedToken['tid'];
        }
        else {
            return null;
        }
    }
    clearAzureInstance() {
        localStorage.removeItem(this.AZURE_INSTANCE);
    }
}
StorageService.ɵfac = function StorageService_Factory(t) { return new (t || StorageService)(); };
StorageService.ɵprov = ɵɵdefineInjectable({ token: StorageService, factory: StorageService.ɵfac });
/*@__PURE__*/ (function () { ɵsetClassMetadata(StorageService, [{
        type: Injectable
    }], function () { return []; }, null); })();

class AadService {
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
AadService.ɵfac = function AadService_Factory(t) { return new (t || AadService)(ɵɵinject(AdalService), ɵɵinject(StorageService), ɵɵinject(NswhpAuthService)); };
AadService.ɵprov = ɵɵdefineInjectable({ token: AadService, factory: AadService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { ɵsetClassMetadata(AadService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: AdalService }, { type: StorageService }, { type: NswhpAuthService }]; }, null); })();

class AzureLoginComponent {
    constructor(aadService, router, activatedRoute, storage) {
        this.aadService = aadService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.storage = storage;
        this.azureInstanceAD = 'NSW Health Employee';
    }
    handleLoginRouting() {
        return __awaiter(this, void 0, void 0, function* () {
            const routeParams = this.activatedRoute.snapshot.params.tenantConfigId;
            // If we're returning from a login, initialise ADAL with the supplied config index
            if (routeParams) {
                this.aadService.initialiseAdalServiceWithConfig(routeParams);
                this.aadService.handleWindowCallbackFromAzureLogin();
                const lastLocation = this.storage.retrieveLastLocation();
                this.storage.clearLastLocation();
                if (lastLocation) {
                    // Use href to simplify the process of restoring and routing
                    // route parameters and query parameters
                    // When we return from a 401 back to a route that has query params
                    // e.g. the Diagnostic Report screen, we want those query params
                    // to be included
                    window.location.href = lastLocation;
                }
                else {
                    yield this.router.navigate(['']);
                }
            }
            else {
                // there is only one login for this app, just pick it
                this.selectAzureInstance(this.azureInstanceAD);
            }
        });
    }
    ngOnInit() {
        return __awaiter(this, void 0, void 0, function* () {
            console.debug('LOGIN onInit');
            yield this.handleLoginRouting();
        });
    }
    selectAzureInstance(instance) {
        console.debug('Selecting Azure instance: ' + instance);
        // Whilst this is redundant (because we will only ever pass in `this.azureInstanceAD`)
        // We want to keep the structure of the ADAL initialisation the same as the base PoC
        // from when there were multiple ADs
        if (instance === this.azureInstanceAD) {
            this.aadService.initialiseAdalServiceWithConfig(AadService.AZURE_AD_INSTANCE);
        }
        // Log the user into the selected Azure instance
        // When Azure responds, it will have the tenantConfig of 0 which will
        // then route the user to their last window location in the constructor above.
        this.aadService.loginToAzure();
    }
}
AzureLoginComponent.ɵfac = function AzureLoginComponent_Factory(t) { return new (t || AzureLoginComponent)(ɵɵdirectiveInject(AadService), ɵɵdirectiveInject(Router), ɵɵdirectiveInject(ActivatedRoute), ɵɵdirectiveInject(StorageService)); };
AzureLoginComponent.ɵcmp = ɵɵdefineComponent({ type: AzureLoginComponent, selectors: [["lib-azure-login"]], decls: 3, vars: 1, consts: [[1, "mat-elevation-z2", "form-container"], ["color", "accent", "mat-raised-button", "", 1, "big", 3, "click"]], template: function AzureLoginComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "section", 0);
        ɵɵelementStart(1, "button", 1);
        ɵɵlistener("click", function AzureLoginComponent_Template_button_click_1_listener() { return ctx.selectAzureInstance(ctx.azureInstanceAD); });
        ɵɵtext(2);
        ɵɵelementEnd();
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵadvance(2);
        ɵɵtextInterpolate1(" ", ctx.azureInstanceAD, " ");
    } }, directives: [MatButton], styles: [".big[_ngcontent-%COMP%]{font-size:20px;margin:50px}", ".form-container[_ngcontent-%COMP%]{background-color:#fff;font-weight:700;margin-bottom:12px;margin-left:5px;margin-top:12px;padding:15px}"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(AzureLoginComponent, [{
        type: Component,
        args: [{
                selector: 'lib-azure-login',
                templateUrl: './azure-login.component.html',
                styleUrls: ['./azure-login.component.css', '../../main.css']
            }]
    }], function () { return [{ type: AadService }, { type: Router }, { type: ActivatedRoute }, { type: StorageService }]; }, null); })();

class AzureLogoutComponent {
    constructor(aadService) {
        this.aadService = aadService;
    }
    ngOnInit() {
        this.aadService.logoutOfAzure();
    }
}
AzureLogoutComponent.ɵfac = function AzureLogoutComponent_Factory(t) { return new (t || AzureLogoutComponent)(ɵɵdirectiveInject(AadService)); };
AzureLogoutComponent.ɵcmp = ɵɵdefineComponent({ type: AzureLogoutComponent, selectors: [["lib-azure-logout"]], decls: 0, vars: 0, template: function AzureLogoutComponent_Template(rf, ctx) { }, encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(AzureLogoutComponent, [{
        type: Component,
        args: [{
                template: '',
                selector: 'lib-azure-logout'
            }]
    }], function () { return [{ type: AadService }]; }, null); })();

class ContactAdminComponent {
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
ContactAdminComponent.ɵfac = function ContactAdminComponent_Factory(t) { return new (t || ContactAdminComponent)(ɵɵdirectiveInject(Router)); };
ContactAdminComponent.ɵcmp = ɵɵdefineComponent({ type: ContactAdminComponent, selectors: [["lib-contact-admin"]], decls: 14, vars: 2, consts: [[1, "container", "h-50"], [1, "row", "align-items-center", "h-100"], [1, "col-10", "mx-auto"], [1, "jumbotron"], [1, "display-4"], [1, "my-4"], [1, "lead"], ["rel", "noopener noreferrer", 3, "href"], ["mat-raised-button", "", "color", "primary", 3, "click"]], template: function ContactAdminComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "div", 0);
        ɵɵelementStart(1, "div", 1);
        ɵɵelementStart(2, "div", 2);
        ɵɵelementStart(3, "div", 3);
        ɵɵelementStart(4, "h1", 4);
        ɵɵtext(5, "Access Denied");
        ɵɵelementEnd();
        ɵɵelement(6, "hr", 5);
        ɵɵelementStart(7, "p", 6);
        ɵɵtext(8, " Unfortunately, If you have reached this page after logging in, it means you do not have the required permissions to proceed. Please contact us at (");
        ɵɵelementStart(9, "a", 7);
        ɵɵtext(10);
        ɵɵelementEnd();
        ɵɵtext(11, ") to request access. We apologize for any inconvenience. ");
        ɵɵelementEnd();
        ɵɵelementStart(12, "button", 8);
        ɵɵlistener("click", function ContactAdminComponent_Template_button_click_12_listener() { return ctx.redirect(); });
        ɵɵtext(13, "Return to login");
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵadvance(9);
        ɵɵpropertyInterpolate("href", ctx.href, ɵɵsanitizeUrl);
        ɵɵadvance(1);
        ɵɵtextInterpolate(ctx.email);
    } }, directives: [MatButton], styles: ["", ".form-container[_ngcontent-%COMP%]{background-color:#fff;font-weight:700;margin-bottom:12px;margin-left:5px;margin-top:12px;padding:15px}"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(ContactAdminComponent, [{
        type: Component,
        args: [{
                selector: 'lib-contact-admin',
                templateUrl: './contact-admin.component.html',
                styleUrls: ['./contact-admin.component.scss', '../../main.css']
            }]
    }], function () { return [{ type: Router }]; }, null); })();

class IaDfpService {
    constructor() {
        this.IaDfp = IaDfp;
    }
}
IaDfpService.ɵfac = function IaDfpService_Factory(t) { return new (t || IaDfpService)(); };
IaDfpService.ɵprov = ɵɵdefineInjectable({ token: IaDfpService, factory: IaDfpService.ɵfac });
/*@__PURE__*/ (function () { ɵsetClassMetadata(IaDfpService, [{
        type: Injectable
    }], function () { return []; }, null); })();

// Semantics Device Fingerprint library
class VipService {
    constructor(http, router, storage, iaDfpService, nswhpAuthService) {
        this.http = http;
        this.router = router;
        this.storage = storage;
        this.iaDfpService = iaDfpService;
        this.nswhpAuthService = nswhpAuthService;
        this.pushUrl = this.nswhpAuthService.nswhpAuthOptions.adal.pushUrl;
        this.otpUrl = this.nswhpAuthService.nswhpAuthOptions.adal.otpUrl;
        this.sendOtpUrl = this.nswhpAuthService.nswhpAuthOptions.adal.sendOtpUrl;
        this.registerUrl = this.nswhpAuthService.nswhpAuthOptions.adal.registerUrl;
    }
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     *                                 PUSH                                  *
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    // Wait for user to accept push notification
    pollUsersPushResponse() {
        console.debug('Authenticating user with PUSH...');
        const body = JSON.stringify({ transactionId: this.storage.retrieveTransactionId() });
        console.debug('TRANSACTION ID = ' + this.storage.retrieveTransactionId());
        return this.http.post(this.pushUrl, body)
            .pipe(map(res => this.extractData(res)))
            .pipe(catchError(this.handleError.bind(this)));
    }
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     *                                 OTP                                   *
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    // Send otp code for authentication
    authenticateOtpCode(otpCode) {
        console.debug('Authenticating user with OTP...');
        const newDeviceFingerprint = this.getDeviceFingerprint();
        const body = {
            deviceFingerprint: newDeviceFingerprint,
            otp: otpCode
        };
        return this.http.post(this.otpUrl, body)
            .pipe(map(res => this.extractData(res)))
            .pipe(catchError(this.handleError.bind(this)));
    }
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     *                            REGISTRATION                               *
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    // Send the user a SMS OTP code for registration
    sendOtpForRegistration() {
        console.debug('Creating VIP Account and sending user SMS OTP code...');
        const newDeviceFingerprint = this.getDeviceFingerprint();
        const body = {
            deviceFingerprint: newDeviceFingerprint
        };
        return this.http.post(this.sendOtpUrl, body)
            .pipe(map(res => this.extractData(res)))
            .pipe(catchError(this.handleError.bind(this)));
    }
    // Send user information for VIP registration
    submitVipRegistration(newCredentialId, newOtp1, newOtp2, newTempOtp) {
        console.debug('Submitting user\'s VIP registration...');
        const newDeviceFingerprint = this.getDeviceFingerprint();
        const body = {
            deviceFingerprint: newDeviceFingerprint,
            credentialId: newCredentialId,
            otp1: newOtp1,
            otp2: newOtp2,
            tempOtp: newTempOtp
        };
        console.debug('Device fingerprint: ' + newDeviceFingerprint);
        console.debug('Credential ID: ' + newCredentialId);
        console.debug('First security code: ' + newOtp1);
        console.debug('Second security code: ' + newOtp2);
        console.debug('SMS Code: ' + newTempOtp);
        return this.http.post(this.registerUrl, body)
            .pipe(tap(res => this.extractData(res), catchError(this.handleError.bind(this))));
    }
    // Return to the last location the user made a http request and got a 401
    redirectToLastLocation() {
        console.debug('### VIP SERVICE: redirectToLastLocation');
        const lastLocation = this.storage.retrieveLastLocation();
        this.storage.clearLastLocation();
        if (lastLocation) {
            console.debug('### We HAVE just returned from handling a 401 error. Redirecting to... ' + lastLocation);
            this.storage.clearLastLocation();
            // Use hreft to simplify the process of restoring and routing
            // route parameters and query parameters
            window.location.href = lastLocation;
        }
        else {
            console.debug('### We have NOT returned from handling a 401 error');
        }
    }
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    getDeviceFingerprint() {
        return this.iaDfpService.IaDfp.readFingerprint();
    }
    extractData(res) {
        console.debug('>>> VIP SERVICE: ');
        console.debug(res);
        // Store the Vip token if returned here so the components don't have to think about it
        if (res.vipToken) {
            this.storage.storeVipToken(res.vipToken);
        }
        return res;
    }
    /**
     * If the error is a 403 navigate to the Contact Admin page, otherwise bubble
     * the error up
     */
    handleError(error) {
        return __awaiter(this, void 0, void 0, function* () {
            // 403 Forbidden - Require Admin
            if (error.status === 403) {
                yield this.handleContactAdmin(error);
                return EMPTY;
            }
            else {
                return throwError(error);
            }
        });
    }
    handleContactAdmin(error) {
        return __awaiter(this, void 0, void 0, function* () {
            console.debug('Handling Operation Not Allowed');
            console.debug('User is unable to continue authorization process.');
            console.debug(error.error.detailMessage);
            console.debug('Redirecting user to contact admin page...');
            // To be implemented under DT-1138
            yield this.router.navigate(['/authentication/contact-admin/' + error.error.requestId]);
        });
    }
}
VipService.ɵfac = function VipService_Factory(t) { return new (t || VipService)(ɵɵinject(HttpClient), ɵɵinject(Router), ɵɵinject(StorageService), ɵɵinject(IaDfpService), ɵɵinject(NswhpAuthService)); };
VipService.ɵprov = ɵɵdefineInjectable({ token: VipService, factory: VipService.ɵfac });
/*@__PURE__*/ (function () { ɵsetClassMetadata(VipService, [{
        type: Injectable
    }], function () { return [{ type: HttpClient }, { type: Router }, { type: StorageService }, { type: IaDfpService }, { type: NswhpAuthService }]; }, null); })();

class TickComponent {
    constructor() { }
    ngOnInit() {
    }
}
TickComponent.ɵfac = function TickComponent_Factory(t) { return new (t || TickComponent)(); };
TickComponent.ɵcmp = ɵɵdefineComponent({ type: TickComponent, selectors: [["lib-tick"]], decls: 6, vars: 0, consts: [[1, "checkmark"], ["version", "1.1", "id", "Layer_1", "xmlns", "http://www.w3.org/2000/svg", 0, "xmlns", "xlink", "http://www.w3.org/1999/xlink", "x", "0px", "y", "0px", "viewBox", "0 0 161.2 161.2", "enable-background", "new 0 0 161.2 161.2", 0, "xml", "space", "preserve"], ["fill", "none", "stroke", "#7DB0D5", "stroke-miterlimit", "10", "d", "M425.9,52.1L425.9,52.1c-2.2-2.6-6-2.6-8.3-0.1l-42.7,46.2l-14.3-16.4\n\tc-2.3-2.7-6.2-2.7-8.6-0.1c-1.9,2.1-2,5.6-0.1,7.7l17.6,20.3c0.2,0.3,0.4,0.6,0.6,0.9c1.8,2,4.4,2.5,6.6,1.4c0.7-0.3,1.4-0.8,2-1.5\n\tc0.3-0.3,0.5-0.6,0.7-0.9l46.3-50.1C427.7,57.5,427.7,54.2,425.9,52.1z", 1, "path"], ["fill", "none", "stroke", "rgba(155, 255, 177, 1)", "stroke-width", "4", "stroke-miterlimit", "10", "cx", "80.6", "cy", "80.6", "r", "62.1", 1, "path"], ["fill", "none", "stroke", "rgba(155, 255, 177, 1)", "stroke-width", "6", "stroke-linecap", "round", "stroke-miterlimit", "10", "points", "113,52.8\n\t74.1,108.4 48.2,86.4 ", 1, "path"], ["fill", "none", "stroke", "rgba(155, 255, 177, 1)", "stroke-width", "4", "stroke-miterlimit", "10", "stroke-dasharray", "12.2175,12.2175", "cx", "80.6", "cy", "80.6", "r", "73.9", 1, "spin"]], template: function TickComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "div", 0);
        ɵɵnamespaceSVG();
        ɵɵelementStart(1, "svg", 1);
        ɵɵelement(2, "path", 2);
        ɵɵelement(3, "circle", 3);
        ɵɵelement(4, "polyline", 4);
        ɵɵelement(5, "circle", 5);
        ɵɵelementEnd();
        ɵɵelementEnd();
    } }, styles: [".checkmark[_ngcontent-%COMP%]{margin:0 auto;padding-top:40px;width:200px}.path[_ngcontent-%COMP%]{-webkit-animation:dash 2s ease-in-out;animation:dash 2s ease-in-out;stroke-dasharray:1000;stroke-dashoffset:0}.spin[_ngcontent-%COMP%]{-webkit-animation:spin 2s;-webkit-transform-origin:50% 50%;animation:spin 2s;transform-origin:50% 50%}@keyframes dash{0%{stroke-dashoffset:1000}to{stroke-dashoffset:0}}@keyframes spin{0%{-webkit-transform:rotate(0deg)}to{-webkit-transform:rotate(1turn)}}@keyframes text{0%{opacity:0}to{opacity:1}}"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(TickComponent, [{
        type: Component,
        args: [{
                selector: 'lib-tick',
                templateUrl: './tick.component.html',
                styleUrls: ['./tick.component.css']
            }]
    }], function () { return []; }, null); })();

function OtpComponent_div_1_p_5_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "p", 10);
    ɵɵtext(1, "Failed to authenticate OTP, please try again.");
    ɵɵelementEnd();
} }
const _c0 = function (a0) { return { "invalid-input": a0 }; };
function OtpComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r5 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div");
    ɵɵelementStart(1, "h2");
    ɵɵtext(2, "Please enter your Security Code below and press Submit");
    ɵɵelementEnd();
    ɵɵelementStart(3, "h3");
    ɵɵtext(4, "You can find your Security Code in your VIP Access mobile app or desktop app");
    ɵɵelementEnd();
    ɵɵtemplate(5, OtpComponent_div_1_p_5_Template, 2, 0, "p", 2);
    ɵɵelementStart(6, "form", 3);
    ɵɵlistener("submit", function OtpComponent_div_1_Template_form_submit_6_listener() { ɵɵrestoreView(_r5); const _r3 = ɵɵreference(10); const ctx_r4 = ɵɵnextContext(); return ctx_r4.onSubmit(_r3.value); });
    ɵɵelementStart(7, "div", 4);
    ɵɵelementStart(8, "mat-form-field", 5);
    ɵɵelementStart(9, "input", 6, 7);
    ɵɵlistener("keypress", function OtpComponent_div_1_Template_input_keypress_9_listener() { ɵɵrestoreView(_r5); const ctx_r6 = ɵɵnextContext(); return ctx_r6.enteringOtp(); });
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementStart(11, "div", 8);
    ɵɵelementStart(12, "button", 9);
    ɵɵtext(13);
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(5);
    ɵɵproperty("ngIf", ctx_r0.failed);
    ɵɵadvance(4);
    ɵɵproperty("ngClass", ɵɵpureFunction1(3, _c0, ctx_r0.failed));
    ɵɵadvance(4);
    ɵɵtextInterpolate1(" ", ctx_r0.submitButtonText, " ");
} }
function OtpComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div");
    ɵɵelementStart(1, "h1");
    ɵɵtext(2, "Success!");
    ɵɵelementEnd();
    ɵɵelement(3, "lib-tick");
    ɵɵelementEnd();
} }
class OtpComponent {
    constructor(vipService) {
        this.vipService = vipService;
        this.submitted = false;
        this.authenticated = false;
        this.failed = false;
        this.submitButtonText = 'Submit';
    }
    ngOnInit() {
    }
    onSubmit(code) {
        if (!this.submitted) {
            this.submitted = true;
            this.submitButtonText = 'Submitting...';
            this.vipService.authenticateOtpCode(code).subscribe(response => { this.handleSuccessfulOtpAuthentication(response); }, () => { this.handleFailedOtpAuthentication(); });
        }
        return false; // Don't cause a reload
    }
    handleSuccessfulOtpAuthentication(response) {
        console.debug(response);
        this.authenticated = true;
        this.failed = false;
        // NOTE: VipService intercepts the response and stores the Vip token
        this.vipService.redirectToLastLocation();
    }
    handleFailedOtpAuthentication() {
        this.submitted = false;
        this.failed = true;
        this.submitButtonText = 'Try Again';
    }
    // Turn the input green again when the user starts changing the otp code
    enteringOtp() {
        this.failed = false;
    }
}
OtpComponent.ɵfac = function OtpComponent_Factory(t) { return new (t || OtpComponent)(ɵɵdirectiveInject(VipService)); };
OtpComponent.ɵcmp = ɵɵdefineComponent({ type: OtpComponent, selectors: [["lib-otp"]], decls: 3, vars: 2, consts: [[1, "mat-elevation-z2", "form-container"], [4, "ngIf"], ["class", "invalid-input-message", 4, "ngIf"], [3, "submit"], [1, "container-body"], [1, "search-form-field"], ["matFormFieldControl", "", "matInput", "", "type", "text", "placeholder", "SECURITY CODE", "required", "", 3, "ngClass", "keypress"], ["otpCode", ""], [1, "container-button"], ["mat-button", "", "matSuffix", "", "color", "accent", "mat-raised-button", "", "id", "submit", "type", "submit"], [1, "invalid-input-message"]], template: function OtpComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "section", 0);
        ɵɵtemplate(1, OtpComponent_div_1_Template, 14, 5, "div", 1);
        ɵɵtemplate(2, OtpComponent_div_2_Template, 4, 0, "div", 1);
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵadvance(1);
        ɵɵproperty("ngIf", !ctx.authenticated);
        ɵɵadvance(1);
        ɵɵproperty("ngIf", ctx.authenticated);
    } }, directives: [NgIf, MatFormField, MatInput, NgClass, MatButton, MatSuffix, TickComponent], styles: ["", ".form-container[_ngcontent-%COMP%]{background-color:#fff;font-weight:700;margin-bottom:12px;margin-left:5px;margin-top:12px;padding:15px}"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(OtpComponent, [{
        type: Component,
        args: [{
                selector: 'lib-otp',
                templateUrl: './otp.component.html',
                styleUrls: ['./otp.component.scss', '../../main.css']
            }]
    }], function () { return [{ type: VipService }]; }, null); })();

class SpinnerComponent {
    constructor() {
        this.isDelayedRunning = false;
    }
    set isRunning(value) {
        this.isDelayedRunning = value;
    }
}
SpinnerComponent.ɵfac = function SpinnerComponent_Factory(t) { return new (t || SpinnerComponent)(); };
SpinnerComponent.ɵcmp = ɵɵdefineComponent({ type: SpinnerComponent, selectors: [["lib-spinner"]], inputs: { isRunning: "isRunning" }, decls: 3, vars: 1, consts: [[1, "spinner", 3, "hidden"], [1, "double-bounce1"], [1, "double-bounce2"]], template: function SpinnerComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "div", 0);
        ɵɵelement(1, "div", 1);
        ɵɵelement(2, "div", 2);
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵproperty("hidden", !ctx.isDelayedRunning);
    } }, styles: [".spinner[_ngcontent-%COMP%]{height:250px;margin:50px auto;position:relative;width:250px}.double-bounce1[_ngcontent-%COMP%], .double-bounce2[_ngcontent-%COMP%]{animation:sk-bounce 2s ease-in-out infinite;background-color:rgba(155,255,177,.5);border-radius:50%;height:100%;left:0;opacity:.6;position:absolute;top:0;width:100%}.double-bounce2[_ngcontent-%COMP%]{animation-delay:-1s}@keyframes sk-bounce{0%,to{-webkit-transform:scale(0);transform:scale(0)}50%{-webkit-transform:scale(1);transform:scale(1)}}"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(SpinnerComponent, [{
        type: Component,
        args: [{
                selector: 'lib-spinner',
                templateUrl: './spinner.component.html',
                styleUrls: ['./spinner.component.css']
            }]
    }], function () { return []; }, { isRunning: [{
            type: Input
        }] }); })();

function PushComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div");
    ɵɵelementStart(1, "h2");
    ɵɵtext(2, "A push notification has been sent to your mobile device.");
    ɵɵelementEnd();
    ɵɵelementStart(3, "h3");
    ɵɵtext(4, "Waiting for Sign in Request to be approved...");
    ɵɵelementEnd();
    ɵɵelement(5, "lib-spinner", 2);
    ɵɵelementStart(6, "h3");
    ɵɵtext(7, "Please do not refresh this page");
    ɵɵelementEnd();
    ɵɵelementStart(8, "button", 3);
    ɵɵlistener("click", function PushComponent_div_1_Template_button_click_8_listener() { ɵɵrestoreView(_r3); const ctx_r2 = ɵɵnextContext(); return ctx_r2.useOTP(); });
    ɵɵtext(9, "Use OTP Instead");
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(5);
    ɵɵproperty("isRunning", ctx_r0.waiting);
} }
function PushComponent_div_2_div_5_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div");
    ɵɵelement(1, "lib-tick");
    ɵɵelementEnd();
} }
function PushComponent_div_2_div_6_Template(rf, ctx) { if (rf & 1) {
    const _r7 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div");
    ɵɵelementStart(1, "button", 3);
    ɵɵlistener("click", function PushComponent_div_2_div_6_Template_button_click_1_listener() { ɵɵrestoreView(_r7); const ctx_r6 = ɵɵnextContext(2); return ctx_r6.useOTP(); });
    ɵɵtext(2, "Use OTP Instead");
    ɵɵelementEnd();
    ɵɵelementEnd();
} }
function PushComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div");
    ɵɵelementStart(1, "h1");
    ɵɵtext(2);
    ɵɵelementEnd();
    ɵɵelementStart(3, "h2");
    ɵɵtext(4);
    ɵɵelementEnd();
    ɵɵtemplate(5, PushComponent_div_2_div_5_Template, 2, 0, "div", 1);
    ɵɵtemplate(6, PushComponent_div_2_div_6_Template, 3, 0, "div", 1);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance(2);
    ɵɵtextInterpolate(ctx_r1.statusMessage);
    ɵɵadvance(2);
    ɵɵtextInterpolate(ctx_r1.detailMessage);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r1.success);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", !ctx_r1.success);
} }
class PushComponent {
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
PushComponent.ɵfac = function PushComponent_Factory(t) { return new (t || PushComponent)(ɵɵdirectiveInject(Router), ɵɵdirectiveInject(VipService)); };
PushComponent.ɵcmp = ɵɵdefineComponent({ type: PushComponent, selectors: [["lib-push"]], decls: 3, vars: 2, consts: [[1, "mat-elevation-z2", "form-container"], [4, "ngIf"], [3, "isRunning"], ["mat-button", "", "mat-raised-button", "", "color", "primary", 3, "click"]], template: function PushComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "section", 0);
        ɵɵtemplate(1, PushComponent_div_1_Template, 10, 1, "div", 1);
        ɵɵtemplate(2, PushComponent_div_2_Template, 7, 4, "div", 1);
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵadvance(1);
        ɵɵproperty("ngIf", ctx.waiting);
        ɵɵadvance(1);
        ɵɵproperty("ngIf", !ctx.waiting);
    } }, directives: [NgIf, SpinnerComponent, MatButton, TickComponent], styles: ["", ".form-container[_ngcontent-%COMP%]{background-color:#fff;font-weight:700;margin-bottom:12px;margin-left:5px;margin-top:12px;padding:15px}"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(PushComponent, [{
        type: Component,
        args: [{
                selector: 'lib-push',
                templateUrl: './push.component.html',
                styleUrls: ['./push.component.scss', '../../main.css']
            }]
    }], function () { return [{ type: Router }, { type: VipService }]; }, null); })();

function RegisterComponent_h3_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "h3");
    ɵɵtext(1, "Failed Registration.");
    ɵɵelement(2, "br");
    ɵɵtext(3, "We have sent you a new SMS code. Please try again.");
    ɵɵelementEnd();
} }
function RegisterComponent_div_24_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div");
    ɵɵelementStart(1, "p");
    ɵɵtext(2, "Sending SMS code to your mobile device...");
    ɵɵelementEnd();
    ɵɵelementStart(3, "mat-chip-list");
    ɵɵelementStart(4, "mat-chip", 15);
    ɵɵtext(5, "Waiting for SMS code...");
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementEnd();
} }
function RegisterComponent_p_25_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "p");
    ɵɵtext(1);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r5 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵtextInterpolate1("SMS Code has been sent to +", ctx_r5.mobileNumber, "");
} }
const _c0$1 = function (a0) { return { "hidden": a0 }; };
const _c1 = function (a0) { return { "invalid-input": a0 }; };
const _c2 = function (a0, a1) { return { "invalid-input": a0, "hidden": a1 }; };
class RegisterComponent {
    constructor(router, vipService) {
        this.router = router;
        this.vipService = vipService;
        this.smsCodeSent = false;
        this.registered = false;
        this.failed = false;
        this.statusMessage = '';
        this.submitButtonText = 'Register';
        this.mobileNumber = '';
        this.invalidInputMessage = '';
        // Input values
        this.credentialIdValue = '';
        this.otp1Value = '';
        this.otp2Value = '';
        this.tempOtpValue = '';
        // Store the valid flag for each input in the form
        this.validInputs = [true, true, true, true];
        this.CREDENTIAL_ID = 0;
        this.OTP_1 = 1;
        this.OTP_2 = 2;
        this.TEMP_OTP = 3;
    }
    ngOnInit() {
        // Send SMS OTP code for registration
        this.initiateRegistrationProcess();
    }
    initiateRegistrationProcess() {
        this.smsCodeSent = false;
        this.validInputs = [true, true, true, true];
        this.vipService.sendOtpForRegistration().subscribe(response => {
            console.debug(response);
            this.smsCodeSent = true;
            this.mobileNumber = response.mobileNumber;
        }, (error) => __awaiter(this, void 0, void 0, function* () {
            console.debug('Error sending SMS code to user for registration...');
            console.debug(error);
            // TODO: Do we want to handle better
            // We need to pass in the request id to the page
            yield this.router.navigate(['/authentication/contact-admin']);
        }));
    }
    onSubmit(credentialId, otp1, otp2, tempOtp) {
        if (this.allInputsValid(credentialId, otp1, otp2, tempOtp)) {
            this.submitButtonText = 'Registering...';
            this.vipService.submitVipRegistration(credentialId, otp1, otp2, tempOtp).subscribe(response => { this.handleSuccessfulRegistration(response); }, error => { this.handleFailedRegistration(error); });
        }
        return false; // Don't cause a reload
    }
    handleSuccessfulRegistration(response) {
        console.debug('SUCCESS: User registered with VIP');
        console.debug('vipToken: ' + response.vipToken);
        console.debug(response);
        // Notify the user of successful registration and show home button
        this.registered = true;
        this.failed = false;
        this.statusMessage = response.statusMessage;
        // NOTE: VipService intercepts the response and stores the Vip token
        this.vipService.redirectToLastLocation();
    }
    // If registration fails for any reason (we assume all inputs passed validation - even though current validation is minimal)
    // we will send a new SMS code and clear all inputs so user can begin registration process again
    handleFailedRegistration(error) {
        console.debug('ERROR: Failed to register user with VIP');
        console.debug(error);
        this.failed = true;
        // Clear all inputs
        this.credentialIdValue = null;
        this.otp1Value = null;
        this.otp2Value = null;
        this.tempOtpValue = null;
        // Tell user to try again with new SMS code
        this.submitButtonText = 'Try Again';
        this.initiateRegistrationProcess();
    }
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    validateInput(input) {
        console.debug(input);
        // Assume valid
        this.validInputs[parseInt(input.id, 10)] = true;
        this.invalidInputMessage = '';
        // No whitespace
        if (/\s/.test(input.value)) {
            this.validInputs[parseInt(input.id, 10)] = false;
            this.invalidInputMessage = 'Input must not contain spaces';
        }
        // Only numbers in OTPs
        if (input.id === this.OTP_1.toString() || input.id === this.OTP_2.toString() || input.id === this.TEMP_OTP.toString()) {
            const nums = /^[0-9]*$/;
            if (!input.value.match(nums)) {
                this.validInputs[parseInt(input.id, 10)] = false;
                this.invalidInputMessage = 'Codes may only contains numbers';
            }
        }
        console.debug(this.validInputs);
    }
    allInputsValid(credentialId, otp1, otp2, tempOtp) {
        // Ensure all inputs have been entered
        if (tempOtp.length <= 0) {
            this.validInputs[this.TEMP_OTP] = false;
        }
        if (otp2.length <= 0) {
            this.validInputs[this.OTP_2] = false;
        }
        if (otp1.length <= 0) {
            this.validInputs[this.OTP_1] = false;
        }
        if (credentialId.length <= 0) {
            this.validInputs[this.CREDENTIAL_ID] = false;
        }
        if (this.validInputs.includes(false)) {
            this.invalidInputMessage = 'Please fill in all fields';
            return false;
        }
        else {
            this.invalidInputMessage = '';
            return true;
        }
    }
}
RegisterComponent.ɵfac = function RegisterComponent_Factory(t) { return new (t || RegisterComponent)(ɵɵdirectiveInject(Router), ɵɵdirectiveInject(VipService)); };
RegisterComponent.ɵcmp = ɵɵdefineComponent({ type: RegisterComponent, selectors: [["lib-register"]], decls: 35, vars: 32, consts: [[1, "mat-elevation-z2", "form-container"], [4, "ngIf"], [3, "ngClass"], [1, "invalid-input-message"], ["autocomplete", "off", 3, "submit"], ["href", "https://vip.symantec.com/", "target", "_blank", "rel", "external nofollow noopener"], ["matInput", "", "name", "credentialId", "type", "text", "required", "", "placeholder", "Enter VIP Credential ID", "id", "0", 3, "value", "ngClass", "change"], ["credentialId", ""], ["matInput", "", "required", "", "type", "text", "placeholder", "FIRST SECURITY CODE", "id", "1", 3, "value", "ngClass", "change"], ["otp1", ""], ["matInput", "", "required", "", "type", "text", "placeholder", "SECOND SECURITY CODE", "id", "2", 3, "value", "ngClass", "change"], ["otp2", ""], ["matInput", "", "required", "", "type", "text", "placeholder", "SMS CODE", "id", "3", 3, "value", "ngClass", "change"], ["tempOtp", ""], ["mat-button", "", "mat-raised-button", "", "color", "primary", "id", "submit", "type", "submit", 3, "ngClass"], ["selectable", "false"]], template: function RegisterComponent_Template(rf, ctx) { if (rf & 1) {
        const _r7 = ɵɵgetCurrentView();
        ɵɵelementStart(0, "section", 0);
        ɵɵtemplate(1, RegisterComponent_h3_1_Template, 4, 0, "h3", 1);
        ɵɵelementStart(2, "div", 2);
        ɵɵelementStart(3, "p", 3);
        ɵɵtext(4);
        ɵɵelementEnd();
        ɵɵelementStart(5, "form", 4);
        ɵɵlistener("submit", function RegisterComponent_Template_form_submit_5_listener() { ɵɵrestoreView(_r7); const _r1 = ɵɵreference(12); const _r2 = ɵɵreference(20); const _r3 = ɵɵreference(23); const _r6 = ɵɵreference(28); return ctx.onSubmit(_r1.value, _r2.value, _r3.value, _r6.value); });
        ɵɵelementStart(6, "p");
        ɵɵtext(7, "Download Symantec VIP Access for desktop or mobile ");
        ɵɵelementStart(8, "a", 5);
        ɵɵtext(9, "here.");
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementStart(10, "mat-form-field");
        ɵɵelementStart(11, "input", 6, 7);
        ɵɵlistener("change", function RegisterComponent_Template_input_change_11_listener() { ɵɵrestoreView(_r7); const _r1 = ɵɵreference(12); return ctx.validateInput(_r1); });
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementStart(13, "p");
        ɵɵtext(14, "Please enter two ");
        ɵɵelementStart(15, "u");
        ɵɵtext(16, "sequential");
        ɵɵelementEnd();
        ɵɵtext(17, " security codes");
        ɵɵelementEnd();
        ɵɵelementStart(18, "mat-form-field");
        ɵɵelementStart(19, "input", 8, 9);
        ɵɵlistener("change", function RegisterComponent_Template_input_change_19_listener() { ɵɵrestoreView(_r7); const _r2 = ɵɵreference(20); return ctx.validateInput(_r2); });
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementStart(21, "mat-form-field");
        ɵɵelementStart(22, "input", 10, 11);
        ɵɵlistener("change", function RegisterComponent_Template_input_change_22_listener() { ɵɵrestoreView(_r7); const _r3 = ɵɵreference(23); return ctx.validateInput(_r3); });
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵtemplate(24, RegisterComponent_div_24_Template, 6, 0, "div", 1);
        ɵɵtemplate(25, RegisterComponent_p_25_Template, 2, 1, "p", 1);
        ɵɵelementStart(26, "mat-form-field");
        ɵɵelementStart(27, "input", 12, 13);
        ɵɵlistener("change", function RegisterComponent_Template_input_change_27_listener() { ɵɵrestoreView(_r7); const _r6 = ɵɵreference(28); return ctx.validateInput(_r6); });
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementStart(29, "button", 14);
        ɵɵtext(30);
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementStart(31, "div", 2);
        ɵɵelementStart(32, "h3");
        ɵɵtext(33);
        ɵɵelementEnd();
        ɵɵelement(34, "lib-tick");
        ɵɵelementEnd();
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵadvance(1);
        ɵɵproperty("ngIf", ctx.failed);
        ɵɵadvance(1);
        ɵɵproperty("ngClass", ɵɵpureFunction1(17, _c0$1, ctx.registered));
        ɵɵadvance(2);
        ɵɵtextInterpolate(ctx.invalidInputMessage);
        ɵɵadvance(7);
        ɵɵproperty("value", ctx.credentialIdValue)("ngClass", ɵɵpureFunction1(19, _c1, !ctx.validInputs[0]));
        ɵɵadvance(8);
        ɵɵproperty("value", ctx.otp1Value)("ngClass", ɵɵpureFunction1(21, _c1, !ctx.validInputs[1]));
        ɵɵadvance(3);
        ɵɵproperty("value", ctx.otp2Value)("ngClass", ɵɵpureFunction1(23, _c1, !ctx.validInputs[2]));
        ɵɵadvance(2);
        ɵɵproperty("ngIf", !ctx.smsCodeSent);
        ɵɵadvance(1);
        ɵɵproperty("ngIf", ctx.smsCodeSent);
        ɵɵadvance(2);
        ɵɵproperty("value", ctx.tempOtpValue)("ngClass", ɵɵpureFunction2(25, _c2, !ctx.validInputs[3], !ctx.smsCodeSent));
        ɵɵadvance(2);
        ɵɵproperty("ngClass", ɵɵpureFunction1(28, _c0$1, !ctx.smsCodeSent));
        ɵɵadvance(1);
        ɵɵtextInterpolate(ctx.submitButtonText);
        ɵɵadvance(1);
        ɵɵproperty("ngClass", ɵɵpureFunction1(30, _c0$1, !ctx.registered));
        ɵɵadvance(2);
        ɵɵtextInterpolate(ctx.statusMessage);
    } }, directives: [NgIf, NgClass, MatFormField, MatInput, MatButton, TickComponent, MatChipList, MatChip], styles: ["form[_ngcontent-%COMP%]{display:flex;flex-direction:column}", ".form-container[_ngcontent-%COMP%]{background-color:#fff;font-weight:700;margin-bottom:12px;margin-left:5px;margin-top:12px;padding:15px}"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(RegisterComponent, [{
        type: Component,
        args: [{
                selector: 'lib-register',
                templateUrl: './register.component.html',
                styleUrls: ['./register.component.scss', '../../main.css']
            }]
    }], function () { return [{ type: Router }, { type: VipService }]; }, null); })();

class AuthenticationInterceptorService {
    constructor(aadService, storageService, router, http, iaDfpService, nswhpAuthService) {
        this.aadService = aadService;
        this.storageService = storageService;
        this.router = router;
        this.http = http;
        this.iaDfpService = iaDfpService;
        this.nswhpAuthService = nswhpAuthService;
        this.AAD_TOKEN_HEADER = 'AuthorizationAD';
        this.VIP_TOKEN_HEADER = 'AuthorizationVIP';
        this.domain = this.nswhpAuthService.nswhpAuthOptions.vip.domain;
        this.stepUpPath = this.nswhpAuthService.nswhpAuthOptions.vip.stepUpPath;
    }
    intercept(request, next) {
        request = this.addAuthHeaders(request);
        return next.handle(request).pipe(catchError(this.handleError.bind(this)));
    }
    addAuthHeaders(request) {
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE',
            'Access-Control-Max-Age': '3600',
            'Access-Control-Allow-Headers': 'x-requested-with'
        };
        // These have been added separately since string interpolation is not supported for object keys
        const aadToken = this.aadService.retrieveAadToken();
        if (aadToken) {
            headers[this.AAD_TOKEN_HEADER] = aadToken;
        }
        const vipToken = this.storageService.retrieveVipToken();
        if (vipToken) {
            headers[this.VIP_TOKEN_HEADER] = vipToken;
        }
        request = request.clone({
            setHeaders: headers
        });
        return request;
    }
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     *                    USER AUTHORIZATION LOGIC [401]                     *
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    // If the user is unable to reach the API endpoint we must ensure they are authenticated.
    // The user is first authenticated with Azure AD
    //     - If the user does not have a valid AAD token we redirect them to login to Azure AD
    // The user is then required to have a VIP token
    //     - The '/stepup' endpoint must be called and then the following may happen:
    //         + If the user is not risky then we are immediately provided with the VIP token
    //         + If the user is risky then they are redirect to the provided MFA medium (push or otp)
    //             = NOTE: If the user is redirect to push or otp they will be redirected
    //                     back home once they have a valid VIP token
    handleUserAuthorization(error) {
        return __awaiter(this, void 0, void 0, function* () {
            // Store the user context so we can return here after handling the 401
            this.storageService.storeLastLocation();
            // Check if the user is authenticated with Azure:
            //      If they are, we have a valid AAD Token and we can continue.
            //      If they are not, we redirect them to the Azure login page and leave
            //       them there until they successfully login. They will then be redirected to the home page
            if (this.isNewAadTokenRequired(error)) {
                yield this.router.navigate(['authentication/login']);
            }
            else {
                this.getVipToken();
            }
        });
    }
    handleError(error) {
        return __awaiter(this, void 0, void 0, function* () {
            // Handle Unauthorized error globally
            // AuthService will handle other 400 errors
            switch (error.status) {
                case UNAUTHORIZED:
                    console.debug('401 received, redirecting to login');
                    yield this.handleUserAuthorization(error);
                    break;
                case FORBIDDEN:
                    console.debug('403 received in AuthenticationInterceptor, redirecting to contact admin');
                    yield this.router.navigate(['/authentication/contact-admin']);
                    return EMPTY;
                default:
                    return throwError(error);
            }
        });
    }
    /**
     * If the error contains 'VIP' then we assume the AAD token is being successfully used
     * and that the 401 is caused by a missing or invalid VIP token
     * @param HttpErrorResponse returned by the call
     */
    isNewAadTokenRequired(error) {
        let required = true;
        const re = /(vip|VIP)/;
        if (error.error.message.search(re) !== -1) {
            required = false;
        }
        return required;
    }
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     *                             VIP TOKEN                                 *
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    /**
     * Initiates the steps to retrieve a VIP token from the server
     */
    getVipToken() {
        console.debug('Requesting new VIP Token...');
        this.stepUpAuthentication().subscribe((response) => __awaiter(this, void 0, void 0, function* () {
            this.logStepUpResponse(response);
            yield this.handleStepUpAuthentication(response);
        }), (error) => __awaiter(this, void 0, void 0, function* () {
            // NOTE: We specifically handle 403 and 404 errors here
            // Only 401 is handled globally. Other Auth related http calls
            // are made in AuthService that handles the other 400 errors.
            // Forbidden - Contact an admin (requestId)
            if (error.status === FORBIDDEN) {
                console.error('403 received');
                // TODO: This
                yield this.handleContactAdmin(error);
                return EMPTY;
            }
            else if (error.status === NOT_FOUND) {
                console.error('404 received');
                yield this.handleRegistration(error);
                return EMPTY;
            }
            else {
                yield this.handleError(error);
            }
        }));
    }
    stepUpAuthentication() {
        console.debug('User required to step up authentication: ');
        // We can assume that if we are requesting a VIP token we already have a valid AAD Token
        const authorization = this.aadService.retrieveAadToken();
        const newHeaders = new HttpHeaders().set(this.AAD_TOKEN_HEADER, authorization);
        const options = {
            headers: newHeaders,
            observe: 'response'
        };
        const newDeviceFingerprint = this.iaDfpService.IaDfp.readFingerprint();
        const json = {
            deviceFingerprint: newDeviceFingerprint
        };
        const body = JSON.stringify(json);
        const url = this.domain + this.stepUpPath;
        console.debug('Sending request: ');
        console.debug('- url: ' + url);
        console.debug('- authorization: ' + authorization);
        console.debug('- body: ' + body);
        return this.http.post(url, body, options);
    }
    handleStepUpAuthentication(response) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = response.body;
            console.debug(response);
            console.debug(res);
            // Store transactionId
            this.storageService.storeTransactionId(res.transactionId);
            // If the user is not risky we can immediately return the provided VIP Token
            // TODO: remove risky from response
            if (res.risky) {
                console.debug('User is required to use Multi-Factor Authentication');
                console.debug(`Redirecting user to ${res.medium} page...`);
                // Wait for the user to press the next button before routing to mfa page
                yield this.router.navigate([`/authentication/${res.medium.toString().toLowerCase()}`]);
            }
            else {
                // Store the token locally
                this.storageService.storeVipToken(res.vipToken);
                location.reload();
            }
        });
    }
    logStepUpResponse(response) {
        console.debug(response);
        console.debug('\'risky\': ' + response.body.risky);
        console.debug('\'requestId\': ' + response.body.requestId);
        console.debug('\'medium\': ' + response.body.medium);
        console.debug('\'transactionId\': ' + response.body.transactionId);
        console.debug('\'vipToken\': ' + response.body.vipToken);
    }
    //  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    //      *                        INTERCEPT REQUEST HEADERS                      *
    //      * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    //     // Custom headers with AAD and VIP authorization tokens
    //     getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
    //       if (options == null) {
    //           options = new RequestOptions();
    //       }
    //       if (options.headers == null) {
    //           options.headers = new Headers();
    //       }
    //       options.headers.append('Content-Type', 'application/json');
    //       // Default headers
    //       options.headers.append('Access-Control-Allow-Origin', '*');
    //       options.headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE');
    //       options.headers.append('Access-Control-Max-Age', '3600');
    //       options.headers.append('Access-Control-Allow-Headers', 'x-requested-with');
    //       // NOTE: The error interceptor handles updating the authorization tokens when we get a 401
    //       // AAD Token
    //       const authorization = this.aadService.retrieveAadToken();
    //       options.headers.append(this.AAD_TOKEN_HEADER, authorization);
    //       // VIP Token
    //       const authorizationVip = this.storage.retrieveVipToken();
    //       options.headers.append(this.VIP_TOKEN_HEADER,  authorizationVip);
    //       return options;
    //   }
    //   /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    //    *                    USER AUTHORIZATION LOGIC [401]                     *
    //    * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    //    // If the user is unable to reach the API endpoint we must ensure they are authenticated.
    //    // The user is first authenticated with Azure AD
    //    //     - If the user does not have a valid AAD token we redirect them to login to Azure AD
    //    // The user is then required to have a VIP token
    //    //     - The '/stepup' endpoint must be called and then the following may happen:
    //    //         + If the user is not risky then we are immediately provided with the VIP token
    //    //         + If the user is risky then they are redirect to the provided MFA medium (push or otp)
    //    //             = NOTE: If the user is redirect to push or otp they will be redirected
    //    //                     back home once they have a valid VIP token
    //    private handleUserAuthorization(error: Response) {
    //        // Store the user context so we can return here after handling the 401
    //        this.storage.storeLastLocation();
    //        // Check if the user is authenticated with Azure:
    //        //      If they are, we have a valid AAD Token and we can continue.
    //        //      If they are not, we redirect them to the Azure login page and leave
    //        //       them there until they successfully login. They will then be redirected to the home page
    //        if (this.checkNewAadTokenIsRequired(error)) {
    //            this.getAadToken();
    //        } else {
    //            this.getVipToken();
    //        }
    //    }
    //   /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    //    *                             AAD TOKEN                                 *
    //    * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    //   // If the 401 error response message contains 'VIP' then we know that the user
    //   // either did not proved an AAD token or the provided AAD token is invalid.
    //   // If the message does NOT contain 'VIP' then the provided AAD token was valid
    //   // and we may simple return the currently stored AAD token.
    //   private getAadToken() {
    //       // If the user has selected an Azure instance then we can simply return
    //       // their AAD token otherwise we redirect them to the /login page
    //       // TODO: DH - Look into this, is there a missing line below? Code doesn't match the comments
    //       if (this.storage.retrieveAzureInstance()) {
    //           console.debug('User has already selected an Azure instance. Redirecting to Azure login page...');
    //       } else {
    //           console.debug('User has already NOT selected an Azure instance yet. Redirecting user to login page...');
    //       }
    //       // Always send the user to select an Azure instance to log in to.
    //       // (even if they have previously selected an Azure instance)
    //       this.router.navigate(['/authentication/login']);
    //   }
    //   // When the error message contains 'VIP' we know the AAD token was valid and we can just return it
    //   private checkNewAadTokenIsRequired(error: Response) {
    //       let required = true;
    //       const re = /(vip|VIP)/;
    //       if (error.json().message.search(re) !== -1) {
    //           required = false;
    //       }
    //       return required;
    //   }
    //   /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    //    *                       CONTACT ADMIN LOGIC [403]                       *
    //    * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    handleContactAdmin(error) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = error;
            console.debug('Handling Operation Not Allowed');
            console.debug('User is unable to continue authorization process.');
            console.debug(body.error);
            console.debug('Redirecting user to contact admin page...');
            yield this.router.navigate(['/authentication/contact-admin /' + body.requestId]);
        });
    }
    //    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    //     *                       REGISTRATION LOGIC [404]                        *
    //     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    handleRegistration(error) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = error;
            console.debug('Handling Registration');
            console.debug('User has not yet registered with VIP');
            console.debug(body.error);
            console.debug('Redirecting user to registration page...');
            yield this.router.navigate(['/authentication/register']);
        });
    }
}
AuthenticationInterceptorService.ɵfac = function AuthenticationInterceptorService_Factory(t) { return new (t || AuthenticationInterceptorService)(ɵɵinject(AadService), ɵɵinject(StorageService), ɵɵinject(Router), ɵɵinject(HttpClient), ɵɵinject(IaDfpService), ɵɵinject(NswhpAuthService)); };
AuthenticationInterceptorService.ɵprov = ɵɵdefineInjectable({ token: AuthenticationInterceptorService, factory: AuthenticationInterceptorService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { ɵsetClassMetadata(AuthenticationInterceptorService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: AadService }, { type: StorageService }, { type: Router }, { type: HttpClient }, { type: IaDfpService }, { type: NswhpAuthService }]; }, null); })();

class NswhpAuthModule {
    static forRoot(config) {
        return {
            ngModule: NswhpAuthModule,
            providers: [
                { provide: NSWHP_AUTH_CONFIG, useValue: config },
            ]
        };
    }
}
NswhpAuthModule.ɵmod = ɵɵdefineNgModule({ type: NswhpAuthModule });
NswhpAuthModule.ɵinj = ɵɵdefineInjector({ factory: function NswhpAuthModule_Factory(t) { return new (t || NswhpAuthModule)(); }, providers: [
        StorageService,
        IaDfpService,
        NswhpAuthMaterialModule,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthenticationInterceptorService,
            multi: true
        },
        AadService,
        VipService,
        AdalService
    ], imports: [[
            CommonModule,
            NswhpAuthMaterialModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(NswhpAuthModule, { declarations: [AzureLoginComponent,
        AzureLogoutComponent,
        OtpComponent,
        PushComponent,
        RegisterComponent,
        SpinnerComponent,
        TickComponent,
        ContactAdminComponent], imports: [CommonModule,
        NswhpAuthMaterialModule], exports: [AzureLoginComponent,
        AzureLogoutComponent,
        OtpComponent,
        PushComponent,
        RegisterComponent,
        SpinnerComponent,
        TickComponent,
        ContactAdminComponent] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(NswhpAuthModule, [{
        type: NgModule,
        args: [{
                declarations: [
                    AzureLoginComponent,
                    AzureLogoutComponent,
                    OtpComponent,
                    PushComponent,
                    RegisterComponent,
                    SpinnerComponent,
                    TickComponent,
                    ContactAdminComponent,
                ],
                exports: [
                    AzureLoginComponent,
                    AzureLogoutComponent,
                    OtpComponent,
                    PushComponent,
                    RegisterComponent,
                    SpinnerComponent,
                    TickComponent,
                    ContactAdminComponent,
                ],
                imports: [
                    CommonModule,
                    NswhpAuthMaterialModule,
                ],
                providers: [
                    StorageService,
                    IaDfpService,
                    NswhpAuthMaterialModule,
                    {
                        provide: HTTP_INTERCEPTORS,
                        useClass: AuthenticationInterceptorService,
                        multi: true
                    },
                    AadService,
                    VipService,
                    AdalService
                ],
                entryComponents: [
                    AzureLoginComponent,
                    AzureLogoutComponent,
                    OtpComponent,
                    PushComponent,
                    RegisterComponent,
                    SpinnerComponent,
                    TickComponent,
                    ContactAdminComponent,
                ]
            }]
    }], null, null); })();

const routes = [
    { path: 'authentication/otp', component: OtpComponent },
    { path: 'authentication/login', component: AzureLoginComponent },
    { path: 'authentication/login/:tenantConfigId', component: AzureLoginComponent },
    { path: 'authentication/logout', component: AzureLogoutComponent },
    { path: 'authentication/register', component: RegisterComponent },
    { path: 'authentication/push', component: PushComponent },
    { path: 'authentication/contact-admin', component: ContactAdminComponent }
];
class NswhpAuthRoutingModule {
}
NswhpAuthRoutingModule.ɵmod = ɵɵdefineNgModule({ type: NswhpAuthRoutingModule });
NswhpAuthRoutingModule.ɵinj = ɵɵdefineInjector({ factory: function NswhpAuthRoutingModule_Factory(t) { return new (t || NswhpAuthRoutingModule)(); }, imports: [[RouterModule.forRoot(routes)], RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(NswhpAuthRoutingModule, { imports: [RouterModule], exports: [RouterModule] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(NswhpAuthRoutingModule, [{
        type: NgModule,
        args: [{
                imports: [RouterModule.forRoot(routes)],
                exports: [RouterModule]
            }]
    }], null, null); })();

/*
 * Public API Surface of nswhpauth
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AzureLoginComponent, AzureLogoutComponent, ContactAdminComponent, NswhpAuthModule, NswhpAuthRoutingModule, NswhpAuthService, OtpComponent, PushComponent, RegisterComponent, SpinnerComponent, TickComponent };
//# sourceMappingURL=nswhp-auth-ng10.js.map

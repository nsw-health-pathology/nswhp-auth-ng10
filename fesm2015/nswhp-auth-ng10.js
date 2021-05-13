import { InjectionToken, ɵɵdefineInjectable, ɵɵinject, Injectable, Inject, NgModule, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { __awaiter } from 'tslib';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { AdalService as AdalService$1 } from 'adal-angular4';
import * as jwtDecode_ from 'jwt-decode';
import { AdalService } from 'adal-angular4/index';
import { EMPTY, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { FORBIDDEN, UNAUTHORIZED, NOT_FOUND } from 'http-status-codes';

const NSWHP_AUTH_CONFIG = new InjectionToken('NSWHP_AUTH_CONFIG');

class NswhpAuthService {
    constructor(options) {
        this.nswhpAuthOptions = options;
    }
}
NswhpAuthService.ɵprov = ɵɵdefineInjectable({ factory: function NswhpAuthService_Factory() { return new NswhpAuthService(ɵɵinject(NSWHP_AUTH_CONFIG)); }, token: NswhpAuthService, providedIn: "root" });
NswhpAuthService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
NswhpAuthService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [NSWHP_AUTH_CONFIG,] }] }
];

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
NswhpAuthMaterialModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    modules
                ],
                exports: [
                    modules
                ]
            },] }
];

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
StorageService.decorators = [
    { type: Injectable }
];
StorageService.ctorParameters = () => [];

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
AadService.ɵprov = ɵɵdefineInjectable({ factory: function AadService_Factory() { return new AadService(ɵɵinject(AdalService), ɵɵinject(StorageService), ɵɵinject(NswhpAuthService)); }, token: AadService, providedIn: "root" });
AadService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
AadService.ctorParameters = () => [
    { type: AdalService$1 },
    { type: StorageService },
    { type: NswhpAuthService }
];

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
AzureLoginComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-azure-login',
                template: "<section class=\"mat-elevation-z2 form-container\">\r\n  <button color=\"accent\" mat-raised-button class=\"big\" (click)=\"selectAzureInstance(azureInstanceAD)\">\r\n    {{azureInstanceAD}}\r\n  </button>\r\n</section>\r\n",
                styles: [".big{font-size:20px;margin:50px}", ".form-container{background-color:#fff;font-weight:700;margin-bottom:12px;margin-left:5px;margin-top:12px;padding:15px}"]
            },] }
];
AzureLoginComponent.ctorParameters = () => [
    { type: AadService },
    { type: Router },
    { type: ActivatedRoute },
    { type: StorageService }
];

class AzureLogoutComponent {
    constructor(aadService) {
        this.aadService = aadService;
    }
    ngOnInit() {
        this.aadService.logoutOfAzure();
    }
}
AzureLogoutComponent.decorators = [
    { type: Component, args: [{
                template: '',
                selector: 'lib-azure-logout'
            },] }
];
AzureLogoutComponent.ctorParameters = () => [
    { type: AadService }
];

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

class IaDfpService {
    constructor() {
        this.IaDfp = IaDfp;
    }
}
IaDfpService.decorators = [
    { type: Injectable }
];
IaDfpService.ctorParameters = () => [];

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
VipService.decorators = [
    { type: Injectable }
];
VipService.ctorParameters = () => [
    { type: HttpClient },
    { type: Router },
    { type: StorageService },
    { type: IaDfpService },
    { type: NswhpAuthService }
];

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
OtpComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-otp',
                template: "<section class=\"mat-elevation-z2 form-container\">\r\n  <div *ngIf=\"!authenticated\">\r\n    <h2>Please enter your Security Code below and press Submit</h2>\r\n    <h3>You can find your Security Code in your VIP Access mobile app or desktop app</h3>\r\n    <p *ngIf=\"failed\" class=\"invalid-input-message\">Failed to authenticate OTP, please try again.</p>\r\n    <form (submit)=\"onSubmit(otpCode.value)\">\r\n      <div class=\"container-body\">\r\n        <mat-form-field class=\"search-form-field\">\r\n          <input #otpCode matFormFieldControl matInput type=\"text\" placeholder=\"SECURITY CODE\" required\r\n            [ngClass]=\"{ 'invalid-input' : failed }\" (keypress)=\"enteringOtp()\" />\r\n\r\n        </mat-form-field>\r\n\r\n        <div class=\"container-button\">\r\n          <button mat-button matSuffix color=\"accent\" mat-raised-button id=\"submit\" type=\"submit\">\r\n            {{submitButtonText}}\r\n          </button>\r\n        </div>\r\n      </div>\r\n    </form>\r\n  </div>\r\n  <div *ngIf=\"authenticated\">\r\n    <h1>Success!</h1>\r\n    <lib-tick></lib-tick>\r\n  </div>\r\n</section>\r\n",
                styles: ["", ".form-container{background-color:#fff;font-weight:700;margin-bottom:12px;margin-left:5px;margin-top:12px;padding:15px}"]
            },] }
];
OtpComponent.ctorParameters = () => [
    { type: VipService }
];

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
PushComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-push',
                template: "<section class=\"mat-elevation-z2 form-container\">\r\n  <div *ngIf=\"waiting\">\r\n    <h2>A push notification has been sent to your mobile device.</h2>\r\n    <h3>Waiting for Sign in Request to be approved...</h3>\r\n    <lib-spinner [isRunning]=\"waiting\"></lib-spinner>\r\n    <h3>Please do not refresh this page</h3>\r\n    <button mat-button mat-raised-button color=\"primary\" (click)=\"useOTP()\">Use OTP Instead</button>\r\n  </div>\r\n  <div *ngIf=\"!waiting\">\r\n    <h1>{{statusMessage}}</h1>\r\n    <h2>{{detailMessage}}</h2>\r\n    <div *ngIf=\"success\">\r\n      <lib-tick></lib-tick>\r\n    </div>\r\n    <div *ngIf=\"!success\">\r\n      <button mat-button mat-raised-button color=\"primary\" (click)=\"useOTP()\">Use OTP Instead</button>\r\n    </div>\r\n  </div>\r\n</section>\r\n",
                styles: ["", ".form-container{background-color:#fff;font-weight:700;margin-bottom:12px;margin-left:5px;margin-top:12px;padding:15px}"]
            },] }
];
PushComponent.ctorParameters = () => [
    { type: Router },
    { type: VipService }
];

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
RegisterComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-register',
                template: "<section class=\"mat-elevation-z2 form-container\">\r\n  <h3 *ngIf=\"failed\">Failed Registration.<br>We have sent you a new SMS code. Please try again.</h3>\r\n\r\n  <div [ngClass]=\"{ 'hidden' : registered }\">\r\n    <p class=\"invalid-input-message\">{{invalidInputMessage}}</p>\r\n\r\n    <form autocomplete=\"off\" (submit)=\"onSubmit(credentialId.value, otp1.value, otp2.value, tempOtp.value)\">\r\n      <p>Download Symantec VIP Access for desktop or mobile\r\n        <a href=\"https://vip.symantec.com/\" target=\"_blank\" rel=\"external nofollow noopener\">here.</a>\r\n      </p>\r\n\r\n      <mat-form-field>\r\n        <input #credentialId matInput [value]=\"credentialIdValue\" name=\"credentialId\" type=\"text\" required\r\n          placeholder=\"Enter VIP Credential ID\" [ngClass]=\"{ 'invalid-input' : !validInputs[0] }\" id=\"0\"\r\n          (change)=\"validateInput(credentialId)\">\r\n      </mat-form-field>\r\n\r\n      <p>Please enter two <u>sequential</u> security codes</p>\r\n      <mat-form-field>\r\n        <input #otp1 matInput required [value]=\"otp1Value\" type=\"text\" placeholder=\"FIRST SECURITY CODE\"\r\n          [ngClass]=\"{ 'invalid-input' : !validInputs[1] }\" id=\"1\" (change)=\"validateInput(otp1)\">\r\n      </mat-form-field>\r\n\r\n      <mat-form-field>\r\n        <input #otp2 matInput required [value]=\"otp2Value\" type=\"text\" placeholder=\"SECOND SECURITY CODE\"\r\n          [ngClass]=\"{ 'invalid-input' : !validInputs[2] }\" id=\"2\" (change)=\"validateInput(otp2)\">\r\n      </mat-form-field>\r\n\r\n      <div *ngIf=\"!smsCodeSent\">\r\n        <p>Sending SMS code to your mobile device...</p>\r\n        <mat-chip-list>\r\n          <mat-chip selectable=false>Waiting for SMS code...</mat-chip>\r\n        </mat-chip-list>\r\n      </div>\r\n\r\n      <p *ngIf=\"smsCodeSent\">SMS Code has been sent to +{{mobileNumber}}</p>\r\n      <mat-form-field>\r\n        <input #tempOtp matInput required [value]=\"tempOtpValue\" type=\"text\" placeholder=\"SMS CODE\"\r\n          [ngClass]=\"{ 'invalid-input' : !validInputs[3], 'hidden' : !smsCodeSent }\" id=\"3\"\r\n          (change)=\"validateInput(tempOtp)\">\r\n      </mat-form-field>\r\n\r\n      <button mat-button mat-raised-button color=\"primary\" id=\"submit\" type=\"submit\"\r\n        [ngClass]=\"{ 'hidden' : !smsCodeSent }\">{{submitButtonText}}</button>\r\n    </form>\r\n  </div>\r\n\r\n  <div [ngClass]=\"{ 'hidden' : !registered }\">\r\n    <h3>{{statusMessage}}</h3>\r\n    <lib-tick></lib-tick>\r\n  </div>\r\n</section>\r\n",
                styles: ["form{display:flex;flex-direction:column}", ".form-container{background-color:#fff;font-weight:700;margin-bottom:12px;margin-left:5px;margin-top:12px;padding:15px}"]
            },] }
];
RegisterComponent.ctorParameters = () => [
    { type: Router },
    { type: VipService }
];

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
AuthenticationInterceptorService.ɵprov = ɵɵdefineInjectable({ factory: function AuthenticationInterceptorService_Factory() { return new AuthenticationInterceptorService(ɵɵinject(AadService), ɵɵinject(StorageService), ɵɵinject(Router), ɵɵinject(HttpClient), ɵɵinject(IaDfpService), ɵɵinject(NswhpAuthService)); }, token: AuthenticationInterceptorService, providedIn: "root" });
AuthenticationInterceptorService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
AuthenticationInterceptorService.ctorParameters = () => [
    { type: AadService },
    { type: StorageService },
    { type: Router },
    { type: HttpClient },
    { type: IaDfpService },
    { type: NswhpAuthService }
];

class SpinnerComponent {
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

class TickComponent {
    constructor() { }
    ngOnInit() {
    }
}
TickComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-tick',
                template: "<div class=\"checkmark\">\r\n  <svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\"\r\n    y=\"0px\" viewBox=\"0 0 161.2 161.2\" enable-background=\"new 0 0 161.2 161.2\" xml:space=\"preserve\">\r\n    <path class=\"path\" fill=\"none\" stroke=\"#7DB0D5\" stroke-miterlimit=\"10\" d=\"M425.9,52.1L425.9,52.1c-2.2-2.6-6-2.6-8.3-0.1l-42.7,46.2l-14.3-16.4\r\n\tc-2.3-2.7-6.2-2.7-8.6-0.1c-1.9,2.1-2,5.6-0.1,7.7l17.6,20.3c0.2,0.3,0.4,0.6,0.6,0.9c1.8,2,4.4,2.5,6.6,1.4c0.7-0.3,1.4-0.8,2-1.5\r\n\tc0.3-0.3,0.5-0.6,0.7-0.9l46.3-50.1C427.7,57.5,427.7,54.2,425.9,52.1z\" />\r\n    <circle class=\"path\" fill=\"none\" stroke=\"rgba(155, 255, 177, 1)\" stroke-width=\"4\" stroke-miterlimit=\"10\" cx=\"80.6\"\r\n      cy=\"80.6\" r=\"62.1\" />\r\n    <polyline class=\"path\" fill=\"none\" stroke=\"rgba(155, 255, 177, 1)\" stroke-width=\"6\" stroke-linecap=\"round\"\r\n      stroke-miterlimit=\"10\" points=\"113,52.8\r\n\t74.1,108.4 48.2,86.4 \" />\r\n\r\n    <circle class=\"spin\" fill=\"none\" stroke=\"rgba(155, 255, 177, 1)\" stroke-width=\"4\" stroke-miterlimit=\"10\"\r\n      stroke-dasharray=\"12.2175,12.2175\" cx=\"80.6\" cy=\"80.6\" r=\"73.9\" />\r\n\r\n  </svg>\r\n",
                styles: [".checkmark{margin:0 auto;padding-top:40px;width:200px}.path{-webkit-animation:dash 2s ease-in-out;animation:dash 2s ease-in-out;stroke-dasharray:1000;stroke-dashoffset:0}.spin{-webkit-animation:spin 2s;-webkit-transform-origin:50% 50%;animation:spin 2s;transform-origin:50% 50%}@keyframes dash{0%{stroke-dashoffset:1000}to{stroke-dashoffset:0}}@keyframes spin{0%{-webkit-transform:rotate(0deg)}to{-webkit-transform:rotate(1turn)}}@keyframes text{0%{opacity:0}to{opacity:1}}"]
            },] }
];
TickComponent.ctorParameters = () => [];

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
NswhpAuthModule.decorators = [
    { type: NgModule, args: [{
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
                    AdalService$1
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
            },] }
];

const routes = [
    { path: 'authentication/otp', component: OtpComponent },
    { path: 'authentication/login', component: AzureLoginComponent },
    { path: 'authentication/login/:tenantConfigId', component: AzureLoginComponent },
    { path: 'authentication/logout', component: AzureLogoutComponent },
    { path: 'authentication/register', component: RegisterComponent },
    { path: 'authentication/push', component: PushComponent },
    { path: 'authentication/contact-admin', component: ContactAdminComponent }
];
const routerModuleForRoot = RouterModule.forRoot(routes);
class NswhpAuthRoutingModule {
}
NswhpAuthRoutingModule.decorators = [
    { type: NgModule, args: [{
                imports: [routerModuleForRoot],
                exports: [RouterModule]
            },] }
];

/*
 * Public API Surface of nswhpauth
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AzureLoginComponent, AzureLogoutComponent, ContactAdminComponent, NswhpAuthModule, NswhpAuthRoutingModule, NswhpAuthService, OtpComponent, PushComponent, RegisterComponent, SpinnerComponent, TickComponent, routerModuleForRoot, NSWHP_AUTH_CONFIG as ɵb, AzureLoginComponent as ɵc, AadService as ɵd, StorageService as ɵe, AzureLogoutComponent as ɵf, OtpComponent as ɵg, VipService as ɵh, IaDfpService as ɵi, PushComponent as ɵj, RegisterComponent as ɵk, SpinnerComponent as ɵl, TickComponent as ɵm, ContactAdminComponent as ɵn, NswhpAuthMaterialModule as ɵo, AuthenticationInterceptorService as ɵp };
//# sourceMappingURL=nswhp-auth-ng10.js.map

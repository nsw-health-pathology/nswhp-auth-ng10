(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/common/http'), require('@angular/material/button'), require('@angular/material/card'), require('@angular/material/chips'), require('@angular/material/form-field'), require('@angular/material/icon'), require('@angular/material/input'), require('@angular/material/radio'), require('adal-angular4'), require('jwt-decode'), require('@angular/router'), require('rxjs'), require('rxjs/operators'), require('http-status-codes')) :
    typeof define === 'function' && define.amd ? define('nswhp-auth-ng10', ['exports', '@angular/core', '@angular/common', '@angular/common/http', '@angular/material/button', '@angular/material/card', '@angular/material/chips', '@angular/material/form-field', '@angular/material/icon', '@angular/material/input', '@angular/material/radio', 'adal-angular4', 'jwt-decode', '@angular/router', 'rxjs', 'rxjs/operators', 'http-status-codes'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['nswhp-auth-ng10'] = {}, global.ng.core, global.ng.common, global.ng.common.http, global.ng.material.button, global.ng.material.card, global.ng.material.chips, global.ng.material.formField, global.ng.material.icon, global.ng.material.input, global.ng.material.radio, global['adal-angular4'], global.jwt_decode, global.ng.router, global.rxjs, global.rxjs.operators, global['http-status-codes']));
}(this, (function (exports, i0, i3$1, i1$2, i5, card, i8, i3, icon, i4, radio, i1, jwtDecode_, i1$1, rxjs, operators, HttpStatus) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) { return e; } else {
            var n = Object.create(null);
            if (e) {
                Object.keys(e).forEach(function (k) {
                    if (k !== 'default') {
                        var d = Object.getOwnPropertyDescriptor(e, k);
                        Object.defineProperty(n, k, d.get ? d : {
                            enumerable: true,
                            get: function () {
                                return e[k];
                            }
                        });
                    }
                });
            }
            n['default'] = e;
            return Object.freeze(n);
        }
    }

    var jwtDecode___namespace = /*#__PURE__*/_interopNamespace(jwtDecode_);

    var NSWHP_AUTH_CONFIG = new i0.InjectionToken('NSWHP_AUTH_CONFIG');

    var NswhpAuthService = /** @class */ (function () {
        function NswhpAuthService(options) {
            this.nswhpAuthOptions = options;
        }
        return NswhpAuthService;
    }());
    NswhpAuthService.ɵfac = function NswhpAuthService_Factory(t) { return new (t || NswhpAuthService)(i0.ɵɵinject(NSWHP_AUTH_CONFIG)); };
    NswhpAuthService.ɵprov = i0.ɵɵdefineInjectable({ token: NswhpAuthService, factory: NswhpAuthService.ɵfac, providedIn: 'root' });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(NswhpAuthService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [NSWHP_AUTH_CONFIG]
                        }] }];
        }, null);
    })();

    var modules = [
        i5.MatButtonModule,
        card.MatCardModule,
        i8.MatChipsModule,
        i3.MatFormFieldModule,
        icon.MatIconModule,
        i4.MatInputModule,
        radio.MatRadioModule,
    ];
    var NswhpAuthMaterialModule = /** @class */ (function () {
        function NswhpAuthMaterialModule() {
        }
        return NswhpAuthMaterialModule;
    }());
    NswhpAuthMaterialModule.ɵmod = i0.ɵɵdefineNgModule({ type: NswhpAuthMaterialModule });
    NswhpAuthMaterialModule.ɵinj = i0.ɵɵdefineInjector({ factory: function NswhpAuthMaterialModule_Factory(t) { return new (t || NswhpAuthMaterialModule)(); }, imports: [[
                modules
            ], i5.MatButtonModule,
            card.MatCardModule,
            i8.MatChipsModule,
            i3.MatFormFieldModule,
            icon.MatIconModule,
            i4.MatInputModule,
            radio.MatRadioModule] });
    (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NswhpAuthMaterialModule, { imports: [i5.MatButtonModule,
                card.MatCardModule,
                i8.MatChipsModule,
                i3.MatFormFieldModule,
                icon.MatIconModule,
                i4.MatInputModule,
                radio.MatRadioModule], exports: [i5.MatButtonModule,
                card.MatCardModule,
                i8.MatChipsModule,
                i3.MatFormFieldModule,
                icon.MatIconModule,
                i4.MatInputModule,
                radio.MatRadioModule] });
    })();
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(NswhpAuthMaterialModule, [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            modules
                        ],
                        exports: [
                            modules
                        ]
                    }]
            }], null, null);
    })();

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
            to[j] = from[i];
        return to;
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

    var jwtDecode = jwtDecode___namespace;
    var StorageService = /** @class */ (function () {
        function StorageService() {
            // Storage keys
            this.TRANSACTION_ID = 'TRANSACTION_ID';
            this.VIP_TOKEN = 'VIP_TOKEN';
            this.AZURE_INSTANCE = 'AZURE_INSTANCE';
            this.LAST_LOCATION = 'LAST_LOCATION';
        }
        // VIP TOKEN
        StorageService.prototype.storeVipToken = function (token) {
            localStorage.setItem(this.VIP_TOKEN, token);
        };
        StorageService.prototype.retrieveVipToken = function () {
            return localStorage.getItem(this.VIP_TOKEN);
        };
        StorageService.prototype.clearVipToken = function () {
            localStorage.removeItem(this.VIP_TOKEN);
        };
        // LAST LAST_LOCATION
        StorageService.prototype.storeLastLocation = function () {
            var location = "" + window.location.pathname + window.location.search;
            console.debug('### Storing last location:');
            console.debug(window.location);
            console.debug('### location = ' + location);
            localStorage.setItem(this.LAST_LOCATION, location);
        };
        StorageService.prototype.retrieveLastLocation = function () {
            console.debug("### Retrieving last location: " + localStorage.getItem(this.LAST_LOCATION));
            return localStorage.getItem(this.LAST_LOCATION);
        };
        StorageService.prototype.clearLastLocation = function () {
            console.debug('### Clearing the last location');
            localStorage.removeItem(this.LAST_LOCATION);
        };
        // TRANSACTION ID
        StorageService.prototype.storeTransactionId = function (token) {
            localStorage.setItem(this.TRANSACTION_ID, token);
        };
        StorageService.prototype.retrieveTransactionId = function () {
            return localStorage.getItem(this.TRANSACTION_ID);
        };
        StorageService.prototype.clearTransactionId = function () {
            localStorage.removeItem(this.TRANSACTION_ID);
        };
        // AZURE INSTANCE
        StorageService.prototype.storeAzureInstance = function (instance) {
            localStorage.setItem(this.AZURE_INSTANCE, instance.toString());
        };
        StorageService.prototype.retrieveAzureInstance = function () {
            return parseInt(localStorage.getItem(this.AZURE_INSTANCE), 10);
        };
        StorageService.prototype.retrieveAzureTenantId = function () {
            var azureToken = localStorage.getItem('adal.idtoken');
            if (azureToken) {
                var decodedToken = jwtDecode(azureToken);
                // tslint:disable-next-line: no-string-literal
                return decodedToken['tid'];
            }
            else {
                return null;
            }
        };
        StorageService.prototype.clearAzureInstance = function () {
            localStorage.removeItem(this.AZURE_INSTANCE);
        };
        return StorageService;
    }());
    StorageService.ɵfac = function StorageService_Factory(t) { return new (t || StorageService)(); };
    StorageService.ɵprov = i0.ɵɵdefineInjectable({ token: StorageService, factory: StorageService.ɵfac });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(StorageService, [{
                type: i0.Injectable
            }], function () { return []; }, null);
    })();

    var AadService = /** @class */ (function () {
        function AadService(adalService, storage, nswhpAuthService) {
            this.adalService = adalService;
            this.storage = storage;
            this.nswhpAuthService = nswhpAuthService;
            this.adalConfigs = this.nswhpAuthService.nswhpAuthOptions.adalConfig;
        }
        /** Takes an integer and returns true if it is in a valid range for the config array */
        AadService.prototype.isValidAdalConfigIndex = function (index) {
            return index !== null && index >= 0 && index < this.adalConfigs.length;
        };
        /**
         * initialises the Adal service with the config specified by configIndex
         * @param configIndex - Determines which config will be selected, used as an index on `this.adalConfigs`
         * @example
         * if (aadService.isValidAdalConfigIndex(index)) {
         *     intialiseAdalServiceWithConfig(index);
         * }
         */
        AadService.prototype.initialiseAdalServiceWithConfig = function (configIndex) {
            if (!this.isValidAdalConfigIndex(configIndex)) {
                throw new Error('ConfigIndex out of bounds. Consider checking with the isValidAdalConfigIndex helper method before calling.');
            }
            console.debug("Initialising adal4Service with config index: " + configIndex);
            var config = this.adalConfigs[configIndex];
            console.debug("Adal config: ");
            console.debug('- tenant: ' + config.tenant);
            console.debug('- clientId: ' + config.clientId);
            this.adalService.init(this.adalConfigs[configIndex]);
            console.debug('>>>>>>> Actual config after init:');
            console.debug(this.adalService.config);
        };
        /**
         * Each AD token contains its tenant. Given a token, the tenant can be
         * extracted and passed into getConfigIndexByTenant which will return the
         * config index for that tenant
         */
        AadService.prototype.getConfigIndexByTenant = function (tenant) {
            if (tenant === this.adalConfigs[0].tenant) {
                return 0;
            }
            throw Error("Unknown tenant passed in: " + tenant);
        };
        AadService.prototype.handleWindowCallbackFromAzureLogin = function () {
            this.adalService.handleWindowCallback();
        };
        AadService.prototype.loginToAzure = function () {
            // Whenever the user gets a new AAD token we clear any existing VIP token
            // TODO: Why do we need to clear the VIP token, does this really make sense?
            this.storage.clearVipToken();
            this.storage.clearTransactionId();
            this.adalService.login();
        };
        AadService.prototype.logoutOfAzure = function () {
            // Delete the user's Azure instance selection when they logout
            this.storage.clearAzureInstance();
            this.adalService.logOut();
        };
        AadService.prototype.retrieveAadToken = function () {
            return this.adalService.userInfo.token;
        };
        return AadService;
    }());
    AadService.AZURE_AD_INSTANCE = 0;
    AadService.AZURE_B2C_INSTANCE = 1; // Not used because the app only supports Health AD Logins.
    AadService.ɵfac = function AadService_Factory(t) { return new (t || AadService)(i0.ɵɵinject(i1.AdalService), i0.ɵɵinject(StorageService), i0.ɵɵinject(NswhpAuthService)); };
    AadService.ɵprov = i0.ɵɵdefineInjectable({ token: AadService, factory: AadService.ɵfac, providedIn: 'root' });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(AadService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], function () { return [{ type: i1.AdalService }, { type: StorageService }, { type: NswhpAuthService }]; }, null);
    })();

    var AzureLoginComponent = /** @class */ (function () {
        function AzureLoginComponent(aadService, router, activatedRoute, storage) {
            this.aadService = aadService;
            this.router = router;
            this.activatedRoute = activatedRoute;
            this.storage = storage;
            this.azureInstanceAD = 'NSW Health Employee';
        }
        AzureLoginComponent.prototype.handleLoginRouting = function () {
            return __awaiter(this, void 0, void 0, function () {
                var routeParams, lastLocation;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            routeParams = this.activatedRoute.snapshot.params.tenantConfigId;
                            if (!routeParams) return [3 /*break*/, 4];
                            this.aadService.initialiseAdalServiceWithConfig(routeParams);
                            this.aadService.handleWindowCallbackFromAzureLogin();
                            lastLocation = this.storage.retrieveLastLocation();
                            this.storage.clearLastLocation();
                            if (!lastLocation) return [3 /*break*/, 1];
                            // Use href to simplify the process of restoring and routing
                            // route parameters and query parameters
                            // When we return from a 401 back to a route that has query params
                            // e.g. the Diagnostic Report screen, we want those query params
                            // to be included
                            window.location.href = lastLocation;
                            return [3 /*break*/, 3];
                        case 1: return [4 /*yield*/, this.router.navigate([''])];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3: return [3 /*break*/, 5];
                        case 4:
                            // there is only one login for this app, just pick it
                            this.selectAzureInstance(this.azureInstanceAD);
                            _a.label = 5;
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        AzureLoginComponent.prototype.ngOnInit = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.debug('LOGIN onInit');
                            return [4 /*yield*/, this.handleLoginRouting()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        AzureLoginComponent.prototype.selectAzureInstance = function (instance) {
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
        };
        return AzureLoginComponent;
    }());
    AzureLoginComponent.ɵfac = function AzureLoginComponent_Factory(t) { return new (t || AzureLoginComponent)(i0.ɵɵdirectiveInject(AadService), i0.ɵɵdirectiveInject(i1$1.Router), i0.ɵɵdirectiveInject(i1$1.ActivatedRoute), i0.ɵɵdirectiveInject(StorageService)); };
    AzureLoginComponent.ɵcmp = i0.ɵɵdefineComponent({ type: AzureLoginComponent, selectors: [["lib-azure-login"]], decls: 3, vars: 1, consts: [[1, "mat-elevation-z2", "form-container"], ["color", "accent", "mat-raised-button", "", 1, "big", 3, "click"]], template: function AzureLoginComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "section", 0);
                i0.ɵɵelementStart(1, "button", 1);
                i0.ɵɵlistener("click", function AzureLoginComponent_Template_button_click_1_listener() { return ctx.selectAzureInstance(ctx.azureInstanceAD); });
                i0.ɵɵtext(2);
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵadvance(2);
                i0.ɵɵtextInterpolate1(" ", ctx.azureInstanceAD, " ");
            }
        }, directives: [i5.MatButton], styles: [".big[_ngcontent-%COMP%]{font-size:20px;margin:50px}", ".form-container[_ngcontent-%COMP%]{background-color:#fff;font-weight:700;margin-bottom:12px;margin-left:5px;margin-top:12px;padding:15px}"] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(AzureLoginComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'lib-azure-login',
                        templateUrl: './azure-login.component.html',
                        styleUrls: ['./azure-login.component.css', '../../main.css']
                    }]
            }], function () { return [{ type: AadService }, { type: i1$1.Router }, { type: i1$1.ActivatedRoute }, { type: StorageService }]; }, null);
    })();

    var AzureLogoutComponent = /** @class */ (function () {
        function AzureLogoutComponent(aadService) {
            this.aadService = aadService;
        }
        AzureLogoutComponent.prototype.ngOnInit = function () {
            this.aadService.logoutOfAzure();
        };
        return AzureLogoutComponent;
    }());
    AzureLogoutComponent.ɵfac = function AzureLogoutComponent_Factory(t) { return new (t || AzureLogoutComponent)(i0.ɵɵdirectiveInject(AadService)); };
    AzureLogoutComponent.ɵcmp = i0.ɵɵdefineComponent({ type: AzureLogoutComponent, selectors: [["lib-azure-logout"]], decls: 0, vars: 0, template: function AzureLogoutComponent_Template(rf, ctx) { }, encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(AzureLogoutComponent, [{
                type: i0.Component,
                args: [{
                        template: '',
                        selector: 'lib-azure-logout'
                    }]
            }], function () { return [{ type: AadService }]; }, null);
    })();

    var ContactAdminComponent = /** @class */ (function () {
        function ContactAdminComponent(router) {
            this.router = router;
            this.email = 'NSWPATH-TestCatalogue@health.nsw.gov.au';
            this.subject = 'Requesting Access to the Statewide Test Catalogue';
            this.href = "mailto:" + this.email + "?subject=" + this.subject;
        }
        ContactAdminComponent.prototype.redirect = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.router.navigate(['authentication/login'])];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        return ContactAdminComponent;
    }());
    ContactAdminComponent.ɵfac = function ContactAdminComponent_Factory(t) { return new (t || ContactAdminComponent)(i0.ɵɵdirectiveInject(i1$1.Router)); };
    ContactAdminComponent.ɵcmp = i0.ɵɵdefineComponent({ type: ContactAdminComponent, selectors: [["lib-contact-admin"]], decls: 14, vars: 2, consts: [[1, "container", "h-50"], [1, "row", "align-items-center", "h-100"], [1, "col-10", "mx-auto"], [1, "jumbotron"], [1, "display-4"], [1, "my-4"], [1, "lead"], ["rel", "noopener noreferrer", 3, "href"], ["mat-raised-button", "", "color", "primary", 3, "click"]], template: function ContactAdminComponent_Template(rf, ctx) {
            if (rf & 1) {
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
            }
            if (rf & 2) {
                i0.ɵɵadvance(9);
                i0.ɵɵpropertyInterpolate("href", ctx.href, i0.ɵɵsanitizeUrl);
                i0.ɵɵadvance(1);
                i0.ɵɵtextInterpolate(ctx.email);
            }
        }, directives: [i5.MatButton], styles: ["", ".form-container[_ngcontent-%COMP%]{background-color:#fff;font-weight:700;margin-bottom:12px;margin-left:5px;margin-top:12px;padding:15px}"] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(ContactAdminComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'lib-contact-admin',
                        templateUrl: './contact-admin.component.html',
                        styleUrls: ['./contact-admin.component.scss', '../../main.css']
                    }]
            }], function () { return [{ type: i1$1.Router }]; }, null);
    })();

    var IaDfpService = /** @class */ (function () {
        function IaDfpService() {
            this.IaDfp = IaDfp;
        }
        return IaDfpService;
    }());
    IaDfpService.ɵfac = function IaDfpService_Factory(t) { return new (t || IaDfpService)(); };
    IaDfpService.ɵprov = i0.ɵɵdefineInjectable({ token: IaDfpService, factory: IaDfpService.ɵfac });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(IaDfpService, [{
                type: i0.Injectable
            }], function () { return []; }, null);
    })();

    // Semantics Device Fingerprint library
    var VipService = /** @class */ (function () {
        function VipService(http, router, storage, iaDfpService, nswhpAuthService) {
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
        VipService.prototype.pollUsersPushResponse = function () {
            var _this = this;
            console.debug('Authenticating user with PUSH...');
            var body = JSON.stringify({ transactionId: this.storage.retrieveTransactionId() });
            console.debug('TRANSACTION ID = ' + this.storage.retrieveTransactionId());
            return this.http.post(this.pushUrl, body)
                .pipe(operators.map(function (res) { return _this.extractData(res); }))
                .pipe(operators.catchError(this.handleError.bind(this)));
        };
        /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
         *                                 OTP                                   *
         * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
        // Send otp code for authentication
        VipService.prototype.authenticateOtpCode = function (otpCode) {
            var _this = this;
            console.debug('Authenticating user with OTP...');
            var newDeviceFingerprint = this.getDeviceFingerprint();
            var body = {
                deviceFingerprint: newDeviceFingerprint,
                otp: otpCode
            };
            return this.http.post(this.otpUrl, body)
                .pipe(operators.map(function (res) { return _this.extractData(res); }))
                .pipe(operators.catchError(this.handleError.bind(this)));
        };
        /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
         *                            REGISTRATION                               *
         * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
        // Send the user a SMS OTP code for registration
        VipService.prototype.sendOtpForRegistration = function () {
            var _this = this;
            console.debug('Creating VIP Account and sending user SMS OTP code...');
            var newDeviceFingerprint = this.getDeviceFingerprint();
            var body = {
                deviceFingerprint: newDeviceFingerprint
            };
            return this.http.post(this.sendOtpUrl, body)
                .pipe(operators.map(function (res) { return _this.extractData(res); }))
                .pipe(operators.catchError(this.handleError.bind(this)));
        };
        // Send user information for VIP registration
        VipService.prototype.submitVipRegistration = function (newCredentialId, newOtp1, newOtp2, newTempOtp) {
            var _this = this;
            console.debug('Submitting user\'s VIP registration...');
            var newDeviceFingerprint = this.getDeviceFingerprint();
            var body = {
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
                .pipe(operators.tap(function (res) { return _this.extractData(res); }, operators.catchError(this.handleError.bind(this))));
        };
        // Return to the last location the user made a http request and got a 401
        VipService.prototype.redirectToLastLocation = function () {
            console.debug('### VIP SERVICE: redirectToLastLocation');
            var lastLocation = this.storage.retrieveLastLocation();
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
        };
        /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
        VipService.prototype.getDeviceFingerprint = function () {
            return this.iaDfpService.IaDfp.readFingerprint();
        };
        VipService.prototype.extractData = function (res) {
            console.debug('>>> VIP SERVICE: ');
            console.debug(res);
            // Store the Vip token if returned here so the components don't have to think about it
            if (res.vipToken) {
                this.storage.storeVipToken(res.vipToken);
            }
            return res;
        };
        /**
         * If the error is a 403 navigate to the Contact Admin page, otherwise bubble
         * the error up
         */
        VipService.prototype.handleError = function (error) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(error.status === 403)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.handleContactAdmin(error)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, rxjs.EMPTY];
                        case 2: return [2 /*return*/, rxjs.throwError(error)];
                    }
                });
            });
        };
        VipService.prototype.handleContactAdmin = function (error) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.debug('Handling Operation Not Allowed');
                            console.debug('User is unable to continue authorization process.');
                            console.debug(error.error.detailMessage);
                            console.debug('Redirecting user to contact admin page...');
                            // To be implemented under DT-1138
                            return [4 /*yield*/, this.router.navigate(['/authentication/contact-admin/' + error.error.requestId])];
                        case 1:
                            // To be implemented under DT-1138
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        return VipService;
    }());
    VipService.ɵfac = function VipService_Factory(t) { return new (t || VipService)(i0.ɵɵinject(i1$2.HttpClient), i0.ɵɵinject(i1$1.Router), i0.ɵɵinject(StorageService), i0.ɵɵinject(IaDfpService), i0.ɵɵinject(NswhpAuthService)); };
    VipService.ɵprov = i0.ɵɵdefineInjectable({ token: VipService, factory: VipService.ɵfac });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(VipService, [{
                type: i0.Injectable
            }], function () { return [{ type: i1$2.HttpClient }, { type: i1$1.Router }, { type: StorageService }, { type: IaDfpService }, { type: NswhpAuthService }]; }, null);
    })();

    var TickComponent = /** @class */ (function () {
        function TickComponent() {
        }
        TickComponent.prototype.ngOnInit = function () {
        };
        return TickComponent;
    }());
    TickComponent.ɵfac = function TickComponent_Factory(t) { return new (t || TickComponent)(); };
    TickComponent.ɵcmp = i0.ɵɵdefineComponent({ type: TickComponent, selectors: [["lib-tick"]], decls: 6, vars: 0, consts: [[1, "checkmark"], ["version", "1.1", "id", "Layer_1", "xmlns", "http://www.w3.org/2000/svg", 0, "xmlns", "xlink", "http://www.w3.org/1999/xlink", "x", "0px", "y", "0px", "viewBox", "0 0 161.2 161.2", "enable-background", "new 0 0 161.2 161.2", 0, "xml", "space", "preserve"], ["fill", "none", "stroke", "#7DB0D5", "stroke-miterlimit", "10", "d", "M425.9,52.1L425.9,52.1c-2.2-2.6-6-2.6-8.3-0.1l-42.7,46.2l-14.3-16.4\n\tc-2.3-2.7-6.2-2.7-8.6-0.1c-1.9,2.1-2,5.6-0.1,7.7l17.6,20.3c0.2,0.3,0.4,0.6,0.6,0.9c1.8,2,4.4,2.5,6.6,1.4c0.7-0.3,1.4-0.8,2-1.5\n\tc0.3-0.3,0.5-0.6,0.7-0.9l46.3-50.1C427.7,57.5,427.7,54.2,425.9,52.1z", 1, "path"], ["fill", "none", "stroke", "rgba(155, 255, 177, 1)", "stroke-width", "4", "stroke-miterlimit", "10", "cx", "80.6", "cy", "80.6", "r", "62.1", 1, "path"], ["fill", "none", "stroke", "rgba(155, 255, 177, 1)", "stroke-width", "6", "stroke-linecap", "round", "stroke-miterlimit", "10", "points", "113,52.8\n\t74.1,108.4 48.2,86.4 ", 1, "path"], ["fill", "none", "stroke", "rgba(155, 255, 177, 1)", "stroke-width", "4", "stroke-miterlimit", "10", "stroke-dasharray", "12.2175,12.2175", "cx", "80.6", "cy", "80.6", "r", "73.9", 1, "spin"]], template: function TickComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "div", 0);
                i0.ɵɵnamespaceSVG();
                i0.ɵɵelementStart(1, "svg", 1);
                i0.ɵɵelement(2, "path", 2);
                i0.ɵɵelement(3, "circle", 3);
                i0.ɵɵelement(4, "polyline", 4);
                i0.ɵɵelement(5, "circle", 5);
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
            }
        }, styles: [".checkmark[_ngcontent-%COMP%]{margin:0 auto;padding-top:40px;width:200px}.path[_ngcontent-%COMP%]{-webkit-animation:dash 2s ease-in-out;animation:dash 2s ease-in-out;stroke-dasharray:1000;stroke-dashoffset:0}.spin[_ngcontent-%COMP%]{-webkit-animation:spin 2s;-webkit-transform-origin:50% 50%;animation:spin 2s;transform-origin:50% 50%}@keyframes dash{0%{stroke-dashoffset:1000}to{stroke-dashoffset:0}}@keyframes spin{0%{-webkit-transform:rotate(0deg)}to{-webkit-transform:rotate(1turn)}}@keyframes text{0%{opacity:0}to{opacity:1}}"] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(TickComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'lib-tick',
                        templateUrl: './tick.component.html',
                        styleUrls: ['./tick.component.css']
                    }]
            }], function () { return []; }, null);
    })();

    function OtpComponent_div_1_p_5_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "p", 10);
            i0.ɵɵtext(1, "Failed to authenticate OTP, please try again.");
            i0.ɵɵelementEnd();
        }
    }
    var _c0 = function (a0) { return { "invalid-input": a0 }; };
    function OtpComponent_div_1_Template(rf, ctx) {
        if (rf & 1) {
            var _r5_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div");
            i0.ɵɵelementStart(1, "h2");
            i0.ɵɵtext(2, "Please enter your Security Code below and press Submit");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "h3");
            i0.ɵɵtext(4, "You can find your Security Code in your VIP Access mobile app or desktop app");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(5, OtpComponent_div_1_p_5_Template, 2, 0, "p", 2);
            i0.ɵɵelementStart(6, "form", 3);
            i0.ɵɵlistener("submit", function OtpComponent_div_1_Template_form_submit_6_listener() { i0.ɵɵrestoreView(_r5_1); var _r3 = i0.ɵɵreference(10); var ctx_r4 = i0.ɵɵnextContext(); return ctx_r4.onSubmit(_r3.value); });
            i0.ɵɵelementStart(7, "div", 4);
            i0.ɵɵelementStart(8, "mat-form-field", 5);
            i0.ɵɵelementStart(9, "input", 6, 7);
            i0.ɵɵlistener("keypress", function OtpComponent_div_1_Template_input_keypress_9_listener() { i0.ɵɵrestoreView(_r5_1); var ctx_r6 = i0.ɵɵnextContext(); return ctx_r6.enteringOtp(); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "div", 8);
            i0.ɵɵelementStart(12, "button", 9);
            i0.ɵɵtext(13);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngIf", ctx_r0.failed);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(3, _c0, ctx_r0.failed));
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate1(" ", ctx_r0.submitButtonText, " ");
        }
    }
    function OtpComponent_div_2_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div");
            i0.ɵɵelementStart(1, "h1");
            i0.ɵɵtext(2, "Success!");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(3, "lib-tick");
            i0.ɵɵelementEnd();
        }
    }
    var OtpComponent = /** @class */ (function () {
        function OtpComponent(vipService) {
            this.vipService = vipService;
            this.submitted = false;
            this.authenticated = false;
            this.failed = false;
            this.submitButtonText = 'Submit';
        }
        OtpComponent.prototype.ngOnInit = function () {
        };
        OtpComponent.prototype.onSubmit = function (code) {
            var _this = this;
            if (!this.submitted) {
                this.submitted = true;
                this.submitButtonText = 'Submitting...';
                this.vipService.authenticateOtpCode(code).subscribe(function (response) { _this.handleSuccessfulOtpAuthentication(response); }, function () { _this.handleFailedOtpAuthentication(); });
            }
            return false; // Don't cause a reload
        };
        OtpComponent.prototype.handleSuccessfulOtpAuthentication = function (response) {
            console.debug(response);
            this.authenticated = true;
            this.failed = false;
            // NOTE: VipService intercepts the response and stores the Vip token
            this.vipService.redirectToLastLocation();
        };
        OtpComponent.prototype.handleFailedOtpAuthentication = function () {
            this.submitted = false;
            this.failed = true;
            this.submitButtonText = 'Try Again';
        };
        // Turn the input green again when the user starts changing the otp code
        OtpComponent.prototype.enteringOtp = function () {
            this.failed = false;
        };
        return OtpComponent;
    }());
    OtpComponent.ɵfac = function OtpComponent_Factory(t) { return new (t || OtpComponent)(i0.ɵɵdirectiveInject(VipService)); };
    OtpComponent.ɵcmp = i0.ɵɵdefineComponent({ type: OtpComponent, selectors: [["lib-otp"]], decls: 3, vars: 2, consts: [[1, "mat-elevation-z2", "form-container"], [4, "ngIf"], ["class", "invalid-input-message", 4, "ngIf"], [3, "submit"], [1, "container-body"], [1, "search-form-field"], ["matFormFieldControl", "", "matInput", "", "type", "text", "placeholder", "SECURITY CODE", "required", "", 3, "ngClass", "keypress"], ["otpCode", ""], [1, "container-button"], ["mat-button", "", "matSuffix", "", "color", "accent", "mat-raised-button", "", "id", "submit", "type", "submit"], [1, "invalid-input-message"]], template: function OtpComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "section", 0);
                i0.ɵɵtemplate(1, OtpComponent_div_1_Template, 14, 5, "div", 1);
                i0.ɵɵtemplate(2, OtpComponent_div_2_Template, 4, 0, "div", 1);
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", !ctx.authenticated);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", ctx.authenticated);
            }
        }, directives: [i3$1.NgIf, i3.MatFormField, i4.MatInput, i3$1.NgClass, i5.MatButton, i3.MatSuffix, TickComponent], styles: ["", ".form-container[_ngcontent-%COMP%]{background-color:#fff;font-weight:700;margin-bottom:12px;margin-left:5px;margin-top:12px;padding:15px}"] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(OtpComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'lib-otp',
                        templateUrl: './otp.component.html',
                        styleUrls: ['./otp.component.scss', '../../main.css']
                    }]
            }], function () { return [{ type: VipService }]; }, null);
    })();

    var SpinnerComponent = /** @class */ (function () {
        function SpinnerComponent() {
            this.isDelayedRunning = false;
        }
        Object.defineProperty(SpinnerComponent.prototype, "isRunning", {
            set: function (value) {
                this.isDelayedRunning = value;
            },
            enumerable: false,
            configurable: true
        });
        return SpinnerComponent;
    }());
    SpinnerComponent.ɵfac = function SpinnerComponent_Factory(t) { return new (t || SpinnerComponent)(); };
    SpinnerComponent.ɵcmp = i0.ɵɵdefineComponent({ type: SpinnerComponent, selectors: [["lib-spinner"]], inputs: { isRunning: "isRunning" }, decls: 3, vars: 1, consts: [[1, "spinner", 3, "hidden"], [1, "double-bounce1"], [1, "double-bounce2"]], template: function SpinnerComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "div", 0);
                i0.ɵɵelement(1, "div", 1);
                i0.ɵɵelement(2, "div", 2);
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵproperty("hidden", !ctx.isDelayedRunning);
            }
        }, styles: [".spinner[_ngcontent-%COMP%]{height:250px;margin:50px auto;position:relative;width:250px}.double-bounce1[_ngcontent-%COMP%], .double-bounce2[_ngcontent-%COMP%]{animation:sk-bounce 2s ease-in-out infinite;background-color:rgba(155,255,177,.5);border-radius:50%;height:100%;left:0;opacity:.6;position:absolute;top:0;width:100%}.double-bounce2[_ngcontent-%COMP%]{animation-delay:-1s}@keyframes sk-bounce{0%,to{-webkit-transform:scale(0);transform:scale(0)}50%{-webkit-transform:scale(1);transform:scale(1)}}"] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(SpinnerComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'lib-spinner',
                        templateUrl: './spinner.component.html',
                        styleUrls: ['./spinner.component.css']
                    }]
            }], function () { return []; }, { isRunning: [{
                    type: i0.Input
                }] });
    })();

    function PushComponent_div_1_Template(rf, ctx) {
        if (rf & 1) {
            var _r3_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div");
            i0.ɵɵelementStart(1, "h2");
            i0.ɵɵtext(2, "A push notification has been sent to your mobile device.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "h3");
            i0.ɵɵtext(4, "Waiting for Sign in Request to be approved...");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(5, "lib-spinner", 2);
            i0.ɵɵelementStart(6, "h3");
            i0.ɵɵtext(7, "Please do not refresh this page");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "button", 3);
            i0.ɵɵlistener("click", function PushComponent_div_1_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r3_1); var ctx_r2 = i0.ɵɵnextContext(); return ctx_r2.useOTP(); });
            i0.ɵɵtext(9, "Use OTP Instead");
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("isRunning", ctx_r0.waiting);
        }
    }
    function PushComponent_div_2_div_5_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div");
            i0.ɵɵelement(1, "lib-tick");
            i0.ɵɵelementEnd();
        }
    }
    function PushComponent_div_2_div_6_Template(rf, ctx) {
        if (rf & 1) {
            var _r7_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div");
            i0.ɵɵelementStart(1, "button", 3);
            i0.ɵɵlistener("click", function PushComponent_div_2_div_6_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r7_1); var ctx_r6 = i0.ɵɵnextContext(2); return ctx_r6.useOTP(); });
            i0.ɵɵtext(2, "Use OTP Instead");
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
    }
    function PushComponent_div_2_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div");
            i0.ɵɵelementStart(1, "h1");
            i0.ɵɵtext(2);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "h2");
            i0.ɵɵtext(4);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(5, PushComponent_div_2_div_5_Template, 2, 0, "div", 1);
            i0.ɵɵtemplate(6, PushComponent_div_2_div_6_Template, 3, 0, "div", 1);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r1 = i0.ɵɵnextContext();
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx_r1.statusMessage);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx_r1.detailMessage);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r1.success);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !ctx_r1.success);
        }
    }
    var PushComponent = /** @class */ (function () {
        function PushComponent(router, vipService) {
            this.router = router;
            this.vipService = vipService;
            this.statusMessage = '';
            this.detailMessage = '';
        }
        PushComponent.prototype.ngOnInit = function () {
            var _this = this;
            // Call API and wait for response
            this.waiting = true;
            this.vipService.pollUsersPushResponse().subscribe(function (response) {
                _this.handleSuccessfulPush(response);
            }, function (error) {
                _this.handleFailedPush(error);
            });
        };
        PushComponent.prototype.handleSuccessfulPush = function (response) {
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
        };
        PushComponent.prototype.handleFailedPush = function (error) {
            console.debug('ERROR: Did not receive user\'s push acceptance');
            console.error(error);
            console.error(error.error);
            // Hide the waiting screen and show failure!
            this.waiting = false;
            this.success = false;
            var err = error.error;
            this.statusMessage = err.statusMessage;
            this.detailMessage = err.detailMessage;
        };
        PushComponent.prototype.useOTP = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.debug('User has selected to use OTP instead of Push. Redirecting...');
                            return [4 /*yield*/, this.router.navigate(['authentication/otp'])];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        return PushComponent;
    }());
    PushComponent.ɵfac = function PushComponent_Factory(t) { return new (t || PushComponent)(i0.ɵɵdirectiveInject(i1$1.Router), i0.ɵɵdirectiveInject(VipService)); };
    PushComponent.ɵcmp = i0.ɵɵdefineComponent({ type: PushComponent, selectors: [["lib-push"]], decls: 3, vars: 2, consts: [[1, "mat-elevation-z2", "form-container"], [4, "ngIf"], [3, "isRunning"], ["mat-button", "", "mat-raised-button", "", "color", "primary", 3, "click"]], template: function PushComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "section", 0);
                i0.ɵɵtemplate(1, PushComponent_div_1_Template, 10, 1, "div", 1);
                i0.ɵɵtemplate(2, PushComponent_div_2_Template, 7, 4, "div", 1);
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", ctx.waiting);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", !ctx.waiting);
            }
        }, directives: [i3$1.NgIf, SpinnerComponent, i5.MatButton, TickComponent], styles: ["", ".form-container[_ngcontent-%COMP%]{background-color:#fff;font-weight:700;margin-bottom:12px;margin-left:5px;margin-top:12px;padding:15px}"] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(PushComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'lib-push',
                        templateUrl: './push.component.html',
                        styleUrls: ['./push.component.scss', '../../main.css']
                    }]
            }], function () { return [{ type: i1$1.Router }, { type: VipService }]; }, null);
    })();

    function RegisterComponent_h3_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "h3");
            i0.ɵɵtext(1, "Failed Registration.");
            i0.ɵɵelement(2, "br");
            i0.ɵɵtext(3, "We have sent you a new SMS code. Please try again.");
            i0.ɵɵelementEnd();
        }
    }
    function RegisterComponent_div_24_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div");
            i0.ɵɵelementStart(1, "p");
            i0.ɵɵtext(2, "Sending SMS code to your mobile device...");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "mat-chip-list");
            i0.ɵɵelementStart(4, "mat-chip", 15);
            i0.ɵɵtext(5, "Waiting for SMS code...");
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
    }
    function RegisterComponent_p_25_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "p");
            i0.ɵɵtext(1);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r5 = i0.ɵɵnextContext();
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate1("SMS Code has been sent to +", ctx_r5.mobileNumber, "");
        }
    }
    var _c0$1 = function (a0) { return { "hidden": a0 }; };
    var _c1 = function (a0) { return { "invalid-input": a0 }; };
    var _c2 = function (a0, a1) { return { "invalid-input": a0, "hidden": a1 }; };
    var RegisterComponent = /** @class */ (function () {
        function RegisterComponent(router, vipService) {
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
        RegisterComponent.prototype.ngOnInit = function () {
            // Send SMS OTP code for registration
            this.initiateRegistrationProcess();
        };
        RegisterComponent.prototype.initiateRegistrationProcess = function () {
            var _this = this;
            this.smsCodeSent = false;
            this.validInputs = [true, true, true, true];
            this.vipService.sendOtpForRegistration().subscribe(function (response) {
                console.debug(response);
                _this.smsCodeSent = true;
                _this.mobileNumber = response.mobileNumber;
            }, function (error) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.debug('Error sending SMS code to user for registration...');
                            console.debug(error);
                            // TODO: Do we want to handle better
                            // We need to pass in the request id to the page
                            return [4 /*yield*/, this.router.navigate(['/authentication/contact-admin'])];
                        case 1:
                            // TODO: Do we want to handle better
                            // We need to pass in the request id to the page
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        };
        RegisterComponent.prototype.onSubmit = function (credentialId, otp1, otp2, tempOtp) {
            var _this = this;
            if (this.allInputsValid(credentialId, otp1, otp2, tempOtp)) {
                this.submitButtonText = 'Registering...';
                this.vipService.submitVipRegistration(credentialId, otp1, otp2, tempOtp).subscribe(function (response) { _this.handleSuccessfulRegistration(response); }, function (error) { _this.handleFailedRegistration(error); });
            }
            return false; // Don't cause a reload
        };
        RegisterComponent.prototype.handleSuccessfulRegistration = function (response) {
            console.debug('SUCCESS: User registered with VIP');
            console.debug('vipToken: ' + response.vipToken);
            console.debug(response);
            // Notify the user of successful registration and show home button
            this.registered = true;
            this.failed = false;
            this.statusMessage = response.statusMessage;
            // NOTE: VipService intercepts the response and stores the Vip token
            this.vipService.redirectToLastLocation();
        };
        // If registration fails for any reason (we assume all inputs passed validation - even though current validation is minimal)
        // we will send a new SMS code and clear all inputs so user can begin registration process again
        RegisterComponent.prototype.handleFailedRegistration = function (error) {
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
        };
        /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
        RegisterComponent.prototype.validateInput = function (input) {
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
                var nums = /^[0-9]*$/;
                if (!input.value.match(nums)) {
                    this.validInputs[parseInt(input.id, 10)] = false;
                    this.invalidInputMessage = 'Codes may only contains numbers';
                }
            }
            console.debug(this.validInputs);
        };
        RegisterComponent.prototype.allInputsValid = function (credentialId, otp1, otp2, tempOtp) {
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
        };
        return RegisterComponent;
    }());
    RegisterComponent.ɵfac = function RegisterComponent_Factory(t) { return new (t || RegisterComponent)(i0.ɵɵdirectiveInject(i1$1.Router), i0.ɵɵdirectiveInject(VipService)); };
    RegisterComponent.ɵcmp = i0.ɵɵdefineComponent({ type: RegisterComponent, selectors: [["lib-register"]], decls: 35, vars: 32, consts: [[1, "mat-elevation-z2", "form-container"], [4, "ngIf"], [3, "ngClass"], [1, "invalid-input-message"], ["autocomplete", "off", 3, "submit"], ["href", "https://vip.symantec.com/", "target", "_blank", "rel", "external nofollow noopener"], ["matInput", "", "name", "credentialId", "type", "text", "required", "", "placeholder", "Enter VIP Credential ID", "id", "0", 3, "value", "ngClass", "change"], ["credentialId", ""], ["matInput", "", "required", "", "type", "text", "placeholder", "FIRST SECURITY CODE", "id", "1", 3, "value", "ngClass", "change"], ["otp1", ""], ["matInput", "", "required", "", "type", "text", "placeholder", "SECOND SECURITY CODE", "id", "2", 3, "value", "ngClass", "change"], ["otp2", ""], ["matInput", "", "required", "", "type", "text", "placeholder", "SMS CODE", "id", "3", 3, "value", "ngClass", "change"], ["tempOtp", ""], ["mat-button", "", "mat-raised-button", "", "color", "primary", "id", "submit", "type", "submit", 3, "ngClass"], ["selectable", "false"]], template: function RegisterComponent_Template(rf, ctx) {
            if (rf & 1) {
                var _r7_1 = i0.ɵɵgetCurrentView();
                i0.ɵɵelementStart(0, "section", 0);
                i0.ɵɵtemplate(1, RegisterComponent_h3_1_Template, 4, 0, "h3", 1);
                i0.ɵɵelementStart(2, "div", 2);
                i0.ɵɵelementStart(3, "p", 3);
                i0.ɵɵtext(4);
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(5, "form", 4);
                i0.ɵɵlistener("submit", function RegisterComponent_Template_form_submit_5_listener() { i0.ɵɵrestoreView(_r7_1); var _r1 = i0.ɵɵreference(12); var _r2 = i0.ɵɵreference(20); var _r3 = i0.ɵɵreference(23); var _r6 = i0.ɵɵreference(28); return ctx.onSubmit(_r1.value, _r2.value, _r3.value, _r6.value); });
                i0.ɵɵelementStart(6, "p");
                i0.ɵɵtext(7, "Download Symantec VIP Access for desktop or mobile ");
                i0.ɵɵelementStart(8, "a", 5);
                i0.ɵɵtext(9, "here.");
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(10, "mat-form-field");
                i0.ɵɵelementStart(11, "input", 6, 7);
                i0.ɵɵlistener("change", function RegisterComponent_Template_input_change_11_listener() { i0.ɵɵrestoreView(_r7_1); var _r1 = i0.ɵɵreference(12); return ctx.validateInput(_r1); });
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(13, "p");
                i0.ɵɵtext(14, "Please enter two ");
                i0.ɵɵelementStart(15, "u");
                i0.ɵɵtext(16, "sequential");
                i0.ɵɵelementEnd();
                i0.ɵɵtext(17, " security codes");
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(18, "mat-form-field");
                i0.ɵɵelementStart(19, "input", 8, 9);
                i0.ɵɵlistener("change", function RegisterComponent_Template_input_change_19_listener() { i0.ɵɵrestoreView(_r7_1); var _r2 = i0.ɵɵreference(20); return ctx.validateInput(_r2); });
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(21, "mat-form-field");
                i0.ɵɵelementStart(22, "input", 10, 11);
                i0.ɵɵlistener("change", function RegisterComponent_Template_input_change_22_listener() { i0.ɵɵrestoreView(_r7_1); var _r3 = i0.ɵɵreference(23); return ctx.validateInput(_r3); });
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵtemplate(24, RegisterComponent_div_24_Template, 6, 0, "div", 1);
                i0.ɵɵtemplate(25, RegisterComponent_p_25_Template, 2, 1, "p", 1);
                i0.ɵɵelementStart(26, "mat-form-field");
                i0.ɵɵelementStart(27, "input", 12, 13);
                i0.ɵɵlistener("change", function RegisterComponent_Template_input_change_27_listener() { i0.ɵɵrestoreView(_r7_1); var _r6 = i0.ɵɵreference(28); return ctx.validateInput(_r6); });
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(29, "button", 14);
                i0.ɵɵtext(30);
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(31, "div", 2);
                i0.ɵɵelementStart(32, "h3");
                i0.ɵɵtext(33);
                i0.ɵɵelementEnd();
                i0.ɵɵelement(34, "lib-tick");
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", ctx.failed);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(17, _c0$1, ctx.registered));
                i0.ɵɵadvance(2);
                i0.ɵɵtextInterpolate(ctx.invalidInputMessage);
                i0.ɵɵadvance(7);
                i0.ɵɵproperty("value", ctx.credentialIdValue)("ngClass", i0.ɵɵpureFunction1(19, _c1, !ctx.validInputs[0]));
                i0.ɵɵadvance(8);
                i0.ɵɵproperty("value", ctx.otp1Value)("ngClass", i0.ɵɵpureFunction1(21, _c1, !ctx.validInputs[1]));
                i0.ɵɵadvance(3);
                i0.ɵɵproperty("value", ctx.otp2Value)("ngClass", i0.ɵɵpureFunction1(23, _c1, !ctx.validInputs[2]));
                i0.ɵɵadvance(2);
                i0.ɵɵproperty("ngIf", !ctx.smsCodeSent);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", ctx.smsCodeSent);
                i0.ɵɵadvance(2);
                i0.ɵɵproperty("value", ctx.tempOtpValue)("ngClass", i0.ɵɵpureFunction2(25, _c2, !ctx.validInputs[3], !ctx.smsCodeSent));
                i0.ɵɵadvance(2);
                i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(28, _c0$1, !ctx.smsCodeSent));
                i0.ɵɵadvance(1);
                i0.ɵɵtextInterpolate(ctx.submitButtonText);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(30, _c0$1, !ctx.registered));
                i0.ɵɵadvance(2);
                i0.ɵɵtextInterpolate(ctx.statusMessage);
            }
        }, directives: [i3$1.NgIf, i3$1.NgClass, i3.MatFormField, i4.MatInput, i5.MatButton, TickComponent, i8.MatChipList, i8.MatChip], styles: ["form[_ngcontent-%COMP%]{display:flex;flex-direction:column}", ".form-container[_ngcontent-%COMP%]{background-color:#fff;font-weight:700;margin-bottom:12px;margin-left:5px;margin-top:12px;padding:15px}"] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(RegisterComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'lib-register',
                        templateUrl: './register.component.html',
                        styleUrls: ['./register.component.scss', '../../main.css']
                    }]
            }], function () { return [{ type: i1$1.Router }, { type: VipService }]; }, null);
    })();

    var AuthenticationInterceptorService = /** @class */ (function () {
        function AuthenticationInterceptorService(aadService, storageService, router, http, iaDfpService, nswhpAuthService) {
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
        AuthenticationInterceptorService.prototype.intercept = function (request, next) {
            request = this.addAuthHeaders(request);
            return next.handle(request).pipe(operators.catchError(this.handleError.bind(this)));
        };
        AuthenticationInterceptorService.prototype.addAuthHeaders = function (request) {
            var headers = {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE',
                'Access-Control-Max-Age': '3600',
                'Access-Control-Allow-Headers': 'x-requested-with'
            };
            // These have been added separately since string interpolation is not supported for object keys
            var aadToken = this.aadService.retrieveAadToken();
            if (aadToken) {
                headers[this.AAD_TOKEN_HEADER] = aadToken;
            }
            var vipToken = this.storageService.retrieveVipToken();
            if (vipToken) {
                headers[this.VIP_TOKEN_HEADER] = vipToken;
            }
            request = request.clone({
                setHeaders: headers
            });
            return request;
        };
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
        AuthenticationInterceptorService.prototype.handleUserAuthorization = function (error) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // Store the user context so we can return here after handling the 401
                            this.storageService.storeLastLocation();
                            if (!this.isNewAadTokenRequired(error)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.router.navigate(['authentication/login'])];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            this.getVipToken();
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        AuthenticationInterceptorService.prototype.handleError = function (error) {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = error.status;
                            switch (_a) {
                                case HttpStatus.UNAUTHORIZED: return [3 /*break*/, 1];
                                case HttpStatus.FORBIDDEN: return [3 /*break*/, 3];
                            }
                            return [3 /*break*/, 5];
                        case 1:
                            console.debug('401 received, redirecting to login');
                            return [4 /*yield*/, this.handleUserAuthorization(error)];
                        case 2:
                            _b.sent();
                            return [3 /*break*/, 6];
                        case 3:
                            console.debug('403 received in AuthenticationInterceptor, redirecting to contact admin');
                            return [4 /*yield*/, this.router.navigate(['/authentication/contact-admin'])];
                        case 4:
                            _b.sent();
                            return [2 /*return*/, rxjs.EMPTY];
                        case 5: return [2 /*return*/, rxjs.throwError(error)];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * If the error contains 'VIP' then we assume the AAD token is being successfully used
         * and that the 401 is caused by a missing or invalid VIP token
         * @param HttpErrorResponse returned by the call
         */
        AuthenticationInterceptorService.prototype.isNewAadTokenRequired = function (error) {
            var required = true;
            var re = /(vip|VIP)/;
            if (error.error.message.search(re) !== -1) {
                required = false;
            }
            return required;
        };
        /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
         *                             VIP TOKEN                                 *
         * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
        /**
         * Initiates the steps to retrieve a VIP token from the server
         */
        AuthenticationInterceptorService.prototype.getVipToken = function () {
            var _this = this;
            console.debug('Requesting new VIP Token...');
            this.stepUpAuthentication().subscribe(function (response) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logStepUpResponse(response);
                            return [4 /*yield*/, this.handleStepUpAuthentication(response)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); }, function (error) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(error.status === HttpStatus.FORBIDDEN)) return [3 /*break*/, 2];
                            console.error('403 received');
                            // TODO: This
                            return [4 /*yield*/, this.handleContactAdmin(error)];
                        case 1:
                            // TODO: This
                            _a.sent();
                            return [2 /*return*/, rxjs.EMPTY];
                        case 2:
                            if (!(error.status === HttpStatus.NOT_FOUND)) return [3 /*break*/, 4];
                            console.error('404 received');
                            return [4 /*yield*/, this.handleRegistration(error)];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, rxjs.EMPTY];
                        case 4: return [4 /*yield*/, this.handleError(error)];
                        case 5:
                            _a.sent();
                            _a.label = 6;
                        case 6: return [2 /*return*/];
                    }
                });
            }); });
        };
        AuthenticationInterceptorService.prototype.stepUpAuthentication = function () {
            console.debug('User required to step up authentication: ');
            // We can assume that if we are requesting a VIP token we already have a valid AAD Token
            var authorization = this.aadService.retrieveAadToken();
            var newHeaders = new i1$2.HttpHeaders().set(this.AAD_TOKEN_HEADER, authorization);
            var options = {
                headers: newHeaders,
                observe: 'response'
            };
            var newDeviceFingerprint = this.iaDfpService.IaDfp.readFingerprint();
            var json = {
                deviceFingerprint: newDeviceFingerprint
            };
            var body = JSON.stringify(json);
            var url = this.domain + this.stepUpPath;
            console.debug('Sending request: ');
            console.debug('- url: ' + url);
            console.debug('- authorization: ' + authorization);
            console.debug('- body: ' + body);
            return this.http.post(url, body, options);
        };
        AuthenticationInterceptorService.prototype.handleStepUpAuthentication = function (response) {
            return __awaiter(this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            res = response.body;
                            console.debug(response);
                            console.debug(res);
                            // Store transactionId
                            this.storageService.storeTransactionId(res.transactionId);
                            if (!res.risky) return [3 /*break*/, 2];
                            console.debug('User is required to use Multi-Factor Authentication');
                            console.debug("Redirecting user to " + res.medium + " page...");
                            // Wait for the user to press the next button before routing to mfa page
                            return [4 /*yield*/, this.router.navigate(["/authentication/" + res.medium.toString().toLowerCase()])];
                        case 1:
                            // Wait for the user to press the next button before routing to mfa page
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            // Store the token locally
                            this.storageService.storeVipToken(res.vipToken);
                            location.reload();
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        AuthenticationInterceptorService.prototype.logStepUpResponse = function (response) {
            console.debug(response);
            console.debug('\'risky\': ' + response.body.risky);
            console.debug('\'requestId\': ' + response.body.requestId);
            console.debug('\'medium\': ' + response.body.medium);
            console.debug('\'transactionId\': ' + response.body.transactionId);
            console.debug('\'vipToken\': ' + response.body.vipToken);
        };
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
        AuthenticationInterceptorService.prototype.handleContactAdmin = function (error) {
            return __awaiter(this, void 0, void 0, function () {
                var body;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            body = error;
                            console.debug('Handling Operation Not Allowed');
                            console.debug('User is unable to continue authorization process.');
                            console.debug(body.error);
                            console.debug('Redirecting user to contact admin page...');
                            return [4 /*yield*/, this.router.navigate(['/authentication/contact-admin /' + body.requestId])];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        //    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
        //     *                       REGISTRATION LOGIC [404]                        *
        //     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
        AuthenticationInterceptorService.prototype.handleRegistration = function (error) {
            return __awaiter(this, void 0, void 0, function () {
                var body;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            body = error;
                            console.debug('Handling Registration');
                            console.debug('User has not yet registered with VIP');
                            console.debug(body.error);
                            console.debug('Redirecting user to registration page...');
                            return [4 /*yield*/, this.router.navigate(['/authentication/register'])];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        return AuthenticationInterceptorService;
    }());
    AuthenticationInterceptorService.ɵfac = function AuthenticationInterceptorService_Factory(t) { return new (t || AuthenticationInterceptorService)(i0.ɵɵinject(AadService), i0.ɵɵinject(StorageService), i0.ɵɵinject(i1$1.Router), i0.ɵɵinject(i1$2.HttpClient), i0.ɵɵinject(IaDfpService), i0.ɵɵinject(NswhpAuthService)); };
    AuthenticationInterceptorService.ɵprov = i0.ɵɵdefineInjectable({ token: AuthenticationInterceptorService, factory: AuthenticationInterceptorService.ɵfac, providedIn: 'root' });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(AuthenticationInterceptorService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], function () { return [{ type: AadService }, { type: StorageService }, { type: i1$1.Router }, { type: i1$2.HttpClient }, { type: IaDfpService }, { type: NswhpAuthService }]; }, null);
    })();

    var NswhpAuthModule = /** @class */ (function () {
        function NswhpAuthModule() {
        }
        NswhpAuthModule.forRoot = function (config) {
            return {
                ngModule: NswhpAuthModule,
                providers: [
                    { provide: NSWHP_AUTH_CONFIG, useValue: config },
                ]
            };
        };
        return NswhpAuthModule;
    }());
    NswhpAuthModule.ɵmod = i0.ɵɵdefineNgModule({ type: NswhpAuthModule });
    NswhpAuthModule.ɵinj = i0.ɵɵdefineInjector({ factory: function NswhpAuthModule_Factory(t) { return new (t || NswhpAuthModule)(); }, providers: [
            StorageService,
            IaDfpService,
            NswhpAuthMaterialModule,
            {
                provide: i1$2.HTTP_INTERCEPTORS,
                useClass: AuthenticationInterceptorService,
                multi: true
            },
            AadService,
            VipService,
            i1.AdalService
        ], imports: [[
                i3$1.CommonModule,
                NswhpAuthMaterialModule,
            ]] });
    (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NswhpAuthModule, { declarations: [AzureLoginComponent,
                AzureLogoutComponent,
                OtpComponent,
                PushComponent,
                RegisterComponent,
                SpinnerComponent,
                TickComponent,
                ContactAdminComponent], imports: [i3$1.CommonModule,
                NswhpAuthMaterialModule], exports: [AzureLoginComponent,
                AzureLogoutComponent,
                OtpComponent,
                PushComponent,
                RegisterComponent,
                SpinnerComponent,
                TickComponent,
                ContactAdminComponent] });
    })();
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(NswhpAuthModule, [{
                type: i0.NgModule,
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
                            i3$1.CommonModule,
                            NswhpAuthMaterialModule,
                        ],
                        providers: [
                            StorageService,
                            IaDfpService,
                            NswhpAuthMaterialModule,
                            {
                                provide: i1$2.HTTP_INTERCEPTORS,
                                useClass: AuthenticationInterceptorService,
                                multi: true
                            },
                            AadService,
                            VipService,
                            i1.AdalService
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
            }], null, null);
    })();

    var routes = [
        { path: 'authentication/otp', component: OtpComponent },
        { path: 'authentication/login', component: AzureLoginComponent },
        { path: 'authentication/login/:tenantConfigId', component: AzureLoginComponent },
        { path: 'authentication/logout', component: AzureLogoutComponent },
        { path: 'authentication/register', component: RegisterComponent },
        { path: 'authentication/push', component: PushComponent },
        { path: 'authentication/contact-admin', component: ContactAdminComponent }
    ];
    var NswhpAuthRoutingModule = /** @class */ (function () {
        function NswhpAuthRoutingModule() {
        }
        return NswhpAuthRoutingModule;
    }());
    NswhpAuthRoutingModule.ɵmod = i0.ɵɵdefineNgModule({ type: NswhpAuthRoutingModule });
    NswhpAuthRoutingModule.ɵinj = i0.ɵɵdefineInjector({ factory: function NswhpAuthRoutingModule_Factory(t) { return new (t || NswhpAuthRoutingModule)(); }, imports: [[i1$1.RouterModule.forRoot(routes)], i1$1.RouterModule] });
    (function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NswhpAuthRoutingModule, { imports: [i1$1.RouterModule], exports: [i1$1.RouterModule] }); })();
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(NswhpAuthRoutingModule, [{
                type: i0.NgModule,
                args: [{
                        imports: [i1$1.RouterModule.forRoot(routes)],
                        exports: [i1$1.RouterModule]
                    }]
            }], null, null);
    })();

    /*
     * Public API Surface of nswhpauth
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.AzureLoginComponent = AzureLoginComponent;
    exports.AzureLogoutComponent = AzureLogoutComponent;
    exports.ContactAdminComponent = ContactAdminComponent;
    exports.NswhpAuthModule = NswhpAuthModule;
    exports.NswhpAuthRoutingModule = NswhpAuthRoutingModule;
    exports.NswhpAuthService = NswhpAuthService;
    exports.OtpComponent = OtpComponent;
    exports.PushComponent = PushComponent;
    exports.RegisterComponent = RegisterComponent;
    exports.SpinnerComponent = SpinnerComponent;
    exports.TickComponent = TickComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=nswhp-auth-ng10.umd.js.map

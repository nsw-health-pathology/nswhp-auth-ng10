import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IMfaMessage } from '../model/mfaMessage';
import { NswhpAuthService } from '../nswhpauth.service';
import { IaDfpService } from './iadfp.service';
import { StorageService } from './storage.service';
export declare class VipService {
    private http;
    private router;
    private storage;
    private iaDfpService;
    private nswhpAuthService;
    private pushUrl;
    private otpUrl;
    private sendOtpUrl;
    private registerUrl;
    constructor(http: HttpClient, router: Router, storage: StorageService, iaDfpService: IaDfpService, nswhpAuthService: NswhpAuthService);
    pollUsersPushResponse(): Observable<IMfaMessage>;
    authenticateOtpCode(otpCode: string): Observable<IMfaMessage>;
    sendOtpForRegistration(): Observable<any>;
    submitVipRegistration(newCredentialId: string, newOtp1: string, newOtp2: string, newTempOtp: string): Observable<IMfaMessage>;
    redirectToLastLocation(): void;
    private getDeviceFingerprint;
    private extractData;
    /**
     * If the error is a 403 navigate to the Contact Admin page, otherwise bubble
     * the error up
     */
    private handleError;
    private handleContactAdmin;
}

import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NswhpAuthService } from '../nswhpauth.service';
import { AadService } from './aad.service';
import { IaDfpService } from './iadfp.service';
import { StorageService } from './storage.service';
export declare class AuthenticationInterceptorService implements HttpInterceptor {
    private aadService;
    private storageService;
    private router;
    private http;
    private iaDfpService;
    private nswhpAuthService;
    private AAD_TOKEN_HEADER;
    private VIP_TOKEN_HEADER;
    private domain;
    private stepUpPath;
    constructor(aadService: AadService, storageService: StorageService, router: Router, http: HttpClient, iaDfpService: IaDfpService, nswhpAuthService: NswhpAuthService);
    intercept(request: HttpRequest<HttpAuthRequest>, next: HttpHandler): Observable<HttpEvent<any>>;
    addAuthHeaders(request: HttpRequest<HttpAuthRequest>): HttpRequest<HttpAuthRequest>;
    private handleUserAuthorization;
    private handleError;
    /**
     * If the error contains 'VIP' then we assume the AAD token is being successfully used
     * and that the 401 is caused by a missing or invalid VIP token
     * @param HttpErrorResponse returned by the call
     */
    private isNewAadTokenRequired;
    /**
     * Initiates the steps to retrieve a VIP token from the server
     */
    private getVipToken;
    private stepUpAuthentication;
    private handleStepUpAuthentication;
    private logStepUpResponse;
    private handleContactAdmin;
    private handleRegistration;
}
export interface HttpAuthRequest {
    [index: string]: string;
}

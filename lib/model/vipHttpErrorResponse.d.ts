import { HttpErrorResponse } from '@angular/common/http';
export interface VipHttpErrorResonse extends HttpErrorResponse {
    requestId: string;
}

export declare enum MfaMedium {
    OTP = 0,
    push = 1
}
export interface IMfaMessage {
    detailMessage: string;
    medium: MfaMedium;
    mobileNumber: string;
    registrationRequired: boolean;
    requestId: string;
    risky: boolean;
    statusMessage: string;
    transactionId: string;
    vipToken: string;
}

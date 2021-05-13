/**
 * Object returned with a 400 error code from the VIP poll/push endpoint
 */
export interface IMfaMessageErrorMessage {
    success: boolean;
    statusMessage: string;
    detailMessage: string;
    requestId: string;
}

export declare class StorageService {
    private TRANSACTION_ID;
    private VIP_TOKEN;
    private AZURE_INSTANCE;
    private LAST_LOCATION;
    constructor();
    storeVipToken(token: string): void;
    retrieveVipToken(): string;
    clearVipToken(): void;
    storeLastLocation(): void;
    retrieveLastLocation(): string;
    clearLastLocation(): void;
    storeTransactionId(token: string): void;
    retrieveTransactionId(): string;
    clearTransactionId(): void;
    storeAzureInstance(instance: number): void;
    retrieveAzureInstance(): number;
    retrieveAzureTenantId(): string;
    clearAzureInstance(): void;
}

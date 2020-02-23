export interface OperationInfoOptions {
    summary?: string;
    description?: string;
    operationId?: string;
    consumes?: Array<string>;
    produces?: Array<string>;
    security: any;
}
export interface ResponseEntryOptions {
    statusCode: number | string,
    description?: string;
    type?: string;
    schema?: Function | string,
    examples?: {
        [key: string]: any;
    };
    example?: any;
    headers?: {
        [name: string]: {
            type: string;
            description?: string;
            [key: string]: any;
        };
    };
    [key: string]: any;
};

export interface ParametersOptions {
    name: string;
    in?: 'query' | 'header' | 'path' | 'body' | 'cookie';
    description?: string;
    type?: string;
    required?: boolean;
    deprecated?: boolean;
    schema?: { $ref: string };
    examples?: {
        [key: string]: any;
    };
    example?: any;
    default?: any;
    [key: string]: any;
};

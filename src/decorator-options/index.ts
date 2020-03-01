export interface CodeSnippetOptions {
	lang: string;
	snippet: string;
};

export interface CustomEntryOptions {
	[key: string]: any;
};

export interface ModelOptions {
	enabled?: boolean,
};

export interface OperationInfoOptions {
	summary?: string;
	description?: string;
	operationId?: string;
	consumes?: Array<string>;
	produces?: Array<string>;
	security?: any;
};

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
	format?: any;
	[key: string]: any;
};

export interface PropertyOptions {
	type?: Function | string;
	description?: string;
	name?: string;
	itemType?: Function | string;
	required?: boolean;
	example?: any;
	[key: string]: any;
};

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



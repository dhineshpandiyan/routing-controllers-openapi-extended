import { CodeSnippetOptions, CustomEntryOptions, ModelOptions, OperationInfoOptions, 
	ParametersOptions, PropertyOptions, ResponseEntryOptions } from "../decorator-options";

interface ClassBaseArgs {
	target: object;
};

interface MethodBaseArgs {
	target: Function;
	method: string,
};

export interface CodeSnippetsArgs extends MethodBaseArgs {
	options: Array<CodeSnippetOptions>;
};

export interface CustomEntryArgs extends MethodBaseArgs {
	options: CustomEntryOptions;
};

export interface ModelArgs extends ClassBaseArgs {
	options: ModelOptions;
};

export interface OperationInfoArgs extends MethodBaseArgs {
	options: OperationInfoOptions;
};

export interface ParametersArgs extends MethodBaseArgs {
	options: Array<ParametersOptions>;
};

export interface PropertyArgs extends MethodBaseArgs {
	options: PropertyOptions;
};

export interface ResponseEntryArgs extends MethodBaseArgs {
	options: ResponseEntryOptions;
};

export interface TagsArgs extends MethodBaseArgs {
	options: Array<string>;
};

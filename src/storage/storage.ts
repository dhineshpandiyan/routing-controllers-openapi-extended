import { CodeSnippetOptions, CustomEntryOptions, OperationInfoOptions, ParametersOptions, 
	ResponseEntryOptions, 
	ModelOptions,
	PropertyOptions} from '../decorator-options';
import { CodeSnippetsArgs, CustomEntryArgs, ModelArgs, OperationInfoArgs, ParametersArgs, 
	ResponseEntryArgs, TagsArgs, PropertyArgs } from './types';

export class Storage {

	operationInfo: OperationInfoArgs[] = [];
	customEntry: CustomEntryArgs[] = [];
	codeSnippets: CodeSnippetsArgs[] = [];
	tags: TagsArgs[] = [];
	parameters: ParametersArgs[] = [];
	responseEntries: ResponseEntryArgs[] = [];
	models: ModelArgs[] = [];
	properties: PropertyArgs[] = [];

	filterOperationInfoByTarget(target: Function, method: string): Array<OperationInfoOptions> {
		return this.operationInfo
			.filter((entry) => entry.target === target && entry.method === method)
			.map((entry) => entry.options);
	}

	filterCustomEntryByTarget(target: Function, method: string): Array<CustomEntryOptions> {
		return this.customEntry
			.filter((entry) => entry.target === target && entry.method === method)
			.map((entry) => entry.options);
	}

	filterCodeSnippetsByTarget(target: Function, method: string): Array<CodeSnippetOptions> {
		return this.codeSnippets
			.filter((entry) => entry.target === target && entry.method === method)
			.reduce((acc, entry) => {
				acc.push(...entry.options);
				return acc;
			}, [] as CodeSnippetOptions[]);
	}

	filterTagsByTarget(target: Function, method: string): Array<string> {
		return this.tags
			.filter((entry) => entry.target === target && entry.method === method)
			.reduce((acc, entry) => {
				acc.push(...entry.options);
				return acc;
			}, [] as string[]);
	}

	filterParametersByTarget(target: Function, method: string): Array<ParametersOptions> {
		return this.parameters
			.filter((entry) => entry.target === target && entry.method === method)
			.reduce((acc, entry) => {
				acc.push(...entry.options);
				return acc;
			}, [] as ParametersOptions[]);
	}

	filterResponseEntriesByTarget(target: Function, method: string): Array<ResponseEntryOptions> {
		return this.responseEntries
			.filter((entry) => entry.target === target && entry.method === method)
			.map((response) => response.options);
	}

	filterModelByTarget(target: Function): Array<ModelOptions> {
		return this.models.filter((model) => model.target === target)
			.map((model) => model.options);
	}

	filterPropertyByTarget(target: Function): Array<PropertyOptions> {
		return this.properties.filter((property) => property.target === target)
			.map((property) => property.options);
	}

}

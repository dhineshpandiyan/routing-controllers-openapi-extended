import { CustomEntryArgs, OperationInfoArgs, CodeSnippetsArgs, TagsArgs, ParametersArgs } from '../storage';
import { OperationInfoOptions, CustomEntryOptions, CodeSnippetOptions, ParametersOptions } from '../decorator-options';

export class Storage {

    operationInfo: OperationInfoArgs[] = [];
    customEntry: CustomEntryArgs[] = [];
    codeSnippets: CodeSnippetsArgs[] = [];
    tags: TagsArgs[] = [];
    parameters: ParametersArgs[] = [];

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
}

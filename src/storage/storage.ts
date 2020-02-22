import { CustomEntryArgs, PathEntryArgs, CodeSnippetsArgs } from '../storage';
import { PathEntryOptions, CustomEntryOptions, CodeSnippetOptions } from '../decorator-options';

export class Storage {

    pathEntry: PathEntryArgs[] = [];
    customEntry: CustomEntryArgs[] = [];
    codeSnippets: CodeSnippetsArgs[] = [];

    filterPathEntityByTarget(target: Function, method: string): Array<PathEntryOptions> {
        return this.pathEntry
            .filter((entry) => entry.target === target && entry.method === method)
            .map((entry) => entry.options);
    }

    filterCustomEntityByTarget(target: Function, method: string): Array<CustomEntryOptions> {
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
}

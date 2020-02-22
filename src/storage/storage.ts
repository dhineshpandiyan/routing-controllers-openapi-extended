import { CustomEntryArgs, PathEntryArgs, CodeSnippetsArgs } from '../storage';
import { PathEntryOptions } from '../decorator-options';

export class Storage {

    pathEntry: PathEntryArgs[] = [];
    customEntry: CustomEntryArgs[] = [];
    codeSnippets: CodeSnippetsArgs[] = [];

    filterPathEntityByTarget(target: Function, method: string): Array<PathEntryOptions> {
        return this.pathEntry
            .filter((entry) => entry.target === target && entry.method === method)
            .map((entry) => entry.options);
    }
}

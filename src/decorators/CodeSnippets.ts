import { getStorage } from "../storage";
import { CodeSnippetOptions } from "../decorator-options";

export function CodeSnippets(options: Array<CodeSnippetOptions>): Function {
    return function (object: Object, method: string) {
        getStorage().codeSnippets.push({ target: object.constructor, method, options });
    };
}

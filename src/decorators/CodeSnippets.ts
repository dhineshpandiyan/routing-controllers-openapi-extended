import { getStorage } from "../storage";
import { CodeSnippet } from "../decorator-options";

export function CodeSnippets(options: Array<CodeSnippet>): Function {
    return function (object: Object, method: string) {
        getStorage().customEntry.push({ target: object.constructor, method, options });
    };
}

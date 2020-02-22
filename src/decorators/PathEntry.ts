import { getStorage } from "../storage";
import { PathEntryOptions } from "../decorator-options";

export function PathEntry(options: PathEntryOptions): Function {
    return function (object: Object, method: string) {
        getStorage().pathEntry.push({ target: object.constructor, method, options });
    };
}

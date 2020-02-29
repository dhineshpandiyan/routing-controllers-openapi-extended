import { getStorage } from "../storage";
import { ResponseEntryOptions } from "../decorator-options";

export function ResponseEntry(options: ResponseEntryOptions): Function {
    return function (object: Object, method: string) {
        getStorage().responseEntries.push({ target: object.constructor, method, options });
    };
}

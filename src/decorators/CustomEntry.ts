import { getStorage } from "../storage";
import { CustomEntryOptions } from "../decorator-options";

export function CustomEntry(options: CustomEntryOptions): Function {
    return function (object: Object, method: string) {
        getStorage().customEntry.push({ target: object.constructor, method, options });
    };
}

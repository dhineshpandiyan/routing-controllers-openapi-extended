import { getStorage } from "../storage";
import { ParametersOptions } from "../decorator-options";

export function Parameters(options: Array<ParametersOptions>): Function {
    return function (object: Object, method: string) {
        getStorage().parameters.push({ target: object.constructor, method, options });
    };
}

import { getStorage } from "../storage";

export function OperationInfo(options: Array<string>): Function {
    return function (object: Object, method: string) {
        getStorage().tags.push({ target: object.constructor, method, options });
    };
}

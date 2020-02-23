import { getStorage } from "../storage";
import { OperationInfoOptions } from "../decorator-options";

export function OperationInfo(options: OperationInfoOptions): Function {
    return function (object: Object, method: string) {
        getStorage().operationInfo.push({ target: object.constructor, method, options });
    };
}

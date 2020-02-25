import { OperationInfoOptions } from "../../decorator-options";
import { MethodBaseArgs } from './MethodBaseArgs'

export interface OperationInfoArgs extends MethodBaseArgs {

    options: OperationInfoOptions;

}
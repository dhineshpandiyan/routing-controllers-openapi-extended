import { ParametersOptions } from "../../decorator-options";
import { MethodBaseArgs } from './MethodBaseArgs'

export interface ParametersArgs extends MethodBaseArgs {

    options: Array<ParametersOptions>;

}
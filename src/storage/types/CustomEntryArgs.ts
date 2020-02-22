import { CustomEntryOptions } from "../../decorator-options";
import { MethodBaseArgs } from './MethodBaseArgs'

export interface CustomEntryArgs extends MethodBaseArgs {

    options: CustomEntryOptions;

}
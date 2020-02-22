import { PathEntryOptions } from "../../decorator-options";
import { MethodBaseArgs } from './MethodBaseArgs'

export interface PathEntryArgs extends MethodBaseArgs {

    options: PathEntryOptions;

}
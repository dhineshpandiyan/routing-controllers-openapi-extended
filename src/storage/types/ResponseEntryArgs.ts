import { ResponseEntryOptions } from "../../decorator-options";
import { MethodBaseArgs } from './MethodBaseArgs'

export interface ResponseEntryArgs extends MethodBaseArgs {

    options: ResponseEntryOptions;

}
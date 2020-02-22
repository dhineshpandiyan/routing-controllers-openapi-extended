import { CodeSnippetOptions } from "../../decorator-options";
import { MethodBaseArgs } from './MethodBaseArgs'

export interface CodeSnippetsArgs extends MethodBaseArgs {

    options: Array<CodeSnippetOptions>;

}
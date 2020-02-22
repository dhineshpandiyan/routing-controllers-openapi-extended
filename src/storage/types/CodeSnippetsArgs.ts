import { CodeSnippet } from "../../decorator-options";
import { MethodBaseArgs } from './MethodBaseArgs'

export interface CodeSnippetsArgs extends MethodBaseArgs {

    options: Array<CodeSnippet>;

}
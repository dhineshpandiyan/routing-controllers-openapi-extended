import * as _ from 'lodash'
import * as oa from 'openapi3-ts';
import { Route } from './types';
import { getStorage } from '../storage';

function pathEntryParser(target: Function, method: string): oa.OperationObject {
    const pathEntries = getStorage().filterPathEntityByTarget(target, method);

    // @ts-ignore: array spread
    return _.merge(...pathEntries) as oa.OperationObject;
}

function customEntityParser(target: Function, method: string): any {
    const customProperties = getStorage().filterCustomEntityByTarget(target, method);

    // @ts-ignore: array spread
    return _.merge(...customProperties);
}

function codeSnippetParser(target: Function, method: string): any {
    const codeSnippets = getStorage().filterCodeSnippetsByTarget(target, method);

    return codeSnippets.reduce((acc, { lang, snippet }) => {
        acc[lang] = snippet;
        return acc;
    }, {} as { [key: string]: string });
}

export function decoratorParser(route: Route): any {
    const { target, method } = route.action;
    const pathProperties = pathEntryParser(target, method);
    const customProperties = customEntityParser(target, method);
    const codeSnippets = codeSnippetParser(target, method);

    return _.merge(pathProperties, customProperties, codeSnippets);
}

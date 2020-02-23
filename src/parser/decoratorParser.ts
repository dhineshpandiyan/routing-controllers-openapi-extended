import * as _ from 'lodash'
import * as oa from 'openapi3-ts';
import { Route } from './types';
import { getStorage } from '../storage';

function operationInfoParser(target: Function, method: string): oa.OperationObject {
    const operationInfos = getStorage().filterOperationInfoByTarget(target, method);

    // @ts-ignore: array spread
    return _.merge(...operationInfos) as oa.OperationObject;
}

function customEntryParser(target: Function, method: string): any {
    const customProperties = getStorage().filterCustomEntryByTarget(target, method);

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

function getTags(target: Function, method: string): string[] {
    return getStorage().filterTagsByTarget(target, method);
}

export function decoratorParser(route: Route): any {
    const { target, method } = route.action;
    const operationInfoProperties = operationInfoParser(target, method);
    const customProperties = customEntryParser(target, method);
    const codeSnippets = codeSnippetParser(target, method);
    const tags = getTags(target, method);

    return _.merge(operationInfoProperties, customProperties, codeSnippets, tags);
}

import { Route } from './types'
import * as oa from 'openapi3-ts';
import _ = require('lodash');
import { getStorage } from '../storage';
import { ResponseEntryOptions } from '../decorator-options';
import { resolveSchema } from './common';

const TRANSFORM_REQUIRED_PROPERTIES = new Set(['statusCode', 'schema']); 
// function getContentType(route: Route): string {
//     const defaultContentType =
//       route.controller.type === 'json'
//         ? 'application/json'
//         : 'text/html; charset=utf-8'
//     const contentMeta = _.find(route.responseHandlers, { type: 'content-type' })
//     return contentMeta ? contentMeta.value : defaultContentType
// }

function parseResponseEntry(response: ResponseEntryOptions): any {
    const responseObject = Object.keys(response).reduce((acc, key) => {
        if (!TRANSFORM_REQUIRED_PROPERTIES.has(key)) {
            acc[key] = response[key];
        }
        return acc;
    }, {} as { [key: string]: any });
    
    if (response.schema) {
        responseObject.schema = resolveSchema(response.schema);
    }

    return {
        [response.statusCode] : responseObject
    }
}
  
export function getStatusCode(route: Route): string {
    const successMeta = _.find(route.responseHandlers, { type: 'success-code' })
    return successMeta ? successMeta.value + '' : '200'
}

export function getResponses(route: Route): oa.ResponsesObject {
    const { target, method } = route.action;
    const successStatus = getStatusCode(route)
    const responseEntries: ResponseEntryOptions[] = getStorage().filterResponseEntriesByTarget(target, method);
    const customResponses: any = responseEntries.reduce((acc, response) => {
        return _.merge(acc, parseResponseEntry(response));
    }, {})
    const defaultResponse = {
        [successStatus]: {
            description: 'Successful response'
        }
    }

    return _.merge(defaultResponse, customResponses);
}
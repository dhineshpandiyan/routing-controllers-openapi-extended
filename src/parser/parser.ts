import { getStorage } from '../storage';
import { Action } from './types';
import * as oa from 'openapi3-ts';
import { ResponseEntryOptions } from '../decorator-options';
import * as common from './common';

const TRANSFORM_REQUIRED_PROPERTIES = new Set(['statusCode', 'schema']); 

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


function parseResponseEntry(response: ResponseEntryOptions): any {
    const responseObject = Object.keys(response).reduce((acc, key) => {
        if (!TRANSFORM_REQUIRED_PROPERTIES.has(key)) {
            acc[key] = response[key];
        }
        return acc;
    }, {} as { [key: string]: any });
    
    if (response.schema) {
        responseObject.schema = common.resolveSchema(response.schema);
    }

    return {
        [response.statusCode] : responseObject
    }
}

export function getFullPath(action: Action): string {
  // const storage = getStorage();

  // if (storage) {
  //   const controller = storage.controllers.find((c) => c.target === action.target) || { route: '' };
    
  //   return `${controller.route}${action.route}`;
  // }
  return '';
};

export function getResponses(action: Action): oa.ResponsesObject {
  const { target, method } = action;
  const responseEntries: ResponseEntryOptions[] = getStorage().filterResponseEntriesByTarget(target, method);
  const responses: any = responseEntries.reduce((acc, response) => {
      return _.merge(acc, parseResponseEntry(response));
  }, {})

  return responses;
}

export function getTags(action: Action): Array<string> {
  return getStorage().filterTagsByTarget(action.target, action.method);
};

export function getOperationInfo(action: Action): oa.OperationObject {
  const { target, method } = action;
  const operationInfoProperties = operationInfoParser(target, method);
  const customProperties = customEntryParser(target, method);
  const codeSnippets = codeSnippetParser(target, method);

  return _.merge(operationInfoProperties, customProperties, codeSnippets);
};

export function getActionsByController(target: Function): Action[] {
  getStorage();
  // return getStorage().filterActionsWithTarget(target)
  //   .map((action: any) => {
  //     return {
  //       target: action.target,
  //       method: action.method,
  //       type: action.type as String,
  //       path: action.route as String,
  //     } as Action;  
  //   });
  return [];
};

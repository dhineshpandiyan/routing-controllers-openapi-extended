import { MetadataArgsStorage } from './rcTypes';
import { getRCStorage } from '../storage';
import { Action } from './types';
import * as oa from 'openapi3-ts';
import _ = require('lodash');

export function getFullPath(action: Action): string {
  const storage = getRCStorage();

  if (storage) {
    const controller = storage.controllers.find((c) => c.target === action.target) || { route: '' };
    
    return `${controller.route}${action.route}`;
  }
  return '';
}

export function getResponses(action: Action): oa.ResponsesObject {
  const { target, method } = action;
  const storage = getRCStorage();

  if (storage) {
    const responses = storage.filterResponseHandlersWithTargetAndMethod(target, method);
    const { value } = responses.find((r) => r.type === 'success-code') || { value: '200' };
    const statusCode = `${value}`;

    return {
      [statusCode]: {
          description: 'Successful response'
      }
    }
  }
  return {};
}

export function getTags(action: Action): Array<string> {
  return [_.startCase(action.target.name.replace(/Controller$/, ''))];
}

export function getOperationInfo(action: Action): oa.OperationObject {
  return {
    operationId: `${action.target.name}.${action.method}`,
    summary: _.capitalize(_.startCase(action.method)),
    responses: {},
  };
};

export function getActionsByController(target: Function): Action[] {
  const storage: MetadataArgsStorage = getRCStorage();

  if (storage) {
    return storage.filterActionsWithTarget(target)
    .map((action: any) => {
      return {
        target: action.target,
        method: action.method,
        type: action.type as String,
        route: action.route as String,
      } as Action;  
    });
  }
  
  return [];
}

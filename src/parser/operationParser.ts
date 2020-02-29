import * as _ from 'lodash'
import * as oa from 'openapi3-ts';
import { Route } from './types';
import { getParameters } from './parameterParser';
import { getResponses } from './responseParser';
import { getTags } from './tagsParser';
import { decoratorParser } from './decoratorParser';

function getOperationId(route: Route): string {
    return `${route.action.target.name}.${route.action.method}`;
}

function getSummary(route: Route): string {
    return _.capitalize(_.startCase(route.action.method))
}

export function getOperation(route: Route): oa.OperationObject {
    const operation: oa.OperationObject = {
      operationId: getOperationId(route),
      summary: getSummary(route),
      tags: getTags(route),
      parameters: getParameters(route),
      responses: getResponses(route),
    };
    const operationObj = decoratorParser(route);
    const mergedOperationObj = _.merge(operation, operationObj)
  
    return _.omitBy(mergedOperationObj, _.isEmpty) as oa.OperationObject;
}

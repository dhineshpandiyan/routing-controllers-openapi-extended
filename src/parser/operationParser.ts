import * as _ from 'lodash'
import * as oa from 'openapi3-ts';
import { Route } from './types';
import { getHeaderParams, getPathParams, getQueryParams } from './parameterParser';
import { getRequestBody } from './requestBodyParser';
import { getResponses } from './responseParser';
import { getTags } from './tagsParser';

function getOperationId(route: Route): string {
    return `${route.action.target.name}.${route.action.method}`;
}

function getSummary(route: Route): string {
    return _.capitalize(_.startCase(route.action.method))
  }

export function getOperation(route: Route): oa.OperationObject {
    const operation: oa.OperationObject = {
      operationId: getOperationId(route),
      parameters: [
        ...getHeaderParams(route),
        ...getPathParams(route),
        ...getQueryParams(route)
      ],
      requestBody: getRequestBody(route) || undefined,
      responses: getResponses(route),
      summary: getSummary(route),
      tags: getTags(route)
    };
  
    return _.omitBy(operation, _.isEmpty) as oa.OperationObject;
    // return applyOpenAPIDecorator(cleanedOperation, route)
}

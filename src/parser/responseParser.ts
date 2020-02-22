import { Route } from './types'
import * as oa from 'openapi3-ts';
import _ = require('lodash');

function getContentType(route: Route): string {
    const defaultContentType =
      route.controller.type === 'json'
        ? 'application/json'
        : 'text/html; charset=utf-8'
    const contentMeta = _.find(route.responseHandlers, { type: 'content-type' })
    return contentMeta ? contentMeta.value : defaultContentType
  }
  
  /**
   * Return the status code of given route.
   */
export function getStatusCode(route: Route): string {
    const successMeta = _.find(route.responseHandlers, { type: 'success-code' })
    return successMeta ? successMeta.value + '' : '200'
}

/**
 * Return OpenAPI Responses object of given route.
 */
export function getResponses(route: Route): oa.ResponsesObject {
    const contentType = getContentType(route)
    const successStatus = getStatusCode(route)

    return {
        [successStatus]: {
        content: { [contentType]: {} },
        description: 'Successful response'
        }
    }
}
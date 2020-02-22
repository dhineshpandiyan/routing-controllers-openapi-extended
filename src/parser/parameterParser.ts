import * as _ from 'lodash'
import * as oa from 'openapi3-ts';
import { Route } from './types';
import { ParamMetadataArgs } from './routeTypes';
import pathToRegexp = require('path-to-regexp');
import { getFullExpressPath } from './pathParser';
import { isRequired } from './common';

export function getParamSchema(param: ParamMetadataArgs): oa.SchemaObject | oa.ReferenceObject {
    const { explicitType, index, object, method } = param
  
    const type = Reflect.getMetadata('design:paramtypes', object, method)[index]
    if (_.isFunction(type) && type.name === 'Array') {
      const items = explicitType
        ? { $ref: '#/components/schemas/' + explicitType.name }
        : { type: 'object' }
      return { items, type: 'array' }
    }
    if (explicitType) {
      return { $ref: '#/components/schemas/' + explicitType.name }
    }
    if (_.isFunction(type)) {
      if (_.isString(type.prototype) || _.isSymbol(type.prototype)) {
        return { type: 'string' }
      } else if (_.isNumber(type.prototype)) {
        return { type: 'number' }
      } else if (_.isBoolean(type.prototype)) {
        return { type: 'boolean' }
      } else if (type.name !== 'Object') {
        return { $ref: '#/components/schemas/' + type.name }
      }
    }
  
    return {}
}

export function getHeaderParams(route: Route): oa.ParameterObject[] {
    const headers: oa.ParameterObject[] = _(route.params)
      .filter({ type: 'header' })
      .map(headerMeta => {
        const schema = getParamSchema(headerMeta) as oa.SchemaObject
        return {
          in: 'header' as oa.ParameterLocation,
          name: headerMeta.name || '',
          required: isRequired(headerMeta, route),
          schema
        }
      })
      .value()
  
    const headersMeta = _.find(route.params, { type: 'headers' })
    if (headersMeta) {
      const schema = getParamSchema(headersMeta) as oa.ReferenceObject
      headers.push({
        in: 'header',
        name: _.last(_.split(schema.$ref, '/')) || '',
        required: isRequired(headersMeta, route),
        schema
      })
    }
  
    return headers
}

export function getPathParams(route: Route): oa.ParameterObject[] {
    const path = getFullExpressPath(route)
    const tokens = pathToRegexp.parse(path)
  
    return tokens
      .filter(_.isObject) // Omit non-parameter plain string tokens
      .map((token: pathToRegexp.Key) => {
        const name = token.name + ''
        const param: oa.ParameterObject = {
          in: 'path',
          name,
          required: !token.optional,
          schema: { type: 'string' }
        }
  
        if (token.pattern && token.pattern !== '[^\\/]+?') {
          param.schema = { pattern: token.pattern, type: 'string' }
        }
  
        const meta = _.find(route.params, { name, type: 'param' })
        if (meta) {
          const metaSchema = getParamSchema(meta)
          param.schema =
            'type' in metaSchema ? { ...param.schema, ...metaSchema } : metaSchema
        }
  
        return param
      })
}
  
  /**
   * Return query parameters of given route.
   */
export function getQueryParams(route: Route): oa.ParameterObject[] {
    const queries: oa.ParameterObject[] = _(route.params)
      .filter({ type: 'query' })
      .map(queryMeta => {
        const schema = getParamSchema(queryMeta) as oa.SchemaObject
        return {
          in: 'query' as oa.ParameterLocation,
          name: queryMeta.name || '',
          required: isRequired(queryMeta, route),
          schema
        }
      })
      .value()
  
    const queriesMeta = _.find(route.params, { type: 'queries' })
    if (queriesMeta) {
      const schema = getParamSchema(queriesMeta) as oa.ReferenceObject
      queries.push({
        in: 'query',
        name: _.last(_.split(schema.$ref, '/')) || '',
        required: isRequired(queriesMeta, route),
        schema
      })
    }
  
    return queries
}

import 'reflect-metadata';
import * as _ from 'lodash'
import * as oa from 'openapi3-ts';
import { Route } from './types';
import { ParamMetadataArgs } from './routeTypes';
import pathToRegexp = require('path-to-regexp');
import { getFullExpressPath } from './pathParser';
import { isRequired } from './common';
import { getStorage } from '../storage';
import { ParametersOptions } from '../decorator-options';

export function getCustomParameters(route: Route): ParametersOptions[] {
  const { target, method } = route.action;
  
  return getStorage().filterParametersByTarget(target, method);
}

function getCustomParametersByName(route: Route, name: string): ParametersOptions {
  let customParameter;

   if (name) {
    customParameter = getCustomParameters(route).find(p => p.name === name);
   }

   return customParameter || { name };
}

export function getParamSchema(param: ParamMetadataArgs): oa.SchemaObject | oa.ReferenceObject {
    const { explicitType, index, object, method } = param
  
    const type = Reflect.getMetadata('design:paramtypes', object, method)[index]
    if (_.isFunction(type) && type.name === 'Array') {
      const items = explicitType
        ? { $ref: '#/definitions/' + explicitType.name }
        : { type: 'object' }
      return { items, type: 'array' }
    }
    if (explicitType) {
      return { $ref: '#/definitions/' + explicitType.name }
    }
    if (_.isFunction(type)) {
      if (_.isString(type.prototype) || _.isSymbol(type.prototype)) {
        return { type: 'string' }
      } else if (_.isNumber(type.prototype)) {
        return { type: 'number' }
      } else if (_.isBoolean(type.prototype)) {
        return { type: 'boolean' }
      } else if (type.name !== 'Object') {
        return { $ref: '#/definitions/' + type.name }
      }
    }
  
    return {}
}

export function getHeaderParams(route: Route): oa.ParameterObject[] {
  const headers: oa.ParameterObject[] = route.params.filter(p => p.type === 'header')
    .map(headerMeta => {
      const headerParam = {
        in: 'header',
        name: headerMeta.name || 'Unknown',
        required: isRequired(headerMeta, route),
        type: 'string',
      };
      const customParameter = getCustomParametersByName(route, headerMeta.name || '');

      return _.merge(headerParam, customParameter);
    });
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

  return tokens.filter(_.isObject)
    .map((token: pathToRegexp.Key) => {
      // @ts-ignore
      const name = Number.isInteger(token.name) ? token.pattern : `${token.name}`;
      const param: oa.ParameterObject = {
        in: 'path',
        name: name || 'Unknown',
        required: !token.optional,
        type: 'string',
      };
      const customParameter = getCustomParametersByName(route, name);

      return _.merge(param, customParameter);
    });
}
  
export function getQueryParams(route: Route): oa.ParameterObject[] {
  const queries: oa.ParameterObject[] = route.params.filter(p => p.type === 'query')
    .map(queryMeta => {
      const schema = getParamSchema(queryMeta) as oa.SchemaObject
      const queryParam: any = {
        in: 'query',
        name: queryMeta.name || 'Unknown',
        required: isRequired(queryMeta, route),
        schema,
      };
      const customParameter = getCustomParametersByName(route, queryMeta.name || '');

      if (!schema.$ref) {
        queryParam.type = schema.type;
        delete queryParam.schema;
      }
      
      return _.merge(queryParam, customParameter);
    });
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

import * as oa from 'openapi3-ts';
import { MetadataArgsStorage, RoutingControllersOptions } from './parser/routeTypes'
import { parseRoute, getPaths } from './parser'
import { Route } from './parser/types';
import _ = require('lodash');

export function generateSwagger(
    storage: MetadataArgsStorage, 
    options: RoutingControllersOptions = {},
    additional: Partial<oa.OpenAPIObject> = {}
  ): oa.OpenAPIObject {
    const routes: Route[] = parseRoute(storage, options);
    const swagger = {
        swagger: '2.0',
        paths: getPaths(routes)
    };
  
    return _.merge(swagger, additional) as oa.OpenAPIObject;
}

export function generateOpenAPI(
    storage: MetadataArgsStorage, 
    options: RoutingControllersOptions = {},
    additional: Partial<oa.OpenAPIObject> = {}
  ): oa.OpenAPIObject {
    const routes: Route[] = parseRoute(storage, options);
    const swagger = {
        openapi: '3.0.0',
        paths: getPaths(routes)
    };
  
    return _.merge(swagger, additional) as oa.OpenAPIObject;
}

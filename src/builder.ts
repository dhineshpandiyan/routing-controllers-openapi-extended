import * as oa from 'openapi3-ts';
import _ = require('lodash');

import { getPaths, parseRoute, parseSchema } from './parser';
import { MetadataArgsStorage, RoutingControllersOptions } from './parser/routeTypes';
import { Route } from './parser/types';

export function generateSwagger(
		storage: MetadataArgsStorage, 
		options: RoutingControllersOptions = {},
		validationMetadata: any = [],
		additional: Partial<oa.OpenAPIObject> = {},
	): oa.OpenAPIObject {
		const routes: Route[] = parseRoute(storage, options);
		const swagger = {
			swagger: '2.0',
			paths: getPaths(routes),
			definitions: parseSchema(validationMetadata),
		};
	
		return _.merge(swagger, additional) as oa.OpenAPIObject;
};

export function generateOpenAPI(
		storage: MetadataArgsStorage, 
		options: RoutingControllersOptions = {},
		validationMetadata: any,
		additional: Partial<oa.OpenAPIObject> = {},
	): oa.OpenAPIObject {
		const routes: Route[] = parseRoute(storage, options);
		const swagger = {
			openapi: '3.0.0',
			paths: getPaths(routes),
			components: {
				schema: parseSchema(validationMetadata),
			},
		};
	
		return _.merge(swagger, additional) as oa.OpenAPIObject;
};

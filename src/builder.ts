import * as oa from 'openapi3-ts';
import _ = require('lodash');

import { getPaths, parseRoute, parseSchema, parseModel } from './parser';
import { MetadataArgsStorage } from './parser/routeTypes';
import { Route } from './parser/types';

export interface Config {
	controllers: Function[];
	models: Function[];
	storage: MetadataArgsStorage;
};

export function generateSwagger(config: Config, additional: Partial<oa.OpenAPIObject> = {}): oa.OpenAPIObject {
	const routes: Route[] = parseRoute(config.storage);
	const swagger = {
		swagger: '2.0',
		paths: getPaths(routes),
		definitions: parseModel(config.models),
	};

	return _.merge(swagger, additional) as oa.OpenAPIObject;
};

export function generateOpenAPI(config: Config, additional: Partial<oa.OpenAPIObject> = {}): oa.OpenAPIObject {
		const routes: Route[] = parseRoute(config.storage);
		const swagger = {
			openapi: '3.0.0',
			paths: getPaths(routes),
			components: {
				schema: parseSchema(config.models),
			},
		};
	
		return _.merge(swagger, additional) as oa.OpenAPIObject;
};

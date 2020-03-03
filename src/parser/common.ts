import { Route, Action } from './types';
import _ = require('lodash');
import * as pathToRegexp from 'path-to-regexp';


export function isRequired(meta: { required?: boolean }, route: Route) {
	const globalRequired = _.get(route.options, 'defaults.paramOptions.required')
	return globalRequired ? meta.required !== false : !!meta.required
}

export function resolveSchema(schema: Function | string): { $ref: string} {
	let name = schema;

	if (_.isFunction(schema)) {
		name = (schema as Function).name;
	};

	return { $ref: `#/definitions/${name}` };
}

export function expressToOpenAPIPath(expressPath: string) {
	const tokens = pathToRegexp.parse(expressPath);

	return tokens.map(d => (_.isString(d) ? d : `${d.prefix}{${d.name}}`)).join('')
}

export function mergeActions(rcActions: Action[], actions: Action[]): Action[] {
	const mergedActions: { [key: string]: Action } = {};
  const merge = (list: Action[]) => {
    list.forEach((item: Action) => {
      mergedActions[item.method] = item;
    });
	};
	
	merge(rcActions);
	merge(actions);

	return Object.values(mergeActions);
} 

import * as oa from 'openapi3-ts';
import * as _ from 'lodash'
import * as pathToRegexp from 'path-to-regexp'
import { Route } from './types';
import { getOperation } from './operationParser';

function expressToOpenAPIPath(expressPath: string) {
    const tokens = pathToRegexp.parse(expressPath);

    return tokens.map(d => (_.isString(d) ? d : `${d.prefix}{${d.name}}`)).join('')
}

export function getFullExpressPath(route: Route): string {
    const { action, controller, options } = route;

    return `${options.routePrefix || ''}${controller.route || ''}${action.route || ''}`;
}

export function getFullPath(route: Route): string {
    return expressToOpenAPIPath(getFullExpressPath(route))
}

export function getPaths(routes: Route[]): oa.PathObject {
    const routePaths = routes.map(route => ({
      [getFullPath(route)]: {
        [route.action.type]: getOperation(route)
      }
    }));
  
    // @ts-ignore: array spread
    return _.merge(...routePaths);
}

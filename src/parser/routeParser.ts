import * as _ from 'lodash'
import { MetadataArgsStorage, RoutingControllersOptions, ControllerMetadataArgs } from './routeTypes';
import { Route } from './types';

export function parseRoute(storage: MetadataArgsStorage, options: RoutingControllersOptions = {}): Route[] {
  return storage.actions.map(action => ({
    action,
    controller: _.find(storage.controllers, { target: action.target }) as ControllerMetadataArgs,
    options,
    params: _.sortBy(storage.filterParamsWithTargetAndMethod(action.target, action.method), 'index'),
    responseHandlers: storage.filterResponseHandlersWithTargetAndMethod(action.target, action.method)
  }));
}

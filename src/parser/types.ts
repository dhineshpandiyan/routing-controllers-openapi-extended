import { RoutingControllersOptions, ActionMetadataArgs, ControllerMetadataArgs, 
    ParamMetadataArgs, ResponseHandlerMetadataArgs } from './routeTypes';

export interface Route {
  readonly action?: ActionMetadataArgs,
  readonly controller?: ControllerMetadataArgs | Function,
  readonly options?: RoutingControllersOptions,
  readonly params?: ParamMetadataArgs[],
  readonly responseHandlers?: ResponseHandlerMetadataArgs[],
}

export interface Action {
  target: Function,
  method: string,
  type: string,
  route: string,
};

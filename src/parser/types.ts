import { RoutingControllersOptions, ActionMetadataArgs, ControllerMetadataArgs, 
    ParamMetadataArgs, ResponseHandlerMetadataArgs } from './routeTypes';

export interface Route {
  readonly action: ActionMetadataArgs
  readonly controller: ControllerMetadataArgs
  readonly options: RoutingControllersOptions
  readonly params: ParamMetadataArgs[]
  readonly responseHandlers: ResponseHandlerMetadataArgs[]
}

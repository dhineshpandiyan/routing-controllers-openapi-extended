import * as _ from 'lodash'
import * as oa from 'openapi3-ts';
import { Route } from './types';
import { getStorage } from '../storage';

export function pathEntryParser(route: Route): oa.OperationObject {
    const { target, method } = route.action;
    const pathEntries = getStorage().filterPathEntityByTarget(target, method);

    // @ts-ignore: array spread
    return _.merge(...pathEntries) as oa.OperationObject;
}

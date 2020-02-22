import { Route } from './types';
import _ = require('lodash');

export function getTags(route: Route): string[] {
    return [_.startCase(route.controller.target.name.replace(/Controller$/, ''))]
}
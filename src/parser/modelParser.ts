import 'reflect-metadata';
import { getStorage } from '../storage';
import _ = require('lodash');
import { ModelOptions, PropertyOptions } from '../decorator-options';

const PRIMITIVE_TYPES = new Set(['string', 'number', 'boolean']);

function resolveType(property: PropertyOptions): string {
  let type = '';

  if (property.type) {
    if (typeof property.type === 'string') {
      type = (property.type as String).toLowerCase();
    } else {
      type = (property.type as Function).name.toLowerCase();
    }
  }

  return type;
}

function resolveProperty(property: PropertyOptions) {
  const { type: proType, itemType } = property;
  const type = resolveType(property);

  delete property.name;
  delete property.type;
  delete property.required;
  delete property.itemType;
  if (PRIMITIVE_TYPES.has(type)) {
    return Object.assign({}, { type }, property);
  }
  if (type === 'array') {
    return {
      type,
      ...property,
      items: resolveModel(itemType as Function),
    }
  }
  return resolveModel(proType as Function);
}

function resolveModel(model: Function): any {
  if (!model) {
    return { type: '' };
  }

  const type = model.name.toLowerCase();
  const properties = getStorage().filterPropertyByTarget(model);

  if (PRIMITIVE_TYPES.has(type)) {
    return { type };
  }
  return {
    type: 'object',
    required: properties.reduce((acc, property) => {
      if (property.required) {
        acc.push(property.name);
      }
      return acc;
    }, []),
    properties: properties.reduce((acc, property) => {
      acc[property.name || ''] = resolveProperty(property);
      return acc;
    }, {}),
  }
}

export function parseModel(models: Function[]): any {
  return models.reduce((acc, model) => {
    const modelOptions = getStorage().filterModelByTarget(model) || [];
    const options: ModelOptions = _.merge({}, ...modelOptions);

    if (options.enabled) {
      acc[model.name] = resolveModel(model);
    }

    return acc;
  }, {} as { [key: string]: any });
};

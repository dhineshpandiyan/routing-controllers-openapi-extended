import * as _ from 'lodash'
import * as oa from 'openapi3-ts';
import { Route } from './types'
import { getParamSchema } from './parameterParser';
import { isRequired } from './common';

export function getRequestBody(route: Route): oa.RequestBodyObject | void {
    const bodyParamMetas = route.params.filter(d => d.type === 'body-param')
    const bodyParamsSchema: oa.SchemaObject | null =
      bodyParamMetas.length > 0
        ? bodyParamMetas.reduce(
            (acc: oa.SchemaObject, d) => ({
              ...acc,
              properties: {
                ...acc.properties,
                [d.name!]: getParamSchema(d)
              },
              required: isRequired(d, route)
                ? [...(acc.required || []), d.name!]
                : acc.required
            }),
            { properties: {}, required: [], type: 'object' }
          )
        : null
  
    const bodyMeta = route.params.find(d => d.type === 'body')
  
    if (bodyMeta) {
      const bodySchema = getParamSchema(bodyMeta)
      const { $ref } =
        'items' in bodySchema && bodySchema.items ? bodySchema.items : bodySchema
  
      return {
        content: {
          'application/json': {
            schema: bodyParamsSchema
              ? { allOf: [bodySchema, bodyParamsSchema] }
              : bodySchema
          }
        },
        description: _.last(_.split($ref, '/')),
        required: isRequired(bodyMeta, route)
      }
    } else if (bodyParamsSchema) {
      return {
        content: { 'application/json': { schema: bodyParamsSchema } }
      }
    }
  }

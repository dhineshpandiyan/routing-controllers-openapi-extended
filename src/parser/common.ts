import { Route } from './types'
import _ = require('lodash')

export function isRequired(meta: { required?: boolean }, route: Route) {
	const globalRequired = _.get(route.options, 'defaults.paramOptions.required')
	return globalRequired ? meta.required !== false : !!meta.required
}


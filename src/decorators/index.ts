import { CodeSnippetOptions, CustomEntryOptions, ModelOptions, OperationInfoOptions, 
	ParametersOptions, PropertyOptions, ResponseEntryOptions } from "../decorator-options";
import { getStorage } from "../storage";

export function CodeSnippets(options: Array<CodeSnippetOptions>): Function {
	return function (object: Object, method: string) {
		getStorage().codeSnippets.push({ target: object.constructor, method, options });
	};
};

export function CustomEntry(options: CustomEntryOptions): Function {
	return function (object: Object, method: string) {
		getStorage().customEntry.push({ target: object.constructor, method, options });
	};
};

export function Model(options: ModelOptions = { enabled: true }): Function {
	return function (object: Object) {
		getStorage().models.push({ target: object, options });
	};
};

export function OperationInfo(options: OperationInfoOptions): Function {
	return function (object: Object, method: string) {
		getStorage().operationInfo.push({ target: object.constructor, method, options });
	};
};

export function Parameters(options: Array<ParametersOptions>): Function {
	return function (object: Object, method: string) {
		getStorage().parameters.push({ target: object.constructor, method, options });
	};
};

export function Property(options: PropertyOptions = {}): Function {
	return function (object: Object, method: string) {
		options = Object.assign({}, {
			name: method,
			required: true,
			type: Reflect.getMetadata('design:type', object, method),
		}, options);
		getStorage().properties.push({ target: object.constructor, method, options });
	};
};

export function ResponseEntry(options: ResponseEntryOptions): Function {
	return function (object: Object, method: string) {
		getStorage().responseEntries.push({ target: object.constructor, method, options });
	};
};

export function Tags(options: Array<string>): Function {
	return function (object: Object, method: string) {
		getStorage().tags.push({ target: object.constructor, method, options });
	};
};

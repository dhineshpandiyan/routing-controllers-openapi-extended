import * as oa from 'openapi3-ts';
import * as _ from 'lodash'
import * as rcParser from './rcParser';
import * as parser from './parser';
import { Action } from './types';
import * as common from './common';

function getResponses(action: Action): oa.ResponsesObject {
  return _.merge(
    rcParser.getResponses(action),
    parser.getResponses(action),
  );
}

function getTags(action: Action): Array<string> {
  return parser.getTags(action) || rcParser.getTags(action);
}

function getOperation(action: Action): oa.OperationObject {
  const operationInfo: oa.OperationObject = _.merge(
    rcParser.getOperationInfo(action),
    parser.getOperationInfo(action),
  );

  operationInfo.tags = getTags(action);
  operationInfo.responses = getResponses(action);

  return _.omitBy(operationInfo, _.isEmpty) as oa.OperationObject;
};

function getPath(controller: Function): oa.OperationObject {
  const actions: Action[] = common.mergeActions(
    rcParser.getActionsByController(controller),
    parser.getActionsByController(controller),
  );

  const path = actions.map((action) => {
    const expressPath = parser.getFullPath(action) || rcParser.getFullPath(action);
    const path = common.expressToOpenAPIPath(expressPath);

    return {
      [path]: {
        [action.type]: getOperation(action),
      }
    };
  });

  // @ts-ignore: array spread
  return _.merge(...path);
};

export function getPaths(controllers: Function[]): oa.PathObject {
  const paths = controllers.map((controller) => getPath(controller));

  // @ts-ignore: array spread
  return _.merge(...paths);
};

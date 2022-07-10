import _ from 'lodash';
import { GenericInternalError, CustomError, standardHttpResponseInterface } from '../index';

export function handleError(e) {
  if (e instanceof CustomError) {
    throw e;
  }
  throw new GenericInternalError(e.message);
}

export function handleErrorAndConvertToJSON(e: unknown): standardHttpResponseInterface {
  try {
    handleError(e);
  } catch (customError) {
    return {
      httpCode: _.get(customError, 'httpCode') || 500,
      body: {
        error: _.get(customError, 'name'),
        description: _.get(customError, 'description'),
        code: _.get(customError, 'errorCode'),
      },
    };
  }
  return {
    httpCode: 500,
    body: {
      error: 'GenericInternalError',
      description: 'error cascade',
      code: 'FB5000',
    },
  };
}

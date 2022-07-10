import _ from 'lodash';
import { Request, Response } from 'express';
import logger from '../../common/logger';
import { handleErrorAndConvertToJSON } from '../../common/index';

export function convertExpressRequestObjectToStandard(request: Request) {
  logger.info('express request', request.params);
  const queryStringParameters = request.query;
  const { body } = request;
  const queryParameter = request.params;
  const standardStructure = {};
  const session = _.get(request, 'session');

  _.set(standardStructure, 'session', session);
  _.set(standardStructure, 'queryStringParameters', queryStringParameters);
  _.set(standardStructure, 'body', body);
  _.set(standardStructure, 'queryParameter', queryParameter);
  return standardStructure;
}

export function setStandardResponseToExpress(
  standardResponse,
  expressRequestObject: Request,
  expressResponseObject: Response,
) {
  try {
    const cookiesToSet = _.get(standardResponse, ['cookies']);
    if (cookiesToSet) {
      logger.info('setting cookies');
      // eslint-disable-next-line no-param-reassign
      expressRequestObject.session = { ...expressRequestObject.session, ...cookiesToSet };
    }
    const options = _.get(standardResponse, 'options');
    if (options) {
      _.map(options.unsetCookies, (c) => expressResponseObject.clearCookie(c));
    }
    expressResponseObject.status(standardResponse.httpCode).send(standardResponse.body);
  } catch (e) {
    handleErrorAndConvertToJSON(e);
  }
}

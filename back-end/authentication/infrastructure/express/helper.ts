import _ from "lodash";
import { Request, Response } from 'express';
import logger from "../../common/logger";

export function convertExpressRequestObjectToStandard(request: Request) {
    logger.info('express request', request.params);
    const queryStringParameters = request.query;
    const body = request.body;
    let queryParameter = request.params;
    let standardStructure = {};

     _.set(standardStructure,'queryStringParameters', queryStringParameters);
     _.set(standardStructure, 'body', body);
     _.set(standardStructure, 'queryParameter', queryParameter);
     
    return standardStructure;
}

export function setStandardResponseToExpress(standardResponse, expressResponseObject : Response) {
    const cookiesToSet = _.get(standardResponse, ['cookies']);
    if (cookiesToSet) {
        logger.info('setting cookies');
        _.map(Object.keys(cookiesToSet), k => expressResponseObject.cookie(k, cookiesToSet[k]));
    }
    expressResponseObject.status(standardResponse.httpCode).send(standardResponse.body);
}
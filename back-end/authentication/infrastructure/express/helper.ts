import _ from "lodash";
import { Request, Response } from 'express';
import logger from "../../common/logger";
import { handleErrorAndConvertToJSON } from "../../common";

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
    try {
        const cookiesToSet = _.get(standardResponse, ['cookies']);
        if (cookiesToSet) {
            logger.info('setting cookies');
            _.map(Object.keys(cookiesToSet), k => expressResponseObject.cookie(k, cookiesToSet[k]));
        }
        const options = _.get(standardResponse, 'options');
        if (options) {
            _.map(options.unsetCookies, c => expressResponseObject.clearCookie(c));
        }
        expressResponseObject.status(standardResponse.httpCode).send(standardResponse.body);
    } catch (e) {
        handleErrorAndConvertToJSON(e);
    }

}
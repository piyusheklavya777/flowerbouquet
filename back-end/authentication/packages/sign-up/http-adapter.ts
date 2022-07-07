import _ from 'lodash';
import { signupHandler } from '.';
import { CustomError, GenericInternalError, handleErrorAndConvertToJSON, standardHttpResponseInterface } from '../../common';
import logger from '../../common/logger';
import Joi from 'joi';
import { validateAgainstJoiSchema } from '../../common/utility-functions/validate-against-schema';

export async function signupHttpHandler ({ standardRequestObject }) : Promise<standardHttpResponseInterface> {
    try {
        validateAgainstJoiSchema(standardRequestObject, signUpHttpRequestSchema);
        const email = _.get(standardRequestObject, ['body', 'email']);
        const name = _.get(standardRequestObject, ['body', 'name']);
        const password = _.get(standardRequestObject, ['body', 'password']);
        const { jwt } = await signupHandler(name, email, password); 
        return { httpCode: 201, body: { name, email }, cookies: { jwt }};
    } catch (e) {
       return handleErrorAndConvertToJSON(e)
    }
};

const signUpHttpRequestSchema = Joi.object({
    body : Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(3).max(20).required(),
        name: Joi.string().min(2).max(15).required(),
    })
}).unknown();

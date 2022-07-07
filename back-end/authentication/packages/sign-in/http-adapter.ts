import _ from 'lodash';
import { signinHandler } from '.';
import { standardHttpResponseInterface } from '../../common';
import Joi from 'joi';
import { validateAgainstJoiSchema } from '../../common/utility-functions/validate-against-schema';
import { handleErrorAndConvertToJSON } from '../../common/utility-functions';

export async function signinHttpHandler ({ standardRequestObject }) : Promise<standardHttpResponseInterface> {
    let email: string;
    let password: string;
    try {
        validateAgainstJoiSchema(standardRequestObject, signinHttpRequestSchema);

        email = _.get(standardRequestObject, ['body', 'email']);
        password = _.get(standardRequestObject, ['body', 'password']);

        const { jwt, name } = await signinHandler(email, password); 

        return { httpCode: 200, body: { name, email }, cookies: { jwt }};
    } catch (e) {
       return handleErrorAndConvertToJSON(e);
    }
};

const signinHttpRequestSchema = Joi.object({
    body : Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(3).max(20).required()
    })
}).unknown();


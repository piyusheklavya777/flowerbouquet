import { standardHttpResponseInterface, getCurrentUser } from '../../common';
import Joi from 'joi';
import { validateAgainstJoiSchema } from '../../common/utility-functions/validate-against-schema';
import { handleErrorAndConvertToJSON } from '../../common/utility-functions';

export async function getCurrentUserHttpHandler ({ standardRequestObject }) : Promise<standardHttpResponseInterface> {
    try {
        validateAgainstJoiSchema(standardRequestObject, signinHttpRequestSchema);

        const { name, userId } = getCurrentUser(standardRequestObject.session);

        return { httpCode: 200, body: { name, userId }};
    } catch (e) {
       return handleErrorAndConvertToJSON(e);
    }
}

const signinHttpRequestSchema = Joi.object({}).unknown();


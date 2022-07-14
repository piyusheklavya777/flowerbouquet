import { standardHttpResponseInterface, getCurrentUser } from '../../common';
import Joi from 'joi';
import { validateAgainstJoiSchema } from '../../common/utility-functions/validate-against-schema';
import { handleErrorAndConvertToJSON } from '../../common/utility-functions';
import logger from '../../common/logger';

export async function getCurrentUserHttpHandler ({ standardRequestObject }) : Promise<standardHttpResponseInterface> {
    try {
        logger.info('GET /api/users/current-user');
        validateAgainstJoiSchema(standardRequestObject, signinHttpRequestSchema);

        const { name, userId } = getCurrentUser(standardRequestObject.session);

        logger.info('CURRENT USER', {name, userId});

        return { httpCode: 200, body: { name, userId }};
    } catch (e) {
       return handleErrorAndConvertToJSON(e);
    }
}

const signinHttpRequestSchema = Joi.object({}).unknown();


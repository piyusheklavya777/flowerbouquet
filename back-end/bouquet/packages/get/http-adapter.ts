import _ from 'lodash';
import Joi from 'joi';
import { logger, standardHttpResponseInterface, UserNotLoggedInError } from '../../common';
import { validateAgainstJoiSchema } from '../../common/utility-functions/validate-against-schema';
import { handleErrorAndConvertToJSON } from '../../common/utility-functions';
import { getCurrentUser } from '../../common/utility-functions/get-current-user';
import { getBouquets } from './index';

export async function getBouquetHttpHandler({ standardRequestObject }): Promise<standardHttpResponseInterface> {
  try {
    validateAgainstJoiSchema(standardRequestObject, bouquetGetHttpRequestSchema);
    let userDetails;
    try {
      userDetails = getCurrentUser(standardRequestObject.session);
    } catch (e) {
      if (e instanceof UserNotLoggedInError) {
        logger.info('User not logged in');
      }
    }

    const bouquetId = _.get(standardRequestObject, ['queryParameters', 'bouquetId']);
    const namePrefix = _.get(standardRequestObject, ['queryStringParameters', 'namePrefix']);

    const bouquets = await getBouquets({
      bouquetId,
      userId: userDetails?.userId,
      namePrefix,
    });
    return {
      httpCode: 200,
      body: bouquets,
    };
  } catch (e) {
    return handleErrorAndConvertToJSON(e);
  }
}

const bouquetGetHttpRequestSchema = Joi.object({
  queryStringParameters: Joi.object({
    namePrefix: Joi.string().min(1),
  }),
  queryParameters: Joi.object({
    bouquetId: Joi.string().min(5),
  }),
}).unknown();

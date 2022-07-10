import _ from 'lodash';
import Joi from 'joi';
import { standardHttpResponseInterface } from '../../common';
import { validateAgainstJoiSchema } from '../../common/utility-functions/validate-against-schema';
import { handleErrorAndConvertToJSON } from '../../common/utility-functions';
import { getCurrentUser } from '../../common/utility-functions/get-current-user';
import { getFlowers } from './index';

export async function getFlowerHttpHandler({ standardRequestObject }): Promise<standardHttpResponseInterface> {
  try {
    validateAgainstJoiSchema(standardRequestObject, flowerGetHttpRequestSchema);

    const { userId } = getCurrentUser(standardRequestObject.session);

    const flowerId = _.get(standardRequestObject, ['queryParameters', 'flowerId']);
    const namePrefix = _.get(standardRequestObject, ['queryStringParameters', 'namePrefix']);

    const flowers = await getFlowers({
      flowerId,
      userId,
      namePrefix,
    });
    return {
      httpCode: 202,
      body: flowers,
    };
  } catch (e) {
    return handleErrorAndConvertToJSON(e);
  }
}

const flowerGetHttpRequestSchema = Joi.object({
  queryStringParameters: Joi.object({
    namePrefix: Joi.string().min(1),
  }),
  queryParameters: Joi.object({
    flowerId: Joi.string().min(5),
  }),
}).unknown();

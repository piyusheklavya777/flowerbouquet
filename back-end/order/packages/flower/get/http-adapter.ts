import _ from 'lodash';
import Joi from 'joi';
import { standardHttpResponseInterface } from '../../../common';
import { validateAgainstJoiSchema } from '../../../common/utility-functions/validate-against-schema';
import { handleErrorAndConvertToJSON } from '../../../common/utility-functions';
import { getFlowers } from './index';

export async function getFlowerHttpHandler({ standardRequestObject }): Promise<standardHttpResponseInterface> {
  try {
    validateAgainstJoiSchema(standardRequestObject, flowerGetHttpRequestSchema);

    const namePrefix = _.get(standardRequestObject, ['queryStringParameters', 'namePrefix']);

    const flowers = await getFlowers({
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
    namePrefix: Joi.string(),
  }),
  queryParameters: Joi.object({
    flowerId: Joi.string().min(5),
  }),
}).unknown();

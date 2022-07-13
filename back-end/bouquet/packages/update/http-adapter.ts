import _ from 'lodash';
import Joi from 'joi';
import { standardHttpResponseInterface } from '../../common';
import { validateAgainstJoiSchema } from '../../common/utility-functions/validate-against-schema';
import { handleErrorAndConvertToJSON } from '../../common/utility-functions';
import { getCurrentUser } from '../../common/utility-functions/get-current-user';
import { updateBouquet } from '.';

export async function updateBouquetHttpHandler({ standardRequestObject }): Promise<standardHttpResponseInterface> {
  try {
    validateAgainstJoiSchema(standardRequestObject, bouquetUpdateHttpRequestSchema);

    const { userId } = getCurrentUser(standardRequestObject.session);

    const { name, discount, description, flowers } = _.get(standardRequestObject, 'body');

    const bouquetId = _.get(standardRequestObject, ['queryParameters', 'bouquetId']);

    const { updatedBouquet } = await updateBouquet({
      bouquetId,
      name,
      discount,
      flowers,
      description,
      userId,
    });
    return {
      httpCode: 202,
      body: updatedBouquet,
    };
  } catch (e) {
    return handleErrorAndConvertToJSON(e);
  }
}

const bouquetUpdateHttpRequestSchema = Joi.object({
  queryParameters: Joi.object({
    bouquetId: Joi.string().required(),
  }),
  body: Joi.object({
    name: Joi.string().min(2).max(100),
    discount: Joi.number(),
    description: Joi.string(),
    flowers: Joi.array()
      .items(
        Joi.object({
          flowerId: Joi.string().required(),
          quantity: Joi.number().min(1).required(),
        }),
      )
      .min(1),
  }),
}).unknown();

import _ from 'lodash';
import Joi from 'joi';
import { standardHttpResponseInterface } from '../../common';
import { validateAgainstJoiSchema } from '../../common/utility-functions/validate-against-schema';
import { handleErrorAndConvertToJSON } from '../../common/utility-functions';
import { getCurrentUser } from '../../common/utility-functions/get-current-user';
import { updateFlower } from '.';

export async function updateFlowerHttpHandler({ standardRequestObject }): Promise<standardHttpResponseInterface> {
  try {
    validateAgainstJoiSchema(standardRequestObject, flowerUpdateHttpRequestSchema);

    const { userId } = getCurrentUser(standardRequestObject.session);

    const { name, price, quantityAvailable, description } = _.get(standardRequestObject, 'body');

    const flowerId = _.get(standardRequestObject, ['queryParameters', 'flowerId']);

    const updatedFlower = await updateFlower({
      flowerId,
      vendorId: userId,
      name,
      price,
      quantityAvailable,
      description,
    });
    return {
      httpCode: 202,
      body: updatedFlower,
    };
  } catch (e) {
    return handleErrorAndConvertToJSON(e);
  }
}

const flowerUpdateHttpRequestSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().min(2).max(100),
    price: Joi.number().min(0).max(1000).required(),
    quantityAvailable: Joi.number().min(1).max(10000),
    description: Joi.string(),
  }).required(),
  queryParameters: Joi.object({
    flowerId: Joi.string().min(5).required(),
  }).required(),
}).unknown();

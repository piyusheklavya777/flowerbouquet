import _ from 'lodash';
import Joi from 'joi';
import { standardHttpResponseInterface } from '../../common';
import { validateAgainstJoiSchema } from '../../common/utility-functions/validate-against-schema';
import { handleErrorAndConvertToJSON } from '../../common/utility-functions';
import { getCurrentUser } from '../../common/utility-functions/get-current-user';
import { createFlower } from '.';

export async function createFlowerHttpHandler({ standardRequestObject }): Promise<standardHttpResponseInterface> {
  try {
    validateAgainstJoiSchema(standardRequestObject, flowerCreateHttpRequestSchema);

    const { name: currentUserName, userId } = getCurrentUser(standardRequestObject.session);

    const { name, price, quantityAvailable, description } = _.get(standardRequestObject, 'body');

    const { flowerId } = await createFlower({
      name,
      price,
      quantityAvailable,
      vendorId: userId,
      description,
      creatorName: currentUserName,
    });
    return {
      httpCode: 200,
      body: { flowerId, name, price, quantityAvailable, vendorId: userId, description, creatorName: currentUserName },
    };
  } catch (e) {
    return handleErrorAndConvertToJSON(e);
  }
}

const flowerCreateHttpRequestSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().min(2).max(100).required(),
    price: Joi.number().min(1).max(1000).required(),
    quantityAvailable: Joi.number().min(1).required(),
    description: Joi.string().required(),
  }),
}).unknown();

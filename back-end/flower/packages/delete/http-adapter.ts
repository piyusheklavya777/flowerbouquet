import _ from 'lodash';
import Joi from 'joi';
import { standardHttpResponseInterface } from '../../common';
import { validateAgainstJoiSchema } from '../../common/utility-functions/validate-against-schema';
import { handleErrorAndConvertToJSON } from '../../common/utility-functions';
import { getCurrentUser } from '../../common/utility-functions/get-current-user';
import { deleteFlower } from '.';

export async function deleteFlowerHttpHandler({ standardRequestObject }): Promise<standardHttpResponseInterface> {
  try {
    validateAgainstJoiSchema(standardRequestObject, flowerDeleteHttpRequestSchema);

    const { userId } = getCurrentUser(standardRequestObject.session);

    const flowerId = _.get(standardRequestObject, ['queryParameters', 'flowerId']);

    await deleteFlower({
      flowerId,
      vendorId: userId,
    });
    return {
      httpCode: 200,
    };
  } catch (e) {
    return handleErrorAndConvertToJSON(e);
  }
}

const flowerDeleteHttpRequestSchema = Joi.object({
  queryParameters: Joi.object({
    flowerId: Joi.string().min(5).required(),
  }).required(),
}).unknown();

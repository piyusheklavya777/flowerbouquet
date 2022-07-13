import _ from 'lodash';
import Joi from 'joi';
import {
  standardHttpResponseInterface,
  validateAgainstJoiSchema,
  handleErrorAndConvertToJSON,
  getCurrentUser,
} from '../../../common';
import { deleteOrder } from '.';

export async function deleteOrderHttpHandler({ standardRequestObject }): Promise<standardHttpResponseInterface> {
  try {
    validateAgainstJoiSchema(standardRequestObject, orderDeleteHttpRequestSchema);

    const { userId } = getCurrentUser(standardRequestObject.session);

    const orderId = _.get(standardRequestObject, ['queryParameters', 'orderId']);

    await deleteOrder({
      orderId,
      userId,
    });
    return {
      httpCode: 200,
    };
  } catch (e) {
    return handleErrorAndConvertToJSON(e);
  }
}

const orderDeleteHttpRequestSchema = Joi.object({
  queryParameters: Joi.object({
    orderId: Joi.string().min(5).required(),
  }).required(),
}).unknown();

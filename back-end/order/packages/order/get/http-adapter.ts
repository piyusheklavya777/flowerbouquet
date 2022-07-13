import Joi from 'joi';
import {
  standardHttpResponseInterface,
  validateAgainstJoiSchema,
  handleErrorAndConvertToJSON,
  getCurrentUser,
} from '../../../common';

import { getOrders } from './index';

export async function getOrdersHttpHandler({ standardRequestObject }): Promise<standardHttpResponseInterface> {
  try {
    validateAgainstJoiSchema(standardRequestObject, orderGetHttpRequestSchema);

    const { userId } = getCurrentUser(standardRequestObject.session);

    const orders = await getOrders({
      userId,
    });
    return {
      httpCode: 200,
      body: orders,
    };
  } catch (e) {
    return handleErrorAndConvertToJSON(e);
  }
}

const orderGetHttpRequestSchema = Joi.object({}).unknown();

import _ from 'lodash';
import Joi from 'joi';
import {
  standardHttpResponseInterface,
  validateAgainstJoiSchema,
  handleErrorAndConvertToJSON,
  getCurrentUser,
  OrderStatus,
} from '../../../common';
import { createOrder } from '.';

export async function createOrderHttpHandler({ standardRequestObject }): Promise<standardHttpResponseInterface> {
  try {
    validateAgainstJoiSchema(standardRequestObject, orderCreateHttpRequestSchema);

    const { name: currentUserName, userId } = getCurrentUser(standardRequestObject.session);

    const { bouquets } = _.get(standardRequestObject, 'body');

    const order = await createOrder({
      customerId: userId,
      customerName: currentUserName,
      status: OrderStatus.CREATED,
      bouquets,
    });
    return {
      httpCode: 201,
      body: order,
    };
  } catch (e) {
    return handleErrorAndConvertToJSON(e);
  }
}

const orderCreateHttpRequestSchema = Joi.object({
  body: Joi.object({
    bouquets: Joi.array()
      .items(
        Joi.object({
          bouquetId: Joi.string().min(5).required(),
          name: Joi.string().min(2).required(),
          flowers: Joi.array()
            .items(
              Joi.object({
                flowerId: Joi.string().required(),
                quantity: Joi.number().min(1).required(),
              }),
            )
            .min(1),
        }),
      )
      .min(1),
  }),
}).unknown();

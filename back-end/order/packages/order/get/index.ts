/* eslint-disable no-param-reassign */
import _ from 'lodash';

import { logger } from '../../../common';
import { Order } from '../../db/models/order';

export async function getOrders({ userId }) {
  const orders = await Order.find({ isActive: true, customerId: userId });

  const orderObjects = _.map(orders, (v) => v.toObject());

  logger.info('orderObjects', orderObjects);

  return orders;
}

/* eslint-disable no-restricted-syntax */
import _ from 'lodash';
import { logger } from '../../common';
import { updateFlower } from '../update';

export const handleOrderCreated = async (order) => {
  logger.silly('order received xxx', order);

  const uniqueFlowers = await _getUniqueFlowers(order.bouquets);

  const updatedFlowers = await Promise.all(
    _.map(Object.keys(uniqueFlowers), async (flowerId) =>
      updateFlower({ flowerId, quantityAdded: uniqueFlowers[flowerId], invokeType: 'event' }),
    ),
  );
  logger.info('flowers updated', { updatedFlowers });
};

function _getUniqueFlowers(bouquets) {
  const flowersUnique = {}; // { flowerId: { name: '', quantity: '', price: '' } }

  for (const { flowers } of bouquets) {
    for (const { flowerId, quantity } of flowers) {
      if (flowersUnique[flowerId]) {
        flowersUnique[flowerId] -= parseInt(quantity, 10);
      } else {
        flowersUnique[flowerId] = -1 * parseInt(quantity, 10);
      }
    }
  }
  return flowersUnique;
}

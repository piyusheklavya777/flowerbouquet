/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import _ from 'lodash';
import { Order } from '../../db/models/order';
import { InvalidOrderError, logger } from '../../../common';
import { sendOrderCreatedEvent } from '../../events';
import { Flower } from '../../db/models/flower';
import { Bouquet } from '../../db/models/bouquet';

export async function createOrder({ bouquets, status, customerId, customerName }) {
  const flowerDetails = await _checkValidBouquets({ bouquets });
  _assingNameAndPriceToFlowers({ bouquets, flowerDetails });

  await _assignDiscounts({ bouquets });

  const createdOrder = Order.build({
    status,
    customerId,
    customerName,
    bouquets,
    isActive: true,
  });

  await createdOrder.save();

  const createdOrderJSON = createdOrder.toJSON();

  const orderDocument = { ...createdOrderJSON, orderId: createdOrderJSON.id };
  // delete orderDocument.id;

  logger.info('New Order created', orderDocument);

  await sendOrderCreatedEvent({ order: createdOrder });

  return orderDocument;
}

async function _checkValidBouquets({ bouquets }) {
  const flowersUnique = {}; // { flowerId: { name: '', quantity: '', price: '' } }

  for (const { flowers } of bouquets) {
    for (const { flowerId, quantity } of flowers) {
      if (flowersUnique[flowerId]) {
        flowersUnique[flowerId].quantity += parseInt(quantity, 10);
      } else {
        flowersUnique[flowerId] = {
          flowerId,
          quantity: parseInt(quantity, 10),
        };
      }
    }
  }

  const errors: string[] = [];

  for (const flowerId of Object.keys(flowersUnique)) {
    const { quantity } = flowersUnique[flowerId];
    const flowerDetailsFromDB = await Flower.findOne({ _id: flowerId, isActive: true });
    if (!flowerDetailsFromDB) {
      errors.push('flower is invalid or no longer available');
    } else if (flowerDetailsFromDB.quantityAvailable < quantity) {
      errors.push(
        `${flowerDetailsFromDB.name} avalilable: ${flowerDetailsFromDB.quantityAvailable}. Requested quantity is ${quantity}`,
      );
    }
    flowersUnique[flowerId].name = flowerDetailsFromDB?.name;
    flowersUnique[flowerId].price = flowerDetailsFromDB?.price;
  }

  if (errors.length > 0) throw new InvalidOrderError(errors.join('\n'));

  return flowersUnique;
}

function _assingNameAndPriceToFlowers({ bouquets, flowerDetails }) {
  for (const { flowers } of bouquets) {
    for (const flower of flowers) {
      flower.name = flowerDetails[flower.flowerId].name;
      flower.price = flowerDetails[flower.flowerId].price;
      logger.info('updated flower:s', flower);
    }
  }
}

async function _assignDiscounts({ bouquets }) {
  for (const bouquet of bouquets) {
    const bouquetDBDetails = await Bouquet.findOne({ _id: bouquet.bouquetId, isActive: true });
    if (!_.isNil(bouquetDBDetails)) {
      bouquet.discount = bouquetDBDetails.discount;
    }
  }
}

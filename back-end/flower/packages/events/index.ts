import _ from 'lodash';
import { EventListeningError, logger } from '../../common';
import { natsWrapper } from '../../nats-singleton';
import { FlowerCreatedPublisher, FlowerUpdatedPublisher, FlowerDeletedPublisher } from './publisher';

const sendFlowerCreatedEvent = async ({ flower }) => {
  try {
    const { name, price, quantityAvailable, vendorId, id: flowerId } = flower;
    const payload = {
      flowerId,
      name,
      price,
      quantityAvailable,
      vendorId,
      isActive: true,
    };
    logger.info('publishing flower:created event for flower', payload);
    new FlowerCreatedPublisher(natsWrapper.client).publish(payload);
  } catch (e) {
    logger.error('Error occurred while publishing flower created event');
    throw new EventListeningError(_.get(e, 'messsage'));
  }
};

const sendFlowerUpdatedEvent = async ({ flower }) => {
  try {
    const { name, price, quantityAvailable, _id: flowerId, description } = flower;
    const payload = {
      flowerId,
      name,
      price,
      quantityAvailable,
      description,
    };
    logger.info('publishing flower:updated event for flower', payload);
    new FlowerUpdatedPublisher(natsWrapper.client).publish(payload);
  } catch (e) {
    logger.error('Error occurred while publishing flower updated event');
    throw new EventListeningError(_.get(e, 'messsage'));
  }
};

const sendFlowerDeletedEvent = async ({ flowerId }) => {
  try {
    logger.info(`publishing flower:deleted event flowerId: ${flowerId}`);
    new FlowerDeletedPublisher(natsWrapper.client).publish({
      flowerId,
    });
  } catch (e) {
    logger.error('Error occurred while publishing flower:deleted event');
    throw new EventListeningError(_.get(e, 'messsage'));
  }
};

export { sendFlowerCreatedEvent, sendFlowerUpdatedEvent, sendFlowerDeletedEvent };

import _ from 'lodash';
import { EventListeningError, logger } from '../../common';
import { natsWrapper } from '../../nats-singleton';
import { FlowerCreatedPublisher, FlowerUpdatedPublisher, FlowerDeletedPublisher } from './publisher';

const sendFlowerCreatedEvent = async ({ flower }) => {
  try {
    logger.info('publishing flower:created event for flower', flower);
    const { name, price, quantityAvailable, vendorId, flowerId } = flower;
    new FlowerCreatedPublisher(natsWrapper.client).publish({
      flowerId,
      name,
      price,
      quantityAvailable,
      vendorId,
      isActive: true,
    });
  } catch (e) {
    logger.error('Error occurred while publishing flower created event');
    throw new EventListeningError(_.get(e, 'messsage'));
  }
};

const sendFlowerUpdatedEvent = async ({ flower }) => {
  try {
    logger.info('publishing flower:updated event for flower', flower);
    const { name, price, quantityAvailable, flowerId, description } = flower;
    new FlowerUpdatedPublisher(natsWrapper.client).publish({
      flowerId,
      name,
      price,
      quantityAvailable,
      description,
    });
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

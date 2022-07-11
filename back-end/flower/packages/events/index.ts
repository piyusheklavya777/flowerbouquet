import _ from 'lodash';
import { EventListeningError, logger } from '../../common';
import { natsWrapper } from '../../nats-singleton';
import { FlowerCreatedPublisher } from './publisher/flower-created-publisher';

const sendFlowerCreatedEvent = async ({ flower }) => {
  try {
    logger.info('publishing flower:created event');
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
    logger.error('Error occurred while publishing flower crreated event');
    throw new EventListeningError(_.get(e, 'messsage'));
  }
};
export { sendFlowerCreatedEvent };

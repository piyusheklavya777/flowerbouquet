import _ from 'lodash';
import { EventListeningError, logger } from '../../common';
import { natsWrapper } from '../../nats-singleton';
import { OrderCreatedPublisher, OrderCancelledPublisher } from './publisher';

const sendOrderCreatedEvent = async ({ order }) => {
  try {
    logger.info('publishing order:created event for order', order);
    new OrderCreatedPublisher(natsWrapper.client).publish(order);
  } catch (e) {
    logger.error('Error occurred while publishing order created event');
    throw new EventListeningError(_.get(e, 'messsage'));
  }
};

const sendOrderDeletedEvent = async ({ order }) => {
  try {
    logger.info(`publishing order:deleted event for order`, order);
    new OrderCancelledPublisher(natsWrapper.client).publish(order);
  } catch (e) {
    logger.error('Error occurred while publishing order:cencelled event');
    throw new EventListeningError(_.get(e, 'messsage'));
  }
};

export { sendOrderCreatedEvent, sendOrderDeletedEvent };

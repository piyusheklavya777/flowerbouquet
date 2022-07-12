import _ from 'lodash';
import { EventListeningError, logger } from '../../common';
import { natsWrapper } from '../../nats-singleton';
import { BouquetCreatedPublisher, BouquetUpdatedPublisher, BouquetDeletedPublisher } from './publisher';

const sendBouquetCreatedEvent = async ({ bouquet }) => {
  try {
    const { name, discount, flowers, id: bouquetId } = bouquet;
    const payload = {
      bouquetId,
      name,
      discount,
      flowers,
    };
    logger.info('publishing bouquet:created event for bouquet', payload);
    new BouquetCreatedPublisher(natsWrapper.client).publish(payload);
  } catch (e) {
    logger.error('Error occurred while publishing bouquet created event');
    throw new EventListeningError(_.get(e, 'messsage'));
  }
};

const sendBouquetUpdatedEvent = async ({ bouquet }) => {
  try {
    const { name, price, flowers, id: bouquetId } = bouquet;
    const payload = {
      bouquetId,
      name,
      price,
      flowers,
    };
    logger.info('publishing bouquet:updated event for bouquet', payload);
    new BouquetUpdatedPublisher(natsWrapper.client).publish(payload);
  } catch (e) {
    logger.error('Error occurred while publishing bouquet updated event');
    throw new EventListeningError(_.get(e, 'messsage'));
  }
};

const sendBouquetDeletedEvent = async ({ bouquetId }) => {
  try {
    logger.info(`publishing bouquet:deleted event bouquetId: ${bouquetId}`);
    new BouquetDeletedPublisher(natsWrapper.client).publish({
      bouquetId,
    });
  } catch (e) {
    logger.error('Error occurred while publishing bouquet:deleted event');
    throw new EventListeningError(_.get(e, 'messsage'));
  }
};

export { sendBouquetCreatedEvent, sendBouquetUpdatedEvent, sendBouquetDeletedEvent };

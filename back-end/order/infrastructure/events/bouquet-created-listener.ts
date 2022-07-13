import { Message } from 'node-nats-streaming';
import { EventKeys, BouquetCreatedEvent, Listener, logger } from '../../common';
import { createBouquet } from '../../packages/bouquet-create';
import { queueGroupName } from './queue-group-name';

export class BouquetCreatedListener extends Listener<BouquetCreatedEvent> {
  subject: EventKeys.BOUQUET_CREATED = EventKeys.BOUQUET_CREATED;

  queueGroupName = queueGroupName;

  async onMessage(data: BouquetCreatedEvent['data'], msg: Message) {
    try {
      logger.info('received flower:create event', data);
      await createBouquet(data);
    } catch (e) {
      logger.error('ERROR PROCESSING THE FLOWER:CREATED EVENT', e);
      return;
    }
    msg.ack();
  }
}

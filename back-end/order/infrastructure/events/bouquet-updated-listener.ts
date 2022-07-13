import { Message } from 'node-nats-streaming';
import { EventKeys, BouquetUpdatedEvent, Listener, logger } from '../../common';
import { updateBouquet } from '../../packages/bouquet-update';
import { queueGroupName } from './queue-group-name';

export class BouquetUpdatedListener extends Listener<BouquetUpdatedEvent> {
  subject: EventKeys.BOUQUET_UPDATED = EventKeys.BOUQUET_UPDATED;

  queueGroupName = queueGroupName;

  async onMessage(data: BouquetUpdatedEvent['data'], msg: Message) {
    try {
      logger.silly('received bouquet:updated event', data);
      await updateBouquet(data);
    } catch (e) {
      logger.error('ERROR PROCESSING THE BOUQUET:UPDATED EVENT', e);
      return;
    }
    msg.ack();
  }
}

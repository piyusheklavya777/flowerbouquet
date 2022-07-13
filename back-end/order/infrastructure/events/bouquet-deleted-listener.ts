import { Message } from 'node-nats-streaming';
import { EventKeys, BouquetDeletedEvent, Listener, logger } from '../../common';
import { deleteBouquet } from '../../packages/bouquet-delete';
import { queueGroupName } from './queue-group-name';

export class BouquetDeletedListener extends Listener<BouquetDeletedEvent> {
  subject: EventKeys.BOUQUET_DELETED = EventKeys.BOUQUET_DELETED;

  queueGroupName = queueGroupName;

  async onMessage(data: BouquetDeletedEvent['data'], msg: Message) {
    try {
      logger.info('received BOUQUET:DELETED event', data);
      await deleteBouquet(data);
    } catch (e) {
      logger.error('ERROR PROCESSING THE BOUQUET:DELETED EVENT', e);
      return;
    }
    msg.ack();
  }
}

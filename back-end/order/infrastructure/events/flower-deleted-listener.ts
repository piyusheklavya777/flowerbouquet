import { Message } from 'node-nats-streaming';
import { EventKeys, FlowerDeletedEvent, Listener, logger } from '../../common';
import { deleteFlower } from '../../packages/flower-delete';
import { queueGroupName } from './queue-group-name';

export class FlowerDeletedListener extends Listener<FlowerDeletedEvent> {
  subject: EventKeys.FLOWER_DELETED = EventKeys.FLOWER_DELETED;

  queueGroupName = queueGroupName;

  async onMessage(data: FlowerDeletedEvent['data'], msg: Message) {
    try {
      logger.info('received FLOWER:DELETED event', data);
      await deleteFlower(data);
    } catch (e) {
      logger.error('ERROR PROCESSING THE FLOWER:DELETED EVENT', e);
      return;
    }
    msg.ack();
  }
}

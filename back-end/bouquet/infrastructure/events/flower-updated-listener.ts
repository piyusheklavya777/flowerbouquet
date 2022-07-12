import { Message } from 'node-nats-streaming';
import { EventKeys, FlowerUpdatedEvent, Listener, logger } from '../../common';
import { updateFlower } from '../../packages/flower-update';
import { queueGroupName } from './queue-group-name';

export class FlowerUpdatedListener extends Listener<FlowerUpdatedEvent> {
  subject: EventKeys.FLOWER_UPDATED = EventKeys.FLOWER_UPDATED;

  queueGroupName = queueGroupName;

  async onMessage(data: FlowerUpdatedEvent['data'], msg: Message) {
    try {
      logger.info('received flower:updated event', data);
      await updateFlower(data);
    } catch (e) {
      logger.error('ERROR PROCESSING THE FLOWER:UPDATED EVENT', e);
      return;
    }
    msg.ack();
  }
}

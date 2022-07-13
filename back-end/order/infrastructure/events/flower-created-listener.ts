import { Message } from 'node-nats-streaming';
import { EventKeys, FlowerCreatedEvent, Listener, logger } from '../../common';
import { createFlower } from '../../packages/flower-create';
import { queueGroupName } from './queue-group-name';

export class FlowerCreatedListener extends Listener<FlowerCreatedEvent> {
  subject: EventKeys.FLOWER_CREATED = EventKeys.FLOWER_CREATED;

  queueGroupName = queueGroupName;

  async onMessage(data: FlowerCreatedEvent['data'], msg: Message) {
    try {
      logger.info('received flower:create event', data);
      await createFlower(data);
    } catch (e) {
      logger.error('ERROR PROCESSING THE FLOWER:CREATED EVENT', e);
      return;
    }
    msg.ack();
  }
}

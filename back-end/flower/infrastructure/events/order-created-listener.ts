import { Message } from 'node-nats-streaming';
import { EventKeys, OrderCreatedEvent, Listener, logger } from '../../common';
import { handleOrderCreated } from '../../packages/order/created';
import { queueGroupName } from './queue-group-name';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: EventKeys.ORDER_CREATED = EventKeys.ORDER_CREATED;

  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    try {
      logger.info('received order:created event', data);
      await handleOrderCreated(data);
    } catch (e) {
      logger.error('ERROR PROCESSING THE ORDER:CREATED EVENT', e);
      return;
    }
    msg.ack();
  }
}

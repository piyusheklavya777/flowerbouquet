import { Message } from 'node-nats-streaming';
import { EventKeys, OrderCancelledEvent, Listener, logger } from '../../common';
import { handleOrderCancelled } from '../../packages/order/cancelled';
import { queueGroupName } from './queue-group-name';

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: EventKeys.ORDER_CANCELLED = EventKeys.ORDER_CANCELLED;

  queueGroupName = queueGroupName;

  async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
    try {
      logger.info('received order:created event', data);
      await handleOrderCancelled(data);
    } catch (e) {
      logger.error('ERROR PROCESSING THE ORDER:CANCELLED EVENT', e);
      return;
    }
    msg.ack();
  }
}

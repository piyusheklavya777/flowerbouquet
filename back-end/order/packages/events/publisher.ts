/* eslint-disable max-classes-per-file */
import { OrderCreatedEvent, Publisher, EventKeys, OrderCancelledEvent } from '../../common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: EventKeys.ORDER_CREATED = EventKeys.ORDER_CREATED;
}

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: EventKeys.ORDER_CANCELLED = EventKeys.ORDER_CANCELLED;
}

import EventKey from '../event-keys';

export interface OrderShouldCancelEvent {
  subject: EventKey.ORDER_SHOULD_CANCEL;
  data: {
    orderId: string;
  };
}

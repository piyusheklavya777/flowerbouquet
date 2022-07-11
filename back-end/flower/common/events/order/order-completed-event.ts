import EventKey from '../event-keys';

export interface OrderCompletedEvent {
  subject: EventKey.ORDER_COMPLETED;
  data: {
    orderId: string;
  };
}

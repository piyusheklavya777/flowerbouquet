import { EventKeys } from '../../index';

export interface OrderCompletedEvent {
  subject: EventKeys.ORDER_COMPLETED;
  data: {
    orderId: string;
  };
}

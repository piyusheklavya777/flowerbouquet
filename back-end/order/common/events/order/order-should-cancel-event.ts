import { EventKeys } from '../../index';

export interface OrderShouldCancelEvent {
  subject: EventKeys.ORDER_SHOULD_CANCEL;
  data: {
    orderId: string;
  };
}

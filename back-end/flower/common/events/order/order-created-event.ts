import { EventKeys } from '../../index';

export interface OrderCreatedEvent {
  subject: EventKeys.ORDER_CREATED;
  data: {
    orderId: string;
    status: string;
    customerId: string;
    bouquets: [
      {
        name: string;
        bouquetId: string;
        discount: number;
        flowers: [
          {
            flowerId: string;
            name: string;
            price: number;
            quantity: number;
          },
        ];
      },
    ];
  };
}

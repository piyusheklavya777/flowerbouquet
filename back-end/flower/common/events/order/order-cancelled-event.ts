import EventKey from '../event-keys';

export interface OrderCancelledEvent {
  subject: EventKey.ORDER_CANCELLED;
  data: {
    orderId: string;
    status: string;
    customerId: string;
    bouquets: [
      {
        name?: string;
        bouquetId?: string;
        discount?: number;
        flowers: [
          {
            flowerId: string;
            name?: string;
            price: number;
            quantity: number;
          },
        ];
      },
    ];
  };
}

import EventKey from '../event-keys';

export interface BouquetCreatedEvent {
  subject: EventKey.BOUQUET_CREATED;
  data: {
    bouquetId: string;
    description: string;
    name: string;
    vendorId: string;
    flowers: [
      {
        flowerId: string;
        quantity: number;
      },
    ];
    discount?: number;
  };
}

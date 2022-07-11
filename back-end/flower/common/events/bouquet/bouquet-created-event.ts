import { EventKeys } from '../../index';

export interface BouquetCreatedEvent {
  subject: EventKeys.BOUQUET_CREATED;
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

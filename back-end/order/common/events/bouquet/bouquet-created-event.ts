import { EventKeys } from '../../index';

export interface BouquetCreatedEvent {
  subject: EventKeys.BOUQUET_CREATED;
  data: {
    bouquetId: string;
    name: string;
    flowers: [
      {
        flowerId: string;
        quantity: number;
      },
    ];
    discount?: number;
  };
}

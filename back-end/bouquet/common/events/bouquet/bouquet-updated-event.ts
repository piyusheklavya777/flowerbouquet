import { EventKeys } from '../../index';

export interface BouquetUpdatedEvent {
  subject: EventKeys.BOUQUET_UPDATED;
  data: {
    bouquetId: string;
    name?: string;
    description?: string;
    discount?: number;
    flowers?: [
      {
        flowerId: string;
        quantity: number;
      },
    ];
  };
}

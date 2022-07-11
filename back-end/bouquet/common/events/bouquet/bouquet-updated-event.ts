import { EventKeys } from '../../index';

export interface BouquetUpdateddEvent {
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

import EventKey from '../event-keys';

export interface BouquetUpdateddEvent {
  subject: EventKey.BOUQUET_UPDATED;
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

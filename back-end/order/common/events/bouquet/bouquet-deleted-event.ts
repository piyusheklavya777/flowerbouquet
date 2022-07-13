import { EventKeys } from '../../index';

export interface BouquetDeletedEvent {
  subject: EventKeys.BOUQUET_DELETED;
  data: {
    bouquetId: string;
  };
}

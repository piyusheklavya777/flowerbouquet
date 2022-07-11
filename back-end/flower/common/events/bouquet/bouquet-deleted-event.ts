import EventKey from '../event-keys';

export interface BouquetDeletedEvent {
  subject: EventKey.FLOWER_DELETED;
  data: {
    flowerId: string;
  };
}

import { EventKeys } from '../../index';

export interface BouquetDeletedEvent {
  subject: EventKeys.FLOWER_DELETED;
  data: {
    flowerId: string;
  };
}

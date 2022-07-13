import { EventKeys } from '../../index';

export interface FlowerDeletedEvent {
  subject: EventKeys.FLOWER_DELETED;
  data: {
    flowerId: string;
  };
}

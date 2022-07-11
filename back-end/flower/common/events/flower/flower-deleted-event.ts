import EventKey from '../event-keys';

export interface FlowerDeletedEvent {
  subject: EventKey.FLOWER_DELETED;
  data: {
    flowerId: string;
  };
}

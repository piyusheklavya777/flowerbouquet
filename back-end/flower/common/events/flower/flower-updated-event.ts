import EventKey from '../event-keys';

export interface FlowerUpdatedEvent {
  subject: EventKey.FLOWER_UPDATED;
  data: {
    flowerId: string;
    name: string;
    price: number;
    quantityChange: number;
  };
}

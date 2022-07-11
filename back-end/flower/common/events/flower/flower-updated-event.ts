import { EventKeys } from '../../index';

export interface FlowerUpdatedEvent {
  subject: EventKeys.FLOWER_UPDATED;
  data: {
    flowerId: string;
    name: string;
    price: number;
    quantityChange: number;
  };
}

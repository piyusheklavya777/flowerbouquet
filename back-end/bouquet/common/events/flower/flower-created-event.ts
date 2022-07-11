import { EventKeys } from '../../index';

export interface FlowerCreatedEvent {
  subject: EventKeys.FLOWER_CREATED;
  data: {
    flowerId: string;
    name: string;
    price: number;
    quantityAvailable: number;
    vendorId: string;
    isActive: boolean;
  };
}

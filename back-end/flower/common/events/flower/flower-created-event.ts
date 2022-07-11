import EventKey from '../event-keys';

export interface FlowerCreatedEvent {
  subject: EventKey.FLOWER_CREATED;
  data: {
    flowerId: string;
    name: string;
    price: number;
    quantityAvailable: number;
    vendorId: string;
  };
}

import { FlowerCreatedEvent, Publisher, EventKeys } from '../../../common';

export class FlowerCreatedPublisher extends Publisher<FlowerCreatedEvent> {
  subject: EventKeys.FLOWER_CREATED = EventKeys.FLOWER_CREATED;
}

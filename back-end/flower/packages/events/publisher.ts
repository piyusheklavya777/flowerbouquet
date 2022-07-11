/* eslint-disable max-classes-per-file */
import { FlowerCreatedEvent, FlowerUpdatedEvent, Publisher, EventKeys, FlowerDeletedEvent } from '../../common';

export class FlowerCreatedPublisher extends Publisher<FlowerCreatedEvent> {
  subject: EventKeys.FLOWER_CREATED = EventKeys.FLOWER_CREATED;
}
export class FlowerUpdatedPublisher extends Publisher<FlowerUpdatedEvent> {
  subject: EventKeys.FLOWER_UPDATED = EventKeys.FLOWER_UPDATED;
}

export class FlowerDeletedPublisher extends Publisher<FlowerDeletedEvent> {
  subject: EventKeys.FLOWER_DELETED = EventKeys.FLOWER_DELETED;
}

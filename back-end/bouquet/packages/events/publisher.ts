/* eslint-disable max-classes-per-file */
import { BouquetCreatedEvent, BouquetUpdatedEvent, Publisher, EventKeys, BouquetDeletedEvent } from '../../common';

export class BouquetCreatedPublisher extends Publisher<BouquetCreatedEvent> {
  subject: EventKeys.BOUQUET_CREATED = EventKeys.BOUQUET_CREATED;
}
export class BouquetUpdatedPublisher extends Publisher<BouquetUpdatedEvent> {
  subject: EventKeys.BOUQUET_UPDATED = EventKeys.BOUQUET_UPDATED;
}

export class BouquetDeletedPublisher extends Publisher<BouquetDeletedEvent> {
  subject: EventKeys.BOUQUET_DELETED = EventKeys.BOUQUET_DELETED;
}

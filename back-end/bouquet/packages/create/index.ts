import { Bouquet } from '../db/models/bouquet';
import { logger } from '../../common/logger';
import { BouquetAlreadyExistsError } from '../../common';
import { sendBouquetCreatedEvent } from '../events';

export async function createBouquet({
  name,
  discount,
  flowers,
  creatorId,
  creatorName,
  description,
}): Promise<{ bouquetId: string }> {
  logger.info('POST /api/bouquet');

  await _checkUnique();

  async function _checkUnique() {
    if (await Bouquet.findOne({ name, isActive: true })) {
      throw new BouquetAlreadyExistsError();
    }
  }

  const createdBouquet = Bouquet.build({
    name,
    discount,
    flowers,
    creatorId,
    creatorName,
    description,
    isActive: true,
  });

  await createdBouquet.save();

  logger.info('New Bouquet created', createdBouquet);

  await sendBouquetCreatedEvent({ bouquet: createdBouquet });

  return { bouquetId: createdBouquet.id };
}

import { Bouquet } from '../db/models/bouquet';
import { logger } from '../../common/logger';
import { BouquetNotFoundError } from '../../common';
import { sendBouquetDeletedEvent } from '../events';

export async function deleteBouquet({ bouquetId, userId }) {
  logger.info(`request by user ${userId} to delete bouquet ${bouquetId}`);

  const updatedBouquet = (
    await Bouquet.findOneAndUpdate(
      { _id: bouquetId, creatorId: userId, isActive: true },
      { isActive: false },
      { new: true },
    )
  )?.toObject();

  if (!updatedBouquet) {
    logger.info('could not find bouquet with Id', { bouquetId });
    throw new BouquetNotFoundError();
  }

  await sendBouquetDeletedEvent({ bouquetId: updatedBouquet._id });

  logger.info(`Bouquet deleted`, updatedBouquet);
}

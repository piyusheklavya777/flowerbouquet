import { Flower } from '../db/models/flower';
import { logger } from '../../common/logger';
import { FlowerNotFoundError } from '../../common';
import { sendFlowerDeletedEvent } from '../events';

export async function deleteFlower({ flowerId, vendorId }) {
  logger.info(`request by vendor ${vendorId} to delete flower ${flowerId}`);

  const updatedFlower = (
    await Flower.findOneAndUpdate({ _id: flowerId, vendorId, isActive: true }, { isActive: false }, { new: true })
  )?.toObject();

  if (!updatedFlower) {
    logger.info('could not find flower with Id', { flowerId });
    throw new FlowerNotFoundError();
  }

  await sendFlowerDeletedEvent({ flowerId: updatedFlower._id });

  logger.info(`Flower deleted`, updatedFlower);
}

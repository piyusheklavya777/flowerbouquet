import { Flower } from '../db/models/flower';
import logger from '../../common/logger';
import { FlowerAlreadyExistsError } from '../../common';

export async function createFlower({
  name,
  price,
  quantityAvailable,
  vendorId,
  description,
  creatorName,
}): Promise<{ flowerId: string }> {
  logger.info('POST /api/flower');

  await _checkUnique();

  const createdFlower = Flower.build({
    name,
    price,
    quantityAvailable,
    vendorId,
    description,
    creatorName,
    isActive: true,
  });

  await createdFlower.save();

  logger.info('New flower created', createdFlower.toObject());

  return { flowerId: createdFlower.id };

  async function _checkUnique() {
    if (await Flower.findOne({ name, isActive: true })) {
      throw new FlowerAlreadyExistsError();
    }
  }
}

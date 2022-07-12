import { Flower } from '../db/models/flower';
import { logger } from '../../common/logger';
import { FlowerAlreadyExistsError } from '../../common';
import { sendFlowerCreatedEvent } from '../events';

export async function createFlower({ name, price, quantityAvailable }): Promise<{ flowerId: string }> {
  logger.info('POST /api/flower');

  await _checkUnique();

  return { flowerId: 'lol' };

  async function _checkUnique() {
    if (await Flower.findOne({ name, isActive: true })) {
      throw new FlowerAlreadyExistsError();
    }
  }
}

import { logger } from '../common';
import { Flower } from './db/models/flower';

const createFlower = async ({ flowerId, name, price, quantityAvailable }) => {
  const flower = await Flower.build({ flowerId, name, price, quantityAvailable, isActive: true });
  await flower.save();
  logger.info(`${name} flower id: ${flowerId} created successfully`, flower);
};

export { createFlower };

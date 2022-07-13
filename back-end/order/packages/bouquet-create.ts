import { logger } from '../common';
import { Bouquet } from './db/models/bouquet';

const createBouquet = async ({ bouquetId, name, discount = 0, flowers }) => {
  const bouquet = await Bouquet.build({ bouquetId, name, discount, flowers, isActive: true });
  await bouquet.save();
  logger.info(`${name} bouquet id: ${bouquetId} created successfully`, bouquet);
};

export { createBouquet };

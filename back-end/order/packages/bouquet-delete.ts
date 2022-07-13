import { logger } from '../common';
import { Bouquet } from './db/models/bouquet';

const deleteBouquet = async (attrs) => {
  const { bouquetId } = attrs;
  const bouquet = await Bouquet.findOneAndUpdate({ _id: bouquetId }, { isActive: false }, { new: true });
  logger.info(`${bouquet?.name} bouquet id: ${bouquetId} DELETED successfully`, bouquet);
};

export { deleteBouquet };

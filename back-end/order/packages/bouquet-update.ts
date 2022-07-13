import _ from 'lodash';
import { logger } from '../common';
import { Bouquet } from './db/models/bouquet';

const updateBouquet = async (attrs) => {
  const { bouquetId, name, discount, flowers } = attrs;
  const compactAttributes = _.omitBy({ name, discount, flowers }, _.isNil);
  const bouquet = await Bouquet.findOneAndUpdate({ _id: bouquetId }, compactAttributes, { new: true });
  logger.info(`${name} bouquet id: ${bouquetId} updated successfully`, bouquet);
};

export { updateBouquet };

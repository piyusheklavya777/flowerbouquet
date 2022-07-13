import _ from 'lodash';
import { BouquetNotFoundError, logger } from '../../common';
// import { sendFlowerUpdatedEvent } from '../events';
import { Bouquet } from '../db/models/bouquet';

export async function updateBouquet({ bouquetId, name, discount, flowers, description, userId }) {
  const compactAttributes = _.omitBy(
    {
      bouquetId,
      name,
      discount,
      flowers,
      description,
    },
    _.isNil,
  );

  await Promise.all(
    _.map(compactAttributes.flowers, ({ flowerId, quantity }) =>
      _updateFlowers({ flowerId, quantity, bouquetId, userId }),
    ),
  );

  delete compactAttributes.flowers;

  const updatedBouquet = await Bouquet.findOneAndUpdate(
    { _id: bouquetId, isActive: true, creatorId: userId },
    compactAttributes,
    { new: true },
  );

  if (!updatedBouquet) {
    throw new BouquetNotFoundError();
  }

  logger.info('updated bouquet', updatedBouquet);

  return { updatedBouquet };
}

async function _updateFlowers({ flowerId, quantity, bouquetId, userId }) {
  await Bouquet.updateMany(
    {
      _id: bouquetId,
      isActive: true,
      creatorId: userId,
      'flowers.flowerId': flowerId,
    },
    {
      $set: {
        'flowers.$.quantity': quantity,
      },
    },
    {
      new: true,
    },
  );
}

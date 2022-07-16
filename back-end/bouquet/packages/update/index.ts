import _ from 'lodash';
import { BouquetNotFoundError, logger } from '../../common';
// import { sendFlowerUpdatedEvent } from '../events';
import { Bouquet } from '../db/models/bouquet';
import { sendBouquetUpdatedEvent } from '../events';

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

  const bouquet = await Bouquet.findOne({ _id: bouquetId, isActive: true });
  if (!bouquet || bouquet === null) {
    throw new BouquetNotFoundError();
  }

  const bouquetObject = bouquet.toObject();

  await Promise.all(
    _.map(compactAttributes.flowers, async ({ flowerId, quantity }) => {
      if (_.some(bouquetObject.flowers, (flowerInDB) => flowerInDB.flowerId === flowerId)) {
        _updateFlowers({ flowerId, quantity, bouquetId, userId });
      } else {
        logger.info('Adding new flower to the bouquet', { flowerId });
        _addFlowersToBouquet({ flowerId, quantity, bouquetId, userId });
      }
    }),
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

  // logger.info('updated bouquet', updatedBouquet);

  await sendBouquetUpdatedEvent({ bouquet: updatedBouquet });

  return { ...updatedBouquet, bouquetId };
}

async function _addFlowersToBouquet({ flowerId, quantity, bouquetId, userId }) {
  const updated = await Bouquet.updateOne(
    {
      _id: bouquetId,
      isActive: true,
      creatorId: userId,
    },
    {
      $push: {
        flowers: {
          flowerId,
          quantity,
        },
      },
    },
    { new: true },
  );
  logger.silly('updated', { updated });
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

/* eslint-disable no-param-reassign */
import _ from 'lodash';
import { Bouquet } from '../db/models/bouquet';
import { Flower } from '../db/models/flower';
import { BouquetNotFoundError, logger } from '../../common';

export async function getBouquets({ bouquetId, namePrefix, userId }) {
  if (bouquetId) return _singleGet({ bouquetId, userId });

  let bouquets;

  if (namePrefix === "''" || _.isEmpty(namePrefix)) {
    bouquets = await Bouquet.find({ isActive: true });
  } else {
    bouquets = await Bouquet.find({
      name: {
        $regex: `^${namePrefix}.*`,
      },
      isActive: true,
    });
  }

  const bouquetObjects = _.map(bouquets, (v) => v.toObject());

  logger.info('bouquetObjects', bouquetObjects);

  const bouquetsWithoutProps = await Promise.all(
    _.map(bouquetObjects, async (bouquet) => {
      bouquet.bouquetId = bouquet._id;
      delete bouquet._id;
      if (bouquet.creatorId === userId) {
        bouquet.belongsToThisUser = true;
      }
      delete bouquet.creatorId;
      return _populateBouquet(bouquet);
    }),
  );

  return bouquetsWithoutProps;
}

async function _singleGet({ bouquetId, userId }) {
  let bouquet;
  try {
    bouquet = (await Bouquet.findOne({ _id: bouquetId, isActive: true }))?.toObject();
    if (!bouquet) {
      throw new BouquetNotFoundError();
    }
    if (bouquet.creatorId === userId) {
      bouquet.belongsToThisUser = true;
    }
  } catch (e) {
    logger.error('error while fetching data from bouquet db', { e });
    throw e;
  }
  logger.silly('bouquet', bouquet);
  return _populateBouquet(bouquet);
}

async function _populateBouquet(bouquet) {
  bouquet.flowers = await Promise.all(
    _.map(bouquet.flowers, async (flower) => {
      const flowerDetails = await Flower.findOne({ isActive: true, _id: flower.flowerId });
      flower.name = flowerDetails?.name;
      flower.price = flowerDetails?.price;
      delete flower._id;
      return flower;
    }),
  );

  return bouquet;
}

/* eslint-disable no-param-reassign */
import _ from 'lodash';
import { Flower } from '../db/models/flower';
import logger from '../../common/logger';
import { FlowerNotFoundError } from '../../common';

export async function getFlowers({ flowerId, namePrefix, userId }) {
  if (flowerId) return _singleGet({ flowerId, userId });

  let flowers;

  if (namePrefix) {
    flowers = await Flower.find({
      name: {
        $regex: `^${namePrefix}.*`,
      },
      isActive: true,
    });
  } else {
    flowers = await Flower.find({ isActive: true });
  }

  const flowerObjects = _.map(flowers, (v) => v.toObject());

  logger.info('flowerObjects', flowerObjects);

  const flowersWithoutProps = _.map(flowerObjects, (flower) => {
    if (flower.vendorId === userId) {
      flower.belongsToThisUser = true;
    }
    delete flower.vendorId;
    return flower;
  });

  return flowersWithoutProps;

  // logger.info(`Flower updated`, updatedFlower);

  // return updatedFlower;
}

async function _singleGet({ flowerId, userId }) {
  const flower = (await Flower.findOne({ _id: flowerId, isActive: true }))?.toObject();
  if (!flower) {
    throw new FlowerNotFoundError();
  }
  if (flower.vendorId === userId) {
    flower.belongsToThisUser = true;
  }
  return flower;
}

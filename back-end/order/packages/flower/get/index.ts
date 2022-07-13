/* eslint-disable no-param-reassign */
import _ from 'lodash';
import { Flower } from '../../db/models/flower';
import { logger } from '../../../common';

export async function getFlowers({ namePrefix }) {
  if (namePrefix === "''" || _.isEmpty(namePrefix)) {
    return _getAll();
  }

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

  return flowerObjects;
}

async function _getAll() {
  const flowers = await Flower.find({ isActive: true });
  return flowers;
}

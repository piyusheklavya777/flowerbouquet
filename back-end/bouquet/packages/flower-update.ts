import _ from 'lodash';
import { logger } from '../common';
import { Flower } from './db/models/flower';

const updateFlower = async (attrs) => {
  const { flowerId, name, price, quantityAvailable, isActive } = attrs;
  const compactAttributes = _.omitBy({ name, price, quantityAvailable, isActive }, _.isNil);
  const flower = await Flower.findOneAndUpdate({ _id: flowerId }, compactAttributes, { new: true });
  logger.info(`${name} flower id: ${flowerId} updated successfully`, flower);
};

export { updateFlower };

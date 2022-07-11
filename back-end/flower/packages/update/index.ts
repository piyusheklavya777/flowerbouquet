import _ from 'lodash';
import { Flower } from '../db/models/flower';
import { FlowerNotFoundError, logger } from '../../common';

export async function updateFlower({ flowerId, name, price, quantityAvailable, description, vendorId }) {
  const compactAttributes = _.omitBy(
    {
      name,
      price,
      quantityAvailable,
      description,
    },
    _.isNil,
  );

  logger.info(`request by vendor ${vendorId} to update flower ${flowerId}'s following attributes`, compactAttributes);

  const updatedFlower = (
    await Flower.findOneAndUpdate({ _id: flowerId, vendorId, isActive: true }, compactAttributes, { new: true })
  )?.toObject();

  if (!updatedFlower) {
    logger.info('could not find flower with Id', { flowerId });
    throw new FlowerNotFoundError();
  }

  logger.info(`Flower updated`, updatedFlower);

  return updatedFlower;
}

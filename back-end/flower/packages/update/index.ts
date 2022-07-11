import _ from 'lodash';
import { Flower } from '../db/models/flower';
import { FlowerNotFoundError, logger } from '../../common';

export async function updateFlower({ flowerId, name, price, quantityAdded, description, vendorId }) {
  let compactAttributes = _.omitBy(
    {
      name,
      price,
      quantityAdded,
      description,
    },
    _.isNil,
  );

  if (compactAttributes.quantityAdded) {
    _.set(compactAttributes, '$inc', { quantityAvailable: compactAttributes.quantityAdded });
    compactAttributes = _.omit(compactAttributes, ['quantityAdded']);
  }

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

import _ from 'lodash';
import { Flower } from '../db/models/flower';
import { FlowerNotFoundError, logger } from '../../common';
import { sendFlowerUpdatedEvent } from '../events';

export async function updateFlower(attrs) {
  const { flowerId, name, price, quantityAdded, description, vendorId, invokeType = 'http' } = attrs;
  let compactAttributes = _.omitBy(
    {
      name,
      price,
      quantityAdded: parseInt(quantityAdded, 10),
      description,
    },
    _.isNil,
  );

  if (compactAttributes.quantityAdded) {
    _.set(compactAttributes, '$inc', { quantityAvailable: compactAttributes.quantityAdded });
    compactAttributes = _.omit(compactAttributes, ['quantityAdded']);
  }

  logger.info(`request by vendor ${vendorId} to update flower ${flowerId}'s following attributes`, compactAttributes);

  let updatedFlower;
  if (invokeType === 'http') {
    updatedFlower = (
      await Flower.findOneAndUpdate({ _id: flowerId, vendorId, isActive: true }, compactAttributes, { new: true })
    )?.toObject();
  } else {
    updatedFlower = (
      await Flower.findOneAndUpdate({ _id: flowerId, isActive: true }, compactAttributes, { new: true })
    )?.toObject();
  }

  if (!updatedFlower) {
    logger.info('could not find flower with Id', { flowerId });
    throw new FlowerNotFoundError();
  }
  logger.info(`Flower updated`, updatedFlower);

  await sendFlowerUpdatedEvent({ flower: updatedFlower });

  return updatedFlower;
}

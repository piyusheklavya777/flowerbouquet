import { logger } from '../common';
import { Flower } from './db/models/flower';

const deleteFlower = async (attrs) => {
  const { flowerId } = attrs;
  const flower = await Flower.findOneAndUpdate({ _id: flowerId }, { isActive: false }, { new: true });
  logger.info(`${flower?.name} flower id: ${flowerId} DELETED successfully`, flower);
};

export { deleteFlower };

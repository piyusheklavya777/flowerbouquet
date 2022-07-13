import { Order } from '../../db/models/order';
import { logger, OrderNotFoundError, OrderStatus } from '../../../common';
import { sendOrderDeletedEvent } from '../../events';

export async function deleteOrder({ orderId, userId }) {
  logger.info(`request by user ${userId} to delete order ${orderId}`);

  const updatedOrder = (
    await Order.findOneAndUpdate(
      { _id: orderId, customerId: userId, isActive: true, status: OrderStatus.CREATED },
      { isActive: false, status: OrderStatus.CANCELLED },
      { new: true },
    )
  )?.toObject();

  if (!updatedOrder) {
    logger.info('could not find order with Id', { orderId });
    throw new OrderNotFoundError();
  }

  await sendOrderDeletedEvent({ order: updatedOrder });

  logger.info(`Order deleted`, updatedOrder);
}

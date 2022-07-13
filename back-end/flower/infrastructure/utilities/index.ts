// import mongoose from "mongoose";
import mongoose from 'mongoose';
import _ from 'lodash';
import { DatabaseConnectionError } from '../../common/errors/database-connection-error';
import { GenericInternalError, logger } from '../../common';
import { natsWrapper } from '../../nats-singleton';
import { OrderCreatedListener } from '../events/order-created-listener';
import { OrderCancelledListener } from '../events/order-deleted-listener';

async function applicationInitialize() {
  try {
    _verifyEnviroment();
    await _connectToDatabase();
    await _connectToEventBus();
    await _startListeningToEvents();
    logger.info('application initialized');
  } catch (error: unknown) {
    logger.error('Application initilizing failed with following error', { error });
    throw error;
  }
}

function _verifyEnviroment() {
  if (!process.env.JWT_KEY) {
    logger.error('JWT_KEY must be defined');
    throw new GenericInternalError('JWT_KEY must be defined');
  }
}

async function _connectToDatabase() {
  if (!process.env.MONGO_URI) {
    throw new GenericInternalError('MONGO_URI must be defined');
  }
  try {
    logger.info('connecting to mongoose client');
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await mongoose.connect(process.env.MONGO_URI!);
    logger.info('Succesfully connected to database !!');
  } catch (error) {
    logger.error('Failed connecting to mongoose', { error });
    throw new DatabaseConnectionError();
  }
}

async function _connectToEventBus() {
  if (!process.env.NATS_CLIENT_ID) {
    throw new GenericInternalError('NATS_CLIENT_ID must be defined');
  }
  if (!process.env.NATS_URL) {
    throw new GenericInternalError('NATS_URL must be defined');
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new GenericInternalError('NATS_CLUSTER_ID must be defined');
  }
  try {
    logger.info('trying to connect to the event bus');
    await natsWrapper.connect(process.env.NATS_CLUSTER_ID, process.env.NATS_CLIENT_ID, process.env.NATS_URL);
    natsWrapper.client.on('close', () => {
      logger.info('NATS connection closed!');
      process.exit();
    });
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());
  } catch (e) {
    logger.error('error while trying to connect to the event bus', e);
    throw new GenericInternalError(_.get(e, 'message'));
  }
}

async function _startListeningToEvents() {
  new OrderCreatedListener(natsWrapper.client).listen();
  new OrderCancelledListener(natsWrapper.client).listen();
}

export { applicationInitialize };

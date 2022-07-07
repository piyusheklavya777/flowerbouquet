// import mongoose from "mongoose";
import mongoose from "mongoose";
import { DatabaseConnectionError } from "../../common/errors/database-connection-error";
import logger from "../../common/logger";

async function applicationInitialize () {
    try {
        _verifyEnviroment();
        await _connectToDatabase();
        logger.info('application initialized');
    } catch (error: unknown) {
        logger.error('Application initilizing failed with following error',{ error });
        throw error;
    }
}

function _verifyEnviroment() {
    if (!process.env.JWT_KEY) {
        logger.error('JWT_KEY must be defined');
        throw new Error('JWT_KEY must be defined');
      }
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI must be defined');
      }
}

async function _connectToDatabase() {
    try {
        logger.info('connecting to mongoose client');
        await mongoose.connect(
            process.env.MONGO_URI!,
        );
        logger.info('Succesfully connected to database !!');

    } catch (error) {
        logger.error('Failed connecting to mongoose', { error });
        throw new DatabaseConnectionError();
    }
}

export { applicationInitialize };
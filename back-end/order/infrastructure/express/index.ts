import { logger } from '../../common/logger';
import { applicationInitialize } from '../utilities';
import { app } from './app';

const startExpressApp = async () => {
  await applicationInitialize();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => logger.info(`ORDER SERVICE live on port ${PORT}`));
};

startExpressApp();

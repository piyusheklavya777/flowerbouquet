import logger from '../../common/logger';
import { applicationInitialize } from '../_utilities';
import { app } from './app';

const startup = async () => {
  await applicationInitialize();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => logger.info(`FLOWER SERVICE live on port ${PORT}`));
};

startup();

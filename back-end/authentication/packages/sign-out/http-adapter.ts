import _ from 'lodash';
import { standardHttpResponseInterface } from '../../common';
import logger from '../../common/logger';

export async function signoutHttpHandler ({}) : Promise<standardHttpResponseInterface> {
    logger.info('POST /api/users/signout');
    return { httpCode: 204, options: { unsetCookies: ['jwt'] } };
};



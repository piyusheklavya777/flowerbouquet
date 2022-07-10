import * as JWT from 'jsonwebtoken';
import { UserNotLoggedInError, handleError } from '../index';
import logger from '../logger';

interface currentUserDetailsIntf {
  email: string;
  name: string;
  userId: string;
}

export function getCurrentUser(session: { jwt: string }): currentUserDetailsIntf {
  let userDetails;
  try {
    const { jwt } = session;
    if (!jwt) {
      logger.error('JWT token not found in the request object');
      throw new UserNotLoggedInError();
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    userDetails = JWT.verify(jwt, process.env.JWT_KEY!);
  } catch (e) {
    logger.error('error while fetching userDetails', e);
    handleError(e);
  }
  return userDetails;
}


import { User } from '../db/models/user';
import * as jwt from 'jsonwebtoken';
import { UserNotFoundError } from '../../common';
import logger from '../../common/logger';
import{ Password } from '../utilities/password';

interface signinHandlerInterface {
  jwt: string;
  name: string;
}

export async function signinHandler (email: string, password : string): Promise<signinHandlerInterface> {
    logger.info('POST /api/users/signin', { email, password });

    const { id, name, storedPassword } = await _getUserByEmail();

    const passwordMatch = await Password.compare(storedPassword, password);
    
    if (!passwordMatch) {
      logger.info('Login credentials invalid');
      throw new UserNotFoundError();
    }
    
    const userJWT = _getJsonWebToken();

    return { jwt: userJWT, name };
  
    async function _getUserByEmail(): Promise<{ id: string, name: string, storedPassword: string }> {
      const user = await User.findOne({ email });
      if (!user) {
        logger.info('Login credentials invalid');
        throw new UserNotFoundError();
      }
      return { id: user.id, name: user.name, storedPassword: user.password };
    }
  
    function _getJsonWebToken (): string {
      if (!process.env.JWT_KEY) {
        throw new Error('JWT TOKEN KEY Missing');
      }
      return jwt.sign({
        id,
        email,
        name,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      }, process.env.JWT_KEY!);
    }
}
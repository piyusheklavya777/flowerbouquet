
import { User } from '../db/models/user';
import * as jwt from 'jsonwebtoken';
import { UserAlreadyExistsError } from '../../common';
import logger from '../../common/logger';

interface signupHandlerInterface {
  id: string;
  jwt: string;
}

export async function signupHandler (name: string, email: string, password : string): Promise<signupHandlerInterface> {
    let id: string; // primary index of user, created in the database
    let userJWT: string;
    logger.info('POST /api/users/signup', { name, email, password });

    await _checkIfUserAlreadyExists();

    id = await _createNewUser();

    userJWT = _getJsonWebToken();

    return { id, jwt: userJWT };
  
    async function _checkIfUserAlreadyExists() {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.log('USER ALREADY EXISTS');
        throw new UserAlreadyExistsError()
      }
    }
  
    async function _createNewUser() {
      const user = await User.build({
        name,
        email,
        password,
      });
      await user.save();
      console.log('new user created', user);
      return user.id;
    }
  
    function _getJsonWebToken (): string {
      if (!process.env.JWT_KEY) {
        throw new Error('JWT TOKEN KEY Missing');
      }
      return jwt.sign({
        userId: id,
        email,
        name
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      }, process.env.JWT_KEY!);
          
      // _.set(request, ['session', 'jwt'], newToken);
    }
}
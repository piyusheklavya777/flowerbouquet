import  { UserAlreadyExists } from '@eklavguild/common';
import { User } from '../../models/user';
import * as jwt from 'jsonwebtoken';

export default async function handler ({ email, password }) {
    let id: any; // primary index of user, created in the database
    console.log('POST /api/users/signup', { email, password });

    await _checkIfUserAlreadyExists();

    await _createNewUser();

    await _setJsonWebToken();

    return { httpCodeMapping: 201, body: { email, id }};
  
    async function _checkIfUserAlreadyExists() {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.log('USER ALREADY EXISTS');
        throw new UserAlreadyExists();
      }
    }
  
    async function _createNewUser() {
      const user = await User.build({
        email,
        password,
      });
      await user.save();
      console.log('new user created', user);
      id = user.id;
    }
  
    function _setJsonWebToken () {
      if (!process.env.JWT_KEY) {
        throw new Error('JWT TOKEN KEY Missing');
      }
      const newToken = jwt.sign({
        id,
        email,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      }, process.env.JWT_KEY!);
          
      _.set(request, ['session', 'jwt'], newToken);
    }
  }
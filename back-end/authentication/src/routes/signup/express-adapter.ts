import {Router, Request, Response} from 'express';
import {body} from 'express-validator';
import {CustomError} from '@eklavguild/common';
import * as _ from 'lodash';
import {checkExpressRequestObjectForErrors} from '../../utilities';
import handler from './handler';

const signUpRouter = Router();

// express request object specific validation :
const signUpRouterInputRequirements = [
  body('email')
      .isEmail()
      .withMessage('Invalid email'),
  body('password')
      .trim()
      .isLength({min: 2, max: 15})
      .withMessage('Invalid Password'),
];
signUpRouter.post(
    '/api/users/signup',
    async (request : Request, response: Response) => {
      let email;
      let password;
      try {
        email = _.get(request, ['body', 'email']);
        password = _.get(request, ['body', 'password']);

        const {httpCodeMapping, body} = await handler({email, password});

        response.status(httpCodeMapping).send(body);
      } catch (e) {
        if (e instanceof CustomError) {
          console.log(`Custom Error ${e.name} occurred`);
          return response.status(e.httpCodeMapping).send({errors: e.serializeError()});
        }
        console.error('Unhandled error in /signup handler', e);
        response.status(400).send({message: 'unhandled Error in signup handler'});
      }
    },
);

export {signUpRouter};

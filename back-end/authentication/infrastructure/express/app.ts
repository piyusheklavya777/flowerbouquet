import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { Request, Response } from 'express';
import _ from 'lodash';
import { convertExpressRequestObjectToStandard, setStandardResponseToExpress } from './helper';
import { signupHttpHandler } from '../../packages/sign-up/http-adapter';
import { signinHttpHandler } from '../../packages/sign-in/http-adapter';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

export enum httpPathEnums {
    SIGN_UP = '/api/users/signup',
    SIGN_IN = '/api/users/signin',
    SIGN_OUT = '/api/users/signout'
}

app.post(httpPathEnums.SIGN_UP, async (expressRequest: Request, expressResponse: Response) => {
    const standardRequestObject = convertExpressRequestObjectToStandard(expressRequest);
    const standardResponse = await signupHttpHandler({ standardRequestObject });
    setStandardResponseToExpress(standardResponse, expressResponse);
});

app.post(httpPathEnums.SIGN_IN, async (expressRequest: Request, expressResponse: Response) => {
  const standardRequestObject = convertExpressRequestObjectToStandard(expressRequest);
  const standardResponse = await signinHttpHandler({ standardRequestObject });
  setStandardResponseToExpress(standardResponse, expressResponse);
});

app.all('*', async (req, res) => {
  res.status(400).send({ error: 'UnhandledPathAndMethodCombination', message: 'This combination of path and method is not valid'});
});

export { app };

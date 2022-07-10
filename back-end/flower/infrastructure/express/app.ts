import express, { Request, Response } from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { convertExpressRequestObjectToStandard, setStandardResponseToExpress } from './helper';
import { createFlowerHttpHandler } from '../../packages/create/http-adapter';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    name: 'session',
    signed: false,
    secure: false, // process.env.NODE_ENV !== 'test',
  }),
);

// eslint-disable-next-line no-shadow
enum httpPathEnums {
  CREATE = '/api/flower',
  UPDATE = '/api/flower/:flowerId',
  DELETE = '/api/flower/:flowerId',
  GET = '/api/flower/:flowerId',
  GET_ALL = '/api/flower/:flowerId',
}

app.post(httpPathEnums.CREATE, async (expressRequest: Request, expressResponse: Response) => {
  const standardRequestObject = convertExpressRequestObjectToStandard(expressRequest);
  const standardResponse = await createFlowerHttpHandler({ standardRequestObject });
  setStandardResponseToExpress(standardResponse, expressRequest, expressResponse);
});

// app.post(httpPathEnums.UPDATE, async (expressRequest: Request, expressResponse: Response) => {
//   const standardRequestObject = convertExpressRequestObjectToStandard(expressRequest);
//   const standardResponse = await signinHttpHandler({ standardRequestObject });
//    setStandardResponseToExpress(standardResponse, expressRequest, expressResponse);
// });

// app.post(httpPathEnums.DELETE, async (expressRequest: Request, expressResponse: Response) => {
//   const standardRequestObject = convertExpressRequestObjectToStandard(expressRequest);
//   const standardResponse = await signoutHttpHandler({ standardRequestObject });
//    setStandardResponseToExpress(standardResponse, expressRequest, expressResponse);
// });

// app.post(httpPathEnums.GET, async (expressRequest: Request, expressResponse: Response) => {
//   const standardRequestObject = convertExpressRequestObjectToStandard(expressRequest);
//   const standardResponse = await signoutHttpHandler({ standardRequestObject });
//    setStandardResponseToExpress(standardResponse, expressRequest, expressResponse);
// });

// app.post(httpPathEnums.GET_ALL, async (expressRequest: Request, expressResponse: Response) => {
//   const standardRequestObject = convertExpressRequestObjectToStandard(expressRequest);
//   const standardResponse = await signoutHttpHandler({ standardRequestObject });
//   setStandardResponseToExpress(standardResponse, expressRequest, expressResponse);
// });

app.all('*', async (req, res) => {
  res
    .status(400)
    .send({ error: 'UnhandledPathAndMethodCombination', message: 'This combination of path and method is not valid' });
});

export { app, httpPathEnums };

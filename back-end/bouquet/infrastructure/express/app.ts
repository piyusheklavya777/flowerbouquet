import express, { Request, Response } from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { convertExpressRequestObjectToStandard, setStandardResponseToExpress } from './helper';
import { createFlowerHttpHandler } from '../../packages/create/http-adapter';
import { updateFlowerHttpHandler } from '../../packages/update/http-adapter';
import { deleteFlowerHttpHandler } from '../../packages/delete/http-adapter';
import { getFlowerHttpHandler } from '../../packages/get/http-adapter';

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
  GET_ALL = '/api/flower/',
}

app.post(httpPathEnums.CREATE, async (expressRequest: Request, expressResponse: Response) => {
  const standardRequestObject = convertExpressRequestObjectToStandard(expressRequest);
  const standardResponse = await createFlowerHttpHandler({ standardRequestObject });
  setStandardResponseToExpress(standardResponse, expressRequest, expressResponse);
});

app.put(httpPathEnums.UPDATE, async (expressRequest: Request, expressResponse: Response) => {
  const standardRequestObject = convertExpressRequestObjectToStandard(expressRequest);
  const standardResponse = await updateFlowerHttpHandler({ standardRequestObject });
  setStandardResponseToExpress(standardResponse, expressRequest, expressResponse);
});

app.delete(httpPathEnums.DELETE, async (expressRequest: Request, expressResponse: Response) => {
  const standardRequestObject = convertExpressRequestObjectToStandard(expressRequest);
  const standardResponse = await deleteFlowerHttpHandler({ standardRequestObject });
  setStandardResponseToExpress(standardResponse, expressRequest, expressResponse);
});

app.get(httpPathEnums.GET, async (expressRequest: Request, expressResponse: Response) => {
  const standardRequestObject = convertExpressRequestObjectToStandard(expressRequest);
  const standardResponse = await getFlowerHttpHandler({ standardRequestObject });
  setStandardResponseToExpress(standardResponse, expressRequest, expressResponse);
});

app.get(httpPathEnums.GET_ALL, async (expressRequest: Request, expressResponse: Response) => {
  const standardRequestObject = convertExpressRequestObjectToStandard(expressRequest);
  const standardResponse = await getFlowerHttpHandler({ standardRequestObject });
  setStandardResponseToExpress(standardResponse, expressRequest, expressResponse);
});

app.all('*', async (req, res) => {
  res
    .status(400)
    .send({ error: 'UnhandledPathAndMethodCombination', message: 'This combination of path and method is not valid' });
});

export { app, httpPathEnums };

import express, { Request, Response } from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { convertExpressRequestObjectToStandard, setStandardResponseToExpress } from './helper';
import { createOrderHttpHandler } from '../../packages/order/create/http-adapter';
import { deleteOrderHttpHandler } from '../../packages/order/delete/http-adapter';
import { getFlowerHttpHandler } from '../../packages/flower/get/http-adapter';
import { getBouquetHttpHandler } from '../../packages/bouquet/get/http-adapter';
import { getOrdersHttpHandler } from '../../packages/order/get/http-adapter';

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
  GET_FLOWER = `/api/order/flower/:flowerId`,
  GET_ALL_FLOWERS = '/api/order/flower/',

  GET_BOUQUET = '/api/order/bouquet/:bouquetId',
  GET_ALL_BOUQUETS = '/api/order/bouquet/',

  CREATE_ORDER = '/api/order',
  DELETE_ORDER = '/api/order/:orderId',
  GET_ALL_ORDERS = '/api/order/',
}
// flowers api
app.get(httpPathEnums.GET_FLOWER, async (expressRequest: Request, expressResponse: Response) => {
  const standardRequestObject = convertExpressRequestObjectToStandard(expressRequest);
  const standardResponse = await getFlowerHttpHandler({ standardRequestObject });
  setStandardResponseToExpress(standardResponse, expressRequest, expressResponse);
});
app.get(httpPathEnums.GET_ALL_FLOWERS, async (expressRequest: Request, expressResponse: Response) => {
  const standardRequestObject = convertExpressRequestObjectToStandard(expressRequest);
  const standardResponse = await getFlowerHttpHandler({ standardRequestObject });
  setStandardResponseToExpress(standardResponse, expressRequest, expressResponse);
});

// bouquets api
app.get(httpPathEnums.GET_BOUQUET, async (expressRequest: Request, expressResponse: Response) => {
  const standardRequestObject = convertExpressRequestObjectToStandard(expressRequest);
  const standardResponse = await getBouquetHttpHandler({ standardRequestObject });
  setStandardResponseToExpress(standardResponse, expressRequest, expressResponse);
});
app.get(httpPathEnums.GET_ALL_BOUQUETS, async (expressRequest: Request, expressResponse: Response) => {
  const standardRequestObject = convertExpressRequestObjectToStandard(expressRequest);
  const standardResponse = await getBouquetHttpHandler({ standardRequestObject });
  setStandardResponseToExpress(standardResponse, expressRequest, expressResponse);
});

// orders api
app.post(httpPathEnums.CREATE_ORDER, async (expressRequest: Request, expressResponse: Response) => {
  const standardRequestObject = convertExpressRequestObjectToStandard(expressRequest);
  const standardResponse = await createOrderHttpHandler({ standardRequestObject });
  setStandardResponseToExpress(standardResponse, expressRequest, expressResponse);
});

app.delete(httpPathEnums.DELETE_ORDER, async (expressRequest: Request, expressResponse: Response) => {
  const standardRequestObject = convertExpressRequestObjectToStandard(expressRequest);
  const standardResponse = await deleteOrderHttpHandler({ standardRequestObject });
  setStandardResponseToExpress(standardResponse, expressRequest, expressResponse);
});

app.get(httpPathEnums.GET_ALL_ORDERS, async (expressRequest: Request, expressResponse: Response) => {
  const standardRequestObject = convertExpressRequestObjectToStandard(expressRequest);
  const standardResponse = await getOrdersHttpHandler({ standardRequestObject });
  setStandardResponseToExpress(standardResponse, expressRequest, expressResponse);
});

app.all('*', async (req, res) => {
  res
    .status(400)
    .send({ error: 'UnhandledPathAndMethodCombination', message: 'This combination of path and method is not valid' });
});

export { app, httpPathEnums };

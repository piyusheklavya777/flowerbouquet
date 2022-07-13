import express, { Request, Response } from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { convertExpressRequestObjectToStandard, setStandardResponseToExpress } from './helper';
import { createBouquetHttpHandler } from '../../packages/create/http-adapter';
import { updateBouquetHttpHandler } from '../../packages/update/http-adapter';
import { deleteBouquetHttpHandler } from '../../packages/delete/http-adapter';
// import { deleteFlowerHttpHandler } from '../../packages/delete/http-adapter';
import { getFlowerHttpHandler } from '../../packages/flower-get/http-adapter';
import { getBouquetHttpHandler } from '../../packages/get/http-adapter';

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
  CREATE_BOUQUET = '/api/bouquet',
  UPDATE_BOUQUET = '/api/bouquet/:bouquetId',
  DELETE_BOUQUET = '/api/bouquet/:bouquetId',
  GET_BOUQUET = '/api/bouquet/:bouquetId',
  GET_FLOWERS = '/api/bouquet/flower',
  GET_ALL_BOUQUETS = '/api/bouquet/',
}

app.post(httpPathEnums.CREATE_BOUQUET, async (expressRequest: Request, expressResponse: Response) => {
  const standardRequestObject = convertExpressRequestObjectToStandard(expressRequest);
  const standardResponse = await createBouquetHttpHandler({ standardRequestObject });
  setStandardResponseToExpress(standardResponse, expressRequest, expressResponse);
});

app.put(httpPathEnums.UPDATE_BOUQUET, async (expressRequest: Request, expressResponse: Response) => {
  const standardRequestObject = convertExpressRequestObjectToStandard(expressRequest);
  const standardResponse = await updateBouquetHttpHandler({ standardRequestObject });
  setStandardResponseToExpress(standardResponse, expressRequest, expressResponse);
});

app.delete(httpPathEnums.DELETE_BOUQUET, async (expressRequest: Request, expressResponse: Response) => {
  const standardRequestObject = convertExpressRequestObjectToStandard(expressRequest);
  const standardResponse = await deleteBouquetHttpHandler({ standardRequestObject });
  setStandardResponseToExpress(standardResponse, expressRequest, expressResponse);
});

app.get(httpPathEnums.GET_FLOWERS, async (expressRequest: Request, expressResponse: Response) => {
  const standardRequestObject = convertExpressRequestObjectToStandard(expressRequest);
  const standardResponse = await getFlowerHttpHandler({ standardRequestObject });
  setStandardResponseToExpress(standardResponse, expressRequest, expressResponse);
});

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

app.all('*', async (req, res) => {
  res
    .status(400)
    .send({ error: 'UnhandledPathAndMethodCombination', message: 'This combination of path and method is not valid' });
});

export { app, httpPathEnums };

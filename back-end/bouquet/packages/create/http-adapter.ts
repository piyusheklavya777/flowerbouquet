import _ from 'lodash';
import Joi from 'joi';
import { standardHttpResponseInterface } from '../../common';
import { validateAgainstJoiSchema } from '../../common/utility-functions/validate-against-schema';
import { handleErrorAndConvertToJSON } from '../../common/utility-functions';
import { getCurrentUser } from '../../common/utility-functions/get-current-user';
import { createBouquet } from '.';

export async function createBouquetHttpHandler({ standardRequestObject }): Promise<standardHttpResponseInterface> {
  try {
    validateAgainstJoiSchema(standardRequestObject, bouquetCreateHttpRequestSchema);

    const { name: currentUserName, userId } = getCurrentUser(standardRequestObject.session);

    const { name, discount, description, flowers } = _.get(standardRequestObject, 'body');

    const { bouquetId } = await createBouquet({
      name,
      discount,
      flowers,
      creatorId: userId,
      creatorName: currentUserName,
      description,
    });
    return {
      httpCode: 200,
      body: {
        bouquetId,
        name,
        discount,
        flowers,
        creatorId: userId,
        creatorName: currentUserName,
        description,
      },
    };
  } catch (e) {
    return handleErrorAndConvertToJSON(e);
  }
}

const bouquetCreateHttpRequestSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().min(2).max(100).required(),
    discount: Joi.number(),
    description: Joi.string().required(),
    flowers: Joi.array()
      .items(
        Joi.object({
          flowerId: Joi.string().required(),
          quantity: Joi.number().min(1).required(),
        }),
      )
      .min(1),
  }),
}).unknown();

import _ from 'lodash';
import Joi from 'joi';
import { standardHttpResponseInterface } from '../../common';
import { validateAgainstJoiSchema } from '../../common/utility-functions/validate-against-schema';
import { handleErrorAndConvertToJSON } from '../../common/utility-functions';
import { getCurrentUser } from '../../common/utility-functions/get-current-user';
import { deleteBouquet } from '.';

export async function deleteBouquetHttpHandler({ standardRequestObject }): Promise<standardHttpResponseInterface> {
  try {
    validateAgainstJoiSchema(standardRequestObject, bouquetDeleteHttpRequestSchema);

    const { userId } = getCurrentUser(standardRequestObject.session);

    const bouquetId = _.get(standardRequestObject, ['queryParameters', 'bouquetId']);

    await deleteBouquet({
      bouquetId,
      userId,
    });
    return {
      httpCode: 200,
    };
  } catch (e) {
    return handleErrorAndConvertToJSON(e);
  }
}

const bouquetDeleteHttpRequestSchema = Joi.object({
  queryParameters: Joi.object({
    bouquetId: Joi.string().min(5).required(),
  }).required(),
}).unknown();

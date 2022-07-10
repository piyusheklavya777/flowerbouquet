import safeStringify from 'fast-safe-stringify';
import logger from '../logger';
import { RequestValidationFailedError, handleError } from '../index';

export function validateAgainstJoiSchema(toValidate, schema) {
  let validationResult;
  try {
    validationResult = schema.validate(toValidate);

    if (validationResult.error) {
      const errorsArray = validationResult.error.details;
      const sanitisedErrors = errorsArray.map((e) => ({ message: e.message, path: e.path }));
      const errorMessage = safeStringify(sanitisedErrors);
      logger.error('schema validation failed', { toValidate, validationResult });
      throw new RequestValidationFailedError(errorMessage);
    }
  } catch (e) {
    handleError(e);
  }
  return validationResult;
}

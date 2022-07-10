import { CustomError } from './custom-error';

export class RequestValidationFailedError extends CustomError {
  httpCode = 400;

  errorCode = 'FB4003';

  name = 'RequestValidationFailedError';

  description;

  constructor(message?: string) {
    super(message || 'Request format incorrect. Schema validation failed');
    this.description = message || 'Request format incorrect. Schema validation failed';
    Object.setPrototypeOf(this, RequestValidationFailedError.prototype);
  }

  toJSON() {
    return { description: this.description, name: this.name, errorCode: this.errorCode };
  }
}

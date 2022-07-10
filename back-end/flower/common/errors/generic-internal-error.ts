import { CustomError } from './custom-error';

export class GenericInternalError extends CustomError {
  httpCode = 500;

  errorCode = 'FB5000';

  name = 'GenericInternalError';

  description;

  constructor(message?: string) {
    super(message || 'An internal error occurred');
    this.description = message || 'An internal error occurred';
    Object.setPrototypeOf(this, GenericInternalError.prototype);
  }

  toJSON() {
    return { description: this.description, name: this.name, errorCode: this.errorCode };
  }
}

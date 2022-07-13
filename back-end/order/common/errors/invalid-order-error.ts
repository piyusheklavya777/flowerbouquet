import { CustomError } from './custom-error';

export class InvalidOrderError extends CustomError {
  httpCode = 400;

  errorCode = 'FB4301';

  name = 'InvalidOrderError';

  description;

  constructor(message?: string) {
    super(message || 'Order cannot be placed. Please try again');
    this.description = message || 'Order cannot be placed. Please try again';
    Object.setPrototypeOf(this, InvalidOrderError.prototype);
  }

  toJSON() {
    return { description: this.description, name: this.name, errorCode: this.errorCode };
  }
}

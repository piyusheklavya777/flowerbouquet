import { CustomError } from './custom-error';

export class FlowerNotFoundError extends CustomError {
  httpCode = 404;

  errorCode = 'FB4204';

  name = 'FlowerNotFoundError';

  description = 'Flower with given Id was not found';

  constructor() {
    super('Flower with given Id was not found');
    Object.setPrototypeOf(this, FlowerNotFoundError.prototype);
  }

  toJSON() {
    return { description: this.description, name: this.name, errorCode: this.errorCode };
  }
}

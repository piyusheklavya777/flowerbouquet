import { CustomError } from './custom-error';

export class FlowerAlreadyExistsError extends CustomError {
  httpCode = 401;

  errorCode = 'FB4012';

  name = 'FlowerAlreadyExistsError';

  description = 'Another flower with the same name already exists';

  constructor() {
    super('Another flower with the same name already exists');
    Object.setPrototypeOf(this, FlowerAlreadyExistsError.prototype);
  }

  toJSON() {
    return { description: this.description, name: this.name, errorCode: this.errorCode };
  }
}

import { CustomError } from './custom-error';

export class BouquetAlreadyExistsError extends CustomError {
  httpCode = 401;

  errorCode = 'FB4312';

  name = 'BouquetAlreadyExistsError';

  description = 'Another bouquet with the same name already exists';

  constructor() {
    super('Another bouquet with the same name already exists');
    Object.setPrototypeOf(this, BouquetAlreadyExistsError.prototype);
  }

  toJSON() {
    return { description: this.description, name: this.name, errorCode: this.errorCode };
  }
}

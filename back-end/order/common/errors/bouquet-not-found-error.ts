import { CustomError } from './custom-error';

export class BouquetNotFoundError extends CustomError {
  httpCode = 404;

  errorCode = 'FB4204';

  name = 'BouquetNotFoundError';

  description = 'Bouquet with given Id was not found';

  constructor() {
    super('Bouquet with given Id was not found');
    Object.setPrototypeOf(this, BouquetNotFoundError.prototype);
  }

  toJSON() {
    return { description: this.description, name: this.name, errorCode: this.errorCode };
  }
}

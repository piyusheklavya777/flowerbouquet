import { CustomError } from './custom-error';

export class OrderNotFoundError extends CustomError {
  httpCode = 404;

  errorCode = 'FB4404';

  name = 'OrderNotFoundError';

  description = 'Order with given Id was not found';

  constructor() {
    super('Order with given Id was not found');
    Object.setPrototypeOf(this, OrderNotFoundError.prototype);
  }

  toJSON() {
    return { description: this.description, name: this.name, errorCode: this.errorCode };
  }
}

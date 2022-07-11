import { CustomError } from './custom-error';

export class DatabaseConnectionError extends CustomError {
  httpCode = 500;

  errorCode = 'FB5001';

  name = 'DatabaseConnectionError';

  description = 'Error connecting to database';

  constructor() {
    super('Error connecting to db');
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  toJSON() {
    return { description: this.description, name: this.name, errorCode: this.errorCode };
  }
}

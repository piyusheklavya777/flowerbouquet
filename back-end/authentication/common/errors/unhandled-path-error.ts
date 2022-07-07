import { CustomError } from './custom-error';

export class UnhandledPathError extends CustomError {
  
  httpCode = 400;
  errorCode = 'FB4001';
  name = 'UnhandledPathError';
  description = 'This request method and path combination is not supported';

  constructor() {
    super('This request method and path combination is not supported');
    Object.setPrototypeOf(this, UnhandledPathError.prototype);
  }

  toJSON() {
    return { description: this.description, name: this.name, errorCode:  this.errorCode };
  }
}

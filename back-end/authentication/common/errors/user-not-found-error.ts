import { CustomError } from './custom-error';

export class UserNotFoundError extends CustomError {
  
  httpCode = 404;
  errorCode = 'FB4004';
  name = 'UserNotFoundError';
  description = 'Invalid login credentials';

  constructor() {
    super('Invalid login credentials');
    Object.setPrototypeOf(this, UserNotFoundError.prototype);
  }

  toJSON() {
    return { description: this.description, name: this.name, errorCode:  this.errorCode };
  }
}

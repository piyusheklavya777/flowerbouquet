import { CustomError } from './custom-error';

export class UserNotLoggedInError extends CustomError {
  httpCode = 401;

  errorCode = 'FB4005';

  name = 'UserNotLoggedInError';

  description = 'User not logged in';

  constructor() {
    super('User not logged in');
    Object.setPrototypeOf(this, UserNotLoggedInError.prototype);
  }

  toJSON() {
    return { description: this.description, name: this.name, errorCode: this.errorCode };
  }
}

import { CustomError } from './custom-error';

export class UserAlreadyExistsError extends CustomError {
  
  httpCode = 401;
  errorCode = 'FB4011';
  name = 'UserAlreadyExistsError';
  description = 'User with same credentials alreeady exists';

  constructor() {
    super('User with same credentials alreeady exists');
    Object.setPrototypeOf(this, UserAlreadyExistsError.prototype);
  }

  toJSON() {
    return { description: this.description, name: this.name, errorCode:  this.errorCode };
  }
}

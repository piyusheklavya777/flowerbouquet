import { CustomError } from './custom-error';

export class EventListeningError extends CustomError {
  httpCode = 500;

  errorCode = 'FB5003';

  name = 'EventListeningError';

  description = 'Error while publishing to the eventbus';

  constructor(message?: string) {
    super(message || 'Error while publishing to the eventbus');
    Object.setPrototypeOf(this, EventListeningError.prototype);
  }

  toJSON() {
    return { description: this.description, name: this.name, errorCode: this.errorCode };
  }
}

import { CustomError } from './custom-error';

export class EventPublishingError extends CustomError {
  httpCode = 500;

  errorCode = 'FB5002';

  name = 'EventPublishingError';

  description = 'Error while publishing to the eventbus';

  constructor(message?: string) {
    super(message || 'Error while publishing to the eventbus');
    Object.setPrototypeOf(this, EventPublishingError.prototype);
  }

  toJSON() {
    return { description: this.description, name: this.name, errorCode: this.errorCode };
  }
}

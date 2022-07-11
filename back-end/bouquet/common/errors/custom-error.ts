export abstract class CustomError extends Error {
  abstract httpCode?: number;

  abstract errorCode: string;

  abstract description: string;

  abstract name: string;

  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract toJSON(): { description: string; errorCode: string; name: string };
}

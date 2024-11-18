import { ErrorCode } from './code';

export class APIError extends Error {
  public readonly name: string;
  constructor(
    public readonly description: string,
    public readonly code: ErrorCode,
  ) {
    super(description);
    Object.setPrototypeOf(this, APIError.prototype);

    this.name = 'APIError';
    this.code = code;

    Error.captureStackTrace(this, APIError);
  }
}

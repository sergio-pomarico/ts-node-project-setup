import { ErrorCode } from './code';

export class RepositoryError extends Error {
  public readonly name: string;
  constructor(
    public readonly description: string,
    public readonly method: string,
    public readonly repository: string,
    public readonly code: ErrorCode,
  ) {
    super(description);
    this.name = 'RepositoryError';
    Error.captureStackTrace(this, RepositoryError);
  }
}

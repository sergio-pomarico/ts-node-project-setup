export class RepositoryError extends Error {
  public readonly name: string;
  constructor(
    public readonly description: string,
    public readonly method: string,
    public readonly repository: string,
  ) {
    super(description);
    this.name = 'RepositoryError';
    Error.captureStackTrace(this, RepositoryError);
  }
}

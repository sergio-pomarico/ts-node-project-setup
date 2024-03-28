class ErrorDetails {
  constructor(
    public readonly code: string,
    public readonly message: string,
    public readonly description: string,
  ) {}
}

export class HttpError extends Error {
  public readonly error: ErrorDetails;

  constructor(
    public readonly message: string,
    description: string,
    code: string,
    public readonly status: 'fail' | 'error',
    public readonly statusCode: number,
  ) {
    super(message);
    this.error = new ErrorDetails(code, message, description);
    Error.captureStackTrace(this, HttpError);
  }

  static badRequest(
    message: string,
    description: string,
    code: string,
  ): HttpError {
    return new HttpError(message, description, code, 'error', 400);
  }

  static unauthorize(
    message: string,
    description: string,
    code: string,
  ): HttpError {
    return new HttpError(message, description, code, 'error', 401);
  }

  static forbiden(
    message: string,
    description: string,
    code: string,
  ): HttpError {
    return new HttpError(message, description, code, 'error', 403);
  }

  static notFound(
    message: string,
    description: string,
    code: string,
  ): HttpError {
    return new HttpError(message, description, code, 'error', 404);
  }

  static internalServer(
    description: string,
    code: string,
    message: string = 'Internal Server Error',
  ) {
    return new HttpError(message, description, code, 'fail', 500);
  }
}

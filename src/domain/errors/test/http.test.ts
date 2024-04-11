import { ErrorCode } from '#domain/errors/code';
import { HttpError } from '#domain/errors/http';

describe('test HttpError', () => {
  test('should create a HttpError with status "error" and statusCode 400', () => {
    // Arrange
    const message = 'Bad Request';
    const description = 'Invalid request';
    const code = ErrorCode.BAD_REQUEST;

    // Act
    const error = HttpError.badRequest(message, description);

    // Assert
    expect(error.message).toBe(message);
    expect(error.error.description).toBe(description);
    expect(error.error.code).toBe(code);
    expect(error.status).toBe('error');
    expect(error.statusCode).toBe(400);
  });

  test('should create a HttpError with status "error" and statusCode 401', () => {
    // Arrange
    const message = 'Unauthorized';
    const description = 'Access denied';
    const code = ErrorCode.UNAUTHORIZED;

    // Act
    const error = HttpError.unauthorize(message, description);

    // Assert
    expect(error.message).toBe(message);
    expect(error.error.description).toBe(description);
    expect(error.error.code).toBe(code);
    expect(error.status).toBe('error');
    expect(error.statusCode).toBe(401);
  });

  test('should create a HttpError with status "error" and statusCode 403', () => {
    // Arrange
    const message = 'Forbidden';
    const description = 'Access denied';
    const code = ErrorCode.FORBIDDEN;

    // Act
    const error = HttpError.forbiden(message, description);

    // Assert
    expect(error.message).toBe(message);
    expect(error.error.description).toBe(description);
    expect(error.error.code).toBe(code);
    expect(error.status).toBe('error');
    expect(error.statusCode).toBe(403);
  });

  test('should create a HttpError with status "error" and statusCode 404', () => {
    // Arrange
    const message = 'Not Found';
    const description = 'Resource not found';
    const code = ErrorCode.RESOURCE_NOT_FOUND;

    // Act
    const error = HttpError.notFound(message, description);

    // Assert
    expect(error.message).toBe(message);
    expect(error.error.description).toBe(description);
    expect(error.error.code).toBe(code);
    expect(error.status).toBe('error');
    expect(error.statusCode).toBe(404);
  });

  test('should create a HttpError with status "error" and statusCode 500', () => {
    // Arrange
    const description = 'Internal server error';
    const code = ErrorCode.INTERNAL_SERVER;

    // Act
    const error = HttpError.internalServer(description);

    // Assert
    expect(error.message).toBe('Internal Server Error');
    expect(error.error.description).toBe(description);
    expect(error.error.code).toBe(code);
    expect(error.status).toBe('fail');
    expect(error.statusCode).toBe(500);
  });
});

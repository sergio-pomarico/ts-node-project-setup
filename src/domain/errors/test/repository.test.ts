import { APIError } from '@domain/errors/api';
import { ErrorCode } from '../code';

describe('test APIError', () => {
  test('should create a APIError with the correct properties', () => {
    // Arrange
    const description = 'Error in repository';
    const code = ErrorCode.INTERNAL_SERVER;

    // Act
    const error = new APIError(description, code);

    // Assert
    expect(error.description).toBe(description);
    expect(error.name).toBe('APIError');
    expect(error.message).toBe(description);
    expect(error.code).toBe(code);
  });
});

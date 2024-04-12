import { RepositoryError } from '#domain/errors/repository';
import { ErrorCode } from '../code';

describe('test RepositoryError', () => {
  test('should create a RepositoryError with the correct properties', () => {
    // Arrange
    const description = 'Error in repository';
    const method = 'save';
    const repository = 'UserRepository';
    const code = ErrorCode.DATABASE;

    // Act
    const error = new RepositoryError(description, method, repository, code);

    // Assert
    expect(error.description).toBe(description);
    expect(error.method).toBe(method);
    expect(error.repository).toBe(repository);
    expect(error.name).toBe('RepositoryError');
    expect(error.message).toBe(description);
    expect(error.code).toBe(code);
  });
});

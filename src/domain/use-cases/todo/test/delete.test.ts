import { DeleteTodoUseCase } from '../delete';
import TODOEntity from '../../../entities/todo';
import { randomUUID } from 'node:crypto';

describe('DeleteTodoUseCase test', () => {
  test('should delete a todo by id', () => {
    // Arrange
    const todo: TODOEntity = {
      id: randomUUID() as string,
      completed: false,
      title: `any_title`,
      dueDate: new Date(),
    };

    const repository = {
      create: jest.fn().mockResolvedValue(todo),
      getById: jest.fn().mockResolvedValue(todo),
      all: jest.fn().mockResolvedValue([todo]),
      update: jest.fn().mockResolvedValue(todo),
      delete: jest.fn().mockResolvedValue(todo),
    };

    const deleteTodoUseCase = new DeleteTodoUseCase(repository);

    // Act
    const result = deleteTodoUseCase.run(todo.id!);

    // Assert
    expect(result).resolves.toEqual(todo);
    expect(repository.delete).toHaveBeenCalled();
  });
});

import { GetTodoByIdUseCase } from '@domain/use-cases/todo/get-by-id';
import TODOEntity from '@domain/entities/todo';
import { randomUUID } from 'node:crypto';

describe('GetTodoByIdUseCase test', () => {
  test('should get a todo by id', () => {
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
    const getAllTodoUseCase = new GetTodoByIdUseCase(repository);

    // Act
    const result = getAllTodoUseCase.run(todo.id!);

    // Assert
    expect(result).resolves.toEqual(todo);
    expect(repository.getById).toHaveBeenCalled();
  });
});

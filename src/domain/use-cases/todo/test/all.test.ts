import { GetAllTodoUseCase } from '../all';
import TODOEntity from '../../../entities/todo';
import { randomUUID } from 'node:crypto';

describe('GetAllTodoUseCase test', () => {
  test('should get a todo array', () => {
    // Arrange
    const array = Array.from({ length: 10 }, (_, i) => i);
    const todos: TODOEntity[] = array.map((i) => {
      return {
        id: randomUUID() as string,
        completed: false,
        title: `any_title_${i}`,
        dueDate: new Date(),
      };
    });

    const repository = {
      create: jest.fn().mockResolvedValue(todos[0]),
      getById: jest.fn().mockResolvedValue(todos[0]),
      all: jest.fn().mockResolvedValue(todos),
      update: jest.fn().mockResolvedValue(todos[0]),
      delete: jest.fn().mockResolvedValue(todos[0]),
    };
    const getAllTodoUseCase = new GetAllTodoUseCase(repository);

    // Act
    const result = getAllTodoUseCase.run();

    // Assert
    expect(result).resolves.toEqual(todos);
    expect(result).resolves.toHaveLength(10);
    expect(repository.all).toHaveBeenCalled();
  });
});

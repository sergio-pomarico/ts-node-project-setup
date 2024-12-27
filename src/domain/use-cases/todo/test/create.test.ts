import { CreateTodoUseCase } from '@domain/use-cases/todo/create';
import { CreateTodoDTO } from '@domain/dto/todo';
import TODOEntity from '@domain/entities/todo';
import { randomUUID } from 'node:crypto';

describe('CreateTodoUseCase test', () => {
  test('should create a todo', () => {
    // Arrange
    const createTodoDTO = CreateTodoDTO.create({
      title: 'any_title',
      dueDate: new Date(),
      completed: false,
    });
    const todo: TODOEntity = {
      id: randomUUID() as string,
      completed: createTodoDTO.completed!,
      ...createTodoDTO,
    };
    const repository = {
      create: jest.fn().mockResolvedValue(todo),
      getById: jest.fn().mockResolvedValue(todo),
      all: jest.fn().mockResolvedValue([todo]),
      update: jest.fn().mockResolvedValue(todo),
      delete: jest.fn().mockResolvedValue(todo),
    };
    const createTodoUseCase = new CreateTodoUseCase(repository);

    // Act
    const result = createTodoUseCase.run(createTodoDTO);

    // Assert
    expect(result).resolves.toEqual(todo);
    expect(repository.create).toHaveBeenCalledWith(createTodoDTO);
  });
});

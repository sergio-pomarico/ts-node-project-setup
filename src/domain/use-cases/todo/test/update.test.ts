import { UpdateTodoUseCase } from '@domain/use-cases/todo/update';
import TODOEntity from '@domain/entities/todo';
import { UpdateTodoDTO } from '@domain/dto/todo';
import { randomUUID } from 'node:crypto';

describe('UpdateTodoUseCase test', () => {
  test('should update a todo by id', () => {
    // Arrange
    const updateTodoDTO = UpdateTodoDTO.create({
      id: randomUUID() as string,
      title: 'any_title',
      dueDate: new Date(),
      completed: false,
    });
    const todo: TODOEntity = {
      title: updateTodoDTO.title!,
      dueDate: updateTodoDTO.dueDate!,
      completed: updateTodoDTO.completed!,
    };
    const repository = {
      create: jest.fn().mockResolvedValue(todo),
      getById: jest.fn().mockResolvedValue(todo),
      all: jest.fn().mockResolvedValue([todo]),
      update: jest.fn().mockResolvedValue(todo),
      delete: jest.fn().mockResolvedValue(todo),
    };

    const updateTodoUseCase = new UpdateTodoUseCase(repository);

    // Act
    const result = updateTodoUseCase.run(todo.id!, updateTodoDTO);

    // Assert
    expect(result).resolves.toEqual(todo);
    expect(repository.update).toHaveBeenCalled();
  });
});

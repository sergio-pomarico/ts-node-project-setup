import { TODODataSource } from '@domain/datasource/todo';
import { CreateTodoDTO, UpdateTodoDTO } from '@domain/dto/todo';
import TODOEntity from '@domain/entities/todo';
import { TODORepositoryImpl } from '@infrastructure/repositories/todo';
import { randomUUID } from 'node:crypto';

describe('TODO Repository test', () => {
  const todo: TODOEntity = {
    id: randomUUID() as string,
    completed: false,
    title: `any_title`,
    dueDate: new Date(),
  };
  const mockLogDatasouce: TODODataSource = {
    getById: jest.fn().mockResolvedValue(todo),
    all: jest.fn().mockResolvedValue([todo]),
    create: jest.fn().mockResolvedValue(todo),
    update: jest.fn().mockResolvedValue(todo),
    delete: jest.fn().mockResolvedValue(todo),
  };

  const todoRepository = new TODORepositoryImpl(mockLogDatasouce);

  test('todo repository should be create a todo', async () => {
    // Arrange
    const data = {
      title: 'any_title',
      dueDate: new Date(),
      completed: false,
    };
    const createTodoDTO = CreateTodoDTO.create(data);

    // Act
    await todoRepository.create(createTodoDTO);

    // Assert
    expect(mockLogDatasouce.create).toHaveBeenCalled();
  });

  test('todo repository get all TODOs', async () => {
    // Act
    await todoRepository.all();

    // Assert
    expect(mockLogDatasouce.all).toHaveBeenCalled();
  });

  test('todo repository get a TODO by id', async () => {
    // Act
    await todoRepository.getById(todo.id!);

    // Assert
    expect(mockLogDatasouce.getById).toHaveBeenCalled();
  });

  test('todo repository update a TODO by id', async () => {
    // Arrange
    const data = {
      title: 'update_title',
      dueDate: new Date(),
      completed: false,
    };
    const updateTODODTO = UpdateTodoDTO.create(data);
    // Act
    await todoRepository.update(todo.id!, updateTODODTO);

    // Assert
    expect(mockLogDatasouce.update).toHaveBeenCalled();
  });

  test('todo repository delete a TODO by id', async () => {
    // Act
    await todoRepository.delete(todo.id!);

    // Assert
    expect(mockLogDatasouce.delete).toHaveBeenCalled();
  });
});

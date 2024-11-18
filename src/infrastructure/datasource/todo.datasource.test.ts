import { TODODataSourceImpl } from '#infrastructure/datasource/todo';

import { CreateTodoDTO, UpdateTodoDTO } from '#domain/dto/todo';
import { database } from '#infrastructure/data/connection';
import { APIError } from '#domain/errors/api';

describe('TODO DataSource test', () => {
  const todoDataSource = new TODODataSourceImpl();
  beforeAll(async () => {
    await database.connect();
  });
  afterAll(async () => {
    await database?.datasource.destroy();
  });
  test('todo repository should be create a todo', async () => {
    // Arrange
    const createTodoDTO = CreateTodoDTO.create({
      title: 'any_title',
      dueDate: new Date(),
      completed: false,
    });

    // Act
    const result = await todoDataSource.create(createTodoDTO);

    // Assert
    expect(typeof result).toBe('object');
  });
  test('todo repository should be return all todos', async () => {
    const result = await todoDataSource.all();

    // Assert
    expect(result?.length).toBeGreaterThan(0);
  });

  test('todo repository should be return a todo by id', async () => {
    // Arrange
    const todos = await todoDataSource.all();
    const todo = todos![0];

    // Act
    const result = await todoDataSource.getById(todo.id!);

    // Assert
    expect(result).not.toBeNull();
  });
  test('todo repository getById method should be return a error when todo not found', async () => {
    try {
      // Act
      await todoDataSource.getById('any_id');
    } catch (error) {
      if (error instanceof Error) {
        // Assert
        expect(error instanceof APIError).toBe(true);
      }
    }
  });
  test('todo repository should be update a todo by id', async () => {
    // Arrange
    const todos = await todoDataSource.all();
    const todo = todos![0];
    const newTitle = 'updated_title';
    const dto = UpdateTodoDTO.create({ title: newTitle });

    // Act
    const result = await todoDataSource.update(todo.id!, dto);

    // Assert
    expect(result?.title).toEqual(newTitle);
  });
  test('todo repository update method should be return a error when todo not found', async () => {
    //Arrange
    const dto = UpdateTodoDTO.create({ title: 'any_title' });
    try {
      // Act
      await todoDataSource.update('any_id', dto);
    } catch (error) {
      if (error instanceof Error) {
        // Assert
        expect(error instanceof APIError).toBe(true);
      }
    }
  });
  test('todo repository delete method should be return a error when todo not found', async () => {
    try {
      // Act
      await todoDataSource.delete('any_id');
    } catch (error) {
      if (error instanceof Error) {
        // Assert
        expect(error instanceof APIError).toBe(true);
      }
    }
  });
  test('todo repository should be delete a todo by id', async () => {
    // Arrange
    const todos = await todoDataSource.all();
    const todo = todos![0];

    // Act
    const result = await todoDataSource.delete(todo.id!);

    // Assert
    expect(result).toBeDefined();
  });
});

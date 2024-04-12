import { TODORepositoryImpl } from '#infrastructure/repositories/todo';
import { CreateTodoDTO, UpdateTodoDTO } from '#domain/dto/todo';
import { database } from '#infrastructure/data/connection';
import { RepositoryError } from '#domain/errors/repository';

describe('TodoRepository test', () => {
  const todoRepository = new TODORepositoryImpl();
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
    const result = await todoRepository.create(createTodoDTO);

    // Assert
    expect(typeof result).toBe('object');
  });
  test('todo repository should be return all todos', async () => {
    const result = await todoRepository.all();

    // Assert
    expect(result?.length).toBeGreaterThan(0);
  });

  test('todo repository should be return a todo by id', async () => {
    // Arrange
    const todos = await todoRepository.all();
    const todo = todos![0];

    // Act
    const result = await todoRepository.getById(todo.id!);

    // Assert
    expect(result).not.toBeNull();
  });
  test('todo repository getById method should be return a error when todo not found', async () => {
    try {
      // Act
      await todoRepository.getById('any_id');
    } catch (error) {
      if (error instanceof Error) {
        // Assert
        expect(error instanceof RepositoryError).toBe(true);
      }
    }
  });
  test('todo repository should be update a todo by id', async () => {
    // Arrange
    const todos = await todoRepository.all();
    const todo = todos![0];
    const newTitle = 'updated_title';
    const dto = UpdateTodoDTO.create({ title: newTitle });

    // Act
    const result = await todoRepository.update(todo.id!, dto);

    // Assert
    expect(result?.title).toEqual(newTitle);
  });
  test('todo repository update method should be return a error when todo not found', async () => {
    //Arrange
    const dto = UpdateTodoDTO.create({ title: 'any_title' });
    try {
      // Act
      await todoRepository.update('any_id', dto);
    } catch (error) {
      if (error instanceof Error) {
        // Assert
        expect(error instanceof RepositoryError).toBe(true);
      }
    }
  });
  test('todo repository delete method should be return a error when todo not found', async () => {
    try {
      // Act
      await todoRepository.delete('any_id');
    } catch (error) {
      if (error instanceof Error) {
        // Assert
        expect(error instanceof RepositoryError).toBe(true);
      }
    }
  });
  test('todo repository should be delete a todo by id', async () => {
    // Arrange
    const todos = await todoRepository.all();
    const todo = todos![0];

    // Act
    const result = await todoRepository.delete(todo.id!);

    // Assert
    expect(result).toBeDefined();
  });
});

import request from 'supertest';
import { Server } from '#presentation/server';
import { database } from '#infrastructure/data/connection';
import TODOEntity from '#domain/entities/todo';
import { ErrorCode } from '#domain/errors/code';

describe('testing TODO routes', () => {
  let server: Server;
  beforeAll(async () => {
    server = new Server(3000);
    await database.connect();
    server.start();
  });
  afterAll(async () => {
    await database.datasource.destroy();
    await server.stop();
  });

  /*
   * POST /todo
   */
  test('POST /todo should be return a 200 status code', async () => {
    //Arrange
    const todo = {
      title: 'any_title',
      dueDate: new Date(),
      completed: false,
    };

    // Act
    const response = await request(server.app).post('/todo').send(todo);

    // Assert
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('success');
  });
  test('POST /todo should be return a new TODO', async () => {
    //Arrange
    const todo = {
      title: 'any_title',
      dueDate: new Date(),
      completed: false,
    };

    // Act
    const response = await request(server.app).post('/todo').send(todo);

    // Assert
    expect(typeof response.body.todo).toBe('object');
    expect(response.body.todo).toHaveProperty('id');
    expect(response.body.todo).toHaveProperty('title');
    expect(response.body.todo).toHaveProperty('dueDate');
    expect(response.body.todo).toHaveProperty('completed');
    expect(response.body.todo.title).toBe(todo.title);
    expect(response.body.todo.dueDate).toBe(todo.dueDate.toISOString());
    expect(response.body.todo.completed).toBe(todo.completed);
  });
  test('POST /todo should be return error if send invalid data', async () => {
    //Arrange
    const todo = {
      dueDate: new Date(),
      completed: false,
    };

    // Act
    const response = await request(server.app).post('/todo').send(todo);

    // Assert
    expect(response.statusCode).toBe(400);
    expect(response.body.status).toBe('error');
    expect(typeof response.body.error).toBe('object');
    expect(response.body.error).toHaveProperty('message');
    expect(response.body.error.code).toBe(ErrorCode.INVALID_DATA);
  });

  /*
   * GET /todo
   */
  test('GET /todo should be return a 200 status code', async () => {
    const response = await request(server.app).get('/todo');
    expect(response.statusCode).toBe(200);
  });
  test('GET /todo should be return a list of TODOs', async () => {
    const response = await request(server.app).get('/todo');
    expect(response.body.todos).toBeInstanceOf(Array<TODOEntity>);
  });
  test('GET /todo/:id should be return a 200 status code', async () => {
    //Arrange
    const todos = await request(server.app).get('/todo');
    const todo = todos.body.todos[0];

    // Act
    const response = await request(server.app).get(`/todo/${todo.id}`);

    // Assert
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('success');
  });
  test('GET /todo/:id should be return a TODO by id', async () => {
    //Arrange
    const todos = await request(server.app).get('/todo');
    const todo = todos.body.todos[0];
    // Act
    const response = await request(server.app).get(`/todo/${todo.id}`);

    // Assert
    expect(typeof response.body.todo).toBe('object');
    expect(response.body.todo.id).toBe(todo.id);
    expect(response.body.todo.title).toBe(todo.title);
    expect(response.body.todo.completed).toBe(todo.completed);
  });

  test('GET /todo/:id should be return error if TODO not found', async () => {
    const response = await request(server.app).get('/todo/any_id');

    expect(response.statusCode).toBe(400);
  });

  /*
   * PUT /todo
   */

  test('PUT /todo/:id should be return a 200 status code', async () => {
    //Arrange
    const todos = await request(server.app).get('/todo');
    const todo = todos.body.todos[0];
    const update = {
      title: 'updated_title',
    };

    // Act
    const response = await request(server.app)
      .put(`/todo/${todo.id}`)
      .send(update);

    // Assert
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('success');
  });

  test('PUT /todo/:id should be return a updated TODO', async () => {
    //Arrange
    const todos = await request(server.app).get('/todo');
    const todo = todos.body.todos[0];
    const update = {
      title: 'updated_title',
    };

    // Act
    const response = await request(server.app)
      .put(`/todo/${todo.id}`)
      .send(update);

    // Assert
    expect(typeof response.body.todo).toBe('object');
    expect(response.body.todo.id).toBe(todo.id);
    expect(response.body.todo.title).toBe(update.title);
  });

  test('PUT /todo/:id should be return error if TODO not found', async () => {
    //Arrange
    const update = {
      title: 'updated_title',
    };

    // Act
    const response = await request(server.app).put(`/todo/any_id`).send(update);

    // Assert
    expect(response.statusCode).toBe(400);
  });

  /*
   * DELETE /todo
   */
  test('DELETE /todo/:id should be return a 200 status code', async () => {
    //Arrange
    const todos = await request(server.app).get('/todo');
    const todo = todos.body.todos[0];

    // Act
    const response = await request(server.app).delete(`/todo/${todo.id}`);

    // Assert
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('success');
  });
  test('DELETE /todo/:id should be return a deleted TODO', async () => {
    //Arrange
    const todos = await request(server.app).get('/todo');
    const todo = todos.body.todos[0];

    // Act
    const response = await request(server.app).delete(`/todo/${todo.id}`);

    // Assert
    expect(typeof response.body.todo).toBe('object');
    expect(response.body.todo.title).toBe(todo.title);
    expect(response.body.todo.completed).toBe(todo.completed);
  });
  test('DELETE /todo/:id should be return error if TODO not found', async () => {
    // Act
    const response = await request(server.app).delete(`/todo/any_id`);

    // Assert
    expect(response.statusCode).toBe(400);
  });
});

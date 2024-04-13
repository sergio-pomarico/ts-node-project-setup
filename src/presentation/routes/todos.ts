import { Router } from 'express';
import { TODOsController } from '#presentation/controllers/todos';
import { createTodoSchema, updateTodoSchema } from '#presentation/schemas/todo';
import { schemaValidation } from '#presentation/middlewares/todo';
import { TODORepository } from '#domain/repositories/todo';
import { TODORepositoryImpl } from '#infrastructure/repositories/todo';
import { TODODataSource } from '#domain/datasource/todo';
import { TODODataSourceImpl } from '#infrastructure/datasource/todo';

export class TODOsRoutes {
  constructor(public readonly router = Router()) {
    this.datasources = new TODODataSourceImpl();
    this.repository = new TODORepositoryImpl(this.datasources);
    this.controller = new TODOsController(this.repository);
    this.routes();
  }

  private readonly controller: TODOsController;
  private readonly repository: TODORepository;
  private readonly datasources: TODODataSource;

  routes(): void {
    this.router.get('/', this.controller.all);
    this.router.get('/:id', this.controller.getById);
    this.router.post(
      '/',
      schemaValidation(createTodoSchema),
      this.controller.create,
    );
    this.router.put(
      '/:id',
      schemaValidation(updateTodoSchema),
      this.controller.update,
    );
    this.router.delete('/:id', this.controller.delete);
  }
}

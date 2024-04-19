import { Router } from 'express';
import { TODOsController } from '#presentation/controllers/todos';
import { createTodoSchema, updateTodoSchema } from '#presentation/schemas/todo';
import { schemaValidation } from '#presentation/middlewares/todo';
import container from '#infrastructure/dependencies/container';

export class TODOsRoutes {
  constructor(public readonly router = Router()) {
    this.controller = container.get<TODOsController>('TODOsController');
    this.routes();
  }

  private readonly controller: TODOsController;

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

import { Router } from 'express';
import { TODOsController } from '#presentation/controllers/todos';

export class TODOsRoutes {
  constructor(public readonly router = Router()) {
    this.controller = new TODOsController();
    this.routes();
  }

  private readonly controller: TODOsController;

  routes(): void {
    this.router.get('/', this.controller.all);
    this.router.get('/:id', this.controller.getById);
    this.router.post('/', this.controller.create);
    this.router.put('/:id', this.controller.update);
    this.router.delete('/:id', this.controller.delete);
  }
}

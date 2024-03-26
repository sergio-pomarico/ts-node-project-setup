import { Router } from 'express';
import { TODOsRoutes } from './todos';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    router.use('/todo', new TODOsRoutes().router);
    return router;
  }
}

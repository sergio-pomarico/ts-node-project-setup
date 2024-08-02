import { Router } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import { options } from '#presentation/swagger';
import { TODOsRoutes } from './todos';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    const spects = swaggerJsdoc(options);
    router.use('/todo', new TODOsRoutes().router);
    router.use('/docs', swaggerUI.serve, swaggerUI.setup(spects));
    return router;
  }
}

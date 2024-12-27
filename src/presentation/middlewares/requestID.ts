import { NextFunction, Response, Request } from 'express';
import { randomUUID } from 'node:crypto';
import { AsyncLocalStorage } from 'async_hooks';
import { Logger } from '@presentation/logger';

class AddRequestIDMiddleware {
  constructor(
    private store = new Map<string, string>(),
    private als = new AsyncLocalStorage<Map<string, string>>(),
    private logger = new Logger(),
  ) {}

  IDMiddleware = (req: Request, __: Response, next: NextFunction) => {
    const requestId = randomUUID();
    const userAgent = req.headers['user-agent'] ?? '';

    req.requestId = requestId;
    this.store.set('xRequestId', requestId);

    this.logger.info('Request received', {
      requestId: req.requestId,
      userAgent,
      ip: req.ip,
    });

    this.als.run(this.store, () => next());
  };
}

const requestID = new AddRequestIDMiddleware();

export default requestID;

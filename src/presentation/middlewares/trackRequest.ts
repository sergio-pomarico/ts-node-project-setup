import { NextFunction, Response, Request } from 'express';
import { Logger } from '@presentation/logger';

class TrackRequestMiddleware {
  constructor(private logger = new Logger()) {}

  start: [number, number] | null;

  parseRequestLogs = (req: Request, res: Response) => ({
    userAgent: req.headers['user-agent'] ?? '',
    ip: req.ip,
    method: req.method,
    url: req.originalUrl,
    statusCode: res.statusCode,
    size: `${res.get('Content-Length')} b`,
    duration: `${this.getDurationInMilliseconds(this.start!)} ms`,
  });

  getDurationInMilliseconds = (start: [number, number]) => {
    const NS_PER_SEC = 1e9;
    const NS_TO_MS = 1e6;
    const diff = process.hrtime(start);

    return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
  };

  trackRequest = (req: Request, res: Response, next: NextFunction) => {
    this.start = process.hrtime();

    const cleanup = () => {
      res.removeListener('finish', logFn);
      res.removeListener('close', abortFn);
      res.removeListener('error', errorFn);
    };

    const logFn = () => {
      cleanup();
      this.logger.info('Request finished', {
        requestId: req.requestId,
        ...this.parseRequestLogs(req, res),
      });
    };

    const abortFn = () => {
      cleanup();

      this.logger.warn('Request aborted by the client', {
        requestId: req.requestId,
        ...this.parseRequestLogs(req, res),
      });
    };

    const errorFn = (err: Error) => {
      cleanup();
      this.logger.error('Request pipeline error', {
        requestId: req.requestId,
        ...this.parseRequestLogs(req, res),
        error: err,
      });
    };

    res.on('finish', logFn);
    res.on('close', abortFn);
    res.on('error', errorFn);

    next();
  };
}

const trackRequest = new TrackRequestMiddleware();

export default trackRequest;

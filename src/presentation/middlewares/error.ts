import { ErrorCode } from '#domain/errors/code';
import { HttpError } from '#domain/errors/http';
import { RepositoryError } from '#domain/errors/repository';
import { NextFunction, Response, Request } from 'express';

const errorMiddleware = (
  err: Error,
  _: Request,
  res: Response,
  __: NextFunction,
) => {
  if (err instanceof RepositoryError) {
    if (
      err.code === ErrorCode.RESOURCE_NOT_FOUND ||
      err.code === ErrorCode.DATABASE
    ) {
      res
        .status(404)
        .send(HttpError.notFound(err.message, 'resource not found'));
    }
    if (err.code === ErrorCode.INTERNAL_SERVER) {
      res.status(500).send(HttpError.internalServer(err.message));
    }
  } else {
    res.status(500).send(HttpError.internalServer(err.message));
  }
};

export default errorMiddleware;

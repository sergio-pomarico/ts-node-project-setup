import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';
import { HttpError } from '#domain/errors/http';
import { ErrorCode } from '#domain/errors/code';

export const schemaValidation =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      let httpError: HttpError;
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        httpError = HttpError.badRequest(
          'the data proveded is invalid',
          validationError.message,
          ErrorCode.INVALID_DATA,
        );
        return res.status(400).json(httpError);
      }
      if (error instanceof Error) {
        httpError = HttpError.internalServer(
          error.message,
          ErrorCode.INTERNAL_SERVER,
        );
        return res.status(500).json(httpError);
      }
    }
  };

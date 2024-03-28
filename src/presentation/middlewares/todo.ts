import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';
import { HttpError } from '#domain/errors/http';

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
          'invalid data',
          validationError.message,
          'validation_error',
        );
        return res.status(400).json(httpError);
      }
      if (error instanceof Error) {
        httpError = HttpError.internalServer(error.message, 'unknown_error');
        return res.status(500).json(httpError);
      }
    }
  };

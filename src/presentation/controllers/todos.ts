import { NextFunction, Request, Response } from 'express';
import { CreateTodoDTO, UpdateTodoDTO } from '#domain/dto/todo';
import { TODORepository } from '#domain/repositories/todo';
import { GetTodoByIdUseCase } from '#domain/use-cases/todo/get-by-id';
import { CreateTodoUseCase } from '#domain/use-cases/todo/create';
import { GetAllTodoUseCase } from '#domain/use-cases/todo/all';
import { UpdateTodoUseCase } from '#domain/use-cases/todo/update';
import { DeleteTodoUseCase } from '#domain/use-cases/todo/delete';

export class TODOsController {
  constructor(private readonly repository: TODORepository) {}

  getById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    new GetTodoByIdUseCase(this.repository)
      .run(id)
      .then((todo) => res.json({ status: 'success', todo }))
      .catch((error) => next(error));
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    const todoDTO = CreateTodoDTO.create(req.body);
    new CreateTodoUseCase(this.repository)
      .run(todoDTO)
      .then((todo) => res.json({ status: 'success', todo }))
      .catch((error) => next(error));
  };

  all = async (req: Request, res: Response, next: NextFunction) => {
    new GetAllTodoUseCase(this.repository)
      .run()
      .then((todos) => res.json({ status: 'success', todos }))
      .catch((error) => next(error));
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const updateTodoDTO = UpdateTodoDTO.create(req.body);
    new UpdateTodoUseCase(this.repository)
      .run(id, updateTodoDTO)
      .then((todo) => res.json({ status: 'success', todo }))
      .catch((error) => next(error));
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    new DeleteTodoUseCase(this.repository)
      .run(id)
      .then((todo) => res.json({ status: 'success', todo }))
      .catch((error) => next(error));
  };
}

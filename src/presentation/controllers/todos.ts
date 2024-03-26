import { datasource } from '#data/connection';
import TODOModel from '#data/models/todo.model';
import { Request, Response } from 'express';

export class TODOsController {
  constructor() {}

  getById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const repository = datasource.getRepository(TODOModel);
      const todo = await repository.findOne({ where: { id } });
      return res.json(todo);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const repository = datasource.getRepository(TODOModel);
      const newTodo = repository.create(req.body);
      repository.save(newTodo);
      return res.json(newTodo);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
    }
  };

  all = async (req: Request, res: Response) => {
    try {
      const repository = datasource.getRepository(TODOModel);
      const todos = await repository.find();
      return res.json(todos);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const repository = datasource.getRepository(TODOModel);
      const todo = await repository.findOne({ where: { id } });
      if (todo === null)
        throw Error('Cannot update a TODO that does not exist');
      repository.merge(todo, req.body);
      return res.json(todo);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const repository = datasource.getRepository(TODOModel);
      const todo = await repository.findOne({ where: { id } });
      if (todo === null)
        throw Error('Cannot delete a TODO that does not exist');
      await repository.remove(todo);
      return res.json(todo);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
    }
  };
}

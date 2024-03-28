import TODOModel from '#infrastructure/data/models/todo.model';
import TODOEntity from '#domain/entities/todo';
import { datasource } from '#infrastructure/data/connection';
import { RepositoryError } from '#domain/errors/repository';
import { CreateTodoDTO, UpdateTodoDTO } from '#domain/dto/todo';
import { TODORepository } from '#domain/repositories/todo';

export class TODORepositoryImpl implements TODORepository {
  private name = 'TODORepository';
  getById = async (id: string): Promise<TODOEntity | null> => {
    try {
      const repository = datasource.getRepository(TODOModel);
      const todo = await repository.findOne({ where: { id } });
      if (todo === null)
        throw new RepositoryError('TODO not found', 'getById', this.name);
      return todo;
    } catch (error) {
      if (error instanceof Error) {
        throw new RepositoryError(error.message, 'getById', this.name);
      }
      return null;
    }
  };
  all = async (): Promise<TODOEntity[] | null> => {
    try {
      const repository = datasource.getRepository(TODOModel);
      const todos = await repository.find();
      return todos;
    } catch (error) {
      if (error instanceof Error) {
        throw new RepositoryError(error.message, 'all', this.name);
      }
      return null;
    }
  };
  create = async (data: CreateTodoDTO): Promise<TODOEntity | null> => {
    try {
      const repository = datasource.getRepository(TODOModel);
      const todo = repository.create(data);
      const newTODO = await repository.save(todo);
      return newTODO;
    } catch (error) {
      if (error instanceof Error) {
        throw new RepositoryError(error.message, 'create', this.name);
      }
      return null;
    }
  };
  update = async (
    id: string,
    changes: UpdateTodoDTO,
  ): Promise<TODOEntity | null> => {
    try {
      const repository = datasource.getRepository(TODOModel);
      const todo = await repository.findOne({ where: { id } });
      if (todo === null)
        throw new RepositoryError(
          'Cannot update a TODO that does not exist',
          'update',
          this.name,
        );
      const updatedTODO = repository.merge(todo, changes.values);
      return updatedTODO;
    } catch (error) {
      if (error instanceof Error) {
        throw new RepositoryError(error.message, 'update', this.name);
      }
      return null;
    }
  };
  delete = async (id: string) => {
    try {
      const repository = datasource.getRepository(TODOModel);
      const todo = await repository.findOne({ where: { id } });
      if (todo === null)
        throw new RepositoryError(
          'Cannot delete a TODO that does not exist',
          'delete',
          'TODORepository',
        );
      await repository.remove(todo);
      return todo;
    } catch (error) {
      if (error instanceof Error) {
        throw new RepositoryError(error.message, 'delete', 'TODORepository');
      }
      return null;
    }
  };
}

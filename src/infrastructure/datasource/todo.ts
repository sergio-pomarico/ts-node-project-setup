import TODOModel from '#infrastructure/data/models/todo.model';
import TODOEntity from '#domain/entities/todo';
import { datasource } from '#infrastructure/data/connection';
import { APIError } from '#domain/errors/api';
import { CreateTodoDTO, UpdateTodoDTO } from '#domain/dto/todo';
import { ErrorCode } from '#domain/errors/code';
import { TypeORMError } from 'typeorm';
import { TODODataSource } from '#domain/datasource/todo';
import { injectable } from 'inversify';

@injectable()
export class TODODataSourceImpl implements TODODataSource {
  handleError = (error: Error) => {
    if (error instanceof APIError) {
      throw error;
    } else if (error instanceof TypeORMError) {
      throw new APIError(error.message, ErrorCode.INTERNAL_SERVER);
    } else {
      throw new APIError(error.message, ErrorCode.INTERNAL_SERVER);
    }
  };
  getById = async (id: string): Promise<TODOEntity | null> => {
    try {
      const repository = datasource.getRepository(TODOModel);
      const todo = await repository.findOne({ where: { id } });
      if (todo === null)
        throw new APIError('TODO not found', ErrorCode.RESOURCE_NOT_FOUND);
      return todo;
    } catch (error) {
      if (error instanceof Error) {
        this.handleError(error);
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
        this.handleError(error);
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
        this.handleError(error);
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
        throw new APIError(
          'Cannot update a TODO that does not exist',
          ErrorCode.RESOURCE_NOT_FOUND,
        );
      repository.merge(todo, changes.values);
      const updatedTODO = await repository.save(todo);
      return updatedTODO;
    } catch (error) {
      if (error instanceof Error) {
        this.handleError(error);
      }
      return null;
    }
  };
  delete = async (id: string) => {
    try {
      const repository = datasource.getRepository(TODOModel);
      const todo = await repository.findOne({ where: { id } });
      if (todo === null)
        throw new APIError(
          'Cannot delete a TODO that does not exist',
          ErrorCode.RESOURCE_NOT_FOUND,
        );
      await repository.remove(todo);
      return todo;
    } catch (error) {
      if (error instanceof Error) {
        this.handleError(error);
      }
      return null;
    }
  };
}

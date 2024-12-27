import TODOEntity from '@domain/entities/todo';
import { CreateTodoDTO, UpdateTodoDTO } from '@domain/dto/todo';
import { TODORepository } from '@domain/repositories/todo';
import { TODODataSource } from '@domain/datasource/todo';
import { inject, injectable } from 'inversify';

@injectable()
export class TODORepositoryImpl implements TODORepository {
  constructor(
    @inject('TODODataSource')
    private readonly dataSource: TODODataSource,
  ) {}

  getById = async (id: string): Promise<TODOEntity | null> => {
    return this.dataSource.getById(id);
  };
  all = async (): Promise<TODOEntity[] | null> => {
    return this.dataSource.all();
  };
  create = async (data: CreateTodoDTO): Promise<TODOEntity | null> => {
    return this.dataSource.create(data);
  };
  update = async (
    id: string,
    changes: UpdateTodoDTO,
  ): Promise<TODOEntity | null> => {
    return this.dataSource.update(id, changes);
  };
  delete = async (id: string) => {
    return this.dataSource.delete(id);
  };
}

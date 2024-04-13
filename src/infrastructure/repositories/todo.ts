import TODOEntity from '#domain/entities/todo';
import { CreateTodoDTO, UpdateTodoDTO } from '#domain/dto/todo';
import { TODORepository } from '#domain/repositories/todo';
import { TODODataSource } from '#domain/datasource/todo';

export class TODORepositoryImpl implements TODORepository {
  private name = 'TODORepository';
  constructor(private readonly dataSource: TODODataSource) {}

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

import TODOEntity from '#domain/entities/todo';
import { CreateTodoDTO, UpdateTodoDTO } from '#domain/dto/todo';

export interface TODORepository {
  getById: (id: string) => Promise<TODOEntity | null>;
  all: () => Promise<TODOEntity[] | null>;
  create: (createTodoDTO: CreateTodoDTO) => Promise<TODOEntity | null>;
  update: (
    id: string,
    updateTodoDTO: UpdateTodoDTO,
  ) => Promise<TODOEntity | null>;
  delete: (id: string) => Promise<TODOEntity | null>;
}

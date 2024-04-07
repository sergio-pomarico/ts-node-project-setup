import { TODORepository } from '#domain/repositories/todo';
import { CreateTodoDTO } from '#domain/dto/todo';
import TODOEntity from '#domain/entities/todo';

export class CreateTodoUseCase {
  constructor(private repository: TODORepository) {}
  run = async (createTodoDTO: CreateTodoDTO): Promise<TODOEntity> => {
    const todo = await this.repository.create(createTodoDTO);
    return todo!;
  };
}

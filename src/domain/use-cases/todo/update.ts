import { TODORepository } from '#domain/repositories/todo';
import { UpdateTodoDTO } from '#domain/dto/todo';
import TODOEntity from '#domain/entities/todo';

export class UpdateTodoUseCase {
  constructor(private repository: TODORepository) {}
  run = async (
    id: string,
    updateTodoDTO: UpdateTodoDTO,
  ): Promise<TODOEntity> => {
    const todo = await this.repository.update(id, updateTodoDTO);
    return todo!;
  };
}

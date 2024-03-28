import { TODORepository } from '#domain/repositories/todo';
import TODOEntity from '#domain/entities/todo';

export class DeleteTodoUseCase {
  constructor(private repository: TODORepository) {}
  run = async (id: string): Promise<TODOEntity> => {
    const todo = await this.repository.delete(id);
    return todo!;
  };
}

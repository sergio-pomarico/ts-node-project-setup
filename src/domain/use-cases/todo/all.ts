import { TODORepository } from '#domain/repositories/todo';
import TODOEntity from '#domain/entities/todo';

export class GetAllTodoUseCase {
  constructor(private repository: TODORepository) {}
  run = async (): Promise<TODOEntity[]> => {
    const todos = await this.repository.all();
    return todos!;
  };
}

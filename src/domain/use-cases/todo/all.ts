import { TODORepository } from '#domain/repositories/todo';
import TODOEntity from '#domain/entities/todo';
import { inject, injectable } from 'inversify';

@injectable()
export class GetAllTodoUseCase {
  constructor(
    @inject('TODORepository')
    private repository: TODORepository,
  ) {}
  run = async (): Promise<TODOEntity[]> => {
    const todos = await this.repository.all();
    return todos!;
  };
}

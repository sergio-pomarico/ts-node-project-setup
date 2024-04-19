import 'reflect-metadata';
import { Container } from 'inversify';
import { TODODataSourceImpl } from '#infrastructure/datasource/todo';
import { TODORepositoryImpl } from '#infrastructure/repositories/todo';
import { TODOsController } from '#presentation/controllers/todos';
import { CreateTodoUseCase } from '#domain/use-cases/todo/create';
import { TODODataSource } from '#domain/datasource/todo';
import { TODORepository } from '#domain/repositories/todo';
import { GetAllTodoUseCase } from '#domain/use-cases/todo/all';
import { DeleteTodoUseCase } from '#domain/use-cases/todo/delete';
import { GetTodoByIdUseCase } from '#domain/use-cases/todo/get-by-id';
import { UpdateTodoUseCase } from '#domain/use-cases/todo/update';

const container = new Container();

container.bind<TODODataSource>('TODODataSource').to(TODODataSourceImpl);
container.bind<TODORepository>('TODORepository').to(TODORepositoryImpl);
container.bind<TODOsController>('TODOsController').to(TODOsController);
container.bind<CreateTodoUseCase>('CreateTodoUseCase').to(CreateTodoUseCase);
container.bind<GetAllTodoUseCase>('GetAllTodoUseCase').to(GetAllTodoUseCase);
container.bind<DeleteTodoUseCase>('DeleteTodoUseCase').to(DeleteTodoUseCase);
container.bind<GetTodoByIdUseCase>('GetTodoByIdUseCase').to(GetTodoByIdUseCase);
container.bind<UpdateTodoUseCase>('UpdateTodoUseCase').to(UpdateTodoUseCase);

export default container;

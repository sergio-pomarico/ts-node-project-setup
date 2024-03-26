import { env } from '../config/env';
import { DataSource, DataSourceOptions } from 'typeorm';

interface Options {
  host: string;
  port: number;
  username: string;
  password: string;
  name: string;
  ssl: boolean;
}

export class Database {
  constructor(private readonly options: Options) {
    this.config = this.setConfig(this.options);
    this.datasource = new DataSource(this.config);
  }

  public datasource: DataSource;
  private config: DataSourceOptions;

  async connect(): Promise<void> {
    try {
      await this.datasource.initialize();
      console.info('🔌 PostgreSQL connected');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('💥 error: ', error);
        throw Error(error.message);
      }
    }
    return;
  }

  setConfig(options: Options): DataSourceOptions {
    return {
      type: 'postgres',
      host: options.host,
      port: options.port,
      username: options.username,
      password: options.password,
      database: options.name,
      synchronize: false,
      logging: false,
      ssl: options.ssl,
      entities: [__dirname + '/models/*.model{.ts,.js}'],
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
    };
  }
}

export const database = new Database(env.db);
export const datasource: DataSource = database.datasource;

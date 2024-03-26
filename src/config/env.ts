import { config } from 'dotenv';
import { get } from 'env-var';

config();

export const env = {
  db: {
    host: get('DB_HOST').required().asString(),
    port: get('DB_PORT').required().asPortNumber(),
    username: get('DB_USER').required().asString(),
    name: get('DB_NAME').required().asString(),
    password: get('DB_PASSWORD').required().asString(),
    ssl: false,
  },
  server: {
    port: get('SERVER_PORT').required().asPortNumber(),
  },
};

export type config = typeof env;

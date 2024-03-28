import 'reflect-metadata';
import { Server } from '#presentation/server';
import { env } from './config/env';
import { database } from '#infrastructure/data/connection';

(() => {
  main();
})();

async function main() {
  await database.connect();
  const server = new Server(env.server.port);
  await server.start();
}

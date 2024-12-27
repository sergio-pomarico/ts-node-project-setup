import 'reflect-metadata';
import { Server } from '@presentation/server';
import { database } from '@infrastructure/data/connection';
import { env } from './config/env';

(() => {
  main();
})();

async function main() {
  const isConnected = await database.connect();
  if (isConnected) {
    const server = new Server(env.server.port);
    await server.start();
  }
}

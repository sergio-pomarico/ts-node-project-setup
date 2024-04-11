import 'reflect-metadata';
import { Server } from '#presentation/server';
import { env } from './config/env';
import { database } from '#infrastructure/data/connection';

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

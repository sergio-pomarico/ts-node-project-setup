import { env } from './env';

describe('test enviroment vars', () => {
  test('should return test env', () => {
    expect(env.db.host).toBe('localhost');
    expect(env.db.port).toBe(5432);
    expect(env.server.port).toBe(3000);
  });
  test('should return a error if env vars are not set', async () => {
    jest.resetModules();
    process.env.SERVER_PORT = 'ABC';
    try {
      await import('./env');
      expect(true).toBe(false);
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toContain(
          '"SERVER_PORT" should be a valid integer',
        );
      }
    }
  });
});

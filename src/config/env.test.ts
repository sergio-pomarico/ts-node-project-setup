import { env } from './env';

describe('test enviroment vars', () => {
  test('should return test env', () => {
    expect(env.db.host).toBe('ep-super-cloud-a5g34pau.us-east-2.aws.neon.tech');
    expect(env.db.port).toBe(5432);
    expect(env.db.username).toBe('testing-database_owner');
    expect(env.db.name).toBe('testing-database');
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

import { Database } from '#infrastructure/data/connection';
import { env } from '../../../config/env';

describe('test database connection', () => {
  let database: Database;
  beforeEach(async () => {
    await database?.datasource.destroy();
  });
  test('should connect to database', async () => {
    // Arrange
    database = new Database(env.db);

    // Act
    const isConnected = await database.connect();

    // Assert
    expect(isConnected).toBe(true);
  });
  test('should get a error if connection fails', async () => {
    try {
      // Arrange
      jest.resetModules();
      process.env.DB_NAME = 'ABC';
      const newenv = await import('../../../config/env');

      // Act
      database = new Database(newenv.env.db);
      await database.connect();
    } catch (error) {
      if (error instanceof Error) {
        // Assert
        expect(error.message).toContain('database "ABC" does not exist');
      }
    }
  });
});

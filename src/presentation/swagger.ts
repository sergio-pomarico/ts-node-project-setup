export const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TODO_API',
      version: '1.0.0',
      description: 'TODO API with Express',
    },
    servers: [
      {
        url: 'http://localhost:3000/',
      },
    ],
  },
  apis: ['./src/presentation/routes/*.ts'],
};

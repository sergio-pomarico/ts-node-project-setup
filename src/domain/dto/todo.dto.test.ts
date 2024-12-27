import { CreateTodoDTO, UpdateTodoDTO } from '@domain/dto/todo';

describe('CreateTodoDTO test', () => {
  test('should create a CreateTodoDTO', () => {
    // Arrange
    const data = {
      title: 'any_title',
      dueDate: new Date(),
      completed: false,
    };
    // Act
    const result = CreateTodoDTO.create(data);
    // Assert
    expect(result).toEqual(data);
  });

  test('should create a UpdateTodoDTO', () => {
    // Arrange
    const data = {
      title: 'any_title',
      dueDate: new Date(),
      completed: false,
    };
    // Act
    const result = UpdateTodoDTO.create(data);
    // Assert
    expect(result).toEqual(data);
  });

  test('should create a UpdateTodoDTO with only title', () => {
    // Arrange
    const data = {
      title: 'any_title',
    };
    // Act
    const result = UpdateTodoDTO.create(data);
    // Assert
    expect(result.values).toEqual(data);
  });

  test('should create a UpdateTodoDTO with only completed', () => {
    // Arrange
    const data = {
      completed: true,
    };
    // Act
    const result = UpdateTodoDTO.create(data);
    // Assert
    expect(result.values).toEqual(data);
  });

  test('should create a UpdateTodoDTO with only dueDate', () => {
    // Arrange
    const data = {
      dueDate: new Date(),
    };
    // Act
    const result = UpdateTodoDTO.create(data);
    // Assert
    expect(result.values).toEqual(data);
  });
});

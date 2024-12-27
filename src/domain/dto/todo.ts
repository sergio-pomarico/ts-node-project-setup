import TODOEntity from '@domain/entities/todo';

export class CreateTodoDTO {
  private constructor(
    public title: string,
    public dueDate: Date,
    public completed?: boolean,
  ) {}
  static create(data: { [key in keyof TODOEntity]: unknown }): CreateTodoDTO {
    return new CreateTodoDTO(
      data.title as string,
      data.dueDate as Date,
      data.completed as boolean,
    );
  }
}

export class UpdateTodoDTO {
  private constructor(
    public title?: string,
    public dueDate?: Date,
    public completed?: boolean,
  ) {}

  static create(data: { [key: string]: unknown }): UpdateTodoDTO {
    return new UpdateTodoDTO(
      data?.title as string | undefined,
      data?.dueDate as Date | undefined,
      data?.completed as boolean | undefined,
    );
  }

  get values() {
    const valuesObj: { [key: string]: unknown } = {};
    if (this.title) valuesObj.title = this.title;
    if (this.dueDate) valuesObj.dueDate = this.dueDate;
    if (this.completed) valuesObj.completed = this.completed;
    return valuesObj;
  }
}

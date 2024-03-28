export default interface TODOEntity {
  id?: string;
  title: string;
  dueDate: Date;
  completed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

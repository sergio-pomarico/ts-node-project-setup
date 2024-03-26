import { Column, Entity } from 'typeorm';
import BaseModel from './base.model';

@Entity({ name: 'todo' })
export default class TODOModel extends BaseModel {
  @Column({ type: 'varchar', length: 140 })
  title: string;

  @Column({ type: 'date' })
  dueDate: Date;

  @Column({ type: 'boolean', default: false })
  completed: boolean;
}

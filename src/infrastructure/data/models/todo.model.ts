import { Column, Entity } from 'typeorm';
import BaseModel from './base.model';
import TODOEntity from '@domain/entities/todo';

@Entity({ name: 'todo' })
export default class TODOModel extends BaseModel implements TODOEntity {
  @Column({ type: 'varchar', length: 140 })
  title: string;

  @Column({ type: 'date' })
  dueDate: Date;

  @Column({ type: 'boolean', default: false })
  completed: boolean;
}

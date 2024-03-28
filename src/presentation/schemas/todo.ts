import { z } from 'zod';

export const createTodoSchema = z.object({
  title: z.string().min(3).max(140),
  dueDate: z.string().datetime(),
  completed: z.boolean().optional(),
});

export const updateTodoSchema = z.object({
  title: z.string().min(3).max(140).optional(),
  dueDate: z.string().datetime().optional(),
  completed: z.boolean().optional(),
});

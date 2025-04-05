import { db } from './index';
import { columns, tasks } from './schema';
import { eq } from 'drizzle-orm';

export const columnService = {
  getAll: async () => {
    return await db.query.columns.findMany({
      with: {
        tasks: {
          orderBy: (tasks, { asc }) => [asc(tasks.order)],
        },
      },
      orderBy: (columns, { asc }) => [asc(columns.order)],
    });
  },
  
  create: async (data: { title: string; order: number }) => {
    return await db.insert(columns).values(data).returning();
  },
  
  update: async (id: string, data: Partial<{ title: string; order: number }>) => {
    return await db
      .update(columns)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(columns.id, id))
      .returning();
  },
  
  delete: async (id: string) => {
    return await db.delete(columns).where(eq(columns.id, id)).returning();
  },
};

export const taskService = {
  getAll: async (columnId?: string) => {
    if (columnId) {
      return await db.query.tasks.findMany({
        where: eq(tasks.columnId, columnId),
        orderBy: (tasks, { asc }) => [asc(tasks.order)],
      });
    }
    return await db.query.tasks.findMany({
      orderBy: (tasks, { asc }) => [asc(tasks.order)],
    });
  },
  
  create: async (data: { title: string; description?: string; columnId: string; order: number }) => {
    return await db.insert(tasks).values(data).returning();
  },
  
  update: async (
    id: string,
    data: Partial<{ title: string; description?: string; columnId: string; order: number }>
  ) => {
    return await db
      .update(tasks)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(tasks.id, id))
      .returning();
  },
  
  delete: async (id: string) => {
    return await db.delete(tasks).where(eq(tasks.id, id)).returning();
  },
}; 
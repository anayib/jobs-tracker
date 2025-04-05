import { pgTable, serial, text, timestamp, integer, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const columns = pgTable('columns', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  order: integer('order').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const tasks = pgTable('tasks', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  columnId: uuid('column_id').references(() => columns.id, { onDelete: 'cascade' }).notNull(),
  order: integer('order').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const columnsRelations = relations(columns, ({ many }) => ({
  tasks: many(tasks),
}));

export const tasksRelations = relations(tasks, ({ one }) => ({
  column: one(columns, {
    fields: [tasks.columnId],
    references: [columns.id],
  }),
})); 
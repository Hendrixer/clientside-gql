import { randomUUID } from 'crypto'
import { relations, sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

const id = () =>
  text('id')
    .primaryKey()
    .$default(() => randomUUID())

const createdAt = () =>
  text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull()

const boolean = (field: string) => integer(field, { mode: 'boolean' })

export const users = sqliteTable('users', {
  id: id(),
  createdAt: createdAt(),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
})

export const userRelations = relations(users, ({ many }) => ({
  issues: many(issues),
  projects: many(projects),
}))

export const issues = sqliteTable('issues', {
  id: id(),
  name: text('name').notNull(),
  projectId: text('projectId'),
  userId: text('userId').notNull(),
  content: text('content').notNull(),
  status: text('text', { enum: ['backlog', 'todo', 'inprogress', 'done'] })
    .default('backlog')
    .notNull(),
  createdAt: createdAt(),
})

export const issueRelations = relations(issues, ({ one }) => ({
  user: one(users, {
    fields: [issues.userId],
    references: [users.id],
  }),
  project: one(projects, {
    fields: [issues.projectId],
    references: [projects.id],
  }),
}))

export const projects = sqliteTable('projects', {
  id: id(),
  name: text('name').notNull(),
  userId: text('userId').notNull(),
  content: text('content').notNull(),
  createdAt: createdAt(),
})

export const projectReferences = relations(projects, ({ one }) => ({
  user: one(users, {
    fields: [projects.userId],
    references: [users.id],
  }),
}))

export type InsertUser = typeof users.$inferInsert
export type SelectUser = typeof users.$inferSelect

export type InsertIssues = typeof issues.$inferInsert
export type SelectIssues = typeof issues.$inferSelect

export type InsertProjects = typeof projects.$inferInsert
export type SelectProjects = typeof projects.$inferSelect

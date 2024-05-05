import { db } from '@/db/db'
import { InsertIssues, SelectIssues, issues, users } from '@/db/schema'
import { GQLContext } from '@/types'
import { getUserFromToken, signin, signup } from '@/utils/auth'
import { and, asc, desc, eq, or, sql } from 'drizzle-orm'
import { GraphQLError } from 'graphql'

const resolvers = {
  IssueStatus: {
    BACKLOG: 'backlog',
    TODO: 'todo',
    INPROGRESS: 'inprogress',
    DONE: 'done',
  },

  Issue: {
    user: (issue, args, ctx) => {
      if (!ctx.user)
        throw new GraphQLError('UNAUTHORIZED', { extensions: { code: 401 } })

      return db.query.users.findFirst({
        where: eq(users.id, issue.userId),
      })
    },
  },

  User: {
    issues: (user, args, ctx) => {
      if (!ctx.user)
        throw new GraphQLError('UNAUTHORIZED', { extensions: { code: 401 } })

      return db.query.issues.findMany({
        where: eq(issues.userId, user.id),
      })
    },
  },
  Query: {
    me: async (_, __, ctx) => {
      return ctx.user
    },
    issues: async (
      _,
      {
        input,
      }: {
        input?: {
          statuses?: SelectIssues['status'][]
          projects?: SelectIssues['projectId'][]
        }
      },
      ctx: GQLContext
    ) => {
      if (!ctx.user)
        throw new GraphQLError('UNAUTHORIZED', { extensions: { code: 401 } })

      const andFilters = [eq(issues.userId, ctx.user.id)]

      if (input && input.statuses && input.statuses.length) {
        const statusFilters = input.statuses.map((status) =>
          eq(issues.status, status)
        )

        andFilters.push(or(...statusFilters))
      }

      const data = await db.query.issues.findMany({
        where: and(...andFilters),
        orderBy: [
          asc(sql`case ${issues.status}
        when "backlog" then 1
        when "inprogress" then 2
        when "done" then 3
      end`),
          desc(issues.createdAt),
        ],
      })

      return data
    },
  },
  Mutation: {
    deleteIssue: async (_, { id }, ctx) => {
      if (!ctx.user)
        throw new GraphQLError('UNAUTHORIZED', { extensions: { code: 401 } })

      await db.delete(issues).where(eq(issues.id, id))
      return id
    },
    createIssue: async (
      _,
      { input }: { input: Omit<InsertIssues, 'userId'> },
      ctx: GQLContext
    ) => {
      if (!ctx.user)
        throw new GraphQLError('UNAUTHORIZED', { extensions: { code: 401 } })

      const issue = await db
        .insert(issues)
        .values({ ...input, userId: ctx.user.id })
        .returning()

      return issue[0]
    },

    createUser: async (_, args) => {
      const data = await signup(args.input)

      if (!data || !data.user || !data.token) {
        throw new GraphQLError('could not create user', {
          extensions: { code: 'AUTH_ERROR' },
        })
      }

      return { ...data.user, token: data.token }
    },
    editIssue: async (_, { input }, ctx: GQLContext) => {
      if (!ctx.user)
        throw new GraphQLError('UNAUTHORIZED', { extensions: { code: 401 } })

      const { id, ...updates } = input

      const issue = await db
        .update(issues)
        .set(updates)
        .where(eq(issues.id, id))
        .returning()

      return issue[0]
    },
    signin: async (_, args) => {
      const data = await signin(args.input)

      if (!data || !data.user || !data.token) {
        throw new GraphQLError('UNAUTHORIZED', {
          extensions: { code: 'AUTH_ERROR' },
        })
      }

      return { ...data.user, token: data.token }
    },
  },
}

export default resolvers

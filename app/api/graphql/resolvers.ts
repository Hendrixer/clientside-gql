const resolvers = {
  Query: {
    me: () => {
      return { id: 'hello user' }
    },
  },
  Mutation: {
    createUser: () => {
      return 'new user created'
    },
  },
}

export default resolvers

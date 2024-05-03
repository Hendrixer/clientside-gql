const schema = `#graphql

type User {
  id: ID!
  email: String!
  createdAt: String!
}

input NewUserInput {
  email: String!
  password: String!
}

type Query {
  me: User!
}

type Mutation {
  createUser(input: NewUserInput!): User
}
`

export default schema

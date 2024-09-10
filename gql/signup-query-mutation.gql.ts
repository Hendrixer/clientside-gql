import { gql } from 'graphql-request'

export const SIGNUP_QUERY_MUTATION_GQL = gql`
  mutation Mutation($input: AuthInput!) {
    createUser(input: $input) {
      token
      id
    }
  }
`

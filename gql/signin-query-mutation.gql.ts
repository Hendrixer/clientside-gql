import { gql } from 'graphql-request'

export const SIGNIN_QUERY_MUTATION_GQL = gql`
  mutation Mutation($input: AuthInput!) {
    signin(input: $input) {
      token
      id
    }
  }
`

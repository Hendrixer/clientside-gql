import { gql } from 'urql'

export const SignupMutation = gql`
  mutation Mutation($input: AuthInput!) {
    createUser(input: $input) {
      token
    }
  }
`

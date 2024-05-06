import { gql } from '@urql/next'

export const SignupMutation = gql`
  mutation CreateUser($input: AuthInput!) {
    createUser(input: $input) {
      token
    }
  }
`

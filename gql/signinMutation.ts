import { gql } from 'urql'

export const SigninMutation = gql`
  mutation Mutation($input: AuthInput!) {
    signin(input: $input) {
      token
    }
  }
`

import { gql } from '@urql/next'

export const SigninMutation = gql`
  mutation Signin($input: AuthInput!) {
    signin(input: $input) {
      token
    }
  }
`

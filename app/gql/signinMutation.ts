import { gql } from "@urql/next";

export const SignInMutation = gql`
    mutation Signin($input: AuthInput!) {
        signin(input: $input) {
            token
        }
    }
`
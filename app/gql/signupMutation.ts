import { gql } from "@urql/next";


export const SignUpMutation = gql`
    mutation CreateUser($input: AuthInput!) {
        createUser(input: $input) {
            token
            id
        }
    }
`;

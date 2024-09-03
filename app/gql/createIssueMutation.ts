import { gql } from '@urql/next';


export const CreateIssueMutation = gql`
    mutation CreateIssueMutation($input: CreateIssueInput!) {
        createIssue(input: $input) {
            id
            name
            status
        }
    }
`;
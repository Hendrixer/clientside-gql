import { gql } from '@urql/next';

export const IssuesQuery = gql`
    query IssuesQuery {
        issues {
            name
            content
            id
            status
        }
    }
`;
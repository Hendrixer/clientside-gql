import { gql } from 'graphql-request'

export const EDIT_ISSUES_QUERY_GQL = gql`
  mutation Mutation($input: EditIssueInput!) {
    editIssue(input: $input) {
      id
      status
    }
  }
`

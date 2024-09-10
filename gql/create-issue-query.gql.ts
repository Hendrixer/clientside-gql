import { gql } from 'graphql-request'

export const CREATE_ISSUES_QUERY_GQL = gql`
  mutation Mutation($input: CreateIssueInput!) {
    createIssue(input: $input) {
      content
      id
      name
      status
      userId
    }
  }
`

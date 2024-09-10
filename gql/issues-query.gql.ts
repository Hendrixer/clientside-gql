import { gql } from 'graphql-request'

export const ISSUES_QUERY_GQL = gql`
  query IssuesQuery {
    issues {
      content
      id
      name
      status
      userId
    }
  }
`

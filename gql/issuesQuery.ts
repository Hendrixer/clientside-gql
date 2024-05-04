import { gql } from 'urql'

export const IssuesQuery = gql`
  query {
    issues {
      content
      createdAt
      id
      name
      status
    }
  }
`

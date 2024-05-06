import { gql } from '@urql/next'

export const EditIssueMutation = gql`
  mutation EditIssueMutation($input: EditIssueInput!) {
    editIssue(input: $input) {
      id
      name
      content
      status
    }
  }
`

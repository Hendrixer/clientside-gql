import { gql } from 'urql'

export const EditIssueIssueMutation = gql`
  mutation EditIssue($input: EditIssueInput!) {
    editIssue(input: $input) {
      createdAt
      id
      name
      status
    }
  }
`

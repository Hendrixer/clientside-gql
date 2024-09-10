import { graphQLClient } from '@/app/graphql-client'
import { EDIT_ISSUES_QUERY_GQL } from '@/gql/edit-issue-query.gql'

import { useMutation, useQueryClient } from '@tanstack/react-query'

export type IssueStatusType = 'BACKLOG' | 'TODO' | 'INPROGRESS' | 'DONE'

interface input {
  input: {
    status: IssueStatusType
    id: string
  }
}

interface editIssueResponse {
  createIssue: {
    content: string
    id: string
    name: string
    status: IssueStatusType
    userId: string
  }
}

async function fetchEditIssueQueryMutation(input: input) {
  const data: editIssueResponse = await graphQLClient.request(
    EDIT_ISSUES_QUERY_GQL,
    input
  )
  return data
}

export const useEditIssueQueryMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (input: input) => {
      return fetchEditIssueQueryMutation(input)
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ['ISSUES_QUERY'] }),
  })
}

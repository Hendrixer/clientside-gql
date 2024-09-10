import { graphQLClient } from '@/app/graphql-client'
import { CREATE_ISSUES_QUERY_GQL } from '@/gql/create-issue-query.gql'

import { useMutation, useQueryClient } from '@tanstack/react-query'

interface input {
  input: {
    content: string
    name: string
    status: null | 'TODO'
  }
}

interface createIssueResponse {
  createIssue: {
    content: string
    id: string
    name: string
    status: string
    userId: string
  }
}

async function fetchCreateIssueQueryMutation(input: input) {
  const data: createIssueResponse = await graphQLClient.request(
    CREATE_ISSUES_QUERY_GQL,
    input
  )
  return data
}

export const useCreateIssueQueryMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (input: input) => {
      return fetchCreateIssueQueryMutation(input)
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ['ISSUES_QUERY'] }),
  })
}

import { graphQLClient } from '@/app/graphql-client'
import { ISSUES_QUERY_GQL } from '@/gql/issues-query.gql'
import { useQuery } from '@tanstack/react-query'

export interface issue {
  content: string
  id: string
  name: string
  status: string
  userId: string
}
interface response {
  issues: issue[]
}

const fetchIssusesQuery = async () => {
  const data: response = await graphQLClient.request(ISSUES_QUERY_GQL)
  return data
}

export const useIssuesQuery = () => {
  const data = useQuery({
    queryKey: ['ISSUES_QUERY'],
    queryFn: fetchIssusesQuery,
  })
  return data
}

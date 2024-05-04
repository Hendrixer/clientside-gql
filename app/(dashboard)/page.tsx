'use client'
import { IssuesQuery } from '@/gql/issuesQuery'
import PageHeader from '../_components/PageHeader'
import { useQuery } from 'urql'
import { Spinner } from '@nextui-org/react'

const IssuesPage = () => {
  const [{ data, fetching, error }, reexecuteQuery] = useQuery({
    query: IssuesQuery,
  })

  return (
    <div>
      <PageHeader title="All issues" />
      {fetching && <Spinner />}
      {error && <div>error</div>}
      {data &&
        data.issues.map((issue) => <div key={issue.id}>{issue.name}</div>)}
    </div>
  )
}

export default IssuesPage

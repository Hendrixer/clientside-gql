'use client'

import { PropsWithChildren, useMemo } from 'react'
import {
  UrqlProvider,
  ssrExchange,
  fetchExchange,
  createClient,
  gql,
} from '@urql/next'
import { cacheExchange } from '@urql/exchange-graphcache'

import { url } from '@/utils/url'
import { getToken } from '@/utils/token'

const cacheConfig = {
  updates: {
    Mutation: {
      createIssue(result, _args, cache, _info) {
        const IssueList = gql`
          {
            issues {
              id
            }
          }
        `

        cache.updateQuery({ query: IssueList }, (data) => {
          return {
            ...data,
            issues: [...data.issues, result.createIssue],
          }
        })
      },
    },
  },
}

export default function GQLProvider({ children }: PropsWithChildren) {
  const [client, ssr] = useMemo(() => {
    const ssr = ssrExchange({
      isClient: typeof window !== 'undefined',
    })

    const client = createClient({
      url,
      exchanges: [cacheExchange({}), ssr, fetchExchange],
      fetchOptions: () => {
        const token = getToken()

        return token
          ? {
              headers: { authorization: `Bearer ${token}` },
            }
          : {}
      },
    })

    return [client, ssr]
  }, [])

  return (
    <UrqlProvider client={client} ssr={ssr}>
      {children}
    </UrqlProvider>
  )
}

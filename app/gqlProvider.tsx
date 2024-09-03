'use client'
import { useMemo } from 'react'

import { cacheExchange } from '@urql/exchange-graphcache'
import {
  createClient,
  fetchExchange,
  ssrExchange,
  UrqlProvider,
} from '@urql/next'

import { getToken } from '@/utils/token'
import { url } from '../utils/url'

type Props = {
  children: React.ReactNode
}

const GQLProvider = ({ children }: Props) => {
  const [client, ssr] = useMemo(() => {
    const ssr = ssrExchange({
      isClient: typeof window !== 'undefined',
    })

    const client = createClient({
      url,
      exchanges: [cacheExchange({}), ssr, fetchExchange],
      fetchOptions: () => {
        const token = getToken()
        return token ? { headers: { Authorization: `Bearer ${token}` } } : {}
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

export default GQLProvider

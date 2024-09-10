// app/react-query-provider.tsx

'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function ReactQueryProvider({ children }: Props) {
  // Initialize a query client
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

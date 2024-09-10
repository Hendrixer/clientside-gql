import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import ReactQueryProvider from './react-query-provider'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ReactQueryProvider>
            {children}
            {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
          </ReactQueryProvider>
        </Providers>
      </body>
    </html>
  )
}

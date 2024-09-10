import { getToken } from '@/utils/token'
import { url } from '@/utils/url'
import { GraphQLClient } from 'graphql-request'

export const graphQLClient = new GraphQLClient(url, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
})

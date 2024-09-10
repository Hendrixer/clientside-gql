import { graphQLClient } from '@/app/graphql-client'
import { SIGNIN_QUERY_MUTATION_GQL } from '@/gql/signin-query-mutation.gql'

import { useMutation } from '@tanstack/react-query'

interface input {
  input: {
    email: string
    password: string
  }
}

interface response {
  signin: {
    token: string
    id: string
  }
}

async function fetchSigninQueryMutation(input: input) {
  const data: response = await graphQLClient.request(
    SIGNIN_QUERY_MUTATION_GQL,
    input
  )
  return data
}

export const useSigninQueryMutation = () =>
  useMutation({
    mutationFn: async (input: input) => {
      return fetchSigninQueryMutation(input)
    },
  })

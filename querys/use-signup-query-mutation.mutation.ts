import { graphQLClient } from '@/app/graphql-client'
import { SIGNUP_QUERY_MUTATION_GQL } from '@/gql/signup-query-mutation.gql'
import { useMutation } from '@tanstack/react-query'

interface input {
  input: {
    email: string
    password: string
  }
}

interface response {
  createUser: {
    token: string
  }
}

async function fetchSignupQueryMutation(input: input) {
  const data: response = await graphQLClient.request(
    SIGNUP_QUERY_MUTATION_GQL,
    input
  )
  return data
}

export const useSignupQueryMutation = () =>
  useMutation({
    mutationFn: async (input: input) => {
      return fetchSignupQueryMutation(input)
    },
  })

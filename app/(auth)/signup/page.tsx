'use client'

import { SignUpMutation } from '@/app/gql/signupMutation'
import { setToken } from '@/utils/token'
import { Button, Input } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useMutation } from 'urql'

const SignupPage = () => {
  const [state, setState] = useState({ password: '', email: '' })
  const router = useRouter()

  const [signUpResult, signUp] = useMutation(SignUpMutation)

  const handleSignup = async (e) => {
    e.preventDefault()

    const result = await signUp({ input: state })
    console.log({ result })
    if (result.data?.createUser) {
      setToken(result.data.createUser.token)
      router.push('/')
    }
  }

  return (
    <div className="bg-white rounded-md border p-4 w-full shadow-sm">
      <div className="text-2xl text-black/70">Sign up</div>
      <form onSubmit={handleSignup} className="flex flex-col gap-4 mt-4">
        <div>
          <Input
            value={state.email}
            onValueChange={(v) => setState((s) => ({ ...s, email: v }))}
            variant="faded"
            label="Email"
            classNames={{
              inputWrapper: 'bg-slate-50 border-slate-100',
            }}
          />
        </div>
        <div>
          <Input
            variant="faded"
            value={state.password}
            onValueChange={(v) => setState((s) => ({ ...s, password: v }))}
            label="Password"
            type="password"
            classNames={{ inputWrapper: 'bg-slate-50 border-slate-100' }}
          />
        </div>
        <div className="text-end">
          <Button type="submit" variant="solid" color="primary">
            Signup
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SignupPage

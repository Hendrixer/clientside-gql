export const tokenKey = 'parallel_user_token'

export const getToken = () => {
  if (typeof window !== 'undefined') return localStorage.getItem(tokenKey)
}

export const setToken = (token: string) => {
  if (typeof window !== 'undefined')
    return localStorage.setItem(tokenKey, token)
}

export const isAuth = () => Boolean(getToken())

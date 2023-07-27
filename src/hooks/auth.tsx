import EazyAuth, { useAuthActions } from 'use-eazy-auth'
import axios from 'axios'
import { API_URL } from '../const'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'

const loginCall = (params: Record<string, string>) =>
  axios
    .get(`${API_URL}/oauth/redeem/?${new URLSearchParams(params).toString()}`)
    .then((r) => ({
      accessToken: r.data.access,
      refreshToken: r.data.refresh,
    }))

const meCall = (token: string) =>
  axios
    .get(`${API_URL}/oauth/me/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((r) => r.data)

const refreshTokenCall = (refreshToken: string) =>
  axios
    .post(`${API_URL}/oauth/token/refresh/`, {
      refresh: refreshToken,
    })
    .then((r) => ({
      accessToken: r.data.access,
      refreshToken: refreshToken,
    }))

function WatchToken() {
  const [searchParams, setSearchParams] = useSearchParams()
  const token = searchParams.get('token')
  const { login } = useAuthActions()
  useEffect(() => {
    if (token) {
      login({ redeem_token: token })
    }
  }, [token, login])
  return null
}

function Auth({ children }: { children: JSX.Element }) {
  const [searchParams, setSearchParams] = useSearchParams()
  return (
    <EazyAuth
      loginCall={loginCall}
      meCall={meCall}
      refreshTokenCall={refreshTokenCall}
      onAuthenticate={(user) => {
        const x = new URLSearchParams(searchParams)
        x.set('token', '')
        setSearchParams(x)
      }}
    >
      <WatchToken />
      {children}
    </EazyAuth>
  )
}

export default Auth

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthUser } from 'use-eazy-auth'

export default function RedirectLogin() {
  const { user } = useAuthUser()
  const navigate = useNavigate()
  useEffect(() => {
    if (user) {
      const urlRedirect = localStorage.getItem('redirectUrl')
      navigate(urlRedirect ? urlRedirect : '/it/profilo')
    }
  })
  return null
}

import { createContext } from 'react'

export const RequestContext = createContext({
  host: 'locahost',
  protocol: 'http',
})
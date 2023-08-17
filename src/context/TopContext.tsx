import { createContext, useContext } from 'react'
import { Contest } from '../types'
import { useActiveContests } from '../hooks/contest'

interface ContextTop {
  activeContests: Contest[]
}

const TopStateContext = createContext<ContextTop>({
  activeContests: [],
})

export function TopContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: contests } = useActiveContests()

  return (
    <TopStateContext.Provider
      value={{
        activeContests: contests ?? [],
      }}
    >
      {children}
    </TopStateContext.Provider>
  )
}


export function useTopContextState() {
  const filters = useContext(TopStateContext)
  return filters
}

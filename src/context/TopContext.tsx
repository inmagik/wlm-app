import { createContext, useContext, useEffect, useState } from 'react'
import { Contest } from '../types'
import { useActiveContests } from '../hooks/contest'

interface ContextTop {
  activeContests: Contest[]

  geoPermission?: string
  //setGeoPermission?: (geoPermission: string) => void
}

const TopStateContext = createContext<ContextTop>({
  activeContests: [],
})

export function TopContextProvider({
  children,
}: {
  children: React.ReactNode
}) {

  //contests
  const { data: contests } = useActiveContests()


  //geo perms
  const [geoPermission, setGeoPermission] = useState<string>('prompt')

  useEffect(() => {
    if (navigator?.permissions?.query) {
      navigator.permissions
        .query({ name: 'geolocation' })
        .then((permissionStatus) => {
          console.log(
            `geolocation permission status is ${permissionStatus.state}`
          )
          setGeoPermission(permissionStatus.state)

          permissionStatus.onchange = () => {
            console.log(
              `geolocation permission status has changed to ${permissionStatus.state}`
            )
            setGeoPermission(permissionStatus.state)
          }
        })
    } else {
      setGeoPermission('prompt')
    }
  }, [])



  return (
    <TopStateContext.Provider
      value={{
        activeContests: contests ?? [],
        geoPermission,
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

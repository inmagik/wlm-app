import { createContext, useContext, useEffect, useState } from 'react'
import { Contest } from '../types'
import { useActiveContests } from '../hooks/contest'
import { useQsFilters } from '../hooks/filters'

interface ContextTop {
  activeContests: Contest[]

  geoPermission?: string
  //setGeoPermission?: (geoPermission: string) => void
}

const getFilters = (params: URLSearchParams) => ({
  in_contest: params.get('in_contest') ?? 'true',
  search: params.get('search') ?? '',
  municipality: params.get('municipality') ?? '',
  ordering: params.get('ordering') ?? '',
  only_without_pictures: params.get('only_without_pictures') ?? '',
  category: params.get('category') ?? '',
  user_lat: params.get('user_lat') ?? '',
  user_lon: params.get('user_lon') ?? '',
  monument_lon: Number(params.get('monument_lon')) ?? '',
  monument_lat: Number(params.get('monument_lat')) ?? '',
  monument_id: Number(params.get('monument_id')) ?? '',
})

const TopStateContext = createContext<ContextTop>({
  activeContests: [],
})

export function TopContextProvider({
  children,
}: {
  children: React.ReactNode
}) {

  const { data: contests } = useActiveContests()

  const { filters, setFilters } = useQsFilters(getFilters)
  
  useEffect(() => {
    if(contests && contests.length === 0){
      setFilters({
        ...filters,
        in_contest: ''
      })
    }
  },[contests])

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

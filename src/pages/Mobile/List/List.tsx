import { Fragment, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Waypoint } from 'react-waypoint'
import Layout from '../../../components/Mobile/Layout'
import { useInfiniteMomuments } from '../../../hooks/monuments'
import styles from './List.module.css'
import { ReactComponent as Camera } from '../../../assets/camera.svg'
import { ReactComponent as Search } from '../../../assets/search.svg'
import { ReactComponent as OrderingIcon } from '../../../assets/ordering.svg'
import { useQsFilters } from '../../../hooks/filters'
import { smartSlug } from '../../../utils'
import IconMonument from '../../../components/IconMonument'
import FiltersIcon from '../../../components/Icons/FiltersIcon'
import BlockFilters from '../../../components/Mobile/BlockFilters'
import BlockOrdering from '../../../components/Mobile/BlockOrdering'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

interface Props {
  filters: {
    search: string
    municipality: string
    ordering: string
    category: string
    in_contest: string
    only_without_pictures: string
    user_lat: number
    user_lon: number
  }
  setFilters: (filters: {
    search: string
    municipality: string
    ordering: string
    category: string
    in_contest: string
    only_without_pictures: string
    user_lat: number
    user_lon: number
  }) => void
  isDesktop?: boolean
}

export function ListMonuments({ filters, setFilters }: Props) {
  useEffect(() => {
    if (history.state?.scroll) {
      listMonumentsRef.current!.scrollTop = history.state.scroll
    } else {
      listMonumentsRef.current!.scrollTop = 0
    }
  }, [])

  const {
    data: infiniteMonuments,
    hasNextPage,
    isLoading,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteMomuments(filters)

  const listMonumentsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (listMonumentsRef.current) {
        history.replaceState(
          {
            ...history.state,
            scroll: listMonumentsRef.current.scrollTop,
          },
          ''
        )
      }
    }
    listMonumentsRef.current?.addEventListener('scrollend', handleScroll)
    return () => {
      listMonumentsRef.current?.removeEventListener('scrollend', handleScroll)
    }
  }, [])

  const [geoPermission, setGeoPermission] = useState<string>('prompt')

  useEffect(() => {
    navigator.permissions
      .query({ name: 'geolocation' })
      .then((permissionStatus) => {
        console.log(
          `geolocation permission status is ${permissionStatus.state}`
        )
        setGeoPermission(permissionStatus.state)
        if (permissionStatus.state === 'granted') {
          navigator.geolocation.getCurrentPosition(success, error)
        }

        permissionStatus.onchange = () => {
          console.log(
            `geolocation permission status has changed to ${permissionStatus.state}`
          )
          setGeoPermission(permissionStatus.state)
        }
      })
  }, [])

  function success(position: any) {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    setFilters({
      ...filters,
      ordering: 'distance',
      user_lat: latitude,
      user_lon: longitude,
    })
  }

  function error() {
    setFilters({
      ...filters,
      ordering: 'label',
      user_lat: 0,
      user_lon: 0,
    })
    console.log('Unable to retrieve your location')
  }

  useEffect(() => {
    if (navigator.geolocation && geoPermission !== 'denied') {
      navigator.geolocation.getCurrentPosition(success, error)
    } else {
      console.log('Geolocation not supported')
    }
  }, [])

  const navigate = useNavigate()

  useEffect(() => {
    if (sessionStorage.getItem('monument')) {
      sessionStorage.removeItem('monument')
    }
  }, [])

  return (
    <div className={classNames(styles.ListMonuments)} ref={listMonumentsRef}>
      {isFetching && !isFetchingNextPage ? (
        <div className="d-flex align-items-center justify-content-center w-100 h-100">
          <div className="loader" />
        </div>
      ) : (
        infiniteMonuments!.pages.map((list, i) => (
          <Fragment key={i}>
            {list.results.map((monument, k) => {
              return (
                <div
                  key={k}
                  onClick={() => {
                    sessionStorage.setItem('monument', JSON.stringify(monument))
                    console.log('monument', monument)
                    navigate(`${smartSlug(monument.id, monument.label)}`)
                  }}
                  className="no-link pointer"
                >
                  <div className={styles.MonumentCard}>
                    <div className="d-flex">
                      <div>
                        <IconMonument monument={monument} />
                      </div>
                      <div className="ms-2">
                        <div className={styles.MonumentTitle}>
                          {monument.label.charAt(0).toUpperCase() + monument.label.slice(1)}
                        </div>
                        <div className={styles.City}>
                          {monument.municipality_label}
                          {monument.location &&
                            monument.location !==
                              monument.municipality_label && (
                              <div>Loc: {monument.location}</div>
                            )}
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center flex-column">
                      <div className={styles.NumberPhoto}>
                        <div>{monument.pictures_count}</div>
                        <Camera className="ms-2" />
                      </div>
                      {monument.distance && geoPermission === 'granted' && (
                        <div className={styles.Distance}>
                          {monument.distance.toFixed(1)} Km
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </Fragment>
        ))
      )}
      {hasNextPage && !isLoading && (
        <Waypoint
          topOffset={-100}
          onEnter={() => {
            fetchNextPage()
          }}
        />
      )}
    </div>
  )
}

const getFilters = (params: URLSearchParams) => ({
  search: params.get('search') ?? '',
  municipality: params.get('municipality') ?? '',
  ordering: params.get('ordering') ?? 'label',
  in_contest: params.get('in_contest') ?? 'true',
  only_without_pictures: params.get('only_without_pictures') ?? '',
  category: params.get('category') ?? '',
  user_lat: Number(params.get('user_lat')) ?? '',
  user_lon: Number(params.get('user_lon')) ?? '',
})

export default function List() {
  const { filters, setFilters, setFiltersDebounced, uiFilters } =
    useQsFilters(getFilters)
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false)
  const [orderingOpen, setOrderingOpen] = useState<boolean>(false)

  const areFiltersActive = useMemo(() => {
    if (
      filters.category !== '' ||
      filters.in_contest !== 'true' ||
      filters.municipality !== '' ||
      filters.only_without_pictures !== '' ||
      filters.search !== ''
    ) {
      return true
    } else {
      return false
    }
  }, [filters])

  return (
    <Layout>
      <div className={styles.ContainerList}>
        <div className={styles.InputContainer}>
          <input
            className={styles.InputSearch}
            value={uiFilters.search}
            onChange={(e) => {
              setFiltersDebounced({ search: e.target.value })
            }}
          />
          <div className={styles.SearchIcon}>
            <Search />
          </div>
          <div
            className={styles.ButtonOrdering}
            onClick={() => {
              setOrderingOpen(!orderingOpen)
            }}
          >
            <OrderingIcon />
          </div>
          <div
            className={
              areFiltersActive
                ? styles.ButtonFiltersActive
                : styles.ButtonFilters
            }
            onClick={() => {
              setFiltersOpen(!filtersOpen)
            }}
          >
            <FiltersIcon />
            {areFiltersActive && <div className={styles.Badge} />}
          </div>
        </div>
        <Suspense
          fallback={
            <div className="d-flex align-items-center justify-content-center w-100 h-100">
              <div className="loader" />
            </div>
          }
        >
          <ListMonuments setFilters={setFilters} filters={filters} />
        </Suspense>
      </div>
      <BlockFilters
        filtersOpen={filtersOpen}
        setFiltersOpen={setFiltersOpen}
        filters={filters}
        setFilters={setFilters}
      />
      <BlockOrdering
        orderingOpen={orderingOpen}
        setOrderingOpen={setOrderingOpen}
        filters={filters}
        setFilters={setFilters}
      />
    </Layout>
  )
}

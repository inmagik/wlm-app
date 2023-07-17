import classNames from 'classnames'
import { Fragment, Suspense, useEffect, useRef, useState } from 'react'
import BlockFilters from '../../../components/Desktop/BlockFilters'
import BlockOrdering from '../../../components/Desktop/BlockOrdering'
import { ReactComponent as Search } from '../../../assets/search.svg'
import { ReactComponent as Camera } from '../../../assets/camera.svg'
import { ReactComponent as CloseSecondary } from '../../../assets/close-secondary.svg'
import Layout from '../../../components/Desktop/Layout'
import { useQsFilters } from '../../../hooks/filters'
import styles from './List.module.css'
import { useInfiniteMomuments } from '../../../hooks/monuments'
import { Spinner } from 'react-bootstrap'
import { Waypoint } from 'react-waypoint'
import IconMonument from '../../../components/IconMonument'
import { useParams } from 'react-router-dom'
import Detail from '../../Mobile/Detail'
import { parseSmartSlug } from '../../../utils'

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
  setDetail: (monument: number) => void
}

export function ListMonuments({ filters, setDetail }: Props) {
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
    fetchNextPage,
  } = useInfiniteMomuments(filters)

  const listMonumentsRef = useRef<HTMLDivElement>(null)

  return (
    <div className={classNames(styles.ListMonuments)} ref={listMonumentsRef}>
      {isFetching ? (
        <div className="d-flex align-items-center justify-content-center w-100 h-100">
          <Spinner />
        </div>
      ) : (
        infiniteMonuments!.pages.map((list, i) => (
          <Fragment key={i}>
            {list.results.map((monument, k) => {
              return (
                <div
                  key={k}
                  className={styles.MonumentCard}
                  onClick={() => {
                    setDetail(monument.id)
                  }}
                >
                  <div className="d-flex">
                    <div>
                      <IconMonument monument={monument} />
                    </div>
                    <div className="ms-2">
                      <div className={styles.MonumentTitle}>
                        {monument.label}
                      </div>
                      <div className={styles.City}>
                        {monument.municipality_label}
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center flex-column">
                    <div className={styles.NumberPhoto}>
                      <div>{monument.pictures_wlm_count}</div>
                      <Camera className="ms-2" />
                    </div>
                    {monument.distance && navigator.geolocation && (
                      <div className={styles.Distance}>
                        {monument.distance.toFixed(1)} Km
                      </div>
                    )}
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

export default function List() {
  const { filters, setFilters, setFiltersDebounced } = useQsFilters(getFilters)
  const [detail, setDetail] = useState<number | null>(null)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setFiltersDebounced({
          user_lat: position.coords.latitude,
          user_lon: position.coords.longitude,
        })
      })
    }
  }, [])

  const { slug } = useParams()

  useEffect(() => {
    if (slug) {
      setDetail(Number(parseSmartSlug(slug)))
    }
  }, [slug])

  return (
    <Layout>
      <div className="d-flex h-100 w-100">
        <div className="h-100">
          <BlockFilters
            filters={filters}
            setFilters={setFilters}
            setDetail={setDetail}
          />
        </div>
        <div
          className={styles.CardContainerList}
          style={{
            width: detail ? 'calc(100% - 401px - 348px)' : 'calc(100% - 348px)',
            transition: 'width 0.3s ease-in-out',
          }}
        >
          <div
            className={classNames({
              [styles.MonumentsBlock]: !detail,
              [styles.MonumentsBlockWithDetail]: detail,
            })}
          >
            <div className="w-100 position-relative">
              <input
                onChange={(e) => {
                  setFiltersDebounced({ search: e.target.value })
                }}
                value={filters.search}
                className={styles.InputSearch}
                type="text"
              />
              <div className={styles.SearchIcon}>
                <Search />
              </div>
              {filters.search && (
                <div
                  className={styles.ClearSearch}
                  onClick={() => {
                    setFiltersDebounced({ search: '' })
                  }}
                >
                  <CloseSecondary />
                </div>
              )}
            </div>
            <Suspense
              fallback={
                <div
                  className={
                    'w-100 h-100 d-flex align-items-center justify-content-center'
                  }
                >
                  <Spinner />
                </div>
              }
            >
              <ListMonuments setDetail={setDetail} filters={filters} />
            </Suspense>
          </div>
          <div className={'h-100'}>
            {!detail && (
              <BlockOrdering filters={filters} setFilters={setFilters} />
            )}
          </div>
        </div>
        {detail && (
          <Suspense
            fallback={
              <div className={styles.CardDetail}>
                <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                  <Spinner />
                </div>
              </div>
            }
          >
            <div className={styles.CardDetail}>
              <Detail isDesktop monumentId={detail} setDetail={setDetail} />
            </div>
          </Suspense>
        )}
      </div>
    </Layout>
  )
}

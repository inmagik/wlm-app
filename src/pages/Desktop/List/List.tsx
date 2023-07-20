import classNames from 'classnames'
import { Fragment, Suspense, useEffect, useRef, useState } from 'react'
import BlockFilters from '../../../components/Desktop/BlockFilters'
import BlockOrdering from '../../../components/Desktop/BlockOrdering'
import { ReactComponent as Search } from '../../../assets/search.svg'
import { ReactComponent as Camera } from '../../../assets/camera.svg'
import { ReactComponent as LiveHelp } from '../../../assets/live-help.svg'
import { ReactComponent as CloseSecondary } from '../../../assets/close-secondary.svg'
import Layout from '../../../components/Desktop/Layout'
import { useQsFilters } from '../../../hooks/filters'
import styles from './List.module.css'
import { useInfiniteMomuments } from '../../../hooks/monuments'
import { Waypoint } from 'react-waypoint'
import IconMonument from '../../../components/IconMonument'
import { useNavigate, useParams } from 'react-router-dom'
import Detail from '../../Mobile/Detail'
import { getLabelFromSlug, parseSmartSlug } from '../../../utils'
import { useTranslation } from 'react-i18next'
import Legend from '../../../components/Desktop/Legend'


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
  detail: number | null
}

export function ListMonuments({ filters, setDetail, detail }: Props) {
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
    isFetchingNextPage,
    isLoading,
    isFetching,
    fetchNextPage,
  } = useInfiniteMomuments(filters)

  const listMonumentsRef = useRef<HTMLDivElement>(null)

  const navigate = useNavigate()

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
                  className={classNames({
                    [styles.MonumentCard]: !detail || detail !== monument.id,
                    [styles.MonumentCardWithDetail]:
                      detail && detail === monument.id,
                  })}
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
  const { filters, setFilters } = useQsFilters(getFilters)
  const [detail, setDetail] = useState<number | null>(null)
  const [legend, setLegend] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    if (navigator.geolocation && !filters.user_lat && !filters.user_lon) {
      navigator.geolocation.getCurrentPosition((position) => {
        setFilters({
          ...filters,
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
      setFilters({
        ...filters,
        search: getLabelFromSlug(slug),
      })
    }
  }, [slug])

  const navigate = useNavigate()

  const { i18n } = useTranslation()

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
        <div className="d-flex flex-column h-100 w-100">
          <div
            className={styles.CardContainerList}
            style={{
              width: 'calc(100% - 8px)',
              height: legend ? 'calc(100% - 204px)' : '100%',
              transition: 'width 0.5s ease-in-out',
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
                    setFilters({ search: e.target.value })
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
                      if (slug) {
                        navigate(
                          '/' +
                            i18n.language +
                            '/lista' +
                            '?search=&ordering=' +
                            filters.ordering +
                            '&municipality=' +
                            filters.municipality +
                            '&category=' +
                            filters.category +
                            '&in_contest=' +
                            filters.in_contest +
                            '&only_without_pictures=' +
                            filters.only_without_pictures
                        )
                        setDetail(null)
                      } else {
                        setFilters({
                          ...filters,
                          search: '',
                        })
                      }
                    }}
                  >
                    <CloseSecondary />
                  </div>
                )}
              </div>
              <Suspense
                fallback={
                  <div
                    style={{
                      height: 'calc(100% - 64px)',
                    }}
                    className={
                      'w-100 d-flex align-items-center justify-content-center'
                    }
                  >
                    <div className="loader" />
                  </div>
                }
              >
                <ListMonuments
                  detail={detail}
                  setDetail={setDetail}
                  filters={filters}
                />
              </Suspense>
            </div>
            <div className={'h-100 position-relative'}>
              {!detail && (
                <BlockOrdering filters={filters} setFilters={setFilters} />
              )}
              <button
                className={classNames({
                  [styles.LegendButton]: !legend,
                  [styles.LegendButtonActive]: legend,
                })}
                onClick={() => {
                  setLegend(!legend)
                }}
              >
                <LiveHelp />
              </button>
            </div>
          </div>
          <Legend legend={legend} />
        </div>
        {detail && (
          <Suspense
            fallback={
              <div className={styles.CardDetail}>
                <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                  <div className="loader" />
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

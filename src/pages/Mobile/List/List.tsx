import { Fragment, useEffect, useRef, useState } from 'react'
import { Waypoint } from 'react-waypoint'
import Layout from '../../../components/Mobile/Layout'
import { useInfiniteMomuments } from '../../../hooks/monuments'
import styles from './List.module.css'
import { ReactComponent as Camera } from '../../../assets/camera.svg'
import { ReactComponent as Search } from '../../../assets/search.svg'
import { useQsFilters } from '../../../hooks/filters'
import LangLink from '../../../components/LangLink'
import { smartSlug } from '../../../utils'
import IconMonument from '../../../components/IconMonument'
import FiltersIcon from '../../../components/Icons/FiltersIcon'
import BlockFilters from '../../../components/Mobile/BlockFilters'

const getFilters = (params: URLSearchParams) => ({
  search: params.get('search') ?? '',
  municipality: params.get('municipality') ?? '',
  offsetY: params.get('offsetY') ?? '0',
})

export default function List() {
  const { filters, setFilters, setFiltersDebounced } = useQsFilters(getFilters)
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false)
  const refListMonuments = useRef<HTMLDivElement>(null)
  const {
    data: infiniteMonuments,
    hasNextPage,
    isLoading,
    fetchNextPage,
  } = useInfiniteMomuments(filters)

  useEffect(() => {
    if (!refListMonuments.current) return
    refListMonuments.current.addEventListener('scroll', () => {
      setFiltersDebounced({ offsetY: refListMonuments.current!.scrollTop.toString() })
    })
  }, [refListMonuments])

  useEffect(() => {
    if (!refListMonuments.current) return
    if(filters.offsetY === "0") return
    refListMonuments.current.scrollTop = Number(
      filters.offsetY
    )
  }, [refListMonuments])

  return (
    <Layout>
      <div className={styles.ContainerList}>
        <div className={styles.InputContainer}>
          <input
            className={styles.InputSearch}
            onChange={(e) => {
              setFilters({ search: e.target.value })
            }}
          />
          <div className={styles.SearchIcon}>
            <Search />
          </div>
          <div
            className={styles.ButtonFilters}
            onClick={() => {
              setFiltersOpen(!filtersOpen)
            }}
          >
            <FiltersIcon />
          </div>
        </div>
        <div className={styles.ListMonuments} ref={refListMonuments}>
          {infiniteMonuments!.pages.map((list, i) => (
            <Fragment key={i}>
              {list.results.map((monument) => {
                return (
                  <LangLink
                    key={monument.id}
                    to={`/lista/${smartSlug(monument.id, monument.label)}`}
                    className="no-link"
                  >
                    <div className={styles.MonumentCard}>
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
                      <div>
                        <div className={styles.NumberPhoto}>
                          <div>{monument.pictures_count}</div>
                          <Camera className="ms-2" />
                        </div>
                      </div>
                    </div>
                  </LangLink>
                )
              })}
            </Fragment>
          ))}
          {hasNextPage && !isLoading && (
            <Waypoint
              onEnter={() => {
                fetchNextPage()
              }}
            />
          )}
        </div>
      </div>
      <BlockFilters
        filtersOpen={filtersOpen}
        setFiltersOpen={setFiltersOpen}
        filters={filters}
        setFilters={setFilters}
      />
    </Layout>
  )
}

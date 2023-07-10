import { Fragment } from 'react'
import { Waypoint } from 'react-waypoint'
import Layout from '../../../components/Mobile/Layout'
import { useInfiniteMomuments } from '../../../hooks/monuments'
import styles from './List.module.css'
import { ReactComponent as CastelloIcon } from '../../../assets/castelli.svg'
import { ReactComponent as Camera } from '../../../assets/camera.svg'
import { useQsFilters } from '../../../hooks/filters'
import LangLink from '../../../components/LangLink'
import { smartSlug } from '../../../utils'
import { useBlockBodyScroll } from '../../../hooks/screen'

const getFilters = (params: URLSearchParams) => ({
  search: params.get('search') ?? '',
})

export default function List() {
  const { uiFilters, filters, setFilters } = useQsFilters(getFilters)
  const {
    data: infiniteMonuments,
    hasNextPage,
    isLoading,
    fetchNextPage,
  } = useInfiniteMomuments(filters)
  useBlockBodyScroll(true)
  return (
    <Layout>
      <div className={styles.ContainerList}>
        <div>
          <input
            className={styles.InputSearch}
            onChange={(e) => {
              setFilters({ search: e.target.value })
            }}
          />
        </div>
        <div className={styles.ListMonuments}>
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
                          <CastelloIcon />
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
    </Layout>
  )
}

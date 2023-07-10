import { Fragment } from 'react'
import { Waypoint } from 'react-waypoint'
import Layout from '../../../components/Mobile/Layout'
import { useInfiniteMomuments } from '../../../hooks/monuments'
import styles from './List.module.css'
import { ReactComponent as CastelloIcon } from '../../../assets/castelli.svg'
import { ReactComponent as Camera } from '../../../assets/camera.svg'

export default function List() {
  const {
    data: infiniteMonuments,
    hasNextPage,
    isLoading,
    fetchNextPage,
  } = useInfiniteMomuments()
  return (
    <Layout>
      <div className={styles.ContainerList}>
        <div>
          <input className={styles.InputSearch} />
        </div>
        <div className={styles.ListMonuments}>
          {infiniteMonuments!.pages.map((list, i) => (
            <Fragment key={i}>
              {list.results.map((monument) => {
                return (
                  <div className={styles.MonumentCard} key={monument.id}>
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

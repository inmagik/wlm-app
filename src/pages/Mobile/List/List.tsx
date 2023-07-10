import { Fragment } from 'react'
import { Waypoint } from 'react-waypoint'
import Layout from '../../../components/Mobile/Layout'
import { useInfiniteMomuments, useMonuments } from '../../../hooks/monuments'
import styles from './List.module.css'

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
              {list.results.map((monument, i) => {
                return (
                  <div className={styles.MonumentCard} key={monument.id}></div>
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

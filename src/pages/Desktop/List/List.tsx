import classNames from 'classnames'
import { useEffect } from 'react'
import BlockFilters from '../../../components/Desktop/BlockFilters'
import Layout from '../../../components/Desktop/Layout'
import { useQsFilters } from '../../../hooks/filters'
import { ListMonuments } from '../../Mobile/List/List'
import styles from './List.module.css'

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
  const { filters, setFilters, setFiltersDebounced } = useQsFilters(getFilters)

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

  return (
    <Layout>
      <div className="d-flex h-100 w-100">
        <div className="h-100">
          <BlockFilters filters={filters} setFilters={setFilters} />
        </div>
        <div className={styles.CardContainerList}>
          <div className={classNames(styles.MonumentsBlock)}>
            <div className="w-100">
              <input className={styles.InputSearch} type="text" />
            </div>
            <ListMonuments filters={filters} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

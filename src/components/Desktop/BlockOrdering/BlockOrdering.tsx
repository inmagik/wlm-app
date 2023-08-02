import styles from './BlockOrdering.module.css'
import { ReactComponent as OrderingIcon } from '../../../assets/ordering-primary.svg'
import { ReactComponent as CheckOrderingIcon } from '../../../assets/ordering-checked.svg'
import { ReactComponent as UncheckOrderingIcon } from '../../../assets/ordering-unchecked.svg'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import { useEffect, useState } from 'react'

interface Props {
  setFilters: (filters: any) => void
  filters: Record<string, any>
}

export default function BlockOrdering({ setFilters, filters }: Props) {
  const { t } = useTranslation()

  const [geoPermission, setGeoPermission] = useState<string>('prompt')

  useEffect(() => {
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
  }, [])

  function handleLocationClick() {
    if (navigator.geolocation && geoPermission !== 'denied') {
      navigator.geolocation.getCurrentPosition(success, error)
    } else {
      console.log('Geolocation not supported')
    }
  }

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
    console.log('Unable to retrieve your location')
  }

  return (
    <div className={styles.BlockOrdering}>
      <div className={styles.TitleOrdering}>
        <OrderingIcon /> <div className="ms-2">{t('ordinamento')}</div>
      </div>
      <div className={styles.ListOrderingItems}>
        <div
          className={classNames(styles.OrderingItem, {
            [styles.OrderingItemActive]: filters.ordering === 'label',
          })}
          onClick={() => {
            setFilters({
              ...filters,
              ordering: 'label',
            })
          }}
        >
          <div>
            {filters.ordering === 'label' ? (
              <CheckOrderingIcon />
            ) : (
              <UncheckOrderingIcon />
            )}
          </div>
          <div className={styles.OrderingItemTitle}>{t('alfabetico_a_z')}</div>
        </div>
        <div
          className={classNames(styles.OrderingItem, {
            [styles.OrderingItemActive]: filters.ordering === '-label',
          })}
          onClick={() => {
            setFilters({
              ...filters,
              ordering: '-label',
            })
          }}
        >
          <div>
            {filters.ordering === '-label' ? (
              <CheckOrderingIcon />
            ) : (
              <UncheckOrderingIcon />
            )}
          </div>
          <div className={styles.OrderingItemTitle}>{t('alfabetico_z_a')}</div>
        </div>
        <div
          className={classNames(styles.OrderingItem, {
            [styles.OrderingItemActive]:
              filters.ordering === 'pictures_wlm_count',
          })}
          onClick={() => {
            setFilters({
              ...filters,
              ordering: 'pictures_wlm_count',
            })
          }}
        >
          <div>
            {filters.ordering === 'pictures_wlm_count' ? (
              <CheckOrderingIcon />
            ) : (
              <UncheckOrderingIcon />
            )}
          </div>
          <div className={styles.OrderingItemTitle}>
            {t('meno_fotografati')}
          </div>
        </div>
        <div
          className={classNames(styles.OrderingItem, {
            [styles.OrderingItemActive]: filters.ordering === 'distance',
            [styles.OrderingItemDisabled]: geoPermission === 'denied',
          })}
          onClick={() => {
            if (geoPermission !== 'denied') {
              handleLocationClick()
              setFilters({
                ...filters,
                ordering: 'distance',
              })
            }
          }}
        >
          <div>
            {filters.ordering === 'distance' ? (
              <CheckOrderingIcon />
            ) : (
              <UncheckOrderingIcon />
            )}
          </div>
          <div className={styles.OrderingItemTitle}>{t('distanza')}</div>
        </div>
      </div>
    </div>
  )
}

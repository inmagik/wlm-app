import { useMemo, useState, useEffect } from 'react'
import { ReactComponent as Close } from '../../../assets/close.svg'
import { ReactComponent as ArrowRight } from '../../../assets/arrow-right.svg'
import { ReactComponent as OrderingPrimaryIcon } from '../../../assets/ordering-primary.svg'
import { ReactComponent as CheckOrderingIcon } from '../../../assets/ordering-checked.svg'
import { ReactComponent as UncheckOrderingIcon } from '../../../assets/ordering-unchecked.svg'
import { useTranslation } from 'react-i18next'
import styles from './BlockOrdering.module.css'
import classNames from 'classnames'

interface BlockOrderingProps {
  orderingOpen: boolean
  setOrderingOpen: (filtersOpen: boolean) => void
  setFilters: (filters: any) => void
  filters: Record<string, any>
}

export default function BlockOrdering({
  orderingOpen,
  setOrderingOpen,
  setFilters,
  filters,
}: BlockOrderingProps) {
  const [filterOrderingOpen, setFilterOrderingOpen] = useState<boolean>(false)
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

  const currentOrdering = useMemo(() => {
    const ordering = filters.ordering
    if (ordering === 'label') {
      return t('alfabetico_a_z')
    } else if (ordering === '-label') {
      return t('alfabetico_z_a')
    } else if (ordering === 'pictures_count') {
      return t('meno_fotografati')
    } else if (ordering === 'distance') {
      return t('distanza')
    }
  }, [filters.ordering, t])

  return (
    <>
      <div
        className={styles.OverlayFilters}
        style={{
          opacity: orderingOpen ? 1 : 0,
          pointerEvents: orderingOpen ? 'all' : 'none',
          transition: 'all 0.5s ease-in-out',
        }}
        onClick={() => {
          setOrderingOpen(false)
        }}
      ></div>
      <div
        style={{
          transform: orderingOpen ? 'translateY(0)' : 'translateY(100%)',
          transition: 'all 0.5s ease-in-out',
        }}
        className={styles.ContainerFiltersOrdering}
      >
        <div className={styles.TitleBlockOrdering}>
          <div className="d-flex align-items-center">
            <OrderingPrimaryIcon />
            <div className="ms-2">{t('ordinamento')}</div>
          </div>
          <div className="pointer">
            <Close onClick={() => setOrderingOpen(false)} />
          </div>
        </div>
        <div className={styles.ListFilters}>
          <div
            className={styles.Filter}
            onClick={() => {
              setFilterOrderingOpen(!filterOrderingOpen)
            }}
          >
            <div className={styles.FilterTitle}>{t('scegli_ordinamento')}</div>
            <div className="d-flex align-items-center">
              <div className={styles.FilterItem}>{currentOrdering}</div>
              <div className="ms-2">
                <ArrowRight />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={styles.BlockChooseOrdering}
        style={{
          transform: filterOrderingOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'all 0.5s ease-in-out',
          pointerEvents: filterOrderingOpen ? 'all' : 'none',
        }}
      >
        <div className={styles.TitleBlockOrdering}>
          <div className="d-flex align-items-center">
            <OrderingPrimaryIcon fill="var(--primary)" />
            <div className="ms-2">{t('scegli_ordinamento')}</div>
          </div>
          <div>
            <Close onClick={() => setFilterOrderingOpen(false)} />
          </div>
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
              setFilterOrderingOpen(false)
            }}
          >
            <div>
              {filters.ordering === 'label' ? (
                <CheckOrderingIcon />
              ) : (
                <UncheckOrderingIcon />
              )}
            </div>
            <div className={styles.OrderingItemTitle}>
              {t('alfabetico_a_z')}
            </div>
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
              setFilterOrderingOpen(false)
            }}
          >
            <div>
              {filters.ordering === '-label' ? (
                <CheckOrderingIcon />
              ) : (
                <UncheckOrderingIcon />
              )}
            </div>
            <div className={styles.OrderingItemTitle}>
              {t('alfabetico_z_a')}
            </div>
          </div>
          <div
            className={classNames(styles.OrderingItem, {
              [styles.OrderingItemActive]:
                filters.ordering === 'pictures_count',
            })}
            onClick={() => {
              setFilters({
                ...filters,
                ordering: 'pictures_count',
              })
              setFilterOrderingOpen(false)
            }}
          >
            <div>
              {filters.ordering === 'pictures_count' ? (
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
                setFilterOrderingOpen(false)
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
    </>
  )
}

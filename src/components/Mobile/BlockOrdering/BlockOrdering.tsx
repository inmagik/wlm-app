import { useMemo, useState } from 'react'
import { ReactComponent as FiltersIcon } from '../../../assets/filter.svg'
import { ReactComponent as Close } from '../../../assets/close.svg'
import { ReactComponent as ArrowRight } from '../../../assets/arrow-right.svg'
import { ReactComponent as OrderingPrimaryIcon } from '../../../assets/ordering-primary.svg'
import { useTranslation } from 'react-i18next'
import styles from './BlockOrdering.module.css'

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

  const currentOrdering = useMemo(() => {
    const ordering = filters.ordering
    if (ordering === 'label') {
      return t('alfabetico_a_z')
    } else if (ordering === '-label') {
      t('alfabetico_z_a')
    }
    return t('alfabetico_a_z')
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
            <FiltersIcon fill="var(--primary)" />
            <div className="ms-2">{t('scegli_ordinamento')}</div>
          </div>
          <div>
            <Close onClick={() => setFilterOrderingOpen(false)} />
          </div>
        </div>
      </div>
    </>
  )
}

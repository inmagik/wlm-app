import styles from './BlockOrdering.module.css'
import { ReactComponent as OrderingIcon } from '../../../assets/ordering-primary.svg'
import { ReactComponent as CheckOrderingIcon } from '../../../assets/ordering-checked.svg'
import { ReactComponent as UncheckOrderingIcon } from '../../../assets/ordering-unchecked.svg'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

interface Props {
  setFilters: (filters: any) => void
  filters: Record<string, any>
}

export default function BlockOrdering({ setFilters, filters }: Props) {
  const { t } = useTranslation()
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
            {filters.ordering === '' ? (
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
          })}
          onClick={() => {
            setFilters({
              ...filters,
              ordering: 'distance',
            })
          }}
        >
          <div>
            {filters.ordering === '' ? (
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

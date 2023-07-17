import styles from './BlockFilters.module.css'
import { ReactComponent as FiltersIcon } from '../../../assets/filter-primary.svg'
import { ReactComponent as CheckOrderingIcon } from '../../../assets/ordering-checked.svg'
import { ReactComponent as UncheckOrderingIcon } from '../../../assets/ordering-unchecked.svg'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import classNames from 'classnames'
import ReactSwitch from 'react-switch'

interface Props {
  setFilters: (filters: any) => void
  filters: Record<string, any>
}

export default function BlockFilters({ setFilters, filters }: Props) {
  const { t } = useTranslation()
  const [searchComune, setSearchComune] = useState<string>('')
  return (
    <div className={styles.BlockFilters}>
      <div className={styles.TopFiltri}>
        <div className="d-flex align-items-center">
          <FiltersIcon />{' '}
          <div className={styles.FilterLabel}>{t('filtri')}</div>
        </div>
        <div
          className={styles.ResetButton}
          onClick={() => {
            setFilters({
              category: '',
              municipality: '',
              in_contest: 'true',
              only_without_pictures: '',
            })
          }}
        >
          {t('reset')}
        </div>
      </div>
      <div className={styles.FilterComune}>
        <div className={styles.FilterLabel}>{t('comune')}</div>
        <div className="w-100">
          <input
            className={styles.InputComune}
            type="text"
            placeholder={t('cerca_comune')}
            value={searchComune}
            onChange={(e) => {
              setSearchComune(e.target.value)
            }}
          />
        </div>
      </div>
      <div className={styles.FilterCategoria}>
        <div className={styles.FilterLabel}>{t('categoria')}</div>
        <div className={styles.FilterOptions}>
          <div
            className={classNames(styles.FilterItem, {
              [styles.FilterItemActive]: filters.category === '',
            })}
            onClick={() => {
              setFilters({
                ...filters,
                category: '',
              })
            }}
          >
            <div>
              {filters.category === '' ? (
                <CheckOrderingIcon />
              ) : (
                <UncheckOrderingIcon />
              )}
            </div>
            <div className={styles.FilterItemTitle}>{t('tutte')}</div>
          </div>
          <div
            className={classNames(styles.FilterItem, {
              [styles.FilterItemActive]: filters.category === 'Castelli',
            })}
            onClick={() => {
              setFilters({
                ...filters,
                category: 'Castelli',
              })
            }}
          >
            <div>
              {filters.category === 'Castelli' ? (
                <CheckOrderingIcon />
              ) : (
                <UncheckOrderingIcon />
              )}
            </div>
            <div className={styles.FilterItemTitle}>{t('castelli')}</div>
          </div>
          <div
            className={classNames(styles.FilterItem, {
              [styles.FilterItemActive]:
                filters.category === 'Edifici religiosi',
            })}
            onClick={() => {
              setFilters({
                ...filters,
                category: 'Edifici religiosi',
              })
            }}
          >
            <div>
              {filters.category === 'Edifici religiosi' ? (
                <CheckOrderingIcon />
              ) : (
                <UncheckOrderingIcon />
              )}
            </div>
            <div className={styles.FilterItemTitle}>
              {t('edifici_religiosi')}
            </div>
          </div>
          <div
            className={classNames(styles.FilterItem, {
              [styles.FilterItemActive]: filters.category === 'Altri monumenti',
            })}
            onClick={() => {
              setFilters({
                ...filters,
                category: 'Altri monumenti',
              })
            }}
          >
            <div>
              {filters.category === 'Altri monumenti' ? (
                <CheckOrderingIcon />
              ) : (
                <UncheckOrderingIcon />
              )}
            </div>
            <div className={styles.FilterItemTitle}>{t('altri_monumenti')}</div>
          </div>
          <div
            className={classNames(styles.FilterItem, {
              [styles.FilterItemActive]: filters.category === 'Musei',
            })}
            onClick={() => {
              setFilters({
                ...filters,
                category: 'Musei',
              })
            }}
          >
            <div>
              {filters.category === 'Musei' ? (
                <CheckOrderingIcon />
              ) : (
                <UncheckOrderingIcon />
              )}
            </div>
            <div className={styles.FilterItemTitle}>{t('musei')}</div>
          </div>
          <div
            className={classNames(styles.FilterItem, {
              [styles.FilterItemActive]:
                filters.category === 'Alberi monumentali',
            })}
            onClick={() => {
              setFilters({
                ...filters,
                category: 'Alberi monumentali',
              })
            }}
          >
            <div>
              {filters.category === 'Alberi monumentali' ? (
                <CheckOrderingIcon />
              ) : (
                <UncheckOrderingIcon />
              )}
            </div>
            <div className={styles.FilterItemTitle}>
              {t('alberi_monumentali')}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.Filter}>
        <div className={styles.FilterTitle}>{t('tutti_i_monumenti')}</div>
        <div className="d-flex align-items-center">
          <div>
            <ReactSwitch
              offColor="#D0DFE4"
              size={15}
              checkedIcon={false}
              uncheckedIcon={false}
              onColor="#40BAEC"
              onChange={(checked) => {
                setFilters({
                  ...filters,
                  in_contest: checked ? '' : 'true',
                })
              }}
              checked={filters.in_contest !== 'true'}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

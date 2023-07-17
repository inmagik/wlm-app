import styles from './BlockFilters.module.css'
import { ReactComponent as FiltersIcon } from '../../../assets/filter-primary.svg'
import { ReactComponent as CheckOrderingIcon } from '../../../assets/ordering-checked.svg'
import { ReactComponent as UncheckOrderingIcon } from '../../../assets/ordering-unchecked.svg'
import { ReactComponent as CloseSecondary } from '../../../assets/close-secondary.svg'
import { ReactComponent as Flag } from '../../../assets/flag.svg'
import { useTranslation } from 'react-i18next'
import { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import ReactSwitch from 'react-switch'
import { useComuni } from '../../../hooks/comuni'

interface Props {
  setFilters: (filters: any) => void
  filters: Record<string, any>
  setDetail: (detail: any) => void
}

export default function BlockFilters({
  setFilters,
  filters,
  setDetail,
}: Props) {
  const { t } = useTranslation()
  const [searchComune, setSearchComune] = useState<string>('')
  const [openOptions, setOpenOptions] = useState<boolean>(false)

  const { data: comuni } = useComuni()

  const comuniFiltered = useMemo(() => {
    return comuni?.filter((comune) =>
      comune.label.toLowerCase().includes(searchComune.toLowerCase())
    )
  }, [comuni, searchComune])

  console.log(filters.municipality, 'comuni')

  useEffect(() => {
    if (filters.municipality) {
      const comune = comuni?.find(
        (comune) => comune.code === Number(filters.municipality)
      )
      setSearchComune(comune?.label || '')
    }
  }, [filters.municipality, comuni])

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
        <div className="w-100 position-relative">
          <input
            className={styles.InputComune}
            type="text"
            placeholder={t('cerca_comune')}
            value={searchComune}
            onChange={(e) => {
              setOpenOptions(true)
              setSearchComune(e.target.value)
            }}
          />
          {searchComune.length > 0 && (
            <div
              className={styles.CloseIconWrapper}
              onClick={() => {
                setFilters({
                  ...filters,
                  municipality: '',
                })
                setSearchComune('')
                setOpenOptions(false)
              }}
            >
              <CloseSecondary className={styles.CloseIcon} />
            </div>
          )}
        </div>
        {openOptions &&
          searchComune.length > 0 &&
          comuniFiltered &&
          comuniFiltered?.length > 0 && (
            <div className={styles.ComuniList}>
              {comuniFiltered.map((comune) => (
                <div
                  key={comune.code}
                  className={classNames(styles.ComuneItem)}
                  onClick={() => {
                    setDetail(null)
                    setSearchComune(comune.label)
                    setOpenOptions(false)
                    setFilters({
                      ...filters,
                      municipality: comune.code,
                    })
                  }}
                >
                  <div className={styles.ComuneItemTitle}>
                    <Flag className="me-2" /> {comune.label}
                  </div>
                </div>
              ))}
            </div>
          )}
      </div>
      <div className={styles.FilterCategoria}>
        <div className={styles.FilterLabel}>{t('categoria')}</div>
        <div className={styles.FilterOptions}>
          <div
            className={classNames(styles.FilterItem, {
              [styles.FilterItemActive]: filters.category === '',
            })}
            onClick={() => {
              setDetail(null)
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
              setDetail(null)
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
              setDetail(null)
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
              setDetail(null)
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
              setDetail(null)
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
              setDetail(null)
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

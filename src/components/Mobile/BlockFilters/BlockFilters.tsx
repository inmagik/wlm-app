import { useMemo, useRef, useState } from 'react'
import { ReactComponent as Close } from '../../../assets/close.svg'
import { ReactComponent as CloseSecondary } from '../../../assets/close-secondary.svg'
import { ReactComponent as ArrowRight } from '../../../assets/arrow-right.svg'
import { ReactComponent as Flag } from '../../../assets/flag.svg'
import { ReactComponent as Search } from '../../../assets/search.svg'
import { ReactComponent as CheckOrderingIcon } from '../../../assets/ordering-checked.svg'
import { ReactComponent as UncheckOrderingIcon } from '../../../assets/ordering-unchecked.svg'
import { useTranslation } from 'react-i18next'
import styles from './BlockFilters.module.css'
import { useComuni } from '../../../hooks/comuni'
import FiltersIcon from '../../Icons/FiltersIcon'
import classNames from 'classnames'
import ReactSwitch from 'react-switch'

interface BlockFiltersProps {
  filtersOpen: boolean
  setFiltersOpen: (filtersOpen: boolean) => void
  setFilters: (filters: any) => void
  filters: Record<string, any>
  setComuneFilterCoords?: (coords: number[]) => void
}

export default function BlockFilters({
  filtersOpen,
  setFiltersOpen,
  setFilters,
  filters,
  setComuneFilterCoords,
}: BlockFiltersProps) {
  const [searchComune, setSearchComune] = useState<string>('')
  const [filterComuneOpen, setFilterComuneOpen] = useState<boolean>(false)
  const [filterCategoriaOpen, setFilterCategoriaOpen] = useState<boolean>(false)
  const { t } = useTranslation()
  const { data: comuni } = useComuni()
  

  const comuniFiltered = useMemo(() => {
    if (searchComune === '') {
      return []
    }
    const comuniFiltered = comuni?.filter((comune) =>
      comune.label.toLowerCase().includes(searchComune.toLowerCase())
    )
    const comuniOrdered = comuniFiltered?.sort((a, b) => {
      const aStartWith = a.label.toLowerCase().startsWith(searchComune)
      const bStartWith = b.label.toLowerCase().startsWith(searchComune)
      if (aStartWith && !bStartWith) {
        return -1
      } else if (!aStartWith && bStartWith) {
        return 1
      } else {
        return a.label.length - b.label.length
      }
    })

    return comuniOrdered
  }, [searchComune, comuni])

  const parentRef = useRef<HTMLDivElement>(null)

  const [openComuni, setOpenComuni] = useState<boolean>(false)

  const isResetDisaable = useMemo(() => {
    return (
      filters.category === '' &&
      filters.municipality === '' &&
      filters.in_contest === 'true' &&
      filters.only_without_pictures === ''
    )
  }, [filters])

  return (
    <>
      <div
        className={styles.OverlayFilters}
        style={{
          opacity: filtersOpen ? 1 : 0,
          pointerEvents: filtersOpen ? 'all' : 'none',
          transition: 'all 0.5s ease-in-out',
        }}
        onClick={() => {
          setFiltersOpen(false)
        }}
      ></div>
      <div
        style={{
          transform: filtersOpen ? 'translateY(0)' : 'translateY(100%)',
          transition: 'all 0.5s ease-in-out',
        }}
        className={styles.ContainerFilters}
      >
        <div className={styles.TitleBlockFilters}>
          <div className="d-flex align-items-center">
            <FiltersIcon fill="var(--primary)" />
            <div className="ms-2">{t('filtra')}</div>
          </div>
          <div>
            <Close onClick={() => setFiltersOpen(false)} />
          </div>
        </div>
        <div className={styles.ListFilters}>
          <div
            className={styles.Filter}
            onClick={() => {
              setFilterComuneOpen(!filterComuneOpen)
            }}
          >
            <div className={styles.FilterTitle}>{t('comune')}</div>
            <div className="d-flex align-items-center">
              <div className={styles.FilterItem}>
                {filters.municipality !== '' ? (
                  <>
                    {
                      comuni?.find(
                        (comune) => comune.code === Number(filters.municipality)
                      )?.name
                    }
                    <CloseSecondary
                      className="ms-2"
                      onClick={(e) => {
                        e.stopPropagation()
                        setFilters({
                          ...filters,
                          municipality: '',
                        })
                      }}
                    />
                  </>
                ) : (
                  t('tutti')
                )}
              </div>
              <div className="ms-2">
                <ArrowRight />
              </div>
            </div>
          </div>
          <div
            className={styles.Filter}
            onClick={() => {
              setFilterCategoriaOpen(!filterCategoriaOpen)
            }}
          >
            <div className={styles.FilterTitle}>{t('categoria')}</div>
            <div className="d-flex align-items-center">
              <div className={styles.FilterItem}>
                {filters.category !== '' ? (
                  <>
                    {filters.category}{' '}
                    <CloseSecondary
                      className="ms-2"
                      onClick={(e) => {
                        e.stopPropagation()
                        setFilters({
                          ...filters,
                          category: '',
                        })
                      }}
                    />
                  </>
                ) : (
                  t('tutte')
                )}
              </div>
              <div className="ms-2">
                <ArrowRight />
              </div>
            </div>
          </div>
          <div className={styles.Filter}>
            <div className={styles.FilterTitle}>
              {t('anche_monumenti_fuori_concorso')}
            </div>
            <div className="d-flex align-items-center">
              <div className={styles.FilterItem}>
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
              <div className="ms-2">
                <ArrowRight />
              </div>
            </div>
          </div>
          <div className={styles.Filter}>
            <div className={styles.FilterTitle}>
              {t('solo_monumenti_senza_foto')}
            </div>
            <div className="d-flex align-items-center">
              <div className={styles.FilterItem}>
                <ReactSwitch
                  offColor="#D0DFE4"
                  size={15}
                  checkedIcon={false}
                  uncheckedIcon={false}
                  onColor="#40BAEC"
                  onChange={(checked) => {
                    setFilters({
                      ...filters,
                      only_without_pictures: checked ? 'true' : '',
                    })
                  }}
                  checked={filters.only_without_pictures === 'true'}
                />
              </div>
              <div className="ms-2">
                <ArrowRight />
              </div>
            </div>
          </div>
          <div className="d-flex mt-4 justify-content-end">
            <button
              className={classNames({
                [styles.ResetDisabled]: isResetDisaable,
                [styles.Reset]: !isResetDisaable,
              })}
              disabled={isResetDisaable}
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
            </button>
          </div>
        </div>
      </div>
      <div
        className={styles.BlockFilterComune}
        style={{
          transform: filterComuneOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'all 0.5s ease-in-out',
          pointerEvents: filterComuneOpen ? 'all' : 'none',
        }}
      >
        <div className={styles.TitleBlockFilters}>
          <div className="d-flex align-items-center">
            <FiltersIcon fill="var(--primary)" />
            <div className="ms-2">{t('cerca_comune')}</div>
          </div>
          <div>
            <Close onClick={() => setFilterComuneOpen(false)} />
          </div>
        </div>
        <div className={styles.InputSearchComune}>
          <input
            className={styles.InputSearchFieldComune}
            onChange={(e) => {
              setOpenComuni(true)
              setSearchComune(e.target.value)
            }}
          />
          <div className={styles.SearchIconSearch}>
            <Search />
          </div>
        </div>
        <div className={styles.ListComuni} ref={parentRef}>
          {openComuni &&
            searchComune.length > 0 &&
            comuniFiltered?.map((comune) => {
              return (
                <div
                  className={styles.FilterItemComune}
                  key={comune.code}
                  onClick={() => {
                    setFilters({ municipality: comune.code })
                    setFilterComuneOpen(false)
                    if (setComuneFilterCoords) {
                      const coords = comune.centroid.coordinates
                      setComuneFilterCoords(coords)
                    }
                    sessionStorage.removeItem('monument_id')
                  }}
                >
                  <Flag className="me-2" /> {comune.label}
                </div>
              )
            })}
        </div>
      </div>
      <div
        className={styles.BlockFilterCategoria}
        style={{
          transform: filterCategoriaOpen
            ? 'translateX(0)'
            : 'translateX(-100%)',
          transition: 'all 0.5s ease-in-out',
          pointerEvents: filterCategoriaOpen ? 'all' : 'none',
        }}
      >
        <div className={styles.TitleBlockFilters}>
          <div className="d-flex align-items-center">
            <FiltersIcon fill="var(--primary)" />
            <div className="ms-2">{t('scegli_categoria')}</div>
          </div>
          <div>
            <Close onClick={() => setFilterCategoriaOpen(false)} />
          </div>
        </div>
        <div className={styles.ListOrderingItems}>
          <div
            className={classNames(styles.OrderingItem, {
              [styles.OrderingItemActive]: filters.category === '',
            })}
            onClick={() => {
              setFilters({
                ...filters,
                category: '',
              })
              setFilterCategoriaOpen(false)
            }}
          >
            <div>
              {filters.category === '' ? (
                <CheckOrderingIcon />
              ) : (
                <UncheckOrderingIcon />
              )}
            </div>
            <div className={styles.OrderingItemTitle}>
              {t('tutte_le_categorie')}
            </div>
          </div>
          <div
            className={classNames(styles.OrderingItem, {
              [styles.OrderingItemActive]:
                filters.category === 'Edifici religiosi',
            })}
            onClick={() => {
              setFilters({
                ...filters,
                category: 'Edifici religiosi',
              })
              setFilterCategoriaOpen(false)
            }}
          >
            <div>
              {filters.category === 'Edifici religiosi' ? (
                <CheckOrderingIcon />
              ) : (
                <UncheckOrderingIcon />
              )}
            </div>
            <div className={styles.OrderingItemTitle}>
              {t('edifici_religiosi')}
            </div>
          </div>
          <div
            className={classNames(styles.OrderingItem, {
              [styles.OrderingItemActive]: filters.category === 'Castelli',
            })}
            onClick={() => {
              setFilters({
                ...filters,
                category: 'Castelli',
              })
              setFilterCategoriaOpen(false)
            }}
          >
            <div>
              {filters.category === 'Castelli' ? (
                <CheckOrderingIcon />
              ) : (
                <UncheckOrderingIcon />
              )}
            </div>
            <div className={styles.OrderingItemTitle}>{t('castelli')}</div>
          </div>
          <div
            className={classNames(styles.OrderingItem, {
              [styles.OrderingItemActive]: filters.category === 'Musei',
            })}
            onClick={() => {
              setFilters({
                ...filters,
                category: 'Musei',
              })
              setFilterCategoriaOpen(false)
            }}
          >
            <div>
              {filters.category === 'Musei' ? (
                <CheckOrderingIcon />
              ) : (
                <UncheckOrderingIcon />
              )}
            </div>
            <div className={styles.OrderingItemTitle}>{t('musei')}</div>
          </div>
          <div
            className={classNames(styles.OrderingItem, {
              [styles.OrderingItemActive]:
                filters.category === 'Altri monumenti',
            })}
            onClick={() => {
              setFilters({
                ...filters,
                category: 'Altri monumenti',
              })
              setFilterCategoriaOpen(false)
            }}
          >
            <div>
              {filters.category === 'Altri monumenti' ? (
                <CheckOrderingIcon />
              ) : (
                <UncheckOrderingIcon />
              )}
            </div>
            <div className={styles.OrderingItemTitle}>
              {t('altri_monumenti')}
            </div>
          </div>
          <div
            className={classNames(styles.OrderingItem, {
              [styles.OrderingItemActive]:
                filters.category === 'Alberi monumentali',
            })}
            onClick={() => {
              setFilters({
                ...filters,
                category: 'Alberi monumentali',
              })
              setFilterCategoriaOpen(false)
            }}
          >
            <div>
              {filters.category === 'Alberi monumentali' ? (
                <CheckOrderingIcon />
              ) : (
                <UncheckOrderingIcon />
              )}
            </div>
            <div className={styles.OrderingItemTitle}>
              {t('alberi_monumentali')}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

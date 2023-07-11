import { useMemo, useState } from 'react'
import { ReactComponent as Close } from '../../../assets/close.svg'
import { ReactComponent as ArrowRight } from '../../../assets/arrow-right.svg'
import { ReactComponent as Flag } from '../../../assets/flag.svg'
import { ReactComponent as Search } from '../../../assets/search.svg'
import { useTranslation } from 'react-i18next'
import styles from './BlockFilters.module.css'
import { useComuni } from '../../../hooks/comuni'
import FiltersIcon from '../../Icons/FiltersIcon'

interface BlockFiltersProps {
  filtersOpen: boolean
  setFiltersOpen: (filtersOpen: boolean) => void
  setFilters: (filters: any) => void
  filters: Record<string, any>
}

export default function BlockFilters({
  filtersOpen,
  setFiltersOpen,
  setFilters,
  filters,
}: BlockFiltersProps) {
  const [searchComune, setSearchComune] = useState<string>('')
  const [filterComuneOpen, setFilterComuneOpen] = useState<boolean>(false)
  const { t } = useTranslation()
  const { data: comuni } = useComuni()

  const comuniFiltered = useMemo(() => {
    return comuni?.filter((comune) =>
      comune.label.toLowerCase().includes(searchComune.toLowerCase())
    )
  }, [comuni, searchComune])
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
                {filters.municipality !== ''
                  ? filters.municipality
                  : t('tutti')}
              </div>
              <div className="ms-2">
                <ArrowRight />
              </div>
            </div>
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
              setSearchComune(e.target.value)
            }}
          />
          <div className={styles.SearchIconSearch}>
            <Search />
          </div>
        </div>
        <div className={styles.ListComuni}>
          {comuniFiltered?.map((comune) => {
            return (
              <div
                className={styles.FilterItemComune}
                key={comune.code}
                onClick={() => {
                  setFilters({ municipality: comune.label })
                  setFilterComuneOpen(false)
                }}
              >
                <Flag className="me-2" /> {comune.label}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

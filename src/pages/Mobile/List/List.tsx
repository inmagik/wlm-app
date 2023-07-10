import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { Waypoint } from 'react-waypoint'
import Layout from '../../../components/Mobile/Layout'
import { useInfiniteMomuments } from '../../../hooks/monuments'
import styles from './List.module.css'
import { ReactComponent as Camera } from '../../../assets/camera.svg'
import { ReactComponent as Search } from '../../../assets/search.svg'
import { ReactComponent as Close } from '../../../assets/close.svg'
import { ReactComponent as ArrowRight } from '../../../assets/arrow-right.svg'
import { ReactComponent as Flag } from '../../../assets/flag.svg'
import { useQsFilters } from '../../../hooks/filters'
import LangLink from '../../../components/LangLink'
import { smartSlug } from '../../../utils'
import IconMonument from '../../../components/IconMonument'
import FiltersIcon from '../../../components/Icons/FiltersIcon'
import { useTranslation } from 'react-i18next'
import { useComuni } from '../../../hooks/comuni'

const getFilters = (params: URLSearchParams) => ({
  search: params.get('search') ?? '',
  municipality: params.get('municipality') ?? '',
})

export default function List() {
  const { filters, setFilters } = useQsFilters(getFilters)
  const [searchComune, setSearchComune] = useState<string>('')
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false)
  const [filterComuneOpen, setFilterComuneOpen] = useState<boolean>(false)
  const refListMonuments = useRef<HTMLDivElement>(null)
  const {
    data: infiniteMonuments,
    hasNextPage,
    isLoading,
    fetchNextPage,
  } = useInfiniteMomuments(filters)

  useEffect(() => {
    if (!refListMonuments.current) return
    refListMonuments.current.addEventListener('scroll', () => {
      sessionStorage.setItem(
        'offsetY',
        refListMonuments.current!.scrollTop.toString()
      )
    })
  }, [refListMonuments])

  useEffect(() => {
    if (!refListMonuments.current) return
    refListMonuments.current.scrollTop = Number(
      sessionStorage.getItem('offsetY')
    )
  }, [refListMonuments])

  const { t } = useTranslation()

  const { data: comuni } = useComuni()

  const comuniFiltered = useMemo(() => {
    return comuni?.filter((comune) =>
      comune.label.toLowerCase().includes(searchComune.toLowerCase())
    )
  }, [comuni, searchComune])

  return (
    <Layout>
      <div className={styles.ContainerList}>
        <div className={styles.InputContainer}>
          <input
            className={styles.InputSearch}
            onChange={(e) => {
              setFilters({ search: e.target.value })
            }}
          />
          <div className={styles.SearchIcon}>
            <Search />
          </div>
          <div
            className={styles.ButtonFilters}
            onClick={() => {
              setFiltersOpen(!filtersOpen)
            }}
          >
            <FiltersIcon />
          </div>
        </div>
        <div className={styles.ListMonuments} ref={refListMonuments}>
          {infiniteMonuments!.pages.map((list, i) => (
            <Fragment key={i}>
              {list.results.map((monument) => {
                return (
                  <LangLink
                    key={monument.id}
                    to={`/lista/${smartSlug(monument.id, monument.label)}`}
                    className="no-link"
                  >
                    <div className={styles.MonumentCard}>
                      <div className="d-flex">
                        <div>
                          <IconMonument monument={monument} />
                        </div>
                        <div className="ms-2">
                          <div className={styles.MonumentTitle}>
                            {monument.label}
                          </div>
                          <div className={styles.City}>
                            {monument.municipality_label}
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className={styles.NumberPhoto}>
                          <div>{monument.pictures_count}</div>
                          <Camera className="ms-2" />
                        </div>
                      </div>
                    </div>
                  </LangLink>
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
      <div
        className={styles.OverlayFilters}
        style={{
          opacity: filtersOpen ? 1 : 0,
          pointerEvents: filtersOpen ? 'all' : 'none',
          transition: 'all 0.3s ease-in-out',
        }}
        onClick={() => {
          setFiltersOpen(false)
        }}
      ></div>
      <div
        style={{
          transform: filtersOpen ? 'translateY(0)' : 'translateY(100%)',
          transition: 'all 0.3s ease-in-out',
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
          <div className={styles.Filter}>
            <div className={styles.FilterTitle}>{t('comune')}</div>
            <div className="d-flex align-items-center">
              <div
                className={styles.FilterItem}
                onClick={() => {
                  setFilterComuneOpen(!filterComuneOpen)
                }}
              >
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
          transition: 'all 0.3s ease-in-out',
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
    </Layout>
  )
}

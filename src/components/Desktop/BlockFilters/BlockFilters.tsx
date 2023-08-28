import styles from './BlockFilters.module.css'
import { ReactComponent as FiltersIcon } from '../../../assets/filter-primary.svg'
import { ReactComponent as CheckOrderingIcon } from '../../../assets/ordering-checked.svg'
import { ReactComponent as UncheckOrderingIcon } from '../../../assets/ordering-unchecked.svg'
import { ReactComponent as CloseSecondary } from '../../../assets/close-secondary.svg'
import { ReactComponent as MyLocation } from '../../../assets/my-location.svg'
import { ReactComponent as Flag } from '../../../assets/flag.svg'
import { useTranslation } from 'react-i18next'
import { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import ReactSwitch from 'react-switch'
import { useComuni } from '../../../hooks/comuni'
import CastelloIcon from '../../Icons/CastelloIcon'
import EdificioReligiosoIcon from '../../Icons/EdificioReligiosoIcon'
import AltroMonumentoIcon from '../../Icons/AltroMonumentoIcon'
import MuseoIcon from '../../Icons/MuseoIcon'
import AlberoMonumentaleIcon from '../../Icons/AlberoMonumentaleIcon'
import { useTopContextState } from '../../../context/TopContext'

interface Props {
  setFilters: (filters: any) => void
  filters: Record<string, any>
  setDetail: (detail: any) => void
  setComuneFilterCoords?: (coords: number[]) => void
}

export default function BlockFilters({
  setFilters,
  filters,
  setDetail,
  setComuneFilterCoords,
}: Props) {
  const { t } = useTranslation()
  const [searchComune, setSearchComune] = useState<string>('')
  const [openOptions, setOpenOptions] = useState<boolean>(false)
  const { activeContests } = useTopContextState()

  const { data: comuni } = useComuni()

  const comuniFiltered = useMemo(() => {
    const searchTrimmed = searchComune.trimStart().trimEnd()
    if (searchTrimmed === '') {
      return []
    }
    const comuniFiltered = comuni?.filter((comune) =>
      comune.label.toLowerCase().includes(searchTrimmed.toLowerCase())
    )
    const comuniOrdered = comuniFiltered?.sort((a, b) => {
      const aStartWith = a.label.toLowerCase().startsWith(searchTrimmed)
      const bStartWith = b.label.toLowerCase().startsWith(searchTrimmed)
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
          <div className={styles.FilterLabelFiltri}>{t('filtri')}</div>
        </div>
        <div
          className={classNames({
            [styles.ResetButton]:
              filters.category !== '' ||
              filters.municipality !== '' ||
              filters.in_contest !== 'true' ||
              filters.only_without_pictures !== '',
            [styles.ResetButtonDisabled]:
              filters.category === '' &&
              filters.municipality === '' &&
              (filters.in_contest === 'true' ||
                (filters.in_contest === '' && activeContests.length === 0)) &&
              filters.only_without_pictures === '',
          })}
          onClick={() => {
            if (
              filters.category !== '' ||
              filters.municipality !== '' ||
              filters.only_without_pictures !== '' ||
              filters.in_contest !== 'true' ||
              (filters.in_contest === '' && activeContests.length === 0)
            ) {
              setFilters({
                category: '',
                municipality: '',
                in_contest: activeContests.length === 0 ? '' : 'true',
                only_without_pictures: '',
              })
              setSearchComune('')
            }
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
          {filters.municipality !== '' && (
            <div
              title={t('centra_comune')}
              className={styles.PointComune}
              onClick={() => {
                const comune = comuni?.find(
                  (comune) =>
                    comune.label.toLowerCase() === searchComune.toLowerCase()
                )
                if (comune && setComuneFilterCoords) {
                  setComuneFilterCoords(comune.centroid.coordinates)
                }
                setOpenOptions(false)
              }}
            >
              <MyLocation />
            </div>
          )}
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
                      monument_id: '',
                      monument_lat: '',
                      monument_lon: '',
                    })
                    if (setComuneFilterCoords) {
                      const coords = comune.centroid.coordinates
                      setComuneFilterCoords(coords)
                    }
                    // sessionStorage.removeItem('monument_id')
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
              <EdificioReligiosoIcon
                fill={
                  filters.category === 'Edifici religiosi'
                    ? '#fff'
                    : 'var(--primary)'
                }
              />
              <span className="ms-2">{t('edifici_religiosi')}</span>
            </div>
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
            <div className={styles.FilterItemTitle}>
              <CastelloIcon
                fill={
                  filters.category === 'Castelli' ? '#fff' : 'var(--primary)'
                }
              />
              <span className="ms-2">{t('castelli')}</span>
            </div>
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
            <div className={styles.FilterItemTitle}>
              <MuseoIcon
                fill={filters.category === 'Musei' ? '#fff' : 'var(--primary)'}
              />
              <span className="ms-2">{t('musei')}</span>
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
            <div className={styles.FilterItemTitle}>
              <AltroMonumentoIcon
                fill={
                  filters.category === 'Altri monumenti'
                    ? '#fff'
                    : 'var(--primary)'
                }
              />
              <span className="ms-2">{t('altri_monumenti')}</span>
            </div>
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
              <AlberoMonumentaleIcon
                fill={
                  filters.category === 'Alberi monumentali'
                    ? '#fff'
                    : 'var(--primary)'
                }
              />
              <span className="ms-2">{t('alberi_monumentali')}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.Filter}>
        <div className={styles.FilterTitle}>
          {t('anche_monumenti_fuori_concorso')}
        </div>
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center">
            <ReactSwitch
              offColor="#D0DFE4"
              size={15}
              checkedIcon={false}
              uncheckedIcon={false}
              onColor="#40BAEC"
              disabled={activeContests.length === 0}
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
      <div className={styles.Filter}>
        <div className={styles.FilterTitle}>
          {t('solo_monumenti_senza_foto')}
        </div>
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center">
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
        </div>
      </div>
    </div>
  )
}

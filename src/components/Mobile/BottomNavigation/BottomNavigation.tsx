import styles from './BottomNavigation.module.css'
import { ReactComponent as Map } from '../../../assets/map.svg'
import { ReactComponent as List } from '../../../assets/list.svg'
import { ReactComponent as Profile } from '../../../assets/profile.svg'
import { ReactComponent as MapActive } from '../../../assets/map-active.svg'
import { ReactComponent as ListActive } from '../../../assets/list-active.svg'
import { ReactComponent as ProfileActive } from '../../../assets/profile-active.svg'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LangLink from '../../LangLink'
import { useQsFilters } from '../../../hooks/filters'

const getFilters = (params: URLSearchParams) => ({
  search: params.get('search') ?? '',
  municipality: params.get('municipality') ?? '',
  app_category: params.get('app_category') ?? '',
})

export default function BottomNavigation() {
  const location = useLocation()
  const { i18n, t } = useTranslation()
  const { filters } = useQsFilters(getFilters)
  const currentPath = location.pathname
  return (
    <div className={styles.BottomNavigation}>
      <LangLink
        to={`/?${new URLSearchParams({
          search: filters.search,
          municipality: filters.municipality,
          app_category: filters.app_category,
          in_contest: 'true',
          only_without_pictures: '',
        })}`}
        className="no-link"
      >
        <div className={styles.Map}>
          {currentPath === '/' + i18n.language + '/' ||
          currentPath === '/' ||
          currentPath.indexOf('mappa') !== -1 ? (
            <MapActive />
          ) : (
            <Map />
          )}
          {(currentPath === '/' + i18n.language + '/' ||
            currentPath === '/' ||
            currentPath.indexOf('mappa') !== -1) && (
            <div className={styles.LabelActive}>{t('mappa')}</div>
          )}
        </div>
      </LangLink>
      <LangLink
        to={`/lista?${new URLSearchParams({
          search: filters.search,
          municipality: filters.municipality,
          app_category: filters.app_category,
          in_contest: 'true',
          only_without_pictures: '',
        })}`}
        className="no-link"
      >
        <div className={styles.List}>
          {currentPath.indexOf('lista') !== -1 ? <ListActive /> : <List />}
          {currentPath.indexOf('lista') !== -1 && (
            <div className={styles.LabelActive}>{t('lista')}</div>
          )}
        </div>
      </LangLink>
      <LangLink to="/profilo" className="no-link">
        <div className={styles.Profile}>
          {currentPath.indexOf('profilo') !== -1 ? (
            <ProfileActive />
          ) : (
            <Profile />
          )}
          {currentPath.indexOf('profilo') !== -1 && (
            <div className={styles.LabelActive}>{t('profilo')}</div>
          )}
        </div>
      </LangLink>
    </div>
  )
}

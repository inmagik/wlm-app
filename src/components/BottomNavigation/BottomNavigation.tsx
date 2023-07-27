import styles from './BottomNavigation.module.css'
import { ReactComponent as Map } from '../../assets/map.svg'
import { ReactComponent as List } from '../../assets/list.svg'
import { ReactComponent as Profile } from '../../assets/profile.svg'
import { ReactComponent as ProfileLogged } from '../../assets/profile-logged.svg'
import { ReactComponent as MapActive } from '../../assets/map-active.svg'
import { ReactComponent as ListActive } from '../../assets/list-active.svg'
import { ReactComponent as ProfileActive } from '../../assets/profile-active.svg'
import { ReactComponent as ProfileLoggedActive } from '../../assets/profile-active-logged.svg'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LangLink from '../LangLink'
import { useQsFilters } from '../../hooks/filters'
import { useAuthUser } from 'use-eazy-auth'

const getFilters = (params: URLSearchParams) => ({
  search: params.get('search') ?? '',
  municipality: params.get('municipality') ?? '',
  category: params.get('category') ?? '',
  in_contest: params.get('in_contest') ?? 'true',
  only_without_pictures: params.get('only_without_pictures') ?? '',
  user_lat: Number(params.get('user_lat')) ?? '',
  user_lon: Number(params.get('user_lon')) ?? '',
})

export default function BottomNavigation() {
  const location = useLocation()
  const { i18n, t } = useTranslation()
  const { filters } = useQsFilters(getFilters)
  const currentPath = location.pathname
  const { user } = useAuthUser()
  return (
    <div className={styles.BottomNavigation}>
      <LangLink
        to={`/?${new URLSearchParams({
          search: filters.search,
          municipality: filters.municipality,
          category: filters.category,
          in_contest: filters.in_contest,
          only_without_pictures: filters.only_without_pictures,
          user_lat: String(filters.user_lat),
          user_lon: String(filters.user_lon),
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
          category: filters.category,
          in_contest: filters.in_contest,
          only_without_pictures: filters.only_without_pictures,
          user_lat: String(filters.user_lat),
          user_lon: String(filters.user_lon),
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
            user ? (
              <ProfileLoggedActive />
            ) : (
              <ProfileActive />
            )
          ) : (
            user ? (
              <ProfileLogged />
            ) : (
              <Profile />
            )
          )}
          {currentPath.indexOf('profilo') !== -1 && (
            <div className={styles.LabelActive}>{t('profilo')}</div>
          )}
        </div>
      </LangLink>
    </div>
  )
}

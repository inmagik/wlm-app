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

export default function BottomNavigation() {
  const location = useLocation()
  const { i18n, t } = useTranslation()
  const currentPath = location.pathname
  return (
    <div className={styles.BottomNavigation}>
      <LangLink to="/" className="no-link">
        <div className={styles.Map}>
          {currentPath === '/' + i18n.language + '/' || currentPath === '/' ? (
            <MapActive />
          ) : (
            <Map />
          )}
          {(currentPath === '/' + i18n.language + '/' ||
            currentPath === '/') && (
            <div className={styles.LabelActive}>{t('mappa')}</div>
          )}
        </div>
      </LangLink>
      <LangLink to="/lista" className="no-link">
        <div className={styles.List}>
          {currentPath === '/' + i18n.language + '/lista' ? (
            <ListActive />
          ) : (
            <List />
          )}
          {currentPath === '/' + i18n.language + '/lista' && (
            <div className={styles.LabelActive}>{t('lista')}</div>
          )}
        </div>
      </LangLink>
      <LangLink to="/profilo" className="no-link">
        <div className={styles.Profile}>
          {currentPath === '/' + i18n.language + '/profilo' ? (
            <ProfileActive />
          ) : (
            <Profile />
          )}
          {currentPath === '/' + i18n.language + '/profilo' && (
            <div className={styles.LabelActive}>{t('profilo')}</div>
          )}
        </div>
      </LangLink>
    </div>
  )
}

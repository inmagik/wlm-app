import styles from './BottomNavigation.module.css'
import { ReactComponent as Map } from '../../../assets/map.svg'
import { ReactComponent as List } from '../../../assets/list.svg'
import { ReactComponent as Profile } from '../../../assets/profile.svg'
import { ReactComponent as MapActive } from '../../../assets/map-active.svg'
import { ReactComponent as ListActive } from '../../../assets/list-active.svg'
import { ReactComponent as ProfileActive } from '../../../assets/profile-active.svg'
import { Link, useLocation } from 'react-router-dom'

export default function BottomNavigation() {
  const location = useLocation()
  const currentPath = location.pathname
  console.log(currentPath)
  return (
    <div className={styles.BottomNavigation}>
      <Link to="/" className="no-link">
        <div className={styles.Map}>
          {currentPath === '/' ? <MapActive /> : <Map />}
          {currentPath === '/' && (
            <div className={styles.LabelActive}>Mappa</div>
          )}
        </div>
      </Link>
      <Link to="/lista" className="no-link">
        <div className={styles.List}>
          {currentPath === '/lista' ? <ListActive /> : <List />}
          {currentPath === '/lista' && (
            <div className={styles.LabelActive}>Lista</div>
          )}
        </div>
      </Link>
      <Link to="/profilo" className="no-link">
        <div className={styles.Profile}>
          {currentPath === '/profilo' ? <ProfileActive /> : <Profile />}
          {currentPath === '/profilo' && (
            <div className={styles.LabelActive}>Profilo</div>
          )}
        </div>
      </Link>
    </div>
  )
}

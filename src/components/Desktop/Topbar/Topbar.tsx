import styles from './Topbar.module.css'
import { ReactComponent as Logo } from '../../../assets/wiki-logo-mobile.svg'
import { ReactComponent as Bell } from '../../../assets/bell-primary.svg'
import { useTranslation } from 'react-i18next'

export default function Topbar() {
  const { t } = useTranslation()
  return (
    <div className={styles.Topbar}>
      <div className={styles.WikiLoveMonuments}>
        <Logo /> {t('wiki_loves_monuments')}
      </div>
      <div>
        <div className={styles.ButtonConcorso}>
            <Bell /> {t('concorso_wiki_loves_monuments_1_30_settembre')}
        </div>
      </div>
      <div />
    </div>
  )
}

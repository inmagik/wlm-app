import { useTranslation } from 'react-i18next'
import Layout from '../../../components/Mobile/Layout'
import styles from './Profile.module.css'
import { ReactComponent as World } from '../../../assets/world.svg'
import { ReactComponent as LoginIcon } from '../../../assets/login.svg'
import { ReactComponent as LoginWhite } from '../../../assets/login-white.svg'

export default function Profile() {
  const { t } = useTranslation()
  return (
    <Layout>
      <div className={styles.ProfileContainer}>
        <div className={styles.BlockChangeLanguage}>
          <div className={styles.BlockChangeLanguage}>{t('cambia_lingua')}</div>
          <button className={styles.ButtonChangeLanguage}>
            <World />
          </button>
        </div>
        <div className='mt-5 d-flex flex-column align-items-center justify-content-center'>
          <LoginIcon />
          <div className={styles.TextLogin}>
            {t('testo_login')}
          </div>
        </div>
        <div className='mt-2 w-100'>
          <button className={styles.LoginButton}>
            <LoginWhite className='me-1' /> {t('login')}
          </button>
        </div>
      </div>
    </Layout>
  )
}

import { useTranslation } from 'react-i18next'
import Layout from '../../../components/Desktop/Layout'
import styles from './Profile.module.css'
import { ReactComponent as World } from '../../../assets/world.svg'
import { ReactComponent as LoginIcon } from '../../../assets/login.svg'
import { ReactComponent as LoginWhite } from '../../../assets/login-white.svg'
import { useState } from 'react'
import BlockCambiaLingua from '../../../components/Mobile/BlockCambiaLingua'

export default function Profile() {
  const { t } = useTranslation()
  const [isOpenCambiaLingua, setIsOpenCambiaLingua] = useState<boolean>(false)
  return (
    <Layout>
      <div className={styles.ProfileContent}>
        <div className={styles.ProfileContainer}>
          <div className={styles.BlockChangeLanguage}>
            <div className={styles.BlockChangeLanguage}>
              {t('cambia_lingua')}
            </div>
            <button
              className={styles.ButtonChangeLanguage}
              onClick={() => {
                setIsOpenCambiaLingua(true)
              }}
            >
              <World />
            </button>
          </div>
          <div className="mt-5 d-flex flex-column align-items-center justify-content-center">
            <LoginIcon />
            <div className={styles.TextLogin}>{t('testo_login')}</div>
          </div>
          <div className="mt-2 w-100">
            <button className={styles.LoginButton}>
              <LoginWhite className="me-1" /> {t('login')}
            </button>
          </div>
        </div>
      </div>
      <BlockCambiaLingua
        isOpenCambiaLingua={isOpenCambiaLingua}
        setIsOpenCambiaLingua={setIsOpenCambiaLingua}
      />
    </Layout>
  )
}

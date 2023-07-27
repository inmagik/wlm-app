import { useTranslation } from 'react-i18next'
import Layout from '../../../components/Desktop/Layout'
import styles from './Profile.module.css'
import { ReactComponent as World } from '../../../assets/world.svg'
import { ReactComponent as LoginIcon } from '../../../assets/login.svg'
import { ReactComponent as LoginWhite } from '../../../assets/login-white.svg'
import { ReactComponent as ProfileUser } from '../../../assets/profile-user.svg'
import { ReactComponent as Logout } from '../../../assets/logout.svg'
import { useState } from 'react'
import BlockCambiaLingua from '../../../components/Mobile/BlockCambiaLingua'
import { API_URL } from '../../../const'
import { useAuthActions, useAuthUser } from 'use-eazy-auth'

export default function Profile() {
  const { t } = useTranslation()
  const [isOpenCambiaLingua, setIsOpenCambiaLingua] = useState<boolean>(false)
  const { user } = useAuthUser()
  const { logout } = useAuthActions()
  return (
    <Layout>
      <div className="w-100 h-100 d-flex justify-content-center position-relative">
        <div className={styles.ProfileContent}>
          <div
            className={
              user ? styles.ProfileContainerUser : styles.ProfileContainer
            }
          >
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
            {user ? (
              <div>
                <div className={styles.LoginEffettuato}>
                  {t('login_effettuato')}
                </div>
                <div className="mt-3 d-flex align-items-center">
                  <div>
                    <ProfileUser />
                  </div>
                  <div className="ms-2">
                    <div className={styles.UserLabel}>Username:</div>
                    <div className={styles.NomeUtente}>
                      {user.username.replace('mw--', ' ')}
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <button
                    className={styles.LogoutButton}
                    onClick={() => {
                      logout()
                    }}
                  >
                    <Logout /> {t('logout')}
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="mt-5 d-flex flex-column align-items-center justify-content-center">
                  <LoginIcon />
                  <div className={styles.TextLogin}>{t('testo_login')}</div>
                </div>
                <div className="mt-2">
                  <button
                    className={styles.LoginButton}
                    onClick={() => {
                      window.location.href = `${API_URL}/oauth/oauth-login?redirect_uri=${window.location.href}`
                    }}
                  >
                    <LoginWhite className="me-1" /> {t('login')}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        <BlockCambiaLingua
          isOpenCambiaLingua={isOpenCambiaLingua}
          setIsOpenCambiaLingua={setIsOpenCambiaLingua}
        />
      </div>
    </Layout>
  )
}

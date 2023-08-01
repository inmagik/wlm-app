import { useTranslation } from 'react-i18next'
import Layout from '../../../components/Mobile/Layout'
import styles from './Profile.module.css'
import { ReactComponent as World } from '../../../assets/world.svg'
import { ReactComponent as LoginIcon } from '../../../assets/login.svg'
import { ReactComponent as LoginWhite } from '../../../assets/login-white.svg'
import { ReactComponent as ProfileUser } from '../../../assets/profile-user.svg'
import { ReactComponent as Logout } from '../../../assets/logout.svg'
import { ReactComponent as WikiLogoMobile } from '../../../assets/wiki-logo-mobile.svg'
import { useState } from 'react'
import BlockCambiaLingua from '../../../components/Mobile/BlockCambiaLingua'
import { API_URL, URL_WIKI } from '../../../const'
import { useAuthActions, useAuthUser } from 'use-eazy-auth'

export default function Profile() {
  const { t, i18n } = useTranslation()
  const [isOpenCambiaLingua, setIsOpenCambiaLingua] = useState<boolean>(false)
  const { user } = useAuthUser()
  const username = user ? user.username.replace('mw--', ' ') : ''
  const { logout } = useAuthActions()
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
          {user ? (
            <div>
              <div className="text-center mb-4">
                <ProfileUser />
              </div>
              <div className={styles.LoginEffettuato}>
                {t('login_effettuato')}
              </div>
              <div className="mt-4 d-flex flex-column align-items-center">
                <div className="ms-2">
                  <div className={styles.UserLabel}>Username:</div>
                  <div className={styles.NomeUtente}>
                    {user.username.replace('mw--', ' ')}
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <button
                  className={styles.LogoutButton}
                  onClick={() => {
                    logout()
                  }}
                >
                  <Logout /> {t('logout')}
                </button>
              </div>
              {username && (
                <div className="mt-3">
                  <a
                    href={`${URL_WIKI}/Special:ListFiles/${username.replace(
                      ' ',
                      '_'
                    )}`}
                    className={styles.ButtonImagesProfile}
                  >
                    <WikiLogoMobile /> {t('vedi_immagini_caricate')}
                  </a>
                </div>
              )}
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
                    localStorage.setItem(
                      'redirectUrl',
                      `${i18n.language}/profilo`
                    )
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
    </Layout>
  )
}

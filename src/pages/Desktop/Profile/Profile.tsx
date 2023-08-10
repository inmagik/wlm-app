import { useTranslation } from 'react-i18next'
import Layout from '../../../components/Desktop/Layout'
import styles from './Profile.module.css'
import { ReactComponent as World } from '../../../assets/world.svg'
import { ReactComponent as Worldprimary } from '../../../assets/world-primary.svg'
import { ReactComponent as LoginIcon } from '../../../assets/login.svg'
import { ReactComponent as LoginWhite } from '../../../assets/login-white.svg'
import { ReactComponent as ProfileUser } from '../../../assets/profile-user.svg'
import { ReactComponent as Logout } from '../../../assets/logout.svg'
import { ReactComponent as WikiLogoMobile } from '../../../assets/wiki-logo-mobile.svg'
import { ReactComponent as CheckOrderingIcon } from '../../../assets/ordering-checked.svg'
import { ReactComponent as UncheckOrderingIcon } from '../../../assets/ordering-unchecked.svg'
import { useState } from 'react'
import { API_URL, URL_WIKI } from '../../../const'
import { useAuthActions, useAuthUser } from 'use-eazy-auth'
import classNames from 'classnames'
import { PersonalImages } from '../../../components/PersonalImages'
import { useLocation } from 'react-router-dom'

export default function Profile() {
  const { t, i18n } = useTranslation()
  const [isOpenCambiaLingua, setIsOpenCambiaLingua] = useState<boolean>(false)
  const { user } = useAuthUser()
  const username = user ? user.username.replace('mw--', ' ') : ''
  const { logout } = useAuthActions()
  const { pathname, search } = useLocation()
  return (
    <Layout>
      <div className="w-100 h-100 d-flex justify-content-center position-relative">
        <div
          className={styles.ProfileContent}
          style={{
            width: isOpenCambiaLingua ? 'max-content' : 532,
            transition: 'width 0.3s ease-in-out',
          }}
        >
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
                  setIsOpenCambiaLingua(!isOpenCambiaLingua)
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

                {username && (
                  <div className="mt-3">
                    <PersonalImages rows={3} cols={5} />
                    <a
                      href={`${URL_WIKI}/Special:ListFiles/${username.replace(
                        ' ',
                        '_'
                      )}`}
                      className={styles.ButtonImagesProfile}
                    >
                      <img width={16} src="/commons.png" alt="Commons" />{' '}
                      {t('vedi_immagini_caricate')}
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
                      localStorage.setItem('redirectUrl', pathname + search)
                      window.location.href = `${API_URL}/oauth/oauth-login?redirect_uri=${window.location.href}`
                    }}
                  >
                    <LoginWhite className="me-1" /> {t('login')}
                  </button>
                </div>
              </>
            )}
          </div>
          {isOpenCambiaLingua && (
            <div className={styles.BlockCambioLingua}>
              <div className={styles.TitoloCambiaLingua}>
                <Worldprimary className="me-3" /> {t('cambio_lingua')}
              </div>
              <div className={styles.ListOrderingItems}>
                <div
                  className={classNames(styles.OrderingItem, {
                    [styles.OrderingItemActive]: i18n.language === 'it',
                  })}
                  onClick={() => {
                    i18n.changeLanguage('it')
                  }}
                >
                  <div>
                    {i18n.language === 'it' ? (
                      <CheckOrderingIcon />
                    ) : (
                      <UncheckOrderingIcon />
                    )}
                  </div>
                  <div className={styles.OrderingItemTitle}>
                    {t('italiano')}
                  </div>
                </div>
                <div
                  className={classNames(styles.OrderingItem, {
                    [styles.OrderingItemActive]: i18n.language === 'en',
                  })}
                  onClick={() => {
                    i18n.changeLanguage('en')
                  }}
                >
                  <div>
                    {i18n.language === 'en' ? (
                      <CheckOrderingIcon />
                    ) : (
                      <UncheckOrderingIcon />
                    )}
                  </div>
                  <div className={styles.OrderingItemTitle}>{t('inglese')}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

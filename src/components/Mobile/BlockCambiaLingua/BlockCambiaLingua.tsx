import styles from './BlockCambiaLingua.module.css'
import { useTranslation } from 'react-i18next'
import { ReactComponent as WorldPrimary } from '../../../assets/world-primary.svg'
import { ReactComponent as Close } from '../../../assets/close.svg'
import { ReactComponent as ArrowRight } from '../../../assets/arrow-right.svg'
import { ReactComponent as CheckOrderingIcon } from '../../../assets/ordering-checked.svg'
import { ReactComponent as UncheckOrderingIcon } from '../../../assets/ordering-unchecked.svg'

import { useState } from 'react'
import classNames from 'classnames'

interface BlockCambiaLinguaProps {
  isOpenCambiaLingua: boolean
  setIsOpenCambiaLingua: (isOpenCambiaLingua: boolean) => void
}

export default function BlockCambiaLingua({
  isOpenCambiaLingua,
  setIsOpenCambiaLingua,
}: BlockCambiaLinguaProps) {
  const { t, i18n } = useTranslation()
  const [cambioLinguaModal, setCambioLinguaModal] = useState<boolean>(false)
  return (
    <>
      <div
        className={styles.OverlayFilters}
        style={{
          opacity: isOpenCambiaLingua ? 1 : 0,
          pointerEvents: isOpenCambiaLingua ? 'all' : 'none',
          transition: 'all 0.5s ease-in-out',
        }}
        onClick={() => {
          setIsOpenCambiaLingua(false)
        }}
      ></div>
      <div
        style={{
          transform: isOpenCambiaLingua ? 'translateY(0)' : 'translateY(100%)',
          transition: 'all 0.5s ease-in-out',
        }}
        className={styles.ContainerFilters}
      >
        <div className={styles.TitleBlockFilters}>
          <div className="d-flex align-items-center">
            <WorldPrimary fill="var(--primary)" />
            <div className="ms-2">{t('cambia_lingua')}</div>
          </div>
          <div>
            <Close onClick={() => setIsOpenCambiaLingua(false)} />
          </div>
        </div>
        <div className={styles.ListFilters}>
          <div
            className={styles.Filter}
            onClick={() => {
              setCambioLinguaModal(true)
            }}
          >
            <div className={styles.FilterTitle}>{t('lingua_selezionata')}</div>
            <div className="d-flex align-items-center">
              <div className={styles.FilterItem}>
                {i18n.language === 'it' ? t('italiano') : t('inglese')}
              </div>
              <div className="ms-2">
                <ArrowRight />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={styles.BlockChooseLanguage}
        style={{
          transform: cambioLinguaModal ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'all 0.5s ease-in-out',
          pointerEvents: cambioLinguaModal ? 'all' : 'none',
        }}
      >
        <div className={styles.TitleBlockFilters}>
          <div className="d-flex align-items-center">
            <WorldPrimary />
            <div className="ms-2">{t('cambia_lingua')}</div>
          </div>
          <div>
            <Close onClick={() => setCambioLinguaModal(false)} />
          </div>
        </div>
        <div className={styles.ListOrderingItems}>
          <div
            className={classNames(styles.OrderingItem, {
              [styles.OrderingItemActive]: i18n.language === 'it',
            })}
            onClick={() => {
              i18n.changeLanguage('it')
              setCambioLinguaModal(false)
            }}
          >
            <div>
              {i18n.language === 'it' ? (
                <CheckOrderingIcon />
              ) : (
                <UncheckOrderingIcon />
              )}
            </div>
            <div className={styles.OrderingItemTitle}>{t('italiano')}</div>
          </div>
          <div
            className={classNames(styles.OrderingItem, {
              [styles.OrderingItemActive]: i18n.language === 'en',
            })}
            onClick={() => {
              i18n.changeLanguage('en')
              setCambioLinguaModal(false)
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
    </>
  )
}

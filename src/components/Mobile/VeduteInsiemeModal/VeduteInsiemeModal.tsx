import styles from './VeduteInsiemeModal.module.css'
import { ReactComponent as InfoIcon } from '../../../assets/info.svg'
import { ReactComponent as CloseIcon } from '../../../assets/close.svg'
import { useTranslation } from 'react-i18next'

interface Props {
  setVeduteInsiemeOpen: (value: boolean) => void
  veduteInsiemeOpen: boolean
}

export default function VeduteInsiemeModal({
  setVeduteInsiemeOpen,
  veduteInsiemeOpen,
}: Props) {
  const { t } = useTranslation()
  return (
    <>
      <div
        className={styles.OverlayFilters}
        style={{
          opacity: veduteInsiemeOpen ? 1 : 0,
          pointerEvents: veduteInsiemeOpen ? 'all' : 'none',
          transition: 'all 0.5s ease-in-out',
        }}
        onClick={() => {
          setVeduteInsiemeOpen(false)
        }}
      ></div>
      <div
        style={{
          transform: veduteInsiemeOpen ? 'translateY(0)' : 'translateY(100%)',
          transition: 'all 0.5s ease-in-out',
        }}
        className={styles.VeduteInsiemeContainer}
      >
        <InfoIcon />
        <div className={styles.Title}>{t('vedute_insieme')}</div>
        <div className={styles.Description}>
          {t('vedute_d_insieme_text')}
        </div>
        <div className="pointer">
          <CloseIcon onClick={() => setVeduteInsiemeOpen(false)} />
        </div>
      </div>
    </>
  )
}

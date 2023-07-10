import { ReactComponent as Legenda } from '../../../assets/legend-primary.svg'
import { ReactComponent as Close } from '../../../assets/close.svg'
import { ReactComponent as MonumentoNoFoto } from '../../../assets/monumento-no-foto.svg'
import { ReactComponent as Monumento1a10 } from '../../../assets/monumento-1a10.svg'
import { ReactComponent as MonumentoMaggiore10 } from '../../../assets/monumento-maggiore-10.svg'
import { ReactComponent as MonumentoConcorso } from '../../../assets/monumento-concorso.svg'
import { ReactComponent as MonumentoNoConcorso } from '../../../assets/monumento-no-concorso.svg'
import styles from './Legend.module.css'
import { useTranslation } from 'react-i18next'
import CastelloIcon from '../../Icons/CastelloIcon'
import EdificioReligiosoIcon from '../../Icons/EdificioReligiosoIcon'
import ComuneIcon from '../../Icons/ComuneIcon'
import AlberoMonumentaleIcon from '../../Icons/AlberoMonumentaleIcon'
import MuseoIcon from '../../Icons/MuseoIcon'
import AltroMonumentoIcon from '../../Icons/AltroMonumentoIcon'

interface Props {
  legend: boolean
  setLegend: (legend: boolean) => void
}

export default function Legend({ legend, setLegend }: Props) {
  const { t } = useTranslation()
  return (
    <div
      className={styles.Legend}
      style={{
        height: legend ? '100%' : '0px',
        opacity: legend ? '1' : '0',
        top: legend ? '0px' : '-100%',
        pointerEvents: legend ? 'all' : 'none',
        transition: 'all 0.3s ease-in-out',
      }}
    >
      <div className={styles.TopLegend}>
        <div className={styles.LegendaLabel}>
          <Legenda fill="var(--primary)" />
          <span className="ms-2">{t('legenda')}</span>
        </div>
        <div className="pointer">
          <Close onClick={() => setLegend(false)} />
        </div>
      </div>
      <div className={styles.Card}>
        <div className={styles.ItemCard}>
          <ComuneIcon fill="var(--primary)" />
          <span className={styles.NameItem}>
            {t('comuni_vedute_d_insieme')}
          </span>
        </div>
        <div className={styles.ItemCard}>
          <EdificioReligiosoIcon fill="var(--primary)" />
          <span className={styles.NameItem}>{t('edifici_religiosi')}</span>
        </div>
        <div className={styles.ItemCard}>
          <CastelloIcon fill="var(--primary)" />
          <span className={styles.NameItem}>{t('castelli')}</span>
        </div>
        <div className={styles.ItemCard}>
          <AlberoMonumentaleIcon fill="var(--primary)" />
          <span className={styles.NameItem}>{t('alberi_monumentali')}</span>
        </div>
        <div className={styles.ItemCard}>
          <MuseoIcon fill="var(--primary)" />
          <span className={styles.NameItem}>{t('musei')}</span>
        </div>
        <div className={styles.ItemCardLast}>
          <AltroMonumentoIcon fill="var(--primary)" />
          <span className={styles.NameItem}>{t('altro_monumento')}</span>
        </div>
      </div>
      <div className={`${styles.CardMinorPadding} mt-2`}>
        <div className={styles.ItemCard}>
          <MonumentoNoFoto />
          <span className={styles.NameItem}>
            {t('il_monumento_non_ha_foto')}
          </span>
        </div>
        <div className={styles.ItemCard}>
          <Monumento1a10 />
          <span className={styles.NameItem}>
            {t('il_monumento_possiede_da_1_a_10_foto')}
          </span>
        </div>
        <div className={styles.ItemCardLast}>
          <MonumentoMaggiore10 />
          <span className={styles.NameItem}>
            {t('il_monumento_possiede_piu_di_10_foto')}
          </span>
        </div>
      </div>
      <div className={`${styles.CardMinorPadding} mt-2`}>
        <div className={styles.ItemCard}>
          <MonumentoConcorso />
          <span className={styles.NameItem}>
            {t('il_monumento_e_in_concorso')}
          </span>
        </div>
        <div className={styles.ItemCardLast}>
          <MonumentoNoConcorso />
          <span className={styles.NameItem}>
            {t('il_monumento_non_e_in_concorso')}
          </span>
        </div>
      </div>
    </div>
  )
}

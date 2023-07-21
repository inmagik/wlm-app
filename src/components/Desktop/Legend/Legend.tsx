import { useTranslation } from 'react-i18next'
import AlberoMonumentaleIcon from '../../Icons/AlberoMonumentaleIcon'
import AltroMonumentoIcon from '../../Icons/AltroMonumentoIcon'
import CastelloIcon from '../../Icons/CastelloIcon'
import ComuneIcon from '../../Icons/ComuneIcon'
import EdificioReligiosoIcon from '../../Icons/EdificioReligiosoIcon'
import MuseoIcon from '../../Icons/MuseoIcon'
import { ReactComponent as MonumentoNoFoto } from '../../../assets/monumento-no-foto.svg'
import { ReactComponent as Monumento1a10 } from '../../../assets/monumento-1a10.svg'
import { ReactComponent as MonumentoMaggiore10 } from '../../../assets/monumento-maggiore-10.svg'
import { ReactComponent as MonumentoConcorso } from '../../../assets/monumento-concorso.svg'
import { ReactComponent as MonumentoNoConcorso } from '../../../assets/monumento-no-concorso.svg'
import styles from './Legend.module.css'

interface Props {
  legend: boolean
  detail: number | null
}

export default function Legend({ legend, detail }: Props) {
  const { t } = useTranslation()
  return (
    <div
      className={styles.Legend}
      style={{
        height: legend ? '200px' : '0px',
        padding: legend ? '16px 24px' : '0px',
        zIndex: legend ? 1 : -1,
        width: legend ? '100%' : '0px',
        opacity: legend ? '1' : '0',
        // transition: 'height 0.5s ease-in-out',
      }}
    >
      <div className={styles.LegendTitle}>{t('legenda')}</div>
      <div className={styles.MonumentType}>
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
      <div
        className={
          detail ? styles.BlockLegendColors : styles.BlockLegendColorsNoDetail
        }
      >
        <div
          className={
            detail ? styles.CardMinorPaddingDetail : styles.CardMinorPadding
          }
        >
          <div
            className={
              detail ? styles.ItemCardColor : styles.ItemCardColorColumn
            }
          >
            <MonumentoNoFoto />
            <span className={styles.NameItem}>{t('non_ha_foto')}</span>
          </div>
          <div
            className={
              detail ? styles.ItemCardColor : styles.ItemCardColorColumn
            }
          >
            <Monumento1a10 />
            <span className={styles.NameItem}>{t('da_1_a_10_foto')}</span>
          </div>
          <div
            className={
              detail ? styles.ItemCardColor : styles.ItemCardColorColumn
            }
          >
            <MonumentoMaggiore10 />
            <span className={styles.NameItem}>{t('piu_di_10_foto')}</span>
          </div>
        </div>
        <div
          className={
            detail ? styles.CardMinorPaddingDetail : styles.CardMinorPadding
          }
        >
          <div
            className={
              detail ? styles.ItemCardColor : styles.ItemCardColorColumn
            }
          >
            <MonumentoConcorso />
            <span className={styles.NameItem}>{t('in_concorso')}</span>
          </div>
          <div
            className={
              detail ? styles.ItemCardColor : styles.ItemCardColorColumn
            }
          >
            <MonumentoNoConcorso />
            <span className={styles.NameItem}>{t('non_in_concorso')}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

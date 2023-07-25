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
        height:
          legend && detail ? '288px' : legend && !detail ? '200px' : '0px',
        padding: legend ? '16px 24px' : '0px',
        zIndex: legend ? 1 : -1,
        // width: legend ? '100%' : '0px',
        opacity: legend ? '1' : '0',
        flexDirection: detail ? 'column' : 'row',
        alignItems: detail ? 'flex-start' : 'center',
        // transition: 'height 0.5s ease-in-out',
      }}
    >
      <div
        className={styles.LegendTitle}
        style={{
          borderRight: detail ? 'none' : '1px solid var(--primary)',
        }}
      >
        {t('legenda')}
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: detail ? 'row' : 'row',
          alignItems: detail ? 'flex-start' : 'center',
          width: '100%',
        }}
      >
        <div
          className={styles.MonumentType}
          style={{
            paddingLeft: detail ? '0px' : '24px',
            paddingRight: detail ? '0px' : '24px',
            width: detail ? '100%' : '320px',
          }}
        >
          <div className={styles.ItemCard}>
            <EdificioReligiosoIcon fill="var(--primary)" />
            <span className={styles.NameItem}>{t('edifici_religiosi')}</span>
          </div>
          <div className={styles.ItemCard}>
            <CastelloIcon fill="var(--primary)" />
            <span className={styles.NameItem}>{t('castelli')}</span>
          </div>
          <div className={styles.ItemCard}>
            <MuseoIcon fill="var(--primary)" />
            <span className={styles.NameItem}>{t('musei')}</span>
          </div>
          <div className={styles.ItemCard}>
            <AltroMonumentoIcon fill="var(--primary)" />
            <span className={styles.NameItem}>{t('altro_monumento')}</span>
          </div>
          <div className={styles.ItemCard}>
            <AlberoMonumentaleIcon fill="var(--primary)" />
            <span className={styles.NameItem}>{t('alberi_monumentali')}</span>
          </div>
          <div className={styles.ItemCardLast}>
            <ComuneIcon fill="var(--primary)" />
            <span className={styles.NameItem}>
              {t('comuni_vedute_d_insieme')}
            </span>
          </div>
        </div>
        <div
          className={
            styles.BlockLegendColors
          }
          style={{
            // borderRight: detail ? 'none' : '1px solid var(--primary)',
          }}
        >
          <div
            style={{
              flexDirection: detail ? 'column' : 'column',
            }}
            className={
              detail ? styles.CardMinorPaddingDetail : styles.CardMinorPadding
            }
          >
            <div
              className={
                styles.ItemCardColorColumn
              }
            >
              <MonumentoNoFoto />
              <span className={styles.NameItem}>{t('non_ha_foto')}</span>
            </div>
            <div
              className={
                styles.ItemCardColorColumn
              }
            >
              <Monumento1a10 />
              <span className={styles.NameItem}>{t('da_1_a_10_foto')}</span>
            </div>
            <div
              className={
                styles.ItemCardColorColumn
              }
            >
              <MonumentoMaggiore10 />
              <span className={styles.NameItem}>{t('piu_di_10_foto')}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-100">
        <div
          className={styles.BlockInConcorsoOrNot}
          style={{
            width: detail ? '100%' : 'max-content',
          }}
        >
          <div className="d-flex align-items-center flex-column">
            <img width={22} src="/in-concorso.png" alt="monumento-concorso" />
            <span className={styles.NameItemWhite}>{t('in_concorso')}</span>
          </div>
          <div className="d-flex align-items-center flex-column ms-3">
            <img
              width={22}
              src="/non-in-concorso.png"
              alt="monumento-concorso"
            />
            <span className={styles.NameItemWhite}>{t('non_in_concorso')}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

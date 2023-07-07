import { ReactComponent as Legenda } from '../../../assets/legend-primary.svg'
import { ReactComponent as Close } from '../../../assets/close.svg'
import { ReactComponent as Comune } from '../../../assets/comune.svg'
import { ReactComponent as EdificiReligiosi } from '../../../assets/edifici-religiosi.svg'
import { ReactComponent as Castello } from '../../../assets/castello.svg'
import { ReactComponent as AlberoMonumentale } from '../../../assets/albero-monumentale.svg'
import { ReactComponent as Museo } from '../../../assets/museo.svg'
import { ReactComponent as AltroMonumento } from '../../../assets/altro-monumento.svg'
import { ReactComponent as MonumentoNoFoto } from '../../../assets/monumento-no-foto.svg'
import { ReactComponent as Monumento1a10 } from '../../../assets/monumento-1a10.svg'
import { ReactComponent as MonumentoMaggiore10 } from '../../../assets/monumento-maggiore-10.svg'
import { ReactComponent as MonumentoConcorso } from '../../../assets/monumento-concorso.svg'
import { ReactComponent as MonumentoNoConcorso } from '../../../assets/monumento-no-concorso.svg'
import styles from './Legend.module.css'

interface Props {
  legend: boolean
  setLegend: (legend: boolean) => void
}

export default function Legend({ legend, setLegend }: Props) {
  return (
    <div
      className={styles.Legend}
      style={{
        height: legend ? '100%' : '0px',
        opacity: legend ? '1' : '0',
        pointerEvents: legend ? 'all' : 'none',
        transition: 'all 0.3s ease-in-out',
      }}
    >
      <div className={styles.TopLegend}>
        <div className={styles.LegendaLabel}>
          <Legenda fill="var(--primary)" />
          <span className="ms-2">Legenda</span>
        </div>
        <div className="pointer">
          <Close onClick={() => setLegend(false)} />
        </div>
      </div>
      <div className={styles.Card}>
        <div className={styles.ItemCard}>
          <Comune />
          <span className={styles.NameItem}>Comuni (Vedute d’insieme)</span>
        </div>
        <div className={styles.ItemCard}>
          <EdificiReligiosi />
          <span className={styles.NameItem}>Edifici religiosi</span>
        </div>
        <div className={styles.ItemCard}>
          <Castello />
          <span className={styles.NameItem}>Castelli</span>
        </div>
        <div className={styles.ItemCard}>
          <AlberoMonumentale />
          <span className={styles.NameItem}>Alberi monumentali</span>
        </div>
        <div className={styles.ItemCard}>
          <Museo />
          <span className={styles.NameItem}>Musei</span>
        </div>
        <div className={styles.ItemCardLast}>
          <AltroMonumento />
          <span className={styles.NameItem}>Altro monumento</span>
        </div>
      </div>
      <div className={`${styles.CardMinorPadding} mt-2`}>
        <div className={styles.ItemCard}>
          <MonumentoNoFoto />
          <span className={styles.NameItem}>Il monumento non ha foto</span>
        </div>
        <div className={styles.ItemCard}>
          <Monumento1a10 />
          <span className={styles.NameItem}>
            Il monumento possiede da 1 a 10 foto
          </span>
        </div>
        <div className={styles.ItemCardLast}>
          <MonumentoMaggiore10 />
          <span className={styles.NameItem}>
            Il monumento possiede più di 10 foto
          </span>
        </div>
      </div>
      <div className={`${styles.CardMinorPadding} mt-2`}>
        <div className={styles.ItemCard}>
          <MonumentoConcorso />
          <span className={styles.NameItem}>Il monumento è in concorso</span>
        </div>
        <div className={styles.ItemCardLast}>
          <MonumentoNoConcorso />
          <span className={styles.NameItem}>
            Il monumento non è in concorso
          </span>
        </div>
      </div>
    </div>
  )
}

import styles from './WikiLoveMonuments.module.css'
import { ReactComponent as WikiLogo } from '../../../assets/wiki-primary.svg'
import { ReactComponent as Close } from '../../../assets/close.svg'

interface Props {
  infoWiki: boolean
  setInfoWiki: (infoWiki: boolean) => void
}

export default function WikiLoveMonuments({ infoWiki, setInfoWiki }: Props) {
  return (
    <div
      className={styles.WikiLoveMonuments}
      style={{
        opacity: infoWiki ? '1' : '0',
        pointerEvents: infoWiki ? 'all' : 'none',
        transition: 'all 0.5s ease-in-out',
      }}
    >
      <div className={styles.TopWikiLove}>
        <div className={styles.WikiLoveLabel}>
          <WikiLogo />
          <span className="ms-2">Wiki Loves Monuments</span>
        </div>
        <div className="pointer">
          <Close onClick={() => setInfoWiki(false)} />
        </div>
      </div>
    </div>
  )
}

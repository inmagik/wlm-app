import styles from './WikiLoveMonuments.module.css'

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
        transition: 'all 0.3s ease-in-out',
      }}
    ></div>
  )
}

import styles from './Topbar.module.css'
import { ReactComponent as Logo } from '../../../assets/wiki-logo-mobile.svg'
import { ReactComponent as Bell } from '../../../assets/bell.svg'
import { ReactComponent as LiveHelp } from '../../../assets/live-help.svg'
import { useState } from 'react'
import Legend from '../Legend'
import WikiLoveMonuments from '../WikiLoveMonuments'

export default function Topbar() {
  const [legend, setLegend] = useState(false)
  const [infoWiki, setInfoWiki] = useState(false)
  return (
    <>
      <div className={styles.TopBar}>
        <div
          className="pointer"
          onClick={() => {
            setInfoWiki(!infoWiki)
          }}
        >
          <Logo />
        </div>
        <div className={styles.ContainerTitle}>
          <Bell /> <span className={styles.Title}>Concorso WLM</span>
        </div>
        <div
          className="pointer"
          onClick={() => {
            setLegend(!legend)
          }}
        >
          <LiveHelp />
        </div>
      </div>
      <Legend
        legend={legend}
        setLegend={(legend: boolean) => setLegend(legend)}
      />
      <WikiLoveMonuments
        infoWiki={infoWiki}
        setInfoWiki={(infoWiki: boolean) => setInfoWiki(infoWiki)}
      />
    </>
  )
}

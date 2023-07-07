import styles from './Topbar.module.css'
import { ReactComponent as Logo } from '../../../assets/wiki-logo-mobile.svg'
import { ReactComponent as Bell } from '../../../assets/bell.svg'
import { ReactComponent as LiveHelp } from '../../../assets/live-help.svg'
import { useState } from 'react'
import Legend from '../Legend'

export default function Topbar() {
  const [legend, setLegend] = useState(false)
  return (
    <>
      <div className={styles.TopBar}>
        <div>
          <Logo />
        </div>
        <div className={styles.ContainerTitle}>
          <Bell /> <span className={styles.Title}>Concorso WLM</span>
        </div>
        <div
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
    </>
  )
}

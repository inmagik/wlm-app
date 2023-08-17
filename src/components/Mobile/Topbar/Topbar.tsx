import styles from './Topbar.module.css'
import { ReactComponent as Logo } from '../../../assets/wiki-logo-mobile.svg'
import { ReactComponent as Bell } from '../../../assets/bell.svg'
import { ReactComponent as LiveHelp } from '../../../assets/live-help.svg'
import { useState } from 'react'
import Legend from '../Legend'
import WikiLoveMonuments from '../WikiLoveMonuments'
import { useTranslation } from 'react-i18next'
import { SlidesPresentazioneMobile } from '../Layout'
import { useTopContextState } from '../../../context/TopContext'

export default function Topbar() {
  const [legend, setLegend] = useState(false)
  const [infoWiki, setInfoWiki] = useState(false)
  const { t } = useTranslation()
  const [presentazione, setPresentazione] = useState(false)
  const { activeContests} = useTopContextState()

  console.log("activeContests", activeContests)


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
          <Bell /> <span className={styles.Title}>{t('concorso')} WLM</span>
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
        setPresentazione={setPresentazione}
        setInfoWiki={(infoWiki: boolean) => setInfoWiki(infoWiki)}
      />
      {presentazione && (
        <SlidesPresentazioneMobile
          isFromPageWiki
          setPresentazione={setPresentazione}
        />
      )}
    </>
  )
}

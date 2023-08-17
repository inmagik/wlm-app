import styles from './Topbar.module.css'
import { ReactComponent as Logo } from '../../../assets/wiki-logo-mobile.svg'
import { ReactComponent as Bell } from '../../../assets/bell-primary.svg'
import { useTranslation } from 'react-i18next'
import WikiLoveMonuments from '../../Mobile/WikiLoveMonuments'
import { useState } from 'react'
import { SlidesPresentazioneDesktop } from '../Layout'
import { useTopContextState } from '../../../context/TopContext'

export default function Topbar() {
  const { t } = useTranslation()
  const [infoWiki, setInfoWiki] = useState(false)
  const [presentazione, setPresentazione] = useState(false)
  const { activeContests} = useTopContextState()

  // console.log("activeContests", activeContests)

  return (
    <>
      <div className={styles.Topbar}>
        <div
          className={styles.WikiLoveMonuments}
          onClick={() => {
            setInfoWiki(!infoWiki)
          }}
        >
          <Logo /> {t('wiki_loves_monuments')}
        </div>
        <div>
          <div className={styles.ButtonConcorso}>
            <Bell /> {t('concorso_wiki_loves_monuments_1_30_settembre')}
          </div>
        </div>
        <div />
      </div>
      <WikiLoveMonuments
        infoWiki={infoWiki}
        setPresentazione={setPresentazione}
        setInfoWiki={(infoWiki: boolean) => setInfoWiki(infoWiki)}
      />
      {presentazione && (
        <SlidesPresentazioneDesktop
          isFromPageWiki
          setPresentazione={setPresentazione}
        />
      )}
    </>
  )
}

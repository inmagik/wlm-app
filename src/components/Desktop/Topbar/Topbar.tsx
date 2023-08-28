import styles from './Topbar.module.css'
import { ReactComponent as Logo } from '../../../assets/wiki-logo-mobile.svg'
import { ReactComponent as Bell } from '../../../assets/bell-primary.svg'
import { useTranslation } from 'react-i18next'
import WikiLoveMonuments from '../../Mobile/WikiLoveMonuments'
import { useState } from 'react'
import { SlidesPresentazioneDesktop } from '../Layout'
import { useTopContextState } from '../../../context/TopContext'

export default function Topbar() {
  const { t, i18n } = useTranslation()
  const [infoWiki, setInfoWiki] = useState(false)
  const [presentazione, setPresentazione] = useState(false)
  const { activeContests } = useTopContextState()
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
        {activeContests.length > 0 && (
          <div>
            <div className={styles.ButtonConcorso}>
              <Bell />{' '}
              {i18n.language === 'it'
                ? activeContests[0].label
                : activeContests[0].label_en}
            </div>
          </div>
        )}
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

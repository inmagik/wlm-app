import styles from './WikiLoveMonuments.module.css'
import { ReactComponent as WikiLogo } from '../../../assets/wiki-primary.svg'
import { ReactComponent as Close } from '../../../assets/close.svg'
import { useTranslation } from 'react-i18next'

interface Props {
  infoWiki: boolean
  setInfoWiki: (infoWiki: boolean) => void
}

export default function WikiLoveMonuments({ infoWiki, setInfoWiki }: Props) {
  const { i18n } = useTranslation()
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
      <div className="mt-4">
        {i18n.language === 'it' ? (
          <div className={styles.TextWikiLove}>
            <p>
              <strong>Ecco la webapp di Wiki Loves Monuments Italia!</strong>
            </p>
            <p>
              {' '}
              Puoi utilizzare questo strumento per partecipare all’edizione
              italiana di Wiki Loves Monuments, che si svolge dal 1° al 30
              settembre. Prima di partecipare, ricordati di leggere il
              regolamento del concorso.
            </p>{' '}
            <p>
              Wiki Loves Monuments è{' '}
              <strong>il più grande concorso fotografico al mondo</strong>. Il
              suo obiettivo è coinvolgere le persone nella{' '}
              <strong>documentazione del patrimonio culturale</strong> italiano
              con immagini pubblicate con licenza libera, che potranno essere
              utilizzate anche per illustrare le voci di{' '}
              <strong>Wikipedia, l’enciclopedia libera</strong>.
            </p>
            <p>
              Se non lo hai già fatto, per partecipare al concorso e caricare le
              tue fotografie devi prima{' '}
              <a
                href="https://commons.wikimedia.org/wiki/Main_Page"
                target="_blank"
              >
                registrarti a Wikimedia Commons
              </a>
              . L’utenza creata è valida anche su Wikipedia.
            </p>
            <p>
              Tutte le fotografie caricate per il concorso, anche tramite questa
              webapp, sono pubblicate con la <strong>licenza</strong>{' '}
              <a
                href="https://creativecommons.org/licenses/by-sa/4.0/deed.it"
                target="_blank"
              >
                CC BY-SA 4.0
              </a>
              , che ne consente il libero riutilizzo, per qualsiasi scopo,
              purché venga mantenuta la medesima licenza e ne vengano
              riconosciuti autori e autrici originali.
            </p>{' '}
            <p>
              Puoi utilizzare questa webapp anche al di fuori del concorso Wiki
              Loves Monuments, in qualsiasi momento. Utilizza i filtri per
              cercare i monumenti di tuo interesse, scatta le foto (o recuperale
              dal tuo archivio) e caricale.
            </p>{' '}
            <p>
              Visita il sito{' '}
              <a
                href="https://www.wikimedia.it/wiki-loves-monuments/"
                target={'_blank'}
              >
                wikilovesmonuments.it
              </a>{' '}
              per scoprire tutti i dettagli del concorso. Per qualsiasi domanda
              puoi scrivere a{' '}
              <a
                href="
                mailto:contatti@wikilovesmonuments.it
                "
              >
                contatti@wikilovesmonuments.it
              </a>
              .
            </p>
          </div>
        ) : (
          <div className={styles.TextWikiLove}>
            <p>
              <strong>Here is the Wiki Loves Monuments Italia webapp!</strong>
            </p>
            <p>
              {' '}
              You can use this tool to participate in the Italian edition of
              Wiki Loves Monuments, which takes place from 1 to 30 September.
              Before participating, remember to read the competition rules.
            </p>{' '}
            <p>
              Wiki Loves Monuments is{' '}
              <strong>the largest photo contest in the world</strong>. Its goal
              is to involve people in the documentation of the Italian cultural
              heritage with images published with a free license, which can also
              be used to illustrate the entries of{' '}
              <strong>Wikipedia, the free encyclopedia</strong>.
            </p>
            <p>
              If you have not already done so, to participate in the contest and
              upload your photos you must first{' '}
              <a
                href="https://commons.wikimedia.org/wiki/Main_Page"
                target="_blank"
              >
                register on Wikimedia Commons
              </a>
              . The user created is also valid on Wikipedia.
            </p>
            <p>
              All the photos uploaded for the contest, also through this webapp,
              are published with the <strong>license</strong>{' '}
              <a
                href="https://creativecommons.org/licenses/by-sa/4.0/deed.it"
                target="_blank"
              >
                CC BY-SA 4.0
              </a>
              , which allows their free reuse, for any purpose, provided that
              the same license is maintained and the original authors are
              recognized.
            </p>{' '}
            <p>
              You can use this webapp even outside the Wiki Loves Monuments
              contest, at any time. Use the filters to search for the monuments
              of your interest, take the photos (or retrieve them from your
              archive) and upload them.
            </p>{' '}
            <p>
              Visit the site{' '}
              <a
                href="https://www.wikimedia.it/wiki-loves-monuments/"
                target={'_blank'}
              >
                wikilovesmonuments.it
              </a>{' '}
              to discover all the details of the competition. For any questions
              you can write to{' '}
              <a
                href="
                mailto:contatti@wikilovesmonuments.it
                "
              >
                contatti@wikilovesmonuments.it
              </a>
              .
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

import styles from './BlockUpload.module.css'
import { ReactComponent as Close } from '../../../assets/close.svg'
import { useTranslation } from 'react-i18next'
import { useRef, useState } from 'react'

interface BlockUploadProps {
  uploadOpen: boolean
  setUploadOpen: (uploadOpen: boolean) => void
  file: File | null
}

export default function BlockUpload({
  uploadOpen,
  setUploadOpen,
  file,
}: BlockUploadProps) {
  const { t } = useTranslation()
  const [uploadState, setUploadState] = useState({
    title: '',
    description: '',
    file,
    date: '',
  })

  const inputFileRef = useRef<HTMLInputElement>(null)

  return (
    <div
      className={styles.ModalUpload}
      style={{
        opacity: uploadOpen ? 1 : 0,
        pointerEvents: uploadOpen ? 'all' : 'none',
        transition: 'all 0.5s ease-in-out',
      }}
    >
      <div className={styles.ModalUploadContainer}>
        <div className={styles.CloseModal}>
          <Close onClick={() => setUploadOpen(false)} />
        </div>
        <div className={styles.CardImageToUpload}>
          <div>
            {uploadState.file && (
              <img
                src={URL.createObjectURL(uploadState.file)}
                className={styles.ImageToUpload}
                alt="image"
              />
            )}
          </div>
          <div className="mt-4">
            <div className={styles.LabelInput}>{t('titolo_immagine')}</div>
            <div>
              <input
                type="text"
                className={styles.InputTitle}
                value={uploadState.title}
                onChange={(e) =>
                  setUploadState({ ...uploadState, title: e.target.value })
                }
                placeholder={t('inserisci_titolo')}
              />
            </div>
          </div>
          <div className="mt-2">
            <div className={styles.LabelInput}>{t('descrizione_immagine')}</div>
            <div>
              <textarea
                className={styles.InputTitle}
                rows={5}
                value={uploadState.description}
                onChange={(e) =>
                  setUploadState({
                    ...uploadState,
                    description: e.target.value,
                  })
                }
                placeholder={t('inserisci_descrizione')}
              />
            </div>
          </div>
          <div className="mt-2">
            <div className={styles.LabelInput}>{t('date')}</div>
            <div>
              <input
                type="date"
                className={styles.InputTitle}
                value={uploadState.date}
                onChange={(e) =>
                  setUploadState({ ...uploadState, date: e.target.value })
                }
                placeholder={t('inserisci_titolo')}
              />
            </div>
          </div>
        </div>
        <div className={styles.ContainerButtons}>
          <button
            className={styles.ButtonRiseleziona}
            onClick={() => {
              inputFileRef.current?.click()
            }}
          >
            {t('riseleziona')}
          </button>
          <input
            type="file"
            className="d-none"
            onChange={(e) => {
              if (e.target.files) {
                setUploadState({ ...uploadState, file: e.target.files[0] })
              }
            }}
            ref={inputFileRef}
            hidden={true}
            accept="image/*"
          />
          <button className={styles.ButtonUpload}>{t('carica_foto')}</button>
        </div>
      </div>
    </div>
  )
}

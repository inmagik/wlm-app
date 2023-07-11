import styles from './BlockUpload.module.css'
import { ReactComponent as Close } from '../../../assets/close.svg'
import { useTranslation } from 'react-i18next'
import { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { type Swiper as SwiperRef } from 'swiper'
import 'swiper/css'
import classNames from 'classnames'

interface BlockUploadProps {
  uploadOpen: boolean
  setUploadOpen: (uploadOpen: boolean) => void
  fileList: FileList | null
  setFileList: (file: FileList | null) => void
}

export default function BlockUpload({
  uploadOpen,
  setUploadOpen,
  fileList,
  setFileList,
}: BlockUploadProps) {
  const { t } = useTranslation()
  const [uploadState, setUploadState] = useState({
    title: '',
    description: '',
    fileList,
    date: '',
  })

  const inputFileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setUploadState({ ...uploadState, fileList })
  }, [fileList])

  const swiperRef = useRef<SwiperRef>()

  const [slideActive, setSlideActive] = useState<number>(0)

  return (
    <div
      className={styles.ModalUpload}
      style={{
        opacity: uploadOpen ? 1 : 0,
        pointerEvents: uploadOpen ? 'all' : 'none',
        transition: 'all 0.5s ease-in-out',
      }}
      onTransitionEnd={() => {
        if (!uploadOpen) {
          setUploadState({
            title: '',
            description: '',
            fileList: null,
            date: '',
          })
          setFileList(null)
        }
      }}
    >
      <div className={styles.ModalUploadContainer}>
        <div className={styles.CloseModal}>
          <Close
            onClick={() => {
              setUploadOpen(false)
            }}
          />
        </div>
        <div className={styles.CardImageToUpload}>
          <div>
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper
              }}
              onSlideChange={(swiper) => {
                setSlideActive(swiper.activeIndex)
              }}
              className={styles.Swiper}
            >
              {uploadState.fileList &&
                [...uploadState.fileList].map((file) => (
                  <SwiperSlide key={file.name}>
                    <div
                      className={styles.ImageToUpload}
                      style={{
                        backgroundImage: `url("${URL.createObjectURL(file)}")`,
                      }}
                    />
                  </SwiperSlide>
                ))}
            </Swiper>
            <div className={styles.PaginationImagesDots}>
              {uploadState.fileList && [...uploadState.fileList!].map((file, index) => (
                <div
                  key={file.name}
                  className={classNames(styles.PaginationDot, {
                    [styles.PaginationDotActive]: slideActive === index,
                  })}
                  onClick={() => {
                    swiperRef.current?.slideTo(index)
                  }}
                />
              ))}
            </div>
          </div>
          <div className="mt-4">
            <div className={styles.LabelInput}>{t('titolo_immagine')}</div>
            <div>
              <input
                type="text"
                className={styles.InputTitle}
                value={uploadState.title}
                onChange={(e) => {
                  setFileList(e.target.files!)
                  setUploadState({ ...uploadState, title: e.target.value })
                }}
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
            multiple
            className="d-none"
            onChange={(e) => {
              if (e.target.files) {
                setUploadState({ ...uploadState, fileList: e.target.files })
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

import styles from './BlockUpload.module.css'
import { ReactComponent as Close } from '../../../assets/close.svg'
import { useTranslation } from 'react-i18next'
import { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, type Swiper as SwiperRef } from 'swiper'
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

  interface ImageInfo {
    title: string
    description: string
    file: File | null
    date: string
  }

  const [uploadState, setUploadState] = useState<ImageInfo[] | undefined>(
    undefined
  )

  const inputFileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (fileList) {
      const images: ImageInfo[] = []
      for (let i = 0; i < fileList.length; i++) {
        images.push({
          title: '',
          description: '',
          file: fileList[i],
          date: '',
        })
      }
      setUploadState(images)
    }
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
          setUploadState(undefined)
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
        <Swiper
          modules={[Pagination]}
          pagination={{
            dynamicBullets: true,
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper
          }}
          onSlideChange={(swiper) => {
            setSlideActive(swiper.activeIndex)
          }}
          className={styles.Swiper}
        >
          {uploadState &&
            uploadState.map((image, i) => (
              <SwiperSlide key={i}>
                <div className={styles.CardImageToUpload}>
                  <div>
                    {image.file && (
                      <div
                        className={styles.ImageToUpload}
                        style={{
                          backgroundImage: `url("${URL.createObjectURL(
                            image.file
                          )}")`,
                        }}
                      />
                    )}
                  </div>
                  <div className="mt-4">
                    <div className={styles.LabelInput}>
                      {t('titolo_immagine')}
                    </div>
                    <div>
                      <input
                        type="text"
                        className={styles.InputTitle}
                        value={uploadState[i].title}
                        onChange={(e) => {
                          setUploadState(
                            uploadState.map((image, j) => {
                              if (i === j) {
                                return {
                                  ...image,
                                  title: e.target.value,
                                }
                              }
                              return image
                            })
                          )
                        }}
                        placeholder={t('inserisci_titolo')}
                      />
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className={styles.LabelInput}>
                      {t('descrizione_immagine')}
                    </div>
                    <div>
                      <textarea
                        className={styles.InputTitle}
                        rows={5}
                        value={uploadState[i].description}
                        onChange={(e) => {
                          setUploadState(
                            uploadState.map((image, j) => {
                              if (i === j) {
                                return {
                                  ...image,
                                  description: e.target.value,
                                }
                              }
                              return image
                            })
                          )
                        }}
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
                        value={uploadState[i].date}
                        onChange={(e) =>
                          setUploadState(
                            uploadState.map((image, j) => {
                              if (i === j) {
                                return {
                                  ...image,
                                  date: e.target.value,
                                }
                              }
                              return image
                            })
                          )
                        }
                        placeholder={t('inserisci_titolo')}
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
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
                setUploadState(
                  uploadState?.map((image, i) => {
                    if (i === slideActive) {
                      return {
                        ...image,
                        file: e.target.files![0],
                      }
                    }
                    return image
                  })
                )
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

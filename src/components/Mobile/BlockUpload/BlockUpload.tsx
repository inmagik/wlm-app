import styles from './BlockUpload.module.css'
import { ReactComponent as Close } from '../../../assets/close.svg'
import { ReactComponent as DeleteImage } from '../../../assets/delete-image.svg'
import { useTranslation } from 'react-i18next'
import { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, type Swiper as SwiperRef } from 'swiper'
import 'swiper/css'
import { useMediaQuery } from 'usehooks-ts'
import { Monument } from '../../../types'
import { uploadImages } from '../../../hooks/monuments'
import dayjs from 'dayjs'

interface BlockUploadProps {
  uploadOpen: boolean
  setUploadOpen: (uploadOpen: boolean) => void
  fileList: FileList | null
  setFileList: (file: FileList | null) => void
  monument: Monument | null
}

export interface ImageInfo {
  title: string
  description: string
  file: File | null
  date: string
  monument_id?: number
}

export default function BlockUpload({
  uploadOpen,
  setUploadOpen,
  fileList,
  setFileList,
  monument,
}: BlockUploadProps) {
  const { t } = useTranslation()

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
          date: dayjs().format('DD/MM/YYYY'),
          monument_id: monument?.id,
        })
      }
      setUploadState(images)
    }
  }, [fileList])

  console.log(uploadState)

  const swiperRef = useRef<SwiperRef>()

  const [slideActive, setSlideActive] = useState<number>(0)

  const isMobile = useMediaQuery('(max-width: 768px)')

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
          setUploadOpen(false)
        }
      }}
    >
      <div className={styles.ModalUploadContainer}>
        <div className="d-flex align-items-center justify-content-between">
          <div className={styles.TitleConcorso}>
            {monument?.in_contest
              ? t('la_tua_foto_sarà_in_concorso')
              : t('la_tua_foto_non_sarà_in_concorso')}
          </div>
        </div>
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
          slidesPerView={isMobile || uploadState?.length === 1 ? 1 : 1.1}
          spaceBetween={isMobile || uploadState?.length === 1 ? 0 : 20}
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
                  <div className="d-flex align-items-center justify-content-between">
                    <div className={styles.TitleUpload}>
                      {t('caricamento_immagine')}:{' '}
                      <strong>{monument?.label}</strong>
                    </div>
                    {uploadState.length > 1 && (
                      <div
                        className="pointer"
                        onClick={() => {
                          setUploadState(
                            uploadState.filter((image, j) => i !== j)
                          )
                        }}
                      >
                        <DeleteImage />
                      </div>
                    )}
                  </div>
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
                    <div className="d-flex align-items-center justify-content-between">
                      <div className={styles.LabelInput}>
                        {t('titolo_immagine')}
                      </div>
                    </div>
                    <div>
                      <input
                        type="text"
                        className={styles.InputTitle}
                        value={uploadState[i].title}
                        onChange={(e) => {
                          if (i === 0) {
                            setUploadState(
                              uploadState.map((image, j) => {
                                return {
                                  ...image,
                                  title: e.target.value,
                                }
                              })
                            )
                          } else {
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
                          }
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
                        rows={3}
                        value={uploadState[i].description}
                        onChange={(e) => {
                          if (i === 0) {
                            setUploadState(
                              uploadState.map((image, j) => {
                                return {
                                  ...image,
                                  description: e.target.value,
                                }
                              })
                            )
                          } else {
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
                          }
                        }}
                        placeholder={t('inserisci_descrizione')}
                      />
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className={styles.LabelInput}>{t('date')}</div>
                    <div>
                      <input
                        // type="date"
                        className={styles.InputTitle}
                        value={uploadState[i].date}
                        onChange={(e) => {
                          if (i === 0) {
                            setUploadState(
                              uploadState.map((image, j) => {
                                return {
                                  ...image,
                                  date: e.target.value,
                                }
                              })
                            )
                          } else {
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
                        }}
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
          <button
            className={styles.ButtonUpload}
            onClick={() => {
              console.log(uploadState, 'uploadState')
              if (uploadState?.length === 0) return
              if (uploadState !== undefined) {
                uploadImages(uploadState)
              }
            }}
          >
            {t('carica_foto')}
          </button>
        </div>
      </div>
    </div>
  )
}

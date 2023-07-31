import styles from './BlockUpload.module.css'
import { ReactComponent as Close } from '../../../assets/close.svg'
import { ReactComponent as DeleteImage } from '../../../assets/delete-image.svg'
import { ReactComponent as UploadSuccess } from '../../../assets/upload-success.svg'
import { useTranslation } from 'react-i18next'
import { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, type Swiper as SwiperRef } from 'swiper'
import 'swiper/css'
import { useMediaQuery } from 'usehooks-ts'
import { Monument } from '../../../types'
import { uploadImages } from '../../../hooks/monuments'
import dayjs from 'dayjs'
import { useAuthUser } from 'use-eazy-auth'

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

  const [responseUploadOpen, setResponseUploadOpen] = useState<boolean>(false)

  const inputFileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (fileList) {
      const images: ImageInfo[] = []
      for (let i = 0; i < fileList.length; i++) {
        images.push({
          title: '',
          description: '',
          file: fileList[i],
          date: dayjs().format('YYYY-MM-DD'),
          monument_id: monument?.id,
        })
      }
      setUploadState(images)
    }
  }, [fileList])

  const swiperRef = useRef<SwiperRef>()

  const [slideActive, setSlideActive] = useState<number>(0)

  const isMobile = useMediaQuery('(max-width: 768px)')

  const [errors, setErrors] = useState<any[]>()
  const { token } = useAuthUser()

  return (
    <>
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
                setUploadState(undefined)
                setFileList(null)
                setUploadOpen(false)       
                setErrors([])
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
                          {t('titolo_immagine')} <span>*</span>
                        </div>
                      </div>
                      <div>
                        <input
                          required
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
                      {errors &&
                        errors.find(
                          (error) =>
                            error.error === 'title' && error.index === i
                        ) &&
                        uploadState[i].title === '' && (
                          <div className={styles.Error}>
                            {t('titolo_immagine_obbligatorio')}
                          </div>
                        )}
                    </div>
                    <div className="mt-2">
                      <div className={styles.LabelInput}>
                        {t('descrizione_immagine')} <span>*</span>
                      </div>
                      <div>
                        <textarea
                          className={styles.InputTitle}
                          rows={3}
                          required
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
                        {errors &&
                          errors.find(
                            (error) =>
                              error.error === 'description' && error.index === i
                          ) &&
                          uploadState[i].description === '' && (
                            <div className={styles.Error}>
                              {t('descrizione_immagine_obbligatoria')}
                            </div>
                          )}
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className={styles.LabelInput}>
                        {t('date')} 
                        <span>*</span>    
                      </div>
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
                        {errors &&
                          errors.find(
                            (error) =>
                              error.error === 'date' && error.index === i
                          ) &&
                          uploadState[i].title === '' && (
                            <div className={styles.Error}>
                              {t('date_obbligatoria')}
                            </div>
                          )}
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
                if (uploadState !== undefined && uploadState.every(
                    (image) =>
                      image.title !== '' &&
                      image.description !== '' &&
                      image.file !== null &&
                      image.date !== ''
                  )) {
                  if (uploadState?.length === 0) return
                  if (uploadState !== undefined) {
                    uploadImages(uploadState, token).then((res) => {
                        console.log(res)
                      setUploadOpen(false)
                      setUploadState(undefined)
                      setResponseUploadOpen(true)
                    })
                  }
                } else {
                  let errors = [] as any
                  uploadState?.map((image, i) => {
                    if (image.title === '') {
                      errors.push({
                        index: i,
                        error: 'title',
                      })
                    }
                    if (image.description === '') {
                      errors.push({
                        index: i,
                        error: 'description',
                      })
                    }
                    if (image.date === '') {
                      errors.push({
                        index: i,
                        error: 'date',
                      })
                    }
                    return undefined
                  })
                  setErrors(errors)
                }
              }}
            >
              {t('carica_foto')}
            </button>
          </div>
        </div>
      </div>
      {responseUploadOpen && !isMobile && (
        <div
          className={styles.ResponseOverlay}
          onClick={() => {
            setResponseUploadOpen(false)
          }}
        >
          <div className={styles.ResponseContainer}>
            <div
              className="position-absolute pointer"
              style={{
                top: 20,
                right: 20,
              }}
            >
              <Close />
            </div>
            <div>
              <UploadSuccess />
            </div>
            <div className={styles.UploadAvvenuto}>
              {t('upload_avvenuto_con_successo')}
            </div>
          </div>
        </div>
      )}
      {responseUploadOpen && isMobile && (
        <div
          className={styles.ResponseOverlay}
          onClick={() => {
            setResponseUploadOpen(false)
          }}
        >
          <div className={styles.ResponseContainer}>
            <div
              className="position-absolute pointer"
              style={{
                top: 20,
                right: 20,
              }}
            >
              <Close />
            </div>
            <div>
              <UploadSuccess />
            </div>
            <div className={styles.UploadAvvenuto}>
              {t('upload_avvenuto_con_successo')}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

import styles from './BlockUpload.module.css'
import { ReactComponent as Close } from '../../../assets/close.svg'
import { ReactComponent as DeleteImage } from '../../../assets/delete-image.svg'
import { ReactComponent as UploadSuccess } from '../../../assets/upload-success.svg'
import { useTranslation } from 'react-i18next'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, type Swiper as SwiperRef } from 'swiper'
import 'swiper/css'
import { useMediaQuery } from 'usehooks-ts'
import { Monument } from '../../../types'
import { uploadImages } from '../../../hooks/monuments'
import dayjs from 'dayjs'
import { useAuthUser } from 'use-eazy-auth'
import { useQueryClient } from '@tanstack/react-query'
import { Spinner } from 'react-bootstrap'

interface BlockUploadProps {
  uploadOpen: boolean
  setUploadOpen: (uploadOpen: boolean) => void
  fileList: FileList | null
  setFileList: (file: FileList | null) => void
  monument: Monument | null
}

function ImageFile({ image }: { image: any }) {
  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    if (image.file) {
      setUrl((prev) => {
        if (prev) {
          URL.revokeObjectURL(prev)
        }
        return URL.createObjectURL(image.file)
      })
    }
  }, [])

  if (!url) {
    return null
  }

  return (
    <div
      className={styles.ImageToUpload}
      key={image.file.name}
      style={{
        backgroundImage: `url("${url}")`,
      }}
    />
  )
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

  const uploadCategories = useMemo(() => {
    if (monument) {
      const categories = monument.in_contest
        ? monument.categories_urls?.uploadurl
        : monument.categories_urls?.nonwlmuploadurl
      if (!categories) {
        return ''
      }
      const url = new URL(categories || '')
      const params = new URLSearchParams(url.search)
      return params.get('categories') || ''
    }
    return ''
  }, [monument])

  useEffect(() => {
    if (fileList) {
      const images: ImageInfo[] = []
      for (let i = 0; i < fileList.length; i++) {
        images.push({
          title: `${monument?.label}_${dayjs().format('YYYY-MM-DD')}_${(i + 1)
            .toString()
            .padStart(3, '0')}`,
          description: monument?.label || '',
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
  const [errorServer, setErrorServer] = useState<string | null>(null)
  const [mappedErrors, setMappedErrors] = useState<any[] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const queryClient = useQueryClient()

  useEffect(() => {
    setErrorServer(null)
  }, [uploadState])

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
            setErrors([])
            setErrorServer(null)
            setMappedErrors(null)
          }
        }}
      >
        <div className={styles.ModalUploadContainer}>
          <div className="d-flex align-items-center justify-content-between">
            <div className={styles.TitleConcorso}>
              {monument?.in_contest
                ? t('la_tua_foto_sarà_in_concorso')
                : t('la_tua_foto_non_sarà_in_concorso')}{' '}
              -{' '}
              {uploadCategories && (
                <span className={styles.Categorie}>
                  Categorie: {uploadCategories}
                </span>
              )}
            </div>
            <div></div>
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
                    <div>{image.file && <ImageFile image={image} />}</div>
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
                          style={{
                            // border: '1px solid transparent',
                            boxShadow:
                              errors &&
                              errors.find(
                                (error) =>
                                  error.error === 'title' && error.index === i
                              ) &&
                              uploadState[i].title === ''
                                ? '0px 0px 0px 1px var(--tertiary)'
                                : '0px 0px 0px 1px #E5E5E5',
                          }}
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
                          rows={2}
                          style={{
                            // border: '1px solid transparent',
                            boxShadow:
                              errors &&
                              errors.find(
                                (error) =>
                                  error.error === 'description' &&
                                  error.index === i
                              ) &&
                              uploadState[i].description === ''
                                ? '0px 0px 0px 1px #FF0000'
                                : '0px 0px 0px 1px #E5E5E5',
                          }}
                          required
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
                          style={{
                            // border: '1px solid transparent',
                            boxShadow:
                              errors &&
                              errors.find(
                                (error) =>
                                  error.error === 'date' && error.index === i
                              ) &&
                              uploadState[i].date === ''
                                ? '0px 0px 0px 1px #FF0000'
                                : '0px 0px 0px 1px #E5E5E5',
                          }}
                          className={styles.InputTitle}
                          value={uploadState[i].date}
                          onChange={(e) => {
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
                    {mappedErrors && mappedErrors[i] && (
                      <div className="">
                        {mappedErrors[i].error ? (
                          <div className={styles.ErrorBlock}>
                            {mappedErrors[i].message}
                          </div>
                        ) : (
                          <div className={styles.SuccessBlock}>
                            {t('upload_avvenuto_con_successo')}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
          {errorServer && (
            <div className={styles.ErrorServer}>{errorServer}</div>
          )}
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
              className={
                mappedErrors !== undefined && mappedErrors!?.length > 0
                  ? styles.ButtonUploadErrors
                  : styles.ButtonUpload
              }
              onClick={() => {
                if (
                  uploadState !== undefined &&
                  uploadState.every(
                    (image) =>
                      image.title !== '' &&
                      image.description !== '' &&
                      image.file !== null &&
                      image.date !== ''
                  )
                ) {
                  if (uploadState?.length === 0) return
                  if (uploadState !== undefined) {
                    setIsLoading(true)
                    uploadImages(uploadState, token)
                      .then((res) => {
                        setIsLoading(false)
                        if (res.status === 200) {
                          setUploadOpen(false)
                          setErrors([])
                          setUploadState(undefined)
                          setErrorServer(null)
                          setResponseUploadOpen(true)
                          queryClient.invalidateQueries(['monument'])
                          queryClient.invalidateQueries(['monuments'])
                        }
                      })
                      .catch((err) => {
                        setIsLoading(false)
                        if (err.response?.status !== 418) {
                          setErrorServer(
                            err.response?.data?.detail || 'Errore del server'
                          )
                        } else {
                          setMappedErrors(err.response?.data)
                        }
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
              {isLoading && <Spinner size="sm" />} {t('carica_foto')}
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

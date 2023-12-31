import { useFormik, FieldArray, FormikProvider, getIn } from 'formik'
import * as Yup from 'yup'
import styles from './BlockUpload.module.css'
import { ReactComponent as Close } from '../../../assets/close.svg'
import { ReactComponent as DeleteImage } from '../../../assets/delete-image.svg'
import { ReactComponent as UploadSuccess } from '../../../assets/upload-success.svg'
import { ReactComponent as ArrowLeftSlideShow } from '../../../assets/left-slideshow-arrow.svg'
import { ReactComponent as ArrowRightSlideShow } from '../../../assets/right-slideshow-arrow.svg'
import { useTranslation } from 'react-i18next'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { type Swiper as SwiperRef } from 'swiper'
import 'swiper/css'
import { Monument } from '../../../types'
import { uploadImages } from '../../../hooks/monuments'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { useAuthUser } from 'use-eazy-auth'
import { useQueryClient } from '@tanstack/react-query'
import { Modal, Spinner } from 'react-bootstrap'
import classNames from 'classnames'
import { isBrowserMobile } from '../../../utils'
import { toast } from 'react-toastify'
import { useTopContextState } from '../../../context/TopContext'
import * as loadImage from 'blueimp-load-image'
import { processUploadFiles } from './processUpload'

dayjs.extend(customParseFormat)

function getMonumentImageTitles(monument: Monument) {
  const pictures = monument.pictures
  const titles = pictures
    .map((picture) => picture.image_title)
    .map((title) => {
      const titleParts = title.split('.')
      const extension = titleParts[titleParts.length - 1]
      return title.replace('File:', '').replace(`.${extension}`, '')
    })
  return titles
}

function ImageFile({ image }: { image: any }) {
  const url = useMemo(() => {
    if (image.file) {
      return URL.createObjectURL(image.file)
    }
    return null
  }, [image.file])

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

const BlockUploadFormik = ({
  uploadOpen,
  setUploadOpen,
  fileList,
  setFileList,
  monument,
}: BlockUploadProps) => {
  const { t } = useTranslation()

  const swiperRef = useRef<SwiperRef>()

  const inputFileRef = useRef<HTMLInputElement>(null)

  const { activeContests } = useTopContextState()
  const anyContest = useMemo(() => {
    return activeContests && activeContests.length > 0
  }, [activeContests])

  const uploadCategories = useMemo(() => {
    if (monument) {
      const categories = anyContest && monument.in_contest
        ? monument.categories_urls?.wlm_categories ?? []
        : monument.categories_urls?.non_wlm_categories ?? []

      return categories
    }
    return []
  }, [monument])

  const [slideActive, setSlideActive] = useState<number>(0)
  const [responseUploadOpen, setResponseUploadOpen] = useState<boolean>(false)
  const [mappedErrors, setMappedErrors] = useState<any>({})

  const imageTitles = useMemo(() => {
    if (monument) {
      return getMonumentImageTitles(monument)
    }
    return []
  }, [monument])

  const validationSchema = useMemo(() => {
    const requiredMessage = t('campo_obbligatorio')
    const titleAlreadyExistsMessage = t('titolo_esistente')

    return Yup.object().shape({
      images: Yup.array().of(
        Yup.object().shape({
          title: Yup.string()
            .required(requiredMessage)
            .notOneOf(imageTitles, titleAlreadyExistsMessage),
          description: Yup.string().required(requiredMessage),
          date: Yup.string().required(requiredMessage),
        })
      ),
    })
  }, [monument])

  useEffect(() => {
    if (fileList && monument) {
      processUploadFiles(fileList, monument).then((images) => {
        setFieldValue('images', images)
      })
    }
  }, [fileList])

  const queryClient = useQueryClient()
  const isMobile = isBrowserMobile()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { token } = useAuthUser()

  const formik = useFormik({
    initialValues: {
      images: [] as ImageInfo[],
    },
    validationSchema,
    onSubmit: async (values, { setErrors }) => {
      try {
        setIsLoading(true)
        const response = await uploadImages(
          values.images,
          isMobile ? 'mobile' : 'desktop',
          token
        )
        setIsLoading(false)
        if (response.status === 200) {
          setUploadOpen(false)
          setResponseUploadOpen(true)
          setFileList(null)
          setMappedErrors({})
          queryClient.invalidateQueries(['monument'])
          queryClient.invalidateQueries(['monuments'])
          queryClient.invalidateQueries(['infiniteMonuments'])
        }
      } catch (errors: any) {
        setIsLoading(false)
        if (errors.response.status === 500) {
          toast.error(errors.response.data.detail, {
            position: toast.POSITION.BOTTOM_RIGHT,
          })
        } else if (errors.response.status === 418) {
          setMappedErrors(errors.response.data)
        } else if (errors.response.status === 400) {
          const newErrors = Object.assign({}, errors.response.data)
          const keys = Object.keys(newErrors)
          keys.forEach((key) => {
            const value = newErrors[key]
            const newValue = newErrors[key].map((v: any) => {
              if (v['non_field_errors']) {
                return { title: v['non_field_errors'] }
              }
              return v
            })
            newErrors[key] = newValue
          })

          setErrors(newErrors)
        } else {
          setErrors(errors.response.data)
        }
      }
    },
  })

  const { values, errors, touched, setFieldValue, handleChange } = formik

  const [uploadWizard, setUploadWizard] = useState<boolean | object>(false)

  const copyTitles = useCallback(
    (title: string) => {
      const position = title.indexOf('_001')
      let titleWithoutNumber = title
      if (position > -1) {
        titleWithoutNumber = title.substring(0, position)
      }
      values.images.forEach((image: any, index: number) => {
        if (index !== 0) {
          const suffix = String(index + 1).padStart(3, '0')
          const newTitle = `${titleWithoutNumber}_${suffix}`
          setFieldValue(`images[${index}].title`, newTitle)
        }
      })
    },
    [values.images]
  )

  const [checkedCopia, setCheckedCopia] = useState<boolean>(false)

  useEffect(() => {
    if (!checkedCopia) return
    if (values.images && values.images.length > 0) {
      copyTitles(values.images[0].title)
    }
  }, [values.images, checkedCopia])

  const descriptionForWizard = useMemo(() => {
    if (!monument || values.images.length === 0) return ''
    return `${
      values.images[0].description
    } {{Load via app WLM.it|year=${dayjs().year()}|source=wizard}}`
  }, [values.images, monument])

  useEffect(() => {
    if (!uploadOpen) {
      setFileList(null)
      setSlideActive(0)
      if (swiperRef.current) {
        swiperRef.current.slideTo(0)
      }
      setMappedErrors({})
    }
  }, [uploadOpen])

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
            // setFileList(null)
            // setMappedErrors({})
            // setSlideActive(0)
          }
        }}
      >
        <div className={styles.ModalUploadContainer}>
          <form onSubmit={formik.handleSubmit}>
            <div
              className="d-flex py-2 align-items-center justify-content-between position-sticky"
              style={{
                top: 0,
                zIndex: 100,
                backgroundColor: 'var(--overlay)',
              }}
            >
              <div className="d-flex">
                <div className={styles.TitleConcorso}>
                  {monument?.in_contest
                    ? t('la_tua_foto_sarà_in_concorso')
                    : t('la_tua_foto_non_sarà_in_concorso')}{' '}
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div
                  className={styles.LabelUploadWizard}
                  onClick={() => {
                    if (monument?.in_contest && anyContest) {
                      setUploadWizard({
                        description: descriptionForWizard,
                        descriptionlang: 'it',
                        categories: uploadCategories.join('|'),
                        campaign: 'wlm-it',
                        id: monument?.wlm_n,
                      })
                    } else {
                      setUploadWizard({
                        description: descriptionForWizard,
                        descriptionlang: 'it',
                        categories: uploadCategories.join('|'),
                      })
                    }
                  }}
                >
                  {t('wizard_upload')}{' '}
                </div>
                <div className={styles.Close}>
                  <Close
                    onClick={() => {
                      setFileList(null)
                      setUploadOpen(false)
                    }}
                  />
                </div>
              </div>
            </div>

            <FormikProvider value={formik}>
              <FieldArray
                name="images"
                render={({ remove }: { remove: (index: number) => void }) => (
                  <Swiper
                    slidesPerView={
                      isMobile || values.images?.length === 1 ? 1 : 1.1
                    }
                    spaceBetween={
                      isMobile || values.images?.length === 1 ? 0 : 20
                    }
                    onSwiper={(swiper) => {
                      swiperRef.current = swiper
                    }}
                    onSlideChange={(swiper) => {
                      setSlideActive(swiper.activeIndex)
                    }}
                    className={styles.Swiper}
                  >
                    <div className={styles.Swiper}>
                      {values.images &&
                        values.images.length > 0 &&
                        values?.images.map((image, index) => (
                          <SwiperSlide key={index}>
                            <div className={styles.CardImageToUpload}>
                              <div className="d-flex align-items-center justify-content-between">
                                <div className={styles.TitleUpload}>
                                  {t('caricamento_immagine')}:{' '}
                                  <strong>{monument?.label}</strong>
                                </div>

                                {values.images.length > 1 && (
                                  <div
                                    className="pointer"
                                    onClick={() => remove(index)}
                                  >
                                    <DeleteImage />
                                  </div>
                                )}
                              </div>
                              <div>
                                {image.file && <ImageFile image={image} />}
                                {mappedErrors.length > 0 &&
                                  (mappedErrors[index] ? (
                                    <div className={styles.ErrorMapped}>
                                      {mappedErrors[index]}
                                    </div>
                                  ) : (
                                    <div className={styles.SuccessMapped}>
                                      {t('upload_avvenuto_con_successo')}
                                    </div>
                                  ))}
                              </div>
                              <div className="mt-4">
                                <div className="d-flex align-items-center justify-content-between">
                                  <div
                                    className={`${styles.LabelInput} d-flex align-items-center`}
                                  >
                                    {t('titolo_immagine')} <span>*</span>
                                    <span
                                      onClick={() => {
                                        copyTitles(values.images[index].title)
                                      }}
                                    >
                                      {index === 0 &&
                                        values.images.length > 1 && (
                                          <div className="d-flex align-items-center ms-4">
                                            <input
                                              type="checkbox"
                                              className="me-2"
                                              checked={checkedCopia}
                                              onChange={(e) => {
                                                setCheckedCopia(!checkedCopia)
                                              }}
                                            />{' '}
                                            {t('duplica_su_tutte_le_immagini')}
                                          </div>
                                        )}
                                    </span>
                                  </div>
                                </div>
                                <div>
                                  <textarea
                                    rows={isMobile ? 2 : 1}
                                    className={styles.InputTitle}
                                    name={`images[${index}].title`}
                                    disabled={
                                      isLoading || (index !== 0 && checkedCopia)
                                    }
                                    value={values.images[index].title}
                                    onChange={handleChange}
                                    placeholder={t('inserisci_titolo')}
                                    style={{
                                      boxShadow:
                                        getIn(
                                          touched,
                                          `images[${index}].title`
                                        ) &&
                                        getIn(errors, `images[${index}].title`)
                                          ? '0px 0px 0px 1px var(--tertiary)'
                                          : '0px 0px 0px 1px #E5E5E5',
                                    }}
                                  />
                                </div>
                                {getIn(touched, `images[${index}].title`) &&
                                  getIn(errors, `images[${index}].title`) && (
                                    <div className={styles.Error}>
                                      {getIn(errors, `images[${index}].title`)}
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
                                    disabled={isLoading}
                                    name={`images[${index}].description`}
                                    value={values.images[index].description}
                                    onChange={handleChange}
                                    placeholder={t('inserisci_descrizione')}
                                    style={{
                                      boxShadow:
                                        getIn(
                                          touched,
                                          `images[${index}].description`
                                        ) &&
                                        getIn(
                                          errors,
                                          `images[${index}].description`
                                        )
                                          ? '0px 0px 0px 1px #FF0000'
                                          : '0px 0px 0px 1px #E5E5E5',
                                    }}
                                  />
                                  {getIn(
                                    touched,
                                    `images[${index}].description`
                                  ) &&
                                    getIn(
                                      errors,
                                      `images[${index}].description`
                                    ) && (
                                      <div className={styles.Error}>
                                        {getIn(
                                          errors,
                                          `images[${index}].description`
                                        )}
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
                                    style={{
                                      boxShadow:
                                        getIn(
                                          touched,
                                          `images[${index}].date`
                                        ) &&
                                        getIn(errors, `images[${index}].date`)
                                          ? '0px 0px 0px 1px #FF0000'
                                          : '0px 0px 0px 1px #E5E5E5',
                                    }}
                                    disabled={isLoading}
                                    className={styles.InputTitle}
                                    name={`images[${index}].date`}
                                    value={values.images[index].date}
                                    onChange={handleChange}
                                    placeholder={t('inserisci_titolo')}
                                  />
                                  {getIn(touched, `images[${index}].date`) &&
                                    getIn(errors, `images[${index}].date`) && (
                                      <div className={styles.Error}>
                                        {getIn(errors, `images[${index}].date`)}
                                      </div>
                                    )}
                                </div>
                              </div>
                            </div>
                          </SwiperSlide>
                        ))}
                    </div>
                  </Swiper>
                )}
              ></FieldArray>
            </FormikProvider>
            {values.images && values.images?.length > 1 && (
              <div className={styles.PaginationContainer}>
                <ArrowLeftSlideShow
                  onClick={() => {
                    if (slideActive > 0) {
                      swiperRef.current?.slidePrev()
                    }
                  }}
                  className={classNames('me-3', {
                    pointer: slideActive > 0,
                  })}
                  fill={
                    slideActive > 0
                      ? 'var(--primary)'
                      : 'var(--colori-neutri-gray-2)'
                  }
                />
                <div className={styles.CurrentSlide}>
                  {slideActive + 1} / {values.images?.length}
                </div>
                <ArrowRightSlideShow
                  onClick={() => {
                    if (slideActive < values.images?.length - 1) {
                      swiperRef.current?.slideNext()
                    }
                  }}
                  className={classNames('ms-3', {
                    pointer: slideActive < values.images?.length - 1,
                  })}
                  fill={
                    slideActive < values.images?.length - 1
                      ? 'var(--primary)'
                      : 'var(--colori-neutri-gray-2)'
                  }
                />
              </div>
            )}
            <div className={styles.CardImageToUpload}>
              {uploadCategories && (
                <span className={styles.Categorie}>
                  <strong>{t('categorie')}:</strong>
                  {uploadCategories.map((c, i) => (
                    <div
                      className="py-2"
                      style={{
                        borderBottom: '1px solid var(--primary)',
                      }}
                      key={i}
                    >
                      {c.replace(/\+/g, ' ')}
                    </div>
                  ))}
                </span>
              )}
            </div>
            <input
              type="file"
              className="d-none"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setFieldValue(
                    `images[${slideActive}].file`,
                    e.target.files[0]
                  )
                }
              }}
              ref={inputFileRef}
              hidden={true}
              accept="image/*"
            />
            <div className={styles.ContainerButtons}>
              <button
                type="button"
                className={styles.ButtonRiseleziona}
                onClick={() => {
                  inputFileRef.current?.click()
                }}
              >
                {t('riseleziona')}
              </button>
              <button type="submit" className={styles.ButtonUpload}>
                {isLoading && <Spinner size="sm" />} {t('carica_foto')}
              </button>
            </div>
          </form>
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
      <Modal
        centered
        show={!!uploadWizard}
        onHide={() => setUploadWizard(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t('wizard_upload')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{t('wizard_upload_description')}</p>
        </Modal.Body>
        <Modal.Footer>
          <button
            className={styles.ButtonCancel}
            onClick={() => setUploadWizard(false)}
          >
            {t('annulla')}
          </button>
          <button
            className={styles.ButtonUpload}
            onClick={() => {
              const params = new URLSearchParams(uploadWizard as any)
              window.open(
                `https://commons.wikimedia.org/wiki/Special:UploadWizard?${params.toString()}`,
                '_blank'
              )
              setUploadWizard(false)
              setUploadOpen(false)
              setFileList(null)
            }}
          >
            {t('continua')}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default BlockUploadFormik

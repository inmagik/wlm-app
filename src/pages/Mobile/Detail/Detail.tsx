import { useParams } from 'react-router-dom'
import Layout from '../../../components/Mobile/Layout'
import { useMonument } from '../../../hooks/monuments'
import { parseSmartSlug } from '../../../utils'
import styles from './Detail.module.css'
import { ReactComponent as Bell } from '../../../assets/bell.svg'
import { ReactComponent as Castello } from '../../../assets/castelli.svg'
import { ReactComponent as Camera } from '../../../assets/camera.svg'
import { ReactComponent as CameraWhite } from '../../../assets/camera-white.svg'
import { ReactComponent as CloseWhite } from '../../../assets/close-white.svg'
import { useTranslation } from 'react-i18next'
import { Swiper, SwiperSlide } from 'swiper/react'
import { type Swiper as SwiperRef } from 'swiper'
import 'swiper/css'
import { useRef, useState } from 'react'
import classNames from 'classnames'

export default function Detail() {
  const { slug } = useParams()
  const monument = useMonument(parseSmartSlug(slug!))
  const [showAllImages, setShowAllImages] = useState(false)
  const [slideShowActive, setSlideShowActive] = useState(0)
  const [infoSlideSlideShow, setInfoSlideSlideShow] = useState(false)
  const firstThreeImages = monument?.pictures.slice(0, 3)
  const [slideActive, setSlideActive] = useState(0)
  const { t } = useTranslation()
  const inputFileRef = useRef<HTMLInputElement>(null)
  const swiperRef = useRef<SwiperRef>()
  const swiperSlideShowRef = useRef<SwiperRef>()
  const picturesById =
    monument?.pictures.reduce((acc, picture) => {
      acc[picture.id] = picture
      return acc
    }, {} as Record<string, (typeof monument.pictures)[0]>) ?? {}

  return (
    <Layout>
      <div className={styles.DettaglioContainer}>
        <div className={styles.DettaglioInfoCard}>
          <div className={styles.PresenzaInConcorso}>
            <Bell className="me-2" /> Il Monumento fa parte del concorso
          </div>
          {firstThreeImages.length > 0 && (
            <Swiper
              onPaginationShow={() => {
                console.log('Pagination show')
              }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper
              }}
              onSlideChange={(swiper) => {
                setSlideActive(swiper.activeIndex)
              }}
              className={styles.Swiper}
            >
              {firstThreeImages.map((picture) => (
                <SwiperSlide
                  onClick={() => {
                    console.log('ciao')
                    setShowAllImages(true)
                    setSlideShowActive(picture.id)
                  }}
                  key={picture.id}
                >
                  <div
                    className={styles.BlockImage}
                    style={{
                      backgroundImage: `url(${picture.image_url})`,
                    }}
                  ></div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
          <div className={styles.PaginationImagesDots}>
            {firstThreeImages.map((_, i) => (
              <div
                key={i}
                className={classNames(styles.PaginationDot, {
                  [styles.PaginationDotActive]:
                    swiperRef.current?.activeIndex === i,
                })}
                onClick={() => {
                  swiperRef.current?.slideTo(i)
                }}
              ></div>
            ))}
          </div>
          <div className={styles.CardInfoMonument}>
            <div className="d-flex justify-content-between w-100">
              <div className="d-flex">
                <Castello className="me-1" />
                <div className="ms-1">
                  <div>
                    <div className={styles.MonumentTitle}>
                      {monument?.label}
                    </div>
                    <div className={styles.Comune}>
                      {monument?.municipality_label} ({monument?.province_label}
                      )
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.PicturesCount}>
                {monument?.pictures_count} <Camera className="ms-1" />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.CardImages}>
          <div className={styles.ImmaginiWlmTitle}>{t('immagini_wlm')}</div>
          <div className={styles.ContainerImages}>
            {monument?.pictures.slice(0, 12).map((picture) => (
              <div
                key={picture.id}
                className={styles.Image}
                onClick={() => {
                  setShowAllImages(true)
                  setSlideShowActive(picture.id)
                }}
                style={{
                  backgroundImage: `url(${picture.image_url})`,
                }}
              ></div>
            ))}
          </div>
        </div>
        <div className={styles.FixedButtonUpload}>
          <button
            onClick={() => {
              inputFileRef.current?.click()
            }}
            className={styles.ButtonUpload}
          >
            <CameraWhite />
          </button>
          <input
            ref={inputFileRef}
            type="file"
            className="d-none"
            accept="image/*"
          />
        </div>
      </div>
      {showAllImages && (
        <div className={styles.SlideShow}>
          <Swiper
            className="h-100"
            onSwiper={(swiper) => {
              swiperRef.current = swiper
            }}
            onSlideChange={(swiper) => {
              setSlideShowActive(swiper.activeIndex)
            }}
            onInit={(swiper) => {
              swiper.slideTo(
                Object.keys(picturesById).indexOf(String(slideShowActive)),
                0
              )
              setTimeout(() => {
                setInfoSlideSlideShow(true)
              }, 100)
            }}
          >
            {monument?.pictures.map((picture) => (
              <SwiperSlide key={picture.id}>
                <div
                  className={styles.SlideShowImage}
                  style={{
                    backgroundImage: `url(${picture.image_url})`,
                  }}
                ></div>
                <div
                  className={styles.InfoBlockSlideShow}
                  style={{
                    opacity: infoSlideSlideShow ? 1 : 0,
                    bottom: infoSlideSlideShow ? 0 : -100,
                    minHeight: infoSlideSlideShow ? 151 : 0,
                    transition: 'all 0.3s ease-in-out',
                  }}
                >
                  <div className={styles.InfoBlockSlideShowTitle}>
                    {monument?.label}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className={styles.SlideShowClose}>
            <CloseWhite
              onClick={() => {
                setShowAllImages(false)
                setInfoSlideSlideShow(false)
              }}
            />
          </div>
        </div>
      )}
    </Layout>
  )
}

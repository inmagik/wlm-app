import { useRef } from 'react'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import { Monument } from '../../../types'
import { ReactComponent as CloseWhite } from '../../../assets/close-white.svg'
import { ReactComponent as CameraTransparent } from '../../../assets/camera-transparent.svg'
import styles from './SlideShow.module.css'
import IconMonument from '../../IconMonument'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import { Navigation } from 'swiper'

interface Props {
  monument: Monument
  slideShowActive: number
  setSlideShowActive: (slideShowActive: number) => void
  setInfoSlideSlideShow: (infoSlideSlideShow: boolean) => void
  infoSlideSlideShow: boolean
  setShowAllImages: (showAllImages: boolean) => void
}

export default function SlideShow({
  monument,
  slideShowActive,
  setSlideShowActive,
  infoSlideSlideShow,
  setInfoSlideSlideShow,
  setShowAllImages,
}: Props) {
  const swiperSlideShowRef = useRef<any>()
  const picturesById =
    monument?.pictures.reduce((acc, picture) => {
      acc[picture.id] = picture
      return acc
    }, {} as Record<string, (typeof monument.pictures)[0]>) ?? {}
  const { t } = useTranslation()
  return (
    <div className={styles.SlideShow}>
      <Swiper
        className="h-100"
        onSwiper={(swiper) => {
          swiperSlideShowRef.current = swiper
        }}
        modules={[Navigation]}
        navigation
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
        {monument?.pictures.map((picture, i) => (
          <SwiperSlide key={i}>
            <div
              className={styles.SlideShowImage}
              style={{
                backgroundImage: `url("${picture.image_url}")`,
              }}
            ></div>
            <div
              className={styles.InfoBlockSlideShow}
              style={{
                opacity: infoSlideSlideShow ? 1 : 0,
                bottom: infoSlideSlideShow ? 0 : -100,
                minHeight: infoSlideSlideShow ? 151 : 0,
                transition: 'all 0.5s ease-in-out',
              }}
            >
              <div className="d-flex">
                <div>
                  <IconMonument monument={monument} />
                </div>
                <div className="ms-3">
                  <div className={styles.InfoBlockSlideShowTitle}>
                    {monument?.label}
                  </div>
                  <div className="d-flex align-items-center mt-1">
                    <div className={styles.Municipality}>
                      {monument.municipality_label}
                    </div>
                    <div className="ms-2">
                      <CameraTransparent />
                    </div>
                    <div className={styles.PicturesCount}>
                      {monument.pictures_wlm_count} {t('foto')}
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    {picture.data?.Artist && (
                      <div
                        className={styles.Artist}
                        dangerouslySetInnerHTML={{
                          __html: picture.data?.Artist,
                        }}
                      ></div>
                    )}
                    <div className={styles.DateImage}>
                      {dayjs(picture.data?.DateTime).format('DD/MM/YYYY')}
                    </div>
                  </div>
                  <div className={styles.License}>{picture.data?.License}</div>
                  {picture.data?.ImageDescription && (
                    <div
                      className={styles.Description}
                      dangerouslySetInnerHTML={{
                        __html: picture.data?.ImageDescription,
                      }}
                    ></div>
                  )}
                </div>
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
  )
}

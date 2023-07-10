import { useRef } from 'react'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import { Monument } from '../../../types'
import { ReactComponent as CloseWhite } from '../../../assets/close-white.svg'
import styles from './SlideShow.module.css'

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
  const swiperSlideShowRef = useRef<SwiperRef>()
  const picturesById =
    monument?.pictures.reduce((acc, picture) => {
      acc[picture.id] = picture
      return acc
    }, {} as Record<string, (typeof monument.pictures)[0]>) ?? {}
  return (
    <div className={styles.SlideShow}>
      <Swiper
        className="h-100"
        onSwiper={(swiper) => {
          swiperSlideShowRef.current = swiper
        }}
        onSlideChange={(swiper) => {
          setSlideShowActive(swiper.activeIndex)
        }}
        onInit={(swiper) => {
          swiper.slideTo(
            Object.keys(picturesById).indexOf(String(slideShowActive)) - 1,
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
  )
}

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Monument } from '../../../types'
import { ReactComponent as CloseWhite } from '../../../assets/close-white.svg'
import { ReactComponent as CameraTransparent } from '../../../assets/camera-transparent.svg'
import { ReactComponent as ArrowLeftBig } from '../../../assets/arrow-left-big.svg'
import { ReactComponent as ArrowRightBig } from '../../../assets/arrow-right-big.svg'
import { ReactComponent as CommonLink } from '../../../assets/common-slideshow.svg'
import styles from './SlideShow.module.css'
import IconMonument from '../../IconMonument'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import { Navigation } from 'swiper'
import { useMediaQuery } from 'usehooks-ts'
import classNames from 'classnames'

interface Props {
  monument: Monument
  slideShowActive: number
  setSlideShowActive: (slideShowActive: number) => void
  setInfoSlideSlideShow: (infoSlideSlideShow: boolean) => void
  infoSlideSlideShow: boolean
  setShowAllImages: (showAllImages: boolean) => void
}

function cleanTitle(title: string) {
  // removes the string "File:" and the extension from the title
  return title.replace('File:', '').split('.')[0]
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
  const { t } = useTranslation()
  const [infoSlide, setInfoSlide] = useState<boolean>(true)
  const isMobile = useMediaQuery('(max-width: 767px)')

  const handleCloseSlideShowOnEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowAllImages(false)
      }
    },
    [setSlideShowActive]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleCloseSlideShowOnEsc)
    return () => {
      document.removeEventListener('keydown', handleCloseSlideShowOnEsc)
    }
  }, [handleCloseSlideShowOnEsc])

  const picturesToUse = useMemo(() => {
    return monument.pictures
  }, [monument])

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
          swiper.slideTo(slideShowActive, 0)
          setTimeout(() => {
            setInfoSlideSlideShow(true)
          }, 100)
        }}
      >
        {picturesToUse.map((picture, i) => (
          <SwiperSlide
            onClick={() => {
              setInfoSlide(!infoSlide)
            }}
            key={i}
          >
            <div
              className={styles.SlideShowImage}
              style={{
                backgroundImage: `url("${picture.image_url}")`,
              }}
            ></div>
            <div
              className={styles.InfoBlockSlideShow}
              style={{
                opacity: infoSlideSlideShow && infoSlide ? 1 : 0,
                // bottom: infoSlideSlideShow && infoSlide ? 0 : -100,
                // minHeight: infoSlideSlideShow && infoSlide ? 151 : 0,
                transition: 'all 0.5s ease-in-out',
              }}
            >
              <div className="d-flex align-items-center">
                <div className="d-flex">
                  <div>
                    <IconMonument monument={monument} />
                  </div>
                  <div
                    className="ms-3 border-end pe-4"
                    style={{
                      maxWidth: isMobile ? 'unset' : 'calc(500px)',
                    }}
                  >
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
                        {monument.pictures_count} {t('foto')}
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      {picture.data?.Artist && (
                        <div
                          className={styles.Artist}
                          dangerouslySetInnerHTML={{
                            __html:
                              String(picture.data?.Artist).replace(
                                /(<([^>]+)>)/gi,
                                ''
                              ) || '',
                          }}
                        ></div>
                      )}
                      <div className={styles.DateImage}>
                        {dayjs(picture.data?.DateTime).format('DD/MM/YYYY')}
                      </div>
                    </div>
                    <div className={styles.License}>
                      {picture.data?.License}
                    </div>
                    {picture.data?.title && (
                      <div className={styles.PictureTitle}>
                        {cleanTitle(picture.data.title)}
                      </div>
                    )}

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
                <div className="ms-3">
                  <a
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                    href={`https://commons.wikimedia.org/wiki/${picture.data?.title}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <CommonLink />
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={styles.CurrentImage}>
        {slideShowActive + 1} / {picturesToUse.length}
      </div>
      {!isMobile && picturesToUse.length > 1 && (
        <div className={styles.PrevArrow}>
          <ArrowLeftBig
            className={classNames({
              pointer: slideShowActive > 0,
            })}
            fill={slideShowActive > 0 ? '#fff' : 'var(--colori-neutri-gray)'}
            onClick={() => {
              if (slideShowActive > 0) swiperSlideShowRef.current.slidePrev()
            }}
          />
        </div>
      )}
      {!isMobile && picturesToUse.length > 1 && (
        <div className={styles.NextArrow}>
          <ArrowRightBig
            className={classNames({
              pointer: slideShowActive < picturesToUse.length - 1,
            })}
            fill={
              slideShowActive < picturesToUse.length - 1
                ? '#fff'
                : 'var(--colori-neutri-gray)'
            }
            onClick={() => {
              if (slideShowActive < picturesToUse.length - 1)
                swiperSlideShowRef.current.slideNext()
            }}
          />
        </div>
      )}
      <div
        className={styles.SlideShowClose}
        onClick={() => {
          setShowAllImages(false)
        }}
      >
        <button className={styles.ButtonCloseSlideshow}>
          <CloseWhite />
        </button>
      </div>
    </div>
  )
}

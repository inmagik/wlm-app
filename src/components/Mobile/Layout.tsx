import { useEffect, useRef, useState } from 'react'
import { SwiperSlide, Swiper } from 'swiper/react'
import { ReactComponent as Close } from '../../assets/close-onboarding.svg'
import { ReactComponent as ArrowLeftSlideShow } from '../../assets/left-slideshow-arrow.svg'
import { ReactComponent as ArrowRightSlideShow } from '../../assets/right-slideshow-arrow.svg'
import BottomNavigation from '../BottomNavigation'
import Topbar from './Topbar'
import { Navigation } from 'swiper'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

const slidesIt = [
  '/slides/mobile/it/slide1.png',
  '/slides/mobile/it/slide2.png',
  '/slides/mobile/it/slide3.png',
  '/slides/mobile/it/slide4.png',
  '/slides/mobile/it/slide5.png',
  '/slides/mobile/it/slide6.png',
  '/slides/mobile/it/slide7.png',
  '/slides/mobile/it/slide8.png',
  '/slides/mobile/it/slide9.png',
]

const slidesEn = [
  '/slides/mobile/en/slide1.png',
  '/slides/mobile/en/slide2.png',
  '/slides/mobile/en/slide3.png',
  '/slides/mobile/en/slide4.png',
  '/slides/mobile/en/slide5.png',
  '/slides/mobile/en/slide6.png',
  '/slides/mobile/en/slide7.png',
  '/slides/mobile/en/slide8.png',
  '/slides/mobile/en/slide9.png',
]

function SlidesPresentazione({
  setPresentazione,
}: {
  setPresentazione: (presentazione: boolean) => void
}) {
  const [activeSlide, setActiveSlide] = useState<number>(0)
  const sliderRef = useRef<any>()
  const { i18n } = useTranslation()
  const slidesToUse = i18n.language === 'it' ? slidesIt : slidesEn
  return (
    <div
      className="w-100 h-100"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 12,
        backgroundColor: 'rgba(0,0,0,0.6)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Swiper
        slidesPerView={1}
        onSlideChange={(swiper) => {
          setActiveSlide(swiper.activeIndex)
        }}
        className="position-relative"
        // className="h-100 w-100"
        onSwiper={(swiper) => {
          sliderRef.current = swiper
        }}
        modules={[Navigation]}
        spaceBetween={20}
        navigation
        onInit={(swiper) => {
          swiper.slideTo(activeSlide, 0)
        }}
        style={{
          height: '60%',
          width: '80%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 'auto',
          marginBottom: 'auto',
          marginLeft: 'auto',
          marginRight: 'auto',
          //   backgroundColor: 'rgba(0,0,0,0.2)',
          //   zIndex: 12,
        }}
      >
        {slidesToUse.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="h-100 w-100">
              <img
                src={slide}
                alt=""
                className="h-100 w-100"
                style={{
                  objectFit: 'contain',
                  borderRadius: 20,
                  //   backgroundColor: 'rgba(0,0,0,0.2)',
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        onClick={() => {
          setPresentazione(false)
          localStorage.setItem('presentazione', 'true')
        }}
        className="button-close-slides-mobile"
      >
        <Close />
      </div>
      <div className={'pagination-container-onboarding'}>
        <ArrowLeftSlideShow
          onClick={() => {
            if (activeSlide > 0) {
              sliderRef.current?.slidePrev()
            }
          }}
          className={classNames('me-3', {
            pointer: activeSlide > 0,
          })}
          fill={
            activeSlide > 0
              ? 'var(--colori-neutri-white)'
              : 'var(--colori-neutri-gray-2)'
          }
        />
        <div className={'current-slide-onboarding'}>
          {activeSlide + 1} / {slidesToUse.length}
        </div>
        <ArrowRightSlideShow
          onClick={() => {
            if (activeSlide < slidesToUse.length - 1) {
              sliderRef.current?.slideNext()
            }
          }}
          className={classNames('ms-3', {
            pointer: activeSlide < slidesToUse.length - 1,
          })}
          fill={
            activeSlide < slidesToUse.length - 1
              ? 'var(--colori-neutri-white)'
              : 'var(--colori-neutri-gray-2)'
          }
        />
      </div>
    </div>
  )
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [presentazione, setPresentazione] = useState<boolean>(false)

  useEffect(() => {
    if (!localStorage.getItem('presentazione')) {
      setPresentazione(true)
    }
  }, [])
  return (
    <div className="h-100 w-100">
      {presentazione && (
        <SlidesPresentazione setPresentazione={setPresentazione} />
      )}
      <Topbar />
      <div className="block-content">{children}</div>
      <BottomNavigation />
    </div>
  )
}

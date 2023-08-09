import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { SwiperSlide, Swiper } from 'swiper/react'
import { ReactComponent as Close } from '../../assets/close-onboarding.svg'
import { ReactComponent as ArrowLeftSlideShow } from '../../assets/left-slideshow-arrow.svg'
import { ReactComponent as ArrowRightSlideShow } from '../../assets/right-slideshow-arrow.svg'
import BottomNavigation from '../BottomNavigation'
import Topbar from './Topbar'
import { Navigation } from 'swiper'

const slides = [
  '/slides/desktop/slide1.png',
  '/slides/desktop/slide2.png',
  '/slides/desktop/slide3.png',
  '/slides/desktop/slide4.png',
  '/slides/desktop/slide5.png',
  '/slides/desktop/slide6.png',
  '/slides/desktop/slide7.png',
]

function SlidesPresentazione({
  setPresentazione,
}: {
  setPresentazione: (presentazione: boolean) => void
}) {
  const [activeSlide, setActiveSlide] = useState<number>(0)
  const sliderRef = useRef<any>()
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
      }}
      //   onClick={() => {
      //     setPresentazione(false)
      //     localStorage.setItem('presentazione', 'true')
      //   }}
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
          height:
            'calc(100% - var(--topbar-desktop-height) - var(--bottom-desktop-navigation-height) - 32px)',
          width: '70%',

          marginTop: 'calc(var(--topbar-desktop-height) + 16px)',
          //   backgroundColor: 'rgba(0,0,0,0.2)',
          //   zIndex: 12,
        }}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i} className={'position-relative'}>
            <div
              onClick={() => {
                if (activeSlide === slides.length - 1) {
                  setPresentazione(false)
                  localStorage.setItem('presentazione', 'true')
                }
              }}
              className="h-100 w-100"
            >
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
        className="button-close-slides-mobile pointer"
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
          {activeSlide + 1} / {slides.length}
        </div>
        <ArrowRightSlideShow
          onClick={() => {
            if (activeSlide < slides.length - 1) {
              sliderRef.current?.slideNext()
            }
          }}
          className={classNames('ms-3', {
            pointer: activeSlide < slides.length - 1,
          })}
          fill={
            activeSlide < slides.length - 1
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
      <div className="block-content-desktop">{children}</div>
      <BottomNavigation />
    </div>
  )
}

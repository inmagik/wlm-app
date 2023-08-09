import { useEffect, useRef, useState } from 'react'
import { SwiperSlide, Swiper } from 'swiper/react'
import { ReactComponent as Close } from '../../assets/close-onboarding.svg'
import BottomNavigation from '../BottomNavigation'
import Topbar from './Topbar'
import { Navigation } from 'swiper'

const slides = [
  '/slides/mobile/slide1.png',
  '/slides/mobile/slide2.png',
  '/slides/mobile/slide3.png',
  '/slides/mobile/slide4.png',
  '/slides/mobile/slide5.png',
  '/slides/mobile/slide6.png',
  '/slides/mobile/slide7.png',
  '/slides/mobile/slide8.png',
  '/slides/mobile/slide9.png',
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
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
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
        className="button-close-slides-mobile"
      >
        <Close />
      </div>
      {/* <div className={'slider-prev-arrow'}>
        <ArrowLeftBig
          className={classNames({
            pointer: activeSlide > 0,
          })}
          fill={activeSlide > 0 ? 'var(--primary)' : '#fff'}
          onClick={(e) => {
            e.stopPropagation()
            if (activeSlide > 0) sliderRef.current.slidePrev()
          }}
        />
      </div>

      <div className={'slider-next-arrow'}>
        <ArrowRightBig
          className={classNames({
            pointer: activeSlide < slides.length - 1,
          })}
          fill={activeSlide < slides.length - 1 ? 'var(--primary)' : '#fff'}
          onClick={(e) => {
            e.stopPropagation()
            if (activeSlide < slides.length - 1) sliderRef.current.slideNext()
          }}
        />
      </div> */}
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

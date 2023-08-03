import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { SwiperSlide, Swiper } from 'swiper/react'
import { ReactComponent as Close } from '../../assets/close-white.svg'
import { ReactComponent as ArrowLeftBig } from '../../assets/arrow-left-big.svg'
import { ReactComponent as ArrowRightBig } from '../../assets/arrow-right-big.svg'
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
  '/slides/desktop/slide8.png',
  '/slides/desktop/slide9.png',
  '/slides/desktop/slide11.png',
  '/slides/desktop/slide10.png',
  '/slides/desktop/slide12.png',
  '/slides/desktop/slide13.png',
]

function SlidesPresentazione({
  setPresentazione,
}: {
  setPresentazione: (presentazione: boolean) => void
}) {
  const [activeSlide, setActiveSlide] = useState<number>(0)
  const sliderRef = useRef<any>()
  return (
    <div className="w-100 h-100">
      <Swiper
        className="h-100 w-100 position-absolute"
        slidesPerView={1}
        onSlideChange={(swiper) => {
          setActiveSlide(swiper.activeIndex)
        }}
        onSwiper={(swiper) => {
          sliderRef.current = swiper
        }}
        modules={[Navigation]}
        navigation
        onInit={(swiper) => {
          swiper.slideTo(activeSlide, 0)
        }}
        style={{
          zIndex: 12,
          left: 0,
          top: 0,
          bottom: 0,
          right: 0,
          background: 'var(--colori-neutri-gray-2)',
        }}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i} className="w-100 h-100">
            <div
              onClick={() => {
                if (activeSlide === slides.length - 1) {
                  setPresentazione(false)
                  localStorage.setItem('presentazione', 'true')
                }
              }}
              className="h-100 w-100"
              style={{
                backgroundImage: `url("${slide}")`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
            ></div>
          </SwiperSlide>
        ))}
        <div
          onClick={() => {
            setPresentazione(false)
            localStorage.setItem('presentazione', 'true')
          }}
          className="button-close-slides"
        >
          <Close />
        </div>
      </Swiper>
      <div className={'slider-prev-arrow'}>
        <ArrowLeftBig
          className={classNames({
            pointer: activeSlide > 0,
          })}
          fill={activeSlide > 0 ? 'var(--primary)' : '#fff'}
          onClick={() => {
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
          onClick={() => {
            if (activeSlide < slides.length - 1) sliderRef.current.slideNext()
          }}
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

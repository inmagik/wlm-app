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
    <div
      className="w-100 h-100"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 12,
        backgroundColor: 'rgba(0,0,0,0.2)',
      }}
      onClick={() => {
        setPresentazione(false)
        localStorage.setItem('presentazione', 'true')
      }}
    >
      <Swiper
        slidesPerView={1}
        onSlideChange={(swiper) => {
          setActiveSlide(swiper.activeIndex)
        }}
        // className="h-100 w-100"
        onSwiper={(swiper) => {
          sliderRef.current = swiper
        }}
        modules={[Navigation]}
        navigation
        onInit={(swiper) => {
          swiper.slideTo(activeSlide, 0)
        }}
        style={{
          height:
            'calc(100% - var(--topbar-desktop-height) - var(--bottom-desktop-navigation-height))',
          width: '80%',

          marginTop: 'var(--topbar-desktop-height)',
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
              style={{
                backgroundImage: `url("${slide}")`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                borderRadius: 10,
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

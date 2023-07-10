import { useParams } from 'react-router-dom'
import Layout from '../../../components/Mobile/Layout'
import { useMonument } from '../../../hooks/monuments'
import { parseSmartSlug } from '../../../utils'
import styles from './Detail.module.css'
import { ReactComponent as Bell } from '../../../assets/bell.svg'
import { ReactComponent as Camera } from '../../../assets/camera.svg'
import { ReactComponent as CameraWhite } from '../../../assets/camera-white.svg'
import { ReactComponent as Direction } from '../../../assets/direction.svg'
import { ReactComponent as SmileBad } from '../../../assets/smile-bad.svg'
import { useTranslation } from 'react-i18next'
import { Swiper, SwiperSlide } from 'swiper/react'
import { type Swiper as SwiperRef } from 'swiper'
import 'swiper/css'
import { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import IconMonument from '../../../components/IconMonument'
import SlideShow from '../../../components/Mobile/SlideShow'
import { Map as MapOl, View } from 'ol'
import { fromLonLat } from 'ol/proj'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import MapIcon from '../../../components/Icons/MapIcon'

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
  const mapElement = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<MapOl | null>(null)

  useEffect(() => {
    if (!mapElement.current) return
    const initialMap = new MapOl({
      target: mapElement.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      controls: [],
      view: new View({
        center: fromLonLat(
          (monument?.position.coordinates as [number, number]) ?? [0, 0]
        ),
        zoom: 11,
        minZoom: 11,
        maxZoom: 11,
      }),
    })

    setMap(initialMap)

    return () => initialMap.setTarget(undefined as unknown as HTMLElement)
  }, [monument])

  return (
    <Layout>
      <div className={styles.DettaglioContainer}>
        <div className={styles.DettaglioInfoCard}>
          <div className={styles.PresenzaInConcorso}>
            <Bell className="me-2" /> Il Monumento fa parte del concorso
          </div>
          {firstThreeImages.length > 0 ? (
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
          ) : (
            <div className={styles.BoxNoImages}>
              <div>{t('ancora_nessuna_foto_all_orizzonte')}</div>
              <div>
                <SmileBad className="mt-2" />
              </div>
            </div>
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
                <IconMonument monument={monument} />
                <div className="ms-2">
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
          <button className={styles.ButtonShowAllImages}>
            {t('guarda_tutte_su_wikimediacommons')}
          </button>
        </div>
        <div className={styles.MapContainer}>
          <div className={styles.Map} ref={mapElement}></div>
          <button className={styles.GuardaInMappa}>
            <MapIcon /> {t('guarda_in_mappa')}
          </button>
          <div className={styles.Direction}>
            <Direction />
          </div>
        </div>
        <div className={styles.CardExternalLinks}>
          <div className={styles.ExternalLinksTitle}>
            {t('collegamenti_esterni')}
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
        <SlideShow
          infoSlideSlideShow={infoSlideSlideShow}
          setInfoSlideSlideShow={setInfoSlideSlideShow}
          setShowAllImages={setShowAllImages}
          setSlideShowActive={setSlideShowActive}
          slideShowActive={slideShowActive}
          monument={monument}
        />
      )}
    </Layout>
  )
}

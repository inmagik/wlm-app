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
import { ReactComponent as Reasonator } from '../../../assets/reasonetor.svg'
import { ReactComponent as ArrowRight } from '../../../assets/arrow-right.svg'
import { ReactComponent as Wikidata } from '../../../assets/wikidata.svg'
import { ReactComponent as Wikipedia } from '../../../assets/wikipedia.svg'
import { ReactComponent as NoCoordinates } from '../../../assets/no-coordinates.svg'
import { useTranslation } from 'react-i18next'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperClass  from 'swiper'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { Fragment, useEffect, useRef, useState } from 'react'
import IconMonument from '../../../components/IconMonument'
import SlideShow from '../../../components/Mobile/SlideShow'
import { Feature, Map as MapOl, View } from 'ol'
import { fromLonLat } from 'ol/proj'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import MapIcon from '../../../components/Icons/MapIcon'
import VectorTileLayer from 'ol/layer/VectorTile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { Point } from 'ol/geom'
import Style from 'ol/style/Style'
import Icon from 'ol/style/Icon'
import getMarkerMap from '../../../components/MarkerMap/MarkerMap'
import BlockUpload from '../../../components/Mobile/BlockUpload'

export default function Detail() {
  const { slug } = useParams()
  const monument = useMonument(parseSmartSlug(slug!))
  const [showAllImages, setShowAllImages] = useState(false)
  const [slideShowActive, setSlideShowActive] = useState(0)
  const [infoSlideSlideShow, setInfoSlideSlideShow] = useState(false)
  const [slideActive, setSlideActive] = useState(0)
  const { t } = useTranslation()
  const inputFileRef = useRef<HTMLInputElement>(null)
  const swiperRef = useRef<SwiperClass>()
  const mapElement = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<MapOl | null>(null)
  const [imageUpload, setImageUpload] = useState<FileList | null>(null)
  const [showModalUpload, setShowModalUpload] = useState(false)

  const groupsOf12Pictures = monument?.pictures?.reduce((acc, curr, index) => {
    const groupIndex = Math.floor(index / 12)
    if (!acc[groupIndex]) {
      acc[groupIndex] = []
    }
    acc[groupIndex].push(curr)
    return acc
  }, [] as any[])

  useEffect(() => {
    if (!mapElement.current) return

    const initialMap = new MapOl({
      interactions: [],
      target: mapElement.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorTileLayer({}),
      ],
      controls: [],
      view: new View({
        center: fromLonLat(
          monument?.position?.coordinates
            ? monument?.position.coordinates
            : [12.56738, 41.87194]
        ),
        zoom: 13,
      }),
      moveTolerance: 10,
    })

    const iconFeature = new Feature({
      geometry: new Point(
        fromLonLat(
          monument?.position?.coordinates
            ? monument?.position.coordinates
            : [12.56738, 41.87194]
        )
      ),
    })

    const iconStyle = new Style({
      image: new Icon({
        src: getMarkerMap({
          monument: monument!,
        }),
      }),
    })

    iconFeature.setStyle(iconStyle)

    const vectorSource = new VectorSource({
      features: [iconFeature],
    })

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    })

    initialMap.addLayer(vectorLayer)

    setMap(initialMap)

    return () => initialMap.setTarget(undefined as unknown as HTMLElement)
  }, [])

  return (
    <Layout>
      <div className={styles.DettaglioContainer}>
        <div className={styles.DettaglioInfoCard}>
          <div className={styles.PresenzaInConcorso}>
            <Bell className="me-2" /> Il Monumento fa parte del concorso
          </div>
          {monument.pictures.length > 0 ? (
            <Swiper
              pagination={{
                dynamicBullets: true,
              }}
              // @ts-ignore
              modules={[Pagination]}
              onSwiper={(swiper) => {
                swiperRef.current = swiper
              }}
              onSlideChange={(swiper) => {
                setSlideActive(swiper.activeIndex)
              }}
              className={styles.Swiper}
            >
              {monument.pictures.map((picture) => (
                <SwiperSlide
                  onClick={() => {
                    setShowAllImages(true)
                    setSlideShowActive(picture.id)
                  }}
                  key={picture.id}
                >
                  <div
                    className={styles.BlockImage}
                    style={{
                      backgroundImage: `url("${picture.image_url}")`,
                    }}
                  ></div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <>
              <div className={styles.BoxNoImages}>
                <div>{t('ancora_nessuna_foto_all_orizzonte')}</div>
                <div>
                  <SmileBad className="mt-2" />
                </div>
              </div>
              <button
                onClick={() => {
                  inputFileRef.current?.click()
                }}
                className={styles.ButtonCaricaFoto}
              >
                {t('carica_foto')}
              </button>
            </>
          )}
          <div className={styles.CardInfoMonument}>
            <div className="d-flex justify-content-between w-100">
              <div className="d-flex">
                <IconMonument monument={monument} />
                <div className="ms-2">
                  <div>
                    <div className={styles.MonumentTitle}>
                      {monument?.label}
                    </div>
                    {monument.municipality_label && (
                      <div className={styles.Comune}>
                        <a
                          target="_blank"
                          rel="noreferrer"
                          className="no-link"
                          href={`https://www.google.com/maps/dir/?api=1&destination=${monument?.position?.coordinates[1]},${monument?.position?.coordinates[0]}&name=${monument?.label}`}
                        >
                          {monument?.municipality_label} (
                          {monument?.province_label})
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.PicturesCount}>
                {monument?.pictures_count} <Camera className="ms-1" />
              </div>
            </div>
          </div>
        </div>
        {monument?.pictures.length > 0 && (
          <div className={styles.CardImages}>
            <div className={styles.ImmaginiWlmTitle}>{t('immagini_wlm')}</div>
            <Swiper
              pagination={{ dynamicBullets: true }}
              className={styles.Swiper}
              modules={[Pagination]}
            >
              {groupsOf12Pictures.map((group, index) => (
                <Fragment key={index}>
                  {group.length > 0 && (
                    <SwiperSlide>
                      <div className={styles.ContainerImages}>
                        {group.map((picture: any) => (
                          <div
                            key={picture.id}
                            className={styles.Image}
                            onClick={() => {
                              setShowAllImages(true)
                              setSlideShowActive(picture.id)
                            }}
                            style={{
                              backgroundImage: `url("${picture.image_url}")`,
                            }}
                          ></div>
                        ))}
                      </div>
                    </SwiperSlide>
                  )}
                </Fragment>
              ))}
            </Swiper>
            <div className={styles.ContainerImages}>
              {/* {monument?.pictures.slice(0, 12).map((picture) => (
                <div
                  key={picture.id}
                  className={styles.Image}
                  onClick={() => {
                    setShowAllImages(true)
                    setSlideShowActive(picture.id)
                  }}
                  style={{
                    backgroundImage: `url("${picture.image_url}")`,
                  }}
                ></div>
              ))} */}
            </div>
            <button className={styles.ButtonShowAllImages}>
              {t('guarda_tutte_su_wikimediacommons')}
            </button>
          </div>
        )}
        <div className={styles.MapContainer}>
          <div className={styles.Map} ref={mapElement}></div>
          {monument?.position?.coordinates && (
            <button className={styles.GuardaInMappa}>
              <MapIcon /> {t('guarda_in_mappa')}
            </button>
          )}
          <div>
            {monument?.position?.coordinates && (
              <a
                className={styles.Direction}
                href={`https://www.google.com/maps/dir/?api=1&destination=${monument?.position?.coordinates[1]},${monument?.position?.coordinates[0]}`}
                target="_blank"
              >
                <Direction />
              </a>
            )}
          </div>
          {!monument?.position?.coordinates && (
            <div className={styles.NoMap}>
              <div>
                <NoCoordinates />
              </div>
              <div className={styles.NoCoordinatesTitle}>
                {t('nessuna_coordinata')}
              </div>
              <div className={styles.NoCoordinatesDescription}>
                {t('questo_monumento_non_ha_coordinate')}
              </div>
            </div>
          )}
        </div>
        <div className={styles.CardExternalLinks}>
          <div className={styles.ExternalLinksTitle}>
            {t('collegamenti_esterni')}
          </div>
          <div className={styles.ExternalLink}>
            <div>
              <Reasonator className="me-1" /> Reasonator
            </div>
            <div>
              <ArrowRight />
            </div>
          </div>
          <div className={styles.ExternalLink}>
            <div>
              <Wikidata className="me-1" /> Wikidata
            </div>
            <div>
              <ArrowRight />
            </div>
          </div>
          <div className={styles.ExternalLink}>
            <div>
              <Wikipedia className="me-1" />
            </div>
            <div>
              <ArrowRight />
            </div>
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
            multiple
            onChange={(e) => {
              if (e.target.files && e.target.files?.length > 0) {
                setImageUpload(e.target.files)
                setShowModalUpload(true)
              }
            }}
            type="file"
            hidden={true}
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
      <BlockUpload
        fileList={imageUpload}
        setUploadOpen={setShowModalUpload}
        uploadOpen={showModalUpload}
        setFileList={setImageUpload}
      />
    </Layout>
  )
}

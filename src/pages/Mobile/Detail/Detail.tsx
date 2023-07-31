import { useLocation, useNavigate, useParams } from 'react-router-dom'
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
import { ReactComponent as InfoVedute } from '../../../assets/info-vedute.svg'
import { ReactComponent as InfoVeduteDark } from '../../../assets/info-vedute-dark.svg'
import { ReactComponent as Close } from '../../../assets/close.svg'
import { ReactComponent as ArrowLeftSlideShow } from '../../../assets/left-slideshow-arrow.svg'
import { ReactComponent as ArrowRightSlideShow } from '../../../assets/right-slideshow-arrow.svg'
import { useTranslation } from 'react-i18next'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperClass, { Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import { Fragment, Suspense, useEffect, useMemo, useRef, useState } from 'react'
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
import VeduteInsiemeModal from '../../../components/Mobile/VeduteInsiemeModal'
import LangLink from '../../../components/LangLink'
import { Monument } from '../../../types'
import classNames from 'classnames'
import { useQsFilters } from '../../../hooks/filters'
import dayjs from 'dayjs'
import { useMediaQuery } from 'usehooks-ts'
import { useAuthUser } from 'use-eazy-auth'

interface Props {
  monumentId?: number
  setDetail?: (monument: number | null) => void
  isDesktop?: boolean
}

interface DetailBlockProps {
  monument: Monument | null
  setDetail?: (monument: number | null) => void
  isDesktop?: boolean
}

const getFilters = (params: URLSearchParams) => ({
  search: params.get('search') ?? '',
  municipality: params.get('municipality') ?? '',
  ordering: params.get('ordering') ?? 'label',
  in_contest: params.get('in_contest') ?? 'true',
  only_without_pictures: params.get('only_without_pictures') ?? '',
  category: params.get('category') ?? '',
  user_lat: Number(params.get('user_lat')) ?? '',
  user_lon: Number(params.get('user_lon')) ?? '',
  monument_lat: Number(params.get('monument_lat')) ?? '',
  monument_lon: Number(params.get('monument_lon')) ?? '',
  map_zoom: Number(params.get('map_zoom')) ?? '',
  map_lat: Number(params.get('map_lat')) ?? '',
  map_lon: Number(params.get('map_lon')) ?? '',
})

function DetailBlock({ monument, setDetail, isDesktop }: DetailBlockProps) {
  const [showAllImages, setShowAllImages] = useState(false)
  const [slideShowActive, setSlideShowActive] = useState(0)
  const [infoSlideSlideShow, setInfoSlideSlideShow] = useState(false)
  const [slideActive, setSlideActive] = useState(0)
  const [slideGroup12, setSlideGroup12] = useState(0)
  const { t, i18n } = useTranslation()
  const inputFileRef = useRef<HTMLInputElement>(null)
  const swiperRef = useRef<SwiperClass>()
  const swiperBlock12 = useRef<SwiperClass>()
  const mapElement = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<MapOl | null>(null)
  const [imageUpload, setImageUpload] = useState<FileList | null>(null)
  const [showModalUpload, setShowModalUpload] = useState(false)
  const [veduteInsiemeOpen, setVeduteInsiemeOpen] = useState(false)
  const { filters, setFilters } = useQsFilters(getFilters)
  const isMobile = useMediaQuery('(max-width: 768px)')

  const groupsOf12Pictures = monument?.pictures?.reduce((acc, curr, index) => {
    const groupIndex = isMobile
      ? Math.floor(index / 12)
      : Math.floor(index / 18)
    if (!acc[groupIndex]) {
      acc[groupIndex] = []
    }
    acc[groupIndex].push(curr)
    return acc
  }, [] as any[])

  const inContestMonument = useMemo(() => {
    return monument?.in_contest
  }, [monument])

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
        scale: 0.2,
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
  }, [monument])

  const { slug } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const { user } = useAuthUser()

  const wikipediaLink = useMemo(() => {
    if(monument?.app_category === 'Comune'){
      return `https://it.wikipedia.org/wiki/${monument?.label?.replace(/ /g, '_')}`
    } else {
      return `https://it.wikipedia.org/wiki/${monument?.label?.replace(/ /g, '_')}_(${monument?.municipality_label})`
    }
  }, [monument])

  console.log(imageUpload, 'imageUpload')
    

  return (
    <>
      <div
        className={classNames({
          [styles.DettaglioContainer]: !isDesktop,
          [styles.DettaglioContainerDesktop]: isDesktop,
        })}
      >
        <div
          className={classNames({
            [styles.DettaglioInfoCard]: !isDesktop,
            [styles.DettaglioInfoCardDesktop]: isDesktop,
          })}
        >
          {isDesktop && setDetail && (
            <Close
              className={styles.Close}
              onClick={() => {
                if (slug) {
                  setDetail(null)
                  if (location.pathname.indexOf('lista') > -1) {
                    navigate(
                      `/${i18n.language}/lista/?${new URLSearchParams({
                        search: '',
                        municipality: filters.municipality,
                        category: filters.category,
                        in_contest: filters.in_contest,
                        only_without_pictures: filters.only_without_pictures,
                        user_lat: String(filters.user_lat),
                        user_lon: String(filters.user_lon),
                      })}`,

                      { replace: true }
                    )
                  } else {
                    navigate(
                      `/${i18n.language}/mappa/?${new URLSearchParams({
                        search: '',
                        municipality: filters.municipality,
                        category: filters.category,
                        in_contest: filters.in_contest,
                        only_without_pictures: filters.only_without_pictures,
                        user_lat: String(filters.user_lat),
                        user_lon: String(filters.user_lon),
                      })}`,

                      { replace: true }
                    )
                  }
                } else {
                  setDetail(null)
                }
              }}
            />
          )}
          <button
            onClick={() => {
              inputFileRef.current?.click()
            }}
            className={styles.ButtonFixedCaricaFoto}
          >
            <CameraWhite className="me-2" width={14} />
            {user ? t('carica_foto') : t('fai_login_e_carica_foto')}
          </button>

          {inContestMonument && (
            <div className={styles.PresenzaInConcorso}>
              <Bell className="me-2" />
              {monument?.app_category === 'Comune'
                ? t('il_comune_fa_parte_del_concorso')
                : t('il_monumento_fa_parte_del_concorso')}
            </div>
          )}
          {monument && monument?.pictures.length > 0 ? (
            <>
              <Swiper
                onSwiper={(swiper) => {
                  swiperRef.current = swiper
                }}
                onSlideChange={(swiper) => {
                  setSlideActive(swiper.activeIndex)
                }}
                spaceBetween={10}
                className={styles.Swiper}
              >
                {monument?.pictures.map((picture, k) => (
                  <SwiperSlide
                    onClick={() => {
                      setShowAllImages(true)
                      setSlideShowActive(k)
                    }}
                    key={k}
                  >
                    <div
                      className={styles.BlockImage}
                      style={{
                        backgroundImage: `url("${picture.image_url}?width=700")`,
                      }}
                    >
                      <div className={styles.BlockImageOverlay}>
                        <div className="d-flex align-items-center">
                          <div className={styles.BlockImageOverlayText}>
                            {picture.data?.Artist && (
                              <div
                                className={styles.BlockImageOverlayTextArtist}
                                dangerouslySetInnerHTML={{
                                  __html: picture.data?.Artist,
                                }}
                              ></div>
                            )}
                          </div>
                          <div>
                            {picture.data?.DateTime && (
                              <div className={styles.BlockImageOverlayTextDate}>
                                {dayjs(picture.data?.DateTime).format(
                                  'DD/MM/YYYY'
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                        {picture.data?.License && (
                          <div className={styles.CreditsImage}>
                            {picture.data?.License}
                          </div>
                        )}
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              {monument.pictures.length > 1 && (
                <div className={styles.PaginationContainer}>
                  <ArrowLeftSlideShow
                    onClick={() => {
                      if (slideActive > 0) {
                        swiperRef.current?.slidePrev()
                      }
                    }}
                    className={classNames('me-3', {
                      pointer: slideActive > 0,
                    })}
                    fill={
                      slideActive > 0
                        ? 'var(--primary)'
                        : 'var(--colori-neutri-gray-2)'
                    }
                  />
                  <div className={styles.CurrentSlide}>
                    {slideActive + 1} / {monument?.pictures.length}
                  </div>
                  <ArrowRightSlideShow
                    onClick={() => {
                      if (slideActive < monument?.pictures.length - 1) {
                        swiperRef.current?.slideNext()
                      }
                    }}
                    className={classNames('ms-3', {
                      pointer: slideActive < monument?.pictures.length - 1,
                    })}
                    fill={
                      slideActive < monument?.pictures.length - 1
                        ? 'var(--primary)'
                        : 'var(--colori-neutri-gray-2)'
                    }
                  />
                </div>
              )}
            </>
          ) : (
            <>
              <div className={styles.BoxNoImages}>
                <div>{t('ancora_nessuna_foto')}</div>
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
                {monument && <IconMonument monument={monument} />}
                <div className="ms-2">
                  <div>
                    <div className={styles.MonumentTitle}>
                      {monument?.label}
                    </div>
                    {monument?.municipality_label &&
                      monument?.app_category !== 'Comune' && (
                        <div className={styles.Comune}>
                          {monument?.municipality_label} (
                          {monument?.province_label})
                        </div>
                      )}
                    {monument?.app_category === 'Comune' && (
                      <div className="w-100 d-flex justify-content-between align-items-center">
                        <div className={styles.ComuneVedute}>
                          {t('vedute_d_insieme_del_comune_di')}{' '}
                          {monument?.label}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.PicturesCount}>
                <div className="d-flex align-items-center">
                  {monument?.pictures_wlm_count} <Camera className="ms-1" />
                </div>
                {monument?.app_category === 'Comune' && (
                  <div
                    className="pointer"
                    onClick={() => {
                      setVeduteInsiemeOpen(!veduteInsiemeOpen)
                    }}
                  >
                    {veduteInsiemeOpen ? (
                      <InfoVeduteDark className="me-2" />
                    ) : (
                      <InfoVedute className="me-2" />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          {!isMobile && veduteInsiemeOpen && (
            <div className={styles.VeduteInsieme}>
              <div className={styles.VeduteInsiemeTitle}>
                {t('vedute_insieme')}
              </div>
              <div className={styles.VeduteInsiemeText}>
                {t('vedute_d_insieme_text')}
              </div>
            </div>
          )}
        </div>
        {monument && monument?.pictures.length > 0 && (
          <div className={styles.CardImages}>
            <div className={styles.ImmaginiWlmTitle}>{t('immagini_wlm')}</div>
            <Swiper
              className={styles.Swiper}
              onSwiper={(swiper) => {
                swiperBlock12.current = swiper
              }}
              onSlideChange={(swiper) => {
                setSlideGroup12(swiper.activeIndex)
              }}
            >
              {groupsOf12Pictures &&
                groupsOf12Pictures.map((group, index) => (
                  <Fragment key={index}>
                    {group.length > 0 && (
                      <SwiperSlide key={index}>
                        <div className={styles.ContainerImages}>
                          {group.map((picture: any, k: number) => (
                            <div
                              key={k}
                              className={styles.Image}
                              onClick={() => {
                                setShowAllImages(true)
                                setSlideShowActive(k)
                              }}
                              style={{
                                backgroundImage: `url("${picture.image_url}?width=300")`,
                              }}
                            ></div>
                          ))}
                        </div>
                      </SwiperSlide>
                    )}
                  </Fragment>
                ))}
            </Swiper>
            {groupsOf12Pictures && groupsOf12Pictures.length > 1 && (
              <div className={styles.PaginationContainer}>
                <ArrowLeftSlideShow
                  onClick={() => {
                    if (slideGroup12 > 0) {
                      swiperBlock12.current?.slidePrev()
                    }
                  }}
                  className={classNames('me-3', {
                    pointer: slideGroup12 > 0,
                  })}
                  fill={
                    slideGroup12 > 0
                      ? 'var(--primary)'
                      : 'var(--colori-neutri-gray-2)'
                  }
                />
                <div className={styles.CurrentSlide}>
                  {slideGroup12 + 1} / {groupsOf12Pictures?.length}
                </div>
                <ArrowRightSlideShow
                  onClick={() => {
                    if (slideGroup12 < groupsOf12Pictures?.length - 1) {
                      swiperBlock12.current?.slideNext()
                    }
                  }}
                  className={classNames('ms-3', {
                    pointer: slideGroup12 < groupsOf12Pictures?.length - 1,
                  })}
                  fill={
                    slideGroup12 < groupsOf12Pictures?.length - 1
                      ? 'var(--primary)'
                      : 'var(--colori-neutri-gray-2)'
                  }
                />
              </div>
            )}
            <a
              target={'_blank'}
              href={
                'https://commons.wikimedia.org/w/index.php?title=Special:Search&limit=500&offset=0&profile=default&search="' +
                monument?.wlm_n+'"'
              }
              className={styles.ButtonShowAllImages}
            >
              {t('guarda_tutte_su_wikimediacommons')}
            </a>
          </div>
        )}
        <div className={styles.MapContainer}>
          <div className={styles.Map} ref={mapElement}></div>
          {monument?.position?.coordinates && (
            <button
              className={styles.GuardaInMappa}
              onClick={() => {
                navigate(
                  `/${i18n.language}/mappa?monument_lat=${
                    monument?.position?.coordinates[1]
                  }&monument_lon=${
                    monument?.position?.coordinates[0]
                  }&zoom=16&${new URLSearchParams({
                    only_without_pictures: filters.only_without_pictures,
                    in_contest: filters.in_contest,
                    category: filters.category,
                    search: filters.search,
                    municipality: filters.municipality,
                  }).toString()}`
                )
              }}
            >
              <MapIcon /> {t('guarda_in_mappa')}
            </button>
          )}
          <div>
            {monument?.position?.coordinates && (
              <a
                className={styles.Direction}
                href={`https://www.openstreetmap.org/directions?engine=graphhopper_car&route=${monument?.position?.coordinates[1]}%2C${monument?.position?.coordinates[0]}%3B%3B&#map=16/${monument?.position?.coordinates[1]}/${monument?.position?.coordinates[0]}`}
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
        {monument?.app_category === 'Comune' && (
          <div className={styles.CardMonumentiComune}>
            <div className={styles.IMonumentiDelComune}>
              {t('i_monumenti_del_comune')}
            </div>
            <div className={styles.MonumentiComune}>
              {monument.counts_comune_by_app_category.map(
                (type, i) =>
                  type.categories__app_category__name &&
                  type.categories__app_category__name !== 'Comune' && (
                    <LangLink
                      key={i}
                      className="no-link"
                      to={
                        '/lista/?category=' +
                        type.categories__app_category__name +
                        '&municipality=' +
                        monument?.municipality +
                        '&in_contest='
                      }
                    >
                      <div key={i} className={styles.MonumentiComuneItem}>
                        <div className={styles.MonumentiComuneItemTitle}>
                          {type.categories__app_category__name}
                        </div>
                        <div className={styles.MonumentiComuneItemValue}>
                          {type.count}
                        </div>
                      </div>
                    </LangLink>
                  )
              )}
            </div>
            <div className="w-100">
              <LangLink
                className="no-link"
                to={
                  '/lista/?municipality=' +
                  monument?.municipality +
                  '&in_contest='
                }
              >
                <div className={styles.ButtonShowMonumenti}>
                  {t('vedi_monumenti')}
                </div>
              </LangLink>
            </div>
          </div>
        )}
        <div className={styles.CardExternalLinks}>
          <div className={styles.ExternalLinksTitle}>
            {t('collegamenti_esterni')}
          </div>
          <a
            className="no-link"
            target={'_blank'}
            rel="noreferrer"
            href={`https://reasonator.toolforge.org/?lang=${i18n.language}&q=${monument?.q_number}`}
          >
            <div className={styles.ExternalLink}>
              <div>
                <Reasonator className="me-1" /> Reasonator
              </div>
              <div>
                <ArrowRight />
              </div>
            </div>
          </a>
          <a
            className="no-link"
            target={'_blank'}
            rel="noreferrer"
            href={`https://www.wikidata.org/wiki/${monument?.q_number}?uselang=${i18n.language}`}
          >
            <div className={styles.ExternalLink}>
              <div>
                <Wikidata className="me-1" /> Wikidata
              </div>
              <div>
                <ArrowRight />
              </div>
            </div>
          </a>
          <a
            className="no-link"
            target={'_blank'}
            rel="noreferrer"
            href={wikipediaLink}
          >
            <div className={styles.ExternalLink}>
              <div>
                <Wikipedia className="me-1" />
              </div>
              <div>
                <ArrowRight />
              </div>
            </div>
          </a>
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
      {showAllImages && monument && (
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
        monument={monument}
        setUploadOpen={setShowModalUpload}
        uploadOpen={showModalUpload}
        setFileList={setImageUpload}
      />
      {isMobile && (
        <VeduteInsiemeModal
          setVeduteInsiemeOpen={setVeduteInsiemeOpen}
          veduteInsiemeOpen={veduteInsiemeOpen}
        />
      )}
    </>
  )
}

export default function Detail({ monumentId, setDetail, isDesktop }: Props) {
  const { slug } = useParams()
  const monument = slug
    ? useMonument(parseSmartSlug(slug!))
    : monumentId
    ? useMonument(monumentId)
    : null

  return isDesktop ? (
    <Suspense
      fallback={
        <div className="d-flex justify-content-center align-items-center h-100">
          <div className="loader" />
        </div>
      }
    >
      <DetailBlock monument={monument} isDesktop setDetail={setDetail} />
    </Suspense>
  ) : (
    <Layout>
      <Suspense
        fallback={
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="loader" />
          </div>
        }
      >
        <DetailBlock monument={monument} />
      </Suspense>
    </Layout>
  )
}

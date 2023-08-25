import Layout from '../../../components/Mobile/Layout'
import { Feature, Map as MapOl, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import 'ol/ol.css'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { fromLonLat } from 'ol/proj'
import styles from './Map.module.css'
import { ReactComponent as MyLocation } from '../../../assets/my-location.svg'
import { ReactComponent as CameraTransparent } from '../../../assets/camera-transparent.svg'
import BlockFilters from '../../../components/Mobile/BlockFilters'
import { useQsFilters } from '../../../hooks/filters'
import VectorLayer from 'ol/layer/Vector'
import {
  clusterSource,
  getFeatureInfo,
  getFeatureStyle,
  vectorSource,
} from '../../../lib/MagikCluster'
import { useCategoriesDomain } from '../../../hooks/monuments'
import { useNavigate } from 'react-router-dom'
import { smartSlug } from '../../../utils'
import { useTranslation } from 'react-i18next'
import { Attribution, Zoom } from 'ol/control'
import { Spinner } from 'react-bootstrap'
import { defaults } from 'ol/interaction/defaults'
import IconMonument from '../../../components/IconMonument'
import { forEach, set } from 'lodash'
import { useComuni } from '../../../hooks/comuni'
import FiltersIcon from '../../../components/Icons/FiltersIcon'
import { Icon, Style } from 'ol/style'
import VectorSource from 'ol/source/Vector'
import { Point } from 'ol/geom'
import { useTopContextState } from '../../../context/TopContext'
import Popup from 'ol-popup'
import { MarkerProps } from '../../../types'
import { createPortal } from 'react-dom'

const getFilters = (params: URLSearchParams) => ({
  search: params.get('search') ?? '',
  municipality: params.get('municipality') ?? '',
  category: params.get('category') ?? '',
  ordering: params.get('ordering') ?? '',
  in_contest: params.get('in_contest') ?? 'true',
  only_without_pictures: params.get('only_without_pictures') ?? '',
  user_lat: params.get('user_lat') ?? '',
  user_lon: params.get('user_lon') ?? '',
  monument_lon: Number(params.get('monument_lon')) ?? '',
  monument_lat: Number(params.get('monument_lat')) ?? '',
  map_zoom: Number(params.get('map_zoom')) ?? '',
})

const vectorSourceMyLocation = new VectorSource({
  features: [],
})

const myLocationLayer = new VectorLayer({
  source: vectorSourceMyLocation,
  style: new Style({
    image: new Icon({
      src: '/markers/my-position.png',
      scale: 0.2,
    }),
  }),
})

const popup = new Popup({ stopEvent: true, positioning: 'bottom-center' })

export default function Map() {
  const { filters, setFilters } = useQsFilters(getFilters)
  const mapElement = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<MapOl | null>(null)
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false)
  const { data: categories } = useCategoriesDomain()
  const { data: comuni } = useComuni()
  const navigate = useNavigate()
  const { i18n } = useTranslation()
  const [loading, setLoading] = useState<boolean>(false)
  const [comuneFilterCoords, setComuneFilterCoords] = useState<number[] | null>(
    null
  )
  const [infoMarker, setInfoMarker] = useState<MarkerProps | null>(null)

  const [mapState, setMapState] = useState({
    center: fromLonLat([12.56738, 41.87194]),
    zoom: 6,
    maxZoom: 22,
    minZoom: 5,
  })

  const { geoPermission } = useTopContextState()

  function handleLocationClick() {
    if (navigator.geolocation && geoPermission !== 'denied') {
      navigator.geolocation.getCurrentPosition(success, error)
    } else {
      console.log('Geolocation not supported')
    }
  }

  function success(position: any) {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    const featureMyLocation = new Feature({
      geometry: new Point(fromLonLat([longitude, latitude])),
    })
    vectorSourceMyLocation.clear()
    vectorSourceMyLocation.addFeature(featureMyLocation)
    setFilters({
      ...filters,
      user_lat: latitude,
      user_lon: longitude,
    })
    setMapState({
      ...mapState,
      center: fromLonLat([longitude, latitude]),
      zoom: 16,
    })
  }

  function error() {
    console.log('Unable to retrieve your location')
  }

  useEffect(() => {
    vectorSource.set('categories', categories)
    vectorSource.refresh()
  }, [categories])

  useEffect(() => {
    vectorSource.set('filters', filters)
    vectorSource.refresh()
  }, [filters])

  useEffect(() => {
    if (!mapElement.current) return

    vectorSource.set('setLoading', setLoading)

    const featureOverlay = new VectorLayer({
      source: clusterSource,
      style: getFeatureStyle,
    })

    const interactions = defaults({
      altShiftDragRotate: false,
      pinchRotate: false,
    })

    const initialMap = new MapOl({
      target: mapElement.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        featureOverlay,
        myLocationLayer,
      ],
      interactions: interactions,
      overlays: [popup],
      controls: [
        new Zoom({
          zoomInClassName: styles.ZoomIn,
          zoomOutClassName: styles.ZoomOut,
        }),
        new Attribution({
          collapsible: false,
        }),
      ],
      view: new View(mapState),
    })

    function setClusterDistance(resolution: number) {
      if (resolution < 0.1) {
        clusterSource.setDistance(0)
      } else if (resolution <= 300) {
        clusterSource.setDistance(40)
      } else {
        clusterSource.setDistance(0)
      }
    }
    const v = initialMap.getView()
    setClusterDistance(v.getResolution() || 1000)
    v.on('change', function () {
      const resolution = v.getResolution() || 1000
      setClusterDistance(resolution)
    })

    initialMap.on('click', function (evt) {
      let shouldCloseMarker = true
      initialMap.forEachFeatureAtPixel(
        evt.pixel,
        function (feature) {
          const info = getFeatureInfo(feature)

          if (info === 1) {
            const monument = feature.getProperties().features[0].getProperties()
            const categoriesFeature = feature
              .getProperties()
              .features[0].getProperties().categories
            let category = ''
            const categoryLookup = {} as Record<number, string>
            forEach(
              categories?.filter((c) => c.name !== 'Altri monumenti') ?? [],
              ({ name, categories: ids }) => {
                ids.forEach((id: number) => {
                  categoryLookup[id] = name
                })
              }
            )

            category =
              categoriesFeature.reduce(
                (acc: string, id: number) => acc ?? categoryLookup[id],
                undefined
              ) ?? ''

            if (category === '') {
              category = 'Altri monumenti'
            }
            const appCategory = category
            sessionStorage.setItem(
              'map_state',
              JSON.stringify({
                center: map?.getView().getCenter(),
                zoom: map?.getView().getZoom(),
              })
            )
            initialMap?.getView().animate({
              center: fromLonLat([
                monument.position.coordinates[0],
                monument.position.coordinates[1],
              ]),
              // zoom: initialMap?.getView().getZoom(),
              duration: 500,
            })
            if (infoMarker) {
              setInfoMarker(null)
              setPopOpen(null)
            }

            setInfoMarker({
              id: monument.id,
              label: monument.label,
              pictures_wlm_count: monument.pictures_wlm_count,
              pictures_count: monument.pictures_count,
              coords: evt.pixel,
              coordinate: evt.coordinate,
              app_category: appCategory,
              in_contest: monument.in_contest,
              feature: feature,
            })
            shouldCloseMarker = false
          } else if (info > 1) {
            const currentZoom = initialMap?.getView().getZoom()
            initialMap?.getView().animate({
              center: evt.coordinate,
              zoom: currentZoom ? currentZoom + 1 : 16,
              duration: 500,
            })
          }
        },
        {
          hitTolerance: 30,
        }
      )
      if (shouldCloseMarker) {
        setInfoMarker(null)
        // setDetail(null)
      }
    })

    setMap(initialMap)
    return () => initialMap.setTarget(undefined as unknown as HTMLElement)
  }, [mapState])

  useEffect(() => {
    if (!map) return
    map.updateSize()
  }, [map])

  useEffect(() => {
    if (filters.monument_lat !== 0 && filters.monument_lon !== 0) {
      setMapState({
        ...mapState,
        center: fromLonLat([filters.monument_lon, filters.monument_lat]),
        zoom: filters.map_zoom ? filters.map_zoom : 16,
      })
    }
  }, [filters.monument_lat, filters.monument_lon])

  const areFiltersActive = useMemo(() => {
    if (
      filters.category !== '' ||
      filters.in_contest !== 'true' ||
      filters.municipality !== '' ||
      filters.only_without_pictures !== '' ||
      filters.search !== ''
    ) {
      return true
    } else {
      return false
    }
  }, [filters])

  useEffect(() => {
    if (comuneFilterCoords) {
      console.log('comuneFilterCoords', comuneFilterCoords)
      // map?.getView().animate({
      //   center: fromLonLat(comuneFilterCoords),
      //   zoom: 12,
      //   duration: 500,
      // })
      setMapState({
        ...mapState,
        center: fromLonLat(comuneFilterCoords),
        zoom: 12,
      })
    }
  }, [comuneFilterCoords])

  useEffect(() => {
    if (
      filters.municipality &&
      (!filters.monument_lat || filters.monument_lat === 0) &&
      (!filters.monument_lon || filters.monument_lon === 0)
    ) {
      const coordinates = comuni?.find(
        (c) => c.code === Number(filters.municipality)
      )?.centroid.coordinates
      if (!coordinates) return
      setComuneFilterCoords(
        coordinates ? [coordinates[0], coordinates[1]] : null
      )
      mapElement.current?.animate({
        center: fromLonLat([coordinates[0], coordinates[1]]),
        zoom: 18,
        duration: 500,
      })
    }
  }, [filters.municipality, comuni])

  const popupRef = useRef<HTMLDivElement>(null)

  const setDetail = useCallback(() => {
    if (infoMarker) {
      sessionStorage.setItem(
        'map_state',
        JSON.stringify({
          center: map?.getView().getCenter(),
          zoom: map?.getView().getZoom(),
        })
      )
      navigate(
        `/${i18n.language}/mappa/${smartSlug(
          infoMarker.id,
          infoMarker.label
        )}?${new URLSearchParams({
          search: filters.municipality ? filters.search : '',
          municipality: filters.municipality,
          category: filters.category,
          in_contest: filters.in_contest,
          only_without_pictures: filters.only_without_pictures,
          user_lat: String(filters.user_lat),
          user_lon: String(filters.user_lon),
          ordering: filters.ordering,
          monument_lat: String(filters.monument_lat) || '',
          monument_lon: String(filters.monument_lon) || '',
        })}`
      )
    }
  }, [infoMarker, filters, i18n.language, navigate, map])

  const [popOpen, setPopOpen] = useState<string|null>(null)

  useEffect(() => {
    if (infoMarker && popupRef.current) {
      popup.show(
        infoMarker.feature.getGeometry().getCoordinates(),
        '<div></div>'
      )
      setPopOpen(infoMarker.id.toString())
      
    } else {

      popup.hide()
      setPopOpen(null)
    }
  }, [infoMarker, setDetail])

  useEffect(() => {
    if (
      sessionStorage.getItem('map_state') &&
      filters.monument_lat !== 0 &&
      filters.monument_lon !== 0
    ) {
      // console.log('setting map state', mapState)
      const mapState = JSON.parse(sessionStorage.getItem('map_state')!)
      // console.log('setting map state', mapState)
      map?.getView().setZoom(mapState.zoom)
      map?.getView().setCenter(mapState.center)
      setMapState(mapState)
      setTimeout(() => {
        sessionStorage.removeItem('map_state')
      }, 1000)
    }
  }, [])

  useEffect(() => {
    if (sessionStorage.getItem('monument')) {
      const monument = JSON.parse(sessionStorage.getItem('monument')!)
      setMapState({
        ...mapState,
        center: fromLonLat([
          monument.position.coordinates[0],
          monument.position.coordinates[1],
        ]),
        zoom: 20,
      })
      sessionStorage.removeItem('monument')
    }
  }, [])

  useEffect(() => {
    map?.on('moveend', function (e) {
      const zoom = map.getView().getZoom()
      const center = map.getView().getCenter()
      sessionStorage.setItem('map_state', JSON.stringify({ center, zoom }))
    })
  }, [map])

  useEffect(() => {
    if (
      sessionStorage.getItem('map_state') &&
      !filters.monument_lat &&
      !filters.monument_lon &&
      !filters.municipality
    ) {
      const mapState = JSON.parse(sessionStorage.getItem('map_state')!)
      if (mapState) {
        map?.getView().setCenter(mapState.center)
        map?.getView().setZoom(mapState.zoom)
        setMapState(mapState)
      }
    }
  }, [])


  return (
    <Layout>
      <div className="w-100 h-100">
        <div ref={mapElement} id="map" className="w-100 h-100">
          <div
            className={
              areFiltersActive
                ? styles.ButtonFiltersActive
                : styles.ButtonFilters
            }
            onClick={() => {
              setFiltersOpen(!filtersOpen)
            }}
          >
            <FiltersIcon />
            {areFiltersActive && <div className={styles.Badge} />}
          </div>
          <div className={styles.ContainerButtons}>
            {/* <div className={styles.ButtonMappe}>
              <Mappe />
            </div> */}
            <div
              className={styles.ButtonMyLocation}
              onClick={handleLocationClick}
            >
              <MyLocation />
            </div>
          </div>
        </div>
        {loading && (
          <div className={styles.LoadingButton}>
            <Spinner
              style={{
                color: 'var(--primary)',
              }}
              size="sm"
            />
          </div>
        )}

        <div
          className="popup-container"
          ref={popupRef}
          style={{
            position: 'relative',
            top: '-12px',
          }}
        >
          {infoMarker &&
            createPortal(
              <>
                <div
                  onClick={(e) => {
                    if (popOpen === infoMarker.id.toString()) {
                      setDetail()
                    }
                  }}
                  style={{
                    zIndex: 1,
                    backgroundColor:
                      infoMarker.pictures_count === 0
                        ? 'var(--tertiary)'
                        : infoMarker.pictures_count > 0 &&
                          infoMarker.pictures_count <= 10
                        ? 'var(--monumento-poche-foto)'
                        : 'var(--monumento-tante-foto)',
                  }}
                  className={styles.DetailMarker}
                >
                  <div>
                    <IconMonument
                      monument={{
                        in_contest: infoMarker.in_contest,
                        pictures_count: infoMarker.pictures_count,
                        app_category: infoMarker.app_category,
                      }}
                    />
                  </div>
                  <div className={styles.TitleMarker}>{infoMarker.label}</div>
                  <div className={styles.TextMarker}>
                    <div>
                      <CameraTransparent />
                    </div>
                    <div className="ms-2 mt-1">{infoMarker.pictures_count}</div>
                  </div>
                  <div
                    className={styles.PinMarker}
                    style={{
                      borderTop:
                        '10px solid ' +
                        (infoMarker.pictures_count === 0
                          ? 'var(--tertiary)'
                          : infoMarker.pictures_count > 0 &&
                            infoMarker.pictures_count <= 10
                          ? 'var(--monumento-poche-foto)'
                          : 'var(--monumento-tante-foto)'),
                    }}
                  ></div>
                </div>
              </>,
              popup.getElement()
            )}
        </div>
      </div>

      <BlockFilters
        filters={filters}
        setFilters={setFilters}
        filtersOpen={filtersOpen}
        setFiltersOpen={setFiltersOpen}
        setComuneFilterCoords={setComuneFilterCoords}
      />
    </Layout>
  )
}

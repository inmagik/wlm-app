import Layout from '../../../components/Mobile/Layout'
import { Map as MapOl, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { fromLonLat } from 'ol/proj'
import styles from './Map.module.css'
import { ReactComponent as MyLocation } from '../../../assets/my-location.svg'
import { ReactComponent as CameraTransparent } from '../../../assets/camera-transparent.svg'
import { ReactComponent as FilterIcon } from '../../../assets/filter.svg'
import { ReactComponent as FilterIconPrimary } from '../../../assets/filter-primary.svg'
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
import { Zoom } from 'ol/control'
import { Spinner } from 'react-bootstrap'
import { defaults } from 'ol/interaction/defaults'
import IconMonument from '../../../components/IconMonument'
import { MarkerProps } from '../../Desktop/Map/Map'
import { forEach } from 'lodash'

const getFilters = (params: URLSearchParams) => ({
  search: params.get('search') ?? '',
  municipality: params.get('municipality') ?? '',
  category: params.get('category') ?? '',
  ordering: params.get('ordering') ?? 'distance',
  in_contest: params.get('in_contest') ?? 'true',
  only_without_pictures: params.get('only_without_pictures') ?? '',
  user_lat: params.get('user_lat') ?? '',
  user_lon: params.get('user_lon') ?? '',
  monument_lon: Number(params.get('monument_lon')) ?? '',
  monument_lat: Number(params.get('monument_lat')) ?? '',
})

export default function Map() {
  const { filters, setFilters } = useQsFilters(getFilters)
  const mapElement = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<MapOl | null>(null)
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false)
  const { data: categories } = useCategoriesDomain()
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

  const [geoPermission, setGeoPermission] = useState<string>('prompt')

  useEffect(() => {
    navigator.permissions
      .query({ name: 'geolocation' })
      .then((permissionStatus) => {
        console.log(
          `geolocation permission status is ${permissionStatus.state}`
        )
        setGeoPermission(permissionStatus.state)

        permissionStatus.onchange = () => {
          console.log(
            `geolocation permission status has changed to ${permissionStatus.state}`
          )
          setGeoPermission(permissionStatus.state)
        }
      })
  }, [])

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
      ],
      interactions: interactions,
      controls: [
        new Zoom({
          zoomInClassName: styles.ZoomIn,
          zoomOutClassName: styles.ZoomOut,
        }),
      ],
      view: new View(mapState),
    })

    function setClusterDistance(resolution: number) {
      if (resolution <= 300) {
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
      initialMap.forEachFeatureAtPixel(evt.pixel, function (feature) {
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
          setFilters({
            ...filters,
          })
          initialMap?.getView().animate({
            center: fromLonLat([
              monument.position.coordinates[0],
              monument.position.coordinates[1],
            ]),
            zoom: initialMap?.getView().getZoom() ?? 14,
            duration: 500,
          })
          setInfoMarker({
            id: monument.id,
            label: monument.label,
            pictures_wlm_count: monument.pictures_wlm_count,
            pictures_count: monument.pictures_count,
            coords: evt.pixel,
            app_category: appCategory,
            in_contest: monument.in_contest,
            feature: feature,
          })
          shouldCloseMarker = false
        }
      })
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
        zoom: 16,
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
      setMapState({
        ...mapState,
        center: fromLonLat(comuneFilterCoords),
        zoom: 12,
      })
    }
  }, [comuneFilterCoords])

  useEffect(() => {
    if (
      sessionStorage.getItem('map_state') &&
      !filters.monument_lat &&
      !filters.monument_lon
    ) {
      const mapState = JSON.parse(sessionStorage.getItem('map_state')!)
      setMapState(mapState)
      sessionStorage.removeItem('map_state')
    }
  }, [])

  const [coords, setCoords] = useState<number[] | null>(null)

  const refreshCoordinates = useCallback(() => {
    if (infoMarker && map) {
      const coordinates = infoMarker.feature.getGeometry().getCoordinates()
      const pixel = map?.getPixelFromCoordinate(coordinates)
      setCoords(pixel)
    }
  }, [infoMarker, map])

  useEffect(() => {
    refreshCoordinates()
  }, [infoMarker])

  useEffect(() => {
    map && map.on('rendercomplete', refreshCoordinates)

    return () => {
      map && map.un('rendercomplete', refreshCoordinates)
    }
  }, [map, refreshCoordinates])

  return (
    <Layout>
      <div className="w-100 h-100">
        <div ref={mapElement} id="map" className="w-100 h-100">
          <button
            className={
              areFiltersActive
                ? styles.ButtonFiltersActive
                : styles.ButtonFilters
            }
            onClick={() => {
              setFiltersOpen(!filtersOpen)
            }}
          >
            {areFiltersActive ? <FilterIcon /> : <FilterIconPrimary />}
          </button>
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
        {infoMarker && coords && (
          <>
            <div
              onClick={(e) => {
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
                    )})}?map_lon=${mapState.center[0]}&map_lat=${
                      mapState.center[1]
                    }&map_zoom=${mapState.zoom}`
                  )
                }
              }}
              style={{
                position: 'absolute',
                top: coords[1] - 94,
                left: coords[0] - 80,
                opacity: coords ? 1 : 0,
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
          </>
        )}
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

import { Suspense, useEffect, useRef, useState } from 'react'
import BlockFilters from '../../../components/Desktop/BlockFilters'
import Layout from '../../../components/Desktop/Layout'
import { useQsFilters } from '../../../hooks/filters'
import { Feature, Map as MapOl, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import 'ol/ol.css'
import OSM from 'ol/source/OSM'
import { Attribution, Zoom } from 'ol/control'
import { fromLonLat } from 'ol/proj'
import styles from './Map.module.css'
import VectorLayer from 'ol/layer/Vector'
import {
  clusterSource,
  getFeatureInfo,
  getFeatureStyle,
  vectorSource,
} from '../../../lib/MagikCluster'
import { useCategoriesDomain } from '../../../hooks/monuments'
import Detail from '../../Mobile/Detail'
import { getLabelFromSlug, parseSmartSlug } from '../../../utils'
import { useParams } from 'react-router-dom'
import MapContainer from './MapContainer'
import { forEach } from 'lodash'
import VectorSource from 'ol/source/Vector'
import { Point } from 'ol/geom'
import { Icon, Style } from 'ol/style'
import { useComuni } from '../../../hooks/comuni'

const getFilters = (params: URLSearchParams) => ({
  search: params.get('search') ?? '',
  municipality: params.get('municipality') ?? '',
  ordering: params.get('ordering') ?? 'distance',
  in_contest: params.get('in_contest') ?? 'true',
  only_without_pictures: params.get('only_without_pictures') ?? '',
  category: params.get('category') ?? '',
  user_lat: Number(params.get('user_lat')) ?? '',
  user_lon: Number(params.get('user_lon')) ?? '',
  monument_lon: Number(params.get('monument_lon')) ?? '',
  monument_lat: Number(params.get('monument_lat')) ?? '',
  monument_id: Number(params.get('monument_id')) ?? '',
})

export interface MarkerProps {
  id: number
  label: string
  pictures_wlm_count: number
  pictures_count: number
  app_category: string
  in_contest: boolean
  coords: number[]
  feature: any
}

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

export default function Map() {
  const { filters, setFilters } = useQsFilters(getFilters)
  const mapElement = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<MapOl | null>(null)
  const { data: categories } = useCategoriesDomain()
  const { data: comuni } = useComuni()
  const [detail, setDetail] = useState<number | null>(null)
  const [infoMarker, setInfoMarker] = useState<MarkerProps | null>(null)
  const [legend, setLegend] = useState<boolean>(false)
  const [comuneFilterCoords, setComuneFilterCoords] = useState<
    number[] | null
  >()
  const [loading, setLoading] = useState<boolean>(false)

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
    const featureMyLocation = new Feature({
      geometry: new Point(fromLonLat([longitude, latitude])),
    })
    vectorSourceMyLocation.clear()
    vectorSourceMyLocation.addFeature(featureMyLocation)
    setMapState({
      ...mapState,
      center: fromLonLat([longitude, latitude]),
      zoom: 14,
    })
    setFilters({
      ...filters,
      user_lat: latitude,
      user_lon: longitude,
    })
    setInfoMarker(null)
    setDetail(null)
  }

  function error() {
    console.log('Unable to retrieve your location')
  }

  const { slug } = useParams()

  useEffect(() => {
    if (slug) {
      setDetail(Number(parseSmartSlug(slug)))
      setFilters({
        ...filters,
        search: getLabelFromSlug(slug),
      })
    }
  }, [slug])

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

    const initialMap = new MapOl({
      target: mapElement.current,

      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        featureOverlay,
        myLocationLayer,
      ],
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
          sessionStorage.setItem('monument_id', monument.id)
          setDetail(monument.id)
          console.log(filters, 'filters')
          setFilters({
            monument_id: monument.id,
            // search: monument.label,
            monument_lat: monument.position.coordinates[1],
            monument_lon: monument.position.coordinates[0],
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
        } else {
          setMapState({
            ...mapState,
            zoom: mapState.zoom + 1,
            center: evt.coordinate,
          })
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
    if (!detail) {
      setInfoMarker(null)
    }
  }, [detail])

  useEffect(() => {
    if (filters.monument_lat && filters.monument_lat !== 0 && filters.monument_lon && filters.monument_lon !== 0) {
      map?.getView().animate({
        center: fromLonLat([filters.monument_lon, filters.monument_lat]),
        zoom: 19,
        duration: 500,
      })
      setMapState({
        ...mapState,
        center: fromLonLat([filters.monument_lon, filters.monument_lat]),
        zoom: 19,
      })
    }
  }, [])

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
    if (filters.monument_id) {
      setDetail(filters.monument_id)
    }
  }, [filters.monument_id])

  useEffect(() => {
    if (
      filters.municipality &&
      (!filters.monument_lat && filters.monument_lat !== 0) &&
      (!filters.monument_lon && filters.monument_lon !== 0)
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

  useEffect(() => {
    if (localStorage.getItem('monument')) {
      const monument = JSON.parse(localStorage.getItem('monument') as string)
      setDetail(monument.id)
      setMapState({
        ...mapState,
        center: fromLonLat([
          monument.position.coordinates[0],
          monument.position.coordinates[1],
        ]),
        zoom: 20,
      })
      mapElement.current?.animate({
        center: fromLonLat([
          monument.position.coordinates[0],
          monument.position.coordinates[1],
        ]),
        zoom: 18,
        duration: 500,
      })
    }
    localStorage.removeItem('monument')
  }, [])

  return (
    <Layout>
      <div className="d-flex h-100 w-100">
        <div className="h-100">
          <BlockFilters
            setDetail={setDetail}
            filters={filters}
            setFilters={setFilters}
            setComuneFilterCoords={setComuneFilterCoords}
          />
        </div>

        <MapContainer
          mapElement={mapElement}
          handleLocationClick={handleLocationClick}
          infoMarker={infoMarker}
          legend={legend}
          detail={detail}
          setLegend={setLegend}
          map={map}
          loading={loading}
        />

        {detail && (
          <Suspense
            fallback={
              <div className={styles.CardDetail}>
                <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                  <div className="loader" />
                </div>
              </div>
            }
          >
            <div className={styles.CardDetail}>
              <Detail isDesktop monumentId={detail} setDetail={setDetail} />
            </div>
          </Suspense>
        )}
      </div>
    </Layout>
  )
}

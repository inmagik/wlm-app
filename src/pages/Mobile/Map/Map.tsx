import Layout from '../../../components/Mobile/Layout'
import { Map as MapOl, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { fromLonLat } from 'ol/proj'
import styles from './Map.module.css'
import { ReactComponent as MyLocation } from '../../../assets/my-location.svg'
import { ReactComponent as Mappe } from '../../../assets/mappe.svg'
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

const getFilters = (params: URLSearchParams) => ({
  search: params.get('search') ?? '',
  municipality: params.get('municipality') ?? '',
  category: params.get('category') ?? '',
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

  const [mapState, setMapState] = useState({
    center: fromLonLat([12.56738, 41.87194]),
    zoom: 6,
  })

  function handleLocationClick() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error)
    } else {
      console.log('Geolocation not supported')
    }
  }

  function success(position: any) {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    setMapState({
      center: fromLonLat([longitude, latitude]),
      zoom: 16,
    })
  }

  function error() {
    console.log('Unable to retrieve your location')
  }

  useEffect(() => {
    vectorSource.set('filters', filters)
    vectorSource.set('categories', categories)
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
      ],
      controls: [
        new Zoom({
          zoomInClassName: styles.ZoomIn,
          zoomOutClassName: styles.ZoomOut,
        }),
      ],
      view: new View(mapState),
    })

    initialMap.on('click', function (evt) {
      if (
        initialMap.forEachFeatureAtPixel(evt.pixel, function (feature) {
          const info = getFeatureInfo(feature)
          if (info === 1) {
            const monument = feature.getProperties().features[0].getProperties()
            const id = monument.id
            const label = monument.label
            navigate(`/${i18n.language}/mappa/${smartSlug(id, label)})}`)
          }
        })
      ) {
        console.log('boo')
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
            <button className={styles.ButtonMappe}>
              <Mappe />
            </button>
            <button
              className={styles.ButtonMyLocation}
              onClick={handleLocationClick}
            >
              <MyLocation />
            </button>
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
      </div>

      <BlockFilters
        filters={filters}
        setFilters={setFilters}
        filtersOpen={filtersOpen}
        setFiltersOpen={setFiltersOpen}
      />
    </Layout>
  )
}

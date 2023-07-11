import Layout from '../../../components/Mobile/Layout'
import { Map as MapOl, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import { useEffect, useRef, useState } from 'react'
import { fromLonLat } from 'ol/proj'
import styles from './Map.module.css'
import { ReactComponent as MyLocation } from '../../../assets/my-location.svg'
import { ReactComponent as Mappe } from '../../../assets/mappe.svg'
import { ReactComponent as FilterIcon } from '../../../assets/filter.svg'
import BlockFilters from '../../../components/Mobile/BlockFilters'
import { useQsFilters } from '../../../hooks/filters'

const getFilters = (params: URLSearchParams) => ({
  search: params.get('search') ?? '',
  municipality: params.get('municipality') ?? '',
})

export default function Map() {
  const { filters, setFilters } = useQsFilters(getFilters)
  const mapElement = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<MapOl | null>(null)
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false)

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
    if (!mapElement.current) return
    const initialMap = new MapOl({
      target: mapElement.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View(mapState),
    })

    setMap(initialMap)

    return () => initialMap.setTarget(undefined as unknown as HTMLElement)
  }, [mapState])

  useEffect(() => {
    if (!map) return
    map.updateSize()
  }, [map])

  return (
    <Layout>
      <div className="w-100 h-100">
        <div ref={mapElement} id="map" className="w-100 h-100">
          <button
            className={styles.ButtonFilter}
            onClick={() => {
              setFiltersOpen(!filtersOpen)
            }}
          >
            <FilterIcon />
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

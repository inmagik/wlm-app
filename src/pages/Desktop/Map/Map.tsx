import { useEffect, useRef, useState } from 'react'
import BlockFilters from '../../../components/Desktop/BlockFilters'
import Layout from '../../../components/Desktop/Layout'
import { useQsFilters } from '../../../hooks/filters'
import { Map as MapOl, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import { fromLonLat } from 'ol/proj'
import styles from './Map.module.css'

const getFilters = (params: URLSearchParams) => ({
  search: params.get('search') ?? '',
  municipality: params.get('municipality') ?? '',
  ordering: params.get('ordering') ?? 'label',
  in_contest: params.get('in_contest') ?? 'true',
  only_without_pictures: params.get('only_without_pictures') ?? '',
  category: params.get('category') ?? '',
  user_lat: Number(params.get('user_lat')) ?? '',
  user_lon: Number(params.get('user_lon')) ?? '',
})

export default function Map() {
  const { filters, setFilters } = useQsFilters(getFilters)
  const mapElement = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<MapOl | null>(null)

  const [mapState, setMapState] = useState({
    center: fromLonLat([12.56738, 41.87194]),
    zoom: 6,
  })

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

    const apiUrl = '/anycluster/'

    const settings = {
      srid: 'EPSG:4326',
      clusterMethod: 'grid',
      onFinalClick: function (marker: any, data: any) {
        console.log(marker, data)
      },
    }

    // const markerFolderPath = '/static/anycluster/images/'

    // let anyclusterOpenLayers = new AnyclusterOpenLayers(
    //   initialMap,
    //   apiUrl,
    //   markerFolderPath,
    //   settings
    // )

    setMap(initialMap)

    return () => initialMap.setTarget(undefined as unknown as HTMLElement)
  }, [mapState])

  useEffect(() => {
    if (!map) return
    map.updateSize()
  }, [map])

  return (
    <Layout>
      <div className="d-flex h-100 w-100">
        <div className="h-100">
          <BlockFilters filters={filters} setFilters={setFilters} />
        </div>
        <div className={styles.MapContainer}>
          <div ref={mapElement} id="map" className="w-100 h-100"></div>
        </div>
      </div>
    </Layout>
  )
}

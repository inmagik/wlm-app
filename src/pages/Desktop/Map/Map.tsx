import { useEffect, useRef, useState } from 'react'
import BlockFilters from '../../../components/Desktop/BlockFilters'
import Layout from '../../../components/Desktop/Layout'
import { useQsFilters } from '../../../hooks/filters'
import { Map as MapOl, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import { fromLonLat } from 'ol/proj'
import styles from './Map.module.css'
import { MonumentList } from '../../../types'
import VectorLayer from 'ol/layer/Vector'
import { clusterSource, getFeatureInfo, getFeatureStyle, vectorSource } from '../../../lib/MagikCluster'
import { Stroke, Style, Circle, Fill } from 'ol/style'
import { useCategoriesDomain } from '../../../hooks/monuments'

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
  const { data: categories } = useCategoriesDomain()

  const [mapState, setMapState] = useState({
    center: fromLonLat([12.56738, 41.87194]),
    zoom: 5,
    maxZoom: 18,
    minZoom: 5,
  })

  useEffect(() => {
    vectorSource.set('filters', filters)
    vectorSource.set('categories', categories)
    vectorSource.refresh()

  }, [filters])

  useEffect(() => {
    if (!mapElement.current) return

    const featureOverlay = new VectorLayer({
      source: clusterSource,
      style: getFeatureStyle
    })

    const initialMap = new MapOl({
      target: mapElement.current,

      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        featureOverlay,
      ],
      controls: [],
      view: new View(mapState),
    })

    initialMap.on('click', function(evt) {
      if (initialMap.forEachFeatureAtPixel(evt.pixel,
        function(feature) {
          const info = getFeatureInfo(feature)
          if(info === 1){
            const monument = feature.getProperties().features[0]
            const id = monument.getProperties().id
            
            console.info("xxx", id)

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
    if (navigator.geolocation && !filters.user_lat && !filters.user_lon) {
      navigator.geolocation.getCurrentPosition((position) => {
        setFilters({
          ...filters,
          user_lat: position.coords.latitude,
          user_lon: position.coords.longitude,
        })
      })
    }
  }, [])

  const [detail, setDetail] = useState<MonumentList | null>(null)

  return (
    <Layout>
      <div className="d-flex h-100 w-100">
        <div className="h-100">
          <BlockFilters
            setDetail={setDetail}
            filters={filters}
            setFilters={setFilters}
          />
        </div>
        <div className={styles.MapContainer}>
          <div ref={mapElement} id="map" className="w-100 h-100"></div>
        </div>
      </div>
    </Layout>
  )
}

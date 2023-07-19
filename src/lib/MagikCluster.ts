import Vector from 'ol/source/Vector.js'
import Cluster from 'ol/source/Cluster.js'
import GeoJSON from 'ol/format/GeoJSON.js'
import { transformExtent } from 'ol/proj'
import { Fill, Style, Circle, Text, Icon } from 'ol/style'
import { scaleLinear } from 'd3-scale'
import getMarkerMap from '../components/MarkerMap/MarkerMap'
import { API_URL } from '../const'

const format = new GeoJSON()

export function getFeatureInfo(feature: any): number {
  const subFeatures = feature.get('features')
  return subFeatures.length === 1
    ? subFeatures[0].getProperties().ids
    : subFeatures.reduce((acc: any, subFeature: any) => {
        return acc + subFeature.getProperties().ids
      }, 0)
}

export const vectorSource = new Vector({
  format: new GeoJSON(),
  loader: (extent, resolution, projection, success, failure) => {
    const epsg4326Extent = transformExtent(extent, projection, 'EPSG:4326')
    const baseUrl = `${API_URL}/cluster-monuments/`
    const currentFilters = vectorSource.get('filters')
    const params = new URLSearchParams(currentFilters).toString()

    const url = `${baseUrl}?bbox=${epsg4326Extent.join(
      ','
    )}&resolution=${resolution}&${params}`

    const xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    const onError = function () {
      vectorSource.removeLoadedExtent(extent)
    }
    xhr.onerror = onError
    xhr.onload = function () {
      if (xhr.status == 200) {
        const features = format.readFeatures(xhr.responseText)
        vectorSource.clear()
        vectorSource.addFeatures(features)
        success && success(features)
      } else {
        onError()
        console.error('error loading json', xhr.status, xhr.statusText)
      }
    }
    xhr.send()
  },

  strategy: (extent, resolution) => {
    if (
      vectorSource.get('loadedExtent') &&
      JSON.stringify(vectorSource.get('loadedExtent')) !==
        JSON.stringify(extent)
    ) {
      vectorSource.removeLoadedExtent(vectorSource.get('loadedExtent'))
      // vectorSource.clear();
    }
    vectorSource.set('loadedExtent', extent)
    return [extent]
  },
})

export const clusterSource = new Cluster({
  distance: 40,
  source: vectorSource,
})

const clusterScale = scaleLinear().domain([7, 45, 46]).range([12, 20, 20])

const styleCache = {} as any
export function getFeatureStyle(feature: any) {
  const info = getFeatureInfo(feature)
  const categories = vectorSource.get('categories')
  if (info === 1) {
    const properties = feature.getProperties().features[0].getProperties()
    const category = properties.categories[0]
    const iconStyle = new Style({
      image: new Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: getMarkerMap({
          monument: {
            ...properties,
            app_category: categories?.find((c: any) => c.categories.includes(category))?.name ?? '',
          },
        }),
        width: 30,
      }),
    })
    return iconStyle
  }

  const size = info.toString() as any
  let style = styleCache[size]
  if (!style) {
    style = new Style({
      image: new Circle({
        radius: clusterScale(info),
        fill: new Fill({
          color: '#3399CC',
        }),
      }),
      text: new Text({
        text: size.toString(),
        fill: new Fill({
          color: '#fff',
        }),
      }),
    })
    styleCache[size] = style
  }
  return style
}

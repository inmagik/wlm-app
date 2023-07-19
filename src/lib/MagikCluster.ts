import Vector from 'ol/source/Vector.js'
import Cluster from 'ol/source/Cluster.js'
import GeoJSON from 'ol/format/GeoJSON.js'
import { bbox, tile } from 'ol/loadingstrategy.js'
import { transformExtent } from 'ol/proj'
import TileGrid from 'ol/tilegrid/TileGrid.js'
import { API_URL } from '../const'

const format = new GeoJSON({
  //dataProjection: 'EPSG:4326',
  // featureProjection: 'EPSG:3857'
})

export const vectorSource = new Vector({
  format: new GeoJSON({
    //dataProjection: 'EPSG:4326',
    // featureProjection: 'EPSG:3857'
  }),

  loader: (extent, resolution, projection, success, failure) => {
    const epsg4326Extent = transformExtent(extent, projection, 'EPSG:4326')
    const baseUrl = `${API_URL}/cluster-monuments`
    const url = `${baseUrl}?bbox=${epsg4326Extent.join(
      ','
    )}&resolution=${resolution}`

    const xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    const onError = function () {
      vectorSource.removeLoadedExtent(extent)
    }
    xhr.onerror = onError
    xhr.onload = function () {
      console.log('onload', xhr.status, xhr.statusText)
      if (xhr.status == 200) {
        const features = format.readFeatures(xhr.responseText)

        // console.log("vectorSource", vectorSource)

        // vectorSource.clear();
        vectorSource.addFeatures(features)
        // console.log("vectorSource", vectorSource.getFeatures())
        success && success(features)
        // vectorSource.changed();
      } else {
        onError()
        console.error('error loading json', xhr.status, xhr.statusText)
      }
    }
    xhr.send()
  },

  strategy: (extent, resolution) => {
    console.log('strategy', extent, resolution)
    console.log('v', vectorSource)

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
  distance: 30,
  source: vectorSource,
})

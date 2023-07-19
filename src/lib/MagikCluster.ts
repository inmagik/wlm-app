import Vector from 'ol/source/Vector.js'
import Cluster from 'ol/source/Cluster.js'
import GeoJSON from 'ol/format/GeoJSON.js'
import { bbox, tile } from 'ol/loadingstrategy.js'
import { transformExtent } from 'ol/proj'
import TileGrid from 'ol/tilegrid/TileGrid.js'
import { Fill, Stroke, Style, Circle, Text, Icon } from 'ol/style'
import { scaleLinear } from 'd3-scale'

const format = new GeoJSON({
  //dataProjection: 'EPSG:4326',
  // featureProjection: 'EPSG:3857'
})

export function getFeatureInfo(feature: any): number {
  const subFeatures = feature.get('features')
  return subFeatures.length === 1
    ? subFeatures[0].getProperties().ids
    : subFeatures.reduce((acc: any, subFeature: any) => {
        return acc + subFeature.getProperties().ids
      }, 0)
}

export const vectorSource = new Vector({
  format: new GeoJSON({
    //dataProjection: 'EPSG:4326',
    // featureProjection: 'EPSG:3857'
  }),

  //  url : (extent, resolution, projection) => {
  //   console.log("url", extent, resolution, projection)
  //   const epsg4326Extent = transformExtent(extent, projection, 'EPSG:4326');
  //   const baseUrl = 'http://localhost:8000/api/app/cluster-monuments/'
  //   const url = `${baseUrl}?bbox=${epsg4326Extent.join(',')}&resolution=${resolution}`;
  //   return url;
  //  },

  loader: (extent, resolution, projection, success, failure) => {
    const epsg4326Extent = transformExtent(extent, projection, 'EPSG:4326')
    const baseUrl = 'http://localhost:8000/api/app/cluster-monuments/'

    const currentFilters = vectorSource.get('filters')  
    console.log("filters in vectorSource", currentFilters)
    const params = new URLSearchParams(currentFilters).toString()

    console.log("pp", params)

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
      console.log('onload', xhr.status, xhr.statusText)
      if (xhr.status == 200) {
        const features = format.readFeatures(xhr.responseText)

        // console.log("vectorSource", vectorSource)

        vectorSource.clear()
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
  distance: 40,
  source: vectorSource,
})


const clusterScale = scaleLinear().domain([7, 45, 46]).range([12, 20, 20])

const styleCache = {};
export function getFeatureStyle(feature:any){
  
  const info = getFeatureInfo(feature);

  if(info === 1){
    const iconStyle = new Style({
      image: new Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: '/markers/Alberi/_10/Concorso.png',
        width: 30,
      }),
    });
    return iconStyle


  }

  
  const size = info.toString()
  let style = styleCache[size];
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
    });
    styleCache[size] = style;
  }
  return style;

    
    
  
}

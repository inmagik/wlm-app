import Vector from 'ol/source/Vector.js';
import Cluster from 'ol/source/Cluster.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import {bbox, tile} from 'ol/loadingstrategy.js';
import { transformExtent } from 'ol/proj';
import TileGrid from 'ol/tilegrid/TileGrid.js';

export const vectorSource = new Vector({
  format: new GeoJSON({
    //dataProjection: 'EPSG:4326',
    // featureProjection: 'EPSG:3857'  
  }),
  
   url : (extent, resolution, projection) => {
    console.log("url", extent, resolution, projection)
    const epsg4326Extent = transformExtent(extent, projection, 'EPSG:4326');
    const baseUrl = 'http://localhost:8000/api/app/cluster-monuments/'
    const url = `${baseUrl}?bbox=${epsg4326Extent.join(',')}&resolution=${resolution}`;
    console.log("url", url)
    return url;
   },

   strategy: (extent, resolution) => {  
        console.log("strategy", extent, resolution)
        console.log("v", vectorSource)
        
        if(vectorSource.get('loadedExtent') && JSON.stringify(vectorSource.get('loadedExtent')) !== JSON.stringify(extent)) {
            vectorSource.removeLoadedExtent(vectorSource.get('loadedExtent'));
            vectorSource.clear();
        }
        vectorSource.set('loadedExtent', extent);
        return [extent];
        
    },  
   
 });

 export const clusterSource = new Cluster({
  distance: 30,
  source: vectorSource
});
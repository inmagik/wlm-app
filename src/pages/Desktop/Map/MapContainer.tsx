import { MarkerProps } from './Map'
import styles from './Map.module.css'
import { ReactComponent as Mappe } from '../../../assets/mappe.svg'
import { ReactComponent as MyLocation } from '../../../assets/my-location.svg'
import { ReactComponent as CameraTransparent } from '../../../assets/camera-transparent.svg'
import { ReactComponent as LiveHelp } from '../../../assets/live-help.svg'
import Legend from '../../../components/Desktop/Legend'

interface MapContainerProps {
  mapElement: React.MutableRefObject<HTMLDivElement | null>
  handleLocationClick: () => void
  infoMarker: MarkerProps | null
  legend: boolean
  setLegend: (legend: boolean) => void
}

export default function MapContainer({
  mapElement,
  handleLocationClick,
  infoMarker,
  legend,
  setLegend,
}: MapContainerProps) {
  return (
    <div className={styles.MapContainer}>
      <div ref={mapElement} id="map" className="w-100 position-relative" style={{
        height: legend ? 'calc(100% - 200px)' : '100%'
      }}>
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
          <button
            className={styles.LegendButton}
            onClick={() => {
              setLegend(!legend)
            }}
          >
            <LiveHelp />
          </button>
        </div>
        {infoMarker && (
          <div
            style={{
              position: 'absolute',
              top: infoMarker.coords[1] - 35,
              left: infoMarker.coords[0] - 80,
              zIndex: 1,
            }}
            className={styles.DetailMarker}
          >
            <div className={styles.TitleMarker}>{infoMarker.label}</div>
            <div className={styles.TextMarker}>
              <div>
                <CameraTransparent />
              </div>
              <div className="ms-2 mt-1">{infoMarker.pictures_wlm_count}</div>
            </div>
          </div>
        )}
      </div>
      <Legend legend={legend} />
    </div>
  )
}

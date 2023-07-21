import { MarkerProps } from './Map'
import styles from './Map.module.css'
import { ReactComponent as Mappe } from '../../../assets/mappe.svg'
import { ReactComponent as MyLocation } from '../../../assets/my-location.svg'
import { ReactComponent as CameraTransparent } from '../../../assets/camera-transparent.svg'
import { ReactComponent as LiveHelp } from '../../../assets/live-help.svg'
import Legend from '../../../components/Desktop/Legend'
import IconMonument from '../../../components/IconMonument'
import { useCallback, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'

interface MapContainerProps {
  mapElement: React.MutableRefObject<HTMLDivElement | null>
  handleLocationClick: () => void
  infoMarker: MarkerProps | null
  legend: boolean
  setLegend: (legend: boolean) => void
  detail: number | null
  map: any
  loading: boolean
}

export default function MapContainer({
  mapElement,
  handleLocationClick,
  infoMarker,
  legend,
  setLegend,
  detail,
  map,
  loading,
}: MapContainerProps) {
  const [coords, setCoords] = useState<number[] | null>(null)

  const refreshCoordinates = useCallback(() => {
    if (infoMarker) {
      const coordinates = infoMarker.feature.getGeometry().getCoordinates()
      const pixel = map.getPixelFromCoordinate(coordinates)
      setCoords(pixel)
    }
  }, [infoMarker, map])

  useEffect(() => {
    refreshCoordinates()
  }, [infoMarker])

  useEffect(() => {
    map && map.on('rendercomplete', refreshCoordinates)

    return () => {
      map && map.un('rendercomplete', refreshCoordinates)
    }
  }, [map, refreshCoordinates])

  return (
    <div className={styles.MapContainer}>
      <div
        ref={mapElement}
        id="map"
        className="w-100 position-relative"
        style={{
          height: legend ? 'calc(100% - 200px)' : '100%',
        }}
      >
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
            className={legend ? styles.LegendButtonActive : styles.LegendButton}
            onClick={() => {
              setLegend(!legend)
            }}
          >
            <LiveHelp />
          </button>
        </div>
        {infoMarker && coords && (
          <>
            <div
              style={{
                position: 'absolute',
                top: coords[1] - 60,
                left: coords[0] - 80,
                zIndex: 1,
                backgroundColor:
                  infoMarker.pictures_wlm_count === 0
                    ? 'var(--tertiary)'
                    : infoMarker.pictures_wlm_count > 0 &&
                      infoMarker.pictures_wlm_count <= 10
                    ? 'var(--monumento-poche-foto)'
                    : 'var(--monumento-tante-foto)',
              }}
              className={styles.DetailMarker}
            >
              <div>
                <IconMonument
                  monument={{
                    in_contest: infoMarker.in_contest,
                    pictures_wlm_count: infoMarker.pictures_wlm_count,
                    app_category: infoMarker.app_category,
                  }}
                />
              </div>
              <div className={styles.TitleMarker}>{infoMarker.label}</div>
              <div className={styles.TextMarker}>
                <div>
                  <CameraTransparent />
                </div>
                <div className="ms-2 mt-1">{infoMarker.pictures_wlm_count}</div>
              </div>
              <div
                className={styles.PinMarker}
                style={{
                  borderTop:
                    '10px solid ' +
                    (infoMarker.pictures_wlm_count === 0
                      ? 'var(--tertiary)'
                      : infoMarker.pictures_wlm_count > 0 &&
                        infoMarker.pictures_wlm_count <= 10
                      ? 'var(--monumento-poche-foto)'
                      : 'var(--monumento-tante-foto)'),
                }}
              ></div>
            </div>
          </>
        )}
      </div>
      <Legend detail={detail} legend={legend} />
    </div>
  )
}

import { MarkerProps } from './Map'
import styles from './Map.module.css'
import { ReactComponent as MyLocation } from '../../../assets/my-location.svg'
import { ReactComponent as CameraTransparent } from '../../../assets/camera-transparent.svg'
import { ReactComponent as Italy } from '../../../assets/italy.svg'
import { ReactComponent as LiveHelp } from '../../../assets/live-help.svg'
import Legend from '../../../components/Desktop/Legend'
import IconMonument from '../../../components/IconMonument'
import { useCallback, useEffect, useState, useRef } from 'react'
import { Spinner } from 'react-bootstrap'
import { fromLonLat } from 'ol/proj'
import { createPortal } from 'react-dom'

interface MapContainerProps {
  mapElement: React.MutableRefObject<HTMLDivElement | null>
  handleLocationClick: () => void
  infoMarker: MarkerProps | null
  legend: boolean
  setLegend: (legend: boolean) => void
  detail: number | null
  map: any
  loading: boolean
  popup: any
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
  popup,
}: MapContainerProps) {
  const popupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // refreshCoordinates()
    if (infoMarker) {
      popup.show(
        infoMarker.feature.getGeometry().getCoordinates(),
        '<div></div>'
      )
    } else {
      popup.hide()
    }
  }, [infoMarker, popup])

  const pointerFeatures = useCallback(
    (e: any) => {
      if (!e.dragging) {
        map.getTargetElement().style.cursor = map.hasFeatureAtPixel(
          map.getEventPixel(e.originalEvent)
        )
          ? 'pointer'
          : ''
      }
    },
    [map]
  )

  useEffect(() => {
    map && map.on('pointermove', pointerFeatures)

    return () => {
      map && map.un('pointermove', pointerFeatures)
    }
  }, [map])

  return (
    <div className={styles.MapContainer}>
      <div
        ref={mapElement}
        id="map"
        className="w-100 position-relative"
        style={{
          height:
            legend && detail
              ? 'calc(100% - 288px)'
              : legend && !detail
              ? 'calc(100% - 200px)'
              : '100%',
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
        <div
          className={styles.ButtonResetItalia}
          onClick={() => {
            map.getView().animate({
              zoom: 6,
              center: fromLonLat([12.56738, 41.87194]),
              duration: 1000,
            })
          }}
        >
          <Italy />
        </div>
        <div className={styles.ContainerButtons}>
          {/* <button className={styles.ButtonMappe}>
            <Mappe />
          </button> */}
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
        <div
          ref={popupRef}
          style={{
            position: 'absolute',
            top: '-12px',
            pointerEvents: 'none',
          }}
        >
          {infoMarker &&
            createPortal(
              <>
                <div
                  style={{
                    opacity: 1,
                    zIndex: 1,
                    pointerEvents: 'none',
                    backgroundColor:
                      infoMarker.pictures_count === 0
                        ? 'var(--tertiary)'
                        : infoMarker.pictures_count > 0 &&
                          infoMarker.pictures_count <= 10
                        ? 'var(--monumento-poche-foto)'
                        : 'var(--monumento-tante-foto)',
                  }}
                  className={styles.DetailMarker}
                >
                  <div>
                    <IconMonument
                      monument={{
                        in_contest: infoMarker.in_contest,
                        pictures_count: infoMarker.pictures_count,
                        app_category: infoMarker.app_category,
                      }}
                    />
                  </div>
                  <div className={styles.TitleMarker}>
                    {infoMarker.label.charAt(0).toUpperCase() +
                      infoMarker.label.slice(1)}
                  </div>

                  <div className={styles.TextMarker}>
                    <div>
                      <CameraTransparent />
                    </div>
                    <div className="ms-2 mt-1">{infoMarker.pictures_count}</div>
                  </div>
                  <div
                    className={styles.PinMarker}
                    style={{
                      borderTop:
                        '10px solid ' +
                        (infoMarker.pictures_count === 0
                          ? 'var(--tertiary)'
                          : infoMarker.pictures_count > 0 &&
                            infoMarker.pictures_count <= 10
                          ? 'var(--monumento-poche-foto)'
                          : 'var(--monumento-tante-foto)'),
                    }}
                  ></div>
                </div>
              </>,
              popup.getElement()
            )}
        </div>
      </div>
      <Legend detail={detail} legend={legend} />
    </div>
  )
}

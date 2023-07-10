import { useParams } from 'react-router-dom'
import Layout from '../../../components/Mobile/Layout'
import { useMonument } from '../../../hooks/monuments'
import { parseSmartSlug } from '../../../utils'
import styles from './Detail.module.css'
import { ReactComponent as Bell } from '../../../assets/bell.svg'
import { ReactComponent as Castello } from '../../../assets/castelli.svg'
import { ReactComponent as Camera } from '../../../assets/camera.svg'
import { useTranslation } from 'react-i18next'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

export default function Detail() {
  const { slug } = useParams()
  const monument = useMonument(parseSmartSlug(slug!))
  const firstThreeImages = monument?.pictures.slice(0, 3)
  const { t } = useTranslation()
  return (
    <Layout>
      <div className={styles.DettaglioContainer}>
        <div className={styles.DettaglioInfoCard}>
          <div className={styles.PresenzaInConcorso}>
            <Bell className="me-2" /> Il Monumento fa parte del concorso
          </div>
          {firstThreeImages.length > 0 && (
            <Swiper
              onPaginationShow={() => {
                console.log('Pagination show')
              }}

              // modules={[Pagination]}
            >
              {firstThreeImages.map((picture) => (
                <SwiperSlide key={picture.id}>
                  <div
                    className={styles.BlockImage}
                    style={{
                      backgroundImage: `url(${picture.image_url})`,
                    }}
                  ></div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
          <div className={styles.CardInfoMonument}>
            <div className="d-flex justify-content-between w-100">
              <div className='d-flex'>
                <Castello className="me-1" />
                <div className="ms-1">
                  <div>
                    <div className={styles.MonumentTitle}>
                      {monument?.label}
                    </div>
                    <div className={styles.Comune}>
                      {monument?.municipality_label} ({monument?.province_label}
                      )
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.PicturesCount}>
                {monument?.pictures_count} <Camera className="ms-1" />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.CardImages}>
          <div className={styles.ImmaginiWlmTitle}>{t('immagini_wlm')}</div>
          <div className={styles.ContainerImages}>
            {monument?.pictures.slice(0, 12).map((picture) => (
              <div
                key={picture.id}
                className={styles.Image}
                style={{
                  backgroundImage: `url(${picture.image_url})`,
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

import styles from './PersonalImages.module.css'
import { useEffect, useState } from 'react'
import { useAuthUser } from 'use-eazy-auth'
import { personalImages } from '../../hooks/monuments'
import { UploadedImage } from '../../types'
import { chunk } from 'lodash'

export function PersonalImages({ rows, cols }: { rows: number; cols: number }) {
  const { token } = useAuthUser()
  const [images, setImages] = useState<UploadedImage[]>([])

  useEffect(() => {
    personalImages(token).then((res) => {
      const pics = res.data.slice(0, rows * cols)
      if (pics.length < rows * cols) {
        const emptyPics = new Array(rows * cols - pics.length).fill({ fake: true })
        setImages([...pics, ...emptyPics])
      } else {
        setImages(pics)
      }
    })
  }, [token])

  return (
    <div
      className={styles.row}
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {images.map((image) => {
        console.log(image)
        return (
          <div>
            {!image.fake && (
              <img
                src={image.imageinfo[0].url}
                width={70}
                height={70}
                className={styles.image}
              />
            )}
            {image.fake && (
              <div className={styles.fakeImage} />
            )}
          </div>
        )
      })}
    </div>
  )
}

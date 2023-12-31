import loadImage from 'blueimp-load-image'
import dayjs from 'dayjs'
import { ImageInfo } from './BlockUpload'
import { Monument } from '../../../types'

function readDateFromExif(file: File): Promise<string | null> {
  return new Promise((resolve, reject) => {
    loadImage.parseMetaData(file, (data) => {
      if (data.exif) {
        const exif = data.exif as any
        const allProperties = exif.getAll()
        const dateFromExif = allProperties?.Exif?.DateTimeOriginal

        if (dateFromExif) {
          resolve(
            dayjs(dateFromExif, 'YYYY:MM:DD HH:mm:ss').format('YYYY-MM-DD')
          )
        } else {
          resolve(null)
        }
      } else {
        resolve(null)
      }
    })
  })
}

function capitalizeFirstLetter(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export async function processUploadFiles(
  fileList: FileList,
  monument: Monument
) {
  const images: ImageInfo[] = []

  const awaits: Array<Promise<{ date: string | null; file: File }>> = []
  for (let i = 0; i < fileList.length; i++) {
    const file = fileList[i]
    const today = dayjs().format('YYYY-MM-DD')
    awaits.push(
      readDateFromExif(fileList[i]).then((date) => {
        if (date) {
          return { date, file }
        } else {
          return { date: today, file }
        }
      })
    )
  }

  const dates = await Promise.all(awaits)

  for (let i = 0; i < dates.length; i++) {
    const { date, file } = dates[i]
    let monumentPrefix =
      monument?.app_category === 'Comune'
        ? `Comune di ${monument?.label}`
        : `${monument?.label}`
    monumentPrefix = capitalizeFirstLetter(monumentPrefix)
    let titlePrefix = monument?.municipality_label
      ? `${monument?.municipality_label} - ${monumentPrefix}`
      : `${monumentPrefix}`
    images.push({
      title: `${titlePrefix} - ${dayjs().format('YYYY-MM-DD_HH-mm-ss')}_${(
        i + 1
      )
        .toString()
        .padStart(3, '0')}`,
      description: monument?.label || '',
      file: file,
      date: date ?? dayjs().format('YYYY-MM-DD'),
      monument_id: monument?.id,
    })
  }
  return images
}

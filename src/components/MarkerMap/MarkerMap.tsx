import { Monument } from '../../types'

interface Props {
  monument: Monument
}

export default function getMarkerMap({ monument }: Props) {
  const photosNumber = monument.pictures_count
  if (photosNumber === 0) {
    return '/markers/no-foto-si-concorso.svg'
  } else if (photosNumber > 0 && photosNumber <= 10) {
    return '/markers/0-10-foto-si-concorso.svg'
  } else if (photosNumber > 10) {
    return '/markers/maggiore-10-foto-si-concorso.svg'
  }
}

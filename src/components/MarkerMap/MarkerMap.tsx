import { Monument } from '../../types'

interface Props {
  monument: Monument
}

export default function getMarkerMap({ monument }: Props) {
  const photosNumber = monument.pictures_wlm_count
  const inContest = monument.in_contest
  if (photosNumber === 0) {
    if (inContest) {
      return '/markers/no-foto-si-concorso.svg'
    } else {
      return '/markers/no-foto-no-concorso.svg'
    }
  } else if (photosNumber > 0 && photosNumber <= 10) {
    if (inContest) {
      return '/markers/0-10-foto-si-concorso.svg'
    } else {
      return '/markers/0-10-foto-no-concorso.svg'
    }
  } else if (photosNumber > 10) {
    if (inContest) {
      return '/markers/maggiore-10-foto-si-concorso.svg'
    } else {
      return '/markers/maggiore-10-foto-no-concorso.svg'
    }
  }
}

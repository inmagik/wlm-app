import classNames from 'classnames'
import { Monument } from '../../types'
import styles from './IconMonument.module.css'
import CastelloIcon from '../Icons/CastelloIcon'
import ComuneIcon from '../Icons/ComuneIcon'
import AlberoMonumentaleIcon from '../Icons/AlberoMonumentaleIcon'
import MuseoIcon from '../Icons/MuseoIcon'
import EdificioReligiosoIcon from '../Icons/EdificioReligiosoIcon'
import AltroMonumentoIcon from '../Icons/AltroMonumentoIcon'

interface Props {
  monument: Monument
}

export default function IconMonument({ monument }: Props) {
  const photosNumber = monument.pictures_wlm_count
  const category = monument.app_category
  return (
    <div
      className={classNames(styles.IconMonument, {
        [styles.NoPhotos]: photosNumber === 0,
        [styles.OneToTenPhoto]: photosNumber > 0 && photosNumber <= 10,
        [styles.MoreThenTenPhoto]: photosNumber > 10,
      })}
    >
      {category === 'Castelli' && <CastelloIcon />}
      {category === "Comune" && <ComuneIcon />}
      {category === "Alberi monumentali" && <AlberoMonumentaleIcon />}
      {category === "Musei" && <MuseoIcon />}
      {category === "Edifici religiosi" && <EdificioReligiosoIcon />}
      {category === "Altri monumenti" && <AltroMonumentoIcon />}

    </div>
  )
}

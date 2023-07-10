import classNames from 'classnames'
import { Monument } from '../../types'
import styles from './IconMonument.module.css'
import CastelloIcon from '../Icons/CastelloIcon'

interface Props {
  monument: Monument
}

export default function IconMonument({ monument }: Props) {
  const photosNumber = monument.pictures_count
  console.log(monument.categories)
  return (
    <div
      className={classNames(styles.IconMonument, {
        [styles.NoPhotos]: photosNumber === 0,
        [styles.OneToTenPhoto]: photosNumber > 0 && photosNumber <= 10,
        [styles.MoreThenTenPhoto]: photosNumber > 10,
      })}
    >
      <CastelloIcon />
    </div>
  )
}

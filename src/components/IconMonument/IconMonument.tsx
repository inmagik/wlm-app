import classNames from 'classnames'
import { Monument, MonumentList } from '../../types'
import styles from './IconMonument.module.css'
import CastelloIcon from '../Icons/CastelloIcon'
import ComuneIcon from '../Icons/ComuneIcon'
import AlberoMonumentaleIcon from '../Icons/AlberoMonumentaleIcon'
import MuseoIcon from '../Icons/MuseoIcon'
import EdificioReligiosoIcon from '../Icons/EdificioReligiosoIcon'
import AltroMonumentoIcon from '../Icons/AltroMonumentoIcon'

interface Props {
  monument: {
    app_category: string
    pictures_wlm_count: number
    in_contest: boolean
  }
}

export default function IconMonument({ monument }: Props) {
  const photosNumber = monument.pictures_wlm_count
  const category = monument.app_category
  const inContest = monument.in_contest
  return (
    <div
      className={classNames(styles.IconMonument, {
        [styles.NoPhotos]: photosNumber === 0,
        [styles.OneToTenPhoto]: photosNumber > 0 && photosNumber <= 10,
        [styles.MoreThenTenPhoto]: photosNumber > 10,
      })}
    >
      {category === 'Castelli' &&
        (inContest ? (
          <img src={'/Icons/Castelli/Icona/Concorso.png'} width="14" alt={'Castello'} />
        ) : (
          <img src={'/Icons/Castelli/Icona/NOConcorso.png'} width="14" alt={'Castello'} />
        ))}
      {category === 'Comune' &&
        (inContest ? (
          <img src={'/Icons/Comuni/Icona/Concorso.png'} width="14" alt={'Comune'} />
        ) : (
          <img src={'/Icons/Comuni/Icona/NOConcorso.png'} width="14" alt={'Comune'} />
        ))}
      {category === 'Alberi monumentali' &&
        (inContest ? (
          <img src={'/Icons/Alberi/Icona/Concorso.png'} width="14" alt={'Albero Monumentale'} />
        ) : (
          <img
            src={'/Icons/Alberi/Icona/NOConcorso.png'}
            width="14" alt={'Albero Monumentale'}
          />
        ))}
      {category === 'Musei' &&
        (inContest ? (
          <img src={'/Icons/Musei/Icona/Concorso.png'} width="14" alt={'Museo'} />
        ) : (
          <img src={'/Icons/Musei/Icona/NOConcorso.png'} width="14" alt={'Museo'} />
        ))}
      {category === 'Edifici religiosi' &&
        (inContest ? (
          <img src={'/Icons/Chiese/Icona/Concorso.png'} width="14" alt={'Edificio Religioso'} />
        ) : (
          <img
            src={'/Icons/Chiese/Icona/NOConcorso.png'}
            width="14" alt={'Edificio Religioso'}
          />
        ))}
      {category === 'Altri monumenti' &&
        (inContest ? (
          <img src={'/Icons/AltriMonumenti/Icona/Concorso.png'} width="14" alt={'Altro Monumento'} />
        ) : (
          <img src={'/Icons/AltriMonumenti/Icona/NOConcorso.png'} width="14" alt={'Altro Monumento'} />
        ))}
      {!category &&
        (inContest ? (
          <img src={'/Icons/AltriMonumenti/Icona/Concorso.png'} width="14" alt={'Altro Monumento'} />
        ) : (
          <img src={'/Icons/AltriMonumenti/Icona/NOConcorso.png'} width="14" alt={'Altro Monumento'} />
        ))}
    </div>
  )
}

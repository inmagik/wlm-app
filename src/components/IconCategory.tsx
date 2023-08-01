import AlberoMonumentaleIcon from './Icons/AlberoMonumentaleIcon'
import AltroMonumentoIcon from './Icons/AltroMonumentoIcon'
import CastelloIcon from './Icons/CastelloIcon'
import EdificioReligiosoIcon from './Icons/EdificioReligiosoIcon'
import MuseoIcon from './Icons/MuseoIcon'

interface Props {
  appCategory: string
}

export default function IconCategory({ appCategory }: Props) {
  return (
    <>
      {appCategory === 'Castelli' && <CastelloIcon fill='var(--primary)' />}
      {appCategory === 'Alberi monumentali' && <AlberoMonumentaleIcon fill='var(--primary)' />}
      {appCategory === 'Musei' && <MuseoIcon fill='var(--primary)' />}
      {appCategory === 'Edifici religiosi' && <EdificioReligiosoIcon fill='var(--primary)' />}
      {appCategory === 'Altri monumenti' && <AltroMonumentoIcon fill='var(--primary)' />}
    </>
  )
}

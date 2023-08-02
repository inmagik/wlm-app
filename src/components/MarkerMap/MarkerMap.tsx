interface Props {
  monument: {
    app_category: string
    pictures_wlm_count: number
    in_contest: boolean
  }
}

export default function getMarkerMap({ monument }: Props) {
  const photosNumber = monument.pictures_wlm_count ?? 0
  const inContest = monument.in_contest
  const category = monument.app_category
  if (category === 'Castelli') {
    if (photosNumber === 0) {
      if (inContest) {
        return '/markers/Castelli/NoFoto/Concorso.png'
      } else {
        return '/markers/Castelli/NoFoto/NOConcorso.png'
      }
    } else if (photosNumber > 0 && photosNumber <= 10) {
      if (inContest) {
        return '/markers/Castelli/1-10/Concorso.png'
      } else {
        return '/markers/Castelli/1-10/NOConcorso.png'
      }
    } else if (photosNumber > 10) {
      if (inContest) {
        return '/markers/Castelli/_10/Concorso.png'
      } else {
        return '/markers/Castelli/_10/NOConcorso.png'
      }
    }
  } else if (category === 'Comune') {
    if (photosNumber === 0) {
      if (inContest) {
        return '/markers/Comuni/NoFoto/Concorso.png'
      } else {
        return '/markers/Comuni/NoFoto/NOConcorso.png'
      }
    } else if (photosNumber > 0 && photosNumber <= 10) {
      if (inContest) {
        return '/markers/Comuni/1-10/Concorso.png'
      } else {
        return '/markers/Comuni/1-10/NOConcorso.png'
      }
    } else if (photosNumber > 10) {
      if (inContest) {
        return '/markers/Comuni/_10/Concorso.png'
      } else {
        return '/markers/Comuni/_10/NOConcorso.png'
      }
    }
  } else if (category === 'Alberi monumentali') {
    if (photosNumber === 0) {
      if (inContest) {
        return '/markers/Alberi/NoFoto/Concorso.png'
      } else {
        return '/markers/Alberi/NoFoto/NOConcorso.png'
      }
    } else if (photosNumber > 0 && photosNumber <= 10) {
      if (inContest) {
        return '/markers/Alberi/1-10/Concorso.png'
      } else {
        return '/markers/Alberi/1-10/NOConcorso.png'
      }
    } else if (photosNumber > 10) {
      if (inContest) {
        return '/markers/Alberi/_10/Concorso.png'
      } else {
        return '/markers/Alberi/_10/NOConcorso.png'
      }
    }
  } else if (category === 'Musei') {
    if (photosNumber === 0) {
      if (inContest) {
        return '/markers/Musei/NoFoto/Concorso.png'
      } else {
        return '/markers/Musei/NoFoto/NOConcorso.png'
      }
    } else if (photosNumber > 0 && photosNumber <= 10) {
      if (inContest) {
        return '/markers/Musei/1-10/Concorso.png'
      } else {
        return '/markers/Musei/1-10/NOConcorso.png'
      }
    } else if (photosNumber > 10) {
      if (inContest) {
        return '/markers/Musei/_10/Concorso.png'
      } else {
        return '/markers/Musei/_10/NOConcorso.png'
      }
    }
  } else if (category === 'Edifici religiosi') {
    if (photosNumber === 0) {
      if (inContest) {
        return '/markers/Chiese/NoFoto/Concorso.png'
      } else {
        return '/markers/Chiese/NoFoto/NOConcorso.png'
      }
    } else if (photosNumber > 0 && photosNumber <= 10) {
      if (inContest) {
        return '/markers/Chiese/1-10/Concorso.png'
      } else {
        return '/markers/Chiese/1-10/NOConcorso.png'
      }
    } else if (photosNumber > 10) {
      if (inContest) {
        return '/markers/Chiese/_10/Concorso.png'
      } else {
        return '/markers/Chiese/_10/NOConcorso.png'
      }
    }
  } else if (category === 'Altri monumenti') {
    if (photosNumber === 0) {
      if (inContest) {
        return '/markers/AltriMonumenti/NoFoto/Concorso.png'
      } else {
        return '/markers/AltriMonumenti/NoFoto/NOConcorso.png'
      }
    } else if (photosNumber > 0 && photosNumber <= 10) {
      if (inContest) {
        return '/markers/AltriMonumenti/1-10/Concorso.png'
      } else {
        return '/markers/AltriMonumenti/1-10/NOConcorso.png'
      }
    } else if (photosNumber > 10) {
      if (inContest) {
        return '/markers/AltriMonumenti/_10/Concorso.png'
      } else {
        return '/markers/AltriMonumenti/_10/NOConcorso.png'
      }
    }
  } else {
    if (photosNumber === 0) {
      if (inContest) {
        return '/markers/AltriMonumenti/NoFoto/Concorso.png'
      } else {
        return '/markers/AltriMonumenti/NoFoto/NOConcorso.png'
      }
    } else if (photosNumber > 0 && photosNumber <= 10) {
      if (inContest) {
        return '/markers/AltriMonumenti/1-10/Concorso.png'
      } else {
        return '/markers/AltriMonumenti/1-10/NOConcorso.png'
      }
    } else if (photosNumber > 10) {
      if (inContest) {
        return '/markers/AltriMonumenti/_10/Concorso.png'
      } else {
        return '/markers/AltriMonumenti/_10/NOConcorso.png'
      }
    }
  }
}

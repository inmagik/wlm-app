import { useQuery } from '@tanstack/react-query'
import { URL_WIKI } from '../const'
import { Comune } from '../types'
import axios from 'axios'

export async function getProfileImages(username: string) {
  return (await axios.get(`https://commons.wikimedia.org/wiki/Special:ListFiles/Ysogo`))
    .data as Comune[]
}

export function useProfileImages(username: string = '') {
  return useQuery(
    ['municipality', username],
    () => getProfileImages(username),
    {
      keepPreviousData: true,
      suspense: false,
      enabled: !!username,
    }
  )
}

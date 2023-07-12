import { useQuery } from '@tanstack/react-query'
import { API_URL, API_URL_SECOND } from '../const'
import { Comune } from '../types'
import axios from 'axios'
import { serializeQueryParams } from './utils'

export async function getComuni(
  params: Record<string, any> = {},
  signal?: AbortSignal
) {
  return (
    await axios.get(`${API_URL_SECOND}/municipality/`, {
      signal,
      params: serializeQueryParams(params),
    })
  ).data as Comune[]
}

export function useComuni(params: Record<string, any> = {}) {
  return useQuery(
    ['municipality', params],
    ({ signal }) => getComuni(params, signal),
    {
      keepPreviousData: true,
    }
  )
}
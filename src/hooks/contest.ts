import { useQuery } from '@tanstack/react-query'
import { API_URL } from '../const'
import { Contest } from '../types'
import axios from 'axios'

export async function getActiveContests(
  signal?: AbortSignal
) {
  return (
    await axios.get(`${API_URL}/active-contests/`, {
      signal,
    })
  ).data as Contest[]
}

export function useActiveContests() {
  return useQuery(
    ['active-contest'],
    ({ signal }) => getActiveContests(signal),
    {
      keepPreviousData: true,
      suspense: false,
    }
  )
}
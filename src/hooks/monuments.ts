import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { API_URL } from '../const'
import { Monument, MonumentList, PaginatedDJResponse } from '../types'
import axios from 'axios'
import { getNextPageParam, serializeQueryParams } from './utils'

export async function getMonuments(
  params: Record<string, any> = {},
  signal?: AbortSignal
) {
  return (
    await axios.get(`${API_URL}/monuments/`, {
      signal,
      params: serializeQueryParams(params),
    })
  ).data as PaginatedDJResponse<MonumentList>
}

export function useMonuments(params: Record<string, any> = {}) {
  return useQuery(
    ['monuments', params],
    ({ signal }) => getMonuments(params, signal),
    {
      keepPreviousData: true,
    }
  )
}

export function useInfiniteMomuments(params: Record<string, any> = {}) {
  return useInfiniteQuery(
    ['infiniteMonuments', params],
    ({ signal, pageParam }) =>
      getMonuments(
        {
          ...params,
          ...pageParam,
        },
        signal
      ),
    {
      keepPreviousData: true,
      getNextPageParam: getNextPageParam,
    }
  )
}

export async function getMonument(
  idOrSlug: string | number,
  signal?: AbortSignal
) {
  return (await axios.get(`${API_URL}/monuments/${idOrSlug}/`, { signal }))
    .data as Monument
}

export function useMonument(idOrSlug: string | number) {
  return useQuery(['monument', idOrSlug], ({ signal }) =>
    getMonument(idOrSlug, signal)
  ).data!
}

interface CategoryDomain {
  name: string
  categories: number[]
}

export async function getCategoriesDomain(signal?: AbortSignal) {
  return (
    await axios.get(`${API_URL}/categories-domain/`, {
      signal,
    })
  ).data as CategoryDomain[]
}

export function useCategoriesDomain() {
  return useQuery(['categories-domain'], () => getCategoriesDomain(), {
    suspense: false,
  })
}
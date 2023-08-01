import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { API_URL } from '../const'
import {
  CategoryDomain,
  Monument,
  MonumentList,
  PaginatedDJResponse,
  UploadedImage,
} from '../types'
import axios from 'axios'
import { getNextPageParam, serializeQueryParams } from './utils'
import { ImageInfo } from '../components/Mobile/BlockUpload/BlockUpload'
import { useAuthUser } from 'use-eazy-auth'
import dayjs from 'dayjs'

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

export async function uploadImages(images: ImageInfo[], token?: string) {
  const formData = new FormData()
  
  images.forEach((image, i) => {
    formData.append(`images[${i}]image`, image.file as Blob)
    formData.append(`images[${i}]title`, image.title)
    formData.append(`images[${i}]description`, image.description)
    formData.append(`images[${i}]date`, image.date)
    formData.append(`images[${i}]monument_id`, String(image.monument_id))
  })
  return (
    await axios.post(`${API_URL}/upload-images/`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
  )
}


export async function personalImages(token: string) {
  return (
    await axios.get<UploadedImage[]>(`${API_URL}/personal-contributions/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
  )
}

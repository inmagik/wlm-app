import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { API_URL } from '../const'
import {
  CategoryDomain,
  Monument,
  MonumentList,
  PaginatedDJResponse,
} from '../types'
import axios from 'axios'
import { getNextPageParam, serializeQueryParams } from './utils'
import { ImageInfo } from '../components/Mobile/BlockUpload/BlockUpload'

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

export async function uploadImages(images: ImageInfo[], signal?: AbortSignal) {
  console.log(images, 'images')
  const formData = new FormData()
  images.forEach((image, i) => {
    formData.append(`image_${i}`, image.file as Blob)
    formData.append(`image_${i}_title`, image.title)
    formData.append(`image_${i}_description`, image.description)
    formData.append(`image_${i}_date`, image.date)
    formData.append(`image_${i}_monument_id`, String(image.monument_id))
  })
  console.log(formData, 'formData')
  return (
    await axios.post(`${API_URL}/upload-images/`, formData, {
      signal,
    })
  ).data
}

// export async function useAddImages({ images }: { images: ImageProps[] }) {
//   return useQuery(['add-images'], () => uploadImages(images), {
//     suspense: false,
//   })
// }

import { PaginatedDJResponse } from "../types"

export function serializeQueryParams(params: Record<string, any>) {
  const searchParams = new URLSearchParams()
  Object.keys(params).forEach((key) => {
    const value = params[key]
    if (Array.isArray(value)) {
      value.forEach((v) => {
        searchParams.append(key, v)
      })
    } else {
      searchParams.append(key, value)
    }
  })
  return searchParams
}

export function getNextPageParam(
  lastPage: PaginatedDJResponse,
  _: PaginatedDJResponse[]
) {
  if (!lastPage.next) {
    return false
  }
  const parsed = new URLSearchParams(new URL(lastPage.next).search)
  return {
    page: parseInt(parsed.get('page') ?? '1'),
  }
}

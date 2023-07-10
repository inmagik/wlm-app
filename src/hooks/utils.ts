import { useCallback, useEffect, useRef } from "react"
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

export default function useDebounceCallback(
    cb: (...args: any[]) => void,
    delay = 0,
    args: any[] = []
  ) {
    const lastTimeoutId = useRef<ReturnType<typeof setTimeout>>()
    const mounted = useRef(true)
  
    useEffect(() => {
      mounted.current = true
      return () => {
        mounted.current = false
      }
    }, [])
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const memoCb = useCallback(cb, args)
  
    const callback = useCallback(
      (...params: any[]) => {
        if (lastTimeoutId.current) {
          clearTimeout(lastTimeoutId.current)
        }
        lastTimeoutId.current = setTimeout(() => {
          if (mounted.current) {
            memoCb(...params)
          }
        }, delay)
      },
      [memoCb, delay]
    )
  
    return callback
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

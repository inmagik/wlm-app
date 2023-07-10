import {
    startTransition,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
  } from 'react'
  import { createSearchParams, useSearchParams } from 'react-router-dom'
  import useDebounceCallback from './utils'
  
  export type InitFilterFn<T> = (params: URLSearchParams) => T
  
  export type FiltersResult<T> = {
    filters: T
    uiFilters: T
    setFilters(nextFilters: Partial<T>): void
    setFiltersDebounced(nextFilters: Partial<T>): void
  }
  
  export function useGetLastValue<T>(value: T) {
    const valueRef = useRef<T>(value)
    useEffect(() => {
      valueRef.current = value
    })
    return useCallback(() => valueRef.current, [])
  }
  
  export function useQsFilters<T>(
    initFn: InitFilterFn<T>,
    debounceTime = 150
  ): FiltersResult<T> {
    const [searchParams, setSearchParams] = useSearchParams()
  
    const filtersFromParams = useMemo(
      () => initFn(searchParams),
      [initFn, searchParams]
    )
  
    const [filters, setFilters] = useState(filtersFromParams)
    const [uiFilters, setUiFilters] = useState(filtersFromParams)
  
    const queryStringFilters = useMemo(
      () => createSearchParams(filters as any).toString(),
      [filters]
    )
    const queryStringParams = useMemo(
      () => createSearchParams(filtersFromParams as any).toString(),
      [filtersFromParams]
    )
    if (queryStringFilters !== queryStringParams) {
      setUiFilters(filtersFromParams)
      setFilters(filtersFromParams)
    }
    const getLastFilters = useGetLastValue(filters)
  
    const setDataFilters = useCallback(
      (newFilters: Partial<T>) => {
        setFilters((prevFilters) => ({
          ...prevFilters,
          ...newFilters,
        }))
        setSearchParams({
          ...(getLastFilters() as any),
          ...newFilters,
        })
      },
      [getLastFilters, setSearchParams]
    )
  
    const setDataFiltersDebounced = useDebounceCallback(
      setDataFilters,
      debounceTime
    )
  
    const setAllFilters = useCallback(
      (newFilters: Partial<T>) => {
        setUiFilters((prevUiFilters) => ({
          ...prevUiFilters,
          ...newFilters,
        }))
        startTransition(() => {
          setDataFilters(newFilters)
        })
      },
      [setDataFilters]
    )
  
    const setAllFiltersDebounced = useCallback(
      (newFilters: Partial<T>) => {
        setUiFilters((prevUiFilters) => ({
          ...prevUiFilters,
          ...newFilters,
        }))
        startTransition(() => {
          setDataFiltersDebounced(newFilters)
        })
      },
      [setDataFiltersDebounced]
    )
  
    return useMemo(
      () => ({
        uiFilters,
        filters,
        setFilters: setAllFilters,
        setFiltersDebounced: setAllFiltersDebounced,
      }),
      [filters, setAllFilters, setAllFiltersDebounced, uiFilters]
    )
  }
  
  export function useStateFilters<T>(
    initialFilters: T,
    debounceTime = 150
  ): FiltersResult<T> {
  
    const [filters, setFilters] = useState(initialFilters)
    const [uiFilters, setUiFilters] = useState(initialFilters)
  
    const setDataFilters = useCallback(
      (newFilters: Partial<T>) => {
        setFilters((prevFilters) => ({
          ...prevFilters,
          ...newFilters,
        }))
      },
      []
    )
  
    const setDataFiltersDebounced = useDebounceCallback(
      setDataFilters,
      debounceTime
    )
  
    const setAllFilters = useCallback(
      (newFilters: Partial<T>) => {
        setUiFilters((prevUiFilters) => ({
          ...prevUiFilters,
          ...newFilters,
        }))
        startTransition(() => {
          setDataFilters(newFilters)
        })
      },
      [setDataFilters]
    )
  
    const setAllFiltersDebounced = useCallback(
      (newFilters: Partial<T>) => {
        setUiFilters((prevUiFilters) => ({
          ...prevUiFilters,
          ...newFilters,
        }))
        startTransition(() => {
          setDataFiltersDebounced(newFilters)
        })
      },
      [setDataFiltersDebounced]
    )
  
    return useMemo(
      () => ({
        uiFilters,
        filters,
        setFilters: setAllFilters,
        setFiltersDebounced: setAllFiltersDebounced,
      }),
      [filters, setAllFilters, setAllFiltersDebounced, uiFilters]
    )
  }
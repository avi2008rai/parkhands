import _ from 'lodash'
import { useMemo, useState, useCallback, useRef } from 'react'

import { useUserContext } from './useUserContext'

type FetchResult<T> = {
  loading: boolean
  error: Error | null
  statusCode?: number
  data?: T
  cancel: () => void
}
type Fetch<T, V> = [
  (requestParams?: SendRequestParams<V>) => Promise<Response | undefined>,
  FetchResult<T>,
]
type SendRequestParams<V> = {
  url?: string
  body?: V
  headers?: HeadersInit
}
type FetchOptions = {
  baseUrl: RequestInfo
  method?: string
  sendJwt?: boolean
  contentType?: string | null
  throwErrors?: boolean
}
/**
 * const [sendRequest, { loading, data, statusCode }] = useFetch<Response, Body>({ method: 'GET', baseUrl: '/api/endpoint' })
 * const [sendRequest] = useFetch<Response, Body>({ method: 'POST', baseUrl: '/api/endpoint' })
 *
 * sendRequest({
 *   body: { param1: 'value1' }
 * })
 *
 * @param method string
 * @param baseUrl string
 */
export const useFetch = <T, V = any>({
  baseUrl,
  method = 'GET',
  sendJwt = true,
  contentType = 'application/json; charset=UTF-8',
  throwErrors = false,
}: FetchOptions): Fetch<T, V> => {
  const isMounted = useRef(true)
  const { jwtToken } = useUserContext()
  const [data, setData] = useState<T | undefined>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [statusCode, setStatusCode] = useState<number | undefined>()

  const authHeader = useMemo(() => {
    return sendJwt ? { Authorization: `Bearer ${jwtToken}` } : undefined
  }, [jwtToken, sendJwt])

  const contentTypeHeader = useMemo(() => {
    return contentType ? { 'Content-Type': contentType } : undefined
  }, [contentType])

  const sendRequest = useCallback(
    async ({ body, headers, url }: SendRequestParams<V> = {}) => {
      setLoading(true)
      const response = await fetch(url || baseUrl, {
        method,
        headers: {
          ...authHeader,
          ...contentTypeHeader,
          ...headers,
        },
        body: body && JSON.stringify(body),
      })
      if (!isMounted.current) {
        return
      }
      setLoading(false)

      // Handle response
      setStatusCode(response.status)

      const newData = ((await response.json()) as unknown) as T
      setData(newData)

      if (response.status > 299) {
        const error = new Error(_.get(newData, 'message', `useFetch error: ${response.status}`))
        if (throwErrors) {
          throw error
        } else {
          setError(error)
        }
      }

      return response
    },
    [baseUrl, authHeader, contentTypeHeader, throwErrors],
  )

  const response = useMemo(
    (): FetchResult<T> => ({
      loading,
      statusCode,
      data,
      error,
      cancel: () => {
        isMounted.current = false
      },
    }),
    [error, loading, statusCode, data],
  )

  return [sendRequest, response]
}

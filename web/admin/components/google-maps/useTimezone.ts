import _ from 'lodash'
import getConfig from 'next/config'

import { useFetch } from 'components/hooks/useFetch'

const { publicRuntimeConfig } = getConfig()

const timezoneApi = 'https://maps.googleapis.com/maps/api/timezone/json'

/* https://developers.google.com/maps/documentation/timezone/intro#Responses */
type TimezoneResult = {
  status:
    | 'OK'
    | 'ZERO_RESULTS'
    | 'OVER_DAILY_LIMIT'
    | 'OVER_QUERY_LIMIT'
    | 'INVALID_REQUEST'
    | 'REQUEST_DENIED'
    | 'UNKNOWN_ERROR'
  dstOffset?: 0
  rawOffset?: 7200
  timeZoneId?: string
  timeZoneName?: string
  errorMessage?: string
}

/**
 * Docs: https://developers.google.com/maps/documentation/timezone/intro#RequiredParam
 */
export const useTimezone = () => {
  const url = new URL(timezoneApi)
  url.searchParams.append('key', publicRuntimeConfig.GOOGLE_MAPS_API_KEY)
  url.searchParams.append('timestamp', '0')

  const [sendRequest, { loading, data }] = useFetch<TimezoneResult>({
    method: 'GET',
    baseUrl: url.toString(),
    sendJwt: false,
    contentType: null,
  })

  return {
    loading,
    error: data?.status !== 'OK',
    timezone: data,
    retrieveTimezone({ lat, lng }: google.maps.LatLngLiteral) {
      url.searchParams.append('location', `${lat},${lng}`)
      return sendRequest({ url: url.toString() })
    },
  }
}

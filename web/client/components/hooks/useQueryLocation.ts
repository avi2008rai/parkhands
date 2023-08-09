import { useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import parseLocation from 'common/utils/parseLocation'

import { ParsedLocation } from '.'

type QueryLocation = {
  error: boolean
  location: ParsedLocation
}
export function useQueryLocation(): QueryLocation {
  const { query } = useRouter()
  const [error, setError] = useState(false)

  const location = useMemo(() => {
    if (query.location) {
      try {
        return parseLocation(query.location as string)
      } catch (error) {
        setError(true)
      }
    }
    return null
  }, [query.location])

  return {
    error,
    location,
  }
}

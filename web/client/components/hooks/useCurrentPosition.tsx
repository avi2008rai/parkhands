// Copied from https://github.com/bsonntag/react-use-geolocation/blob/main/src/use-current-position.js

import { useEffect, useState } from 'react'

export function useCurrentPosition(options?: PositionOptions) {
  const [position, setPosition] = useState<Position>()
  const [error, setError] = useState<PositionError>()

  useEffect(() => {
    let canceled = false
    // https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPositionError/code
    //
    // Don't ask for position if the user has denied permissions.
    if (error && error.code === error.PERMISSION_DENIED) {
      console.log('Not getting current position because there has been a permission error')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (!canceled) {
          setPosition(position)
        }
      },
      (error) => {
        if (!canceled) {
          setError(error)
          console.error(error)
        }
      },
      options,
    )

    return () => {
      canceled = true
    }
  }, [options])

  return [position, error] as [Position | undefined, PositionError | undefined]
}

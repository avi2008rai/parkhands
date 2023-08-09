import { useEffect, useState } from 'react'

export function useCurrentPosition(options?: PositionOptions) {
  const [position, setPosition] = useState<Position>()
  const [error, setError] = useState<PositionError>()

  useEffect(() => {
    let canceled = false

    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (!canceled) {
          setPosition(position)
        }
      },
      (error) => {
        if (!canceled) {
          setError(error)
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

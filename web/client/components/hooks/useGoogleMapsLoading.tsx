import React, { useState, createContext, useContext, ReactNode } from 'react'

type GoogleMapsLoadingContext = {
  loaded: boolean
  startLoading: () => void
  finishLoading: () => void
  error?: Error
  setError: (error: Error) => void
}

const DefaultContext = (): GoogleMapsLoadingContext => {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState<Error>()
  return {
    loaded,
    startLoading: () => setLoaded(false),
    finishLoading: () => setLoaded(true),
    error,
    setError,
  }
}

const GoogleMapsLoadingContext = createContext<GoogleMapsLoadingContext>(null as any)

export function GoogleMapsLoadingProvider({ children }: { children?: ReactNode }) {
  const { Provider } = GoogleMapsLoadingContext
  return <Provider value={DefaultContext()}>{children}</Provider>
}

export function useGoogleMapsLoading() {
  return useContext(GoogleMapsLoadingContext)
}

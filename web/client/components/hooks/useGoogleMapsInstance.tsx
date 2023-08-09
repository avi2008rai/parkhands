import React, { useState, createContext, useContext, ReactNode } from 'react'

type GoogleMapsInstanceContext = {
  map?: google.maps.Map
  setMap: (map: google.maps.Map) => void
}

const DefaultContext = (): GoogleMapsInstanceContext => {
  const [map, setMap] = useState<google.maps.Map>()
  return {
    map,
    setMap: (map) => setMap(map),
  }
}

const GoogleMapsInstanceContext = createContext<GoogleMapsInstanceContext>(null as any)

export function GoogleMapsInstanceProvider({ children }: { children?: ReactNode }) {
  const { Provider } = GoogleMapsInstanceContext
  return <Provider value={DefaultContext()}>{children}</Provider>
}

export function useGoogleMapsInstance() {
  return useContext(GoogleMapsInstanceContext)
}

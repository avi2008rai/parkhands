import getConfig from 'next/config'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLoadScript } from '@react-google-maps/api'

import { useGoogleMapsLoading } from 'components/hooks/useGoogleMapsLoading'

const config = getConfig().publicRuntimeConfig
const libraries = ['geometry', 'places']
// geometry - for utils for measuring distance between points
// places - for the search functionality

export default function LoadGoogleMaps({ children }: React.PropsWithChildren<{}>) {
  const { finishLoading, setError } = useGoogleMapsLoading()
  const { i18n } = useTranslation()
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: config.GOOGLE_MAPS_API_KEY,
    language: i18n.language,
    region: i18n.language === 'de' ? 'DE' : 'US',
    libraries,
  })
  useEffect(() => {
    if (isLoaded) {
      finishLoading()
    }
  }, [isLoaded])

  useEffect(() => {
    if (loadError) {
      setError(loadError)
    }
  }, [loadError])

  return <>{children}</> // Why wrap with Fragment? Answer: https://stackoverflow.com/a/54908762
}

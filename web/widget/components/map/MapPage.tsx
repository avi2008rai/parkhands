import Head from 'next/head'
import React, { useMemo } from 'react'
import { useRouter } from 'next/dist/client/router'

import { SelectedSlotProvider } from 'components/hooks/useSelectedSlot'
import SlotsMap from 'components/map/SlotsMap'

const defaultLocation = [52.264537, 10.542015]
const locationRegex = /@(-?\d+\.\d+),(-?\d+\.\d+),?(\d+)?z?/

export default function MapPage() {
  const router = useRouter()
  const { providerId, params } = router.query
  const [location] = params || [defaultLocation]

  const parsed = useMemo(() => {
    const [match, lat, lng, zoom] = locationRegex.exec(location as string) || []
    if (!match) {
      const [lat, lng] = defaultLocation
      return {
        center: { lat, lng },
        zoom: 6,
      }
    }
    return {
      center: {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      },
      zoom: isNaN(parseInt(zoom, 10)) ? 16 : parseInt(zoom, 10),
    }
  }, [location])

  return (
    <>
      <Head>
        <style>{`html, body, #__next { width: 100%; height: 100%; }`}</style>
      </Head>
      <SelectedSlotProvider>
        <SlotsMap center={parsed.center} zoom={parsed.zoom} providerId={providerId as string} />
      </SelectedSlotProvider>
    </>
  )
}

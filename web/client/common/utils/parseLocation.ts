import { ParsedLocation } from 'components/hooks'
import { latitude, longitude } from 'common/validators'

const locationRegex = /@(-?\d+\.\d+),(-?\d+\.\d+),?(\d+)?z?/

export default function parseLocation(locationString: string): ParsedLocation {
  const [match, lat, lng, zoom] = locationRegex.exec(locationString) || []
  if (!match) {
    throw new Error('Invalid location format')
  }
  try {
    return {
      lat: latitude.validateSync(lat),
      lng: longitude.validateSync(lng),
      zoom: parseInt(zoom, 10) || 15,
    }
  } catch (error) {
    // console.error(error)
    throw error
  }
}

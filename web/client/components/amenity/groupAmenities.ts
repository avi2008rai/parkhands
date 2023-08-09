import _ from 'lodash'

import { PickArrayType } from 'gql/schema'
import { Slot } from 'components/hooks/useSelectedSlot'

type Amenity = PickArrayType<Slot['slotAmenitiesList']>
const categoriesSlugs = ['business', 'private']

function returnAmenityType(amenity: Amenity) {
  if (_.includes(categoriesSlugs, amenity.amenity?.slug)) {
    return 'categories'
  }
  return 'amenities'
}

type GroupAmenitiesReturnType = {
  categories: Amenity[]
  amenities: Amenity[]
}

export default function groupAmenities(amenities: Amenity[]): GroupAmenitiesReturnType {
  return { categories: [], amenities: [], ..._.groupBy(amenities, returnAmenityType) }
}

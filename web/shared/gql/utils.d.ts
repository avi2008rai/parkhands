import { FeatureCollection, Point, Polygon } from 'geojson'
import { StatusT } from 'gql/schema'

type RegisterMutationVariables = {
  payload: {
    name: string
    email: string
    password: string
  }
}

type UserStatusLowercase = 'enabled' | 'disabled' | 'pending'
type UserRoleString =
  | 'app_anonymous'
  | 'app_single_member'
  | 'app_provider'
  | 'app_provider_premium'
  | 'app_super_admin'
type UserAddress = {}

type SettingType = 'system' | 'custom'
type Settings = {}
type SettingsStorage = {
  [key in SettingType]?: Settings
}

// Billing Profile
type Address = {
  city: string
  country: string // ISO 3166-1 alpha-2
  line1: string
  line2: string
  postal_code: string
  state: string
}
type BillingDetails = {
  name: string
  email: string
  phone: string
  address: Address
  shipping?: {
    name: string
    phone: string
    address: Address
  }
  currency: string
  vatNumber: string
}
type BillingProfile = {
  id: string | null
  customer_id: string | null
  billing_details: BillingDetails | null
}
type UserSubscription = {
  id: string | null
  billing_profile_id: string | null
  plan_subscription_id: string | null
  created_at: string | null
  ends_at: string | null
  status:
    | 'active'
    | 'past_due'
    | 'unpaid'
    | 'canceled'
    | 'incomplete'
    | 'incomplete_expired'
    | 'trialing'
}

type CurrentUser = {
  id: string
  name: string
  email: string
  self_reged: boolean
  phone: string | null
  role: UserRoleString
  status: UserStatusLowercase
  address?: UserAddress
  settings: SettingsStorage | null
  billing_profile: BillingProfile
  user_subscriptions: UserSubscription
}

type CurrentUserQuery = {
  currentUser: CurrentUser
}

type CreateUser = {
  id?: string
  name: string
  email: string
  role: UserRoleString
  status: StatusT
  address?: UserAddress
  photo_url?: string
}

type CreateUserInput = {
  payload: CreateUser
}

/**
 * Dataset types
 */
namespace Dataset {
  type Tags = {
    [key: string]: string
  }
  type Slot = {
    id: string | number
    type: 'car' | 'bus' | 'handicapped'
    confidence: number
    shape: Polygon
    location: Point
    tags?: Tags
  }
  type Block = {
    id?: string | number
    shape: Polygon
    area: number
    capacity: number
    location?: Point
    tags?: Tags
    slots: Slot[]
  }
  type Space = {
    id: string | number
    shape: Polygon
    entry_ramps: FeatureCollection | null
    exit_ramps: FeatureCollection | null
    type: 'ground' | 'rooftop' | 'street'
    review_state: 'unreviewed' | 'accepted' | 'rejected'
    capacity?: number
    confidence?: number
    area: number
    source: {
      image_name: string
      image_time: string
    } | null
    tags?: Tags
    blocks: Block[]
  }
  type Dataset = {
    last_modified: string
    slot_count: number
    space_count: number
    version: string
    spaces: Space[]
  }
  type StaticSlot = {
    id: string
    static: true
    staticSpaceId: string
    status: SlotStatusT
    booked: boolean
    inWorkingHours: boolean
    inAmenities: boolean
    location: {
      longitude: number
      latitude: number
    }
    shape: Polygon
  }
  type StaticSpace = {
    id: string
    name: string
    photoUrl: string | null
    // Static data
    static: true
    staticId: string | number
    slotsCount: number
    shape?: Polygon
  }
  type StaticSpaces = {
    spaces: StaticSpace[]
  }
}

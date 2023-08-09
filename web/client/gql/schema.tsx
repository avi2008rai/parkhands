// Regenerate file by running `npm run graphql-gen-types`
import { GeometryObject } from 'geojson'
import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type PickArrayType<T> = T extends (infer U)[] ? U : NonNullable<T>
export const crs = { type: 'name', properties: { name: 'urn:ogc:def:crs:EPSG::4326' } }
export type Maybe<T> = T | null | undefined
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
// Generated on 2021-10-01T22:11:29+05:30

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A location in a connection that can be used for resuming pagination. */
  Cursor: any
  /** A universally unique identifier as defined by [RFC 4122](https://tools.ietf.org/html/rfc4122). */
  UUID: string
  /** A point in time as described by the [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) standard. May or may not include a timezone. */
  Datetime: Date
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { [key: string]: unknown }
  /** A floating point number that requires more precision than IEEE 754 binary 64 */
  BigFloat: any
  /** The `GeoJSON` scalar type represents GeoJSON values as specified by[RFC 7946](https://tools.ietf.org/html/rfc7946). */
  GeoJSON: GeometryObject
  Email: string
  /** Relaxed phone number validation */
  PhoneUs: any
  /** The day, does not include a time. */
  Date: any
  /** The exact time of day, does not include the date. May or may not have a timezone offset. */
  Time: string
  /** A JSON Web Token defined by [RFC 7519](https://tools.ietf.org/html/rfc7519) which securely represents claims between two parties. */
  JwtToken: string
}

/** The root query type which gives access points into the data universe. */
export type Query = Node & {
  /** Exposes the root query type nested one level down. This is helpful for Relay 1 which can only query top level fields if they are in a particular form. */
  query: Query
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  nodeId: Scalars['ID']
  /** Fetches an object given its globally unique `ID`. */
  node?: Maybe<Node>
  /** Reads and enables pagination through a set of `Amenity`. */
  amenities?: Maybe<AmenitiesConnection>
  /** Reads a set of `Amenity`. */
  amenitiesList?: Maybe<Array<Amenity>>
  /** Reads and enables pagination through a set of `BillingProfile`. */
  billingProfiles?: Maybe<BillingProfilesConnection>
  /** Reads a set of `BillingProfile`. */
  billingProfilesList?: Maybe<Array<BillingProfile>>
  /** Reads and enables pagination through a set of `Business`. */
  businesses?: Maybe<BusinessesConnection>
  /** Reads a set of `Business`. */
  businessesList?: Maybe<Array<Business>>
  /** Reads and enables pagination through a set of `Country`. */
  countries?: Maybe<CountriesConnection>
  /** Reads a set of `Country`. */
  countriesList?: Maybe<Array<Country>>
  /** Reads and enables pagination through a set of `Language`. */
  languages?: Maybe<LanguagesConnection>
  /** Reads a set of `Language`. */
  languagesList?: Maybe<Array<Language>>
  /** Reads and enables pagination through a set of `ParkingOpenHour`. */
  parkingOpenHours?: Maybe<ParkingOpenHoursConnection>
  /** Reads a set of `ParkingOpenHour`. */
  parkingOpenHoursList?: Maybe<Array<ParkingOpenHour>>
  /** Reads and enables pagination through a set of `ParkingSpace`. */
  parkingSpaces?: Maybe<ParkingSpacesConnection>
  /** Reads a set of `ParkingSpace`. */
  parkingSpacesList?: Maybe<Array<ParkingSpace>>
  /** Reads and enables pagination through a set of `ParkingSpaceAvailability`. */
  parkingSpaceAvailabilities?: Maybe<ParkingSpaceAvailabilitiesConnection>
  /** Reads a set of `ParkingSpaceAvailability`. */
  parkingSpaceAvailabilitiesList?: Maybe<Array<ParkingSpaceAvailability>>
  /** Reads and enables pagination through a set of `ParkingWorkingHour`. */
  parkingWorkingHours?: Maybe<ParkingWorkingHoursConnection>
  /** Reads a set of `ParkingWorkingHour`. */
  parkingWorkingHoursList?: Maybe<Array<ParkingWorkingHour>>
  /** Reads and enables pagination through a set of `PaymentReceipt`. */
  paymentReceipts?: Maybe<PaymentReceiptsConnection>
  /** Reads a set of `PaymentReceipt`. */
  paymentReceiptsList?: Maybe<Array<PaymentReceipt>>
  /** Reads and enables pagination through a set of `Slot`. */
  slots?: Maybe<SlotsConnection>
  /** Reads a set of `Slot`. */
  slotsList?: Maybe<Array<Slot>>
  /** Reads and enables pagination through a set of `SlotAmenity`. */
  slotAmenities?: Maybe<SlotAmenitiesConnection>
  /** Reads a set of `SlotAmenity`. */
  slotAmenitiesList?: Maybe<Array<SlotAmenity>>
  /** Reads and enables pagination through a set of `SlotAvailability`. */
  slotAvailabilities?: Maybe<SlotAvailabilitiesConnection>
  /** Reads a set of `SlotAvailability`. */
  slotAvailabilitiesList?: Maybe<Array<SlotAvailability>>
  /** Reads and enables pagination through a set of `SlotBooking`. */
  slotBookings?: Maybe<SlotBookingsConnection>
  /** Reads a set of `SlotBooking`. */
  slotBookingsList?: Maybe<Array<SlotBooking>>
  /** Reads and enables pagination through a set of `Translation`. */
  translations?: Maybe<TranslationsConnection>
  /** Reads a set of `Translation`. */
  translationsList?: Maybe<Array<Translation>>
  /** Reads and enables pagination through a set of `User`. */
  users?: Maybe<UsersConnection>
  /** Reads a set of `User`. */
  usersList?: Maybe<Array<User>>
  /** Reads and enables pagination through a set of `UserRole`. */
  userRoles?: Maybe<UserRolesConnection>
  /** Reads a set of `UserRole`. */
  userRolesList?: Maybe<Array<UserRole>>
  /** Reads and enables pagination through a set of `UserSubscription`. */
  userSubscriptions?: Maybe<UserSubscriptionsConnection>
  /** Reads a set of `UserSubscription`. */
  userSubscriptionsList?: Maybe<Array<UserSubscription>>
  /** Reads and enables pagination through a set of `Vehicle`. */
  vehicles?: Maybe<VehiclesConnection>
  /** Reads a set of `Vehicle`. */
  vehiclesList?: Maybe<Array<Vehicle>>
  /** Reads and enables pagination through a set of `VehicleSize`. */
  vehicleSizes?: Maybe<VehicleSizesConnection>
  /** Reads a set of `VehicleSize`. */
  vehicleSizesList?: Maybe<Array<VehicleSize>>
  /** Reads and enables pagination through a set of `VehicleType`. */
  vehicleTypes?: Maybe<VehicleTypesConnection>
  /** Reads a set of `VehicleType`. */
  vehicleTypesList?: Maybe<Array<VehicleType>>
  amenity?: Maybe<Amenity>
  billingProfile?: Maybe<BillingProfile>
  business?: Maybe<Business>
  businessBySlug?: Maybe<Business>
  country?: Maybe<Country>
  countryByCode?: Maybe<Country>
  countryByName?: Maybe<Country>
  language?: Maybe<Language>
  parkingOpenHour?: Maybe<ParkingOpenHour>
  parkingSpace?: Maybe<ParkingSpace>
  parkingSpaceBySlug?: Maybe<ParkingSpace>
  parkingSpaceAvailability?: Maybe<ParkingSpaceAvailability>
  parkingWorkingHour?: Maybe<ParkingWorkingHour>
  paymentReceipt?: Maybe<PaymentReceipt>
  slot?: Maybe<Slot>
  slotAmenity?: Maybe<SlotAmenity>
  slotAvailability?: Maybe<SlotAvailability>
  slotBooking?: Maybe<SlotBooking>
  translation?: Maybe<Translation>
  user?: Maybe<User>
  userSubscription?: Maybe<UserSubscription>
  vehicle?: Maybe<Vehicle>
  vehicleSize?: Maybe<VehicleSize>
  vehicleType?: Maybe<VehicleType>
  vehicleTypeByName?: Maybe<VehicleType>
  /** Returns ongoing and upcoming bookings */
  activeBooking?: Maybe<SlotBooking>
  canBookSlot?: Maybe<Scalars['String']>
  /** Check if email is free for registration */
  emailAvailable?: Maybe<Scalars['Boolean']>
  /** find businesss listings based on specific criterias */
  findBusiness: FindBusinessResultsConnection
  /** find businesss listings based on specific criterias */
  findBusinessList?: Maybe<Array<FindBusinessResult>>
  /** find slots based on specific criterias */
  findSlots: FindSlotsResultsConnection
  /** find slots based on specific criterias */
  findSlotsList?: Maybe<Array<FindSlotsResult>>
  /** get list of api keys for user */
  getApiKeys: GetApiKeysResultsConnection
  /** get list of api keys for user */
  getApiKeysList?: Maybe<Array<GetApiKeysResult>>
  me?: Maybe<Scalars['JSON']>
  /** fetch current booking status / note that this value changes depending on booking and working hours */
  slotBookingStatus?: Maybe<SlotAvailabilityBookingStatus>
  /** fetch limited data from slot_booking table */
  slotBookingTimes: SlotBookingTimesConnection
  /** fetch limited data from slot_booking table */
  slotBookingTimesList?: Maybe<Array<Maybe<SlotBookingTimesRecord>>>
  /** display timetable based on opening hours for multiple slots */
  slotTimetable: SlotTimetableResultsConnection
  /** display timetable based on opening hours for multiple slots */
  slotTimetableList?: Maybe<Array<SlotTimetableResult>>
  /** Get a boolean flag, depending on user role, premium returns true */
  userPremium?: Maybe<Scalars['Boolean']>
  /** Reads a single `Amenity` using its globally unique `ID`. */
  amenityByNodeId?: Maybe<Amenity>
  /** Reads a single `BillingProfile` using its globally unique `ID`. */
  billingProfileByNodeId?: Maybe<BillingProfile>
  /** Reads a single `Business` using its globally unique `ID`. */
  businessByNodeId?: Maybe<Business>
  /** Reads a single `Country` using its globally unique `ID`. */
  countryByNodeId?: Maybe<Country>
  /** Reads a single `Language` using its globally unique `ID`. */
  languageByNodeId?: Maybe<Language>
  /** Reads a single `ParkingOpenHour` using its globally unique `ID`. */
  parkingOpenHourByNodeId?: Maybe<ParkingOpenHour>
  /** Reads a single `ParkingSpace` using its globally unique `ID`. */
  parkingSpaceByNodeId?: Maybe<ParkingSpace>
  /** Reads a single `ParkingSpaceAvailability` using its globally unique `ID`. */
  parkingSpaceAvailabilityByNodeId?: Maybe<ParkingSpaceAvailability>
  /** Reads a single `ParkingWorkingHour` using its globally unique `ID`. */
  parkingWorkingHourByNodeId?: Maybe<ParkingWorkingHour>
  /** Reads a single `PaymentReceipt` using its globally unique `ID`. */
  paymentReceiptByNodeId?: Maybe<PaymentReceipt>
  /** Reads a single `Slot` using its globally unique `ID`. */
  slotByNodeId?: Maybe<Slot>
  /** Reads a single `SlotAmenity` using its globally unique `ID`. */
  slotAmenityByNodeId?: Maybe<SlotAmenity>
  /** Reads a single `SlotAvailability` using its globally unique `ID`. */
  slotAvailabilityByNodeId?: Maybe<SlotAvailability>
  /** Reads a single `SlotBooking` using its globally unique `ID`. */
  slotBookingByNodeId?: Maybe<SlotBooking>
  /** Reads a single `Translation` using its globally unique `ID`. */
  translationByNodeId?: Maybe<Translation>
  /** Reads a single `User` using its globally unique `ID`. */
  userByNodeId?: Maybe<User>
  /** Reads a single `UserSubscription` using its globally unique `ID`. */
  userSubscriptionByNodeId?: Maybe<UserSubscription>
  /** Reads a single `Vehicle` using its globally unique `ID`. */
  vehicleByNodeId?: Maybe<Vehicle>
  /** Reads a single `VehicleSize` using its globally unique `ID`. */
  vehicleSizeByNodeId?: Maybe<VehicleSize>
  /** Reads a single `VehicleType` using its globally unique `ID`. */
  vehicleTypeByNodeId?: Maybe<VehicleType>
}

/** The root query type which gives access points into the data universe. */
export type QueryNodeArgs = {
  nodeId: Scalars['ID']
}

/** The root query type which gives access points into the data universe. */
export type QueryAmenitiesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<AmenitiesOrderBy>>
  condition?: Maybe<AmenityCondition>
  filter?: Maybe<AmenityFilter>
}

/** The root query type which gives access points into the data universe. */
export type QueryAmenitiesListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<AmenitiesOrderBy>>
  condition?: Maybe<AmenityCondition>
  filter?: Maybe<AmenityFilter>
}

/** The root query type which gives access points into the data universe. */
export type QueryBillingProfilesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<BillingProfilesOrderBy>>
  condition?: Maybe<BillingProfileCondition>
  filter?: Maybe<BillingProfileFilter>
}

/** The root query type which gives access points into the data universe. */
export type QueryBillingProfilesListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<BillingProfilesOrderBy>>
  condition?: Maybe<BillingProfileCondition>
  filter?: Maybe<BillingProfileFilter>
}

/** The root query type which gives access points into the data universe. */
export type QueryBusinessesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<BusinessesOrderBy>>
  condition?: Maybe<BusinessCondition>
  filter?: Maybe<BusinessFilter>
}

/** The root query type which gives access points into the data universe. */
export type QueryBusinessesListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<BusinessesOrderBy>>
  condition?: Maybe<BusinessCondition>
  filter?: Maybe<BusinessFilter>
}

/** The root query type which gives access points into the data universe. */
export type QueryCountriesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<CountriesOrderBy>>
  condition?: Maybe<CountryCondition>
  filter?: Maybe<CountryFilter>
}

/** The root query type which gives access points into the data universe. */
export type QueryCountriesListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<CountriesOrderBy>>
  condition?: Maybe<CountryCondition>
  filter?: Maybe<CountryFilter>
}

/** The root query type which gives access points into the data universe. */
export type QueryLanguagesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<LanguagesOrderBy>>
  condition?: Maybe<LanguageCondition>
  filter?: Maybe<LanguageFilter>
}

/** The root query type which gives access points into the data universe. */
export type QueryLanguagesListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<LanguagesOrderBy>>
  condition?: Maybe<LanguageCondition>
  filter?: Maybe<LanguageFilter>
}

/** The root query type which gives access points into the data universe. */
export type QueryParkingOpenHoursArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<ParkingOpenHoursOrderBy>>
  condition?: Maybe<ParkingOpenHourCondition>
  filter?: Maybe<ParkingOpenHourFilter>
}

/** The root query type which gives access points into the data universe. */
export type QueryParkingOpenHoursListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<ParkingOpenHoursOrderBy>>
  condition?: Maybe<ParkingOpenHourCondition>
  filter?: Maybe<ParkingOpenHourFilter>
}

/** The root query type which gives access points into the data universe. */
export type QueryParkingSpacesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<ParkingSpacesOrderBy>>
  condition?: Maybe<ParkingSpaceCondition>
  filter?: Maybe<ParkingSpaceFilter>
}

/** The root query type which gives access points into the data universe. */
export type QueryParkingSpacesListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<ParkingSpacesOrderBy>>
  condition?: Maybe<ParkingSpaceCondition>
  filter?: Maybe<ParkingSpaceFilter>
}

/** The root query type which gives access points into the data universe. */
export type QueryParkingSpaceAvailabilitiesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<ParkingSpaceAvailabilitiesOrderBy>>
  condition?: Maybe<ParkingSpaceAvailabilityCondition>
  filter?: Maybe<ParkingSpaceAvailabilityFilter>
}

/** The root query type which gives access points into the data universe. */
export type QueryParkingSpaceAvailabilitiesListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<ParkingSpaceAvailabilitiesOrderBy>>
  condition?: Maybe<ParkingSpaceAvailabilityCondition>
  filter?: Maybe<ParkingSpaceAvailabilityFilter>
}

/** The root query type which gives access points into the data universe. */
export type QueryParkingWorkingHoursArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<ParkingWorkingHoursOrderBy>>
  condition?: Maybe<ParkingWorkingHourCondition>
  filter?: Maybe<ParkingWorkingHourFilter>
}

/** The root query type which gives access points into the data universe. */
export type QueryParkingWorkingHoursListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<ParkingWorkingHoursOrderBy>>
  condition?: Maybe<ParkingWorkingHourCondition>
  filter?: Maybe<ParkingWorkingHourFilter>
}

/** The root query type which gives access points into the data universe. */
export type QueryPaymentReceiptsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<PaymentReceiptsOrderBy>>
  condition?: Maybe<PaymentReceiptCondition>
  filter?: Maybe<PaymentReceiptFilter>
}

/** The root query type which gives access points into the data universe. */
export type QueryPaymentReceiptsListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<PaymentReceiptsOrderBy>>
  condition?: Maybe<PaymentReceiptCondition>
  filter?: Maybe<PaymentReceiptFilter>
}

/** The root query type which gives access points into the data universe. */
export type QuerySlotsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<SlotsOrderBy>>
  condition?: Maybe<SlotCondition>
  filter?: Maybe<SlotFilter>
}

/** The root query type which gives access points into the data universe. */
export type QuerySlotsListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<SlotsOrderBy>>
  condition?: Maybe<SlotCondition>
  filter?: Maybe<SlotFilter>
}

/** The root query type which gives access points into the data universe. */
export type QuerySlotAmenitiesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<SlotAmenitiesOrderBy>>
  condition?: Maybe<SlotAmenityCondition>
  filter?: Maybe<SlotAmenityFilter>
}

/** The root query type which gives access points into the data universe. */
export type QuerySlotAmenitiesListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<SlotAmenitiesOrderBy>>
  condition?: Maybe<SlotAmenityCondition>
  filter?: Maybe<SlotAmenityFilter>
}

/** The root query type which gives access points into the data universe. */
export type QuerySlotAvailabilitiesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<SlotAvailabilitiesOrderBy>>
  condition?: Maybe<SlotAvailabilityCondition>
  filter?: Maybe<SlotAvailabilityFilter>
}

/** The root query type which gives access points into the data universe. */
export type QuerySlotAvailabilitiesListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<SlotAvailabilitiesOrderBy>>
  condition?: Maybe<SlotAvailabilityCondition>
  filter?: Maybe<SlotAvailabilityFilter>
}

/** The root query type which gives access points into the data universe. */
export type QuerySlotBookingsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<SlotBookingsOrderBy>>
  condition?: Maybe<SlotBookingCondition>
  filter?: Maybe<SlotBookingFilter>
}

/** The root query type which gives access points into the data universe. */
export type QuerySlotBookingsListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<SlotBookingsOrderBy>>
  condition?: Maybe<SlotBookingCondition>
  filter?: Maybe<SlotBookingFilter>
}

/** The root query type which gives access points into the data universe. */
export type QueryTranslationsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<TranslationsOrderBy>>
  condition?: Maybe<TranslationCondition>
  filter?: Maybe<TranslationFilter>
}

/** The root query type which gives access points into the data universe. */
export type QueryTranslationsListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<TranslationsOrderBy>>
  condition?: Maybe<TranslationCondition>
  filter?: Maybe<TranslationFilter>
}

/** The root query type which gives access points into the data universe. */
export type QueryUsersArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<UsersOrderBy>>
  condition?: Maybe<UserCondition>
  filter?: Maybe<UserFilter>
}

/** The root query type which gives access points into the data universe. */
export type QueryUsersListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<UsersOrderBy>>
  condition?: Maybe<UserCondition>
  filter?: Maybe<UserFilter>
}

/** The root query type which gives access points into the data universe. */
export type QueryUserRolesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<UserRolesOrderBy>>
  condition?: Maybe<UserRoleCondition>
  filter?: Maybe<UserRoleFilter>
}

/** The root query type which gives access points into the data universe. */
export type QueryUserRolesListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<UserRolesOrderBy>>
  condition?: Maybe<UserRoleCondition>
  filter?: Maybe<UserRoleFilter>
}

/** The root query type which gives access points into the data universe. */
export type QueryUserSubscriptionsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<UserSubscriptionsOrderBy>>
  condition?: Maybe<UserSubscriptionCondition>
  filter?: Maybe<UserSubscriptionFilter>
}

/** The root query type which gives access points into the data universe. */
export type QueryUserSubscriptionsListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<UserSubscriptionsOrderBy>>
  condition?: Maybe<UserSubscriptionCondition>
  filter?: Maybe<UserSubscriptionFilter>
}

/** The root query type which gives access points into the data universe. */
export type QueryVehiclesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<VehiclesOrderBy>>
  condition?: Maybe<VehicleCondition>
  filter?: Maybe<VehicleFilter>
}

/** The root query type which gives access points into the data universe. */
export type QueryVehiclesListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<VehiclesOrderBy>>
  condition?: Maybe<VehicleCondition>
  filter?: Maybe<VehicleFilter>
}

/** The root query type which gives access points into the data universe. */
export type QueryVehicleSizesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<VehicleSizesOrderBy>>
  condition?: Maybe<VehicleSizeCondition>
  filter?: Maybe<VehicleSizeFilter>
}

/** The root query type which gives access points into the data universe. */
export type QueryVehicleSizesListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<VehicleSizesOrderBy>>
  condition?: Maybe<VehicleSizeCondition>
  filter?: Maybe<VehicleSizeFilter>
}

/** The root query type which gives access points into the data universe. */
export type QueryVehicleTypesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<VehicleTypesOrderBy>>
  condition?: Maybe<VehicleTypeCondition>
  filter?: Maybe<VehicleTypeFilter>
}

/** The root query type which gives access points into the data universe. */
export type QueryVehicleTypesListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<VehicleTypesOrderBy>>
  condition?: Maybe<VehicleTypeCondition>
  filter?: Maybe<VehicleTypeFilter>
}

/** The root query type which gives access points into the data universe. */
export type QueryAmenityArgs = {
  id: Scalars['UUID']
}

/** The root query type which gives access points into the data universe. */
export type QueryBillingProfileArgs = {
  id: Scalars['UUID']
}

/** The root query type which gives access points into the data universe. */
export type QueryBusinessArgs = {
  id: Scalars['UUID']
}

/** The root query type which gives access points into the data universe. */
export type QueryBusinessBySlugArgs = {
  slug: Scalars['String']
}

/** The root query type which gives access points into the data universe. */
export type QueryCountryArgs = {
  id: Scalars['UUID']
}

/** The root query type which gives access points into the data universe. */
export type QueryCountryByCodeArgs = {
  code: Scalars['String']
}

/** The root query type which gives access points into the data universe. */
export type QueryCountryByNameArgs = {
  name: Scalars['String']
}

/** The root query type which gives access points into the data universe. */
export type QueryLanguageArgs = {
  code: Scalars['String']
}

/** The root query type which gives access points into the data universe. */
export type QueryParkingOpenHourArgs = {
  id: Scalars['UUID']
}

/** The root query type which gives access points into the data universe. */
export type QueryParkingSpaceArgs = {
  id: Scalars['UUID']
}

/** The root query type which gives access points into the data universe. */
export type QueryParkingSpaceBySlugArgs = {
  slug: Scalars['String']
}

/** The root query type which gives access points into the data universe. */
export type QueryParkingSpaceAvailabilityArgs = {
  id: Scalars['UUID']
}

/** The root query type which gives access points into the data universe. */
export type QueryParkingWorkingHourArgs = {
  id: Scalars['UUID']
}

/** The root query type which gives access points into the data universe. */
export type QueryPaymentReceiptArgs = {
  id: Scalars['UUID']
}

/** The root query type which gives access points into the data universe. */
export type QuerySlotArgs = {
  id: Scalars['UUID']
}

/** The root query type which gives access points into the data universe. */
export type QuerySlotAmenityArgs = {
  id: Scalars['UUID']
}

/** The root query type which gives access points into the data universe. */
export type QuerySlotAvailabilityArgs = {
  id: Scalars['UUID']
}

/** The root query type which gives access points into the data universe. */
export type QuerySlotBookingArgs = {
  id: Scalars['UUID']
}

/** The root query type which gives access points into the data universe. */
export type QueryTranslationArgs = {
  id: Scalars['UUID']
}

/** The root query type which gives access points into the data universe. */
export type QueryUserArgs = {
  id: Scalars['UUID']
}

/** The root query type which gives access points into the data universe. */
export type QueryUserSubscriptionArgs = {
  id: Scalars['UUID']
}

/** The root query type which gives access points into the data universe. */
export type QueryVehicleArgs = {
  id: Scalars['UUID']
}

/** The root query type which gives access points into the data universe. */
export type QueryVehicleSizeArgs = {
  id: Scalars['UUID']
}

/** The root query type which gives access points into the data universe. */
export type QueryVehicleTypeArgs = {
  id: Scalars['UUID']
}

/** The root query type which gives access points into the data universe. */
export type QueryVehicleTypeByNameArgs = {
  name: Scalars['String']
}

/** The root query type which gives access points into the data universe. */
export type QueryActiveBookingArgs = {
  payload?: Maybe<ActiveBookingInputRecordInput>
}

/** The root query type which gives access points into the data universe. */
export type QueryCanBookSlotArgs = {
  payload?: Maybe<Scalars['JSON']>
}

/** The root query type which gives access points into the data universe. */
export type QueryEmailAvailableArgs = {
  requestedEmail?: Maybe<Scalars['Email']>
}

/** The root query type which gives access points into the data universe. */
export type QueryFindBusinessArgs = {
  payload?: Maybe<FindBusinessInputRecordInput>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  filter?: Maybe<FindBusinessResultFilter>
}

/** The root query type which gives access points into the data universe. */
export type QueryFindBusinessListArgs = {
  payload?: Maybe<FindBusinessInputRecordInput>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  filter?: Maybe<FindBusinessResultFilter>
}

/** The root query type which gives access points into the data universe. */
export type QueryFindSlotsArgs = {
  payload?: Maybe<FindSlotsInputRecordInput>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  filter?: Maybe<FindSlotsResultFilter>
}

/** The root query type which gives access points into the data universe. */
export type QueryFindSlotsListArgs = {
  payload?: Maybe<FindSlotsInputRecordInput>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  filter?: Maybe<FindSlotsResultFilter>
}

/** The root query type which gives access points into the data universe. */
export type QueryGetApiKeysArgs = {
  userId?: Maybe<Scalars['UUID']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  filter?: Maybe<GetApiKeysResultFilter>
}

/** The root query type which gives access points into the data universe. */
export type QueryGetApiKeysListArgs = {
  userId?: Maybe<Scalars['UUID']>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  filter?: Maybe<GetApiKeysResultFilter>
}

/** The root query type which gives access points into the data universe. */
export type QuerySlotBookingStatusArgs = {
  payload?: Maybe<SlotBookingStatusInputRecordInput>
}

/** The root query type which gives access points into the data universe. */
export type QuerySlotBookingTimesArgs = {
  payload?: Maybe<SlotBookingTimesInputRecordInput>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  filter?: Maybe<SlotBookingTimesRecordFilter>
}

/** The root query type which gives access points into the data universe. */
export type QuerySlotBookingTimesListArgs = {
  payload?: Maybe<SlotBookingTimesInputRecordInput>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  filter?: Maybe<SlotBookingTimesRecordFilter>
}

/** The root query type which gives access points into the data universe. */
export type QuerySlotTimetableArgs = {
  slotIds?: Maybe<Array<Maybe<Scalars['UUID']>>>
  timetableStartTime?: Maybe<Scalars['Datetime']>
  timetableEndTime?: Maybe<Scalars['Datetime']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  filter?: Maybe<SlotTimetableResultFilter>
}

/** The root query type which gives access points into the data universe. */
export type QuerySlotTimetableListArgs = {
  slotIds?: Maybe<Array<Maybe<Scalars['UUID']>>>
  timetableStartTime?: Maybe<Scalars['Datetime']>
  timetableEndTime?: Maybe<Scalars['Datetime']>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  filter?: Maybe<SlotTimetableResultFilter>
}

/** The root query type which gives access points into the data universe. */
export type QueryUserPremiumArgs = {
  userId?: Maybe<Scalars['UUID']>
}

/** The root query type which gives access points into the data universe. */
export type QueryAmenityByNodeIdArgs = {
  nodeId: Scalars['ID']
}

/** The root query type which gives access points into the data universe. */
export type QueryBillingProfileByNodeIdArgs = {
  nodeId: Scalars['ID']
}

/** The root query type which gives access points into the data universe. */
export type QueryBusinessByNodeIdArgs = {
  nodeId: Scalars['ID']
}

/** The root query type which gives access points into the data universe. */
export type QueryCountryByNodeIdArgs = {
  nodeId: Scalars['ID']
}

/** The root query type which gives access points into the data universe. */
export type QueryLanguageByNodeIdArgs = {
  nodeId: Scalars['ID']
}

/** The root query type which gives access points into the data universe. */
export type QueryParkingOpenHourByNodeIdArgs = {
  nodeId: Scalars['ID']
}

/** The root query type which gives access points into the data universe. */
export type QueryParkingSpaceByNodeIdArgs = {
  nodeId: Scalars['ID']
}

/** The root query type which gives access points into the data universe. */
export type QueryParkingSpaceAvailabilityByNodeIdArgs = {
  nodeId: Scalars['ID']
}

/** The root query type which gives access points into the data universe. */
export type QueryParkingWorkingHourByNodeIdArgs = {
  nodeId: Scalars['ID']
}

/** The root query type which gives access points into the data universe. */
export type QueryPaymentReceiptByNodeIdArgs = {
  nodeId: Scalars['ID']
}

/** The root query type which gives access points into the data universe. */
export type QuerySlotByNodeIdArgs = {
  nodeId: Scalars['ID']
}

/** The root query type which gives access points into the data universe. */
export type QuerySlotAmenityByNodeIdArgs = {
  nodeId: Scalars['ID']
}

/** The root query type which gives access points into the data universe. */
export type QuerySlotAvailabilityByNodeIdArgs = {
  nodeId: Scalars['ID']
}

/** The root query type which gives access points into the data universe. */
export type QuerySlotBookingByNodeIdArgs = {
  nodeId: Scalars['ID']
}

/** The root query type which gives access points into the data universe. */
export type QueryTranslationByNodeIdArgs = {
  nodeId: Scalars['ID']
}

/** The root query type which gives access points into the data universe. */
export type QueryUserByNodeIdArgs = {
  nodeId: Scalars['ID']
}

/** The root query type which gives access points into the data universe. */
export type QueryUserSubscriptionByNodeIdArgs = {
  nodeId: Scalars['ID']
}

/** The root query type which gives access points into the data universe. */
export type QueryVehicleByNodeIdArgs = {
  nodeId: Scalars['ID']
}

/** The root query type which gives access points into the data universe. */
export type QueryVehicleSizeByNodeIdArgs = {
  nodeId: Scalars['ID']
}

/** The root query type which gives access points into the data universe. */
export type QueryVehicleTypeByNodeIdArgs = {
  nodeId: Scalars['ID']
}

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']
}

/** Methods to use when ordering `Amenity`. */
export enum AmenitiesOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  WeightAsc = 'WEIGHT_ASC',
  WeightDesc = 'WEIGHT_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  SlugAsc = 'SLUG_ASC',
  SlugDesc = 'SLUG_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  SlotAmenitiesByAmenityIdCountAsc = 'SLOT_AMENITIES_BY_AMENITY_ID__COUNT_ASC',
  SlotAmenitiesByAmenityIdCountDesc = 'SLOT_AMENITIES_BY_AMENITY_ID__COUNT_DESC',
}

/** A condition to be used against `Amenity` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type AmenityCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>
  /** Checks for equality with the object’s `name` field. */
  name?: Maybe<Scalars['String']>
  /** Checks for equality with the object’s `weight` field. */
  weight?: Maybe<Scalars['Int']>
  /** Checks for equality with the object’s `description` field. */
  description?: Maybe<Scalars['String']>
  /** Checks for equality with the object’s `status` field. */
  status?: Maybe<ContentStatusT>
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>
  /** Checks for equality with the object’s `slug` field. */
  slug?: Maybe<Scalars['String']>
}

/** Allowed statuses are: published, draft */
export enum ContentStatusT {
  Published = 'PUBLISHED',
  Draft = 'DRAFT',
}

/** A filter to be used against `Amenity` object types. All fields are combined with a logical ‘and.’ */
export type AmenityFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<UuidFilter>
  /** Filter by the object’s `name` field. */
  name?: Maybe<StringFilter>
  /** Filter by the object’s `weight` field. */
  weight?: Maybe<IntFilter>
  /** Filter by the object’s `description` field. */
  description?: Maybe<StringFilter>
  /** Filter by the object’s `status` field. */
  status?: Maybe<ContentStatusTFilter>
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: Maybe<DatetimeFilter>
  /** Filter by the object’s `slug` field. */
  slug?: Maybe<StringFilter>
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<AmenityFilter>>
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<AmenityFilter>>
  /** Negates the expression. */
  not?: Maybe<AmenityFilter>
}

/** A filter to be used against UUID fields. All fields are combined with a logical ‘and.’ */
export type UuidFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>
  /** Equal to the specified value. */
  equalTo?: Maybe<Scalars['UUID']>
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Scalars['UUID']>
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Scalars['UUID']>
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Scalars['UUID']>
  /** Included in the specified list. */
  in?: Maybe<Array<Scalars['UUID']>>
  /** Not included in the specified list. */
  notIn?: Maybe<Array<Scalars['UUID']>>
  /** Less than the specified value. */
  lessThan?: Maybe<Scalars['UUID']>
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Scalars['UUID']>
  /** Greater than the specified value. */
  greaterThan?: Maybe<Scalars['UUID']>
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Scalars['UUID']>
}

/** A filter to be used against String fields. All fields are combined with a logical ‘and.’ */
export type StringFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>
  /** Equal to the specified value. */
  equalTo?: Maybe<Scalars['String']>
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Scalars['String']>
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Scalars['String']>
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Scalars['String']>
  /** Included in the specified list. */
  in?: Maybe<Array<Scalars['String']>>
  /** Not included in the specified list. */
  notIn?: Maybe<Array<Scalars['String']>>
  /** Less than the specified value. */
  lessThan?: Maybe<Scalars['String']>
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Scalars['String']>
  /** Greater than the specified value. */
  greaterThan?: Maybe<Scalars['String']>
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Scalars['String']>
  /** Contains the specified string (case-sensitive). */
  includes?: Maybe<Scalars['String']>
  /** Does not contain the specified string (case-sensitive). */
  notIncludes?: Maybe<Scalars['String']>
  /** Contains the specified string (case-insensitive). */
  includesInsensitive?: Maybe<Scalars['String']>
  /** Does not contain the specified string (case-insensitive). */
  notIncludesInsensitive?: Maybe<Scalars['String']>
  /** Starts with the specified string (case-sensitive). */
  startsWith?: Maybe<Scalars['String']>
  /** Does not start with the specified string (case-sensitive). */
  notStartsWith?: Maybe<Scalars['String']>
  /** Starts with the specified string (case-insensitive). */
  startsWithInsensitive?: Maybe<Scalars['String']>
  /** Does not start with the specified string (case-insensitive). */
  notStartsWithInsensitive?: Maybe<Scalars['String']>
  /** Ends with the specified string (case-sensitive). */
  endsWith?: Maybe<Scalars['String']>
  /** Does not end with the specified string (case-sensitive). */
  notEndsWith?: Maybe<Scalars['String']>
  /** Ends with the specified string (case-insensitive). */
  endsWithInsensitive?: Maybe<Scalars['String']>
  /** Does not end with the specified string (case-insensitive). */
  notEndsWithInsensitive?: Maybe<Scalars['String']>
  /** Matches the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  like?: Maybe<Scalars['String']>
  /** Does not match the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLike?: Maybe<Scalars['String']>
  /** Matches the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  likeInsensitive?: Maybe<Scalars['String']>
  /** Does not match the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLikeInsensitive?: Maybe<Scalars['String']>
  /** Matches the specified pattern using the SQL standard's definition of a regular expression. */
  similarTo?: Maybe<Scalars['String']>
  /** Does not match the specified pattern using the SQL standard's definition of a regular expression. */
  notSimilarTo?: Maybe<Scalars['String']>
}

/** A filter to be used against Int fields. All fields are combined with a logical ‘and.’ */
export type IntFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>
  /** Equal to the specified value. */
  equalTo?: Maybe<Scalars['Int']>
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Scalars['Int']>
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Scalars['Int']>
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Scalars['Int']>
  /** Included in the specified list. */
  in?: Maybe<Array<Scalars['Int']>>
  /** Not included in the specified list. */
  notIn?: Maybe<Array<Scalars['Int']>>
  /** Less than the specified value. */
  lessThan?: Maybe<Scalars['Int']>
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Scalars['Int']>
  /** Greater than the specified value. */
  greaterThan?: Maybe<Scalars['Int']>
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Scalars['Int']>
}

/** A filter to be used against ContentStatusT fields. All fields are combined with a logical ‘and.’ */
export type ContentStatusTFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>
  /** Equal to the specified value. */
  equalTo?: Maybe<ContentStatusT>
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<ContentStatusT>
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<ContentStatusT>
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<ContentStatusT>
  /** Included in the specified list. */
  in?: Maybe<Array<ContentStatusT>>
  /** Not included in the specified list. */
  notIn?: Maybe<Array<ContentStatusT>>
  /** Less than the specified value. */
  lessThan?: Maybe<ContentStatusT>
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<ContentStatusT>
  /** Greater than the specified value. */
  greaterThan?: Maybe<ContentStatusT>
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<ContentStatusT>
}

/** A filter to be used against Datetime fields. All fields are combined with a logical ‘and.’ */
export type DatetimeFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>
  /** Equal to the specified value. */
  equalTo?: Maybe<Scalars['Datetime']>
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Scalars['Datetime']>
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Scalars['Datetime']>
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Scalars['Datetime']>
  /** Included in the specified list. */
  in?: Maybe<Array<Scalars['Datetime']>>
  /** Not included in the specified list. */
  notIn?: Maybe<Array<Scalars['Datetime']>>
  /** Less than the specified value. */
  lessThan?: Maybe<Scalars['Datetime']>
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Scalars['Datetime']>
  /** Greater than the specified value. */
  greaterThan?: Maybe<Scalars['Datetime']>
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Scalars['Datetime']>
}

/** A connection to a list of `Amenity` values. */
export type AmenitiesConnection = {
  /** A list of `Amenity` objects. */
  nodes: Array<Amenity>
  /** A list of edges which contains the `Amenity` and cursor to aid in pagination. */
  edges: Array<AmenitiesEdge>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `Amenity` you could get from the connection. */
  totalCount: Scalars['Int']
}

export type Amenity = Node & {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']
  id: Scalars['UUID']
  name: Scalars['String']
  weight?: Maybe<Scalars['Int']>
  description?: Maybe<Scalars['String']>
  status: ContentStatusT
  createdAt: Scalars['Datetime']
  updatedAt?: Maybe<Scalars['Datetime']>
  slug?: Maybe<Scalars['String']>
  /** Reads and enables pagination through a set of `SlotAmenity`. */
  slotAmenities: SlotAmenitiesConnection
  /** Reads and enables pagination through a set of `SlotAmenity`. */
  slotAmenitiesList: Array<SlotAmenity>
  /** Reads and enables pagination through a set of `Slot`. */
  slotsBySlotAmenityAmenityIdAndSlotId: AmenitySlotsBySlotAmenityAmenityIdAndSlotIdManyToManyConnection
  /** Reads and enables pagination through a set of `Slot`. */
  slotsBySlotAmenityAmenityIdAndSlotIdList: Array<Slot>
}

export type AmenitySlotAmenitiesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<SlotAmenitiesOrderBy>>
  condition?: Maybe<SlotAmenityCondition>
  filter?: Maybe<SlotAmenityFilter>
}

export type AmenitySlotAmenitiesListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<SlotAmenitiesOrderBy>>
  condition?: Maybe<SlotAmenityCondition>
  filter?: Maybe<SlotAmenityFilter>
}

export type AmenitySlotsBySlotAmenityAmenityIdAndSlotIdArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<SlotsOrderBy>>
  condition?: Maybe<SlotCondition>
  filter?: Maybe<SlotFilter>
}

export type AmenitySlotsBySlotAmenityAmenityIdAndSlotIdListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<SlotsOrderBy>>
  condition?: Maybe<SlotCondition>
  filter?: Maybe<SlotFilter>
}

/** Methods to use when ordering `SlotAmenity`. */
export enum SlotAmenitiesOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  SlotIdAsc = 'SLOT_ID_ASC',
  SlotIdDesc = 'SLOT_ID_DESC',
  AmenityIdAsc = 'AMENITY_ID_ASC',
  AmenityIdDesc = 'AMENITY_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  SlotBySlotIdIdAsc = 'SLOT_BY_SLOT_ID__ID_ASC',
  SlotBySlotIdIdDesc = 'SLOT_BY_SLOT_ID__ID_DESC',
  SlotBySlotIdNameAsc = 'SLOT_BY_SLOT_ID__NAME_ASC',
  SlotBySlotIdNameDesc = 'SLOT_BY_SLOT_ID__NAME_DESC',
  SlotBySlotIdOwnerIdAsc = 'SLOT_BY_SLOT_ID__OWNER_ID_ASC',
  SlotBySlotIdOwnerIdDesc = 'SLOT_BY_SLOT_ID__OWNER_ID_DESC',
  SlotBySlotIdVehicleSizeIdAsc = 'SLOT_BY_SLOT_ID__VEHICLE_SIZE_ID_ASC',
  SlotBySlotIdVehicleSizeIdDesc = 'SLOT_BY_SLOT_ID__VEHICLE_SIZE_ID_DESC',
  SlotBySlotIdAddressAsc = 'SLOT_BY_SLOT_ID__ADDRESS_ASC',
  SlotBySlotIdAddressDesc = 'SLOT_BY_SLOT_ID__ADDRESS_DESC',
  SlotBySlotIdTimezoneAsc = 'SLOT_BY_SLOT_ID__TIMEZONE_ASC',
  SlotBySlotIdTimezoneDesc = 'SLOT_BY_SLOT_ID__TIMEZONE_DESC',
  SlotBySlotIdPricePerHourAsc = 'SLOT_BY_SLOT_ID__PRICE_PER_HOUR_ASC',
  SlotBySlotIdPricePerHourDesc = 'SLOT_BY_SLOT_ID__PRICE_PER_HOUR_DESC',
  SlotBySlotIdStatusAsc = 'SLOT_BY_SLOT_ID__STATUS_ASC',
  SlotBySlotIdStatusDesc = 'SLOT_BY_SLOT_ID__STATUS_DESC',
  SlotBySlotIdPhotoUrlAsc = 'SLOT_BY_SLOT_ID__PHOTO_URL_ASC',
  SlotBySlotIdPhotoUrlDesc = 'SLOT_BY_SLOT_ID__PHOTO_URL_DESC',
  SlotBySlotIdDescriptionAsc = 'SLOT_BY_SLOT_ID__DESCRIPTION_ASC',
  SlotBySlotIdDescriptionDesc = 'SLOT_BY_SLOT_ID__DESCRIPTION_DESC',
  SlotBySlotIdNotesAsc = 'SLOT_BY_SLOT_ID__NOTES_ASC',
  SlotBySlotIdNotesDesc = 'SLOT_BY_SLOT_ID__NOTES_DESC',
  SlotBySlotIdSlugAsc = 'SLOT_BY_SLOT_ID__SLUG_ASC',
  SlotBySlotIdSlugDesc = 'SLOT_BY_SLOT_ID__SLUG_DESC',
  SlotBySlotIdCreatedAtAsc = 'SLOT_BY_SLOT_ID__CREATED_AT_ASC',
  SlotBySlotIdCreatedAtDesc = 'SLOT_BY_SLOT_ID__CREATED_AT_DESC',
  SlotBySlotIdUpdatedAtAsc = 'SLOT_BY_SLOT_ID__UPDATED_AT_ASC',
  SlotBySlotIdUpdatedAtDesc = 'SLOT_BY_SLOT_ID__UPDATED_AT_DESC',
  SlotBySlotIdDeletedAsc = 'SLOT_BY_SLOT_ID__DELETED_ASC',
  SlotBySlotIdDeletedDesc = 'SLOT_BY_SLOT_ID__DELETED_DESC',
  SlotBySlotIdDeletedAtAsc = 'SLOT_BY_SLOT_ID__DELETED_AT_ASC',
  SlotBySlotIdDeletedAtDesc = 'SLOT_BY_SLOT_ID__DELETED_AT_DESC',
  SlotBySlotIdVerificationStatusAsc = 'SLOT_BY_SLOT_ID__VERIFICATION_STATUS_ASC',
  SlotBySlotIdVerificationStatusDesc = 'SLOT_BY_SLOT_ID__VERIFICATION_STATUS_DESC',
  SlotBySlotIdParkingSpaceIdAsc = 'SLOT_BY_SLOT_ID__PARKING_SPACE_ID_ASC',
  SlotBySlotIdParkingSpaceIdDesc = 'SLOT_BY_SLOT_ID__PARKING_SPACE_ID_DESC',
  SlotBySlotIdLocationAsc = 'SLOT_BY_SLOT_ID__LOCATION_ASC',
  SlotBySlotIdLocationDesc = 'SLOT_BY_SLOT_ID__LOCATION_DESC',
  SlotBySlotIdShapeAsc = 'SLOT_BY_SLOT_ID__SHAPE_ASC',
  SlotBySlotIdShapeDesc = 'SLOT_BY_SLOT_ID__SHAPE_DESC',
  SlotBySlotIdAccessRestrictionsAsc = 'SLOT_BY_SLOT_ID__ACCESS_RESTRICTIONS_ASC',
  SlotBySlotIdAccessRestrictionsDesc = 'SLOT_BY_SLOT_ID__ACCESS_RESTRICTIONS_DESC',
  SlotBySlotIdBusinessStatusAsc = 'SLOT_BY_SLOT_ID__BUSINESS_STATUS_ASC',
  SlotBySlotIdBusinessStatusDesc = 'SLOT_BY_SLOT_ID__BUSINESS_STATUS_DESC',
  SlotBySlotIdBusinessStatusReasonAsc = 'SLOT_BY_SLOT_ID__BUSINESS_STATUS_REASON_ASC',
  SlotBySlotIdBusinessStatusReasonDesc = 'SLOT_BY_SLOT_ID__BUSINESS_STATUS_REASON_DESC',
  SlotBySlotIdCategoryAsc = 'SLOT_BY_SLOT_ID__CATEGORY_ASC',
  SlotBySlotIdCategoryDesc = 'SLOT_BY_SLOT_ID__CATEGORY_DESC',
  SlotBySlotIdContributorIdAsc = 'SLOT_BY_SLOT_ID__CONTRIBUTOR_ID_ASC',
  SlotBySlotIdContributorIdDesc = 'SLOT_BY_SLOT_ID__CONTRIBUTOR_ID_DESC',
  SlotBySlotIdLevelAsc = 'SLOT_BY_SLOT_ID__LEVEL_ASC',
  SlotBySlotIdLevelDesc = 'SLOT_BY_SLOT_ID__LEVEL_DESC',
  SlotBySlotIdMapSourceAsc = 'SLOT_BY_SLOT_ID__MAP_SOURCE_ASC',
  SlotBySlotIdMapSourceDesc = 'SLOT_BY_SLOT_ID__MAP_SOURCE_DESC',
  SlotBySlotIdSlotDimensionsAsc = 'SLOT_BY_SLOT_ID__SLOT_DIMENSIONS_ASC',
  SlotBySlotIdSlotDimensionsDesc = 'SLOT_BY_SLOT_ID__SLOT_DIMENSIONS_DESC',
  SlotBySlotIdTempUnavailableAsc = 'SLOT_BY_SLOT_ID__TEMP_UNAVAILABLE_ASC',
  SlotBySlotIdTempUnavailableDesc = 'SLOT_BY_SLOT_ID__TEMP_UNAVAILABLE_DESC',
  SlotBySlotIdTempUnavailableFromAsc = 'SLOT_BY_SLOT_ID__TEMP_UNAVAILABLE_FROM_ASC',
  SlotBySlotIdTempUnavailableFromDesc = 'SLOT_BY_SLOT_ID__TEMP_UNAVAILABLE_FROM_DESC',
  SlotBySlotIdTempUnavailableToAsc = 'SLOT_BY_SLOT_ID__TEMP_UNAVAILABLE_TO_ASC',
  SlotBySlotIdTempUnavailableToDesc = 'SLOT_BY_SLOT_ID__TEMP_UNAVAILABLE_TO_DESC',
  SlotBySlotIdWaypointsAsc = 'SLOT_BY_SLOT_ID__WAYPOINTS_ASC',
  SlotBySlotIdWaypointsDesc = 'SLOT_BY_SLOT_ID__WAYPOINTS_DESC',
  AmenityByAmenityIdIdAsc = 'AMENITY_BY_AMENITY_ID__ID_ASC',
  AmenityByAmenityIdIdDesc = 'AMENITY_BY_AMENITY_ID__ID_DESC',
  AmenityByAmenityIdNameAsc = 'AMENITY_BY_AMENITY_ID__NAME_ASC',
  AmenityByAmenityIdNameDesc = 'AMENITY_BY_AMENITY_ID__NAME_DESC',
  AmenityByAmenityIdWeightAsc = 'AMENITY_BY_AMENITY_ID__WEIGHT_ASC',
  AmenityByAmenityIdWeightDesc = 'AMENITY_BY_AMENITY_ID__WEIGHT_DESC',
  AmenityByAmenityIdDescriptionAsc = 'AMENITY_BY_AMENITY_ID__DESCRIPTION_ASC',
  AmenityByAmenityIdDescriptionDesc = 'AMENITY_BY_AMENITY_ID__DESCRIPTION_DESC',
  AmenityByAmenityIdStatusAsc = 'AMENITY_BY_AMENITY_ID__STATUS_ASC',
  AmenityByAmenityIdStatusDesc = 'AMENITY_BY_AMENITY_ID__STATUS_DESC',
  AmenityByAmenityIdCreatedAtAsc = 'AMENITY_BY_AMENITY_ID__CREATED_AT_ASC',
  AmenityByAmenityIdCreatedAtDesc = 'AMENITY_BY_AMENITY_ID__CREATED_AT_DESC',
  AmenityByAmenityIdUpdatedAtAsc = 'AMENITY_BY_AMENITY_ID__UPDATED_AT_ASC',
  AmenityByAmenityIdUpdatedAtDesc = 'AMENITY_BY_AMENITY_ID__UPDATED_AT_DESC',
  AmenityByAmenityIdSlugAsc = 'AMENITY_BY_AMENITY_ID__SLUG_ASC',
  AmenityByAmenityIdSlugDesc = 'AMENITY_BY_AMENITY_ID__SLUG_DESC',
}

/** A condition to be used against `SlotAmenity` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type SlotAmenityCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>
  /** Checks for equality with the object’s `slotId` field. */
  slotId?: Maybe<Scalars['UUID']>
  /** Checks for equality with the object’s `amenityId` field. */
  amenityId?: Maybe<Scalars['UUID']>
}

/** A filter to be used against `SlotAmenity` object types. All fields are combined with a logical ‘and.’ */
export type SlotAmenityFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<UuidFilter>
  /** Filter by the object’s `slotId` field. */
  slotId?: Maybe<UuidFilter>
  /** Filter by the object’s `amenityId` field. */
  amenityId?: Maybe<UuidFilter>
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<SlotAmenityFilter>>
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<SlotAmenityFilter>>
  /** Negates the expression. */
  not?: Maybe<SlotAmenityFilter>
}

/** A connection to a list of `SlotAmenity` values. */
export type SlotAmenitiesConnection = {
  /** A list of `SlotAmenity` objects. */
  nodes: Array<SlotAmenity>
  /** A list of edges which contains the `SlotAmenity` and cursor to aid in pagination. */
  edges: Array<SlotAmenitiesEdge>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `SlotAmenity` you could get from the connection. */
  totalCount: Scalars['Int']
}

export type SlotAmenity = Node & {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']
  id: Scalars['UUID']
  slotId: Scalars['UUID']
  amenityId: Scalars['UUID']
  /** Reads a single `Slot` that is related to this `SlotAmenity`. */
  slot?: Maybe<Slot>
  /** Reads a single `Amenity` that is related to this `SlotAmenity`. */
  amenity?: Maybe<Amenity>
}

export type Slot = Node & {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']
  id: Scalars['UUID']
  name: Scalars['String']
  ownerId: Scalars['UUID']
  vehicleSizeId: Scalars['UUID']
  address?: Maybe<Scalars['JSON']>
  timezone: Scalars['String']
  pricePerHour: Scalars['BigFloat']
  status: SlotStatusT
  photoUrl?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  notes?: Maybe<Scalars['String']>
  slug?: Maybe<Scalars['String']>
  createdAt: Scalars['Datetime']
  updatedAt?: Maybe<Scalars['Datetime']>
  deleted: Scalars['Boolean']
  deletedAt?: Maybe<Scalars['Datetime']>
  verificationStatus: SlotVerificationStatus
  parkingSpaceId?: Maybe<Scalars['UUID']>
  location: GeometryPoint
  shape?: Maybe<GeometryPolygon>
  accessRestrictions?: Maybe<AccessRestrictions>
  businessStatus?: Maybe<SlotBusinessStatus>
  businessStatusReason?: Maybe<Scalars['String']>
  category?: Maybe<SlotCategory>
  contributorId?: Maybe<Scalars['UUID']>
  level?: Maybe<Scalars['Int']>
  mapSource?: Maybe<Scalars['UUID']>
  slotDimensions?: Maybe<Scalars['JSON']>
  tempUnavailable?: Maybe<Scalars['Boolean']>
  tempUnavailableFrom?: Maybe<Scalars['Datetime']>
  tempUnavailableTo?: Maybe<Scalars['Datetime']>
  waypoints?: Maybe<Scalars['JSON']>
  /** Reads a single `User` that is related to this `Slot`. */
  owner?: Maybe<User>
  /** Reads a single `VehicleSize` that is related to this `Slot`. */
  vehicleSize?: Maybe<VehicleSize>
  /** Reads a single `ParkingSpace` that is related to this `Slot`. */
  parkingSpace?: Maybe<ParkingSpace>
  /** Reads and enables pagination through a set of `SlotAmenity`. */
  slotAmenities: SlotAmenitiesConnection
  /** Reads and enables pagination through a set of `SlotAmenity`. */
  slotAmenitiesList: Array<SlotAmenity>
  /** Reads and enables pagination through a set of `SlotAvailability`. */
  slotAvailabilities: SlotAvailabilitiesConnection
  /** Reads and enables pagination through a set of `SlotAvailability`. */
  slotAvailabilitiesList: Array<SlotAvailability>
  /** Reads and enables pagination through a set of `SlotBooking`. */
  slotBookings: SlotBookingsConnection
  /** Reads and enables pagination through a set of `SlotBooking`. */
  slotBookingsList: Array<SlotBooking>
  /** Reads and enables pagination through a set of `Amenity`. */
  amenitiesBySlotAmenitySlotIdAndAmenityId: SlotAmenitiesBySlotAmenitySlotIdAndAmenityIdManyToManyConnection
  /** Reads and enables pagination through a set of `Amenity`. */
  amenitiesBySlotAmenitySlotIdAndAmenityIdList: Array<Amenity>
  /** Reads and enables pagination through a set of `Currency`. */
  currenciesBySlotAvailabilitySlotIdAndTariffCurrency: SlotCurrenciesBySlotAvailabilitySlotIdAndTariffCurrencyManyToManyConnection
  /** Reads and enables pagination through a set of `Currency`. */
  currenciesBySlotAvailabilitySlotIdAndTariffCurrencyList: Array<Currency>
  /** Reads and enables pagination through a set of `User`. */
  usersBySlotBookingSlotIdAndUserId: SlotUsersBySlotBookingSlotIdAndUserIdManyToManyConnection
  /** Reads and enables pagination through a set of `User`. */
  usersBySlotBookingSlotIdAndUserIdList: Array<User>
  /** Reads and enables pagination through a set of `PaymentReceipt`. */
  paymentReceiptsBySlotBookingSlotIdAndPaymentReceiptId: SlotPaymentReceiptsBySlotBookingSlotIdAndPaymentReceiptIdManyToManyConnection
  /** Reads and enables pagination through a set of `PaymentReceipt`. */
  paymentReceiptsBySlotBookingSlotIdAndPaymentReceiptIdList: Array<PaymentReceipt>
}

export type SlotSlotAmenitiesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<SlotAmenitiesOrderBy>>
  condition?: Maybe<SlotAmenityCondition>
  filter?: Maybe<SlotAmenityFilter>
}

export type SlotSlotAmenitiesListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<SlotAmenitiesOrderBy>>
  condition?: Maybe<SlotAmenityCondition>
  filter?: Maybe<SlotAmenityFilter>
}

export type SlotSlotAvailabilitiesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<SlotAvailabilitiesOrderBy>>
  condition?: Maybe<SlotAvailabilityCondition>
  filter?: Maybe<SlotAvailabilityFilter>
}

export type SlotSlotAvailabilitiesListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<SlotAvailabilitiesOrderBy>>
  condition?: Maybe<SlotAvailabilityCondition>
  filter?: Maybe<SlotAvailabilityFilter>
}

export type SlotSlotBookingsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<SlotBookingsOrderBy>>
  condition?: Maybe<SlotBookingCondition>
  filter?: Maybe<SlotBookingFilter>
}

export type SlotSlotBookingsListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<SlotBookingsOrderBy>>
  condition?: Maybe<SlotBookingCondition>
  filter?: Maybe<SlotBookingFilter>
}

export type SlotAmenitiesBySlotAmenitySlotIdAndAmenityIdArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<AmenitiesOrderBy>>
  condition?: Maybe<AmenityCondition>
  filter?: Maybe<AmenityFilter>
}

export type SlotAmenitiesBySlotAmenitySlotIdAndAmenityIdListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<AmenitiesOrderBy>>
  condition?: Maybe<AmenityCondition>
  filter?: Maybe<AmenityFilter>
}

export type SlotCurrenciesBySlotAvailabilitySlotIdAndTariffCurrencyArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<CurrenciesOrderBy>>
  condition?: Maybe<CurrencyCondition>
  filter?: Maybe<CurrencyFilter>
}

export type SlotCurrenciesBySlotAvailabilitySlotIdAndTariffCurrencyListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<CurrenciesOrderBy>>
  condition?: Maybe<CurrencyCondition>
  filter?: Maybe<CurrencyFilter>
}

export type SlotUsersBySlotBookingSlotIdAndUserIdArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<UsersOrderBy>>
  condition?: Maybe<UserCondition>
  filter?: Maybe<UserFilter>
}

export type SlotUsersBySlotBookingSlotIdAndUserIdListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<UsersOrderBy>>
  condition?: Maybe<UserCondition>
  filter?: Maybe<UserFilter>
}

export type SlotPaymentReceiptsBySlotBookingSlotIdAndPaymentReceiptIdArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<PaymentReceiptsOrderBy>>
  condition?: Maybe<PaymentReceiptCondition>
  filter?: Maybe<PaymentReceiptFilter>
}

export type SlotPaymentReceiptsBySlotBookingSlotIdAndPaymentReceiptIdListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<PaymentReceiptsOrderBy>>
  condition?: Maybe<PaymentReceiptCondition>
  filter?: Maybe<PaymentReceiptFilter>
}

/** Allowed statuses for slot are: enabled, disabled */
export enum SlotStatusT {
  Enabled = 'ENABLED',
  Disabled = 'DISABLED',
  Unlisted = 'UNLISTED',
  Deleted = 'DELETED',
}

/** Verification status for slots */
export enum SlotVerificationStatus {
  Pending = 'PENDING',
  Rejected = 'REJECTED',
  Verified = 'VERIFIED',
}

export type GeometryPoint = GeometryInterface &
  GeometryGeometry & {
    geojson?: Maybe<Scalars['GeoJSON']>
    srid: Scalars['Int']
    x: Scalars['Float']
    y: Scalars['Float']
  }

/** All geometry types implement this interface */
export type GeometryInterface = {
  /** Converts the object to GeoJSON */
  geojson?: Maybe<Scalars['GeoJSON']>
  /** Spatial reference identifier (SRID) */
  srid: Scalars['Int']
}

/** All geometry XY types implement this interface */
export type GeometryGeometry = {
  /** Converts the object to GeoJSON */
  geojson?: Maybe<Scalars['GeoJSON']>
  /** Spatial reference identifier (SRID) */
  srid: Scalars['Int']
}

export type GeometryPolygon = GeometryInterface &
  GeometryGeometry & {
    geojson?: Maybe<Scalars['GeoJSON']>
    srid: Scalars['Int']
    exterior?: Maybe<GeometryLineString>
    interiors?: Maybe<Array<Maybe<GeometryLineString>>>
  }

export type GeometryLineString = GeometryInterface &
  GeometryGeometry & {
    geojson?: Maybe<Scalars['GeoJSON']>
    srid: Scalars['Int']
    points?: Maybe<Array<Maybe<GeometryPoint>>>
  }

/** Allowed values for access_restrictions are: none, barrier, keycard, keycode */
export enum AccessRestrictions {
  None = 'NONE',
  Barrier = 'BARRIER',
  Keycard = 'KEYCARD',
  Keycode = 'KEYCODE',
}

/** values for business_status are: active, inactive */
export enum SlotBusinessStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
}

/** Allowed values for slot_category are: private, public */
export enum SlotCategory {
  Private = 'PRIVATE',
  Public = 'PUBLIC',
}

export type User = Node & {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']
  id: Scalars['UUID']
  name: Scalars['String']
  email: Scalars['Email']
  emailConfirmed: Scalars['Boolean']
  status: StatusT
  role: Scalars['String']
  photoUrl?: Maybe<Scalars['String']>
  phone?: Maybe<Scalars['PhoneUs']>
  address?: Maybe<Scalars['JSON']>
  settings?: Maybe<Scalars['JSON']>
  createdAt: Scalars['Datetime']
  updatedAt?: Maybe<Scalars['Datetime']>
  /** handles soft delete */
  deleted: Scalars['Boolean']
  /** shows when is soft deleted */
  deletedAt?: Maybe<Scalars['Datetime']>
  /** Reads and enables pagination through a set of `Slot`. */
  slotsByOwnerId: SlotsConnection
  /** Reads and enables pagination through a set of `Slot`. */
  slotsByOwnerIdList: Array<Slot>
  /** Reads and enables pagination through a set of `Vehicle`. */
  vehiclesByOwnerId: VehiclesConnection
  /** Reads and enables pagination through a set of `Vehicle`. */
  vehiclesByOwnerIdList: Array<Vehicle>
  /** Reads and enables pagination through a set of `BillingProfile`. */
  billingProfiles: BillingProfilesConnection
  /** Reads and enables pagination through a set of `BillingProfile`. */
  billingProfilesList: Array<BillingProfile>
  /** Reads and enables pagination through a set of `UserSubscription`. */
  userSubscriptions: UserSubscriptionsConnection
  /** Reads and enables pagination through a set of `UserSubscription`. */
  userSubscriptionsList: Array<UserSubscription>
  /** Reads and enables pagination through a set of `ParkingSpace`. */
  parkingSpacesByOwnerId: ParkingSpacesConnection
  /** Reads and enables pagination through a set of `ParkingSpace`. */
  parkingSpacesByOwnerIdList: Array<ParkingSpace>
  /** Reads and enables pagination through a set of `Business`. */
  businessesByOwnerId: BusinessesConnection
  /** Reads and enables pagination through a set of `Business`. */
  businessesByOwnerIdList: Array<Business>
  /** Reads and enables pagination through a set of `PaymentReceipt`. */
  paymentReceiptsByOwnerId: PaymentReceiptsConnection
  /** Reads and enables pagination through a set of `PaymentReceipt`. */
  paymentReceiptsByOwnerIdList: Array<PaymentReceipt>
  /** Reads and enables pagination through a set of `SlotBooking`. */
  slotBookings: SlotBookingsConnection
  /** Reads and enables pagination through a set of `SlotBooking`. */
  slotBookingsList: Array<SlotBooking>
  /** Reads and enables pagination through a set of `VehicleSize`. */
  vehicleSizesBySlotOwnerIdAndVehicleSizeId: UserVehicleSizesBySlotOwnerIdAndVehicleSizeIdManyToManyConnection
  /** Reads and enables pagination through a set of `VehicleSize`. */
  vehicleSizesBySlotOwnerIdAndVehicleSizeIdList: Array<VehicleSize>
  /** Reads and enables pagination through a set of `ParkingSpace`. */
  parkingSpacesBySlotOwnerIdAndParkingSpaceId: UserParkingSpacesBySlotOwnerIdAndParkingSpaceIdManyToManyConnection
  /** Reads and enables pagination through a set of `ParkingSpace`. */
  parkingSpacesBySlotOwnerIdAndParkingSpaceIdList: Array<ParkingSpace>
  /** Reads and enables pagination through a set of `GeodataProvider`. */
  geodataProvidersBySlotOwnerIdAndMapSource: UserGeodataProvidersBySlotOwnerIdAndMapSourceManyToManyConnection
  /** Reads and enables pagination through a set of `GeodataProvider`. */
  geodataProvidersBySlotOwnerIdAndMapSourceList: Array<GeodataProvider>
  /** Reads and enables pagination through a set of `VehicleType`. */
  vehicleTypesByVehicleOwnerIdAndVehicleTypeId: UserVehicleTypesByVehicleOwnerIdAndVehicleTypeIdManyToManyConnection
  /** Reads and enables pagination through a set of `VehicleType`. */
  vehicleTypesByVehicleOwnerIdAndVehicleTypeIdList: Array<VehicleType>
  /** Reads and enables pagination through a set of `VehicleSize`. */
  vehicleSizesByVehicleOwnerIdAndVehicleSizeId: UserVehicleSizesByVehicleOwnerIdAndVehicleSizeIdManyToManyConnection
  /** Reads and enables pagination through a set of `VehicleSize`. */
  vehicleSizesByVehicleOwnerIdAndVehicleSizeIdList: Array<VehicleSize>
  /** Reads and enables pagination through a set of `BillingProfile`. */
  billingProfilesByUserSubscriptionUserIdAndBillingProfileId: UserBillingProfilesByUserSubscriptionUserIdAndBillingProfileIdManyToManyConnection
  /** Reads and enables pagination through a set of `BillingProfile`. */
  billingProfilesByUserSubscriptionUserIdAndBillingProfileIdList: Array<BillingProfile>
  /** Reads and enables pagination through a set of `Slot`. */
  slotsBySlotBookingUserIdAndSlotId: UserSlotsBySlotBookingUserIdAndSlotIdManyToManyConnection
  /** Reads and enables pagination through a set of `Slot`. */
  slotsBySlotBookingUserIdAndSlotIdList: Array<Slot>
  /** Reads and enables pagination through a set of `PaymentReceipt`. */
  paymentReceiptsBySlotBookingUserIdAndPaymentReceiptId: UserPaymentReceiptsBySlotBookingUserIdAndPaymentReceiptIdManyToManyConnection
  /** Reads and enables pagination through a set of `PaymentReceipt`. */
  paymentReceiptsBySlotBookingUserIdAndPaymentReceiptIdList: Array<PaymentReceipt>
}

export type UserSlotsByOwnerIdArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<SlotsOrderBy>>
  condition?: Maybe<SlotCondition>
  filter?: Maybe<SlotFilter>
}

export type UserSlotsByOwnerIdListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<SlotsOrderBy>>
  condition?: Maybe<SlotCondition>
  filter?: Maybe<SlotFilter>
}

export type UserVehiclesByOwnerIdArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<VehiclesOrderBy>>
  condition?: Maybe<VehicleCondition>
  filter?: Maybe<VehicleFilter>
}

export type UserVehiclesByOwnerIdListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<VehiclesOrderBy>>
  condition?: Maybe<VehicleCondition>
  filter?: Maybe<VehicleFilter>
}

export type UserBillingProfilesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<BillingProfilesOrderBy>>
  condition?: Maybe<BillingProfileCondition>
  filter?: Maybe<BillingProfileFilter>
}

export type UserBillingProfilesListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<BillingProfilesOrderBy>>
  condition?: Maybe<BillingProfileCondition>
  filter?: Maybe<BillingProfileFilter>
}

export type UserUserSubscriptionsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<UserSubscriptionsOrderBy>>
  condition?: Maybe<UserSubscriptionCondition>
  filter?: Maybe<UserSubscriptionFilter>
}

export type UserUserSubscriptionsListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<UserSubscriptionsOrderBy>>
  condition?: Maybe<UserSubscriptionCondition>
  filter?: Maybe<UserSubscriptionFilter>
}

export type UserParkingSpacesByOwnerIdArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<ParkingSpacesOrderBy>>
  condition?: Maybe<ParkingSpaceCondition>
  filter?: Maybe<ParkingSpaceFilter>
}

export type UserParkingSpacesByOwnerIdListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<ParkingSpacesOrderBy>>
  condition?: Maybe<ParkingSpaceCondition>
  filter?: Maybe<ParkingSpaceFilter>
}

export type UserBusinessesByOwnerIdArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<BusinessesOrderBy>>
  condition?: Maybe<BusinessCondition>
  filter?: Maybe<BusinessFilter>
}

export type UserBusinessesByOwnerIdListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<BusinessesOrderBy>>
  condition?: Maybe<BusinessCondition>
  filter?: Maybe<BusinessFilter>
}

export type UserPaymentReceiptsByOwnerIdArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<PaymentReceiptsOrderBy>>
  condition?: Maybe<PaymentReceiptCondition>
  filter?: Maybe<PaymentReceiptFilter>
}

export type UserPaymentReceiptsByOwnerIdListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<PaymentReceiptsOrderBy>>
  condition?: Maybe<PaymentReceiptCondition>
  filter?: Maybe<PaymentReceiptFilter>
}

export type UserSlotBookingsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<SlotBookingsOrderBy>>
  condition?: Maybe<SlotBookingCondition>
  filter?: Maybe<SlotBookingFilter>
}

export type UserSlotBookingsListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<SlotBookingsOrderBy>>
  condition?: Maybe<SlotBookingCondition>
  filter?: Maybe<SlotBookingFilter>
}

export type UserVehicleSizesBySlotOwnerIdAndVehicleSizeIdArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<VehicleSizesOrderBy>>
  condition?: Maybe<VehicleSizeCondition>
  filter?: Maybe<VehicleSizeFilter>
}

export type UserVehicleSizesBySlotOwnerIdAndVehicleSizeIdListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<VehicleSizesOrderBy>>
  condition?: Maybe<VehicleSizeCondition>
  filter?: Maybe<VehicleSizeFilter>
}

export type UserParkingSpacesBySlotOwnerIdAndParkingSpaceIdArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<ParkingSpacesOrderBy>>
  condition?: Maybe<ParkingSpaceCondition>
  filter?: Maybe<ParkingSpaceFilter>
}

export type UserParkingSpacesBySlotOwnerIdAndParkingSpaceIdListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<ParkingSpacesOrderBy>>
  condition?: Maybe<ParkingSpaceCondition>
  filter?: Maybe<ParkingSpaceFilter>
}

export type UserGeodataProvidersBySlotOwnerIdAndMapSourceArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<GeodataProvidersOrderBy>>
  condition?: Maybe<GeodataProviderCondition>
  filter?: Maybe<GeodataProviderFilter>
}

export type UserGeodataProvidersBySlotOwnerIdAndMapSourceListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<GeodataProvidersOrderBy>>
  condition?: Maybe<GeodataProviderCondition>
  filter?: Maybe<GeodataProviderFilter>
}

export type UserVehicleTypesByVehicleOwnerIdAndVehicleTypeIdArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<VehicleTypesOrderBy>>
  condition?: Maybe<VehicleTypeCondition>
  filter?: Maybe<VehicleTypeFilter>
}

export type UserVehicleTypesByVehicleOwnerIdAndVehicleTypeIdListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<VehicleTypesOrderBy>>
  condition?: Maybe<VehicleTypeCondition>
  filter?: Maybe<VehicleTypeFilter>
}

export type UserVehicleSizesByVehicleOwnerIdAndVehicleSizeIdArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<VehicleSizesOrderBy>>
  condition?: Maybe<VehicleSizeCondition>
  filter?: Maybe<VehicleSizeFilter>
}

export type UserVehicleSizesByVehicleOwnerIdAndVehicleSizeIdListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<VehicleSizesOrderBy>>
  condition?: Maybe<VehicleSizeCondition>
  filter?: Maybe<VehicleSizeFilter>
}

export type UserBillingProfilesByUserSubscriptionUserIdAndBillingProfileIdArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<BillingProfilesOrderBy>>
  condition?: Maybe<BillingProfileCondition>
  filter?: Maybe<BillingProfileFilter>
}

export type UserBillingProfilesByUserSubscriptionUserIdAndBillingProfileIdListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<BillingProfilesOrderBy>>
  condition?: Maybe<BillingProfileCondition>
  filter?: Maybe<BillingProfileFilter>
}

export type UserSlotsBySlotBookingUserIdAndSlotIdArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<SlotsOrderBy>>
  condition?: Maybe<SlotCondition>
  filter?: Maybe<SlotFilter>
}

export type UserSlotsBySlotBookingUserIdAndSlotIdListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<SlotsOrderBy>>
  condition?: Maybe<SlotCondition>
  filter?: Maybe<SlotFilter>
}

export type UserPaymentReceiptsBySlotBookingUserIdAndPaymentReceiptIdArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<PaymentReceiptsOrderBy>>
  condition?: Maybe<PaymentReceiptCondition>
  filter?: Maybe<PaymentReceiptFilter>
}

export type UserPaymentReceiptsBySlotBookingUserIdAndPaymentReceiptIdListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<PaymentReceiptsOrderBy>>
  condition?: Maybe<PaymentReceiptCondition>
  filter?: Maybe<PaymentReceiptFilter>
}

/** Status for subscription from stripe */
export enum StatusT {
  Enabled = 'ENABLED',
  Disabled = 'DISABLED',
  Pending = 'PENDING',
}

/** Methods to use when ordering `Slot`. */
export enum SlotsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  OwnerIdAsc = 'OWNER_ID_ASC',
  OwnerIdDesc = 'OWNER_ID_DESC',
  VehicleSizeIdAsc = 'VEHICLE_SIZE_ID_ASC',
  VehicleSizeIdDesc = 'VEHICLE_SIZE_ID_DESC',
  AddressAsc = 'ADDRESS_ASC',
  AddressDesc = 'ADDRESS_DESC',
  TimezoneAsc = 'TIMEZONE_ASC',
  TimezoneDesc = 'TIMEZONE_DESC',
  PricePerHourAsc = 'PRICE_PER_HOUR_ASC',
  PricePerHourDesc = 'PRICE_PER_HOUR_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC',
  PhotoUrlAsc = 'PHOTO_URL_ASC',
  PhotoUrlDesc = 'PHOTO_URL_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  NotesAsc = 'NOTES_ASC',
  NotesDesc = 'NOTES_DESC',
  SlugAsc = 'SLUG_ASC',
  SlugDesc = 'SLUG_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  DeletedAsc = 'DELETED_ASC',
  DeletedDesc = 'DELETED_DESC',
  DeletedAtAsc = 'DELETED_AT_ASC',
  DeletedAtDesc = 'DELETED_AT_DESC',
  VerificationStatusAsc = 'VERIFICATION_STATUS_ASC',
  VerificationStatusDesc = 'VERIFICATION_STATUS_DESC',
  ParkingSpaceIdAsc = 'PARKING_SPACE_ID_ASC',
  ParkingSpaceIdDesc = 'PARKING_SPACE_ID_DESC',
  LocationAsc = 'LOCATION_ASC',
  LocationDesc = 'LOCATION_DESC',
  ShapeAsc = 'SHAPE_ASC',
  ShapeDesc = 'SHAPE_DESC',
  AccessRestrictionsAsc = 'ACCESS_RESTRICTIONS_ASC',
  AccessRestrictionsDesc = 'ACCESS_RESTRICTIONS_DESC',
  BusinessStatusAsc = 'BUSINESS_STATUS_ASC',
  BusinessStatusDesc = 'BUSINESS_STATUS_DESC',
  BusinessStatusReasonAsc = 'BUSINESS_STATUS_REASON_ASC',
  BusinessStatusReasonDesc = 'BUSINESS_STATUS_REASON_DESC',
  CategoryAsc = 'CATEGORY_ASC',
  CategoryDesc = 'CATEGORY_DESC',
  ContributorIdAsc = 'CONTRIBUTOR_ID_ASC',
  ContributorIdDesc = 'CONTRIBUTOR_ID_DESC',
  LevelAsc = 'LEVEL_ASC',
  LevelDesc = 'LEVEL_DESC',
  MapSourceAsc = 'MAP_SOURCE_ASC',
  MapSourceDesc = 'MAP_SOURCE_DESC',
  SlotDimensionsAsc = 'SLOT_DIMENSIONS_ASC',
  SlotDimensionsDesc = 'SLOT_DIMENSIONS_DESC',
  TempUnavailableAsc = 'TEMP_UNAVAILABLE_ASC',
  TempUnavailableDesc = 'TEMP_UNAVAILABLE_DESC',
  TempUnavailableFromAsc = 'TEMP_UNAVAILABLE_FROM_ASC',
  TempUnavailableFromDesc = 'TEMP_UNAVAILABLE_FROM_DESC',
  TempUnavailableToAsc = 'TEMP_UNAVAILABLE_TO_ASC',
  TempUnavailableToDesc = 'TEMP_UNAVAILABLE_TO_DESC',
  WaypointsAsc = 'WAYPOINTS_ASC',
  WaypointsDesc = 'WAYPOINTS_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UserByOwnerIdIdAsc = 'USER_BY_OWNER_ID__ID_ASC',
  UserByOwnerIdIdDesc = 'USER_BY_OWNER_ID__ID_DESC',
  UserByOwnerIdNameAsc = 'USER_BY_OWNER_ID__NAME_ASC',
  UserByOwnerIdNameDesc = 'USER_BY_OWNER_ID__NAME_DESC',
  UserByOwnerIdEmailAsc = 'USER_BY_OWNER_ID__EMAIL_ASC',
  UserByOwnerIdEmailDesc = 'USER_BY_OWNER_ID__EMAIL_DESC',
  UserByOwnerIdEmailConfirmedAsc = 'USER_BY_OWNER_ID__EMAIL_CONFIRMED_ASC',
  UserByOwnerIdEmailConfirmedDesc = 'USER_BY_OWNER_ID__EMAIL_CONFIRMED_DESC',
  UserByOwnerIdStatusAsc = 'USER_BY_OWNER_ID__STATUS_ASC',
  UserByOwnerIdStatusDesc = 'USER_BY_OWNER_ID__STATUS_DESC',
  UserByOwnerIdRoleAsc = 'USER_BY_OWNER_ID__ROLE_ASC',
  UserByOwnerIdRoleDesc = 'USER_BY_OWNER_ID__ROLE_DESC',
  UserByOwnerIdPhotoUrlAsc = 'USER_BY_OWNER_ID__PHOTO_URL_ASC',
  UserByOwnerIdPhotoUrlDesc = 'USER_BY_OWNER_ID__PHOTO_URL_DESC',
  UserByOwnerIdPhoneAsc = 'USER_BY_OWNER_ID__PHONE_ASC',
  UserByOwnerIdPhoneDesc = 'USER_BY_OWNER_ID__PHONE_DESC',
  UserByOwnerIdAddressAsc = 'USER_BY_OWNER_ID__ADDRESS_ASC',
  UserByOwnerIdAddressDesc = 'USER_BY_OWNER_ID__ADDRESS_DESC',
  UserByOwnerIdSettingsAsc = 'USER_BY_OWNER_ID__SETTINGS_ASC',
  UserByOwnerIdSettingsDesc = 'USER_BY_OWNER_ID__SETTINGS_DESC',
  UserByOwnerIdCreatedAtAsc = 'USER_BY_OWNER_ID__CREATED_AT_ASC',
  UserByOwnerIdCreatedAtDesc = 'USER_BY_OWNER_ID__CREATED_AT_DESC',
  UserByOwnerIdUpdatedAtAsc = 'USER_BY_OWNER_ID__UPDATED_AT_ASC',
  UserByOwnerIdUpdatedAtDesc = 'USER_BY_OWNER_ID__UPDATED_AT_DESC',
  UserByOwnerIdDeletedAsc = 'USER_BY_OWNER_ID__DELETED_ASC',
  UserByOwnerIdDeletedDesc = 'USER_BY_OWNER_ID__DELETED_DESC',
  UserByOwnerIdDeletedAtAsc = 'USER_BY_OWNER_ID__DELETED_AT_ASC',
  UserByOwnerIdDeletedAtDesc = 'USER_BY_OWNER_ID__DELETED_AT_DESC',
  VehicleSizeByVehicleSizeIdIdAsc = 'VEHICLE_SIZE_BY_VEHICLE_SIZE_ID__ID_ASC',
  VehicleSizeByVehicleSizeIdIdDesc = 'VEHICLE_SIZE_BY_VEHICLE_SIZE_ID__ID_DESC',
  VehicleSizeByVehicleSizeIdStatusAsc = 'VEHICLE_SIZE_BY_VEHICLE_SIZE_ID__STATUS_ASC',
  VehicleSizeByVehicleSizeIdStatusDesc = 'VEHICLE_SIZE_BY_VEHICLE_SIZE_ID__STATUS_DESC',
  VehicleSizeByVehicleSizeIdNameAsc = 'VEHICLE_SIZE_BY_VEHICLE_SIZE_ID__NAME_ASC',
  VehicleSizeByVehicleSizeIdNameDesc = 'VEHICLE_SIZE_BY_VEHICLE_SIZE_ID__NAME_DESC',
  VehicleSizeByVehicleSizeIdWeightAsc = 'VEHICLE_SIZE_BY_VEHICLE_SIZE_ID__WEIGHT_ASC',
  VehicleSizeByVehicleSizeIdWeightDesc = 'VEHICLE_SIZE_BY_VEHICLE_SIZE_ID__WEIGHT_DESC',
  VehicleSizeByVehicleSizeIdDescriptionAsc = 'VEHICLE_SIZE_BY_VEHICLE_SIZE_ID__DESCRIPTION_ASC',
  VehicleSizeByVehicleSizeIdDescriptionDesc = 'VEHICLE_SIZE_BY_VEHICLE_SIZE_ID__DESCRIPTION_DESC',
  VehicleSizeByVehicleSizeIdCreatedAtAsc = 'VEHICLE_SIZE_BY_VEHICLE_SIZE_ID__CREATED_AT_ASC',
  VehicleSizeByVehicleSizeIdCreatedAtDesc = 'VEHICLE_SIZE_BY_VEHICLE_SIZE_ID__CREATED_AT_DESC',
  VehicleSizeByVehicleSizeIdUpdatedAtAsc = 'VEHICLE_SIZE_BY_VEHICLE_SIZE_ID__UPDATED_AT_ASC',
  VehicleSizeByVehicleSizeIdUpdatedAtDesc = 'VEHICLE_SIZE_BY_VEHICLE_SIZE_ID__UPDATED_AT_DESC',
  ParkingSpaceByParkingSpaceIdIdAsc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__ID_ASC',
  ParkingSpaceByParkingSpaceIdIdDesc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__ID_DESC',
  ParkingSpaceByParkingSpaceIdOwnerIdAsc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__OWNER_ID_ASC',
  ParkingSpaceByParkingSpaceIdOwnerIdDesc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__OWNER_ID_DESC',
  ParkingSpaceByParkingSpaceIdNameAsc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__NAME_ASC',
  ParkingSpaceByParkingSpaceIdNameDesc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__NAME_DESC',
  ParkingSpaceByParkingSpaceIdDescriptionAsc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__DESCRIPTION_ASC',
  ParkingSpaceByParkingSpaceIdDescriptionDesc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__DESCRIPTION_DESC',
  ParkingSpaceByParkingSpaceIdPhotoUrlAsc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__PHOTO_URL_ASC',
  ParkingSpaceByParkingSpaceIdPhotoUrlDesc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__PHOTO_URL_DESC',
  ParkingSpaceByParkingSpaceIdSettingsAsc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__SETTINGS_ASC',
  ParkingSpaceByParkingSpaceIdSettingsDesc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__SETTINGS_DESC',
  ParkingSpaceByParkingSpaceIdAddressAsc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__ADDRESS_ASC',
  ParkingSpaceByParkingSpaceIdAddressDesc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__ADDRESS_DESC',
  ParkingSpaceByParkingSpaceIdLocationAsc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__LOCATION_ASC',
  ParkingSpaceByParkingSpaceIdLocationDesc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__LOCATION_DESC',
  ParkingSpaceByParkingSpaceIdSlugAsc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__SLUG_ASC',
  ParkingSpaceByParkingSpaceIdSlugDesc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__SLUG_DESC',
  ParkingSpaceByParkingSpaceIdCreatedAtAsc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__CREATED_AT_ASC',
  ParkingSpaceByParkingSpaceIdCreatedAtDesc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__CREATED_AT_DESC',
  ParkingSpaceByParkingSpaceIdUpdatedAtAsc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__UPDATED_AT_ASC',
  ParkingSpaceByParkingSpaceIdUpdatedAtDesc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__UPDATED_AT_DESC',
  ParkingSpaceByParkingSpaceIdCarEntryAsc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__CAR_ENTRY_ASC',
  ParkingSpaceByParkingSpaceIdCarEntryDesc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__CAR_ENTRY_DESC',
  ParkingSpaceByParkingSpaceIdCarExitAsc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__CAR_EXIT_ASC',
  ParkingSpaceByParkingSpaceIdCarExitDesc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__CAR_EXIT_DESC',
  ParkingSpaceByParkingSpaceIdCompanyEntranceAsc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__COMPANY_ENTRANCE_ASC',
  ParkingSpaceByParkingSpaceIdCompanyEntranceDesc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__COMPANY_ENTRANCE_DESC',
  ParkingSpaceByParkingSpaceIdParkingspaceMapviewAsc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__PARKINGSPACE_MAPVIEW_ASC',
  ParkingSpaceByParkingSpaceIdParkingspaceMapviewDesc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__PARKINGSPACE_MAPVIEW_DESC',
  ParkingSpaceByParkingSpaceIdBrandLogoAsc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__BRAND_LOGO_ASC',
  ParkingSpaceByParkingSpaceIdBrandLogoDesc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__BRAND_LOGO_DESC',
  ParkingSpaceByParkingSpaceIdWorkingHoursAsc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__WORKING_HOURS_ASC',
  ParkingSpaceByParkingSpaceIdWorkingHoursDesc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__WORKING_HOURS_DESC',
  ParkingSpaceByParkingSpaceIdAdvtLinkAsc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__ADVT_LINK_ASC',
  ParkingSpaceByParkingSpaceIdAdvtLinkDesc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__ADVT_LINK_DESC',
  ParkingSpaceByParkingSpaceIdBluePrintAsc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__BLUE_PRINT_ASC',
  ParkingSpaceByParkingSpaceIdBluePrintDesc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__BLUE_PRINT_DESC',
  ParkingSpaceByParkingSpaceIdHiddenFieldAsc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__HIDDEN_FIELD_ASC',
  ParkingSpaceByParkingSpaceIdHiddenFieldDesc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__HIDDEN_FIELD_DESC',
  ParkingSpaceByParkingSpaceIdPedestrianTextAsc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__PEDESTRIAN_TEXT_ASC',
  ParkingSpaceByParkingSpaceIdPedestrianTextDesc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__PEDESTRIAN_TEXT_DESC',
  ParkingSpaceByParkingSpaceIdLanguageCodeAsc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__LANGUAGE_CODE_ASC',
  ParkingSpaceByParkingSpaceIdLanguageCodeDesc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__LANGUAGE_CODE_DESC',
  ParkingSpaceByParkingSpaceIdContributorIdAsc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__CONTRIBUTOR_ID_ASC',
  ParkingSpaceByParkingSpaceIdContributorIdDesc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__CONTRIBUTOR_ID_DESC',
  ParkingSpaceByParkingSpaceIdFloorAsc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__FLOOR_ASC',
  ParkingSpaceByParkingSpaceIdFloorDesc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__FLOOR_DESC',
  ParkingSpaceByParkingSpaceIdCategoryAsc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__CATEGORY_ASC',
  ParkingSpaceByParkingSpaceIdCategoryDesc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__CATEGORY_DESC',
  ParkingSpaceByParkingSpaceIdStatusAsc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__STATUS_ASC',
  ParkingSpaceByParkingSpaceIdStatusDesc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__STATUS_DESC',
  ParkingSpaceByParkingSpaceIdVerificationStatusAsc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__VERIFICATION_STATUS_ASC',
  ParkingSpaceByParkingSpaceIdVerificationStatusDesc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__VERIFICATION_STATUS_DESC',
  ParkingSpaceByParkingSpaceIdAccessRestrictionAsc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__ACCESS_RESTRICTION_ASC',
  ParkingSpaceByParkingSpaceIdAccessRestrictionDesc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__ACCESS_RESTRICTION_DESC',
  ParkingSpaceByParkingSpaceIdDeletedAsc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__DELETED_ASC',
  ParkingSpaceByParkingSpaceIdDeletedDesc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__DELETED_DESC',
  ParkingSpaceByParkingSpaceIdDeletedAtAsc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__DELETED_AT_ASC',
  ParkingSpaceByParkingSpaceIdDeletedAtDesc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__DELETED_AT_DESC',
  ParkingSpaceByParkingSpaceIdBusinessStatusReasonAsc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__BUSINESS_STATUS_REASON_ASC',
  ParkingSpaceByParkingSpaceIdBusinessStatusReasonDesc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__BUSINESS_STATUS_REASON_DESC',
  SlotAmenitiesBySlotIdCountAsc = 'SLOT_AMENITIES_BY_SLOT_ID__COUNT_ASC',
  SlotAmenitiesBySlotIdCountDesc = 'SLOT_AMENITIES_BY_SLOT_ID__COUNT_DESC',
  SlotAvailabilitiesBySlotIdCountAsc = 'SLOT_AVAILABILITIES_BY_SLOT_ID__COUNT_ASC',
  SlotAvailabilitiesBySlotIdCountDesc = 'SLOT_AVAILABILITIES_BY_SLOT_ID__COUNT_DESC',
  SlotBookingsBySlotIdCountAsc = 'SLOT_BOOKINGS_BY_SLOT_ID__COUNT_ASC',
  SlotBookingsBySlotIdCountDesc = 'SLOT_BOOKINGS_BY_SLOT_ID__COUNT_DESC',
}

/** A condition to be used against `Slot` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type SlotCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>
  /** Checks for equality with the object’s `name` field. */
  name?: Maybe<Scalars['String']>
  /** Checks for equality with the object’s `ownerId` field. */
  ownerId?: Maybe<Scalars['UUID']>
  /** Checks for equality with the object’s `vehicleSizeId` field. */
  vehicleSizeId?: Maybe<Scalars['UUID']>
  /** Checks for equality with the object’s `address` field. */
  address?: Maybe<Scalars['JSON']>
  /** Checks for equality with the object’s `timezone` field. */
  timezone?: Maybe<Scalars['String']>
  /** Checks for equality with the object’s `pricePerHour` field. */
  pricePerHour?: Maybe<Scalars['BigFloat']>
  /** Checks for equality with the object’s `status` field. */
  status?: Maybe<SlotStatusT>
  /** Checks for equality with the object’s `photoUrl` field. */
  photoUrl?: Maybe<Scalars['String']>
  /** Checks for equality with the object’s `description` field. */
  description?: Maybe<Scalars['String']>
  /** Checks for equality with the object’s `notes` field. */
  notes?: Maybe<Scalars['String']>
  /** Checks for equality with the object’s `slug` field. */
  slug?: Maybe<Scalars['String']>
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>
  /** Checks for equality with the object’s `deleted` field. */
  deleted?: Maybe<Scalars['Boolean']>
  /** Checks for equality with the object’s `deletedAt` field. */
  deletedAt?: Maybe<Scalars['Datetime']>
  /** Checks for equality with the object’s `verificationStatus` field. */
  verificationStatus?: Maybe<SlotVerificationStatus>
  /** Checks for equality with the object’s `parkingSpaceId` field. */
  parkingSpaceId?: Maybe<Scalars['UUID']>
  /** Checks for equality with the object’s `location` field. */
  location?: Maybe<Scalars['GeoJSON']>
  /** Checks for equality with the object’s `shape` field. */
  shape?: Maybe<Scalars['GeoJSON']>
  /** Checks for equality with the object’s `accessRestrictions` field. */
  accessRestrictions?: Maybe<AccessRestrictions>
  /** Checks for equality with the object’s `businessStatus` field. */
  businessStatus?: Maybe<SlotBusinessStatus>
  /** Checks for equality with the object’s `businessStatusReason` field. */
  businessStatusReason?: Maybe<Scalars['String']>
  /** Checks for equality with the object’s `category` field. */
  category?: Maybe<SlotCategory>
  /** Checks for equality with the object’s `contributorId` field. */
  contributorId?: Maybe<Scalars['UUID']>
  /** Checks for equality with the object’s `level` field. */
  level?: Maybe<Scalars['Int']>
  /** Checks for equality with the object’s `mapSource` field. */
  mapSource?: Maybe<Scalars['UUID']>
  /** Checks for equality with the object’s `slotDimensions` field. */
  slotDimensions?: Maybe<Scalars['JSON']>
  /** Checks for equality with the object’s `tempUnavailable` field. */
  tempUnavailable?: Maybe<Scalars['Boolean']>
  /** Checks for equality with the object’s `tempUnavailableFrom` field. */
  tempUnavailableFrom?: Maybe<Scalars['Datetime']>
  /** Checks for equality with the object’s `tempUnavailableTo` field. */
  tempUnavailableTo?: Maybe<Scalars['Datetime']>
  /** Checks for equality with the object’s `waypoints` field. */
  waypoints?: Maybe<Scalars['JSON']>
}

/** A filter to be used against `Slot` object types. All fields are combined with a logical ‘and.’ */
export type SlotFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<UuidFilter>
  /** Filter by the object’s `name` field. */
  name?: Maybe<StringFilter>
  /** Filter by the object’s `ownerId` field. */
  ownerId?: Maybe<UuidFilter>
  /** Filter by the object’s `vehicleSizeId` field. */
  vehicleSizeId?: Maybe<UuidFilter>
  /** Filter by the object’s `timezone` field. */
  timezone?: Maybe<StringFilter>
  /** Filter by the object’s `pricePerHour` field. */
  pricePerHour?: Maybe<BigFloatFilter>
  /** Filter by the object’s `status` field. */
  status?: Maybe<SlotStatusTFilter>
  /** Filter by the object’s `photoUrl` field. */
  photoUrl?: Maybe<StringFilter>
  /** Filter by the object’s `description` field. */
  description?: Maybe<StringFilter>
  /** Filter by the object’s `notes` field. */
  notes?: Maybe<StringFilter>
  /** Filter by the object’s `slug` field. */
  slug?: Maybe<StringFilter>
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: Maybe<DatetimeFilter>
  /** Filter by the object’s `deleted` field. */
  deleted?: Maybe<BooleanFilter>
  /** Filter by the object’s `deletedAt` field. */
  deletedAt?: Maybe<DatetimeFilter>
  /** Filter by the object’s `verificationStatus` field. */
  verificationStatus?: Maybe<SlotVerificationStatusFilter>
  /** Filter by the object’s `parkingSpaceId` field. */
  parkingSpaceId?: Maybe<UuidFilter>
  /** Filter by the object’s `location` field. */
  location?: Maybe<GeometryPointFilter>
  /** Filter by the object’s `shape` field. */
  shape?: Maybe<GeometryPolygonFilter>
  /** Filter by the object’s `accessRestrictions` field. */
  accessRestrictions?: Maybe<AccessRestrictionsFilter>
  /** Filter by the object’s `businessStatus` field. */
  businessStatus?: Maybe<SlotBusinessStatusFilter>
  /** Filter by the object’s `businessStatusReason` field. */
  businessStatusReason?: Maybe<StringFilter>
  /** Filter by the object’s `category` field. */
  category?: Maybe<SlotCategoryFilter>
  /** Filter by the object’s `contributorId` field. */
  contributorId?: Maybe<UuidFilter>
  /** Filter by the object’s `level` field. */
  level?: Maybe<IntFilter>
  /** Filter by the object’s `mapSource` field. */
  mapSource?: Maybe<UuidFilter>
  /** Filter by the object’s `tempUnavailable` field. */
  tempUnavailable?: Maybe<BooleanFilter>
  /** Filter by the object’s `tempUnavailableFrom` field. */
  tempUnavailableFrom?: Maybe<DatetimeFilter>
  /** Filter by the object’s `tempUnavailableTo` field. */
  tempUnavailableTo?: Maybe<DatetimeFilter>
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<SlotFilter>>
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<SlotFilter>>
  /** Negates the expression. */
  not?: Maybe<SlotFilter>
}

/** A filter to be used against BigFloat fields. All fields are combined with a logical ‘and.’ */
export type BigFloatFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>
  /** Equal to the specified value. */
  equalTo?: Maybe<Scalars['BigFloat']>
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Scalars['BigFloat']>
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Scalars['BigFloat']>
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Scalars['BigFloat']>
  /** Included in the specified list. */
  in?: Maybe<Array<Scalars['BigFloat']>>
  /** Not included in the specified list. */
  notIn?: Maybe<Array<Scalars['BigFloat']>>
  /** Less than the specified value. */
  lessThan?: Maybe<Scalars['BigFloat']>
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Scalars['BigFloat']>
  /** Greater than the specified value. */
  greaterThan?: Maybe<Scalars['BigFloat']>
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Scalars['BigFloat']>
}

/** A filter to be used against SlotStatusT fields. All fields are combined with a logical ‘and.’ */
export type SlotStatusTFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>
  /** Equal to the specified value. */
  equalTo?: Maybe<SlotStatusT>
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<SlotStatusT>
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<SlotStatusT>
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<SlotStatusT>
  /** Included in the specified list. */
  in?: Maybe<Array<SlotStatusT>>
  /** Not included in the specified list. */
  notIn?: Maybe<Array<SlotStatusT>>
  /** Less than the specified value. */
  lessThan?: Maybe<SlotStatusT>
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<SlotStatusT>
  /** Greater than the specified value. */
  greaterThan?: Maybe<SlotStatusT>
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<SlotStatusT>
}

/** A filter to be used against Boolean fields. All fields are combined with a logical ‘and.’ */
export type BooleanFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>
  /** Equal to the specified value. */
  equalTo?: Maybe<Scalars['Boolean']>
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Scalars['Boolean']>
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Scalars['Boolean']>
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Scalars['Boolean']>
  /** Included in the specified list. */
  in?: Maybe<Array<Scalars['Boolean']>>
  /** Not included in the specified list. */
  notIn?: Maybe<Array<Scalars['Boolean']>>
  /** Less than the specified value. */
  lessThan?: Maybe<Scalars['Boolean']>
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Scalars['Boolean']>
  /** Greater than the specified value. */
  greaterThan?: Maybe<Scalars['Boolean']>
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Scalars['Boolean']>
}

/** A filter to be used against SlotVerificationStatus fields. All fields are combined with a logical ‘and.’ */
export type SlotVerificationStatusFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>
  /** Equal to the specified value. */
  equalTo?: Maybe<SlotVerificationStatus>
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<SlotVerificationStatus>
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<SlotVerificationStatus>
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<SlotVerificationStatus>
  /** Included in the specified list. */
  in?: Maybe<Array<SlotVerificationStatus>>
  /** Not included in the specified list. */
  notIn?: Maybe<Array<SlotVerificationStatus>>
  /** Less than the specified value. */
  lessThan?: Maybe<SlotVerificationStatus>
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<SlotVerificationStatus>
  /** Greater than the specified value. */
  greaterThan?: Maybe<SlotVerificationStatus>
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<SlotVerificationStatus>
}

/** A filter to be used against GeometryPoint fields. All fields are combined with a logical ‘and.’ */
export type GeometryPointFilter = {
  /** Bounding box is strictly above the specified geometry's bounding box. */
  bboxAbove?: Maybe<Scalars['GeoJSON']>
  /** Bounding box is strictly below the specified geometry's bounding box. */
  bboxBelow?: Maybe<Scalars['GeoJSON']>
  /** Bounding box contains the specified geometry's bounding box. */
  bboxContains?: Maybe<Scalars['GeoJSON']>
  /** Bounding box is the same as the specified geometry's bounding box. */
  bboxEquals?: Maybe<Scalars['GeoJSON']>
  /** 2D bounding box intersects the specified geometry's 2D bounding box. */
  bboxIntersects2D?: Maybe<Scalars['GeoJSON']>
  /** n-D bounding box intersects the specified geometry's n-D bounding box. */
  bboxIntersectsND?: Maybe<Scalars['GeoJSON']>
  /** Bounding box is strictly to the left of the specified geometry's bounding box. */
  bboxLeftOf?: Maybe<Scalars['GeoJSON']>
  /** Bounding box overlaps or is above the specified geometry's bounding box. */
  bboxOverlapsOrAbove?: Maybe<Scalars['GeoJSON']>
  /** Bounding box overlaps or is below the specified geometry's bounding box. */
  bboxOverlapsOrBelow?: Maybe<Scalars['GeoJSON']>
  /** Bounding box overlaps or is to the left of the specified geometry's bounding box. */
  bboxOverlapsOrLeftOf?: Maybe<Scalars['GeoJSON']>
  /** Bounding box overlaps or is to the right of the specified geometry's bounding box. */
  bboxOverlapsOrRightOf?: Maybe<Scalars['GeoJSON']>
  /** Bounding box is strictly to the right of the specified geometry's bounding box. */
  bboxRightOf?: Maybe<Scalars['GeoJSON']>
  /** No points of the specified geometry lie in the exterior, and at least one point of the interior of the specified geometry lies in the interior. */
  contains?: Maybe<Scalars['GeoJSON']>
  /** The specified geometry intersects the interior but not the boundary (or exterior). */
  containsProperly?: Maybe<Scalars['GeoJSON']>
  /** No point is outside the specified geometry. */
  coveredBy?: Maybe<Scalars['GeoJSON']>
  /** No point in the specified geometry is outside. */
  covers?: Maybe<Scalars['GeoJSON']>
  /** They have some, but not all, interior points in common. */
  crosses?: Maybe<Scalars['GeoJSON']>
  /** They do not share any space together. */
  disjoint?: Maybe<Scalars['GeoJSON']>
  /** They represent the same geometry. Directionality is ignored. */
  equals?: Maybe<Scalars['GeoJSON']>
  /** Coordinates and coordinate order are the same as specified geometry. */
  exactlyEquals?: Maybe<Scalars['GeoJSON']>
  /** They share any portion of space in 2D. */
  intersects?: Maybe<Scalars['GeoJSON']>
  /** They share any portion of space in 3D. */
  intersects3D?: Maybe<Scalars['GeoJSON']>
  /** They represent the same geometry and points are in the same directional order. */
  orderingEquals?: Maybe<Scalars['GeoJSON']>
  /** They share space, are of the same dimension, but are not completely contained by each other. */
  overlaps?: Maybe<Scalars['GeoJSON']>
  /** They have at least one point in common, but their interiors do not intersect. */
  touches?: Maybe<Scalars['GeoJSON']>
  /** Completely inside the specified geometry. */
  within?: Maybe<Scalars['GeoJSON']>
}

/** A filter to be used against GeometryPolygon fields. All fields are combined with a logical ‘and.’ */
export type GeometryPolygonFilter = {
  /** Bounding box is strictly above the specified geometry's bounding box. */
  bboxAbove?: Maybe<Scalars['GeoJSON']>
  /** Bounding box is strictly below the specified geometry's bounding box. */
  bboxBelow?: Maybe<Scalars['GeoJSON']>
  /** Bounding box contains the specified geometry's bounding box. */
  bboxContains?: Maybe<Scalars['GeoJSON']>
  /** Bounding box is the same as the specified geometry's bounding box. */
  bboxEquals?: Maybe<Scalars['GeoJSON']>
  /** 2D bounding box intersects the specified geometry's 2D bounding box. */
  bboxIntersects2D?: Maybe<Scalars['GeoJSON']>
  /** n-D bounding box intersects the specified geometry's n-D bounding box. */
  bboxIntersectsND?: Maybe<Scalars['GeoJSON']>
  /** Bounding box is strictly to the left of the specified geometry's bounding box. */
  bboxLeftOf?: Maybe<Scalars['GeoJSON']>
  /** Bounding box overlaps or is above the specified geometry's bounding box. */
  bboxOverlapsOrAbove?: Maybe<Scalars['GeoJSON']>
  /** Bounding box overlaps or is below the specified geometry's bounding box. */
  bboxOverlapsOrBelow?: Maybe<Scalars['GeoJSON']>
  /** Bounding box overlaps or is to the left of the specified geometry's bounding box. */
  bboxOverlapsOrLeftOf?: Maybe<Scalars['GeoJSON']>
  /** Bounding box overlaps or is to the right of the specified geometry's bounding box. */
  bboxOverlapsOrRightOf?: Maybe<Scalars['GeoJSON']>
  /** Bounding box is strictly to the right of the specified geometry's bounding box. */
  bboxRightOf?: Maybe<Scalars['GeoJSON']>
  /** No points of the specified geometry lie in the exterior, and at least one point of the interior of the specified geometry lies in the interior. */
  contains?: Maybe<Scalars['GeoJSON']>
  /** The specified geometry intersects the interior but not the boundary (or exterior). */
  containsProperly?: Maybe<Scalars['GeoJSON']>
  /** No point is outside the specified geometry. */
  coveredBy?: Maybe<Scalars['GeoJSON']>
  /** No point in the specified geometry is outside. */
  covers?: Maybe<Scalars['GeoJSON']>
  /** They have some, but not all, interior points in common. */
  crosses?: Maybe<Scalars['GeoJSON']>
  /** They do not share any space together. */
  disjoint?: Maybe<Scalars['GeoJSON']>
  /** They represent the same geometry. Directionality is ignored. */
  equals?: Maybe<Scalars['GeoJSON']>
  /** Coordinates and coordinate order are the same as specified geometry. */
  exactlyEquals?: Maybe<Scalars['GeoJSON']>
  /** They share any portion of space in 2D. */
  intersects?: Maybe<Scalars['GeoJSON']>
  /** They share any portion of space in 3D. */
  intersects3D?: Maybe<Scalars['GeoJSON']>
  /** They represent the same geometry and points are in the same directional order. */
  orderingEquals?: Maybe<Scalars['GeoJSON']>
  /** They share space, are of the same dimension, but are not completely contained by each other. */
  overlaps?: Maybe<Scalars['GeoJSON']>
  /** They have at least one point in common, but their interiors do not intersect. */
  touches?: Maybe<Scalars['GeoJSON']>
  /** Completely inside the specified geometry. */
  within?: Maybe<Scalars['GeoJSON']>
}

/** A filter to be used against AccessRestrictions fields. All fields are combined with a logical ‘and.’ */
export type AccessRestrictionsFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>
  /** Equal to the specified value. */
  equalTo?: Maybe<AccessRestrictions>
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<AccessRestrictions>
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<AccessRestrictions>
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<AccessRestrictions>
  /** Included in the specified list. */
  in?: Maybe<Array<AccessRestrictions>>
  /** Not included in the specified list. */
  notIn?: Maybe<Array<AccessRestrictions>>
  /** Less than the specified value. */
  lessThan?: Maybe<AccessRestrictions>
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<AccessRestrictions>
  /** Greater than the specified value. */
  greaterThan?: Maybe<AccessRestrictions>
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<AccessRestrictions>
}

/** A filter to be used against SlotBusinessStatus fields. All fields are combined with a logical ‘and.’ */
export type SlotBusinessStatusFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>
  /** Equal to the specified value. */
  equalTo?: Maybe<SlotBusinessStatus>
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<SlotBusinessStatus>
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<SlotBusinessStatus>
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<SlotBusinessStatus>
  /** Included in the specified list. */
  in?: Maybe<Array<SlotBusinessStatus>>
  /** Not included in the specified list. */
  notIn?: Maybe<Array<SlotBusinessStatus>>
  /** Less than the specified value. */
  lessThan?: Maybe<SlotBusinessStatus>
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<SlotBusinessStatus>
  /** Greater than the specified value. */
  greaterThan?: Maybe<SlotBusinessStatus>
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<SlotBusinessStatus>
}

/** A filter to be used against SlotCategory fields. All fields are combined with a logical ‘and.’ */
export type SlotCategoryFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>
  /** Equal to the specified value. */
  equalTo?: Maybe<SlotCategory>
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<SlotCategory>
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<SlotCategory>
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<SlotCategory>
  /** Included in the specified list. */
  in?: Maybe<Array<SlotCategory>>
  /** Not included in the specified list. */
  notIn?: Maybe<Array<SlotCategory>>
  /** Less than the specified value. */
  lessThan?: Maybe<SlotCategory>
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<SlotCategory>
  /** Greater than the specified value. */
  greaterThan?: Maybe<SlotCategory>
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<SlotCategory>
}

/** A connection to a list of `Slot` values. */
export type SlotsConnection = {
  /** A list of `Slot` objects. */
  nodes: Array<Slot>
  /** A list of edges which contains the `Slot` and cursor to aid in pagination. */
  edges: Array<SlotsEdge>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `Slot` you could get from the connection. */
  totalCount: Scalars['Int']
}

/** A `Slot` edge in the connection. */
export type SlotsEdge = {
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `Slot` at the end of the edge. */
  node: Slot
}

/** Information about pagination in a connection. */
export type PageInfo = {
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['Cursor']>
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['Cursor']>
}

/** Methods to use when ordering `Vehicle`. */
export enum VehiclesOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  OwnerIdAsc = 'OWNER_ID_ASC',
  OwnerIdDesc = 'OWNER_ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  LicensePlateAsc = 'LICENSE_PLATE_ASC',
  LicensePlateDesc = 'LICENSE_PLATE_DESC',
  VehicleTypeIdAsc = 'VEHICLE_TYPE_ID_ASC',
  VehicleTypeIdDesc = 'VEHICLE_TYPE_ID_DESC',
  VehicleSizeIdAsc = 'VEHICLE_SIZE_ID_ASC',
  VehicleSizeIdDesc = 'VEHICLE_SIZE_ID_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UserByOwnerIdIdAsc = 'USER_BY_OWNER_ID__ID_ASC',
  UserByOwnerIdIdDesc = 'USER_BY_OWNER_ID__ID_DESC',
  UserByOwnerIdNameAsc = 'USER_BY_OWNER_ID__NAME_ASC',
  UserByOwnerIdNameDesc = 'USER_BY_OWNER_ID__NAME_DESC',
  UserByOwnerIdEmailAsc = 'USER_BY_OWNER_ID__EMAIL_ASC',
  UserByOwnerIdEmailDesc = 'USER_BY_OWNER_ID__EMAIL_DESC',
  UserByOwnerIdEmailConfirmedAsc = 'USER_BY_OWNER_ID__EMAIL_CONFIRMED_ASC',
  UserByOwnerIdEmailConfirmedDesc = 'USER_BY_OWNER_ID__EMAIL_CONFIRMED_DESC',
  UserByOwnerIdStatusAsc = 'USER_BY_OWNER_ID__STATUS_ASC',
  UserByOwnerIdStatusDesc = 'USER_BY_OWNER_ID__STATUS_DESC',
  UserByOwnerIdRoleAsc = 'USER_BY_OWNER_ID__ROLE_ASC',
  UserByOwnerIdRoleDesc = 'USER_BY_OWNER_ID__ROLE_DESC',
  UserByOwnerIdPhotoUrlAsc = 'USER_BY_OWNER_ID__PHOTO_URL_ASC',
  UserByOwnerIdPhotoUrlDesc = 'USER_BY_OWNER_ID__PHOTO_URL_DESC',
  UserByOwnerIdPhoneAsc = 'USER_BY_OWNER_ID__PHONE_ASC',
  UserByOwnerIdPhoneDesc = 'USER_BY_OWNER_ID__PHONE_DESC',
  UserByOwnerIdAddressAsc = 'USER_BY_OWNER_ID__ADDRESS_ASC',
  UserByOwnerIdAddressDesc = 'USER_BY_OWNER_ID__ADDRESS_DESC',
  UserByOwnerIdSettingsAsc = 'USER_BY_OWNER_ID__SETTINGS_ASC',
  UserByOwnerIdSettingsDesc = 'USER_BY_OWNER_ID__SETTINGS_DESC',
  UserByOwnerIdCreatedAtAsc = 'USER_BY_OWNER_ID__CREATED_AT_ASC',
  UserByOwnerIdCreatedAtDesc = 'USER_BY_OWNER_ID__CREATED_AT_DESC',
  UserByOwnerIdUpdatedAtAsc = 'USER_BY_OWNER_ID__UPDATED_AT_ASC',
  UserByOwnerIdUpdatedAtDesc = 'USER_BY_OWNER_ID__UPDATED_AT_DESC',
  UserByOwnerIdDeletedAsc = 'USER_BY_OWNER_ID__DELETED_ASC',
  UserByOwnerIdDeletedDesc = 'USER_BY_OWNER_ID__DELETED_DESC',
  UserByOwnerIdDeletedAtAsc = 'USER_BY_OWNER_ID__DELETED_AT_ASC',
  UserByOwnerIdDeletedAtDesc = 'USER_BY_OWNER_ID__DELETED_AT_DESC',
  VehicleTypeByVehicleTypeIdIdAsc = 'VEHICLE_TYPE_BY_VEHICLE_TYPE_ID__ID_ASC',
  VehicleTypeByVehicleTypeIdIdDesc = 'VEHICLE_TYPE_BY_VEHICLE_TYPE_ID__ID_DESC',
  VehicleTypeByVehicleTypeIdNameAsc = 'VEHICLE_TYPE_BY_VEHICLE_TYPE_ID__NAME_ASC',
  VehicleTypeByVehicleTypeIdNameDesc = 'VEHICLE_TYPE_BY_VEHICLE_TYPE_ID__NAME_DESC',
  VehicleTypeByVehicleTypeIdWeightAsc = 'VEHICLE_TYPE_BY_VEHICLE_TYPE_ID__WEIGHT_ASC',
  VehicleTypeByVehicleTypeIdWeightDesc = 'VEHICLE_TYPE_BY_VEHICLE_TYPE_ID__WEIGHT_DESC',
  VehicleSizeByVehicleSizeIdIdAsc = 'VEHICLE_SIZE_BY_VEHICLE_SIZE_ID__ID_ASC',
  VehicleSizeByVehicleSizeIdIdDesc = 'VEHICLE_SIZE_BY_VEHICLE_SIZE_ID__ID_DESC',
  VehicleSizeByVehicleSizeIdStatusAsc = 'VEHICLE_SIZE_BY_VEHICLE_SIZE_ID__STATUS_ASC',
  VehicleSizeByVehicleSizeIdStatusDesc = 'VEHICLE_SIZE_BY_VEHICLE_SIZE_ID__STATUS_DESC',
  VehicleSizeByVehicleSizeIdNameAsc = 'VEHICLE_SIZE_BY_VEHICLE_SIZE_ID__NAME_ASC',
  VehicleSizeByVehicleSizeIdNameDesc = 'VEHICLE_SIZE_BY_VEHICLE_SIZE_ID__NAME_DESC',
  VehicleSizeByVehicleSizeIdWeightAsc = 'VEHICLE_SIZE_BY_VEHICLE_SIZE_ID__WEIGHT_ASC',
  VehicleSizeByVehicleSizeIdWeightDesc = 'VEHICLE_SIZE_BY_VEHICLE_SIZE_ID__WEIGHT_DESC',
  VehicleSizeByVehicleSizeIdDescriptionAsc = 'VEHICLE_SIZE_BY_VEHICLE_SIZE_ID__DESCRIPTION_ASC',
  VehicleSizeByVehicleSizeIdDescriptionDesc = 'VEHICLE_SIZE_BY_VEHICLE_SIZE_ID__DESCRIPTION_DESC',
  VehicleSizeByVehicleSizeIdCreatedAtAsc = 'VEHICLE_SIZE_BY_VEHICLE_SIZE_ID__CREATED_AT_ASC',
  VehicleSizeByVehicleSizeIdCreatedAtDesc = 'VEHICLE_SIZE_BY_VEHICLE_SIZE_ID__CREATED_AT_DESC',
  VehicleSizeByVehicleSizeIdUpdatedAtAsc = 'VEHICLE_SIZE_BY_VEHICLE_SIZE_ID__UPDATED_AT_ASC',
  VehicleSizeByVehicleSizeIdUpdatedAtDesc = 'VEHICLE_SIZE_BY_VEHICLE_SIZE_ID__UPDATED_AT_DESC',
}

/** A condition to be used against `Vehicle` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type VehicleCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>
  /** Checks for equality with the object’s `ownerId` field. */
  ownerId?: Maybe<Scalars['UUID']>
  /** Checks for equality with the object’s `name` field. */
  name?: Maybe<Scalars['String']>
  /** Checks for equality with the object’s `licensePlate` field. */
  licensePlate?: Maybe<Scalars['String']>
  /** Checks for equality with the object’s `vehicleTypeId` field. */
  vehicleTypeId?: Maybe<Scalars['UUID']>
  /** Checks for equality with the object’s `vehicleSizeId` field. */
  vehicleSizeId?: Maybe<Scalars['UUID']>
  /** Checks for equality with the object’s `status` field. */
  status?: Maybe<StatusT>
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>
}

/** A filter to be used against `Vehicle` object types. All fields are combined with a logical ‘and.’ */
export type VehicleFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<UuidFilter>
  /** Filter by the object’s `ownerId` field. */
  ownerId?: Maybe<UuidFilter>
  /** Filter by the object’s `name` field. */
  name?: Maybe<StringFilter>
  /** Filter by the object’s `licensePlate` field. */
  licensePlate?: Maybe<StringFilter>
  /** Filter by the object’s `vehicleTypeId` field. */
  vehicleTypeId?: Maybe<UuidFilter>
  /** Filter by the object’s `vehicleSizeId` field. */
  vehicleSizeId?: Maybe<UuidFilter>
  /** Filter by the object’s `status` field. */
  status?: Maybe<StatusTFilter>
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: Maybe<DatetimeFilter>
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<VehicleFilter>>
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<VehicleFilter>>
  /** Negates the expression. */
  not?: Maybe<VehicleFilter>
}

/** A filter to be used against StatusT fields. All fields are combined with a logical ‘and.’ */
export type StatusTFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>
  /** Equal to the specified value. */
  equalTo?: Maybe<StatusT>
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<StatusT>
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<StatusT>
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<StatusT>
  /** Included in the specified list. */
  in?: Maybe<Array<StatusT>>
  /** Not included in the specified list. */
  notIn?: Maybe<Array<StatusT>>
  /** Less than the specified value. */
  lessThan?: Maybe<StatusT>
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<StatusT>
  /** Greater than the specified value. */
  greaterThan?: Maybe<StatusT>
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<StatusT>
}

/** A connection to a list of `Vehicle` values. */
export type VehiclesConnection = {
  /** A list of `Vehicle` objects. */
  nodes: Array<Vehicle>
  /** A list of edges which contains the `Vehicle` and cursor to aid in pagination. */
  edges: Array<VehiclesEdge>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `Vehicle` you could get from the connection. */
  totalCount: Scalars['Int']
}

export type Vehicle = Node & {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']
  id: Scalars['UUID']
  ownerId: Scalars['UUID']
  name: Scalars['String']
  licensePlate?: Maybe<Scalars['String']>
  vehicleTypeId: Scalars['UUID']
  vehicleSizeId: Scalars['UUID']
  status: StatusT
  createdAt: Scalars['Datetime']
  updatedAt?: Maybe<Scalars['Datetime']>
  /** Reads a single `User` that is related to this `Vehicle`. */
  owner?: Maybe<User>
  /** Reads a single `VehicleType` that is related to this `Vehicle`. */
  vehicleType?: Maybe<VehicleType>
  /** Reads a single `VehicleSize` that is related to this `Vehicle`. */
  vehicleSize?: Maybe<VehicleSize>
}

export type VehicleType = Node & {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']
  id: Scalars['UUID']
  name: Scalars['String']
  weight: Scalars['Int']
  /** Reads and enables pagination through a set of `Vehicle`. */
  vehicles: VehiclesConnection
  /** Reads and enables pagination through a set of `Vehicle`. */
  vehiclesList: Array<Vehicle>
  /** Reads and enables pagination through a set of `User`. */
  usersByVehicleVehicleTypeIdAndOwnerId: VehicleTypeUsersByVehicleVehicleTypeIdAndOwnerIdManyToManyConnection
  /** Reads and enables pagination through a set of `User`. */
  usersByVehicleVehicleTypeIdAndOwnerIdList: Array<User>
  /** Reads and enables pagination through a set of `VehicleSize`. */
  vehicleSizesByVehicleVehicleTypeIdAndVehicleSizeId: VehicleTypeVehicleSizesByVehicleVehicleTypeIdAndVehicleSizeIdManyToManyConnection
  /** Reads and enables pagination through a set of `VehicleSize`. */
  vehicleSizesByVehicleVehicleTypeIdAndVehicleSizeIdList: Array<VehicleSize>
}

export type VehicleTypeVehiclesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<VehiclesOrderBy>>
  condition?: Maybe<VehicleCondition>
  filter?: Maybe<VehicleFilter>
}

export type VehicleTypeVehiclesListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<VehiclesOrderBy>>
  condition?: Maybe<VehicleCondition>
  filter?: Maybe<VehicleFilter>
}

export type VehicleTypeUsersByVehicleVehicleTypeIdAndOwnerIdArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<UsersOrderBy>>
  condition?: Maybe<UserCondition>
  filter?: Maybe<UserFilter>
}

export type VehicleTypeUsersByVehicleVehicleTypeIdAndOwnerIdListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<UsersOrderBy>>
  condition?: Maybe<UserCondition>
  filter?: Maybe<UserFilter>
}

export type VehicleTypeVehicleSizesByVehicleVehicleTypeIdAndVehicleSizeIdArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<VehicleSizesOrderBy>>
  condition?: Maybe<VehicleSizeCondition>
  filter?: Maybe<VehicleSizeFilter>
}

export type VehicleTypeVehicleSizesByVehicleVehicleTypeIdAndVehicleSizeIdListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<VehicleSizesOrderBy>>
  condition?: Maybe<VehicleSizeCondition>
  filter?: Maybe<VehicleSizeFilter>
}

/** Methods to use when ordering `User`. */
export enum UsersOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  EmailAsc = 'EMAIL_ASC',
  EmailDesc = 'EMAIL_DESC',
  EmailConfirmedAsc = 'EMAIL_CONFIRMED_ASC',
  EmailConfirmedDesc = 'EMAIL_CONFIRMED_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC',
  RoleAsc = 'ROLE_ASC',
  RoleDesc = 'ROLE_DESC',
  PhotoUrlAsc = 'PHOTO_URL_ASC',
  PhotoUrlDesc = 'PHOTO_URL_DESC',
  PhoneAsc = 'PHONE_ASC',
  PhoneDesc = 'PHONE_DESC',
  AddressAsc = 'ADDRESS_ASC',
  AddressDesc = 'ADDRESS_DESC',
  SettingsAsc = 'SETTINGS_ASC',
  SettingsDesc = 'SETTINGS_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  DeletedAsc = 'DELETED_ASC',
  DeletedDesc = 'DELETED_DESC',
  DeletedAtAsc = 'DELETED_AT_ASC',
  DeletedAtDesc = 'DELETED_AT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  SlotsByOwnerIdCountAsc = 'SLOTS_BY_OWNER_ID__COUNT_ASC',
  SlotsByOwnerIdCountDesc = 'SLOTS_BY_OWNER_ID__COUNT_DESC',
  VehiclesByOwnerIdCountAsc = 'VEHICLES_BY_OWNER_ID__COUNT_ASC',
  VehiclesByOwnerIdCountDesc = 'VEHICLES_BY_OWNER_ID__COUNT_DESC',
  BillingProfilesByUserIdCountAsc = 'BILLING_PROFILES_BY_USER_ID__COUNT_ASC',
  BillingProfilesByUserIdCountDesc = 'BILLING_PROFILES_BY_USER_ID__COUNT_DESC',
  UserSubscriptionsByUserIdCountAsc = 'USER_SUBSCRIPTIONS_BY_USER_ID__COUNT_ASC',
  UserSubscriptionsByUserIdCountDesc = 'USER_SUBSCRIPTIONS_BY_USER_ID__COUNT_DESC',
  ParkingSpacesByOwnerIdCountAsc = 'PARKING_SPACES_BY_OWNER_ID__COUNT_ASC',
  ParkingSpacesByOwnerIdCountDesc = 'PARKING_SPACES_BY_OWNER_ID__COUNT_DESC',
  BusinessesByOwnerIdCountAsc = 'BUSINESSES_BY_OWNER_ID__COUNT_ASC',
  BusinessesByOwnerIdCountDesc = 'BUSINESSES_BY_OWNER_ID__COUNT_DESC',
  PaymentReceiptsByOwnerIdCountAsc = 'PAYMENT_RECEIPTS_BY_OWNER_ID__COUNT_ASC',
  PaymentReceiptsByOwnerIdCountDesc = 'PAYMENT_RECEIPTS_BY_OWNER_ID__COUNT_DESC',
  SlotBookingsByUserIdCountAsc = 'SLOT_BOOKINGS_BY_USER_ID__COUNT_ASC',
  SlotBookingsByUserIdCountDesc = 'SLOT_BOOKINGS_BY_USER_ID__COUNT_DESC',
}

/** A condition to be used against `User` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type UserCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>
  /** Checks for equality with the object’s `name` field. */
  name?: Maybe<Scalars['String']>
  /** Checks for equality with the object’s `email` field. */
  email?: Maybe<Scalars['Email']>
  /** Checks for equality with the object’s `emailConfirmed` field. */
  emailConfirmed?: Maybe<Scalars['Boolean']>
  /** Checks for equality with the object’s `status` field. */
  status?: Maybe<StatusT>
  /** Checks for equality with the object’s `role` field. */
  role?: Maybe<Scalars['String']>
  /** Checks for equality with the object’s `photoUrl` field. */
  photoUrl?: Maybe<Scalars['String']>
  /** Checks for equality with the object’s `phone` field. */
  phone?: Maybe<Scalars['PhoneUs']>
  /** Checks for equality with the object’s `address` field. */
  address?: Maybe<Scalars['JSON']>
  /** Checks for equality with the object’s `settings` field. */
  settings?: Maybe<Scalars['JSON']>
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>
  /** Checks for equality with the object’s `deleted` field. */
  deleted?: Maybe<Scalars['Boolean']>
  /** Checks for equality with the object’s `deletedAt` field. */
  deletedAt?: Maybe<Scalars['Datetime']>
}

/** A filter to be used against `User` object types. All fields are combined with a logical ‘and.’ */
export type UserFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<UuidFilter>
  /** Filter by the object’s `name` field. */
  name?: Maybe<StringFilter>
  /** Filter by the object’s `email` field. */
  email?: Maybe<EmailFilter>
  /** Filter by the object’s `emailConfirmed` field. */
  emailConfirmed?: Maybe<BooleanFilter>
  /** Filter by the object’s `status` field. */
  status?: Maybe<StatusTFilter>
  /** Filter by the object’s `role` field. */
  role?: Maybe<StringFilter>
  /** Filter by the object’s `photoUrl` field. */
  photoUrl?: Maybe<StringFilter>
  /** Filter by the object’s `phone` field. */
  phone?: Maybe<PhoneUsFilter>
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: Maybe<DatetimeFilter>
  /** Filter by the object’s `deleted` field. */
  deleted?: Maybe<BooleanFilter>
  /** Filter by the object’s `deletedAt` field. */
  deletedAt?: Maybe<DatetimeFilter>
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<UserFilter>>
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<UserFilter>>
  /** Negates the expression. */
  not?: Maybe<UserFilter>
}

/** A filter to be used against Email fields. All fields are combined with a logical ‘and.’ */
export type EmailFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>
  /** Equal to the specified value. */
  equalTo?: Maybe<Scalars['Email']>
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Scalars['Email']>
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Scalars['Email']>
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Scalars['Email']>
  /** Included in the specified list. */
  in?: Maybe<Array<Scalars['Email']>>
  /** Not included in the specified list. */
  notIn?: Maybe<Array<Scalars['Email']>>
  /** Less than the specified value. */
  lessThan?: Maybe<Scalars['Email']>
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Scalars['Email']>
  /** Greater than the specified value. */
  greaterThan?: Maybe<Scalars['Email']>
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Scalars['Email']>
  /** Contains the specified string (case-sensitive). */
  includes?: Maybe<Scalars['Email']>
  /** Does not contain the specified string (case-sensitive). */
  notIncludes?: Maybe<Scalars['Email']>
  /** Contains the specified string (case-insensitive). */
  includesInsensitive?: Maybe<Scalars['Email']>
  /** Does not contain the specified string (case-insensitive). */
  notIncludesInsensitive?: Maybe<Scalars['Email']>
  /** Starts with the specified string (case-sensitive). */
  startsWith?: Maybe<Scalars['Email']>
  /** Does not start with the specified string (case-sensitive). */
  notStartsWith?: Maybe<Scalars['Email']>
  /** Starts with the specified string (case-insensitive). */
  startsWithInsensitive?: Maybe<Scalars['Email']>
  /** Does not start with the specified string (case-insensitive). */
  notStartsWithInsensitive?: Maybe<Scalars['Email']>
  /** Ends with the specified string (case-sensitive). */
  endsWith?: Maybe<Scalars['Email']>
  /** Does not end with the specified string (case-sensitive). */
  notEndsWith?: Maybe<Scalars['Email']>
  /** Ends with the specified string (case-insensitive). */
  endsWithInsensitive?: Maybe<Scalars['Email']>
  /** Does not end with the specified string (case-insensitive). */
  notEndsWithInsensitive?: Maybe<Scalars['Email']>
  /** Matches the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  like?: Maybe<Scalars['Email']>
  /** Does not match the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLike?: Maybe<Scalars['Email']>
  /** Matches the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  likeInsensitive?: Maybe<Scalars['Email']>
  /** Does not match the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLikeInsensitive?: Maybe<Scalars['Email']>
  /** Matches the specified pattern using the SQL standard's definition of a regular expression. */
  similarTo?: Maybe<Scalars['Email']>
  /** Does not match the specified pattern using the SQL standard's definition of a regular expression. */
  notSimilarTo?: Maybe<Scalars['Email']>
}

/** A filter to be used against PhoneUs fields. All fields are combined with a logical ‘and.’ */
export type PhoneUsFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>
  /** Equal to the specified value. */
  equalTo?: Maybe<Scalars['PhoneUs']>
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Scalars['PhoneUs']>
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Scalars['PhoneUs']>
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Scalars['PhoneUs']>
  /** Included in the specified list. */
  in?: Maybe<Array<Scalars['PhoneUs']>>
  /** Not included in the specified list. */
  notIn?: Maybe<Array<Scalars['PhoneUs']>>
  /** Less than the specified value. */
  lessThan?: Maybe<Scalars['PhoneUs']>
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Scalars['PhoneUs']>
  /** Greater than the specified value. */
  greaterThan?: Maybe<Scalars['PhoneUs']>
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Scalars['PhoneUs']>
  /** Contains the specified string (case-sensitive). */
  includes?: Maybe<Scalars['PhoneUs']>
  /** Does not contain the specified string (case-sensitive). */
  notIncludes?: Maybe<Scalars['PhoneUs']>
  /** Contains the specified string (case-insensitive). */
  includesInsensitive?: Maybe<Scalars['PhoneUs']>
  /** Does not contain the specified string (case-insensitive). */
  notIncludesInsensitive?: Maybe<Scalars['PhoneUs']>
  /** Starts with the specified string (case-sensitive). */
  startsWith?: Maybe<Scalars['PhoneUs']>
  /** Does not start with the specified string (case-sensitive). */
  notStartsWith?: Maybe<Scalars['PhoneUs']>
  /** Starts with the specified string (case-insensitive). */
  startsWithInsensitive?: Maybe<Scalars['PhoneUs']>
  /** Does not start with the specified string (case-insensitive). */
  notStartsWithInsensitive?: Maybe<Scalars['PhoneUs']>
  /** Ends with the specified string (case-sensitive). */
  endsWith?: Maybe<Scalars['PhoneUs']>
  /** Does not end with the specified string (case-sensitive). */
  notEndsWith?: Maybe<Scalars['PhoneUs']>
  /** Ends with the specified string (case-insensitive). */
  endsWithInsensitive?: Maybe<Scalars['PhoneUs']>
  /** Does not end with the specified string (case-insensitive). */
  notEndsWithInsensitive?: Maybe<Scalars['PhoneUs']>
  /** Matches the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  like?: Maybe<Scalars['PhoneUs']>
  /** Does not match the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLike?: Maybe<Scalars['PhoneUs']>
  /** Matches the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  likeInsensitive?: Maybe<Scalars['PhoneUs']>
  /** Does not match the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLikeInsensitive?: Maybe<Scalars['PhoneUs']>
  /** Matches the specified pattern using the SQL standard's definition of a regular expression. */
  similarTo?: Maybe<Scalars['PhoneUs']>
  /** Does not match the specified pattern using the SQL standard's definition of a regular expression. */
  notSimilarTo?: Maybe<Scalars['PhoneUs']>
}

/** A connection to a list of `User` values, with data from `Vehicle`. */
export type VehicleTypeUsersByVehicleVehicleTypeIdAndOwnerIdManyToManyConnection = {
  /** A list of `User` objects. */
  nodes: Array<User>
  /** A list of edges which contains the `User`, info from the `Vehicle`, and the cursor to aid in pagination. */
  edges: Array<VehicleTypeUsersByVehicleVehicleTypeIdAndOwnerIdManyToManyEdge>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int']
}

/** A `User` edge in the connection, with data from `Vehicle`. */
export type VehicleTypeUsersByVehicleVehicleTypeIdAndOwnerIdManyToManyEdge = {
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `User` at the end of the edge. */
  node: User
  /** Reads and enables pagination through a set of `Vehicle`. */
  vehiclesByOwnerId: VehiclesConnection
  /** Reads and enables pagination through a set of `Vehicle`. */
  vehiclesByOwnerIdList: Array<Vehicle>
}

/** A `User` edge in the connection, with data from `Vehicle`. */
export type VehicleTypeUsersByVehicleVehicleTypeIdAndOwnerIdManyToManyEdgeVehiclesByOwnerIdArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<VehiclesOrderBy>>
  condition?: Maybe<VehicleCondition>
  filter?: Maybe<VehicleFilter>
}

/** A `User` edge in the connection, with data from `Vehicle`. */
export type VehicleTypeUsersByVehicleVehicleTypeIdAndOwnerIdManyToManyEdgeVehiclesByOwnerIdListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<VehiclesOrderBy>>
  condition?: Maybe<VehicleCondition>
  filter?: Maybe<VehicleFilter>
}

/** Methods to use when ordering `VehicleSize`. */
export enum VehicleSizesOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  WeightAsc = 'WEIGHT_ASC',
  WeightDesc = 'WEIGHT_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  SlotsByVehicleSizeIdCountAsc = 'SLOTS_BY_VEHICLE_SIZE_ID__COUNT_ASC',
  SlotsByVehicleSizeIdCountDesc = 'SLOTS_BY_VEHICLE_SIZE_ID__COUNT_DESC',
  VehiclesByVehicleSizeIdCountAsc = 'VEHICLES_BY_VEHICLE_SIZE_ID__COUNT_ASC',
  VehiclesByVehicleSizeIdCountDesc = 'VEHICLES_BY_VEHICLE_SIZE_ID__COUNT_DESC',
}

/** A condition to be used against `VehicleSize` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type VehicleSizeCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>
  /** Checks for equality with the object’s `status` field. */
  status?: Maybe<ContentStatusT>
  /** Checks for equality with the object’s `name` field. */
  name?: Maybe<Scalars['String']>
  /** Checks for equality with the object’s `weight` field. */
  weight?: Maybe<Scalars['Int']>
  /** Checks for equality with the object’s `description` field. */
  description?: Maybe<Scalars['String']>
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>
}

/** A filter to be used against `VehicleSize` object types. All fields are combined with a logical ‘and.’ */
export type VehicleSizeFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<UuidFilter>
  /** Filter by the object’s `status` field. */
  status?: Maybe<ContentStatusTFilter>
  /** Filter by the object’s `name` field. */
  name?: Maybe<StringFilter>
  /** Filter by the object’s `weight` field. */
  weight?: Maybe<IntFilter>
  /** Filter by the object’s `description` field. */
  description?: Maybe<StringFilter>
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: Maybe<DatetimeFilter>
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<VehicleSizeFilter>>
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<VehicleSizeFilter>>
  /** Negates the expression. */
  not?: Maybe<VehicleSizeFilter>
}

/** A connection to a list of `VehicleSize` values, with data from `Vehicle`. */
export type VehicleTypeVehicleSizesByVehicleVehicleTypeIdAndVehicleSizeIdManyToManyConnection = {
  /** A list of `VehicleSize` objects. */
  nodes: Array<VehicleSize>
  /** A list of edges which contains the `VehicleSize`, info from the `Vehicle`, and the cursor to aid in pagination. */
  edges: Array<VehicleTypeVehicleSizesByVehicleVehicleTypeIdAndVehicleSizeIdManyToManyEdge>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `VehicleSize` you could get from the connection. */
  totalCount: Scalars['Int']
}

export type VehicleSize = Node & {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']
  id: Scalars['UUID']
  status: ContentStatusT
  name?: Maybe<Scalars['String']>
  weight: Scalars['Int']
  description?: Maybe<Scalars['String']>
  createdAt: Scalars['Datetime']
  updatedAt?: Maybe<Scalars['Datetime']>
  /** Reads and enables pagination through a set of `Slot`. */
  slots: SlotsConnection
  /** Reads and enables pagination through a set of `Slot`. */
  slotsList: Array<Slot>
  /** Reads and enables pagination through a set of `Vehicle`. */
  vehicles: VehiclesConnection
  /** Reads and enables pagination through a set of `Vehicle`. */
  vehiclesList: Array<Vehicle>
  /** Reads and enables pagination through a set of `User`. */
  usersBySlotVehicleSizeIdAndOwnerId: VehicleSizeUsersBySlotVehicleSizeIdAndOwnerIdManyToManyConnection
  /** Reads and enables pagination through a set of `User`. */
  usersBySlotVehicleSizeIdAndOwnerIdList: Array<User>
  /** Reads and enables pagination through a set of `ParkingSpace`. */
  parkingSpacesBySlotVehicleSizeIdAndParkingSpaceId: VehicleSizeParkingSpacesBySlotVehicleSizeIdAndParkingSpaceIdManyToManyConnection
  /** Reads and enables pagination through a set of `ParkingSpace`. */
  parkingSpacesBySlotVehicleSizeIdAndParkingSpaceIdList: Array<ParkingSpace>
  /** Reads and enables pagination through a set of `GeodataProvider`. */
  geodataProvidersBySlotVehicleSizeIdAndMapSource: VehicleSizeGeodataProvidersBySlotVehicleSizeIdAndMapSourceManyToManyConnection
  /** Reads and enables pagination through a set of `GeodataProvider`. */
  geodataProvidersBySlotVehicleSizeIdAndMapSourceList: Array<GeodataProvider>
  /** Reads and enables pagination through a set of `User`. */
  usersByVehicleVehicleSizeIdAndOwnerId: VehicleSizeUsersByVehicleVehicleSizeIdAndOwnerIdManyToManyConnection
  /** Reads and enables pagination through a set of `User`. */
  usersByVehicleVehicleSizeIdAndOwnerIdList: Array<User>
  /** Reads and enables pagination through a set of `VehicleType`. */
  vehicleTypesByVehicleVehicleSizeIdAndVehicleTypeId: VehicleSizeVehicleTypesByVehicleVehicleSizeIdAndVehicleTypeIdManyToManyConnection
  /** Reads and enables pagination through a set of `VehicleType`. */
  vehicleTypesByVehicleVehicleSizeIdAndVehicleTypeIdList: Array<VehicleType>
}

export type VehicleSizeSlotsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<SlotsOrderBy>>
  condition?: Maybe<SlotCondition>
  filter?: Maybe<SlotFilter>
}

export type VehicleSizeSlotsListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<SlotsOrderBy>>
  condition?: Maybe<SlotCondition>
  filter?: Maybe<SlotFilter>
}

export type VehicleSizeVehiclesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<VehiclesOrderBy>>
  condition?: Maybe<VehicleCondition>
  filter?: Maybe<VehicleFilter>
}

export type VehicleSizeVehiclesListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<VehiclesOrderBy>>
  condition?: Maybe<VehicleCondition>
  filter?: Maybe<VehicleFilter>
}

export type VehicleSizeUsersBySlotVehicleSizeIdAndOwnerIdArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<UsersOrderBy>>
  condition?: Maybe<UserCondition>
  filter?: Maybe<UserFilter>
}

export type VehicleSizeUsersBySlotVehicleSizeIdAndOwnerIdListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<UsersOrderBy>>
  condition?: Maybe<UserCondition>
  filter?: Maybe<UserFilter>
}

export type VehicleSizeParkingSpacesBySlotVehicleSizeIdAndParkingSpaceIdArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<ParkingSpacesOrderBy>>
  condition?: Maybe<ParkingSpaceCondition>
  filter?: Maybe<ParkingSpaceFilter>
}

export type VehicleSizeParkingSpacesBySlotVehicleSizeIdAndParkingSpaceIdListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<ParkingSpacesOrderBy>>
  condition?: Maybe<ParkingSpaceCondition>
  filter?: Maybe<ParkingSpaceFilter>
}

export type VehicleSizeGeodataProvidersBySlotVehicleSizeIdAndMapSourceArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<GeodataProvidersOrderBy>>
  condition?: Maybe<GeodataProviderCondition>
  filter?: Maybe<GeodataProviderFilter>
}

export type VehicleSizeGeodataProvidersBySlotVehicleSizeIdAndMapSourceListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<GeodataProvidersOrderBy>>
  condition?: Maybe<GeodataProviderCondition>
  filter?: Maybe<GeodataProviderFilter>
}

export type VehicleSizeUsersByVehicleVehicleSizeIdAndOwnerIdArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<UsersOrderBy>>
  condition?: Maybe<UserCondition>
  filter?: Maybe<UserFilter>
}

export type VehicleSizeUsersByVehicleVehicleSizeIdAndOwnerIdListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<UsersOrderBy>>
  condition?: Maybe<UserCondition>
  filter?: Maybe<UserFilter>
}

export type VehicleSizeVehicleTypesByVehicleVehicleSizeIdAndVehicleTypeIdArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<VehicleTypesOrderBy>>
  condition?: Maybe<VehicleTypeCondition>
  filter?: Maybe<VehicleTypeFilter>
}

export type VehicleSizeVehicleTypesByVehicleVehicleSizeIdAndVehicleTypeIdListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<VehicleTypesOrderBy>>
  condition?: Maybe<VehicleTypeCondition>
  filter?: Maybe<VehicleTypeFilter>
}

/** A connection to a list of `User` values, with data from `Slot`. */
export type VehicleSizeUsersBySlotVehicleSizeIdAndOwnerIdManyToManyConnection = {
  /** A list of `User` objects. */
  nodes: Array<User>
  /** A list of edges which contains the `User`, info from the `Slot`, and the cursor to aid in pagination. */
  edges: Array<VehicleSizeUsersBySlotVehicleSizeIdAndOwnerIdManyToManyEdge>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int']
}

/** A `User` edge in the connection, with data from `Slot`. */
export type VehicleSizeUsersBySlotVehicleSizeIdAndOwnerIdManyToManyEdge = {
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `User` at the end of the edge. */
  node: User
  /** Reads and enables pagination through a set of `Slot`. */
  slotsByOwnerId: SlotsConnection
  /** Reads and enables pagination through a set of `Slot`. */
  slotsByOwnerIdList: Array<Slot>
}

/** A `User` edge in the connection, with data from `Slot`. */
export type VehicleSizeUsersBySlotVehicleSizeIdAndOwnerIdManyToManyEdgeSlotsByOwnerIdArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<SlotsOrderBy>>
  condition?: Maybe<SlotCondition>
  filter?: Maybe<SlotFilter>
}

/** A `User` edge in the connection, with data from `Slot`. */
export type VehicleSizeUsersBySlotVehicleSizeIdAndOwnerIdManyToManyEdgeSlotsByOwnerIdListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<SlotsOrderBy>>
  condition?: Maybe<SlotCondition>
  filter?: Maybe<SlotFilter>
}

/** Methods to use when ordering `ParkingSpace`. */
export enum ParkingSpacesOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  OwnerIdAsc = 'OWNER_ID_ASC',
  OwnerIdDesc = 'OWNER_ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  PhotoUrlAsc = 'PHOTO_URL_ASC',
  PhotoUrlDesc = 'PHOTO_URL_DESC',
  SettingsAsc = 'SETTINGS_ASC',
  SettingsDesc = 'SETTINGS_DESC',
  AddressAsc = 'ADDRESS_ASC',
  AddressDesc = 'ADDRESS_DESC',
  LocationAsc = 'LOCATION_ASC',
  LocationDesc = 'LOCATION_DESC',
  SlugAsc = 'SLUG_ASC',
  SlugDesc = 'SLUG_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  CarEntryAsc = 'CAR_ENTRY_ASC',
  CarEntryDesc = 'CAR_ENTRY_DESC',
  CarExitAsc = 'CAR_EXIT_ASC',
  CarExitDesc = 'CAR_EXIT_DESC',
  CompanyEntranceAsc = 'COMPANY_ENTRANCE_ASC',
  CompanyEntranceDesc = 'COMPANY_ENTRANCE_DESC',
  ParkingspaceMapviewAsc = 'PARKINGSPACE_MAPVIEW_ASC',
  ParkingspaceMapviewDesc = 'PARKINGSPACE_MAPVIEW_DESC',
  BrandLogoAsc = 'BRAND_LOGO_ASC',
  BrandLogoDesc = 'BRAND_LOGO_DESC',
  WorkingHoursAsc = 'WORKING_HOURS_ASC',
  WorkingHoursDesc = 'WORKING_HOURS_DESC',
  AdvtLinkAsc = 'ADVT_LINK_ASC',
  AdvtLinkDesc = 'ADVT_LINK_DESC',
  BluePrintAsc = 'BLUE_PRINT_ASC',
  BluePrintDesc = 'BLUE_PRINT_DESC',
  HiddenFieldAsc = 'HIDDEN_FIELD_ASC',
  HiddenFieldDesc = 'HIDDEN_FIELD_DESC',
  PedestrianTextAsc = 'PEDESTRIAN_TEXT_ASC',
  PedestrianTextDesc = 'PEDESTRIAN_TEXT_DESC',
  LanguageCodeAsc = 'LANGUAGE_CODE_ASC',
  LanguageCodeDesc = 'LANGUAGE_CODE_DESC',
  ContributorIdAsc = 'CONTRIBUTOR_ID_ASC',
  ContributorIdDesc = 'CONTRIBUTOR_ID_DESC',
  FloorAsc = 'FLOOR_ASC',
  FloorDesc = 'FLOOR_DESC',
  CategoryAsc = 'CATEGORY_ASC',
  CategoryDesc = 'CATEGORY_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC',
  VerificationStatusAsc = 'VERIFICATION_STATUS_ASC',
  VerificationStatusDesc = 'VERIFICATION_STATUS_DESC',
  AccessRestrictionAsc = 'ACCESS_RESTRICTION_ASC',
  AccessRestrictionDesc = 'ACCESS_RESTRICTION_DESC',
  DeletedAsc = 'DELETED_ASC',
  DeletedDesc = 'DELETED_DESC',
  DeletedAtAsc = 'DELETED_AT_ASC',
  DeletedAtDesc = 'DELETED_AT_DESC',
  BusinessStatusReasonAsc = 'BUSINESS_STATUS_REASON_ASC',
  BusinessStatusReasonDesc = 'BUSINESS_STATUS_REASON_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UserByOwnerIdIdAsc = 'USER_BY_OWNER_ID__ID_ASC',
  UserByOwnerIdIdDesc = 'USER_BY_OWNER_ID__ID_DESC',
  UserByOwnerIdNameAsc = 'USER_BY_OWNER_ID__NAME_ASC',
  UserByOwnerIdNameDesc = 'USER_BY_OWNER_ID__NAME_DESC',
  UserByOwnerIdEmailAsc = 'USER_BY_OWNER_ID__EMAIL_ASC',
  UserByOwnerIdEmailDesc = 'USER_BY_OWNER_ID__EMAIL_DESC',
  UserByOwnerIdEmailConfirmedAsc = 'USER_BY_OWNER_ID__EMAIL_CONFIRMED_ASC',
  UserByOwnerIdEmailConfirmedDesc = 'USER_BY_OWNER_ID__EMAIL_CONFIRMED_DESC',
  UserByOwnerIdStatusAsc = 'USER_BY_OWNER_ID__STATUS_ASC',
  UserByOwnerIdStatusDesc = 'USER_BY_OWNER_ID__STATUS_DESC',
  UserByOwnerIdRoleAsc = 'USER_BY_OWNER_ID__ROLE_ASC',
  UserByOwnerIdRoleDesc = 'USER_BY_OWNER_ID__ROLE_DESC',
  UserByOwnerIdPhotoUrlAsc = 'USER_BY_OWNER_ID__PHOTO_URL_ASC',
  UserByOwnerIdPhotoUrlDesc = 'USER_BY_OWNER_ID__PHOTO_URL_DESC',
  UserByOwnerIdPhoneAsc = 'USER_BY_OWNER_ID__PHONE_ASC',
  UserByOwnerIdPhoneDesc = 'USER_BY_OWNER_ID__PHONE_DESC',
  UserByOwnerIdAddressAsc = 'USER_BY_OWNER_ID__ADDRESS_ASC',
  UserByOwnerIdAddressDesc = 'USER_BY_OWNER_ID__ADDRESS_DESC',
  UserByOwnerIdSettingsAsc = 'USER_BY_OWNER_ID__SETTINGS_ASC',
  UserByOwnerIdSettingsDesc = 'USER_BY_OWNER_ID__SETTINGS_DESC',
  UserByOwnerIdCreatedAtAsc = 'USER_BY_OWNER_ID__CREATED_AT_ASC',
  UserByOwnerIdCreatedAtDesc = 'USER_BY_OWNER_ID__CREATED_AT_DESC',
  UserByOwnerIdUpdatedAtAsc = 'USER_BY_OWNER_ID__UPDATED_AT_ASC',
  UserByOwnerIdUpdatedAtDesc = 'USER_BY_OWNER_ID__UPDATED_AT_DESC',
  UserByOwnerIdDeletedAsc = 'USER_BY_OWNER_ID__DELETED_ASC',
  UserByOwnerIdDeletedDesc = 'USER_BY_OWNER_ID__DELETED_DESC',
  UserByOwnerIdDeletedAtAsc = 'USER_BY_OWNER_ID__DELETED_AT_ASC',
  UserByOwnerIdDeletedAtDesc = 'USER_BY_OWNER_ID__DELETED_AT_DESC',
  SlotsByParkingSpaceIdCountAsc = 'SLOTS_BY_PARKING_SPACE_ID__COUNT_ASC',
  SlotsByParkingSpaceIdCountDesc = 'SLOTS_BY_PARKING_SPACE_ID__COUNT_DESC',
  ParkingSpaceAvailabilitiesByParkingSpaceIdCountAsc = 'PARKING_SPACE_AVAILABILITIES_BY_PARKING_SPACE_ID__COUNT_ASC',
  ParkingSpaceAvailabilitiesByParkingSpaceIdCountDesc = 'PARKING_SPACE_AVAILABILITIES_BY_PARKING_SPACE_ID__COUNT_DESC',
}

/** A condition to be used against `ParkingSpace` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type ParkingSpaceCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>
  /** Checks for equality with the object’s `ownerId` field. */
  ownerId?: Maybe<Scalars['UUID']>
  /** Checks for equality with the object’s `name` field. */
  name?: Maybe<Scalars['String']>
  /** Checks for equality with the object’s `description` field. */
  description?: Maybe<Scalars['String']>
  /** Checks for equality with the object’s `photoUrl` field. */
  photoUrl?: Maybe<Scalars['String']>
  /** Checks for equality with the object’s `settings` field. */
  settings?: Maybe<Scalars['JSON']>
  /** Checks for equality with the object’s `address` field. */
  address?: Maybe<Scalars['JSON']>
  /** Checks for equality with the object’s `location` field. */
  location?: Maybe<Scalars['GeoJSON']>
  /** Checks for equality with the object’s `slug` field. */
  slug?: Maybe<Scalars['String']>
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>
  /** Checks for equality with the object’s `carEntry` field. */
  carEntry?: Maybe<Scalars['GeoJSON']>
  /** Checks for equality with the object’s `carExit` field. */
  carExit?: Maybe<Scalars['GeoJSON']>
  /** Checks for equality with the object’s `companyEntrance` field. */
  companyEntrance?: Maybe<Scalars['GeoJSON']>
  /** Checks for equality with the object’s `parkingspaceMapview` field. */
  parkingspaceMapview?: Maybe<Scalars['GeoJSON']>
  /** Checks for equality with the object’s `brandLogo` field. */
  brandLogo?: Maybe<Scalars['String']>
  /** Checks for equality with the object’s `workingHours` field. */
  workingHours?: Maybe<Scalars['JSON']>
  /** Checks for equality with the object’s `advtLink` field. */
  advtLink?: Maybe<Scalars['String']>
  /** Checks for equality with the object’s `bluePrint` field. */
  bluePrint?: Maybe<Scalars['String']>
  /** Checks for equality with the object’s `hiddenField` field. */
  hiddenField?: Maybe<Scalars['String']>
  /** Checks for equality with the object’s `pedestrianText` field. */
  pedestrianText?: Maybe<Scalars['String']>
  /** Checks for equality with the object’s `languageCode` field. */
  languageCode?: Maybe<Scalars['String']>
  /** Checks for equality with the object’s `contributorId` field. */
  contributorId?: Maybe<Scalars['UUID']>
  /** Checks for equality with the object’s `floor` field. */
  floor?: Maybe<Scalars['Int']>
  /** Checks for equality with the object’s `category` field. */
  category?: Maybe<SpaceCategory>
  /** Checks for equality with the object’s `status` field. */
  status?: Maybe<ParkingSpaceStatus>
  /** Checks for equality with the object’s `verificationStatus` field. */
  verificationStatus?: Maybe<SpaceVerificationStatus>
  /** Checks for equality with the object’s `accessRestriction` field. */
  accessRestriction?: Maybe<Array<Maybe<SpaceAccessRestriction>>>
  /** Checks for equality with the object’s `deleted` field. */
  deleted?: Maybe<Scalars['Boolean']>
  /** Checks for equality with the object’s `deletedAt` field. */
  deletedAt?: Maybe<Scalars['Datetime']>
  /** Checks for equality with the object’s `businessStatusReason` field. */
  businessStatusReason?: Maybe<Scalars['String']>
}

/** Allowed values for space_category are: private, public */
export enum SpaceCategory {
  Private = 'PRIVATE',
  Public = 'PUBLIC',
}

/** Allowed statuses are: enabled, disabled, pending */
export enum ParkingSpaceStatus {
  Enabled = 'ENABLED',
  Disabled = 'DISABLED',
  Pending = 'PENDING',
  Unlisted = 'UNLISTED',
  Deleted = 'DELETED',
}

/** Allowed values for space_verification_status are: pending, rejected, verified */
export enum SpaceVerificationStatus {
  Pending = 'PENDING',
  Rejected = 'REJECTED',
  Verified = 'VERIFIED',
}

/** Allowed values for access_restrictions are: none, barrier, keycard, keycode */
export enum SpaceAccessRestriction {
  None = 'NONE',
  Barrier = 'BARRIER',
  Keycard = 'KEYCARD',
  Keycode = 'KEYCODE',
}

/** A filter to be used against `ParkingSpace` object types. All fields are combined with a logical ‘and.’ */
export type ParkingSpaceFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<UuidFilter>
  /** Filter by the object’s `ownerId` field. */
  ownerId?: Maybe<UuidFilter>
  /** Filter by the object’s `name` field. */
  name?: Maybe<StringFilter>
  /** Filter by the object’s `description` field. */
  description?: Maybe<StringFilter>
  /** Filter by the object’s `photoUrl` field. */
  photoUrl?: Maybe<StringFilter>
  /** Filter by the object’s `location` field. */
  location?: Maybe<GeographyPointFilter>
  /** Filter by the object’s `slug` field. */
  slug?: Maybe<StringFilter>
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: Maybe<DatetimeFilter>
  /** Filter by the object’s `carEntry` field. */
  carEntry?: Maybe<GeometryPointFilter>
  /** Filter by the object’s `carExit` field. */
  carExit?: Maybe<GeometryPointFilter>
  /** Filter by the object’s `companyEntrance` field. */
  companyEntrance?: Maybe<GeometryPointFilter>
  /** Filter by the object’s `parkingspaceMapview` field. */
  parkingspaceMapview?: Maybe<GeographyPolygonFilter>
  /** Filter by the object’s `brandLogo` field. */
  brandLogo?: Maybe<StringFilter>
  /** Filter by the object’s `advtLink` field. */
  advtLink?: Maybe<StringFilter>
  /** Filter by the object’s `bluePrint` field. */
  bluePrint?: Maybe<StringFilter>
  /** Filter by the object’s `hiddenField` field. */
  hiddenField?: Maybe<StringFilter>
  /** Filter by the object’s `pedestrianText` field. */
  pedestrianText?: Maybe<StringFilter>
  /** Filter by the object’s `languageCode` field. */
  languageCode?: Maybe<StringFilter>
  /** Filter by the object’s `contributorId` field. */
  contributorId?: Maybe<UuidFilter>
  /** Filter by the object’s `floor` field. */
  floor?: Maybe<IntFilter>
  /** Filter by the object’s `category` field. */
  category?: Maybe<SpaceCategoryFilter>
  /** Filter by the object’s `status` field. */
  status?: Maybe<ParkingSpaceStatusFilter>
  /** Filter by the object’s `verificationStatus` field. */
  verificationStatus?: Maybe<SpaceVerificationStatusFilter>
  /** Filter by the object’s `accessRestriction` field. */
  accessRestriction?: Maybe<SpaceAccessRestrictionListFilter>
  /** Filter by the object’s `deleted` field. */
  deleted?: Maybe<BooleanFilter>
  /** Filter by the object’s `deletedAt` field. */
  deletedAt?: Maybe<DatetimeFilter>
  /** Filter by the object’s `businessStatusReason` field. */
  businessStatusReason?: Maybe<StringFilter>
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<ParkingSpaceFilter>>
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<ParkingSpaceFilter>>
  /** Negates the expression. */
  not?: Maybe<ParkingSpaceFilter>
}

/** A filter to be used against GeographyPoint fields. All fields are combined with a logical ‘and.’ */
export type GeographyPointFilter = {
  /** 2D bounding box intersects the specified geometry's 2D bounding box. */
  bboxIntersects2D?: Maybe<Scalars['GeoJSON']>
  /** No point is outside the specified geometry. */
  coveredBy?: Maybe<Scalars['GeoJSON']>
  /** No point in the specified geometry is outside. */
  covers?: Maybe<Scalars['GeoJSON']>
  /** Coordinates and coordinate order are the same as specified geometry. */
  exactlyEquals?: Maybe<Scalars['GeoJSON']>
  /** They share any portion of space in 2D. */
  intersects?: Maybe<Scalars['GeoJSON']>
}

/** A filter to be used against GeographyPolygon fields. All fields are combined with a logical ‘and.’ */
export type GeographyPolygonFilter = {
  /** 2D bounding box intersects the specified geometry's 2D bounding box. */
  bboxIntersects2D?: Maybe<Scalars['GeoJSON']>
  /** No point is outside the specified geometry. */
  coveredBy?: Maybe<Scalars['GeoJSON']>
  /** No point in the specified geometry is outside. */
  covers?: Maybe<Scalars['GeoJSON']>
  /** Coordinates and coordinate order are the same as specified geometry. */
  exactlyEquals?: Maybe<Scalars['GeoJSON']>
  /** They share any portion of space in 2D. */
  intersects?: Maybe<Scalars['GeoJSON']>
}

/** A filter to be used against SpaceCategory fields. All fields are combined with a logical ‘and.’ */
export type SpaceCategoryFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>
  /** Equal to the specified value. */
  equalTo?: Maybe<SpaceCategory>
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<SpaceCategory>
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<SpaceCategory>
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<SpaceCategory>
  /** Included in the specified list. */
  in?: Maybe<Array<SpaceCategory>>
  /** Not included in the specified list. */
  notIn?: Maybe<Array<SpaceCategory>>
  /** Less than the specified value. */
  lessThan?: Maybe<SpaceCategory>
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<SpaceCategory>
  /** Greater than the specified value. */
  greaterThan?: Maybe<SpaceCategory>
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<SpaceCategory>
}

/** A filter to be used against ParkingSpaceStatus fields. All fields are combined with a logical ‘and.’ */
export type ParkingSpaceStatusFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>
  /** Equal to the specified value. */
  equalTo?: Maybe<ParkingSpaceStatus>
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<ParkingSpaceStatus>
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<ParkingSpaceStatus>
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<ParkingSpaceStatus>
  /** Included in the specified list. */
  in?: Maybe<Array<ParkingSpaceStatus>>
  /** Not included in the specified list. */
  notIn?: Maybe<Array<ParkingSpaceStatus>>
  /** Less than the specified value. */
  lessThan?: Maybe<ParkingSpaceStatus>
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<ParkingSpaceStatus>
  /** Greater than the specified value. */
  greaterThan?: Maybe<ParkingSpaceStatus>
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<ParkingSpaceStatus>
}

/** A filter to be used against SpaceVerificationStatus fields. All fields are combined with a logical ‘and.’ */
export type SpaceVerificationStatusFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>
  /** Equal to the specified value. */
  equalTo?: Maybe<SpaceVerificationStatus>
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<SpaceVerificationStatus>
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<SpaceVerificationStatus>
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<SpaceVerificationStatus>
  /** Included in the specified list. */
  in?: Maybe<Array<SpaceVerificationStatus>>
  /** Not included in the specified list. */
  notIn?: Maybe<Array<SpaceVerificationStatus>>
  /** Less than the specified value. */
  lessThan?: Maybe<SpaceVerificationStatus>
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<SpaceVerificationStatus>
  /** Greater than the specified value. */
  greaterThan?: Maybe<SpaceVerificationStatus>
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<SpaceVerificationStatus>
}

/** A filter to be used against SpaceAccessRestriction List fields. All fields are combined with a logical ‘and.’ */
export type SpaceAccessRestrictionListFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>
  /** Equal to the specified value. */
  equalTo?: Maybe<Array<Maybe<SpaceAccessRestriction>>>
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Array<Maybe<SpaceAccessRestriction>>>
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Array<Maybe<SpaceAccessRestriction>>>
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Array<Maybe<SpaceAccessRestriction>>>
  /** Less than the specified value. */
  lessThan?: Maybe<Array<Maybe<SpaceAccessRestriction>>>
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Array<Maybe<SpaceAccessRestriction>>>
  /** Greater than the specified value. */
  greaterThan?: Maybe<Array<Maybe<SpaceAccessRestriction>>>
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Array<Maybe<SpaceAccessRestriction>>>
  /** Contains the specified list of values. */
  contains?: Maybe<Array<Maybe<SpaceAccessRestriction>>>
  /** Contained by the specified list of values. */
  containedBy?: Maybe<Array<Maybe<SpaceAccessRestriction>>>
  /** Overlaps the specified list of values. */
  overlaps?: Maybe<Array<Maybe<SpaceAccessRestriction>>>
  /** Any array item is equal to the specified value. */
  anyEqualTo?: Maybe<SpaceAccessRestriction>
  /** Any array item is not equal to the specified value. */
  anyNotEqualTo?: Maybe<SpaceAccessRestriction>
  /** Any array item is less than the specified value. */
  anyLessThan?: Maybe<SpaceAccessRestriction>
  /** Any array item is less than or equal to the specified value. */
  anyLessThanOrEqualTo?: Maybe<SpaceAccessRestriction>
  /** Any array item is greater than the specified value. */
  anyGreaterThan?: Maybe<SpaceAccessRestriction>
  /** Any array item is greater than or equal to the specified value. */
  anyGreaterThanOrEqualTo?: Maybe<SpaceAccessRestriction>
}

/** A connection to a list of `ParkingSpace` values, with data from `Slot`. */
export type VehicleSizeParkingSpacesBySlotVehicleSizeIdAndParkingSpaceIdManyToManyConnection = {
  /** A list of `ParkingSpace` objects. */
  nodes: Array<ParkingSpace>
  /** A list of edges which contains the `ParkingSpace`, info from the `Slot`, and the cursor to aid in pagination. */
  edges: Array<VehicleSizeParkingSpacesBySlotVehicleSizeIdAndParkingSpaceIdManyToManyEdge>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `ParkingSpace` you could get from the connection. */
  totalCount: Scalars['Int']
}

export type ParkingSpace = Node & {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']
  id: Scalars['UUID']
  ownerId: Scalars['UUID']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  photoUrl?: Maybe<Scalars['String']>
  settings?: Maybe<Scalars['JSON']>
  address?: Maybe<Scalars['JSON']>
  location?: Maybe<GeographyPoint>
  slug?: Maybe<Scalars['String']>
  createdAt: Scalars['Datetime']
  updatedAt?: Maybe<Scalars['Datetime']>
  carEntry?: Maybe<GeometryPoint>
  carExit?: Maybe<GeometryPoint>
  companyEntrance?: Maybe<GeometryPoint>
  parkingspaceMapview?: Maybe<GeographyPolygon>
  brandLogo?: Maybe<Scalars['String']>
  workingHours?: Maybe<Scalars['JSON']>
  advtLink?: Maybe<Scalars['String']>
  bluePrint?: Maybe<Scalars['String']>
  hiddenField?: Maybe<Scalars['String']>
  pedestrianText?: Maybe<Scalars['String']>
  languageCode?: Maybe<Scalars['String']>
  contributorId?: Maybe<Scalars['UUID']>
  floor?: Maybe<Scalars['Int']>
  category?: Maybe<SpaceCategory>
  status?: Maybe<ParkingSpaceStatus>
  verificationStatus?: Maybe<SpaceVerificationStatus>
  accessRestriction?: Maybe<Array<Maybe<SpaceAccessRestriction>>>
  deleted: Scalars['Boolean']
  deletedAt?: Maybe<Scalars['Datetime']>
  businessStatusReason?: Maybe<Scalars['String']>
  /** Reads a single `User` that is related to this `ParkingSpace`. */
  owner?: Maybe<User>
  /** Reads and enables pagination through a set of `Slot`. */
  slots: SlotsConnection
  /** Reads and enables pagination through a set of `Slot`. */
  slotsList: Array<Slot>
  /** Reads and enables pagination through a set of `ParkingSpaceAvailability`. */
  parkingSpaceAvailabilities: ParkingSpaceAvailabilitiesConnection
  /** Reads and enables pagination through a set of `ParkingSpaceAvailability`. */
  parkingSpaceAvailabilitiesList: Array<ParkingSpaceAvailability>
  /** Reads and enables pagination through a set of `User`. */
  usersBySlotParkingSpaceIdAndOwnerId: ParkingSpaceUsersBySlotParkingSpaceIdAndOwnerIdManyToManyConnection
  /** Reads and enables pagination through a set of `User`. */
  usersBySlotParkingSpaceIdAndOwnerIdList: Array<User>
  /** Reads and enables pagination through a set of `VehicleSize`. */
  vehicleSizesBySlotParkingSpaceIdAndVehicleSizeId: ParkingSpaceVehicleSizesBySlotParkingSpaceIdAndVehicleSizeIdManyToManyConnection
  /** Reads and enables pagination through a set of `VehicleSize`. */
  vehicleSizesBySlotParkingSpaceIdAndVehicleSizeIdList: Array<VehicleSize>
  /** Reads and enables pagination through a set of `GeodataProvider`. */
  geodataProvidersBySlotParkingSpaceIdAndMapSource: ParkingSpaceGeodataProvidersBySlotParkingSpaceIdAndMapSourceManyToManyConnection
  /** Reads and enables pagination through a set of `GeodataProvider`. */
  geodataProvidersBySlotParkingSpaceIdAndMapSourceList: Array<GeodataProvider>
}

export type ParkingSpaceSlotsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<SlotsOrderBy>>
  condition?: Maybe<SlotCondition>
  filter?: Maybe<SlotFilter>
}

export type ParkingSpaceSlotsListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<SlotsOrderBy>>
  condition?: Maybe<SlotCondition>
  filter?: Maybe<SlotFilter>
}

export type ParkingSpaceParkingSpaceAvailabilitiesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<ParkingSpaceAvailabilitiesOrderBy>>
  condition?: Maybe<ParkingSpaceAvailabilityCondition>
  filter?: Maybe<ParkingSpaceAvailabilityFilter>
}

export type ParkingSpaceParkingSpaceAvailabilitiesListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<ParkingSpaceAvailabilitiesOrderBy>>
  condition?: Maybe<ParkingSpaceAvailabilityCondition>
  filter?: Maybe<ParkingSpaceAvailabilityFilter>
}

export type ParkingSpaceUsersBySlotParkingSpaceIdAndOwnerIdArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<UsersOrderBy>>
  condition?: Maybe<UserCondition>
  filter?: Maybe<UserFilter>
}

export type ParkingSpaceUsersBySlotParkingSpaceIdAndOwnerIdListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<UsersOrderBy>>
  condition?: Maybe<UserCondition>
  filter?: Maybe<UserFilter>
}

export type ParkingSpaceVehicleSizesBySlotParkingSpaceIdAndVehicleSizeIdArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<VehicleSizesOrderBy>>
  condition?: Maybe<VehicleSizeCondition>
  filter?: Maybe<VehicleSizeFilter>
}

export type ParkingSpaceVehicleSizesBySlotParkingSpaceIdAndVehicleSizeIdListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<VehicleSizesOrderBy>>
  condition?: Maybe<VehicleSizeCondition>
  filter?: Maybe<VehicleSizeFilter>
}

export type ParkingSpaceGeodataProvidersBySlotParkingSpaceIdAndMapSourceArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<GeodataProvidersOrderBy>>
  condition?: Maybe<GeodataProviderCondition>
  filter?: Maybe<GeodataProviderFilter>
}

export type ParkingSpaceGeodataProvidersBySlotParkingSpaceIdAndMapSourceListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<GeodataProvidersOrderBy>>
  condition?: Maybe<GeodataProviderCondition>
  filter?: Maybe<GeodataProviderFilter>
}

export type GeographyPoint = GeographyInterface &
  GeographyGeometry & {
    geojson?: Maybe<Scalars['GeoJSON']>
    srid: Scalars['Int']
    longitude: Scalars['Float']
    latitude: Scalars['Float']
  }

/** All geography types implement this interface */
export type GeographyInterface = {
  /** Converts the object to GeoJSON */
  geojson?: Maybe<Scalars['GeoJSON']>
  /** Spatial reference identifier (SRID) */
  srid: Scalars['Int']
}

/** All geography XY types implement this interface */
export type GeographyGeometry = {
  /** Converts the object to GeoJSON */
  geojson?: Maybe<Scalars['GeoJSON']>
  /** Spatial reference identifier (SRID) */
  srid: Scalars['Int']
}

export type GeographyPolygon = GeographyInterface &
  GeographyGeometry & {
    geojson?: Maybe<Scalars['GeoJSON']>
    srid: Scalars['Int']
    exterior?: Maybe<GeographyLineString>
    interiors?: Maybe<Array<Maybe<GeographyLineString>>>
  }

export type GeographyLineString = GeographyInterface &
  GeographyGeometry & {
    geojson?: Maybe<Scalars['GeoJSON']>
    srid: Scalars['Int']
    points?: Maybe<Array<Maybe<GeographyPoint>>>
  }

/** Methods to use when ordering `ParkingSpaceAvailability`. */
export enum ParkingSpaceAvailabilitiesOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  ParkingSpaceIdAsc = 'PARKING_SPACE_ID_ASC',
  ParkingSpaceIdDesc = 'PARKING_SPACE_ID_DESC',
  FromDateAsc = 'FROM_DATE_ASC',
  FromDateDesc = 'FROM_DATE_DESC',
  ToDateAsc = 'TO_DATE_ASC',
  ToDateDesc = 'TO_DATE_DESC',
  DefaultFlagAsc = 'DEFAULT_FLAG_ASC',
  DefaultFlagDesc = 'DEFAULT_FLAG_DESC',
  ClosedFlagAsc = 'CLOSED_FLAG_ASC',
  ClosedFlagDesc = 'CLOSED_FLAG_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ParkingSpaceByParkingSpaceIdIdAsc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__ID_ASC',
  ParkingSpaceByParkingSpaceIdIdDesc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__ID_DESC',
  ParkingSpaceByParkingSpaceIdOwnerIdAsc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__OWNER_ID_ASC',
  ParkingSpaceByParkingSpaceIdOwnerIdDesc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__OWNER_ID_DESC',
  ParkingSpaceByParkingSpaceIdNameAsc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__NAME_ASC',
  ParkingSpaceByParkingSpaceIdNameDesc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__NAME_DESC',
  ParkingSpaceByParkingSpaceIdDescriptionAsc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__DESCRIPTION_ASC',
  ParkingSpaceByParkingSpaceIdDescriptionDesc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__DESCRIPTION_DESC',
  ParkingSpaceByParkingSpaceIdPhotoUrlAsc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__PHOTO_URL_ASC',
  ParkingSpaceByParkingSpaceIdPhotoUrlDesc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__PHOTO_URL_DESC',
  ParkingSpaceByParkingSpaceIdSettingsAsc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__SETTINGS_ASC',
  ParkingSpaceByParkingSpaceIdSettingsDesc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__SETTINGS_DESC',
  ParkingSpaceByParkingSpaceIdAddressAsc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__ADDRESS_ASC',
  ParkingSpaceByParkingSpaceIdAddressDesc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__ADDRESS_DESC',
  ParkingSpaceByParkingSpaceIdLocationAsc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__LOCATION_ASC',
  ParkingSpaceByParkingSpaceIdLocationDesc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__LOCATION_DESC',
  ParkingSpaceByParkingSpaceIdSlugAsc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__SLUG_ASC',
  ParkingSpaceByParkingSpaceIdSlugDesc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__SLUG_DESC',
  ParkingSpaceByParkingSpaceIdCreatedAtAsc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__CREATED_AT_ASC',
  ParkingSpaceByParkingSpaceIdCreatedAtDesc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__CREATED_AT_DESC',
  ParkingSpaceByParkingSpaceIdUpdatedAtAsc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__UPDATED_AT_ASC',
  ParkingSpaceByParkingSpaceIdUpdatedAtDesc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__UPDATED_AT_DESC',
  ParkingSpaceByParkingSpaceIdCarEntryAsc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__CAR_ENTRY_ASC',
  ParkingSpaceByParkingSpaceIdCarEntryDesc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__CAR_ENTRY_DESC',
  ParkingSpaceByParkingSpaceIdCarExitAsc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__CAR_EXIT_ASC',
  ParkingSpaceByParkingSpaceIdCarExitDesc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__CAR_EXIT_DESC',
  ParkingSpaceByParkingSpaceIdCompanyEntranceAsc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__COMPANY_ENTRANCE_ASC',
  ParkingSpaceByParkingSpaceIdCompanyEntranceDesc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__COMPANY_ENTRANCE_DESC',
  ParkingSpaceByParkingSpaceIdParkingspaceMapviewAsc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__PARKINGSPACE_MAPVIEW_ASC',
  ParkingSpaceByParkingSpaceIdParkingspaceMapviewDesc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__PARKINGSPACE_MAPVIEW_DESC',
  ParkingSpaceByParkingSpaceIdBrandLogoAsc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__BRAND_LOGO_ASC',
  ParkingSpaceByParkingSpaceIdBrandLogoDesc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__BRAND_LOGO_DESC',
  ParkingSpaceByParkingSpaceIdWorkingHoursAsc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__WORKING_HOURS_ASC',
  ParkingSpaceByParkingSpaceIdWorkingHoursDesc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__WORKING_HOURS_DESC',
  ParkingSpaceByParkingSpaceIdAdvtLinkAsc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__ADVT_LINK_ASC',
  ParkingSpaceByParkingSpaceIdAdvtLinkDesc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__ADVT_LINK_DESC',
  ParkingSpaceByParkingSpaceIdBluePrintAsc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__BLUE_PRINT_ASC',
  ParkingSpaceByParkingSpaceIdBluePrintDesc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__BLUE_PRINT_DESC',
  ParkingSpaceByParkingSpaceIdHiddenFieldAsc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__HIDDEN_FIELD_ASC',
  ParkingSpaceByParkingSpaceIdHiddenFieldDesc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__HIDDEN_FIELD_DESC',
  ParkingSpaceByParkingSpaceIdPedestrianTextAsc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__PEDESTRIAN_TEXT_ASC',
  ParkingSpaceByParkingSpaceIdPedestrianTextDesc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__PEDESTRIAN_TEXT_DESC',
  ParkingSpaceByParkingSpaceIdLanguageCodeAsc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__LANGUAGE_CODE_ASC',
  ParkingSpaceByParkingSpaceIdLanguageCodeDesc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__LANGUAGE_CODE_DESC',
  ParkingSpaceByParkingSpaceIdContributorIdAsc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__CONTRIBUTOR_ID_ASC',
  ParkingSpaceByParkingSpaceIdContributorIdDesc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__CONTRIBUTOR_ID_DESC',
  ParkingSpaceByParkingSpaceIdFloorAsc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__FLOOR_ASC',
  ParkingSpaceByParkingSpaceIdFloorDesc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__FLOOR_DESC',
  ParkingSpaceByParkingSpaceIdCategoryAsc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__CATEGORY_ASC',
  ParkingSpaceByParkingSpaceIdCategoryDesc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__CATEGORY_DESC',
  ParkingSpaceByParkingSpaceIdStatusAsc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__STATUS_ASC',
  ParkingSpaceByParkingSpaceIdStatusDesc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__STATUS_DESC',
  ParkingSpaceByParkingSpaceIdVerificationStatusAsc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__VERIFICATION_STATUS_ASC',
  ParkingSpaceByParkingSpaceIdVerificationStatusDesc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__VERIFICATION_STATUS_DESC',
  ParkingSpaceByParkingSpaceIdAccessRestrictionAsc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__ACCESS_RESTRICTION_ASC',
  ParkingSpaceByParkingSpaceIdAccessRestrictionDesc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__ACCESS_RESTRICTION_DESC',
  ParkingSpaceByParkingSpaceIdDeletedAsc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__DELETED_ASC',
  ParkingSpaceByParkingSpaceIdDeletedDesc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__DELETED_DESC',
  ParkingSpaceByParkingSpaceIdDeletedAtAsc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__DELETED_AT_ASC',
  ParkingSpaceByParkingSpaceIdDeletedAtDesc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__DELETED_AT_DESC',
  ParkingSpaceByParkingSpaceIdBusinessStatusReasonAsc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__BUSINESS_STATUS_REASON_ASC',
  ParkingSpaceByParkingSpaceIdBusinessStatusReasonDesc = 'PARKING_SPACE_BY_PARKING_SPACE_ID__BUSINESS_STATUS_REASON_DESC',
  ParkingOpenHoursByParkingSpaceAvailabilityIdCountAsc = 'PARKING_OPEN_HOURS_BY_PARKING_SPACE_AVAILABILITY_ID__COUNT_ASC',
  ParkingOpenHoursByParkingSpaceAvailabilityIdCountDesc = 'PARKING_OPEN_HOURS_BY_PARKING_SPACE_AVAILABILITY_ID__COUNT_DESC',
  ParkingWorkingHoursByParkingSpaceAvailabilityIdCountAsc = 'PARKING_WORKING_HOURS_BY_PARKING_SPACE_AVAILABILITY_ID__COUNT_ASC',
  ParkingWorkingHoursByParkingSpaceAvailabilityIdCountDesc = 'PARKING_WORKING_HOURS_BY_PARKING_SPACE_AVAILABILITY_ID__COUNT_DESC',
}

/** A condition to be used against `ParkingSpaceAvailability` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type ParkingSpaceAvailabilityCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>
  /** Checks for equality with the object’s `parkingSpaceId` field. */
  parkingSpaceId?: Maybe<Scalars['UUID']>
  /** Checks for equality with the object’s `fromDate` field. */
  fromDate?: Maybe<Scalars['Date']>
  /** Checks for equality with the object’s `toDate` field. */
  toDate?: Maybe<Scalars['Date']>
  /** Checks for equality with the object’s `defaultFlag` field. */
  defaultFlag?: Maybe<Scalars['Boolean']>
  /** Checks for equality with the object’s `closedFlag` field. */
  closedFlag?: Maybe<Scalars['Boolean']>
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>
}

/** A filter to be used against `ParkingSpaceAvailability` object types. All fields are combined with a logical ‘and.’ */
export type ParkingSpaceAvailabilityFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<UuidFilter>
  /** Filter by the object’s `parkingSpaceId` field. */
  parkingSpaceId?: Maybe<UuidFilter>
  /** Filter by the object’s `fromDate` field. */
  fromDate?: Maybe<DateFilter>
  /** Filter by the object’s `toDate` field. */
  toDate?: Maybe<DateFilter>
  /** Filter by the object’s `defaultFlag` field. */
  defaultFlag?: Maybe<BooleanFilter>
  /** Filter by the object’s `closedFlag` field. */
  closedFlag?: Maybe<BooleanFilter>
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: Maybe<DatetimeFilter>
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<ParkingSpaceAvailabilityFilter>>
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<ParkingSpaceAvailabilityFilter>>
  /** Negates the expression. */
  not?: Maybe<ParkingSpaceAvailabilityFilter>
}

/** A filter to be used against Date fields. All fields are combined with a logical ‘and.’ */
export type DateFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>
  /** Equal to the specified value. */
  equalTo?: Maybe<Scalars['Date']>
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Scalars['Date']>
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Scalars['Date']>
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Scalars['Date']>
  /** Included in the specified list. */
  in?: Maybe<Array<Scalars['Date']>>
  /** Not included in the specified list. */
  notIn?: Maybe<Array<Scalars['Date']>>
  /** Less than the specified value. */
  lessThan?: Maybe<Scalars['Date']>
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Scalars['Date']>
  /** Greater than the specified value. */
  greaterThan?: Maybe<Scalars['Date']>
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Scalars['Date']>
}

/** A connection to a list of `ParkingSpaceAvailability` values. */
export type ParkingSpaceAvailabilitiesConnection = {
  /** A list of `ParkingSpaceAvailability` objects. */
  nodes: Array<ParkingSpaceAvailability>
  /** A list of edges which contains the `ParkingSpaceAvailability` and cursor to aid in pagination. */
  edges: Array<ParkingSpaceAvailabilitiesEdge>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `ParkingSpaceAvailability` you could get from the connection. */
  totalCount: Scalars['Int']
}

export type ParkingSpaceAvailability = Node & {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']
  id: Scalars['UUID']
  parkingSpaceId: Scalars['UUID']
  fromDate: Scalars['Date']
  toDate: Scalars['Date']
  defaultFlag: Scalars['Boolean']
  closedFlag: Scalars['Boolean']
  createdAt: Scalars['Datetime']
  updatedAt?: Maybe<Scalars['Datetime']>
  /** Reads a single `ParkingSpace` that is related to this `ParkingSpaceAvailability`. */
  parkingSpace?: Maybe<ParkingSpace>
  /** Reads and enables pagination through a set of `ParkingOpenHour`. */
  parkingOpenHours: ParkingOpenHoursConnection
  /** Reads and enables pagination through a set of `ParkingOpenHour`. */
  parkingOpenHoursList: Array<ParkingOpenHour>
  /** Reads and enables pagination through a set of `ParkingWorkingHour`. */
  parkingWorkingHours: ParkingWorkingHoursConnection
  /** Reads and enables pagination through a set of `ParkingWorkingHour`. */
  parkingWorkingHoursList: Array<ParkingWorkingHour>
}

export type ParkingSpaceAvailabilityParkingOpenHoursArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<ParkingOpenHoursOrderBy>>
  condition?: Maybe<ParkingOpenHourCondition>
  filter?: Maybe<ParkingOpenHourFilter>
}

export type ParkingSpaceAvailabilityParkingOpenHoursListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<ParkingOpenHoursOrderBy>>
  condition?: Maybe<ParkingOpenHourCondition>
  filter?: Maybe<ParkingOpenHourFilter>
}

export type ParkingSpaceAvailabilityParkingWorkingHoursArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<ParkingWorkingHoursOrderBy>>
  condition?: Maybe<ParkingWorkingHourCondition>
  filter?: Maybe<ParkingWorkingHourFilter>
}

export type ParkingSpaceAvailabilityParkingWorkingHoursListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<ParkingWorkingHoursOrderBy>>
  condition?: Maybe<ParkingWorkingHourCondition>
  filter?: Maybe<ParkingWorkingHourFilter>
}

/** Methods to use when ordering `ParkingOpenHour`. */
export enum ParkingOpenHoursOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  ParkingSpaceAvailabilityIdAsc = 'PARKING_SPACE_AVAILABILITY_ID_ASC',
  ParkingSpaceAvailabilityIdDesc = 'PARKING_SPACE_AVAILABILITY_ID_DESC',
  DayOfWeekAsc = 'DAY_OF_WEEK_ASC',
  DayOfWeekDesc = 'DAY_OF_WEEK_DESC',
  FromTimeAsc = 'FROM_TIME_ASC',
  FromTimeDesc = 'FROM_TIME_DESC',
  ToTimeAsc = 'TO_TIME_ASC',
  ToTimeDesc = 'TO_TIME_DESC',
  PriceAsc = 'PRICE_ASC',
  PriceDesc = 'PRICE_DESC',
  CurrencyAsc = 'CURRENCY_ASC',
  CurrencyDesc = 'CURRENCY_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ParkingSpaceAvailabilityByParkingSpaceAvailabilityIdIdAsc = 'PARKING_SPACE_AVAILABILITY_BY_PARKING_SPACE_AVAILABILITY_ID__ID_ASC',
  ParkingSpaceAvailabilityByParkingSpaceAvailabilityIdIdDesc = 'PARKING_SPACE_AVAILABILITY_BY_PARKING_SPACE_AVAILABILITY_ID__ID_DESC',
  ParkingSpaceAvailabilityByParkingSpaceAvailabilityIdParkingSpaceIdAsc = 'PARKING_SPACE_AVAILABILITY_BY_PARKING_SPACE_AVAILABILITY_ID__PARKING_SPACE_ID_ASC',
  ParkingSpaceAvailabilityByParkingSpaceAvailabilityIdParkingSpaceIdDesc = 'PARKING_SPACE_AVAILABILITY_BY_PARKING_SPACE_AVAILABILITY_ID__PARKING_SPACE_ID_DESC',
  ParkingSpaceAvailabilityByParkingSpaceAvailabilityIdFromDateAsc = 'PARKING_SPACE_AVAILABILITY_BY_PARKING_SPACE_AVAILABILITY_ID__FROM_DATE_ASC',
  ParkingSpaceAvailabilityByParkingSpaceAvailabilityIdFromDateDesc = 'PARKING_SPACE_AVAILABILITY_BY_PARKING_SPACE_AVAILABILITY_ID__FROM_DATE_DESC',
  ParkingSpaceAvailabilityByParkingSpaceAvailabilityIdToDateAsc = 'PARKING_SPACE_AVAILABILITY_BY_PARKING_SPACE_AVAILABILITY_ID__TO_DATE_ASC',
  ParkingSpaceAvailabilityByParkingSpaceAvailabilityIdToDateDesc = 'PARKING_SPACE_AVAILABILITY_BY_PARKING_SPACE_AVAILABILITY_ID__TO_DATE_DESC',
  ParkingSpaceAvailabilityByParkingSpaceAvailabilityIdDefaultFlagAsc = 'PARKING_SPACE_AVAILABILITY_BY_PARKING_SPACE_AVAILABILITY_ID__DEFAULT_FLAG_ASC',
  ParkingSpaceAvailabilityByParkingSpaceAvailabilityIdDefaultFlagDesc = 'PARKING_SPACE_AVAILABILITY_BY_PARKING_SPACE_AVAILABILITY_ID__DEFAULT_FLAG_DESC',
  ParkingSpaceAvailabilityByParkingSpaceAvailabilityIdClosedFlagAsc = 'PARKING_SPACE_AVAILABILITY_BY_PARKING_SPACE_AVAILABILITY_ID__CLOSED_FLAG_ASC',
  ParkingSpaceAvailabilityByParkingSpaceAvailabilityIdClosedFlagDesc = 'PARKING_SPACE_AVAILABILITY_BY_PARKING_SPACE_AVAILABILITY_ID__CLOSED_FLAG_DESC',
  ParkingSpaceAvailabilityByParkingSpaceAvailabilityIdCreatedAtAsc = 'PARKING_SPACE_AVAILABILITY_BY_PARKING_SPACE_AVAILABILITY_ID__CREATED_AT_ASC',
  ParkingSpaceAvailabilityByParkingSpaceAvailabilityIdCreatedAtDesc = 'PARKING_SPACE_AVAILABILITY_BY_PARKING_SPACE_AVAILABILITY_ID__CREATED_AT_DESC',
  ParkingSpaceAvailabilityByParkingSpaceAvailabilityIdUpdatedAtAsc = 'PARKING_SPACE_AVAILABILITY_BY_PARKING_SPACE_AVAILABILITY_ID__UPDATED_AT_ASC',
  ParkingSpaceAvailabilityByParkingSpaceAvailabilityIdUpdatedAtDesc = 'PARKING_SPACE_AVAILABILITY_BY_PARKING_SPACE_AVAILABILITY_ID__UPDATED_AT_DESC',
}

/** A condition to be used against `ParkingOpenHour` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type ParkingOpenHourCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>
  /** Checks for equality with the object’s `parkingSpaceAvailabilityId` field. */
  parkingSpaceAvailabilityId?: Maybe<Scalars['UUID']>
  /** Checks for equality with the object’s `dayOfWeek` field. */
  dayOfWeek?: Maybe<Scalars['JSON']>
  /** Checks for equality with the object’s `fromTime` field. */
  fromTime?: Maybe<Scalars['Time']>
  /** Checks for equality with the object’s `toTime` field. */
  toTime?: Maybe<Scalars['Time']>
  /** Checks for equality with the object’s `price` field. */
  price?: Maybe<Scalars['Float']>
  /** Checks for equality with the object’s `currency` field. */
  currency?: Maybe<Scalars['String']>
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>
}

/** A filter to be used against `ParkingOpenHour` object types. All fields are combined with a logical ‘and.’ */
export type ParkingOpenHourFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<UuidFilter>
  /** Filter by the object’s `parkingSpaceAvailabilityId` field. */
  parkingSpaceAvailabilityId?: Maybe<UuidFilter>
  /** Filter by the object’s `fromTime` field. */
  fromTime?: Maybe<TimeFilter>
  /** Filter by the object’s `toTime` field. */
  toTime?: Maybe<TimeFilter>
  /** Filter by the object’s `price` field. */
  price?: Maybe<FloatFilter>
  /** Filter by the object’s `currency` field. */
  currency?: Maybe<StringFilter>
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: Maybe<DatetimeFilter>
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<ParkingOpenHourFilter>>
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<ParkingOpenHourFilter>>
  /** Negates the expression. */
  not?: Maybe<ParkingOpenHourFilter>
}

/** A filter to be used against Time fields. All fields are combined with a logical ‘and.’ */
export type TimeFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>
  /** Equal to the specified value. */
  equalTo?: Maybe<Scalars['Time']>
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Scalars['Time']>
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Scalars['Time']>
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Scalars['Time']>
  /** Included in the specified list. */
  in?: Maybe<Array<Scalars['Time']>>
  /** Not included in the specified list. */
  notIn?: Maybe<Array<Scalars['Time']>>
  /** Less than the specified value. */
  lessThan?: Maybe<Scalars['Time']>
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Scalars['Time']>
  /** Greater than the specified value. */
  greaterThan?: Maybe<Scalars['Time']>
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Scalars['Time']>
}

/** A filter to be used against Float fields. All fields are combined with a logical ‘and.’ */
export type FloatFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>
  /** Equal to the specified value. */
  equalTo?: Maybe<Scalars['Float']>
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Scalars['Float']>
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Scalars['Float']>
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Scalars['Float']>
  /** Included in the specified list. */
  in?: Maybe<Array<Scalars['Float']>>
  /** Not included in the specified list. */
  notIn?: Maybe<Array<Scalars['Float']>>
  /** Less than the specified value. */
  lessThan?: Maybe<Scalars['Float']>
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Scalars['Float']>
  /** Greater than the specified value. */
  greaterThan?: Maybe<Scalars['Float']>
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Scalars['Float']>
}

/** A connection to a list of `ParkingOpenHour` values. */
export type ParkingOpenHoursConnection = {
  /** A list of `ParkingOpenHour` objects. */
  nodes: Array<ParkingOpenHour>
  /** A list of edges which contains the `ParkingOpenHour` and cursor to aid in pagination. */
  edges: Array<ParkingOpenHoursEdge>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `ParkingOpenHour` you could get from the connection. */
  totalCount: Scalars['Int']
}

export type ParkingOpenHour = Node & {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']
  id: Scalars['UUID']
  parkingSpaceAvailabilityId: Scalars['UUID']
  dayOfWeek: Scalars['JSON']
  fromTime: Scalars['Time']
  toTime: Scalars['Time']
  price: Scalars['Float']
  currency: Scalars['String']
  createdAt: Scalars['Datetime']
  updatedAt?: Maybe<Scalars['Datetime']>
  /** Reads a single `ParkingSpaceAvailability` that is related to this `ParkingOpenHour`. */
  parkingSpaceAvailability?: Maybe<ParkingSpaceAvailability>
}

/** A `ParkingOpenHour` edge in the connection. */
export type ParkingOpenHoursEdge = {
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `ParkingOpenHour` at the end of the edge. */
  node: ParkingOpenHour
}

/** Methods to use when ordering `ParkingWorkingHour`. */
export enum ParkingWorkingHoursOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  ParkingSpaceAvailabilityIdAsc = 'PARKING_SPACE_AVAILABILITY_ID_ASC',
  ParkingSpaceAvailabilityIdDesc = 'PARKING_SPACE_AVAILABILITY_ID_DESC',
  DayOfWeekAsc = 'DAY_OF_WEEK_ASC',
  DayOfWeekDesc = 'DAY_OF_WEEK_DESC',
  FromTimeAsc = 'FROM_TIME_ASC',
  FromTimeDesc = 'FROM_TIME_DESC',
  ToTimeAsc = 'TO_TIME_ASC',
  ToTimeDesc = 'TO_TIME_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ParkingSpaceAvailabilityByParkingSpaceAvailabilityIdIdAsc = 'PARKING_SPACE_AVAILABILITY_BY_PARKING_SPACE_AVAILABILITY_ID__ID_ASC',
  ParkingSpaceAvailabilityByParkingSpaceAvailabilityIdIdDesc = 'PARKING_SPACE_AVAILABILITY_BY_PARKING_SPACE_AVAILABILITY_ID__ID_DESC',
  ParkingSpaceAvailabilityByParkingSpaceAvailabilityIdParkingSpaceIdAsc = 'PARKING_SPACE_AVAILABILITY_BY_PARKING_SPACE_AVAILABILITY_ID__PARKING_SPACE_ID_ASC',
  ParkingSpaceAvailabilityByParkingSpaceAvailabilityIdParkingSpaceIdDesc = 'PARKING_SPACE_AVAILABILITY_BY_PARKING_SPACE_AVAILABILITY_ID__PARKING_SPACE_ID_DESC',
  ParkingSpaceAvailabilityByParkingSpaceAvailabilityIdFromDateAsc = 'PARKING_SPACE_AVAILABILITY_BY_PARKING_SPACE_AVAILABILITY_ID__FROM_DATE_ASC',
  ParkingSpaceAvailabilityByParkingSpaceAvailabilityIdFromDateDesc = 'PARKING_SPACE_AVAILABILITY_BY_PARKING_SPACE_AVAILABILITY_ID__FROM_DATE_DESC',
  ParkingSpaceAvailabilityByParkingSpaceAvailabilityIdToDateAsc = 'PARKING_SPACE_AVAILABILITY_BY_PARKING_SPACE_AVAILABILITY_ID__TO_DATE_ASC',
  ParkingSpaceAvailabilityByParkingSpaceAvailabilityIdToDateDesc = 'PARKING_SPACE_AVAILABILITY_BY_PARKING_SPACE_AVAILABILITY_ID__TO_DATE_DESC',
  ParkingSpaceAvailabilityByParkingSpaceAvailabilityIdDefaultFlagAsc = 'PARKING_SPACE_AVAILABILITY_BY_PARKING_SPACE_AVAILABILITY_ID__DEFAULT_FLAG_ASC',
  ParkingSpaceAvailabilityByParkingSpaceAvailabilityIdDefaultFlagDesc = 'PARKING_SPACE_AVAILABILITY_BY_PARKING_SPACE_AVAILABILITY_ID__DEFAULT_FLAG_DESC',
  ParkingSpaceAvailabilityByParkingSpaceAvailabilityIdClosedFlagAsc = 'PARKING_SPACE_AVAILABILITY_BY_PARKING_SPACE_AVAILABILITY_ID__CLOSED_FLAG_ASC',
  ParkingSpaceAvailabilityByParkingSpaceAvailabilityIdClosedFlagDesc = 'PARKING_SPACE_AVAILABILITY_BY_PARKING_SPACE_AVAILABILITY_ID__CLOSED_FLAG_DESC',
  ParkingSpaceAvailabilityByParkingSpaceAvailabilityIdCreatedAtAsc = 'PARKING_SPACE_AVAILABILITY_BY_PARKING_SPACE_AVAILABILITY_ID__CREATED_AT_ASC',
  ParkingSpaceAvailabilityByParkingSpaceAvailabilityIdCreatedAtDesc = 'PARKING_SPACE_AVAILABILITY_BY_PARKING_SPACE_AVAILABILITY_ID__CREATED_AT_DESC',
  ParkingSpaceAvailabilityByParkingSpaceAvailabilityIdUpdatedAtAsc = 'PARKING_SPACE_AVAILABILITY_BY_PARKING_SPACE_AVAILABILITY_ID__UPDATED_AT_ASC',
  ParkingSpaceAvailabilityByParkingSpaceAvailabilityIdUpdatedAtDesc = 'PARKING_SPACE_AVAILABILITY_BY_PARKING_SPACE_AVAILABILITY_ID__UPDATED_AT_DESC',
}

/** A condition to be used against `ParkingWorkingHour` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type ParkingWorkingHourCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>
  /** Checks for equality with the object’s `parkingSpaceAvailabilityId` field. */
  parkingSpaceAvailabilityId?: Maybe<Scalars['UUID']>
  /** Checks for equality with the object’s `dayOfWeek` field. */
  dayOfWeek?: Maybe<Scalars['JSON']>
  /** Checks for equality with the object’s `fromTime` field. */
  fromTime?: Maybe<Scalars['Time']>
  /** Checks for equality with the object’s `toTime` field. */
  toTime?: Maybe<Scalars['Time']>
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>
}

/** A filter to be used against `ParkingWorkingHour` object types. All fields are combined with a logical ‘and.’ */
export type ParkingWorkingHourFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<UuidFilter>
  /** Filter by the object’s `parkingSpaceAvailabilityId` field. */
  parkingSpaceAvailabilityId?: Maybe<UuidFilter>
  /** Filter by the object’s `fromTime` field. */
  fromTime?: Maybe<TimeFilter>
  /** Filter by the object’s `toTime` field. */
  toTime?: Maybe<TimeFilter>
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: Maybe<DatetimeFilter>
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<ParkingWorkingHourFilter>>
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<ParkingWorkingHourFilter>>
  /** Negates the expression. */
  not?: Maybe<ParkingWorkingHourFilter>
}

/** A connection to a list of `ParkingWorkingHour` values. */
export type ParkingWorkingHoursConnection = {
  /** A list of `ParkingWorkingHour` objects. */
  nodes: Array<ParkingWorkingHour>
  /** A list of edges which contains the `ParkingWorkingHour` and cursor to aid in pagination. */
  edges: Array<ParkingWorkingHoursEdge>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `ParkingWorkingHour` you could get from the connection. */
  totalCount: Scalars['Int']
}

export type ParkingWorkingHour = Node & {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']
  id: Scalars['UUID']
  parkingSpaceAvailabilityId: Scalars['UUID']
  dayOfWeek: Scalars['JSON']
  fromTime: Scalars['Time']
  toTime: Scalars['Time']
  createdAt: Scalars['Datetime']
  updatedAt?: Maybe<Scalars['Datetime']>
  /** Reads a single `ParkingSpaceAvailability` that is related to this `ParkingWorkingHour`. */
  parkingSpaceAvailability?: Maybe<ParkingSpaceAvailability>
}

/** A `ParkingWorkingHour` edge in the connection. */
export type ParkingWorkingHoursEdge = {
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `ParkingWorkingHour` at the end of the edge. */
  node: ParkingWorkingHour
}

/** A `ParkingSpaceAvailability` edge in the connection. */
export type ParkingSpaceAvailabilitiesEdge = {
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `ParkingSpaceAvailability` at the end of the edge. */
  node: ParkingSpaceAvailability
}

/** A connection to a list of `User` values, with data from `Slot`. */
export type ParkingSpaceUsersBySlotParkingSpaceIdAndOwnerIdManyToManyConnection = {
  /** A list of `User` objects. */
  nodes: Array<User>
  /** A list of edges which contains the `User`, info from the `Slot`, and the cursor to aid in pagination. */
  edges: Array<ParkingSpaceUsersBySlotParkingSpaceIdAndOwnerIdManyToManyEdge>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int']
}

/** A `User` edge in the connection, with data from `Slot`. */
export type ParkingSpaceUsersBySlotParkingSpaceIdAndOwnerIdManyToManyEdge = {
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `User` at the end of the edge. */
  node: User
  /** Reads and enables pagination through a set of `Slot`. */
  slotsByOwnerId: SlotsConnection
  /** Reads and enables pagination through a set of `Slot`. */
  slotsByOwnerIdList: Array<Slot>
}

/** A `User` edge in the connection, with data from `Slot`. */
export type ParkingSpaceUsersBySlotParkingSpaceIdAndOwnerIdManyToManyEdgeSlotsByOwnerIdArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<SlotsOrderBy>>
  condition?: Maybe<SlotCondition>
  filter?: Maybe<SlotFilter>
}

/** A `User` edge in the connection, with data from `Slot`. */
export type ParkingSpaceUsersBySlotParkingSpaceIdAndOwnerIdManyToManyEdgeSlotsByOwnerIdListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<SlotsOrderBy>>
  condition?: Maybe<SlotCondition>
  filter?: Maybe<SlotFilter>
}

/** A connection to a list of `VehicleSize` values, with data from `Slot`. */
export type ParkingSpaceVehicleSizesBySlotParkingSpaceIdAndVehicleSizeIdManyToManyConnection = {
  /** A list of `VehicleSize` objects. */
  nodes: Array<VehicleSize>
  /** A list of edges which contains the `VehicleSize`, info from the `Slot`, and the cursor to aid in pagination. */
  edges: Array<ParkingSpaceVehicleSizesBySlotParkingSpaceIdAndVehicleSizeIdManyToManyEdge>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `VehicleSize` you could get from the connection. */
  totalCount: Scalars['Int']
}

/** A `VehicleSize` edge in the connection, with data from `Slot`. */
export type ParkingSpaceVehicleSizesBySlotParkingSpaceIdAndVehicleSizeIdManyToManyEdge = {
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `VehicleSize` at the end of the edge. */
  node: VehicleSize
  /** Reads and enables pagination through a set of `Slot`. */
  slots: SlotsConnection
  /** Reads and enables pagination through a set of `Slot`. */
  slotsList: Array<Slot>
}

/** A `VehicleSize` edge in the connection, with data from `Slot`. */
export type ParkingSpaceVehicleSizesBySlotParkingSpaceIdAndVehicleSizeIdManyToManyEdgeSlotsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<SlotsOrderBy>>
  condition?: Maybe<SlotCondition>
  filter?: Maybe<SlotFilter>
}

/** A `VehicleSize` edge in the connection, with data from `Slot`. */
export type ParkingSpaceVehicleSizesBySlotParkingSpaceIdAndVehicleSizeIdManyToManyEdgeSlotsListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<SlotsOrderBy>>
  condition?: Maybe<SlotCondition>
  filter?: Maybe<SlotFilter>
}

/** Methods to use when ordering `GeodataProvider`. */
export enum GeodataProvidersOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  SlotsByMapSourceCountAsc = 'SLOTS_BY_MAP_SOURCE__COUNT_ASC',
  SlotsByMapSourceCountDesc = 'SLOTS_BY_MAP_SOURCE__COUNT_DESC',
}

/** A condition to be used against `GeodataProvider` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type GeodataProviderCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>
  /** Checks for equality with the object’s `name` field. */
  name?: Maybe<Scalars['String']>
  /** Checks for equality with the object’s `status` field. */
  status?: Maybe<StatusT>
}

/** A filter to be used against `GeodataProvider` object types. All fields are combined with a logical ‘and.’ */
export type GeodataProviderFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<UuidFilter>
  /** Filter by the object’s `name` field. */
  name?: Maybe<StringFilter>
  /** Filter by the object’s `status` field. */
  status?: Maybe<StatusTFilter>
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<GeodataProviderFilter>>
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<GeodataProviderFilter>>
  /** Negates the expression. */
  not?: Maybe<GeodataProviderFilter>
}

/** A connection to a list of `GeodataProvider` values, with data from `Slot`. */
export type ParkingSpaceGeodataProvidersBySlotParkingSpaceIdAndMapSourceManyToManyConnection = {
  /** A list of `GeodataProvider` objects. */
  nodes: Array<GeodataProvider>
  /** A list of edges which contains the `GeodataProvider`, info from the `Slot`, and the cursor to aid in pagination. */
  edges: Array<ParkingSpaceGeodataProvidersBySlotParkingSpaceIdAndMapSourceManyToManyEdge>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `GeodataProvider` you could get from the connection. */
  totalCount: Scalars['Int']
}

export type GeodataProvider = Node & {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']
  id: Scalars['UUID']
  name: Scalars['String']
  status: StatusT
  /** Reads and enables pagination through a set of `Slot`. */
  slotsByMapSource: SlotsConnection
  /** Reads and enables pagination through a set of `Slot`. */
  slotsByMapSourceList: Array<Slot>
  /** Reads and enables pagination through a set of `User`. */
  usersBySlotMapSourceAndOwnerId: GeodataProviderUsersBySlotMapSourceAndOwnerIdManyToManyConnection
  /** Reads and enables pagination through a set of `User`. */
  usersBySlotMapSourceAndOwnerIdList: Array<User>
  /** Reads and enables pagination through a set of `VehicleSize`. */
  vehicleSizesBySlotMapSourceAndVehicleSizeId: GeodataProviderVehicleSizesBySlotMapSourceAndVehicleSizeIdManyToManyConnection
  /** Reads and enables pagination through a set of `VehicleSize`. */
  vehicleSizesBySlotMapSourceAndVehicleSizeIdList: Array<VehicleSize>
  /** Reads and enables pagination through a set of `ParkingSpace`. */
  parkingSpacesBySlotMapSourceAndParkingSpaceId: GeodataProviderParkingSpacesBySlotMapSourceAndParkingSpaceIdManyToManyConnection
  /** Reads and enables pagination through a set of `ParkingSpace`. */
  parkingSpacesBySlotMapSourceAndParkingSpaceIdList: Array<ParkingSpace>
}

export type GeodataProviderSlotsByMapSourceArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<SlotsOrderBy>>
  condition?: Maybe<SlotCondition>
  filter?: Maybe<SlotFilter>
}

export type GeodataProviderSlotsByMapSourceListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<SlotsOrderBy>>
  condition?: Maybe<SlotCondition>
  filter?: Maybe<SlotFilter>
}

export type GeodataProviderUsersBySlotMapSourceAndOwnerIdArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<UsersOrderBy>>
  condition?: Maybe<UserCondition>
  filter?: Maybe<UserFilter>
}

export type GeodataProviderUsersBySlotMapSourceAndOwnerIdListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<UsersOrderBy>>
  condition?: Maybe<UserCondition>
  filter?: Maybe<UserFilter>
}

export type GeodataProviderVehicleSizesBySlotMapSourceAndVehicleSizeIdArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<VehicleSizesOrderBy>>
  condition?: Maybe<VehicleSizeCondition>
  filter?: Maybe<VehicleSizeFilter>
}

export type GeodataProviderVehicleSizesBySlotMapSourceAndVehicleSizeIdListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<VehicleSizesOrderBy>>
  condition?: Maybe<VehicleSizeCondition>
  filter?: Maybe<VehicleSizeFilter>
}

export type GeodataProviderParkingSpacesBySlotMapSourceAndParkingSpaceIdArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<ParkingSpacesOrderBy>>
  condition?: Maybe<ParkingSpaceCondition>
  filter?: Maybe<ParkingSpaceFilter>
}

export type GeodataProviderParkingSpacesBySlotMapSourceAndParkingSpaceIdListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<ParkingSpacesOrderBy>>
  condition?: Maybe<ParkingSpaceCondition>
  filter?: Maybe<ParkingSpaceFilter>
}

/** A connection to a list of `User` values, with data from `Slot`. */
export type GeodataProviderUsersBySlotMapSourceAndOwnerIdManyToManyConnection = {
  /** A list of `User` objects. */
  nodes: Array<User>
  /** A list of edges which contains the `User`, info from the `Slot`, and the cursor to aid in pagination. */
  edges: Array<GeodataProviderUsersBySlotMapSourceAndOwnerIdManyToManyEdge>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int']
}

/** A `User` edge in the connection, with data from `Slot`. */
export type GeodataProviderUsersBySlotMapSourceAndOwnerIdManyToManyEdge = {
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `User` at the end of the edge. */
  node: User
  /** Reads and enables pagination through a set of `Slot`. */
  slotsByOwnerId: SlotsConnection
  /** Reads and enables pagination through a set of `Slot`. */
  slotsByOwnerIdList: Array<Slot>
}

/** A `User` edge in the connection, with data from `Slot`. */
export type GeodataProviderUsersBySlotMapSourceAndOwnerIdManyToManyEdgeSlotsByOwnerIdArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<SlotsOrderBy>>
  condition?: Maybe<SlotCondition>
  filter?: Maybe<SlotFilter>
}

/** A `User` edge in the connection, with data from `Slot`. */
export type GeodataProviderUsersBySlotMapSourceAndOwnerIdManyToManyEdgeSlotsByOwnerIdListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<SlotsOrderBy>>
  condition?: Maybe<SlotCondition>
  filter?: Maybe<SlotFilter>
}

/** A connection to a list of `VehicleSize` values, with data from `Slot`. */
export type GeodataProviderVehicleSizesBySlotMapSourceAndVehicleSizeIdManyToManyConnection = {
  /** A list of `VehicleSize` objects. */
  nodes: Array<VehicleSize>
  /** A list of edges which contains the `VehicleSize`, info from the `Slot`, and the cursor to aid in pagination. */
  edges: Array<GeodataProviderVehicleSizesBySlotMapSourceAndVehicleSizeIdManyToManyEdge>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `VehicleSize` you could get from the connection. */
  totalCount: Scalars['Int']
}

/** A `VehicleSize` edge in the connection, with data from `Slot`. */
export type GeodataProviderVehicleSizesBySlotMapSourceAndVehicleSizeIdManyToManyEdge = {
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `VehicleSize` at the end of the edge. */
  node: VehicleSize
  /** Reads and enables pagination through a set of `Slot`. */
  slots: SlotsConnection
  /** Reads and enables pagination through a set of `Slot`. */
  slotsList: Array<Slot>
}

/** A `VehicleSize` edge in the connection, with data from `Slot`. */
export type GeodataProviderVehicleSizesBySlotMapSourceAndVehicleSizeIdManyToManyEdgeSlotsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<SlotsOrderBy>>
  condition?: Maybe<SlotCondition>
  filter?: Maybe<SlotFilter>
}

/** A `VehicleSize` edge in the connection, with data from `Slot`. */
export type GeodataProviderVehicleSizesBySlotMapSourceAndVehicleSizeIdManyToManyEdgeSlotsListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<SlotsOrderBy>>
  condition?: Maybe<SlotCondition>
  filter?: Maybe<SlotFilter>
}

/** A connection to a list of `ParkingSpace` values, with data from `Slot`. */
export type GeodataProviderParkingSpacesBySlotMapSourceAndParkingSpaceIdManyToManyConnection = {
  /** A list of `ParkingSpace` objects. */
  nodes: Array<ParkingSpace>
  /** A list of edges which contains the `ParkingSpace`, info from the `Slot`, and the cursor to aid in pagination. */
  edges: Array<GeodataProviderParkingSpacesBySlotMapSourceAndParkingSpaceIdManyToManyEdge>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `ParkingSpace` you could get from the connection. */
  totalCount: Scalars['Int']
}

/** A `ParkingSpace` edge in the connection, with data from `Slot`. */
export type GeodataProviderParkingSpacesBySlotMapSourceAndParkingSpaceIdManyToManyEdge = {
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `ParkingSpace` at the end of the edge. */
  node: ParkingSpace
  /** Reads and enables pagination through a set of `Slot`. */
  slots: SlotsConnection
  /** Reads and enables pagination through a set of `Slot`. */
  slotsList: Array<Slot>
}

/** A `ParkingSpace` edge in the connection, with data from `Slot`. */
export type GeodataProviderParkingSpacesBySlotMapSourceAndParkingSpaceIdManyToManyEdgeSlotsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<SlotsOrderBy>>
  condition?: Maybe<SlotCondition>
  filter?: Maybe<SlotFilter>
}

/** A `ParkingSpace` edge in the connection, with data from `Slot`. */
export type GeodataProviderParkingSpacesBySlotMapSourceAndParkingSpaceIdManyToManyEdgeSlotsListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<SlotsOrderBy>>
  condition?: Maybe<SlotCondition>
  filter?: Maybe<SlotFilter>
}

/** A `GeodataProvider` edge in the connection, with data from `Slot`. */
export type ParkingSpaceGeodataProvidersBySlotParkingSpaceIdAndMapSourceManyToManyEdge = {
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `GeodataProvider` at the end of the edge. */
  node: GeodataProvider
  /** Reads and enables pagination through a set of `Slot`. */
  slotsByMapSource: SlotsConnection
  /** Reads and enables pagination through a set of `Slot`. */
  slotsByMapSourceList: Array<Slot>
}

/** A `GeodataProvider` edge in the connection, with data from `Slot`. */
export type ParkingSpaceGeodataProvidersBySlotParkingSpaceIdAndMapSourceManyToManyEdgeSlotsByMapSourceArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<SlotsOrderBy>>
  condition?: Maybe<SlotCondition>
  filter?: Maybe<SlotFilter>
}

/** A `GeodataProvider` edge in the connection, with data from `Slot`. */
export type ParkingSpaceGeodataProvidersBySlotParkingSpaceIdAndMapSourceManyToManyEdgeSlotsByMapSourceListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<SlotsOrderBy>>
  condition?: Maybe<SlotCondition>
  filter?: Maybe<SlotFilter>
}

/** A `ParkingSpace` edge in the connection, with data from `Slot`. */
export type VehicleSizeParkingSpacesBySlotVehicleSizeIdAndParkingSpaceIdManyToManyEdge = {
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `ParkingSpace` at the end of the edge. */
  node: ParkingSpace
  /** Reads and enables pagination through a set of `Slot`. */
  slots: SlotsConnection
  /** Reads and enables pagination through a set of `Slot`. */
  slotsList: Array<Slot>
}

/** A `ParkingSpace` edge in the connection, with data from `Slot`. */
export type VehicleSizeParkingSpacesBySlotVehicleSizeIdAndParkingSpaceIdManyToManyEdgeSlotsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<SlotsOrderBy>>
  condition?: Maybe<SlotCondition>
  filter?: Maybe<SlotFilter>
}

/** A `ParkingSpace` edge in the connection, with data from `Slot`. */
export type VehicleSizeParkingSpacesBySlotVehicleSizeIdAndParkingSpaceIdManyToManyEdgeSlotsListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<SlotsOrderBy>>
  condition?: Maybe<SlotCondition>
  filter?: Maybe<SlotFilter>
}

/** A connection to a list of `GeodataProvider` values, with data from `Slot`. */
export type VehicleSizeGeodataProvidersBySlotVehicleSizeIdAndMapSourceManyToManyConnection = {
  /** A list of `GeodataProvider` objects. */
  nodes: Array<GeodataProvider>
  /** A list of edges which contains the `GeodataProvider`, info from the `Slot`, and the cursor to aid in pagination. */
  edges: Array<VehicleSizeGeodataProvidersBySlotVehicleSizeIdAndMapSourceManyToManyEdge>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `GeodataProvider` you could get from the connection. */
  totalCount: Scalars['Int']
}

/** A `GeodataProvider` edge in the connection, with data from `Slot`. */
export type VehicleSizeGeodataProvidersBySlotVehicleSizeIdAndMapSourceManyToManyEdge = {
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `GeodataProvider` at the end of the edge. */
  node: GeodataProvider
  /** Reads and enables pagination through a set of `Slot`. */
  slotsByMapSource: SlotsConnection
  /** Reads and enables pagination through a set of `Slot`. */
  slotsByMapSourceList: Array<Slot>
}

/** A `GeodataProvider` edge in the connection, with data from `Slot`. */
export type VehicleSizeGeodataProvidersBySlotVehicleSizeIdAndMapSourceManyToManyEdgeSlotsByMapSourceArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<SlotsOrderBy>>
  condition?: Maybe<SlotCondition>
  filter?: Maybe<SlotFilter>
}

/** A `GeodataProvider` edge in the connection, with data from `Slot`. */
export type VehicleSizeGeodataProvidersBySlotVehicleSizeIdAndMapSourceManyToManyEdgeSlotsByMapSourceListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<SlotsOrderBy>>
  condition?: Maybe<SlotCondition>
  filter?: Maybe<SlotFilter>
}

/** A connection to a list of `User` values, with data from `Vehicle`. */
export type VehicleSizeUsersByVehicleVehicleSizeIdAndOwnerIdManyToManyConnection = {
  /** A list of `User` objects. */
  nodes: Array<User>
  /** A list of edges which contains the `User`, info from the `Vehicle`, and the cursor to aid in pagination. */
  edges: Array<VehicleSizeUsersByVehicleVehicleSizeIdAndOwnerIdManyToManyEdge>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int']
}

/** A `User` edge in the connection, with data from `Vehicle`. */
export type VehicleSizeUsersByVehicleVehicleSizeIdAndOwnerIdManyToManyEdge = {
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `User` at the end of the edge. */
  node: User
  /** Reads and enables pagination through a set of `Vehicle`. */
  vehiclesByOwnerId: VehiclesConnection
  /** Reads and enables pagination through a set of `Vehicle`. */
  vehiclesByOwnerIdList: Array<Vehicle>
}

/** A `User` edge in the connection, with data from `Vehicle`. */
export type VehicleSizeUsersByVehicleVehicleSizeIdAndOwnerIdManyToManyEdgeVehiclesByOwnerIdArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<VehiclesOrderBy>>
  condition?: Maybe<VehicleCondition>
  filter?: Maybe<VehicleFilter>
}

/** A `User` edge in the connection, with data from `Vehicle`. */
export type VehicleSizeUsersByVehicleVehicleSizeIdAndOwnerIdManyToManyEdgeVehiclesByOwnerIdListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<VehiclesOrderBy>>
  condition?: Maybe<VehicleCondition>
  filter?: Maybe<VehicleFilter>
}

/** Methods to use when ordering `VehicleType`. */
export enum VehicleTypesOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  WeightAsc = 'WEIGHT_ASC',
  WeightDesc = 'WEIGHT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  VehiclesByVehicleTypeIdCountAsc = 'VEHICLES_BY_VEHICLE_TYPE_ID__COUNT_ASC',
  VehiclesByVehicleTypeIdCountDesc = 'VEHICLES_BY_VEHICLE_TYPE_ID__COUNT_DESC',
}

/** A condition to be used against `VehicleType` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type VehicleTypeCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>
  /** Checks for equality with the object’s `name` field. */
  name?: Maybe<Scalars['String']>
  /** Checks for equality with the object’s `weight` field. */
  weight?: Maybe<Scalars['Int']>
}

/** A filter to be used against `VehicleType` object types. All fields are combined with a logical ‘and.’ */
export type VehicleTypeFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<UuidFilter>
  /** Filter by the object’s `name` field. */
  name?: Maybe<StringFilter>
  /** Filter by the object’s `weight` field. */
  weight?: Maybe<IntFilter>
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<VehicleTypeFilter>>
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<VehicleTypeFilter>>
  /** Negates the expression. */
  not?: Maybe<VehicleTypeFilter>
}

/** A connection to a list of `VehicleType` values, with data from `Vehicle`. */
export type VehicleSizeVehicleTypesByVehicleVehicleSizeIdAndVehicleTypeIdManyToManyConnection = {
  /** A list of `VehicleType` objects. */
  nodes: Array<VehicleType>
  /** A list of edges which contains the `VehicleType`, info from the `Vehicle`, and the cursor to aid in pagination. */
  edges: Array<VehicleSizeVehicleTypesByVehicleVehicleSizeIdAndVehicleTypeIdManyToManyEdge>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `VehicleType` you could get from the connection. */
  totalCount: Scalars['Int']
}

/** A `VehicleType` edge in the connection, with data from `Vehicle`. */
export type VehicleSizeVehicleTypesByVehicleVehicleSizeIdAndVehicleTypeIdManyToManyEdge = {
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `VehicleType` at the end of the edge. */
  node: VehicleType
  /** Reads and enables pagination through a set of `Vehicle`. */
  vehicles: VehiclesConnection
  /** Reads and enables pagination through a set of `Vehicle`. */
  vehiclesList: Array<Vehicle>
}

/** A `VehicleType` edge in the connection, with data from `Vehicle`. */
export type VehicleSizeVehicleTypesByVehicleVehicleSizeIdAndVehicleTypeIdManyToManyEdgeVehiclesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<VehiclesOrderBy>>
  condition?: Maybe<VehicleCondition>
  filter?: Maybe<VehicleFilter>
}

/** A `VehicleType` edge in the connection, with data from `Vehicle`. */
export type VehicleSizeVehicleTypesByVehicleVehicleSizeIdAndVehicleTypeIdManyToManyEdgeVehiclesListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<VehiclesOrderBy>>
  condition?: Maybe<VehicleCondition>
  filter?: Maybe<VehicleFilter>
}

/** A `VehicleSize` edge in the connection, with data from `Vehicle`. */
export type VehicleTypeVehicleSizesByVehicleVehicleTypeIdAndVehicleSizeIdManyToManyEdge = {
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `VehicleSize` at the end of the edge. */
  node: VehicleSize
  /** Reads and enables pagination through a set of `Vehicle`. */
  vehicles: VehiclesConnection
  /** Reads and enables pagination through a set of `Vehicle`. */
  vehiclesList: Array<Vehicle>
}

/** A `VehicleSize` edge in the connection, with data from `Vehicle`. */
export type VehicleTypeVehicleSizesByVehicleVehicleTypeIdAndVehicleSizeIdManyToManyEdgeVehiclesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<VehiclesOrderBy>>
  condition?: Maybe<VehicleCondition>
  filter?: Maybe<VehicleFilter>
}

/** A `VehicleSize` edge in the connection, with data from `Vehicle`. */
export type VehicleTypeVehicleSizesByVehicleVehicleTypeIdAndVehicleSizeIdManyToManyEdgeVehiclesListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<VehiclesOrderBy>>
  condition?: Maybe<VehicleCondition>
  filter?: Maybe<VehicleFilter>
}

/** A `Vehicle` edge in the connection. */
export type VehiclesEdge = {
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `Vehicle` at the end of the edge. */
  node: Vehicle
}

/** Methods to use when ordering `BillingProfile`. */
export enum BillingProfilesOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC',
  CustomerIdAsc = 'CUSTOMER_ID_ASC',
  CustomerIdDesc = 'CUSTOMER_ID_DESC',
  CustomerObjAsc = 'CUSTOMER_OBJ_ASC',
  CustomerObjDesc = 'CUSTOMER_OBJ_DESC',
  BillingDetailsAsc = 'BILLING_DETAILS_ASC',
  BillingDetailsDesc = 'BILLING_DETAILS_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UserByUserIdIdAsc = 'USER_BY_USER_ID__ID_ASC',
  UserByUserIdIdDesc = 'USER_BY_USER_ID__ID_DESC',
  UserByUserIdNameAsc = 'USER_BY_USER_ID__NAME_ASC',
  UserByUserIdNameDesc = 'USER_BY_USER_ID__NAME_DESC',
  UserByUserIdEmailAsc = 'USER_BY_USER_ID__EMAIL_ASC',
  UserByUserIdEmailDesc = 'USER_BY_USER_ID__EMAIL_DESC',
  UserByUserIdEmailConfirmedAsc = 'USER_BY_USER_ID__EMAIL_CONFIRMED_ASC',
  UserByUserIdEmailConfirmedDesc = 'USER_BY_USER_ID__EMAIL_CONFIRMED_DESC',
  UserByUserIdStatusAsc = 'USER_BY_USER_ID__STATUS_ASC',
  UserByUserIdStatusDesc = 'USER_BY_USER_ID__STATUS_DESC',
  UserByUserIdRoleAsc = 'USER_BY_USER_ID__ROLE_ASC',
  UserByUserIdRoleDesc = 'USER_BY_USER_ID__ROLE_DESC',
  UserByUserIdPhotoUrlAsc = 'USER_BY_USER_ID__PHOTO_URL_ASC',
  UserByUserIdPhotoUrlDesc = 'USER_BY_USER_ID__PHOTO_URL_DESC',
  UserByUserIdPhoneAsc = 'USER_BY_USER_ID__PHONE_ASC',
  UserByUserIdPhoneDesc = 'USER_BY_USER_ID__PHONE_DESC',
  UserByUserIdAddressAsc = 'USER_BY_USER_ID__ADDRESS_ASC',
  UserByUserIdAddressDesc = 'USER_BY_USER_ID__ADDRESS_DESC',
  UserByUserIdSettingsAsc = 'USER_BY_USER_ID__SETTINGS_ASC',
  UserByUserIdSettingsDesc = 'USER_BY_USER_ID__SETTINGS_DESC',
  UserByUserIdCreatedAtAsc = 'USER_BY_USER_ID__CREATED_AT_ASC',
  UserByUserIdCreatedAtDesc = 'USER_BY_USER_ID__CREATED_AT_DESC',
  UserByUserIdUpdatedAtAsc = 'USER_BY_USER_ID__UPDATED_AT_ASC',
  UserByUserIdUpdatedAtDesc = 'USER_BY_USER_ID__UPDATED_AT_DESC',
  UserByUserIdDeletedAsc = 'USER_BY_USER_ID__DELETED_ASC',
  UserByUserIdDeletedDesc = 'USER_BY_USER_ID__DELETED_DESC',
  UserByUserIdDeletedAtAsc = 'USER_BY_USER_ID__DELETED_AT_ASC',
  UserByUserIdDeletedAtDesc = 'USER_BY_USER_ID__DELETED_AT_DESC',
  UserSubscriptionsByBillingProfileIdCountAsc = 'USER_SUBSCRIPTIONS_BY_BILLING_PROFILE_ID__COUNT_ASC',
  UserSubscriptionsByBillingProfileIdCountDesc = 'USER_SUBSCRIPTIONS_BY_BILLING_PROFILE_ID__COUNT_DESC',
}

/** A condition to be used against `BillingProfile` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type BillingProfileCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>
  /** Checks for equality with the object’s `userId` field. */
  userId?: Maybe<Scalars['UUID']>
  /** Checks for equality with the object’s `customerId` field. */
  customerId?: Maybe<Scalars['String']>
  /** Checks for equality with the object’s `customerObj` field. */
  customerObj?: Maybe<Scalars['JSON']>
  /** Checks for equality with the object’s `billingDetails` field. */
  billingDetails?: Maybe<Scalars['JSON']>
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>
}

/** A filter to be used against `BillingProfile` object types. All fields are combined with a logical ‘and.’ */
export type BillingProfileFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<UuidFilter>
  /** Filter by the object’s `userId` field. */
  userId?: Maybe<UuidFilter>
  /** Filter by the object’s `customerId` field. */
  customerId?: Maybe<StringFilter>
  /** Filter by the object’s `customerObj` field. */
  customerObj?: Maybe<JsonFilter>
  /** Filter by the object’s `billingDetails` field. */
  billingDetails?: Maybe<JsonFilter>
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: Maybe<DatetimeFilter>
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<BillingProfileFilter>>
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<BillingProfileFilter>>
  /** Negates the expression. */
  not?: Maybe<BillingProfileFilter>
}

/** A filter to be used against JSON fields. All fields are combined with a logical ‘and.’ */
export type JsonFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>
  /** Equal to the specified value. */
  equalTo?: Maybe<Scalars['JSON']>
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Scalars['JSON']>
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Scalars['JSON']>
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Scalars['JSON']>
  /** Included in the specified list. */
  in?: Maybe<Array<Scalars['JSON']>>
  /** Not included in the specified list. */
  notIn?: Maybe<Array<Scalars['JSON']>>
  /** Less than the specified value. */
  lessThan?: Maybe<Scalars['JSON']>
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Scalars['JSON']>
  /** Greater than the specified value. */
  greaterThan?: Maybe<Scalars['JSON']>
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Scalars['JSON']>
  /** Contains the specified JSON. */
  contains?: Maybe<Scalars['JSON']>
  /** Contains the specified key. */
  containsKey?: Maybe<Scalars['String']>
  /** Contains all of the specified keys. */
  containsAllKeys?: Maybe<Array<Scalars['String']>>
  /** Contains any of the specified keys. */
  containsAnyKeys?: Maybe<Array<Scalars['String']>>
  /** Contained by the specified JSON. */
  containedBy?: Maybe<Scalars['JSON']>
}

/** A connection to a list of `BillingProfile` values. */
export type BillingProfilesConnection = {
  /** A list of `BillingProfile` objects. */
  nodes: Array<BillingProfile>
  /** A list of edges which contains the `BillingProfile` and cursor to aid in pagination. */
  edges: Array<BillingProfilesEdge>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `BillingProfile` you could get from the connection. */
  totalCount: Scalars['Int']
}

export type BillingProfile = Node & {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']
  id: Scalars['UUID']
  userId: Scalars['UUID']
  customerId?: Maybe<Scalars['String']>
  customerObj?: Maybe<Scalars['JSON']>
  billingDetails?: Maybe<Scalars['JSON']>
  createdAt: Scalars['Datetime']
  updatedAt?: Maybe<Scalars['Datetime']>
  /** Reads a single `User` that is related to this `BillingProfile`. */
  user?: Maybe<User>
  /** Reads and enables pagination through a set of `UserSubscription`. */
  userSubscriptions: UserSubscriptionsConnection
  /** Reads and enables pagination through a set of `UserSubscription`. */
  userSubscriptionsList: Array<UserSubscription>
  /** Reads and enables pagination through a set of `User`. */
  usersByUserSubscriptionBillingProfileIdAndUserId: BillingProfileUsersByUserSubscriptionBillingProfileIdAndUserIdManyToManyConnection
  /** Reads and enables pagination through a set of `User`. */
  usersByUserSubscriptionBillingProfileIdAndUserIdList: Array<User>
}

export type BillingProfileUserSubscriptionsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<UserSubscriptionsOrderBy>>
  condition?: Maybe<UserSubscriptionCondition>
  filter?: Maybe<UserSubscriptionFilter>
}

export type BillingProfileUserSubscriptionsListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<UserSubscriptionsOrderBy>>
  condition?: Maybe<UserSubscriptionCondition>
  filter?: Maybe<UserSubscriptionFilter>
}

export type BillingProfileUsersByUserSubscriptionBillingProfileIdAndUserIdArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<UsersOrderBy>>
  condition?: Maybe<UserCondition>
  filter?: Maybe<UserFilter>
}

export type BillingProfileUsersByUserSubscriptionBillingProfileIdAndUserIdListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<UsersOrderBy>>
  condition?: Maybe<UserCondition>
  filter?: Maybe<UserFilter>
}

/** Methods to use when ordering `UserSubscription`. */
export enum UserSubscriptionsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC',
  BillingProfileIdAsc = 'BILLING_PROFILE_ID_ASC',
  BillingProfileIdDesc = 'BILLING_PROFILE_ID_DESC',
  PlanSubscriptionIdAsc = 'PLAN_SUBSCRIPTION_ID_ASC',
  PlanSubscriptionIdDesc = 'PLAN_SUBSCRIPTION_ID_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC',
  EndsAtAsc = 'ENDS_AT_ASC',
  EndsAtDesc = 'ENDS_AT_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UserByUserIdIdAsc = 'USER_BY_USER_ID__ID_ASC',
  UserByUserIdIdDesc = 'USER_BY_USER_ID__ID_DESC',
  UserByUserIdNameAsc = 'USER_BY_USER_ID__NAME_ASC',
  UserByUserIdNameDesc = 'USER_BY_USER_ID__NAME_DESC',
  UserByUserIdEmailAsc = 'USER_BY_USER_ID__EMAIL_ASC',
  UserByUserIdEmailDesc = 'USER_BY_USER_ID__EMAIL_DESC',
  UserByUserIdEmailConfirmedAsc = 'USER_BY_USER_ID__EMAIL_CONFIRMED_ASC',
  UserByUserIdEmailConfirmedDesc = 'USER_BY_USER_ID__EMAIL_CONFIRMED_DESC',
  UserByUserIdStatusAsc = 'USER_BY_USER_ID__STATUS_ASC',
  UserByUserIdStatusDesc = 'USER_BY_USER_ID__STATUS_DESC',
  UserByUserIdRoleAsc = 'USER_BY_USER_ID__ROLE_ASC',
  UserByUserIdRoleDesc = 'USER_BY_USER_ID__ROLE_DESC',
  UserByUserIdPhotoUrlAsc = 'USER_BY_USER_ID__PHOTO_URL_ASC',
  UserByUserIdPhotoUrlDesc = 'USER_BY_USER_ID__PHOTO_URL_DESC',
  UserByUserIdPhoneAsc = 'USER_BY_USER_ID__PHONE_ASC',
  UserByUserIdPhoneDesc = 'USER_BY_USER_ID__PHONE_DESC',
  UserByUserIdAddressAsc = 'USER_BY_USER_ID__ADDRESS_ASC',
  UserByUserIdAddressDesc = 'USER_BY_USER_ID__ADDRESS_DESC',
  UserByUserIdSettingsAsc = 'USER_BY_USER_ID__SETTINGS_ASC',
  UserByUserIdSettingsDesc = 'USER_BY_USER_ID__SETTINGS_DESC',
  UserByUserIdCreatedAtAsc = 'USER_BY_USER_ID__CREATED_AT_ASC',
  UserByUserIdCreatedAtDesc = 'USER_BY_USER_ID__CREATED_AT_DESC',
  UserByUserIdUpdatedAtAsc = 'USER_BY_USER_ID__UPDATED_AT_ASC',
  UserByUserIdUpdatedAtDesc = 'USER_BY_USER_ID__UPDATED_AT_DESC',
  UserByUserIdDeletedAsc = 'USER_BY_USER_ID__DELETED_ASC',
  UserByUserIdDeletedDesc = 'USER_BY_USER_ID__DELETED_DESC',
  UserByUserIdDeletedAtAsc = 'USER_BY_USER_ID__DELETED_AT_ASC',
  UserByUserIdDeletedAtDesc = 'USER_BY_USER_ID__DELETED_AT_DESC',
  BillingProfileByBillingProfileIdIdAsc = 'BILLING_PROFILE_BY_BILLING_PROFILE_ID__ID_ASC',
  BillingProfileByBillingProfileIdIdDesc = 'BILLING_PROFILE_BY_BILLING_PROFILE_ID__ID_DESC',
  BillingProfileByBillingProfileIdUserIdAsc = 'BILLING_PROFILE_BY_BILLING_PROFILE_ID__USER_ID_ASC',
  BillingProfileByBillingProfileIdUserIdDesc = 'BILLING_PROFILE_BY_BILLING_PROFILE_ID__USER_ID_DESC',
  BillingProfileByBillingProfileIdCustomerIdAsc = 'BILLING_PROFILE_BY_BILLING_PROFILE_ID__CUSTOMER_ID_ASC',
  BillingProfileByBillingProfileIdCustomerIdDesc = 'BILLING_PROFILE_BY_BILLING_PROFILE_ID__CUSTOMER_ID_DESC',
  BillingProfileByBillingProfileIdCustomerObjAsc = 'BILLING_PROFILE_BY_BILLING_PROFILE_ID__CUSTOMER_OBJ_ASC',
  BillingProfileByBillingProfileIdCustomerObjDesc = 'BILLING_PROFILE_BY_BILLING_PROFILE_ID__CUSTOMER_OBJ_DESC',
  BillingProfileByBillingProfileIdBillingDetailsAsc = 'BILLING_PROFILE_BY_BILLING_PROFILE_ID__BILLING_DETAILS_ASC',
  BillingProfileByBillingProfileIdBillingDetailsDesc = 'BILLING_PROFILE_BY_BILLING_PROFILE_ID__BILLING_DETAILS_DESC',
  BillingProfileByBillingProfileIdCreatedAtAsc = 'BILLING_PROFILE_BY_BILLING_PROFILE_ID__CREATED_AT_ASC',
  BillingProfileByBillingProfileIdCreatedAtDesc = 'BILLING_PROFILE_BY_BILLING_PROFILE_ID__CREATED_AT_DESC',
  BillingProfileByBillingProfileIdUpdatedAtAsc = 'BILLING_PROFILE_BY_BILLING_PROFILE_ID__UPDATED_AT_ASC',
  BillingProfileByBillingProfileIdUpdatedAtDesc = 'BILLING_PROFILE_BY_BILLING_PROFILE_ID__UPDATED_AT_DESC',
}

/** A condition to be used against `UserSubscription` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type UserSubscriptionCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>
  /** Checks for equality with the object’s `userId` field. */
  userId?: Maybe<Scalars['UUID']>
  /** Checks for equality with the object’s `billingProfileId` field. */
  billingProfileId?: Maybe<Scalars['UUID']>
  /** Checks for equality with the object’s `planSubscriptionId` field. */
  planSubscriptionId?: Maybe<Scalars['String']>
  /** Checks for equality with the object’s `status` field. */
  status?: Maybe<SubscriptionStatusT>
  /** Checks for equality with the object’s `endsAt` field. */
  endsAt?: Maybe<Scalars['Datetime']>
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>
}

export enum SubscriptionStatusT {
  Active = 'ACTIVE',
  PastDue = 'PAST_DUE',
  Unpaid = 'UNPAID',
  Canceled = 'CANCELED',
  Incomplete = 'INCOMPLETE',
  IncompleteExpired = 'INCOMPLETE_EXPIRED',
  Trialing = 'TRIALING',
}

/** A filter to be used against `UserSubscription` object types. All fields are combined with a logical ‘and.’ */
export type UserSubscriptionFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<UuidFilter>
  /** Filter by the object’s `userId` field. */
  userId?: Maybe<UuidFilter>
  /** Filter by the object’s `billingProfileId` field. */
  billingProfileId?: Maybe<UuidFilter>
  /** Filter by the object’s `planSubscriptionId` field. */
  planSubscriptionId?: Maybe<StringFilter>
  /** Filter by the object’s `status` field. */
  status?: Maybe<SubscriptionStatusTFilter>
  /** Filter by the object’s `endsAt` field. */
  endsAt?: Maybe<DatetimeFilter>
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: Maybe<DatetimeFilter>
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<UserSubscriptionFilter>>
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<UserSubscriptionFilter>>
  /** Negates the expression. */
  not?: Maybe<UserSubscriptionFilter>
}

/** A filter to be used against SubscriptionStatusT fields. All fields are combined with a logical ‘and.’ */
export type SubscriptionStatusTFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>
  /** Equal to the specified value. */
  equalTo?: Maybe<SubscriptionStatusT>
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<SubscriptionStatusT>
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<SubscriptionStatusT>
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<SubscriptionStatusT>
  /** Included in the specified list. */
  in?: Maybe<Array<SubscriptionStatusT>>
  /** Not included in the specified list. */
  notIn?: Maybe<Array<SubscriptionStatusT>>
  /** Less than the specified value. */
  lessThan?: Maybe<SubscriptionStatusT>
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<SubscriptionStatusT>
  /** Greater than the specified value. */
  greaterThan?: Maybe<SubscriptionStatusT>
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<SubscriptionStatusT>
}

/** A connection to a list of `UserSubscription` values. */
export type UserSubscriptionsConnection = {
  /** A list of `UserSubscription` objects. */
  nodes: Array<UserSubscription>
  /** A list of edges which contains the `UserSubscription` and cursor to aid in pagination. */
  edges: Array<UserSubscriptionsEdge>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `UserSubscription` you could get from the connection. */
  totalCount: Scalars['Int']
}

export type UserSubscription = Node & {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']
  id: Scalars['UUID']
  userId: Scalars['UUID']
  billingProfileId?: Maybe<Scalars['UUID']>
  planSubscriptionId?: Maybe<Scalars['String']>
  status?: Maybe<SubscriptionStatusT>
  endsAt: Scalars['Datetime']
  createdAt: Scalars['Datetime']
  updatedAt?: Maybe<Scalars['Datetime']>
  /** Reads a single `User` that is related to this `UserSubscription`. */
  user?: Maybe<User>
  /** Reads a single `BillingProfile` that is related to this `UserSubscription`. */
  billingProfile?: Maybe<BillingProfile>
}

/** A `UserSubscription` edge in the connection. */
export type UserSubscriptionsEdge = {
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `UserSubscription` at the end of the edge. */
  node: UserSubscription
}

/** A connection to a list of `User` values, with data from `UserSubscription`. */
export type BillingProfileUsersByUserSubscriptionBillingProfileIdAndUserIdManyToManyConnection = {
  /** A list of `User` objects. */
  nodes: Array<User>
  /** A list of edges which contains the `User`, info from the `UserSubscription`, and the cursor to aid in pagination. */
  edges: Array<BillingProfileUsersByUserSubscriptionBillingProfileIdAndUserIdManyToManyEdge>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int']
}

/** A `User` edge in the connection, with data from `UserSubscription`. */
export type BillingProfileUsersByUserSubscriptionBillingProfileIdAndUserIdManyToManyEdge = {
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `User` at the end of the edge. */
  node: User
  /** Reads and enables pagination through a set of `UserSubscription`. */
  userSubscriptions: UserSubscriptionsConnection
  /** Reads and enables pagination through a set of `UserSubscription`. */
  userSubscriptionsList: Array<UserSubscription>
}

/** A `User` edge in the connection, with data from `UserSubscription`. */
export type BillingProfileUsersByUserSubscriptionBillingProfileIdAndUserIdManyToManyEdgeUserSubscriptionsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<UserSubscriptionsOrderBy>>
  condition?: Maybe<UserSubscriptionCondition>
  filter?: Maybe<UserSubscriptionFilter>
}

/** A `User` edge in the connection, with data from `UserSubscription`. */
export type BillingProfileUsersByUserSubscriptionBillingProfileIdAndUserIdManyToManyEdgeUserSubscriptionsListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<UserSubscriptionsOrderBy>>
  condition?: Maybe<UserSubscriptionCondition>
  filter?: Maybe<UserSubscriptionFilter>
}

/** A `BillingProfile` edge in the connection. */
export type BillingProfilesEdge = {
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `BillingProfile` at the end of the edge. */
  node: BillingProfile
}

/** A connection to a list of `ParkingSpace` values. */
export type ParkingSpacesConnection = {
  /** A list of `ParkingSpace` objects. */
  nodes: Array<ParkingSpace>
  /** A list of edges which contains the `ParkingSpace` and cursor to aid in pagination. */
  edges: Array<ParkingSpacesEdge>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `ParkingSpace` you could get from the connection. */
  totalCount: Scalars['Int']
}

/** A `ParkingSpace` edge in the connection. */
export type ParkingSpacesEdge = {
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `ParkingSpace` at the end of the edge. */
  node: ParkingSpace
}

/** Methods to use when ordering `Business`. */
export enum BusinessesOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  OwnerIdAsc = 'OWNER_ID_ASC',
  OwnerIdDesc = 'OWNER_ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  PhotoUrlAsc = 'PHOTO_URL_ASC',
  PhotoUrlDesc = 'PHOTO_URL_DESC',
  MarkerUrlAsc = 'MARKER_URL_ASC',
  MarkerUrlDesc = 'MARKER_URL_DESC',
  AddressAsc = 'ADDRESS_ASC',
  AddressDesc = 'ADDRESS_DESC',
  LocationAsc = 'LOCATION_ASC',
  LocationDesc = 'LOCATION_DESC',
  SlugAsc = 'SLUG_ASC',
  SlugDesc = 'SLUG_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UserByOwnerIdIdAsc = 'USER_BY_OWNER_ID__ID_ASC',
  UserByOwnerIdIdDesc = 'USER_BY_OWNER_ID__ID_DESC',
  UserByOwnerIdNameAsc = 'USER_BY_OWNER_ID__NAME_ASC',
  UserByOwnerIdNameDesc = 'USER_BY_OWNER_ID__NAME_DESC',
  UserByOwnerIdEmailAsc = 'USER_BY_OWNER_ID__EMAIL_ASC',
  UserByOwnerIdEmailDesc = 'USER_BY_OWNER_ID__EMAIL_DESC',
  UserByOwnerIdEmailConfirmedAsc = 'USER_BY_OWNER_ID__EMAIL_CONFIRMED_ASC',
  UserByOwnerIdEmailConfirmedDesc = 'USER_BY_OWNER_ID__EMAIL_CONFIRMED_DESC',
  UserByOwnerIdStatusAsc = 'USER_BY_OWNER_ID__STATUS_ASC',
  UserByOwnerIdStatusDesc = 'USER_BY_OWNER_ID__STATUS_DESC',
  UserByOwnerIdRoleAsc = 'USER_BY_OWNER_ID__ROLE_ASC',
  UserByOwnerIdRoleDesc = 'USER_BY_OWNER_ID__ROLE_DESC',
  UserByOwnerIdPhotoUrlAsc = 'USER_BY_OWNER_ID__PHOTO_URL_ASC',
  UserByOwnerIdPhotoUrlDesc = 'USER_BY_OWNER_ID__PHOTO_URL_DESC',
  UserByOwnerIdPhoneAsc = 'USER_BY_OWNER_ID__PHONE_ASC',
  UserByOwnerIdPhoneDesc = 'USER_BY_OWNER_ID__PHONE_DESC',
  UserByOwnerIdAddressAsc = 'USER_BY_OWNER_ID__ADDRESS_ASC',
  UserByOwnerIdAddressDesc = 'USER_BY_OWNER_ID__ADDRESS_DESC',
  UserByOwnerIdSettingsAsc = 'USER_BY_OWNER_ID__SETTINGS_ASC',
  UserByOwnerIdSettingsDesc = 'USER_BY_OWNER_ID__SETTINGS_DESC',
  UserByOwnerIdCreatedAtAsc = 'USER_BY_OWNER_ID__CREATED_AT_ASC',
  UserByOwnerIdCreatedAtDesc = 'USER_BY_OWNER_ID__CREATED_AT_DESC',
  UserByOwnerIdUpdatedAtAsc = 'USER_BY_OWNER_ID__UPDATED_AT_ASC',
  UserByOwnerIdUpdatedAtDesc = 'USER_BY_OWNER_ID__UPDATED_AT_DESC',
  UserByOwnerIdDeletedAsc = 'USER_BY_OWNER_ID__DELETED_ASC',
  UserByOwnerIdDeletedDesc = 'USER_BY_OWNER_ID__DELETED_DESC',
  UserByOwnerIdDeletedAtAsc = 'USER_BY_OWNER_ID__DELETED_AT_ASC',
  UserByOwnerIdDeletedAtDesc = 'USER_BY_OWNER_ID__DELETED_AT_DESC',
}

/** A condition to be used against `Business` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type BusinessCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>
  /** Checks for equality with the object’s `ownerId` field. */
  ownerId?: Maybe<Scalars['UUID']>
  /** Checks for equality with the object’s `name` field. */
  name?: Maybe<Scalars['String']>
  /** Checks for equality with the object’s `description` field. */
  description?: Maybe<Scalars['String']>
  /** Checks for equality with the object’s `photoUrl` field. */
  photoUrl?: Maybe<Scalars['String']>
  /** Checks for equality with the object’s `markerUrl` field. */
  markerUrl?: Maybe<Scalars['String']>
  /** Checks for equality with the object’s `address` field. */
  address?: Maybe<Scalars['JSON']>
  /** Checks for equality with the object’s `location` field. */
  location?: Maybe<Scalars['GeoJSON']>
  /** Checks for equality with the object’s `slug` field. */
  slug?: Maybe<Scalars['String']>
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>
}

/** A filter to be used against `Business` object types. All fields are combined with a logical ‘and.’ */
export type BusinessFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<UuidFilter>
  /** Filter by the object’s `ownerId` field. */
  ownerId?: Maybe<UuidFilter>
  /** Filter by the object’s `name` field. */
  name?: Maybe<StringFilter>
  /** Filter by the object’s `description` field. */
  description?: Maybe<StringFilter>
  /** Filter by the object’s `photoUrl` field. */
  photoUrl?: Maybe<StringFilter>
  /** Filter by the object’s `markerUrl` field. */
  markerUrl?: Maybe<StringFilter>
  /** Filter by the object’s `location` field. */
  location?: Maybe<GeographyPointFilter>
  /** Filter by the object’s `slug` field. */
  slug?: Maybe<StringFilter>
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: Maybe<DatetimeFilter>
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<BusinessFilter>>
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<BusinessFilter>>
  /** Negates the expression. */
  not?: Maybe<BusinessFilter>
}

/** A connection to a list of `Business` values. */
export type BusinessesConnection = {
  /** A list of `Business` objects. */
  nodes: Array<Business>
  /** A list of edges which contains the `Business` and cursor to aid in pagination. */
  edges: Array<BusinessesEdge>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `Business` you could get from the connection. */
  totalCount: Scalars['Int']
}

export type Business = Node & {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']
  id: Scalars['UUID']
  ownerId: Scalars['UUID']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  photoUrl?: Maybe<Scalars['String']>
  markerUrl?: Maybe<Scalars['String']>
  address?: Maybe<Scalars['JSON']>
  location: GeographyPoint
  slug?: Maybe<Scalars['String']>
  createdAt: Scalars['Datetime']
  updatedAt?: Maybe<Scalars['Datetime']>
  /** Reads a single `User` that is related to this `Business`. */
  owner?: Maybe<User>
}

/** A `Business` edge in the connection. */
export type BusinessesEdge = {
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `Business` at the end of the edge. */
  node: Business
}

/** Methods to use when ordering `PaymentReceipt`. */
export enum PaymentReceiptsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  OwnerIdAsc = 'OWNER_ID_ASC',
  OwnerIdDesc = 'OWNER_ID_DESC',
  PaymentIntentIdAsc = 'PAYMENT_INTENT_ID_ASC',
  PaymentIntentIdDesc = 'PAYMENT_INTENT_ID_DESC',
  ReceiptUrlAsc = 'RECEIPT_URL_ASC',
  ReceiptUrlDesc = 'RECEIPT_URL_DESC',
  AmountAsc = 'AMOUNT_ASC',
  AmountDesc = 'AMOUNT_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UserByOwnerIdIdAsc = 'USER_BY_OWNER_ID__ID_ASC',
  UserByOwnerIdIdDesc = 'USER_BY_OWNER_ID__ID_DESC',
  UserByOwnerIdNameAsc = 'USER_BY_OWNER_ID__NAME_ASC',
  UserByOwnerIdNameDesc = 'USER_BY_OWNER_ID__NAME_DESC',
  UserByOwnerIdEmailAsc = 'USER_BY_OWNER_ID__EMAIL_ASC',
  UserByOwnerIdEmailDesc = 'USER_BY_OWNER_ID__EMAIL_DESC',
  UserByOwnerIdEmailConfirmedAsc = 'USER_BY_OWNER_ID__EMAIL_CONFIRMED_ASC',
  UserByOwnerIdEmailConfirmedDesc = 'USER_BY_OWNER_ID__EMAIL_CONFIRMED_DESC',
  UserByOwnerIdStatusAsc = 'USER_BY_OWNER_ID__STATUS_ASC',
  UserByOwnerIdStatusDesc = 'USER_BY_OWNER_ID__STATUS_DESC',
  UserByOwnerIdRoleAsc = 'USER_BY_OWNER_ID__ROLE_ASC',
  UserByOwnerIdRoleDesc = 'USER_BY_OWNER_ID__ROLE_DESC',
  UserByOwnerIdPhotoUrlAsc = 'USER_BY_OWNER_ID__PHOTO_URL_ASC',
  UserByOwnerIdPhotoUrlDesc = 'USER_BY_OWNER_ID__PHOTO_URL_DESC',
  UserByOwnerIdPhoneAsc = 'USER_BY_OWNER_ID__PHONE_ASC',
  UserByOwnerIdPhoneDesc = 'USER_BY_OWNER_ID__PHONE_DESC',
  UserByOwnerIdAddressAsc = 'USER_BY_OWNER_ID__ADDRESS_ASC',
  UserByOwnerIdAddressDesc = 'USER_BY_OWNER_ID__ADDRESS_DESC',
  UserByOwnerIdSettingsAsc = 'USER_BY_OWNER_ID__SETTINGS_ASC',
  UserByOwnerIdSettingsDesc = 'USER_BY_OWNER_ID__SETTINGS_DESC',
  UserByOwnerIdCreatedAtAsc = 'USER_BY_OWNER_ID__CREATED_AT_ASC',
  UserByOwnerIdCreatedAtDesc = 'USER_BY_OWNER_ID__CREATED_AT_DESC',
  UserByOwnerIdUpdatedAtAsc = 'USER_BY_OWNER_ID__UPDATED_AT_ASC',
  UserByOwnerIdUpdatedAtDesc = 'USER_BY_OWNER_ID__UPDATED_AT_DESC',
  UserByOwnerIdDeletedAsc = 'USER_BY_OWNER_ID__DELETED_ASC',
  UserByOwnerIdDeletedDesc = 'USER_BY_OWNER_ID__DELETED_DESC',
  UserByOwnerIdDeletedAtAsc = 'USER_BY_OWNER_ID__DELETED_AT_ASC',
  UserByOwnerIdDeletedAtDesc = 'USER_BY_OWNER_ID__DELETED_AT_DESC',
  SlotBookingsByPaymentReceiptIdCountAsc = 'SLOT_BOOKINGS_BY_PAYMENT_RECEIPT_ID__COUNT_ASC',
  SlotBookingsByPaymentReceiptIdCountDesc = 'SLOT_BOOKINGS_BY_PAYMENT_RECEIPT_ID__COUNT_DESC',
}

/** A condition to be used against `PaymentReceipt` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type PaymentReceiptCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>
  /** Checks for equality with the object’s `ownerId` field. */
  ownerId?: Maybe<Scalars['UUID']>
  /** Checks for equality with the object’s `paymentIntentId` field. */
  paymentIntentId?: Maybe<Scalars['String']>
  /** Checks for equality with the object’s `receiptUrl` field. */
  receiptUrl?: Maybe<Scalars['String']>
  /** Checks for equality with the object’s `amount` field. */
  amount?: Maybe<Scalars['BigFloat']>
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>
}

/** A filter to be used against `PaymentReceipt` object types. All fields are combined with a logical ‘and.’ */
export type PaymentReceiptFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<UuidFilter>
  /** Filter by the object’s `ownerId` field. */
  ownerId?: Maybe<UuidFilter>
  /** Filter by the object’s `paymentIntentId` field. */
  paymentIntentId?: Maybe<StringFilter>
  /** Filter by the object’s `receiptUrl` field. */
  receiptUrl?: Maybe<StringFilter>
  /** Filter by the object’s `amount` field. */
  amount?: Maybe<BigFloatFilter>
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: Maybe<DatetimeFilter>
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<PaymentReceiptFilter>>
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<PaymentReceiptFilter>>
  /** Negates the expression. */
  not?: Maybe<PaymentReceiptFilter>
}

/** A connection to a list of `PaymentReceipt` values. */
export type PaymentReceiptsConnection = {
  /** A list of `PaymentReceipt` objects. */
  nodes: Array<PaymentReceipt>
  /** A list of edges which contains the `PaymentReceipt` and cursor to aid in pagination. */
  edges: Array<PaymentReceiptsEdge>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `PaymentReceipt` you could get from the connection. */
  totalCount: Scalars['Int']
}

export type PaymentReceipt = Node & {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']
  id: Scalars['UUID']
  ownerId: Scalars['UUID']
  paymentIntentId: Scalars['String']
  receiptUrl?: Maybe<Scalars['String']>
  amount: Scalars['BigFloat']
  createdAt: Scalars['Datetime']
  updatedAt?: Maybe<Scalars['Datetime']>
  /** Reads a single `User` that is related to this `PaymentReceipt`. */
  owner?: Maybe<User>
  /** Reads and enables pagination through a set of `SlotBooking`. */
  slotBookings: SlotBookingsConnection
  /** Reads and enables pagination through a set of `SlotBooking`. */
  slotBookingsList: Array<SlotBooking>
  /** Reads and enables pagination through a set of `Slot`. */
  slotsBySlotBookingPaymentReceiptIdAndSlotId: PaymentReceiptSlotsBySlotBookingPaymentReceiptIdAndSlotIdManyToManyConnection
  /** Reads and enables pagination through a set of `Slot`. */
  slotsBySlotBookingPaymentReceiptIdAndSlotIdList: Array<Slot>
  /** Reads and enables pagination through a set of `User`. */
  usersBySlotBookingPaymentReceiptIdAndUserId: PaymentReceiptUsersBySlotBookingPaymentReceiptIdAndUserIdManyToManyConnection
  /** Reads and enables pagination through a set of `User`. */
  usersBySlotBookingPaymentReceiptIdAndUserIdList: Array<User>
}

export type PaymentReceiptSlotBookingsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<SlotBookingsOrderBy>>
  condition?: Maybe<SlotBookingCondition>
  filter?: Maybe<SlotBookingFilter>
}

export type PaymentReceiptSlotBookingsListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<SlotBookingsOrderBy>>
  condition?: Maybe<SlotBookingCondition>
  filter?: Maybe<SlotBookingFilter>
}

export type PaymentReceiptSlotsBySlotBookingPaymentReceiptIdAndSlotIdArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<SlotsOrderBy>>
  condition?: Maybe<SlotCondition>
  filter?: Maybe<SlotFilter>
}

export type PaymentReceiptSlotsBySlotBookingPaymentReceiptIdAndSlotIdListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<SlotsOrderBy>>
  condition?: Maybe<SlotCondition>
  filter?: Maybe<SlotFilter>
}

export type PaymentReceiptUsersBySlotBookingPaymentReceiptIdAndUserIdArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<UsersOrderBy>>
  condition?: Maybe<UserCondition>
  filter?: Maybe<UserFilter>
}

export type PaymentReceiptUsersBySlotBookingPaymentReceiptIdAndUserIdListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<UsersOrderBy>>
  condition?: Maybe<UserCondition>
  filter?: Maybe<UserFilter>
}

/** Methods to use when ordering `SlotBooking`. */
export enum SlotBookingsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  SlotIdAsc = 'SLOT_ID_ASC',
  SlotIdDesc = 'SLOT_ID_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC',
  LicensePlateAsc = 'LICENSE_PLATE_ASC',
  LicensePlateDesc = 'LICENSE_PLATE_DESC',
  StartTimeAsc = 'START_TIME_ASC',
  StartTimeDesc = 'START_TIME_DESC',
  EndTimeAsc = 'END_TIME_ASC',
  EndTimeDesc = 'END_TIME_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  PhoneAsc = 'PHONE_ASC',
  PhoneDesc = 'PHONE_DESC',
  CheckInAtAsc = 'CHECK_IN_AT_ASC',
  CheckInAtDesc = 'CHECK_IN_AT_DESC',
  CheckOutAtAsc = 'CHECK_OUT_AT_ASC',
  CheckOutAtDesc = 'CHECK_OUT_AT_DESC',
  PaymentReceiptIdAsc = 'PAYMENT_RECEIPT_ID_ASC',
  PaymentReceiptIdDesc = 'PAYMENT_RECEIPT_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  SlotBySlotIdIdAsc = 'SLOT_BY_SLOT_ID__ID_ASC',
  SlotBySlotIdIdDesc = 'SLOT_BY_SLOT_ID__ID_DESC',
  SlotBySlotIdNameAsc = 'SLOT_BY_SLOT_ID__NAME_ASC',
  SlotBySlotIdNameDesc = 'SLOT_BY_SLOT_ID__NAME_DESC',
  SlotBySlotIdOwnerIdAsc = 'SLOT_BY_SLOT_ID__OWNER_ID_ASC',
  SlotBySlotIdOwnerIdDesc = 'SLOT_BY_SLOT_ID__OWNER_ID_DESC',
  SlotBySlotIdVehicleSizeIdAsc = 'SLOT_BY_SLOT_ID__VEHICLE_SIZE_ID_ASC',
  SlotBySlotIdVehicleSizeIdDesc = 'SLOT_BY_SLOT_ID__VEHICLE_SIZE_ID_DESC',
  SlotBySlotIdAddressAsc = 'SLOT_BY_SLOT_ID__ADDRESS_ASC',
  SlotBySlotIdAddressDesc = 'SLOT_BY_SLOT_ID__ADDRESS_DESC',
  SlotBySlotIdTimezoneAsc = 'SLOT_BY_SLOT_ID__TIMEZONE_ASC',
  SlotBySlotIdTimezoneDesc = 'SLOT_BY_SLOT_ID__TIMEZONE_DESC',
  SlotBySlotIdPricePerHourAsc = 'SLOT_BY_SLOT_ID__PRICE_PER_HOUR_ASC',
  SlotBySlotIdPricePerHourDesc = 'SLOT_BY_SLOT_ID__PRICE_PER_HOUR_DESC',
  SlotBySlotIdStatusAsc = 'SLOT_BY_SLOT_ID__STATUS_ASC',
  SlotBySlotIdStatusDesc = 'SLOT_BY_SLOT_ID__STATUS_DESC',
  SlotBySlotIdPhotoUrlAsc = 'SLOT_BY_SLOT_ID__PHOTO_URL_ASC',
  SlotBySlotIdPhotoUrlDesc = 'SLOT_BY_SLOT_ID__PHOTO_URL_DESC',
  SlotBySlotIdDescriptionAsc = 'SLOT_BY_SLOT_ID__DESCRIPTION_ASC',
  SlotBySlotIdDescriptionDesc = 'SLOT_BY_SLOT_ID__DESCRIPTION_DESC',
  SlotBySlotIdNotesAsc = 'SLOT_BY_SLOT_ID__NOTES_ASC',
  SlotBySlotIdNotesDesc = 'SLOT_BY_SLOT_ID__NOTES_DESC',
  SlotBySlotIdSlugAsc = 'SLOT_BY_SLOT_ID__SLUG_ASC',
  SlotBySlotIdSlugDesc = 'SLOT_BY_SLOT_ID__SLUG_DESC',
  SlotBySlotIdCreatedAtAsc = 'SLOT_BY_SLOT_ID__CREATED_AT_ASC',
  SlotBySlotIdCreatedAtDesc = 'SLOT_BY_SLOT_ID__CREATED_AT_DESC',
  SlotBySlotIdUpdatedAtAsc = 'SLOT_BY_SLOT_ID__UPDATED_AT_ASC',
  SlotBySlotIdUpdatedAtDesc = 'SLOT_BY_SLOT_ID__UPDATED_AT_DESC',
  SlotBySlotIdDeletedAsc = 'SLOT_BY_SLOT_ID__DELETED_ASC',
  SlotBySlotIdDeletedDesc = 'SLOT_BY_SLOT_ID__DELETED_DESC',
  SlotBySlotIdDeletedAtAsc = 'SLOT_BY_SLOT_ID__DELETED_AT_ASC',
  SlotBySlotIdDeletedAtDesc = 'SLOT_BY_SLOT_ID__DELETED_AT_DESC',
  SlotBySlotIdVerificationStatusAsc = 'SLOT_BY_SLOT_ID__VERIFICATION_STATUS_ASC',
  SlotBySlotIdVerificationStatusDesc = 'SLOT_BY_SLOT_ID__VERIFICATION_STATUS_DESC',
  SlotBySlotIdParkingSpaceIdAsc = 'SLOT_BY_SLOT_ID__PARKING_SPACE_ID_ASC',
  SlotBySlotIdParkingSpaceIdDesc = 'SLOT_BY_SLOT_ID__PARKING_SPACE_ID_DESC',
  SlotBySlotIdLocationAsc = 'SLOT_BY_SLOT_ID__LOCATION_ASC',
  SlotBySlotIdLocationDesc = 'SLOT_BY_SLOT_ID__LOCATION_DESC',
  SlotBySlotIdShapeAsc = 'SLOT_BY_SLOT_ID__SHAPE_ASC',
  SlotBySlotIdShapeDesc = 'SLOT_BY_SLOT_ID__SHAPE_DESC',
  SlotBySlotIdAccessRestrictionsAsc = 'SLOT_BY_SLOT_ID__ACCESS_RESTRICTIONS_ASC',
  SlotBySlotIdAccessRestrictionsDesc = 'SLOT_BY_SLOT_ID__ACCESS_RESTRICTIONS_DESC',
  SlotBySlotIdBusinessStatusAsc = 'SLOT_BY_SLOT_ID__BUSINESS_STATUS_ASC',
  SlotBySlotIdBusinessStatusDesc = 'SLOT_BY_SLOT_ID__BUSINESS_STATUS_DESC',
  SlotBySlotIdBusinessStatusReasonAsc = 'SLOT_BY_SLOT_ID__BUSINESS_STATUS_REASON_ASC',
  SlotBySlotIdBusinessStatusReasonDesc = 'SLOT_BY_SLOT_ID__BUSINESS_STATUS_REASON_DESC',
  SlotBySlotIdCategoryAsc = 'SLOT_BY_SLOT_ID__CATEGORY_ASC',
  SlotBySlotIdCategoryDesc = 'SLOT_BY_SLOT_ID__CATEGORY_DESC',
  SlotBySlotIdContributorIdAsc = 'SLOT_BY_SLOT_ID__CONTRIBUTOR_ID_ASC',
  SlotBySlotIdContributorIdDesc = 'SLOT_BY_SLOT_ID__CONTRIBUTOR_ID_DESC',
  SlotBySlotIdLevelAsc = 'SLOT_BY_SLOT_ID__LEVEL_ASC',
  SlotBySlotIdLevelDesc = 'SLOT_BY_SLOT_ID__LEVEL_DESC',
  SlotBySlotIdMapSourceAsc = 'SLOT_BY_SLOT_ID__MAP_SOURCE_ASC',
  SlotBySlotIdMapSourceDesc = 'SLOT_BY_SLOT_ID__MAP_SOURCE_DESC',
  SlotBySlotIdSlotDimensionsAsc = 'SLOT_BY_SLOT_ID__SLOT_DIMENSIONS_ASC',
  SlotBySlotIdSlotDimensionsDesc = 'SLOT_BY_SLOT_ID__SLOT_DIMENSIONS_DESC',
  SlotBySlotIdTempUnavailableAsc = 'SLOT_BY_SLOT_ID__TEMP_UNAVAILABLE_ASC',
  SlotBySlotIdTempUnavailableDesc = 'SLOT_BY_SLOT_ID__TEMP_UNAVAILABLE_DESC',
  SlotBySlotIdTempUnavailableFromAsc = 'SLOT_BY_SLOT_ID__TEMP_UNAVAILABLE_FROM_ASC',
  SlotBySlotIdTempUnavailableFromDesc = 'SLOT_BY_SLOT_ID__TEMP_UNAVAILABLE_FROM_DESC',
  SlotBySlotIdTempUnavailableToAsc = 'SLOT_BY_SLOT_ID__TEMP_UNAVAILABLE_TO_ASC',
  SlotBySlotIdTempUnavailableToDesc = 'SLOT_BY_SLOT_ID__TEMP_UNAVAILABLE_TO_DESC',
  SlotBySlotIdWaypointsAsc = 'SLOT_BY_SLOT_ID__WAYPOINTS_ASC',
  SlotBySlotIdWaypointsDesc = 'SLOT_BY_SLOT_ID__WAYPOINTS_DESC',
  UserByUserIdIdAsc = 'USER_BY_USER_ID__ID_ASC',
  UserByUserIdIdDesc = 'USER_BY_USER_ID__ID_DESC',
  UserByUserIdNameAsc = 'USER_BY_USER_ID__NAME_ASC',
  UserByUserIdNameDesc = 'USER_BY_USER_ID__NAME_DESC',
  UserByUserIdEmailAsc = 'USER_BY_USER_ID__EMAIL_ASC',
  UserByUserIdEmailDesc = 'USER_BY_USER_ID__EMAIL_DESC',
  UserByUserIdEmailConfirmedAsc = 'USER_BY_USER_ID__EMAIL_CONFIRMED_ASC',
  UserByUserIdEmailConfirmedDesc = 'USER_BY_USER_ID__EMAIL_CONFIRMED_DESC',
  UserByUserIdStatusAsc = 'USER_BY_USER_ID__STATUS_ASC',
  UserByUserIdStatusDesc = 'USER_BY_USER_ID__STATUS_DESC',
  UserByUserIdRoleAsc = 'USER_BY_USER_ID__ROLE_ASC',
  UserByUserIdRoleDesc = 'USER_BY_USER_ID__ROLE_DESC',
  UserByUserIdPhotoUrlAsc = 'USER_BY_USER_ID__PHOTO_URL_ASC',
  UserByUserIdPhotoUrlDesc = 'USER_BY_USER_ID__PHOTO_URL_DESC',
  UserByUserIdPhoneAsc = 'USER_BY_USER_ID__PHONE_ASC',
  UserByUserIdPhoneDesc = 'USER_BY_USER_ID__PHONE_DESC',
  UserByUserIdAddressAsc = 'USER_BY_USER_ID__ADDRESS_ASC',
  UserByUserIdAddressDesc = 'USER_BY_USER_ID__ADDRESS_DESC',
  UserByUserIdSettingsAsc = 'USER_BY_USER_ID__SETTINGS_ASC',
  UserByUserIdSettingsDesc = 'USER_BY_USER_ID__SETTINGS_DESC',
  UserByUserIdCreatedAtAsc = 'USER_BY_USER_ID__CREATED_AT_ASC',
  UserByUserIdCreatedAtDesc = 'USER_BY_USER_ID__CREATED_AT_DESC',
  UserByUserIdUpdatedAtAsc = 'USER_BY_USER_ID__UPDATED_AT_ASC',
  UserByUserIdUpdatedAtDesc = 'USER_BY_USER_ID__UPDATED_AT_DESC',
  UserByUserIdDeletedAsc = 'USER_BY_USER_ID__DELETED_ASC',
  UserByUserIdDeletedDesc = 'USER_BY_USER_ID__DELETED_DESC',
  UserByUserIdDeletedAtAsc = 'USER_BY_USER_ID__DELETED_AT_ASC',
  UserByUserIdDeletedAtDesc = 'USER_BY_USER_ID__DELETED_AT_DESC',
  PaymentReceiptByPaymentReceiptIdIdAsc = 'PAYMENT_RECEIPT_BY_PAYMENT_RECEIPT_ID__ID_ASC',
  PaymentReceiptByPaymentReceiptIdIdDesc = 'PAYMENT_RECEIPT_BY_PAYMENT_RECEIPT_ID__ID_DESC',
  PaymentReceiptByPaymentReceiptIdOwnerIdAsc = 'PAYMENT_RECEIPT_BY_PAYMENT_RECEIPT_ID__OWNER_ID_ASC',
  PaymentReceiptByPaymentReceiptIdOwnerIdDesc = 'PAYMENT_RECEIPT_BY_PAYMENT_RECEIPT_ID__OWNER_ID_DESC',
  PaymentReceiptByPaymentReceiptIdPaymentIntentIdAsc = 'PAYMENT_RECEIPT_BY_PAYMENT_RECEIPT_ID__PAYMENT_INTENT_ID_ASC',
  PaymentReceiptByPaymentReceiptIdPaymentIntentIdDesc = 'PAYMENT_RECEIPT_BY_PAYMENT_RECEIPT_ID__PAYMENT_INTENT_ID_DESC',
  PaymentReceiptByPaymentReceiptIdReceiptUrlAsc = 'PAYMENT_RECEIPT_BY_PAYMENT_RECEIPT_ID__RECEIPT_URL_ASC',
  PaymentReceiptByPaymentReceiptIdReceiptUrlDesc = 'PAYMENT_RECEIPT_BY_PAYMENT_RECEIPT_ID__RECEIPT_URL_DESC',
  PaymentReceiptByPaymentReceiptIdAmountAsc = 'PAYMENT_RECEIPT_BY_PAYMENT_RECEIPT_ID__AMOUNT_ASC',
  PaymentReceiptByPaymentReceiptIdAmountDesc = 'PAYMENT_RECEIPT_BY_PAYMENT_RECEIPT_ID__AMOUNT_DESC',
  PaymentReceiptByPaymentReceiptIdCreatedAtAsc = 'PAYMENT_RECEIPT_BY_PAYMENT_RECEIPT_ID__CREATED_AT_ASC',
  PaymentReceiptByPaymentReceiptIdCreatedAtDesc = 'PAYMENT_RECEIPT_BY_PAYMENT_RECEIPT_ID__CREATED_AT_DESC',
  PaymentReceiptByPaymentReceiptIdUpdatedAtAsc = 'PAYMENT_RECEIPT_BY_PAYMENT_RECEIPT_ID__UPDATED_AT_ASC',
  PaymentReceiptByPaymentReceiptIdUpdatedAtDesc = 'PAYMENT_RECEIPT_BY_PAYMENT_RECEIPT_ID__UPDATED_AT_DESC',
}

/** A condition to be used against `SlotBooking` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type SlotBookingCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>
  /** Checks for equality with the object’s `slotId` field. */
  slotId?: Maybe<Scalars['UUID']>
  /** Checks for equality with the object’s `userId` field. */
  userId?: Maybe<Scalars['UUID']>
  /** Checks for equality with the object’s `status` field. */
  status?: Maybe<BookingStatusT>
  /** Checks for equality with the object’s `licensePlate` field. */
  licensePlate?: Maybe<Scalars['String']>
  /** Checks for equality with the object’s `startTime` field. */
  startTime?: Maybe<Scalars['Datetime']>
  /** Checks for equality with the object’s `endTime` field. */
  endTime?: Maybe<Scalars['Datetime']>
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>
  /** Checks for equality with the object’s `phone` field. */
  phone?: Maybe<Scalars['PhoneUs']>
  /** Checks for equality with the object’s `checkInAt` field. */
  checkInAt?: Maybe<Scalars['Datetime']>
  /** Checks for equality with the object’s `checkOutAt` field. */
  checkOutAt?: Maybe<Scalars['Datetime']>
  /** Checks for equality with the object’s `paymentReceiptId` field. */
  paymentReceiptId?: Maybe<Scalars['UUID']>
}

/** Allowed statuses for slot_booking are: pending, reserved and canceled */
export enum BookingStatusT {
  Pending = 'PENDING',
  Reserved = 'RESERVED',
  Canceled = 'CANCELED',
}

/** A filter to be used against `SlotBooking` object types. All fields are combined with a logical ‘and.’ */
export type SlotBookingFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<UuidFilter>
  /** Filter by the object’s `slotId` field. */
  slotId?: Maybe<UuidFilter>
  /** Filter by the object’s `userId` field. */
  userId?: Maybe<UuidFilter>
  /** Filter by the object’s `status` field. */
  status?: Maybe<BookingStatusTFilter>
  /** Filter by the object’s `licensePlate` field. */
  licensePlate?: Maybe<StringFilter>
  /** Filter by the object’s `startTime` field. */
  startTime?: Maybe<DatetimeFilter>
  /** Filter by the object’s `endTime` field. */
  endTime?: Maybe<DatetimeFilter>
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>
  /** Filter by the object’s `phone` field. */
  phone?: Maybe<PhoneUsFilter>
  /** Filter by the object’s `checkInAt` field. */
  checkInAt?: Maybe<DatetimeFilter>
  /** Filter by the object’s `checkOutAt` field. */
  checkOutAt?: Maybe<DatetimeFilter>
  /** Filter by the object’s `paymentReceiptId` field. */
  paymentReceiptId?: Maybe<UuidFilter>
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<SlotBookingFilter>>
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<SlotBookingFilter>>
  /** Negates the expression. */
  not?: Maybe<SlotBookingFilter>
}

/** A filter to be used against BookingStatusT fields. All fields are combined with a logical ‘and.’ */
export type BookingStatusTFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>
  /** Equal to the specified value. */
  equalTo?: Maybe<BookingStatusT>
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<BookingStatusT>
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<BookingStatusT>
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<BookingStatusT>
  /** Included in the specified list. */
  in?: Maybe<Array<BookingStatusT>>
  /** Not included in the specified list. */
  notIn?: Maybe<Array<BookingStatusT>>
  /** Less than the specified value. */
  lessThan?: Maybe<BookingStatusT>
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<BookingStatusT>
  /** Greater than the specified value. */
  greaterThan?: Maybe<BookingStatusT>
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<BookingStatusT>
}

/** A connection to a list of `SlotBooking` values. */
export type SlotBookingsConnection = {
  /** A list of `SlotBooking` objects. */
  nodes: Array<SlotBooking>
  /** A list of edges which contains the `SlotBooking` and cursor to aid in pagination. */
  edges: Array<SlotBookingsEdge>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `SlotBooking` you could get from the connection. */
  totalCount: Scalars['Int']
}

export type SlotBooking = Node & {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']
  id: Scalars['UUID']
  slotId?: Maybe<Scalars['UUID']>
  userId?: Maybe<Scalars['UUID']>
  status?: Maybe<BookingStatusT>
  licensePlate?: Maybe<Scalars['String']>
  startTime?: Maybe<Scalars['Datetime']>
  endTime?: Maybe<Scalars['Datetime']>
  createdAt?: Maybe<Scalars['Datetime']>
  phone?: Maybe<Scalars['PhoneUs']>
  checkInAt?: Maybe<Scalars['Datetime']>
  checkOutAt?: Maybe<Scalars['Datetime']>
  paymentReceiptId?: Maybe<Scalars['UUID']>
  /** Reads a single `Slot` that is related to this `SlotBooking`. */
  slot?: Maybe<Slot>
  /** Reads a single `User` that is related to this `SlotBooking`. */
  user?: Maybe<User>
  /** Reads a single `PaymentReceipt` that is related to this `SlotBooking`. */
  paymentReceipt?: Maybe<PaymentReceipt>
}

/** A `SlotBooking` edge in the connection. */
export type SlotBookingsEdge = {
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `SlotBooking` at the end of the edge. */
  node: SlotBooking
}

/** A connection to a list of `Slot` values, with data from `SlotBooking`. */
export type PaymentReceiptSlotsBySlotBookingPaymentReceiptIdAndSlotIdManyToManyConnection = {
  /** A list of `Slot` objects. */
  nodes: Array<Slot>
  /** A list of edges which contains the `Slot`, info from the `SlotBooking`, and the cursor to aid in pagination. */
  edges: Array<PaymentReceiptSlotsBySlotBookingPaymentReceiptIdAndSlotIdManyToManyEdge>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `Slot` you could get from the connection. */
  totalCount: Scalars['Int']
}

/** A `Slot` edge in the connection, with data from `SlotBooking`. */
export type PaymentReceiptSlotsBySlotBookingPaymentReceiptIdAndSlotIdManyToManyEdge = {
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `Slot` at the end of the edge. */
  node: Slot
  /** Reads and enables pagination through a set of `SlotBooking`. */
  slotBookings: SlotBookingsConnection
  /** Reads and enables pagination through a set of `SlotBooking`. */
  slotBookingsList: Array<SlotBooking>
}

/** A `Slot` edge in the connection, with data from `SlotBooking`. */
export type PaymentReceiptSlotsBySlotBookingPaymentReceiptIdAndSlotIdManyToManyEdgeSlotBookingsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<SlotBookingsOrderBy>>
  condition?: Maybe<SlotBookingCondition>
  filter?: Maybe<SlotBookingFilter>
}

/** A `Slot` edge in the connection, with data from `SlotBooking`. */
export type PaymentReceiptSlotsBySlotBookingPaymentReceiptIdAndSlotIdManyToManyEdgeSlotBookingsListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<SlotBookingsOrderBy>>
  condition?: Maybe<SlotBookingCondition>
  filter?: Maybe<SlotBookingFilter>
}

/** A connection to a list of `User` values, with data from `SlotBooking`. */
export type PaymentReceiptUsersBySlotBookingPaymentReceiptIdAndUserIdManyToManyConnection = {
  /** A list of `User` objects. */
  nodes: Array<User>
  /** A list of edges which contains the `User`, info from the `SlotBooking`, and the cursor to aid in pagination. */
  edges: Array<PaymentReceiptUsersBySlotBookingPaymentReceiptIdAndUserIdManyToManyEdge>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int']
}

/** A `User` edge in the connection, with data from `SlotBooking`. */
export type PaymentReceiptUsersBySlotBookingPaymentReceiptIdAndUserIdManyToManyEdge = {
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `User` at the end of the edge. */
  node: User
  /** Reads and enables pagination through a set of `SlotBooking`. */
  slotBookings: SlotBookingsConnection
  /** Reads and enables pagination through a set of `SlotBooking`. */
  slotBookingsList: Array<SlotBooking>
}

/** A `User` edge in the connection, with data from `SlotBooking`. */
export type PaymentReceiptUsersBySlotBookingPaymentReceiptIdAndUserIdManyToManyEdgeSlotBookingsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<SlotBookingsOrderBy>>
  condition?: Maybe<SlotBookingCondition>
  filter?: Maybe<SlotBookingFilter>
}

/** A `User` edge in the connection, with data from `SlotBooking`. */
export type PaymentReceiptUsersBySlotBookingPaymentReceiptIdAndUserIdManyToManyEdgeSlotBookingsListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<SlotBookingsOrderBy>>
  condition?: Maybe<SlotBookingCondition>
  filter?: Maybe<SlotBookingFilter>
}

/** A `PaymentReceipt` edge in the connection. */
export type PaymentReceiptsEdge = {
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `PaymentReceipt` at the end of the edge. */
  node: PaymentReceipt
}

/** A connection to a list of `VehicleSize` values, with data from `Slot`. */
export type UserVehicleSizesBySlotOwnerIdAndVehicleSizeIdManyToManyConnection = {
  /** A list of `VehicleSize` objects. */
  nodes: Array<VehicleSize>
  /** A list of edges which contains the `VehicleSize`, info from the `Slot`, and the cursor to aid in pagination. */
  edges: Array<UserVehicleSizesBySlotOwnerIdAndVehicleSizeIdManyToManyEdge>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `VehicleSize` you could get from the connection. */
  totalCount: Scalars['Int']
}

/** A `VehicleSize` edge in the connection, with data from `Slot`. */
export type UserVehicleSizesBySlotOwnerIdAndVehicleSizeIdManyToManyEdge = {
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `VehicleSize` at the end of the edge. */
  node: VehicleSize
  /** Reads and enables pagination through a set of `Slot`. */
  slots: SlotsConnection
  /** Reads and enables pagination through a set of `Slot`. */
  slotsList: Array<Slot>
}

/** A `VehicleSize` edge in the connection, with data from `Slot`. */
export type UserVehicleSizesBySlotOwnerIdAndVehicleSizeIdManyToManyEdgeSlotsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<SlotsOrderBy>>
  condition?: Maybe<SlotCondition>
  filter?: Maybe<SlotFilter>
}

/** A `VehicleSize` edge in the connection, with data from `Slot`. */
export type UserVehicleSizesBySlotOwnerIdAndVehicleSizeIdManyToManyEdgeSlotsListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<SlotsOrderBy>>
  condition?: Maybe<SlotCondition>
  filter?: Maybe<SlotFilter>
}

/** A connection to a list of `ParkingSpace` values, with data from `Slot`. */
export type UserParkingSpacesBySlotOwnerIdAndParkingSpaceIdManyToManyConnection = {
  /** A list of `ParkingSpace` objects. */
  nodes: Array<ParkingSpace>
  /** A list of edges which contains the `ParkingSpace`, info from the `Slot`, and the cursor to aid in pagination. */
  edges: Array<UserParkingSpacesBySlotOwnerIdAndParkingSpaceIdManyToManyEdge>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `ParkingSpace` you could get from the connection. */
  totalCount: Scalars['Int']
}

/** A `ParkingSpace` edge in the connection, with data from `Slot`. */
export type UserParkingSpacesBySlotOwnerIdAndParkingSpaceIdManyToManyEdge = {
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `ParkingSpace` at the end of the edge. */
  node: ParkingSpace
  /** Reads and enables pagination through a set of `Slot`. */
  slots: SlotsConnection
  /** Reads and enables pagination through a set of `Slot`. */
  slotsList: Array<Slot>
}

/** A `ParkingSpace` edge in the connection, with data from `Slot`. */
export type UserParkingSpacesBySlotOwnerIdAndParkingSpaceIdManyToManyEdgeSlotsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<SlotsOrderBy>>
  condition?: Maybe<SlotCondition>
  filter?: Maybe<SlotFilter>
}

/** A `ParkingSpace` edge in the connection, with data from `Slot`. */
export type UserParkingSpacesBySlotOwnerIdAndParkingSpaceIdManyToManyEdgeSlotsListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<SlotsOrderBy>>
  condition?: Maybe<SlotCondition>
  filter?: Maybe<SlotFilter>
}

/** A connection to a list of `GeodataProvider` values, with data from `Slot`. */
export type UserGeodataProvidersBySlotOwnerIdAndMapSourceManyToManyConnection = {
  /** A list of `GeodataProvider` objects. */
  nodes: Array<GeodataProvider>
  /** A list of edges which contains the `GeodataProvider`, info from the `Slot`, and the cursor to aid in pagination. */
  edges: Array<UserGeodataProvidersBySlotOwnerIdAndMapSourceManyToManyEdge>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `GeodataProvider` you could get from the connection. */
  totalCount: Scalars['Int']
}

/** A `GeodataProvider` edge in the connection, with data from `Slot`. */
export type UserGeodataProvidersBySlotOwnerIdAndMapSourceManyToManyEdge = {
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `GeodataProvider` at the end of the edge. */
  node: GeodataProvider
  /** Reads and enables pagination through a set of `Slot`. */
  slotsByMapSource: SlotsConnection
  /** Reads and enables pagination through a set of `Slot`. */
  slotsByMapSourceList: Array<Slot>
}

/** A `GeodataProvider` edge in the connection, with data from `Slot`. */
export type UserGeodataProvidersBySlotOwnerIdAndMapSourceManyToManyEdgeSlotsByMapSourceArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<SlotsOrderBy>>
  condition?: Maybe<SlotCondition>
  filter?: Maybe<SlotFilter>
}

/** A `GeodataProvider` edge in the connection, with data from `Slot`. */
export type UserGeodataProvidersBySlotOwnerIdAndMapSourceManyToManyEdgeSlotsByMapSourceListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<SlotsOrderBy>>
  condition?: Maybe<SlotCondition>
  filter?: Maybe<SlotFilter>
}

/** A connection to a list of `VehicleType` values, with data from `Vehicle`. */
export type UserVehicleTypesByVehicleOwnerIdAndVehicleTypeIdManyToManyConnection = {
  /** A list of `VehicleType` objects. */
  nodes: Array<VehicleType>
  /** A list of edges which contains the `VehicleType`, info from the `Vehicle`, and the cursor to aid in pagination. */
  edges: Array<UserVehicleTypesByVehicleOwnerIdAndVehicleTypeIdManyToManyEdge>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `VehicleType` you could get from the connection. */
  totalCount: Scalars['Int']
}

/** A `VehicleType` edge in the connection, with data from `Vehicle`. */
export type UserVehicleTypesByVehicleOwnerIdAndVehicleTypeIdManyToManyEdge = {
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `VehicleType` at the end of the edge. */
  node: VehicleType
  /** Reads and enables pagination through a set of `Vehicle`. */
  vehicles: VehiclesConnection
  /** Reads and enables pagination through a set of `Vehicle`. */
  vehiclesList: Array<Vehicle>
}

/** A `VehicleType` edge in the connection, with data from `Vehicle`. */
export type UserVehicleTypesByVehicleOwnerIdAndVehicleTypeIdManyToManyEdgeVehiclesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<VehiclesOrderBy>>
  condition?: Maybe<VehicleCondition>
  filter?: Maybe<VehicleFilter>
}

/** A `VehicleType` edge in the connection, with data from `Vehicle`. */
export type UserVehicleTypesByVehicleOwnerIdAndVehicleTypeIdManyToManyEdgeVehiclesListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<VehiclesOrderBy>>
  condition?: Maybe<VehicleCondition>
  filter?: Maybe<VehicleFilter>
}

/** A connection to a list of `VehicleSize` values, with data from `Vehicle`. */
export type UserVehicleSizesByVehicleOwnerIdAndVehicleSizeIdManyToManyConnection = {
  /** A list of `VehicleSize` objects. */
  nodes: Array<VehicleSize>
  /** A list of edges which contains the `VehicleSize`, info from the `Vehicle`, and the cursor to aid in pagination. */
  edges: Array<UserVehicleSizesByVehicleOwnerIdAndVehicleSizeIdManyToManyEdge>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `VehicleSize` you could get from the connection. */
  totalCount: Scalars['Int']
}

/** A `VehicleSize` edge in the connection, with data from `Vehicle`. */
export type UserVehicleSizesByVehicleOwnerIdAndVehicleSizeIdManyToManyEdge = {
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `VehicleSize` at the end of the edge. */
  node: VehicleSize
  /** Reads and enables pagination through a set of `Vehicle`. */
  vehicles: VehiclesConnection
  /** Reads and enables pagination through a set of `Vehicle`. */
  vehiclesList: Array<Vehicle>
}

/** A `VehicleSize` edge in the connection, with data from `Vehicle`. */
export type UserVehicleSizesByVehicleOwnerIdAndVehicleSizeIdManyToManyEdgeVehiclesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<VehiclesOrderBy>>
  condition?: Maybe<VehicleCondition>
  filter?: Maybe<VehicleFilter>
}

/** A `VehicleSize` edge in the connection, with data from `Vehicle`. */
export type UserVehicleSizesByVehicleOwnerIdAndVehicleSizeIdManyToManyEdgeVehiclesListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<VehiclesOrderBy>>
  condition?: Maybe<VehicleCondition>
  filter?: Maybe<VehicleFilter>
}

/** A connection to a list of `BillingProfile` values, with data from `UserSubscription`. */
export type UserBillingProfilesByUserSubscriptionUserIdAndBillingProfileIdManyToManyConnection = {
  /** A list of `BillingProfile` objects. */
  nodes: Array<BillingProfile>
  /** A list of edges which contains the `BillingProfile`, info from the `UserSubscription`, and the cursor to aid in pagination. */
  edges: Array<UserBillingProfilesByUserSubscriptionUserIdAndBillingProfileIdManyToManyEdge>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `BillingProfile` you could get from the connection. */
  totalCount: Scalars['Int']
}

/** A `BillingProfile` edge in the connection, with data from `UserSubscription`. */
export type UserBillingProfilesByUserSubscriptionUserIdAndBillingProfileIdManyToManyEdge = {
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `BillingProfile` at the end of the edge. */
  node: BillingProfile
  /** Reads and enables pagination through a set of `UserSubscription`. */
  userSubscriptions: UserSubscriptionsConnection
  /** Reads and enables pagination through a set of `UserSubscription`. */
  userSubscriptionsList: Array<UserSubscription>
}

/** A `BillingProfile` edge in the connection, with data from `UserSubscription`. */
export type UserBillingProfilesByUserSubscriptionUserIdAndBillingProfileIdManyToManyEdgeUserSubscriptionsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<UserSubscriptionsOrderBy>>
  condition?: Maybe<UserSubscriptionCondition>
  filter?: Maybe<UserSubscriptionFilter>
}

/** A `BillingProfile` edge in the connection, with data from `UserSubscription`. */
export type UserBillingProfilesByUserSubscriptionUserIdAndBillingProfileIdManyToManyEdgeUserSubscriptionsListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<UserSubscriptionsOrderBy>>
  condition?: Maybe<UserSubscriptionCondition>
  filter?: Maybe<UserSubscriptionFilter>
}

/** A connection to a list of `Slot` values, with data from `SlotBooking`. */
export type UserSlotsBySlotBookingUserIdAndSlotIdManyToManyConnection = {
  /** A list of `Slot` objects. */
  nodes: Array<Slot>
  /** A list of edges which contains the `Slot`, info from the `SlotBooking`, and the cursor to aid in pagination. */
  edges: Array<UserSlotsBySlotBookingUserIdAndSlotIdManyToManyEdge>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `Slot` you could get from the connection. */
  totalCount: Scalars['Int']
}

/** A `Slot` edge in the connection, with data from `SlotBooking`. */
export type UserSlotsBySlotBookingUserIdAndSlotIdManyToManyEdge = {
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `Slot` at the end of the edge. */
  node: Slot
  /** Reads and enables pagination through a set of `SlotBooking`. */
  slotBookings: SlotBookingsConnection
  /** Reads and enables pagination through a set of `SlotBooking`. */
  slotBookingsList: Array<SlotBooking>
}

/** A `Slot` edge in the connection, with data from `SlotBooking`. */
export type UserSlotsBySlotBookingUserIdAndSlotIdManyToManyEdgeSlotBookingsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<SlotBookingsOrderBy>>
  condition?: Maybe<SlotBookingCondition>
  filter?: Maybe<SlotBookingFilter>
}

/** A `Slot` edge in the connection, with data from `SlotBooking`. */
export type UserSlotsBySlotBookingUserIdAndSlotIdManyToManyEdgeSlotBookingsListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<SlotBookingsOrderBy>>
  condition?: Maybe<SlotBookingCondition>
  filter?: Maybe<SlotBookingFilter>
}

/** A connection to a list of `PaymentReceipt` values, with data from `SlotBooking`. */
export type UserPaymentReceiptsBySlotBookingUserIdAndPaymentReceiptIdManyToManyConnection = {
  /** A list of `PaymentReceipt` objects. */
  nodes: Array<PaymentReceipt>
  /** A list of edges which contains the `PaymentReceipt`, info from the `SlotBooking`, and the cursor to aid in pagination. */
  edges: Array<UserPaymentReceiptsBySlotBookingUserIdAndPaymentReceiptIdManyToManyEdge>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `PaymentReceipt` you could get from the connection. */
  totalCount: Scalars['Int']
}

/** A `PaymentReceipt` edge in the connection, with data from `SlotBooking`. */
export type UserPaymentReceiptsBySlotBookingUserIdAndPaymentReceiptIdManyToManyEdge = {
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `PaymentReceipt` at the end of the edge. */
  node: PaymentReceipt
  /** Reads and enables pagination through a set of `SlotBooking`. */
  slotBookings: SlotBookingsConnection
  /** Reads and enables pagination through a set of `SlotBooking`. */
  slotBookingsList: Array<SlotBooking>
}

/** A `PaymentReceipt` edge in the connection, with data from `SlotBooking`. */
export type UserPaymentReceiptsBySlotBookingUserIdAndPaymentReceiptIdManyToManyEdgeSlotBookingsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<SlotBookingsOrderBy>>
  condition?: Maybe<SlotBookingCondition>
  filter?: Maybe<SlotBookingFilter>
}

/** A `PaymentReceipt` edge in the connection, with data from `SlotBooking`. */
export type UserPaymentReceiptsBySlotBookingUserIdAndPaymentReceiptIdManyToManyEdgeSlotBookingsListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<SlotBookingsOrderBy>>
  condition?: Maybe<SlotBookingCondition>
  filter?: Maybe<SlotBookingFilter>
}

/** Methods to use when ordering `SlotAvailability`. */
export enum SlotAvailabilitiesOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  SlotIdAsc = 'SLOT_ID_ASC',
  SlotIdDesc = 'SLOT_ID_DESC',
  DayOfWeekAsc = 'DAY_OF_WEEK_ASC',
  DayOfWeekDesc = 'DAY_OF_WEEK_DESC',
  StartHourAsc = 'START_HOUR_ASC',
  StartHourDesc = 'START_HOUR_DESC',
  EndHourAsc = 'END_HOUR_ASC',
  EndHourDesc = 'END_HOUR_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  TariffPerHourAsc = 'TARIFF_PER_HOUR_ASC',
  TariffPerHourDesc = 'TARIFF_PER_HOUR_DESC',
  CancelChargeAsc = 'CANCEL_CHARGE_ASC',
  CancelChargeDesc = 'CANCEL_CHARGE_DESC',
  TariffCurrencyAsc = 'TARIFF_CURRENCY_ASC',
  TariffCurrencyDesc = 'TARIFF_CURRENCY_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  SlotBySlotIdIdAsc = 'SLOT_BY_SLOT_ID__ID_ASC',
  SlotBySlotIdIdDesc = 'SLOT_BY_SLOT_ID__ID_DESC',
  SlotBySlotIdNameAsc = 'SLOT_BY_SLOT_ID__NAME_ASC',
  SlotBySlotIdNameDesc = 'SLOT_BY_SLOT_ID__NAME_DESC',
  SlotBySlotIdOwnerIdAsc = 'SLOT_BY_SLOT_ID__OWNER_ID_ASC',
  SlotBySlotIdOwnerIdDesc = 'SLOT_BY_SLOT_ID__OWNER_ID_DESC',
  SlotBySlotIdVehicleSizeIdAsc = 'SLOT_BY_SLOT_ID__VEHICLE_SIZE_ID_ASC',
  SlotBySlotIdVehicleSizeIdDesc = 'SLOT_BY_SLOT_ID__VEHICLE_SIZE_ID_DESC',
  SlotBySlotIdAddressAsc = 'SLOT_BY_SLOT_ID__ADDRESS_ASC',
  SlotBySlotIdAddressDesc = 'SLOT_BY_SLOT_ID__ADDRESS_DESC',
  SlotBySlotIdTimezoneAsc = 'SLOT_BY_SLOT_ID__TIMEZONE_ASC',
  SlotBySlotIdTimezoneDesc = 'SLOT_BY_SLOT_ID__TIMEZONE_DESC',
  SlotBySlotIdPricePerHourAsc = 'SLOT_BY_SLOT_ID__PRICE_PER_HOUR_ASC',
  SlotBySlotIdPricePerHourDesc = 'SLOT_BY_SLOT_ID__PRICE_PER_HOUR_DESC',
  SlotBySlotIdStatusAsc = 'SLOT_BY_SLOT_ID__STATUS_ASC',
  SlotBySlotIdStatusDesc = 'SLOT_BY_SLOT_ID__STATUS_DESC',
  SlotBySlotIdPhotoUrlAsc = 'SLOT_BY_SLOT_ID__PHOTO_URL_ASC',
  SlotBySlotIdPhotoUrlDesc = 'SLOT_BY_SLOT_ID__PHOTO_URL_DESC',
  SlotBySlotIdDescriptionAsc = 'SLOT_BY_SLOT_ID__DESCRIPTION_ASC',
  SlotBySlotIdDescriptionDesc = 'SLOT_BY_SLOT_ID__DESCRIPTION_DESC',
  SlotBySlotIdNotesAsc = 'SLOT_BY_SLOT_ID__NOTES_ASC',
  SlotBySlotIdNotesDesc = 'SLOT_BY_SLOT_ID__NOTES_DESC',
  SlotBySlotIdSlugAsc = 'SLOT_BY_SLOT_ID__SLUG_ASC',
  SlotBySlotIdSlugDesc = 'SLOT_BY_SLOT_ID__SLUG_DESC',
  SlotBySlotIdCreatedAtAsc = 'SLOT_BY_SLOT_ID__CREATED_AT_ASC',
  SlotBySlotIdCreatedAtDesc = 'SLOT_BY_SLOT_ID__CREATED_AT_DESC',
  SlotBySlotIdUpdatedAtAsc = 'SLOT_BY_SLOT_ID__UPDATED_AT_ASC',
  SlotBySlotIdUpdatedAtDesc = 'SLOT_BY_SLOT_ID__UPDATED_AT_DESC',
  SlotBySlotIdDeletedAsc = 'SLOT_BY_SLOT_ID__DELETED_ASC',
  SlotBySlotIdDeletedDesc = 'SLOT_BY_SLOT_ID__DELETED_DESC',
  SlotBySlotIdDeletedAtAsc = 'SLOT_BY_SLOT_ID__DELETED_AT_ASC',
  SlotBySlotIdDeletedAtDesc = 'SLOT_BY_SLOT_ID__DELETED_AT_DESC',
  SlotBySlotIdVerificationStatusAsc = 'SLOT_BY_SLOT_ID__VERIFICATION_STATUS_ASC',
  SlotBySlotIdVerificationStatusDesc = 'SLOT_BY_SLOT_ID__VERIFICATION_STATUS_DESC',
  SlotBySlotIdParkingSpaceIdAsc = 'SLOT_BY_SLOT_ID__PARKING_SPACE_ID_ASC',
  SlotBySlotIdParkingSpaceIdDesc = 'SLOT_BY_SLOT_ID__PARKING_SPACE_ID_DESC',
  SlotBySlotIdLocationAsc = 'SLOT_BY_SLOT_ID__LOCATION_ASC',
  SlotBySlotIdLocationDesc = 'SLOT_BY_SLOT_ID__LOCATION_DESC',
  SlotBySlotIdShapeAsc = 'SLOT_BY_SLOT_ID__SHAPE_ASC',
  SlotBySlotIdShapeDesc = 'SLOT_BY_SLOT_ID__SHAPE_DESC',
  SlotBySlotIdAccessRestrictionsAsc = 'SLOT_BY_SLOT_ID__ACCESS_RESTRICTIONS_ASC',
  SlotBySlotIdAccessRestrictionsDesc = 'SLOT_BY_SLOT_ID__ACCESS_RESTRICTIONS_DESC',
  SlotBySlotIdBusinessStatusAsc = 'SLOT_BY_SLOT_ID__BUSINESS_STATUS_ASC',
  SlotBySlotIdBusinessStatusDesc = 'SLOT_BY_SLOT_ID__BUSINESS_STATUS_DESC',
  SlotBySlotIdBusinessStatusReasonAsc = 'SLOT_BY_SLOT_ID__BUSINESS_STATUS_REASON_ASC',
  SlotBySlotIdBusinessStatusReasonDesc = 'SLOT_BY_SLOT_ID__BUSINESS_STATUS_REASON_DESC',
  SlotBySlotIdCategoryAsc = 'SLOT_BY_SLOT_ID__CATEGORY_ASC',
  SlotBySlotIdCategoryDesc = 'SLOT_BY_SLOT_ID__CATEGORY_DESC',
  SlotBySlotIdContributorIdAsc = 'SLOT_BY_SLOT_ID__CONTRIBUTOR_ID_ASC',
  SlotBySlotIdContributorIdDesc = 'SLOT_BY_SLOT_ID__CONTRIBUTOR_ID_DESC',
  SlotBySlotIdLevelAsc = 'SLOT_BY_SLOT_ID__LEVEL_ASC',
  SlotBySlotIdLevelDesc = 'SLOT_BY_SLOT_ID__LEVEL_DESC',
  SlotBySlotIdMapSourceAsc = 'SLOT_BY_SLOT_ID__MAP_SOURCE_ASC',
  SlotBySlotIdMapSourceDesc = 'SLOT_BY_SLOT_ID__MAP_SOURCE_DESC',
  SlotBySlotIdSlotDimensionsAsc = 'SLOT_BY_SLOT_ID__SLOT_DIMENSIONS_ASC',
  SlotBySlotIdSlotDimensionsDesc = 'SLOT_BY_SLOT_ID__SLOT_DIMENSIONS_DESC',
  SlotBySlotIdTempUnavailableAsc = 'SLOT_BY_SLOT_ID__TEMP_UNAVAILABLE_ASC',
  SlotBySlotIdTempUnavailableDesc = 'SLOT_BY_SLOT_ID__TEMP_UNAVAILABLE_DESC',
  SlotBySlotIdTempUnavailableFromAsc = 'SLOT_BY_SLOT_ID__TEMP_UNAVAILABLE_FROM_ASC',
  SlotBySlotIdTempUnavailableFromDesc = 'SLOT_BY_SLOT_ID__TEMP_UNAVAILABLE_FROM_DESC',
  SlotBySlotIdTempUnavailableToAsc = 'SLOT_BY_SLOT_ID__TEMP_UNAVAILABLE_TO_ASC',
  SlotBySlotIdTempUnavailableToDesc = 'SLOT_BY_SLOT_ID__TEMP_UNAVAILABLE_TO_DESC',
  SlotBySlotIdWaypointsAsc = 'SLOT_BY_SLOT_ID__WAYPOINTS_ASC',
  SlotBySlotIdWaypointsDesc = 'SLOT_BY_SLOT_ID__WAYPOINTS_DESC',
}

/** A condition to be used against `SlotAvailability` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type SlotAvailabilityCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>
  /** Checks for equality with the object’s `slotId` field. */
  slotId?: Maybe<Scalars['UUID']>
  /** Checks for equality with the object’s `dayOfWeek` field. */
  dayOfWeek?: Maybe<Scalars['Int']>
  /** Checks for equality with the object’s `startHour` field. */
  startHour?: Maybe<Scalars['Time']>
  /** Checks for equality with the object’s `endHour` field. */
  endHour?: Maybe<Scalars['Time']>
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>
  /** Checks for equality with the object’s `tariffPerHour` field. */
  tariffPerHour?: Maybe<Scalars['BigFloat']>
  /** Checks for equality with the object’s `cancelCharge` field. */
  cancelCharge?: Maybe<Scalars['BigFloat']>
  /** Checks for equality with the object’s `tariffCurrency` field. */
  tariffCurrency?: Maybe<Scalars['UUID']>
}

/** A filter to be used against `SlotAvailability` object types. All fields are combined with a logical ‘and.’ */
export type SlotAvailabilityFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<UuidFilter>
  /** Filter by the object’s `slotId` field. */
  slotId?: Maybe<UuidFilter>
  /** Filter by the object’s `dayOfWeek` field. */
  dayOfWeek?: Maybe<IntFilter>
  /** Filter by the object’s `startHour` field. */
  startHour?: Maybe<TimeFilter>
  /** Filter by the object’s `endHour` field. */
  endHour?: Maybe<TimeFilter>
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>
  /** Filter by the object’s `tariffPerHour` field. */
  tariffPerHour?: Maybe<BigFloatFilter>
  /** Filter by the object’s `cancelCharge` field. */
  cancelCharge?: Maybe<BigFloatFilter>
  /** Filter by the object’s `tariffCurrency` field. */
  tariffCurrency?: Maybe<UuidFilter>
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<SlotAvailabilityFilter>>
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<SlotAvailabilityFilter>>
  /** Negates the expression. */
  not?: Maybe<SlotAvailabilityFilter>
}

/** A connection to a list of `SlotAvailability` values. */
export type SlotAvailabilitiesConnection = {
  /** A list of `SlotAvailability` objects. */
  nodes: Array<SlotAvailability>
  /** A list of edges which contains the `SlotAvailability` and cursor to aid in pagination. */
  edges: Array<SlotAvailabilitiesEdge>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `SlotAvailability` you could get from the connection. */
  totalCount: Scalars['Int']
}

export type SlotAvailability = Node & {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']
  id: Scalars['UUID']
  slotId: Scalars['UUID']
  dayOfWeek: Scalars['Int']
  startHour: Scalars['Time']
  endHour: Scalars['Time']
  createdAt: Scalars['Datetime']
  tariffPerHour?: Maybe<Scalars['BigFloat']>
  cancelCharge?: Maybe<Scalars['BigFloat']>
  tariffCurrency?: Maybe<Scalars['UUID']>
  /** Reads a single `Slot` that is related to this `SlotAvailability`. */
  slot?: Maybe<Slot>
}

/** A `SlotAvailability` edge in the connection. */
export type SlotAvailabilitiesEdge = {
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `SlotAvailability` at the end of the edge. */
  node: SlotAvailability
}

/** A connection to a list of `Amenity` values, with data from `SlotAmenity`. */
export type SlotAmenitiesBySlotAmenitySlotIdAndAmenityIdManyToManyConnection = {
  /** A list of `Amenity` objects. */
  nodes: Array<Amenity>
  /** A list of edges which contains the `Amenity`, info from the `SlotAmenity`, and the cursor to aid in pagination. */
  edges: Array<SlotAmenitiesBySlotAmenitySlotIdAndAmenityIdManyToManyEdge>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `Amenity` you could get from the connection. */
  totalCount: Scalars['Int']
}

/** A `Amenity` edge in the connection, with data from `SlotAmenity`. */
export type SlotAmenitiesBySlotAmenitySlotIdAndAmenityIdManyToManyEdge = {
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `Amenity` at the end of the edge. */
  node: Amenity
  /** Reads and enables pagination through a set of `SlotAmenity`. */
  slotAmenities: SlotAmenitiesConnection
  /** Reads and enables pagination through a set of `SlotAmenity`. */
  slotAmenitiesList: Array<SlotAmenity>
}

/** A `Amenity` edge in the connection, with data from `SlotAmenity`. */
export type SlotAmenitiesBySlotAmenitySlotIdAndAmenityIdManyToManyEdgeSlotAmenitiesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<SlotAmenitiesOrderBy>>
  condition?: Maybe<SlotAmenityCondition>
  filter?: Maybe<SlotAmenityFilter>
}

/** A `Amenity` edge in the connection, with data from `SlotAmenity`. */
export type SlotAmenitiesBySlotAmenitySlotIdAndAmenityIdManyToManyEdgeSlotAmenitiesListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<SlotAmenitiesOrderBy>>
  condition?: Maybe<SlotAmenityCondition>
  filter?: Maybe<SlotAmenityFilter>
}

/** Methods to use when ordering `Currency`. */
export enum CurrenciesOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  CodeAsc = 'CODE_ASC',
  CodeDesc = 'CODE_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  SlotAvailabilitiesByTariffCurrencyCountAsc = 'SLOT_AVAILABILITIES_BY_TARIFF_CURRENCY__COUNT_ASC',
  SlotAvailabilitiesByTariffCurrencyCountDesc = 'SLOT_AVAILABILITIES_BY_TARIFF_CURRENCY__COUNT_DESC',
}

/** A condition to be used against `Currency` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type CurrencyCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>
  /** Checks for equality with the object’s `code` field. */
  code?: Maybe<Scalars['String']>
  /** Checks for equality with the object’s `name` field. */
  name?: Maybe<Scalars['String']>
  /** Checks for equality with the object’s `status` field. */
  status?: Maybe<StatusT>
}

/** A filter to be used against `Currency` object types. All fields are combined with a logical ‘and.’ */
export type CurrencyFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<UuidFilter>
  /** Filter by the object’s `code` field. */
  code?: Maybe<StringFilter>
  /** Filter by the object’s `name` field. */
  name?: Maybe<StringFilter>
  /** Filter by the object’s `status` field. */
  status?: Maybe<StatusTFilter>
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<CurrencyFilter>>
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<CurrencyFilter>>
  /** Negates the expression. */
  not?: Maybe<CurrencyFilter>
}

/** A connection to a list of `Currency` values, with data from `SlotAvailability`. */
export type SlotCurrenciesBySlotAvailabilitySlotIdAndTariffCurrencyManyToManyConnection = {
  /** A list of `Currency` objects. */
  nodes: Array<Currency>
  /** A list of edges which contains the `Currency`, info from the `SlotAvailability`, and the cursor to aid in pagination. */
  edges: Array<SlotCurrenciesBySlotAvailabilitySlotIdAndTariffCurrencyManyToManyEdge>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `Currency` you could get from the connection. */
  totalCount: Scalars['Int']
}

export type Currency = Node & {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']
  id: Scalars['UUID']
  code: Scalars['String']
  name: Scalars['String']
  status: StatusT
  /** Reads and enables pagination through a set of `SlotAvailability`. */
  slotAvailabilitiesByTariffCurrency: SlotAvailabilitiesConnection
  /** Reads and enables pagination through a set of `SlotAvailability`. */
  slotAvailabilitiesByTariffCurrencyList: Array<SlotAvailability>
  /** Reads and enables pagination through a set of `Slot`. */
  slotsBySlotAvailabilityTariffCurrencyAndSlotId: CurrencySlotsBySlotAvailabilityTariffCurrencyAndSlotIdManyToManyConnection
  /** Reads and enables pagination through a set of `Slot`. */
  slotsBySlotAvailabilityTariffCurrencyAndSlotIdList: Array<Slot>
}

export type CurrencySlotAvailabilitiesByTariffCurrencyArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<SlotAvailabilitiesOrderBy>>
  condition?: Maybe<SlotAvailabilityCondition>
  filter?: Maybe<SlotAvailabilityFilter>
}

export type CurrencySlotAvailabilitiesByTariffCurrencyListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<SlotAvailabilitiesOrderBy>>
  condition?: Maybe<SlotAvailabilityCondition>
  filter?: Maybe<SlotAvailabilityFilter>
}

export type CurrencySlotsBySlotAvailabilityTariffCurrencyAndSlotIdArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<SlotsOrderBy>>
  condition?: Maybe<SlotCondition>
  filter?: Maybe<SlotFilter>
}

export type CurrencySlotsBySlotAvailabilityTariffCurrencyAndSlotIdListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<SlotsOrderBy>>
  condition?: Maybe<SlotCondition>
  filter?: Maybe<SlotFilter>
}

/** A connection to a list of `Slot` values, with data from `SlotAvailability`. */
export type CurrencySlotsBySlotAvailabilityTariffCurrencyAndSlotIdManyToManyConnection = {
  /** A list of `Slot` objects. */
  nodes: Array<Slot>
  /** A list of edges which contains the `Slot`, info from the `SlotAvailability`, and the cursor to aid in pagination. */
  edges: Array<CurrencySlotsBySlotAvailabilityTariffCurrencyAndSlotIdManyToManyEdge>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `Slot` you could get from the connection. */
  totalCount: Scalars['Int']
}

/** A `Slot` edge in the connection, with data from `SlotAvailability`. */
export type CurrencySlotsBySlotAvailabilityTariffCurrencyAndSlotIdManyToManyEdge = {
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `Slot` at the end of the edge. */
  node: Slot
  /** Reads and enables pagination through a set of `SlotAvailability`. */
  slotAvailabilities: SlotAvailabilitiesConnection
  /** Reads and enables pagination through a set of `SlotAvailability`. */
  slotAvailabilitiesList: Array<SlotAvailability>
}

/** A `Slot` edge in the connection, with data from `SlotAvailability`. */
export type CurrencySlotsBySlotAvailabilityTariffCurrencyAndSlotIdManyToManyEdgeSlotAvailabilitiesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<SlotAvailabilitiesOrderBy>>
  condition?: Maybe<SlotAvailabilityCondition>
  filter?: Maybe<SlotAvailabilityFilter>
}

/** A `Slot` edge in the connection, with data from `SlotAvailability`. */
export type CurrencySlotsBySlotAvailabilityTariffCurrencyAndSlotIdManyToManyEdgeSlotAvailabilitiesListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<SlotAvailabilitiesOrderBy>>
  condition?: Maybe<SlotAvailabilityCondition>
  filter?: Maybe<SlotAvailabilityFilter>
}

/** A `Currency` edge in the connection, with data from `SlotAvailability`. */
export type SlotCurrenciesBySlotAvailabilitySlotIdAndTariffCurrencyManyToManyEdge = {
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `Currency` at the end of the edge. */
  node: Currency
  /** Reads and enables pagination through a set of `SlotAvailability`. */
  slotAvailabilitiesByTariffCurrency: SlotAvailabilitiesConnection
  /** Reads and enables pagination through a set of `SlotAvailability`. */
  slotAvailabilitiesByTariffCurrencyList: Array<SlotAvailability>
}

/** A `Currency` edge in the connection, with data from `SlotAvailability`. */
export type SlotCurrenciesBySlotAvailabilitySlotIdAndTariffCurrencyManyToManyEdgeSlotAvailabilitiesByTariffCurrencyArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<SlotAvailabilitiesOrderBy>>
  condition?: Maybe<SlotAvailabilityCondition>
  filter?: Maybe<SlotAvailabilityFilter>
}

/** A `Currency` edge in the connection, with data from `SlotAvailability`. */
export type SlotCurrenciesBySlotAvailabilitySlotIdAndTariffCurrencyManyToManyEdgeSlotAvailabilitiesByTariffCurrencyListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<SlotAvailabilitiesOrderBy>>
  condition?: Maybe<SlotAvailabilityCondition>
  filter?: Maybe<SlotAvailabilityFilter>
}

/** A connection to a list of `User` values, with data from `SlotBooking`. */
export type SlotUsersBySlotBookingSlotIdAndUserIdManyToManyConnection = {
  /** A list of `User` objects. */
  nodes: Array<User>
  /** A list of edges which contains the `User`, info from the `SlotBooking`, and the cursor to aid in pagination. */
  edges: Array<SlotUsersBySlotBookingSlotIdAndUserIdManyToManyEdge>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int']
}

/** A `User` edge in the connection, with data from `SlotBooking`. */
export type SlotUsersBySlotBookingSlotIdAndUserIdManyToManyEdge = {
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `User` at the end of the edge. */
  node: User
  /** Reads and enables pagination through a set of `SlotBooking`. */
  slotBookings: SlotBookingsConnection
  /** Reads and enables pagination through a set of `SlotBooking`. */
  slotBookingsList: Array<SlotBooking>
}

/** A `User` edge in the connection, with data from `SlotBooking`. */
export type SlotUsersBySlotBookingSlotIdAndUserIdManyToManyEdgeSlotBookingsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<SlotBookingsOrderBy>>
  condition?: Maybe<SlotBookingCondition>
  filter?: Maybe<SlotBookingFilter>
}

/** A `User` edge in the connection, with data from `SlotBooking`. */
export type SlotUsersBySlotBookingSlotIdAndUserIdManyToManyEdgeSlotBookingsListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<SlotBookingsOrderBy>>
  condition?: Maybe<SlotBookingCondition>
  filter?: Maybe<SlotBookingFilter>
}

/** A connection to a list of `PaymentReceipt` values, with data from `SlotBooking`. */
export type SlotPaymentReceiptsBySlotBookingSlotIdAndPaymentReceiptIdManyToManyConnection = {
  /** A list of `PaymentReceipt` objects. */
  nodes: Array<PaymentReceipt>
  /** A list of edges which contains the `PaymentReceipt`, info from the `SlotBooking`, and the cursor to aid in pagination. */
  edges: Array<SlotPaymentReceiptsBySlotBookingSlotIdAndPaymentReceiptIdManyToManyEdge>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `PaymentReceipt` you could get from the connection. */
  totalCount: Scalars['Int']
}

/** A `PaymentReceipt` edge in the connection, with data from `SlotBooking`. */
export type SlotPaymentReceiptsBySlotBookingSlotIdAndPaymentReceiptIdManyToManyEdge = {
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `PaymentReceipt` at the end of the edge. */
  node: PaymentReceipt
  /** Reads and enables pagination through a set of `SlotBooking`. */
  slotBookings: SlotBookingsConnection
  /** Reads and enables pagination through a set of `SlotBooking`. */
  slotBookingsList: Array<SlotBooking>
}

/** A `PaymentReceipt` edge in the connection, with data from `SlotBooking`. */
export type SlotPaymentReceiptsBySlotBookingSlotIdAndPaymentReceiptIdManyToManyEdgeSlotBookingsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<SlotBookingsOrderBy>>
  condition?: Maybe<SlotBookingCondition>
  filter?: Maybe<SlotBookingFilter>
}

/** A `PaymentReceipt` edge in the connection, with data from `SlotBooking`. */
export type SlotPaymentReceiptsBySlotBookingSlotIdAndPaymentReceiptIdManyToManyEdgeSlotBookingsListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<SlotBookingsOrderBy>>
  condition?: Maybe<SlotBookingCondition>
  filter?: Maybe<SlotBookingFilter>
}

/** A `SlotAmenity` edge in the connection. */
export type SlotAmenitiesEdge = {
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `SlotAmenity` at the end of the edge. */
  node: SlotAmenity
}

/** A connection to a list of `Slot` values, with data from `SlotAmenity`. */
export type AmenitySlotsBySlotAmenityAmenityIdAndSlotIdManyToManyConnection = {
  /** A list of `Slot` objects. */
  nodes: Array<Slot>
  /** A list of edges which contains the `Slot`, info from the `SlotAmenity`, and the cursor to aid in pagination. */
  edges: Array<AmenitySlotsBySlotAmenityAmenityIdAndSlotIdManyToManyEdge>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `Slot` you could get from the connection. */
  totalCount: Scalars['Int']
}

/** A `Slot` edge in the connection, with data from `SlotAmenity`. */
export type AmenitySlotsBySlotAmenityAmenityIdAndSlotIdManyToManyEdge = {
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `Slot` at the end of the edge. */
  node: Slot
  /** Reads and enables pagination through a set of `SlotAmenity`. */
  slotAmenities: SlotAmenitiesConnection
  /** Reads and enables pagination through a set of `SlotAmenity`. */
  slotAmenitiesList: Array<SlotAmenity>
}

/** A `Slot` edge in the connection, with data from `SlotAmenity`. */
export type AmenitySlotsBySlotAmenityAmenityIdAndSlotIdManyToManyEdgeSlotAmenitiesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<SlotAmenitiesOrderBy>>
  condition?: Maybe<SlotAmenityCondition>
  filter?: Maybe<SlotAmenityFilter>
}

/** A `Slot` edge in the connection, with data from `SlotAmenity`. */
export type AmenitySlotsBySlotAmenityAmenityIdAndSlotIdManyToManyEdgeSlotAmenitiesListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<SlotAmenitiesOrderBy>>
  condition?: Maybe<SlotAmenityCondition>
  filter?: Maybe<SlotAmenityFilter>
}

/** A `Amenity` edge in the connection. */
export type AmenitiesEdge = {
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `Amenity` at the end of the edge. */
  node: Amenity
}

/** Methods to use when ordering `Country`. */
export enum CountriesOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  CodeAsc = 'CODE_ASC',
  CodeDesc = 'CODE_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
}

/** A condition to be used against `Country` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type CountryCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>
  /** Checks for equality with the object’s `code` field. */
  code?: Maybe<Scalars['String']>
  /** Checks for equality with the object’s `name` field. */
  name?: Maybe<Scalars['String']>
  /** Checks for equality with the object’s `status` field. */
  status?: Maybe<StatusT>
}

/** A filter to be used against `Country` object types. All fields are combined with a logical ‘and.’ */
export type CountryFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<UuidFilter>
  /** Filter by the object’s `code` field. */
  code?: Maybe<StringFilter>
  /** Filter by the object’s `name` field. */
  name?: Maybe<StringFilter>
  /** Filter by the object’s `status` field. */
  status?: Maybe<StatusTFilter>
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<CountryFilter>>
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<CountryFilter>>
  /** Negates the expression. */
  not?: Maybe<CountryFilter>
}

/** A connection to a list of `Country` values. */
export type CountriesConnection = {
  /** A list of `Country` objects. */
  nodes: Array<Country>
  /** A list of edges which contains the `Country` and cursor to aid in pagination. */
  edges: Array<CountriesEdge>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `Country` you could get from the connection. */
  totalCount: Scalars['Int']
}

export type Country = Node & {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']
  id: Scalars['UUID']
  code: Scalars['String']
  name: Scalars['String']
  status: StatusT
}

/** A `Country` edge in the connection. */
export type CountriesEdge = {
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `Country` at the end of the edge. */
  node: Country
}

/** Methods to use when ordering `Language`. */
export enum LanguagesOrderBy {
  Natural = 'NATURAL',
  CodeAsc = 'CODE_ASC',
  CodeDesc = 'CODE_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  WeightAsc = 'WEIGHT_ASC',
  WeightDesc = 'WEIGHT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  TranslationsByLangCountAsc = 'TRANSLATIONS_BY_LANG__COUNT_ASC',
  TranslationsByLangCountDesc = 'TRANSLATIONS_BY_LANG__COUNT_DESC',
}

/** A condition to be used against `Language` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type LanguageCondition = {
  /** Checks for equality with the object’s `code` field. */
  code?: Maybe<Scalars['String']>
  /** Checks for equality with the object’s `name` field. */
  name?: Maybe<Scalars['String']>
  /** Checks for equality with the object’s `weight` field. */
  weight?: Maybe<Scalars['Int']>
}

/** A filter to be used against `Language` object types. All fields are combined with a logical ‘and.’ */
export type LanguageFilter = {
  /** Filter by the object’s `code` field. */
  code?: Maybe<StringFilter>
  /** Filter by the object’s `name` field. */
  name?: Maybe<StringFilter>
  /** Filter by the object’s `weight` field. */
  weight?: Maybe<IntFilter>
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<LanguageFilter>>
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<LanguageFilter>>
  /** Negates the expression. */
  not?: Maybe<LanguageFilter>
}

/** A connection to a list of `Language` values. */
export type LanguagesConnection = {
  /** A list of `Language` objects. */
  nodes: Array<Language>
  /** A list of edges which contains the `Language` and cursor to aid in pagination. */
  edges: Array<LanguagesEdge>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `Language` you could get from the connection. */
  totalCount: Scalars['Int']
}

export type Language = Node & {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']
  code: Scalars['String']
  name: Scalars['String']
  weight: Scalars['Int']
  /** Reads and enables pagination through a set of `Translation`. */
  translationsByLang: TranslationsConnection
  /** Reads and enables pagination through a set of `Translation`. */
  translationsByLangList: Array<Translation>
}

export type LanguageTranslationsByLangArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['Cursor']>
  after?: Maybe<Scalars['Cursor']>
  orderBy?: Maybe<Array<TranslationsOrderBy>>
  condition?: Maybe<TranslationCondition>
  filter?: Maybe<TranslationFilter>
}

export type LanguageTranslationsByLangListArgs = {
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Array<TranslationsOrderBy>>
  condition?: Maybe<TranslationCondition>
  filter?: Maybe<TranslationFilter>
}

/** Methods to use when ordering `Translation`. */
export enum TranslationsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  KeyAsc = 'KEY_ASC',
  KeyDesc = 'KEY_DESC',
  LangAsc = 'LANG_ASC',
  LangDesc = 'LANG_DESC',
  TranslationAsc = 'TRANSLATION_ASC',
  TranslationDesc = 'TRANSLATION_DESC',
  NamespaceAsc = 'NAMESPACE_ASC',
  NamespaceDesc = 'NAMESPACE_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  LanguageByLangCodeAsc = 'LANGUAGE_BY_LANG__CODE_ASC',
  LanguageByLangCodeDesc = 'LANGUAGE_BY_LANG__CODE_DESC',
  LanguageByLangNameAsc = 'LANGUAGE_BY_LANG__NAME_ASC',
  LanguageByLangNameDesc = 'LANGUAGE_BY_LANG__NAME_DESC',
  LanguageByLangWeightAsc = 'LANGUAGE_BY_LANG__WEIGHT_ASC',
  LanguageByLangWeightDesc = 'LANGUAGE_BY_LANG__WEIGHT_DESC',
}

/** A condition to be used against `Translation` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type TranslationCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>
  /** Checks for equality with the object’s `key` field. */
  key?: Maybe<Scalars['String']>
  /** Checks for equality with the object’s `lang` field. */
  lang?: Maybe<Scalars['String']>
  /** Checks for equality with the object’s `translation` field. */
  translation?: Maybe<Scalars['String']>
  /** Checks for equality with the object’s `namespace` field. */
  namespace?: Maybe<Scalars['String']>
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>
}

/** A filter to be used against `Translation` object types. All fields are combined with a logical ‘and.’ */
export type TranslationFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<UuidFilter>
  /** Filter by the object’s `key` field. */
  key?: Maybe<StringFilter>
  /** Filter by the object’s `lang` field. */
  lang?: Maybe<StringFilter>
  /** Filter by the object’s `translation` field. */
  translation?: Maybe<StringFilter>
  /** Filter by the object’s `namespace` field. */
  namespace?: Maybe<StringFilter>
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: Maybe<DatetimeFilter>
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<TranslationFilter>>
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<TranslationFilter>>
  /** Negates the expression. */
  not?: Maybe<TranslationFilter>
}

/** A connection to a list of `Translation` values. */
export type TranslationsConnection = {
  /** A list of `Translation` objects. */
  nodes: Array<Translation>
  /** A list of edges which contains the `Translation` and cursor to aid in pagination. */
  edges: Array<TranslationsEdge>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `Translation` you could get from the connection. */
  totalCount: Scalars['Int']
}

export type Translation = Node & {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']
  id: Scalars['UUID']
  key: Scalars['String']
  lang: Scalars['String']
  translation: Scalars['String']
  namespace?: Maybe<Scalars['String']>
  createdAt: Scalars['Datetime']
  updatedAt?: Maybe<Scalars['Datetime']>
  /** Reads a single `Language` that is related to this `Translation`. */
  languageByLang?: Maybe<Language>
}

/** A `Translation` edge in the connection. */
export type TranslationsEdge = {
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `Translation` at the end of the edge. */
  node: Translation
}

/** A `Language` edge in the connection. */
export type LanguagesEdge = {
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `Language` at the end of the edge. */
  node: Language
}

/** A connection to a list of `User` values. */
export type UsersConnection = {
  /** A list of `User` objects. */
  nodes: Array<User>
  /** A list of edges which contains the `User` and cursor to aid in pagination. */
  edges: Array<UsersEdge>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int']
}

/** A `User` edge in the connection. */
export type UsersEdge = {
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `User` at the end of the edge. */
  node: User
}

/** Methods to use when ordering `UserRole`. */
export enum UserRolesOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  ScopeAsc = 'SCOPE_ASC',
  ScopeDesc = 'SCOPE_DESC',
  MemberofAsc = 'MEMBEROF_ASC',
  MemberofDesc = 'MEMBEROF_DESC',
  UiAsc = 'UI_ASC',
  UiDesc = 'UI_DESC',
}

/** A condition to be used against `UserRole` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type UserRoleCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['String']>
  /** Checks for equality with the object’s `name` field. */
  name?: Maybe<Scalars['String']>
  /** Checks for equality with the object’s `scope` field. */
  scope?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Checks for equality with the object’s `memberof` field. */
  memberof?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Checks for equality with the object’s `ui` field. */
  ui?: Maybe<Scalars['Boolean']>
}

/** A filter to be used against `UserRole` object types. All fields are combined with a logical ‘and.’ */
export type UserRoleFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<StringFilter>
  /** Filter by the object’s `name` field. */
  name?: Maybe<StringFilter>
  /** Filter by the object’s `scope` field. */
  scope?: Maybe<StringListFilter>
  /** Filter by the object’s `memberof` field. */
  memberof?: Maybe<StringListFilter>
  /** Filter by the object’s `ui` field. */
  ui?: Maybe<BooleanFilter>
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<UserRoleFilter>>
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<UserRoleFilter>>
  /** Negates the expression. */
  not?: Maybe<UserRoleFilter>
}

/** A filter to be used against String List fields. All fields are combined with a logical ‘and.’ */
export type StringListFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>
  /** Equal to the specified value. */
  equalTo?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Less than the specified value. */
  lessThan?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Greater than the specified value. */
  greaterThan?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Contains the specified list of values. */
  contains?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Contained by the specified list of values. */
  containedBy?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Overlaps the specified list of values. */
  overlaps?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Any array item is equal to the specified value. */
  anyEqualTo?: Maybe<Scalars['String']>
  /** Any array item is not equal to the specified value. */
  anyNotEqualTo?: Maybe<Scalars['String']>
  /** Any array item is less than the specified value. */
  anyLessThan?: Maybe<Scalars['String']>
  /** Any array item is less than or equal to the specified value. */
  anyLessThanOrEqualTo?: Maybe<Scalars['String']>
  /** Any array item is greater than the specified value. */
  anyGreaterThan?: Maybe<Scalars['String']>
  /** Any array item is greater than or equal to the specified value. */
  anyGreaterThanOrEqualTo?: Maybe<Scalars['String']>
}

/** A connection to a list of `UserRole` values. */
export type UserRolesConnection = {
  /** A list of `UserRole` objects. */
  nodes: Array<UserRole>
  /** A list of edges which contains the `UserRole` and cursor to aid in pagination. */
  edges: Array<UserRolesEdge>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `UserRole` you could get from the connection. */
  totalCount: Scalars['Int']
}

export type UserRole = {
  id?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  scope?: Maybe<Array<Maybe<Scalars['String']>>>
  memberof?: Maybe<Array<Maybe<Scalars['String']>>>
  ui?: Maybe<Scalars['Boolean']>
}

/** A `UserRole` edge in the connection. */
export type UserRolesEdge = {
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `UserRole` at the end of the edge. */
  node: UserRole
}

/** A connection to a list of `VehicleSize` values. */
export type VehicleSizesConnection = {
  /** A list of `VehicleSize` objects. */
  nodes: Array<VehicleSize>
  /** A list of edges which contains the `VehicleSize` and cursor to aid in pagination. */
  edges: Array<VehicleSizesEdge>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `VehicleSize` you could get from the connection. */
  totalCount: Scalars['Int']
}

/** A `VehicleSize` edge in the connection. */
export type VehicleSizesEdge = {
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `VehicleSize` at the end of the edge. */
  node: VehicleSize
}

/** A connection to a list of `VehicleType` values. */
export type VehicleTypesConnection = {
  /** A list of `VehicleType` objects. */
  nodes: Array<VehicleType>
  /** A list of edges which contains the `VehicleType` and cursor to aid in pagination. */
  edges: Array<VehicleTypesEdge>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `VehicleType` you could get from the connection. */
  totalCount: Scalars['Int']
}

/** A `VehicleType` edge in the connection. */
export type VehicleTypesEdge = {
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `VehicleType` at the end of the edge. */
  node: VehicleType
}

/** An input for mutations affecting `ActiveBookingInputRecord` */
export type ActiveBookingInputRecordInput = {
  startTime?: Maybe<Scalars['Datetime']>
  interval?: Maybe<IntervalInput>
}

/** An interval of time that has passed where the smallest distinct unit is a second. */
export type IntervalInput = {
  /** A quantity of seconds. This is the only non-integer field, as all the other fields will dump their overflow into a smaller unit of time. Intervals don’t have a smaller unit than seconds. */
  seconds?: Maybe<Scalars['Float']>
  /** A quantity of minutes. */
  minutes?: Maybe<Scalars['Int']>
  /** A quantity of hours. */
  hours?: Maybe<Scalars['Int']>
  /** A quantity of days. */
  days?: Maybe<Scalars['Int']>
  /** A quantity of months. */
  months?: Maybe<Scalars['Int']>
  /** A quantity of years. */
  years?: Maybe<Scalars['Int']>
}

/** An input for mutations affecting `FindBusinessInputRecord` */
export type FindBusinessInputRecordInput = {
  latitude?: Maybe<Scalars['BigFloat']>
  longitude?: Maybe<Scalars['BigFloat']>
  distance?: Maybe<Scalars['Int']>
  totalLimit?: Maybe<Scalars['Int']>
  ownerId?: Maybe<Scalars['UUID']>
}

/** A filter to be used against `FindBusinessResult` object types. All fields are combined with a logical ‘and.’ */
export type FindBusinessResultFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<UuidFilter>
  /** Filter by the object’s `ownerId` field. */
  ownerId?: Maybe<UuidFilter>
  /** Filter by the object’s `name` field. */
  name?: Maybe<StringFilter>
  /** Filter by the object’s `description` field. */
  description?: Maybe<StringFilter>
  /** Filter by the object’s `photoUrl` field. */
  photoUrl?: Maybe<StringFilter>
  /** Filter by the object’s `markerUrl` field. */
  markerUrl?: Maybe<StringFilter>
  /** Filter by the object’s `location` field. */
  location?: Maybe<GeographyPointFilter>
  /** Filter by the object’s `slug` field. */
  slug?: Maybe<StringFilter>
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>
  /** Filter by the object’s `distance` field. */
  distance?: Maybe<IntFilter>
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<FindBusinessResultFilter>>
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<FindBusinessResultFilter>>
  /** Negates the expression. */
  not?: Maybe<FindBusinessResultFilter>
}

/** A connection to a list of `FindBusinessResult` values. */
export type FindBusinessResultsConnection = {
  /** A list of `FindBusinessResult` objects. */
  nodes: Array<FindBusinessResult>
  /** A list of edges which contains the `FindBusinessResult` and cursor to aid in pagination. */
  edges: Array<FindBusinessResultsEdge>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `FindBusinessResult` you could get from the connection. */
  totalCount: Scalars['Int']
}

export type FindBusinessResult = {
  id: Scalars['UUID']
  ownerId: Scalars['UUID']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  address?: Maybe<Scalars['JSON']>
  photoUrl?: Maybe<Scalars['String']>
  markerUrl?: Maybe<Scalars['String']>
  location: GeographyPoint
  slug?: Maybe<Scalars['String']>
  createdAt: Scalars['Datetime']
  distance?: Maybe<Scalars['Int']>
}

/** A `FindBusinessResult` edge in the connection. */
export type FindBusinessResultsEdge = {
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `FindBusinessResult` at the end of the edge. */
  node: FindBusinessResult
}

/** An input for mutations affecting `FindSlotsInputRecord` */
export type FindSlotsInputRecordInput = {
  latitude?: Maybe<Scalars['BigFloat']>
  longitude?: Maybe<Scalars['BigFloat']>
  startTime?: Maybe<Scalars['Datetime']>
  endTime?: Maybe<Scalars['Datetime']>
  distance?: Maybe<Scalars['Int']>
  totalLimit?: Maybe<Scalars['Int']>
  ownerId?: Maybe<Scalars['UUID']>
  slotAmenities?: Maybe<Array<Maybe<Scalars['UUID']>>>
  vehicleSizes?: Maybe<Array<Maybe<Scalars['UUID']>>>
}

/** A filter to be used against `FindSlotsResult` object types. All fields are combined with a logical ‘and.’ */
export type FindSlotsResultFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<UuidFilter>
  /** Filter by the object’s `status` field. */
  status?: Maybe<SlotStatusTFilter>
  /** Filter by the object’s `location` field. */
  location?: Maybe<GeometryPointFilter>
  /** Filter by the object’s `shape` field. */
  shape?: Maybe<GeometryPolygonFilter>
  /** Filter by the object’s `parkingSpaceId` field. */
  parkingSpaceId?: Maybe<UuidFilter>
  /** Filter by the object’s `booked` field. */
  booked?: Maybe<BooleanFilter>
  /** Filter by the object’s `inWorkingHours` field. */
  inWorkingHours?: Maybe<BooleanFilter>
  /** Filter by the object’s `inAmenities` field. */
  inAmenities?: Maybe<BooleanFilter>
  /** Filter by the object’s `inVs` field. */
  inVs?: Maybe<BooleanFilter>
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<FindSlotsResultFilter>>
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<FindSlotsResultFilter>>
  /** Negates the expression. */
  not?: Maybe<FindSlotsResultFilter>
}

/** A connection to a list of `FindSlotsResult` values. */
export type FindSlotsResultsConnection = {
  /** A list of `FindSlotsResult` objects. */
  nodes: Array<FindSlotsResult>
  /** A list of edges which contains the `FindSlotsResult` and cursor to aid in pagination. */
  edges: Array<FindSlotsResultsEdge>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `FindSlotsResult` you could get from the connection. */
  totalCount: Scalars['Int']
}

export type FindSlotsResult = {
  id: Scalars['UUID']
  status: SlotStatusT
  location: GeometryPoint
  shape?: Maybe<GeometryPolygon>
  parkingSpaceId?: Maybe<Scalars['UUID']>
  booked: Scalars['Boolean']
  inWorkingHours: Scalars['Boolean']
  inAmenities: Scalars['Boolean']
  inVs: Scalars['Boolean']
}

/** A `FindSlotsResult` edge in the connection. */
export type FindSlotsResultsEdge = {
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `FindSlotsResult` at the end of the edge. */
  node: FindSlotsResult
}

/** A filter to be used against `GetApiKeysResult` object types. All fields are combined with a logical ‘and.’ */
export type GetApiKeysResultFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<UuidFilter>
  /** Filter by the object’s `userId` field. */
  userId?: Maybe<UuidFilter>
  /** Filter by the object’s `description` field. */
  description?: Maybe<StringFilter>
  /** Filter by the object’s `expireAt` field. */
  expireAt?: Maybe<DatetimeFilter>
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<GetApiKeysResultFilter>>
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<GetApiKeysResultFilter>>
  /** Negates the expression. */
  not?: Maybe<GetApiKeysResultFilter>
}

/** A connection to a list of `GetApiKeysResult` values. */
export type GetApiKeysResultsConnection = {
  /** A list of `GetApiKeysResult` objects. */
  nodes: Array<GetApiKeysResult>
  /** A list of edges which contains the `GetApiKeysResult` and cursor to aid in pagination. */
  edges: Array<GetApiKeysResultsEdge>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `GetApiKeysResult` you could get from the connection. */
  totalCount: Scalars['Int']
}

export type GetApiKeysResult = {
  id?: Maybe<Scalars['UUID']>
  userId?: Maybe<Scalars['UUID']>
  description?: Maybe<Scalars['String']>
  expireAt?: Maybe<Scalars['Datetime']>
  createdAt?: Maybe<Scalars['Datetime']>
}

/** A `GetApiKeysResult` edge in the connection. */
export type GetApiKeysResultsEdge = {
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `GetApiKeysResult` at the end of the edge. */
  node: GetApiKeysResult
}

/** An input for mutations affecting `SlotBookingStatusInputRecord` */
export type SlotBookingStatusInputRecordInput = {
  slotId?: Maybe<Scalars['UUID']>
  startTime?: Maybe<Scalars['Datetime']>
  endTime?: Maybe<Scalars['Datetime']>
}

export enum SlotAvailabilityBookingStatus {
  Available = 'AVAILABLE',
  Booked = 'BOOKED',
  Unavailable = 'UNAVAILABLE',
}

/** An input for mutations affecting `SlotBookingTimesInputRecord` */
export type SlotBookingTimesInputRecordInput = {
  slotIds?: Maybe<Array<Maybe<Scalars['UUID']>>>
  startTime?: Maybe<Scalars['Datetime']>
  endTime?: Maybe<Scalars['Datetime']>
}

/** A filter to be used against `SlotBookingTimesRecord` object types. All fields are combined with a logical ‘and.’ */
export type SlotBookingTimesRecordFilter = {
  /** Filter by the object’s `slotId` field. */
  slotId?: Maybe<UuidFilter>
  /** Filter by the object’s `startTime` field. */
  startTime?: Maybe<DatetimeFilter>
  /** Filter by the object’s `endTime` field. */
  endTime?: Maybe<DatetimeFilter>
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<SlotBookingTimesRecordFilter>>
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<SlotBookingTimesRecordFilter>>
  /** Negates the expression. */
  not?: Maybe<SlotBookingTimesRecordFilter>
}

/** A connection to a list of `SlotBookingTimesRecord` values. */
export type SlotBookingTimesConnection = {
  /** A list of `SlotBookingTimesRecord` objects. */
  nodes: Array<SlotBookingTimesRecord>
  /** A list of edges which contains the `SlotBookingTimesRecord` and cursor to aid in pagination. */
  edges: Array<SlotBookingTimeEdge>
  /** The count of *all* `SlotBookingTimesRecord` you could get from the connection. */
  totalCount: Scalars['Int']
}

/** The return type of our `slotBookingTimes` query. */
export type SlotBookingTimesRecord = {
  slotId?: Maybe<Scalars['UUID']>
  startTime?: Maybe<Scalars['Datetime']>
  endTime?: Maybe<Scalars['Datetime']>
}

/** A `SlotBookingTimesRecord` edge in the connection. */
export type SlotBookingTimeEdge = {
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `SlotBookingTimesRecord` at the end of the edge. */
  node: SlotBookingTimesRecord
}

/** A filter to be used against `SlotTimetableResult` object types. All fields are combined with a logical ‘and.’ */
export type SlotTimetableResultFilter = {
  /** Filter by the object’s `slotId` field. */
  slotId?: Maybe<UuidFilter>
  /** Filter by the object’s `startTime` field. */
  startTime?: Maybe<DatetimeFilter>
  /** Filter by the object’s `endTime` field. */
  endTime?: Maybe<DatetimeFilter>
  /** Filter by the object’s `timetableDate` field. */
  timetableDate?: Maybe<DateFilter>
  /** Filter by the object’s `dayOfWeek` field. */
  dayOfWeek?: Maybe<IntFilter>
  /** Filter by the object’s `booked` field. */
  booked?: Maybe<BooleanFilter>
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<SlotTimetableResultFilter>>
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<SlotTimetableResultFilter>>
  /** Negates the expression. */
  not?: Maybe<SlotTimetableResultFilter>
}

/** A connection to a list of `SlotTimetableResult` values. */
export type SlotTimetableResultsConnection = {
  /** A list of `SlotTimetableResult` objects. */
  nodes: Array<SlotTimetableResult>
  /** A list of edges which contains the `SlotTimetableResult` and cursor to aid in pagination. */
  edges: Array<SlotTimetableResultsEdge>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `SlotTimetableResult` you could get from the connection. */
  totalCount: Scalars['Int']
}

export type SlotTimetableResult = {
  slotId: Scalars['UUID']
  startTime: Scalars['Datetime']
  endTime: Scalars['Datetime']
  timetableDate: Scalars['Date']
  dayOfWeek: Scalars['Int']
  booked: Scalars['Boolean']
}

/** A `SlotTimetableResult` edge in the connection. */
export type SlotTimetableResultsEdge = {
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `SlotTimetableResult` at the end of the edge. */
  node: SlotTimetableResult
}

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  /** Creates a single `Amenity`. */
  createAmenity?: Maybe<CreateAmenityPayload>
  /** Creates a single `Business`. */
  createBusiness?: Maybe<CreateBusinessPayload>
  /** Creates a single `Country`. */
  createCountry?: Maybe<CreateCountryPayload>
  /** Creates a single `Language`. */
  createLanguage?: Maybe<CreateLanguagePayload>
  /** Creates a single `ParkingOpenHour`. */
  createParkingOpenHour?: Maybe<CreateParkingOpenHourPayload>
  /** Creates a single `ParkingSpace`. */
  createParkingSpace?: Maybe<CreateParkingSpacePayload>
  /** Creates a single `ParkingSpaceAvailability`. */
  createParkingSpaceAvailability?: Maybe<CreateParkingSpaceAvailabilityPayload>
  /** Creates a single `ParkingWorkingHour`. */
  createParkingWorkingHour?: Maybe<CreateParkingWorkingHourPayload>
  /** Creates a single `PaymentReceipt`. */
  createPaymentReceipt?: Maybe<CreatePaymentReceiptPayload>
  /** Creates a single `Slot`. */
  createSlot?: Maybe<CreateSlotPayload>
  /** Creates a single `SlotAmenity`. */
  createSlotAmenity?: Maybe<CreateSlotAmenityPayload>
  /** Creates a single `SlotAvailability`. */
  createSlotAvailability?: Maybe<CreateSlotAvailabilityPayload>
  /** Creates a single `Translation`. */
  createTranslation?: Maybe<CreateTranslationPayload>
  /** Creates a single `Vehicle`. */
  createVehicle?: Maybe<CreateVehiclePayload>
  /** Creates a single `VehicleSize`. */
  createVehicleSize?: Maybe<CreateVehicleSizePayload>
  /** Creates a single `VehicleType`. */
  createVehicleType?: Maybe<CreateVehicleTypePayload>
  /** Updates a single `Amenity` using its globally unique id and a patch. */
  updateAmenityByNodeId?: Maybe<UpdateAmenityPayload>
  /** Updates a single `Amenity` using a unique key and a patch. */
  updateAmenity?: Maybe<UpdateAmenityPayload>
  /** Updates a single `BillingProfile` using its globally unique id and a patch. */
  updateBillingProfileByNodeId?: Maybe<UpdateBillingProfilePayload>
  /** Updates a single `BillingProfile` using a unique key and a patch. */
  updateBillingProfile?: Maybe<UpdateBillingProfilePayload>
  /** Updates a single `Business` using its globally unique id and a patch. */
  updateBusinessByNodeId?: Maybe<UpdateBusinessPayload>
  /** Updates a single `Business` using a unique key and a patch. */
  updateBusiness?: Maybe<UpdateBusinessPayload>
  /** Updates a single `Business` using a unique key and a patch. */
  updateBusinessBySlug?: Maybe<UpdateBusinessPayload>
  /** Updates a single `Country` using its globally unique id and a patch. */
  updateCountryByNodeId?: Maybe<UpdateCountryPayload>
  /** Updates a single `Country` using a unique key and a patch. */
  updateCountry?: Maybe<UpdateCountryPayload>
  /** Updates a single `Country` using a unique key and a patch. */
  updateCountryByCode?: Maybe<UpdateCountryPayload>
  /** Updates a single `Country` using a unique key and a patch. */
  updateCountryByName?: Maybe<UpdateCountryPayload>
  /** Updates a single `Language` using its globally unique id and a patch. */
  updateLanguageByNodeId?: Maybe<UpdateLanguagePayload>
  /** Updates a single `Language` using a unique key and a patch. */
  updateLanguage?: Maybe<UpdateLanguagePayload>
  /** Updates a single `ParkingOpenHour` using its globally unique id and a patch. */
  updateParkingOpenHourByNodeId?: Maybe<UpdateParkingOpenHourPayload>
  /** Updates a single `ParkingOpenHour` using a unique key and a patch. */
  updateParkingOpenHour?: Maybe<UpdateParkingOpenHourPayload>
  /** Updates a single `ParkingSpace` using its globally unique id and a patch. */
  updateParkingSpaceByNodeId?: Maybe<UpdateParkingSpacePayload>
  /** Updates a single `ParkingSpace` using a unique key and a patch. */
  updateParkingSpace?: Maybe<UpdateParkingSpacePayload>
  /** Updates a single `ParkingSpace` using a unique key and a patch. */
  updateParkingSpaceBySlug?: Maybe<UpdateParkingSpacePayload>
  /** Updates a single `ParkingSpaceAvailability` using its globally unique id and a patch. */
  updateParkingSpaceAvailabilityByNodeId?: Maybe<UpdateParkingSpaceAvailabilityPayload>
  /** Updates a single `ParkingSpaceAvailability` using a unique key and a patch. */
  updateParkingSpaceAvailability?: Maybe<UpdateParkingSpaceAvailabilityPayload>
  /** Updates a single `ParkingWorkingHour` using its globally unique id and a patch. */
  updateParkingWorkingHourByNodeId?: Maybe<UpdateParkingWorkingHourPayload>
  /** Updates a single `ParkingWorkingHour` using a unique key and a patch. */
  updateParkingWorkingHour?: Maybe<UpdateParkingWorkingHourPayload>
  /** Updates a single `Slot` using its globally unique id and a patch. */
  updateSlotByNodeId?: Maybe<UpdateSlotPayload>
  /** Updates a single `Slot` using a unique key and a patch. */
  updateSlot?: Maybe<UpdateSlotPayload>
  /** Updates a single `SlotAvailability` using its globally unique id and a patch. */
  updateSlotAvailabilityByNodeId?: Maybe<UpdateSlotAvailabilityPayload>
  /** Updates a single `SlotAvailability` using a unique key and a patch. */
  updateSlotAvailability?: Maybe<UpdateSlotAvailabilityPayload>
  /** Updates a single `SlotBooking` using its globally unique id and a patch. */
  updateSlotBookingByNodeId?: Maybe<UpdateSlotBookingPayload>
  /** Updates a single `SlotBooking` using a unique key and a patch. */
  updateSlotBooking?: Maybe<UpdateSlotBookingPayload>
  /** Updates a single `Translation` using its globally unique id and a patch. */
  updateTranslationByNodeId?: Maybe<UpdateTranslationPayload>
  /** Updates a single `Translation` using a unique key and a patch. */
  updateTranslation?: Maybe<UpdateTranslationPayload>
  /** Updates a single `Vehicle` using its globally unique id and a patch. */
  updateVehicleByNodeId?: Maybe<UpdateVehiclePayload>
  /** Updates a single `Vehicle` using a unique key and a patch. */
  updateVehicle?: Maybe<UpdateVehiclePayload>
  /** Updates a single `VehicleSize` using its globally unique id and a patch. */
  updateVehicleSizeByNodeId?: Maybe<UpdateVehicleSizePayload>
  /** Updates a single `VehicleSize` using a unique key and a patch. */
  updateVehicleSize?: Maybe<UpdateVehicleSizePayload>
  /** Updates a single `VehicleType` using its globally unique id and a patch. */
  updateVehicleTypeByNodeId?: Maybe<UpdateVehicleTypePayload>
  /** Updates a single `VehicleType` using a unique key and a patch. */
  updateVehicleType?: Maybe<UpdateVehicleTypePayload>
  /** Updates a single `VehicleType` using a unique key and a patch. */
  updateVehicleTypeByName?: Maybe<UpdateVehicleTypePayload>
  /** Deletes a single `Amenity` using its globally unique id. */
  deleteAmenityByNodeId?: Maybe<DeleteAmenityPayload>
  /** Deletes a single `Amenity` using a unique key. */
  deleteAmenity?: Maybe<DeleteAmenityPayload>
  /** Deletes a single `BillingProfile` using its globally unique id. */
  deleteBillingProfileByNodeId?: Maybe<DeleteBillingProfilePayload>
  /** Deletes a single `BillingProfile` using a unique key. */
  deleteBillingProfile?: Maybe<DeleteBillingProfilePayload>
  /** Deletes a single `Business` using its globally unique id. */
  deleteBusinessByNodeId?: Maybe<DeleteBusinessPayload>
  /** Deletes a single `Business` using a unique key. */
  deleteBusiness?: Maybe<DeleteBusinessPayload>
  /** Deletes a single `Business` using a unique key. */
  deleteBusinessBySlug?: Maybe<DeleteBusinessPayload>
  /** Deletes a single `Country` using its globally unique id. */
  deleteCountryByNodeId?: Maybe<DeleteCountryPayload>
  /** Deletes a single `Country` using a unique key. */
  deleteCountry?: Maybe<DeleteCountryPayload>
  /** Deletes a single `Country` using a unique key. */
  deleteCountryByCode?: Maybe<DeleteCountryPayload>
  /** Deletes a single `Country` using a unique key. */
  deleteCountryByName?: Maybe<DeleteCountryPayload>
  /** Deletes a single `Language` using its globally unique id. */
  deleteLanguageByNodeId?: Maybe<DeleteLanguagePayload>
  /** Deletes a single `Language` using a unique key. */
  deleteLanguage?: Maybe<DeleteLanguagePayload>
  /** Deletes a single `ParkingOpenHour` using its globally unique id. */
  deleteParkingOpenHourByNodeId?: Maybe<DeleteParkingOpenHourPayload>
  /** Deletes a single `ParkingOpenHour` using a unique key. */
  deleteParkingOpenHour?: Maybe<DeleteParkingOpenHourPayload>
  /** Deletes a single `ParkingSpace` using its globally unique id. */
  deleteParkingSpaceByNodeId?: Maybe<DeleteParkingSpacePayload>
  /** Deletes a single `ParkingSpace` using a unique key. */
  deleteParkingSpace?: Maybe<DeleteParkingSpacePayload>
  /** Deletes a single `ParkingSpace` using a unique key. */
  deleteParkingSpaceBySlug?: Maybe<DeleteParkingSpacePayload>
  /** Deletes a single `ParkingSpaceAvailability` using its globally unique id. */
  deleteParkingSpaceAvailabilityByNodeId?: Maybe<DeleteParkingSpaceAvailabilityPayload>
  /** Deletes a single `ParkingSpaceAvailability` using a unique key. */
  deleteParkingSpaceAvailability?: Maybe<DeleteParkingSpaceAvailabilityPayload>
  /** Deletes a single `ParkingWorkingHour` using its globally unique id. */
  deleteParkingWorkingHourByNodeId?: Maybe<DeleteParkingWorkingHourPayload>
  /** Deletes a single `ParkingWorkingHour` using a unique key. */
  deleteParkingWorkingHour?: Maybe<DeleteParkingWorkingHourPayload>
  /** Deletes a single `PaymentReceipt` using its globally unique id. */
  deletePaymentReceiptByNodeId?: Maybe<DeletePaymentReceiptPayload>
  /** Deletes a single `PaymentReceipt` using a unique key. */
  deletePaymentReceipt?: Maybe<DeletePaymentReceiptPayload>
  /** Deletes a single `Slot` using its globally unique id. */
  deleteSlotByNodeId?: Maybe<DeleteSlotPayload>
  /** Deletes a single `Slot` using a unique key. */
  deleteSlot?: Maybe<DeleteSlotPayload>
  /** Deletes a single `SlotAmenity` using its globally unique id. */
  deleteSlotAmenityByNodeId?: Maybe<DeleteSlotAmenityPayload>
  /** Deletes a single `SlotAmenity` using a unique key. */
  deleteSlotAmenity?: Maybe<DeleteSlotAmenityPayload>
  /** Deletes a single `SlotAvailability` using its globally unique id. */
  deleteSlotAvailabilityByNodeId?: Maybe<DeleteSlotAvailabilityPayload>
  /** Deletes a single `SlotAvailability` using a unique key. */
  deleteSlotAvailability?: Maybe<DeleteSlotAvailabilityPayload>
  /** Deletes a single `Translation` using its globally unique id. */
  deleteTranslationByNodeId?: Maybe<DeleteTranslationPayload>
  /** Deletes a single `Translation` using a unique key. */
  deleteTranslation?: Maybe<DeleteTranslationPayload>
  /** Deletes a single `User` using its globally unique id. */
  deleteUserByNodeId?: Maybe<DeleteUserPayload>
  /** Deletes a single `User` using a unique key. */
  deleteUser?: Maybe<DeleteUserPayload>
  /** Deletes a single `UserSubscription` using its globally unique id. */
  deleteUserSubscriptionByNodeId?: Maybe<DeleteUserSubscriptionPayload>
  /** Deletes a single `UserSubscription` using a unique key. */
  deleteUserSubscription?: Maybe<DeleteUserSubscriptionPayload>
  /** Deletes a single `Vehicle` using its globally unique id. */
  deleteVehicleByNodeId?: Maybe<DeleteVehiclePayload>
  /** Deletes a single `Vehicle` using a unique key. */
  deleteVehicle?: Maybe<DeleteVehiclePayload>
  /** Deletes a single `VehicleSize` using its globally unique id. */
  deleteVehicleSizeByNodeId?: Maybe<DeleteVehicleSizePayload>
  /** Deletes a single `VehicleSize` using a unique key. */
  deleteVehicleSize?: Maybe<DeleteVehicleSizePayload>
  /** Deletes a single `VehicleType` using its globally unique id. */
  deleteVehicleTypeByNodeId?: Maybe<DeleteVehicleTypePayload>
  /** Deletes a single `VehicleType` using a unique key. */
  deleteVehicleType?: Maybe<DeleteVehicleTypePayload>
  /** Deletes a single `VehicleType` using a unique key. */
  deleteVehicleTypeByName?: Maybe<DeleteVehicleTypePayload>
  /** Confirm user account */
  activateUser?: Maybe<ActivateUserPayload>
  /** authenticate using api_key */
  authenticateApi?: Maybe<AuthenticateApiPayload>
  bookSlot?: Maybe<BookSlotPayload>
  /** create api_key for user */
  createApiKey?: Maybe<CreateApiKeyPayload>
  /** register new user as admin */
  createUser?: Maybe<CreateUserPayload>
  /** delete api_key for user */
  deleteApiKey?: Maybe<DeleteApiKeyPayload>
  forgotPassword?: Maybe<ForgotPasswordPayload>
  /** login user into system */
  login?: Maybe<LoginPayload>
  refreshToken?: Maybe<RefreshTokenPayload>
  /** register new user */
  register?: Maybe<RegisterPayload>
  /** Resend activation email on demand */
  resendActivationEmail?: Maybe<ResendActivationEmailPayload>
  /** reset password using JWT via forgot_password */
  resetPassword?: Maybe<ResetPasswordPayload>
  slotBookingAttend?: Maybe<SlotBookingAttendPayload>
  /** update own user or another user as admin */
  updateUser?: Maybe<UpdateUserPayload>
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateAmenityArgs = {
  input: CreateAmenityInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateBusinessArgs = {
  input: CreateBusinessInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateCountryArgs = {
  input: CreateCountryInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateLanguageArgs = {
  input: CreateLanguageInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateParkingOpenHourArgs = {
  input: CreateParkingOpenHourInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateParkingSpaceArgs = {
  input: CreateParkingSpaceInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateParkingSpaceAvailabilityArgs = {
  input: CreateParkingSpaceAvailabilityInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateParkingWorkingHourArgs = {
  input: CreateParkingWorkingHourInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreatePaymentReceiptArgs = {
  input: CreatePaymentReceiptInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateSlotArgs = {
  input: CreateSlotInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateSlotAmenityArgs = {
  input: CreateSlotAmenityInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateSlotAvailabilityArgs = {
  input: CreateSlotAvailabilityInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateTranslationArgs = {
  input: CreateTranslationInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateVehicleArgs = {
  input: CreateVehicleInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateVehicleSizeArgs = {
  input: CreateVehicleSizeInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateVehicleTypeArgs = {
  input: CreateVehicleTypeInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAmenityByNodeIdArgs = {
  input: UpdateAmenityByNodeIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAmenityArgs = {
  input: UpdateAmenityInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateBillingProfileByNodeIdArgs = {
  input: UpdateBillingProfileByNodeIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateBillingProfileArgs = {
  input: UpdateBillingProfileInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateBusinessByNodeIdArgs = {
  input: UpdateBusinessByNodeIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateBusinessArgs = {
  input: UpdateBusinessInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateBusinessBySlugArgs = {
  input: UpdateBusinessBySlugInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCountryByNodeIdArgs = {
  input: UpdateCountryByNodeIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCountryArgs = {
  input: UpdateCountryInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCountryByCodeArgs = {
  input: UpdateCountryByCodeInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCountryByNameArgs = {
  input: UpdateCountryByNameInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateLanguageByNodeIdArgs = {
  input: UpdateLanguageByNodeIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateLanguageArgs = {
  input: UpdateLanguageInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateParkingOpenHourByNodeIdArgs = {
  input: UpdateParkingOpenHourByNodeIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateParkingOpenHourArgs = {
  input: UpdateParkingOpenHourInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateParkingSpaceByNodeIdArgs = {
  input: UpdateParkingSpaceByNodeIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateParkingSpaceArgs = {
  input: UpdateParkingSpaceInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateParkingSpaceBySlugArgs = {
  input: UpdateParkingSpaceBySlugInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateParkingSpaceAvailabilityByNodeIdArgs = {
  input: UpdateParkingSpaceAvailabilityByNodeIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateParkingSpaceAvailabilityArgs = {
  input: UpdateParkingSpaceAvailabilityInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateParkingWorkingHourByNodeIdArgs = {
  input: UpdateParkingWorkingHourByNodeIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateParkingWorkingHourArgs = {
  input: UpdateParkingWorkingHourInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSlotByNodeIdArgs = {
  input: UpdateSlotByNodeIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSlotArgs = {
  input: UpdateSlotInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSlotAvailabilityByNodeIdArgs = {
  input: UpdateSlotAvailabilityByNodeIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSlotAvailabilityArgs = {
  input: UpdateSlotAvailabilityInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSlotBookingByNodeIdArgs = {
  input: UpdateSlotBookingByNodeIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSlotBookingArgs = {
  input: UpdateSlotBookingInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTranslationByNodeIdArgs = {
  input: UpdateTranslationByNodeIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTranslationArgs = {
  input: UpdateTranslationInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateVehicleByNodeIdArgs = {
  input: UpdateVehicleByNodeIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateVehicleArgs = {
  input: UpdateVehicleInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateVehicleSizeByNodeIdArgs = {
  input: UpdateVehicleSizeByNodeIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateVehicleSizeArgs = {
  input: UpdateVehicleSizeInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateVehicleTypeByNodeIdArgs = {
  input: UpdateVehicleTypeByNodeIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateVehicleTypeArgs = {
  input: UpdateVehicleTypeInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateVehicleTypeByNameArgs = {
  input: UpdateVehicleTypeByNameInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAmenityByNodeIdArgs = {
  input: DeleteAmenityByNodeIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAmenityArgs = {
  input: DeleteAmenityInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteBillingProfileByNodeIdArgs = {
  input: DeleteBillingProfileByNodeIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteBillingProfileArgs = {
  input: DeleteBillingProfileInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteBusinessByNodeIdArgs = {
  input: DeleteBusinessByNodeIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteBusinessArgs = {
  input: DeleteBusinessInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteBusinessBySlugArgs = {
  input: DeleteBusinessBySlugInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCountryByNodeIdArgs = {
  input: DeleteCountryByNodeIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCountryArgs = {
  input: DeleteCountryInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCountryByCodeArgs = {
  input: DeleteCountryByCodeInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCountryByNameArgs = {
  input: DeleteCountryByNameInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteLanguageByNodeIdArgs = {
  input: DeleteLanguageByNodeIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteLanguageArgs = {
  input: DeleteLanguageInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteParkingOpenHourByNodeIdArgs = {
  input: DeleteParkingOpenHourByNodeIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteParkingOpenHourArgs = {
  input: DeleteParkingOpenHourInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteParkingSpaceByNodeIdArgs = {
  input: DeleteParkingSpaceByNodeIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteParkingSpaceArgs = {
  input: DeleteParkingSpaceInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteParkingSpaceBySlugArgs = {
  input: DeleteParkingSpaceBySlugInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteParkingSpaceAvailabilityByNodeIdArgs = {
  input: DeleteParkingSpaceAvailabilityByNodeIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteParkingSpaceAvailabilityArgs = {
  input: DeleteParkingSpaceAvailabilityInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteParkingWorkingHourByNodeIdArgs = {
  input: DeleteParkingWorkingHourByNodeIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteParkingWorkingHourArgs = {
  input: DeleteParkingWorkingHourInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePaymentReceiptByNodeIdArgs = {
  input: DeletePaymentReceiptByNodeIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePaymentReceiptArgs = {
  input: DeletePaymentReceiptInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSlotByNodeIdArgs = {
  input: DeleteSlotByNodeIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSlotArgs = {
  input: DeleteSlotInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSlotAmenityByNodeIdArgs = {
  input: DeleteSlotAmenityByNodeIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSlotAmenityArgs = {
  input: DeleteSlotAmenityInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSlotAvailabilityByNodeIdArgs = {
  input: DeleteSlotAvailabilityByNodeIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSlotAvailabilityArgs = {
  input: DeleteSlotAvailabilityInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTranslationByNodeIdArgs = {
  input: DeleteTranslationByNodeIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTranslationArgs = {
  input: DeleteTranslationInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserByNodeIdArgs = {
  input: DeleteUserByNodeIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserArgs = {
  input: DeleteUserInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserSubscriptionByNodeIdArgs = {
  input: DeleteUserSubscriptionByNodeIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserSubscriptionArgs = {
  input: DeleteUserSubscriptionInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteVehicleByNodeIdArgs = {
  input: DeleteVehicleByNodeIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteVehicleArgs = {
  input: DeleteVehicleInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteVehicleSizeByNodeIdArgs = {
  input: DeleteVehicleSizeByNodeIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteVehicleSizeArgs = {
  input: DeleteVehicleSizeInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteVehicleTypeByNodeIdArgs = {
  input: DeleteVehicleTypeByNodeIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteVehicleTypeArgs = {
  input: DeleteVehicleTypeInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteVehicleTypeByNameArgs = {
  input: DeleteVehicleTypeByNameInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationActivateUserArgs = {
  input: ActivateUserInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationAuthenticateApiArgs = {
  input: AuthenticateApiInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationBookSlotArgs = {
  input: BookSlotInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateApiKeyArgs = {
  input: CreateApiKeyInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateUserArgs = {
  input: CreateUserInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteApiKeyArgs = {
  input: DeleteApiKeyInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationForgotPasswordArgs = {
  input: ForgotPasswordInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationLoginArgs = {
  input: LoginInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationRefreshTokenArgs = {
  input: RefreshTokenInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationRegisterArgs = {
  input: RegisterInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationResendActivationEmailArgs = {
  input: ResendActivationEmailInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationResetPasswordArgs = {
  input: ResetPasswordInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationSlotBookingAttendArgs = {
  input: SlotBookingAttendInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserArgs = {
  input: UpdateUserInput
}

/** All input for the create `Amenity` mutation. */
export type CreateAmenityInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `Amenity` to be created by this mutation. */
  amenity: AmenityInput
}

/** An input for mutations affecting `Amenity` */
export type AmenityInput = {
  id?: Maybe<Scalars['UUID']>
  name: Scalars['String']
  weight?: Maybe<Scalars['Int']>
  description?: Maybe<Scalars['String']>
  status?: Maybe<ContentStatusT>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  slug?: Maybe<Scalars['String']>
  slotAmenitiesUsingId?: Maybe<SlotAmenityAmenityIdFkeyInverseInput>
}

/** Input for the nested mutation of `slotAmenity` in the `AmenityInput` mutation. */
export type SlotAmenityAmenityIdFkeyInverseInput = {
  /** Flag indicating whether all other `slotAmenity` records that match this relationship should be removed. */
  deleteOthers?: Maybe<Scalars['Boolean']>
  /** The primary key(s) for `slotAmenity` for the far side of the relationship. */
  connectById?: Maybe<Array<SlotAmenitySlotAmenityPkeyConnect>>
  /** The primary key(s) for `slotAmenity` for the far side of the relationship. */
  connectByNodeId?: Maybe<Array<SlotAmenityNodeIdConnect>>
  /** The primary key(s) for `slotAmenity` for the far side of the relationship. */
  deleteById?: Maybe<Array<SlotAmenitySlotAmenityPkeyDelete>>
  /** The primary key(s) for `slotAmenity` for the far side of the relationship. */
  deleteByNodeId?: Maybe<Array<SlotAmenityNodeIdDelete>>
  /** The primary key(s) and patch data for `slotAmenity` for the far side of the relationship. */
  updateById?: Maybe<
    Array<SlotAmenityOnSlotAmenityForSlotAmenityAmenityIdFkeyUsingSlotAmenityPkeyUpdate>
  >
  /** The primary key(s) and patch data for `slotAmenity` for the far side of the relationship. */
  updateByNodeId?: Maybe<Array<AmenityOnSlotAmenityForSlotAmenityAmenityIdFkeyNodeIdUpdate>>
  /** A `SlotAmenityInput` object that will be created and connected to this object. */
  create?: Maybe<Array<SlotAmenityAmenityIdFkeySlotAmenityCreateInput>>
}

/** The fields on `slotAmenity` to look up the row to connect. */
export type SlotAmenitySlotAmenityPkeyConnect = {
  id: Scalars['UUID']
}

/** The globally unique `ID` look up for the row to connect. */
export type SlotAmenityNodeIdConnect = {
  /** The globally unique `ID` which identifies a single `slotAmenity` to be connected. */
  nodeId: Scalars['ID']
}

/** The fields on `slotAmenity` to look up the row to delete. */
export type SlotAmenitySlotAmenityPkeyDelete = {
  id: Scalars['UUID']
}

/** The globally unique `ID` look up for the row to delete. */
export type SlotAmenityNodeIdDelete = {
  /** The globally unique `ID` which identifies a single `slotAmenity` to be deleted. */
  nodeId: Scalars['ID']
}

/** The fields on `slotAmenity` to look up the row to update. */
export type SlotAmenityOnSlotAmenityForSlotAmenityAmenityIdFkeyUsingSlotAmenityPkeyUpdate = {
  /** An object where the defined keys will be set on the `slotAmenity` being updated. */
  patch: UpdateSlotAmenityOnSlotAmenityForSlotAmenityAmenityIdFkeyPatch
  id: Scalars['UUID']
}

/** An object where the defined keys will be set on the `slotAmenity` being updated. */
export type UpdateSlotAmenityOnSlotAmenityForSlotAmenityAmenityIdFkeyPatch = {
  slotId?: Maybe<Scalars['UUID']>
  slotToSlotId?: Maybe<SlotAmenitySlotIdFkeyInput>
  amenityToAmenityId?: Maybe<SlotAmenityAmenityIdFkeyInput>
}

/** Input for the nested mutation of `slot` in the `SlotAmenityInput` mutation. */
export type SlotAmenitySlotIdFkeyInput = {
  /** The primary key(s) for `slot` for the far side of the relationship. */
  connectById?: Maybe<SlotSlotPkeyConnect>
  /** The primary key(s) for `slot` for the far side of the relationship. */
  connectByNodeId?: Maybe<SlotNodeIdConnect>
  /** The primary key(s) for `slot` for the far side of the relationship. */
  deleteById?: Maybe<SlotSlotPkeyDelete>
  /** The primary key(s) for `slot` for the far side of the relationship. */
  deleteByNodeId?: Maybe<SlotNodeIdDelete>
  /** The primary key(s) and patch data for `slot` for the far side of the relationship. */
  updateById?: Maybe<SlotOnSlotAmenityForSlotAmenitySlotIdFkeyUsingSlotPkeyUpdate>
  /** The primary key(s) and patch data for `slot` for the far side of the relationship. */
  updateByNodeId?: Maybe<SlotAmenityOnSlotAmenityForSlotAmenitySlotIdFkeyNodeIdUpdate>
  /** A `SlotInput` object that will be created and connected to this object. */
  create?: Maybe<SlotAmenitySlotIdFkeySlotCreateInput>
}

/** The fields on `slot` to look up the row to connect. */
export type SlotSlotPkeyConnect = {
  id: Scalars['UUID']
}

/** The globally unique `ID` look up for the row to connect. */
export type SlotNodeIdConnect = {
  /** The globally unique `ID` which identifies a single `slot` to be connected. */
  nodeId: Scalars['ID']
}

/** The fields on `slot` to look up the row to delete. */
export type SlotSlotPkeyDelete = {
  id: Scalars['UUID']
}

/** The globally unique `ID` look up for the row to delete. */
export type SlotNodeIdDelete = {
  /** The globally unique `ID` which identifies a single `slot` to be deleted. */
  nodeId: Scalars['ID']
}

/** The fields on `slot` to look up the row to update. */
export type SlotOnSlotAmenityForSlotAmenitySlotIdFkeyUsingSlotPkeyUpdate = {
  /** An object where the defined keys will be set on the `slot` being updated. */
  patch: UpdateSlotOnSlotAmenityForSlotAmenitySlotIdFkeyPatch
  id: Scalars['UUID']
}

/** An object where the defined keys will be set on the `slot` being updated. */
export type UpdateSlotOnSlotAmenityForSlotAmenitySlotIdFkeyPatch = {
  id?: Maybe<Scalars['UUID']>
  name?: Maybe<Scalars['String']>
  ownerId?: Maybe<Scalars['UUID']>
  vehicleSizeId?: Maybe<Scalars['UUID']>
  address?: Maybe<Scalars['JSON']>
  timezone?: Maybe<Scalars['String']>
  pricePerHour?: Maybe<Scalars['BigFloat']>
  status?: Maybe<SlotStatusT>
  photoUrl?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  notes?: Maybe<Scalars['String']>
  slug?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  deleted?: Maybe<Scalars['Boolean']>
  deletedAt?: Maybe<Scalars['Datetime']>
  verificationStatus?: Maybe<SlotVerificationStatus>
  parkingSpaceId?: Maybe<Scalars['UUID']>
  location?: Maybe<Scalars['GeoJSON']>
  shape?: Maybe<Scalars['GeoJSON']>
  accessRestrictions?: Maybe<AccessRestrictions>
  businessStatus?: Maybe<SlotBusinessStatus>
  businessStatusReason?: Maybe<Scalars['String']>
  category?: Maybe<SlotCategory>
  contributorId?: Maybe<Scalars['UUID']>
  level?: Maybe<Scalars['Int']>
  mapSource?: Maybe<Scalars['UUID']>
  slotDimensions?: Maybe<Scalars['JSON']>
  tempUnavailable?: Maybe<Scalars['Boolean']>
  tempUnavailableFrom?: Maybe<Scalars['Datetime']>
  tempUnavailableTo?: Maybe<Scalars['Datetime']>
  waypoints?: Maybe<Scalars['JSON']>
  userToOwnerId?: Maybe<SlotOwnerIdFkeyInput>
  vehicleSizeToVehicleSizeId?: Maybe<SlotVehicleSizeIdFkeyInput>
  parkingSpaceToParkingSpaceId?: Maybe<SlotParkingSpaceIdFkeyInput>
  slotAmenitiesUsingId?: Maybe<SlotAmenitySlotIdFkeyInverseInput>
  slotAvailabilitiesUsingId?: Maybe<SlotAvailabilitySlotIdFkeyInverseInput>
  slotBookingsUsingId?: Maybe<FakeApiSlotBookingsForeignKey0InverseInput>
}

/** Input for the nested mutation of `user` in the `SlotInput` mutation. */
export type SlotOwnerIdFkeyInput = {
  /** The primary key(s) for `user` for the far side of the relationship. */
  connectById?: Maybe<UserUserPkeyConnect>
  /** The primary key(s) for `user` for the far side of the relationship. */
  connectByNodeId?: Maybe<UserNodeIdConnect>
  /** The primary key(s) for `user` for the far side of the relationship. */
  deleteById?: Maybe<UserUserPkeyDelete>
  /** The primary key(s) for `user` for the far side of the relationship. */
  deleteByNodeId?: Maybe<UserNodeIdDelete>
  /** The primary key(s) and patch data for `user` for the far side of the relationship. */
  updateById?: Maybe<UserOnSlotForSlotOwnerIdFkeyUsingUserPkeyUpdate>
  /** The primary key(s) and patch data for `user` for the far side of the relationship. */
  updateByNodeId?: Maybe<SlotOnSlotForSlotOwnerIdFkeyNodeIdUpdate>
}

/** The fields on `user` to look up the row to connect. */
export type UserUserPkeyConnect = {
  id: Scalars['UUID']
}

/** The globally unique `ID` look up for the row to connect. */
export type UserNodeIdConnect = {
  /** The globally unique `ID` which identifies a single `user` to be connected. */
  nodeId: Scalars['ID']
}

/** The fields on `user` to look up the row to delete. */
export type UserUserPkeyDelete = {
  id: Scalars['UUID']
}

/** The globally unique `ID` look up for the row to delete. */
export type UserNodeIdDelete = {
  /** The globally unique `ID` which identifies a single `user` to be deleted. */
  nodeId: Scalars['ID']
}

/** The fields on `user` to look up the row to update. */
export type UserOnSlotForSlotOwnerIdFkeyUsingUserPkeyUpdate = {
  /** An object where the defined keys will be set on the `user` being updated. */
  patch: UpdateUserOnSlotForSlotOwnerIdFkeyPatch
  id: Scalars['UUID']
}

/** An object where the defined keys will be set on the `user` being updated. */
export type UpdateUserOnSlotForSlotOwnerIdFkeyPatch = {
  id?: Maybe<Scalars['UUID']>
  name?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['Email']>
  emailConfirmed?: Maybe<Scalars['Boolean']>
  status?: Maybe<StatusT>
  role?: Maybe<Scalars['String']>
  photoUrl?: Maybe<Scalars['String']>
  phone?: Maybe<Scalars['PhoneUs']>
  address?: Maybe<Scalars['JSON']>
  settings?: Maybe<Scalars['JSON']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  /** handles soft delete */
  deleted?: Maybe<Scalars['Boolean']>
  /** shows when is soft deleted */
  deletedAt?: Maybe<Scalars['Datetime']>
  slotsUsingId?: Maybe<SlotOwnerIdFkeyInverseInput>
  vehiclesUsingId?: Maybe<VehicleOwnerIdFkeyInverseInput>
  billingProfilesUsingId?: Maybe<BillingProfileUserIdFkeyInverseInput>
  userSubscriptionsUsingId?: Maybe<UserSubscriptionUserIdFkeyInverseInput>
  parkingSpacesUsingId?: Maybe<ParkingSpaceOwnerIdFkeyInverseInput>
  businessesUsingId?: Maybe<BusinessOwnerIdFkeyInverseInput>
  paymentReceiptsUsingId?: Maybe<PaymentReceiptOwnerIdFkeyInverseInput>
  slotBookingsUsingId?: Maybe<FakeApiSlotBookingsForeignKey1InverseInput>
}

/** Input for the nested mutation of `slot` in the `UserInput` mutation. */
export type SlotOwnerIdFkeyInverseInput = {
  /** Flag indicating whether all other `slot` records that match this relationship should be removed. */
  deleteOthers?: Maybe<Scalars['Boolean']>
  /** The primary key(s) for `slot` for the far side of the relationship. */
  connectById?: Maybe<Array<SlotSlotPkeyConnect>>
  /** The primary key(s) for `slot` for the far side of the relationship. */
  connectByNodeId?: Maybe<Array<SlotNodeIdConnect>>
  /** The primary key(s) for `slot` for the far side of the relationship. */
  deleteById?: Maybe<Array<SlotSlotPkeyDelete>>
  /** The primary key(s) for `slot` for the far side of the relationship. */
  deleteByNodeId?: Maybe<Array<SlotNodeIdDelete>>
  /** The primary key(s) and patch data for `slot` for the far side of the relationship. */
  updateById?: Maybe<Array<SlotOnSlotForSlotOwnerIdFkeyUsingSlotPkeyUpdate>>
  /** The primary key(s) and patch data for `slot` for the far side of the relationship. */
  updateByNodeId?: Maybe<Array<UserOnSlotForSlotOwnerIdFkeyNodeIdUpdate>>
  /** A `SlotInput` object that will be created and connected to this object. */
  create?: Maybe<Array<SlotOwnerIdFkeySlotCreateInput>>
}

/** The fields on `slot` to look up the row to update. */
export type SlotOnSlotForSlotOwnerIdFkeyUsingSlotPkeyUpdate = {
  /** An object where the defined keys will be set on the `slot` being updated. */
  patch: UpdateSlotOnSlotForSlotOwnerIdFkeyPatch
  id: Scalars['UUID']
}

/** An object where the defined keys will be set on the `slot` being updated. */
export type UpdateSlotOnSlotForSlotOwnerIdFkeyPatch = {
  id?: Maybe<Scalars['UUID']>
  name?: Maybe<Scalars['String']>
  vehicleSizeId?: Maybe<Scalars['UUID']>
  address?: Maybe<Scalars['JSON']>
  timezone?: Maybe<Scalars['String']>
  pricePerHour?: Maybe<Scalars['BigFloat']>
  status?: Maybe<SlotStatusT>
  photoUrl?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  notes?: Maybe<Scalars['String']>
  slug?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  deleted?: Maybe<Scalars['Boolean']>
  deletedAt?: Maybe<Scalars['Datetime']>
  verificationStatus?: Maybe<SlotVerificationStatus>
  parkingSpaceId?: Maybe<Scalars['UUID']>
  location?: Maybe<Scalars['GeoJSON']>
  shape?: Maybe<Scalars['GeoJSON']>
  accessRestrictions?: Maybe<AccessRestrictions>
  businessStatus?: Maybe<SlotBusinessStatus>
  businessStatusReason?: Maybe<Scalars['String']>
  category?: Maybe<SlotCategory>
  contributorId?: Maybe<Scalars['UUID']>
  level?: Maybe<Scalars['Int']>
  mapSource?: Maybe<Scalars['UUID']>
  slotDimensions?: Maybe<Scalars['JSON']>
  tempUnavailable?: Maybe<Scalars['Boolean']>
  tempUnavailableFrom?: Maybe<Scalars['Datetime']>
  tempUnavailableTo?: Maybe<Scalars['Datetime']>
  waypoints?: Maybe<Scalars['JSON']>
  userToOwnerId?: Maybe<SlotOwnerIdFkeyInput>
  vehicleSizeToVehicleSizeId?: Maybe<SlotVehicleSizeIdFkeyInput>
  parkingSpaceToParkingSpaceId?: Maybe<SlotParkingSpaceIdFkeyInput>
  slotAmenitiesUsingId?: Maybe<SlotAmenitySlotIdFkeyInverseInput>
  slotAvailabilitiesUsingId?: Maybe<SlotAvailabilitySlotIdFkeyInverseInput>
  slotBookingsUsingId?: Maybe<FakeApiSlotBookingsForeignKey0InverseInput>
}

/** Input for the nested mutation of `vehicleSize` in the `SlotInput` mutation. */
export type SlotVehicleSizeIdFkeyInput = {
  /** The primary key(s) for `vehicleSize` for the far side of the relationship. */
  connectById?: Maybe<VehicleSizeVehicleSizePkeyConnect>
  /** The primary key(s) for `vehicleSize` for the far side of the relationship. */
  connectByNodeId?: Maybe<VehicleSizeNodeIdConnect>
  /** The primary key(s) for `vehicleSize` for the far side of the relationship. */
  deleteById?: Maybe<VehicleSizeVehicleSizePkeyDelete>
  /** The primary key(s) for `vehicleSize` for the far side of the relationship. */
  deleteByNodeId?: Maybe<VehicleSizeNodeIdDelete>
  /** The primary key(s) and patch data for `vehicleSize` for the far side of the relationship. */
  updateById?: Maybe<VehicleSizeOnSlotForSlotVehicleSizeIdFkeyUsingVehicleSizePkeyUpdate>
  /** The primary key(s) and patch data for `vehicleSize` for the far side of the relationship. */
  updateByNodeId?: Maybe<SlotOnSlotForSlotVehicleSizeIdFkeyNodeIdUpdate>
  /** A `VehicleSizeInput` object that will be created and connected to this object. */
  create?: Maybe<SlotVehicleSizeIdFkeyVehicleSizeCreateInput>
}

/** The fields on `vehicleSize` to look up the row to connect. */
export type VehicleSizeVehicleSizePkeyConnect = {
  id: Scalars['UUID']
}

/** The globally unique `ID` look up for the row to connect. */
export type VehicleSizeNodeIdConnect = {
  /** The globally unique `ID` which identifies a single `vehicleSize` to be connected. */
  nodeId: Scalars['ID']
}

/** The fields on `vehicleSize` to look up the row to delete. */
export type VehicleSizeVehicleSizePkeyDelete = {
  id: Scalars['UUID']
}

/** The globally unique `ID` look up for the row to delete. */
export type VehicleSizeNodeIdDelete = {
  /** The globally unique `ID` which identifies a single `vehicleSize` to be deleted. */
  nodeId: Scalars['ID']
}

/** The fields on `vehicleSize` to look up the row to update. */
export type VehicleSizeOnSlotForSlotVehicleSizeIdFkeyUsingVehicleSizePkeyUpdate = {
  /** An object where the defined keys will be set on the `vehicleSize` being updated. */
  patch: UpdateVehicleSizeOnSlotForSlotVehicleSizeIdFkeyPatch
  id: Scalars['UUID']
}

/** An object where the defined keys will be set on the `vehicleSize` being updated. */
export type UpdateVehicleSizeOnSlotForSlotVehicleSizeIdFkeyPatch = {
  id?: Maybe<Scalars['UUID']>
  status?: Maybe<ContentStatusT>
  name?: Maybe<Scalars['String']>
  weight?: Maybe<Scalars['Int']>
  description?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  slotsUsingId?: Maybe<SlotVehicleSizeIdFkeyInverseInput>
  vehiclesUsingId?: Maybe<VehicleVehicleSizeIdFkeyInverseInput>
}

/** Input for the nested mutation of `slot` in the `VehicleSizeInput` mutation. */
export type SlotVehicleSizeIdFkeyInverseInput = {
  /** Flag indicating whether all other `slot` records that match this relationship should be removed. */
  deleteOthers?: Maybe<Scalars['Boolean']>
  /** The primary key(s) for `slot` for the far side of the relationship. */
  connectById?: Maybe<Array<SlotSlotPkeyConnect>>
  /** The primary key(s) for `slot` for the far side of the relationship. */
  connectByNodeId?: Maybe<Array<SlotNodeIdConnect>>
  /** The primary key(s) for `slot` for the far side of the relationship. */
  deleteById?: Maybe<Array<SlotSlotPkeyDelete>>
  /** The primary key(s) for `slot` for the far side of the relationship. */
  deleteByNodeId?: Maybe<Array<SlotNodeIdDelete>>
  /** The primary key(s) and patch data for `slot` for the far side of the relationship. */
  updateById?: Maybe<Array<SlotOnSlotForSlotVehicleSizeIdFkeyUsingSlotPkeyUpdate>>
  /** The primary key(s) and patch data for `slot` for the far side of the relationship. */
  updateByNodeId?: Maybe<Array<VehicleSizeOnSlotForSlotVehicleSizeIdFkeyNodeIdUpdate>>
  /** A `SlotInput` object that will be created and connected to this object. */
  create?: Maybe<Array<SlotVehicleSizeIdFkeySlotCreateInput>>
}

/** The fields on `slot` to look up the row to update. */
export type SlotOnSlotForSlotVehicleSizeIdFkeyUsingSlotPkeyUpdate = {
  /** An object where the defined keys will be set on the `slot` being updated. */
  patch: UpdateSlotOnSlotForSlotVehicleSizeIdFkeyPatch
  id: Scalars['UUID']
}

/** An object where the defined keys will be set on the `slot` being updated. */
export type UpdateSlotOnSlotForSlotVehicleSizeIdFkeyPatch = {
  id?: Maybe<Scalars['UUID']>
  name?: Maybe<Scalars['String']>
  ownerId?: Maybe<Scalars['UUID']>
  address?: Maybe<Scalars['JSON']>
  timezone?: Maybe<Scalars['String']>
  pricePerHour?: Maybe<Scalars['BigFloat']>
  status?: Maybe<SlotStatusT>
  photoUrl?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  notes?: Maybe<Scalars['String']>
  slug?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  deleted?: Maybe<Scalars['Boolean']>
  deletedAt?: Maybe<Scalars['Datetime']>
  verificationStatus?: Maybe<SlotVerificationStatus>
  parkingSpaceId?: Maybe<Scalars['UUID']>
  location?: Maybe<Scalars['GeoJSON']>
  shape?: Maybe<Scalars['GeoJSON']>
  accessRestrictions?: Maybe<AccessRestrictions>
  businessStatus?: Maybe<SlotBusinessStatus>
  businessStatusReason?: Maybe<Scalars['String']>
  category?: Maybe<SlotCategory>
  contributorId?: Maybe<Scalars['UUID']>
  level?: Maybe<Scalars['Int']>
  mapSource?: Maybe<Scalars['UUID']>
  slotDimensions?: Maybe<Scalars['JSON']>
  tempUnavailable?: Maybe<Scalars['Boolean']>
  tempUnavailableFrom?: Maybe<Scalars['Datetime']>
  tempUnavailableTo?: Maybe<Scalars['Datetime']>
  waypoints?: Maybe<Scalars['JSON']>
  userToOwnerId?: Maybe<SlotOwnerIdFkeyInput>
  vehicleSizeToVehicleSizeId?: Maybe<SlotVehicleSizeIdFkeyInput>
  parkingSpaceToParkingSpaceId?: Maybe<SlotParkingSpaceIdFkeyInput>
  slotAmenitiesUsingId?: Maybe<SlotAmenitySlotIdFkeyInverseInput>
  slotAvailabilitiesUsingId?: Maybe<SlotAvailabilitySlotIdFkeyInverseInput>
  slotBookingsUsingId?: Maybe<FakeApiSlotBookingsForeignKey0InverseInput>
}

/** Input for the nested mutation of `parkingSpace` in the `SlotInput` mutation. */
export type SlotParkingSpaceIdFkeyInput = {
  /** The primary key(s) for `parkingSpace` for the far side of the relationship. */
  connectById?: Maybe<ParkingSpaceParkingSpacePkeyConnect>
  /** The primary key(s) for `parkingSpace` for the far side of the relationship. */
  connectBySlug?: Maybe<ParkingSpaceParkingSpaceSlugUkeyConnect>
  /** The primary key(s) for `parkingSpace` for the far side of the relationship. */
  connectByNodeId?: Maybe<ParkingSpaceNodeIdConnect>
  /** The primary key(s) for `parkingSpace` for the far side of the relationship. */
  deleteById?: Maybe<ParkingSpaceParkingSpacePkeyDelete>
  /** The primary key(s) for `parkingSpace` for the far side of the relationship. */
  deleteBySlug?: Maybe<ParkingSpaceParkingSpaceSlugUkeyDelete>
  /** The primary key(s) for `parkingSpace` for the far side of the relationship. */
  deleteByNodeId?: Maybe<ParkingSpaceNodeIdDelete>
  /** The primary key(s) and patch data for `parkingSpace` for the far side of the relationship. */
  updateById?: Maybe<ParkingSpaceOnSlotForSlotParkingSpaceIdFkeyUsingParkingSpacePkeyUpdate>
  /** The primary key(s) and patch data for `parkingSpace` for the far side of the relationship. */
  updateBySlug?: Maybe<ParkingSpaceOnSlotForSlotParkingSpaceIdFkeyUsingParkingSpaceSlugUkeyUpdate>
  /** The primary key(s) and patch data for `parkingSpace` for the far side of the relationship. */
  updateByNodeId?: Maybe<SlotOnSlotForSlotParkingSpaceIdFkeyNodeIdUpdate>
  /** A `ParkingSpaceInput` object that will be created and connected to this object. */
  create?: Maybe<SlotParkingSpaceIdFkeyParkingSpaceCreateInput>
}

/** The fields on `parkingSpace` to look up the row to connect. */
export type ParkingSpaceParkingSpacePkeyConnect = {
  id: Scalars['UUID']
}

/** The fields on `parkingSpace` to look up the row to connect. */
export type ParkingSpaceParkingSpaceSlugUkeyConnect = {
  slug: Scalars['String']
}

/** The globally unique `ID` look up for the row to connect. */
export type ParkingSpaceNodeIdConnect = {
  /** The globally unique `ID` which identifies a single `parkingSpace` to be connected. */
  nodeId: Scalars['ID']
}

/** The fields on `parkingSpace` to look up the row to delete. */
export type ParkingSpaceParkingSpacePkeyDelete = {
  id: Scalars['UUID']
}

/** The fields on `parkingSpace` to look up the row to delete. */
export type ParkingSpaceParkingSpaceSlugUkeyDelete = {
  slug: Scalars['String']
}

/** The globally unique `ID` look up for the row to delete. */
export type ParkingSpaceNodeIdDelete = {
  /** The globally unique `ID` which identifies a single `parkingSpace` to be deleted. */
  nodeId: Scalars['ID']
}

/** The fields on `parkingSpace` to look up the row to update. */
export type ParkingSpaceOnSlotForSlotParkingSpaceIdFkeyUsingParkingSpacePkeyUpdate = {
  /** An object where the defined keys will be set on the `parkingSpace` being updated. */
  patch: UpdateParkingSpaceOnSlotForSlotParkingSpaceIdFkeyPatch
  id: Scalars['UUID']
}

/** An object where the defined keys will be set on the `parkingSpace` being updated. */
export type UpdateParkingSpaceOnSlotForSlotParkingSpaceIdFkeyPatch = {
  id?: Maybe<Scalars['UUID']>
  ownerId?: Maybe<Scalars['UUID']>
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  photoUrl?: Maybe<Scalars['String']>
  settings?: Maybe<Scalars['JSON']>
  address?: Maybe<Scalars['JSON']>
  location?: Maybe<Scalars['GeoJSON']>
  slug?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  carEntry?: Maybe<Scalars['GeoJSON']>
  carExit?: Maybe<Scalars['GeoJSON']>
  companyEntrance?: Maybe<Scalars['GeoJSON']>
  parkingspaceMapview?: Maybe<Scalars['GeoJSON']>
  brandLogo?: Maybe<Scalars['String']>
  workingHours?: Maybe<Scalars['JSON']>
  advtLink?: Maybe<Scalars['String']>
  bluePrint?: Maybe<Scalars['String']>
  hiddenField?: Maybe<Scalars['String']>
  pedestrianText?: Maybe<Scalars['String']>
  languageCode?: Maybe<Scalars['String']>
  contributorId?: Maybe<Scalars['UUID']>
  floor?: Maybe<Scalars['Int']>
  category?: Maybe<SpaceCategory>
  status?: Maybe<ParkingSpaceStatus>
  verificationStatus?: Maybe<SpaceVerificationStatus>
  accessRestriction?: Maybe<Array<Maybe<SpaceAccessRestriction>>>
  deleted?: Maybe<Scalars['Boolean']>
  deletedAt?: Maybe<Scalars['Datetime']>
  businessStatusReason?: Maybe<Scalars['String']>
  userToOwnerId?: Maybe<ParkingSpaceOwnerIdFkeyInput>
  slotsUsingId?: Maybe<SlotParkingSpaceIdFkeyInverseInput>
  parkingSpaceAvailabilitiesUsingId?: Maybe<ParkingSpaceAvailabilityParkingSpaceIdFkeyInverseInput>
}

/** Input for the nested mutation of `user` in the `ParkingSpaceInput` mutation. */
export type ParkingSpaceOwnerIdFkeyInput = {
  /** The primary key(s) for `user` for the far side of the relationship. */
  connectById?: Maybe<UserUserPkeyConnect>
  /** The primary key(s) for `user` for the far side of the relationship. */
  connectByNodeId?: Maybe<UserNodeIdConnect>
  /** The primary key(s) for `user` for the far side of the relationship. */
  deleteById?: Maybe<UserUserPkeyDelete>
  /** The primary key(s) for `user` for the far side of the relationship. */
  deleteByNodeId?: Maybe<UserNodeIdDelete>
  /** The primary key(s) and patch data for `user` for the far side of the relationship. */
  updateById?: Maybe<UserOnParkingSpaceForParkingSpaceOwnerIdFkeyUsingUserPkeyUpdate>
  /** The primary key(s) and patch data for `user` for the far side of the relationship. */
  updateByNodeId?: Maybe<ParkingSpaceOnParkingSpaceForParkingSpaceOwnerIdFkeyNodeIdUpdate>
}

/** The fields on `user` to look up the row to update. */
export type UserOnParkingSpaceForParkingSpaceOwnerIdFkeyUsingUserPkeyUpdate = {
  /** An object where the defined keys will be set on the `user` being updated. */
  patch: UpdateUserOnParkingSpaceForParkingSpaceOwnerIdFkeyPatch
  id: Scalars['UUID']
}

/** An object where the defined keys will be set on the `user` being updated. */
export type UpdateUserOnParkingSpaceForParkingSpaceOwnerIdFkeyPatch = {
  id?: Maybe<Scalars['UUID']>
  name?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['Email']>
  emailConfirmed?: Maybe<Scalars['Boolean']>
  status?: Maybe<StatusT>
  role?: Maybe<Scalars['String']>
  photoUrl?: Maybe<Scalars['String']>
  phone?: Maybe<Scalars['PhoneUs']>
  address?: Maybe<Scalars['JSON']>
  settings?: Maybe<Scalars['JSON']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  /** handles soft delete */
  deleted?: Maybe<Scalars['Boolean']>
  /** shows when is soft deleted */
  deletedAt?: Maybe<Scalars['Datetime']>
  slotsUsingId?: Maybe<SlotOwnerIdFkeyInverseInput>
  vehiclesUsingId?: Maybe<VehicleOwnerIdFkeyInverseInput>
  billingProfilesUsingId?: Maybe<BillingProfileUserIdFkeyInverseInput>
  userSubscriptionsUsingId?: Maybe<UserSubscriptionUserIdFkeyInverseInput>
  parkingSpacesUsingId?: Maybe<ParkingSpaceOwnerIdFkeyInverseInput>
  businessesUsingId?: Maybe<BusinessOwnerIdFkeyInverseInput>
  paymentReceiptsUsingId?: Maybe<PaymentReceiptOwnerIdFkeyInverseInput>
  slotBookingsUsingId?: Maybe<FakeApiSlotBookingsForeignKey1InverseInput>
}

/** Input for the nested mutation of `vehicle` in the `UserInput` mutation. */
export type VehicleOwnerIdFkeyInverseInput = {
  /** Flag indicating whether all other `vehicle` records that match this relationship should be removed. */
  deleteOthers?: Maybe<Scalars['Boolean']>
  /** The primary key(s) for `vehicle` for the far side of the relationship. */
  connectById?: Maybe<Array<VehicleVehiclePkeyConnect>>
  /** The primary key(s) for `vehicle` for the far side of the relationship. */
  connectByNodeId?: Maybe<Array<VehicleNodeIdConnect>>
  /** The primary key(s) for `vehicle` for the far side of the relationship. */
  deleteById?: Maybe<Array<VehicleVehiclePkeyDelete>>
  /** The primary key(s) for `vehicle` for the far side of the relationship. */
  deleteByNodeId?: Maybe<Array<VehicleNodeIdDelete>>
  /** The primary key(s) and patch data for `vehicle` for the far side of the relationship. */
  updateById?: Maybe<Array<VehicleOnVehicleForVehicleOwnerIdFkeyUsingVehiclePkeyUpdate>>
  /** The primary key(s) and patch data for `vehicle` for the far side of the relationship. */
  updateByNodeId?: Maybe<Array<UserOnVehicleForVehicleOwnerIdFkeyNodeIdUpdate>>
  /** A `VehicleInput` object that will be created and connected to this object. */
  create?: Maybe<Array<VehicleOwnerIdFkeyVehicleCreateInput>>
}

/** The fields on `vehicle` to look up the row to connect. */
export type VehicleVehiclePkeyConnect = {
  id: Scalars['UUID']
}

/** The globally unique `ID` look up for the row to connect. */
export type VehicleNodeIdConnect = {
  /** The globally unique `ID` which identifies a single `vehicle` to be connected. */
  nodeId: Scalars['ID']
}

/** The fields on `vehicle` to look up the row to delete. */
export type VehicleVehiclePkeyDelete = {
  id: Scalars['UUID']
}

/** The globally unique `ID` look up for the row to delete. */
export type VehicleNodeIdDelete = {
  /** The globally unique `ID` which identifies a single `vehicle` to be deleted. */
  nodeId: Scalars['ID']
}

/** The fields on `vehicle` to look up the row to update. */
export type VehicleOnVehicleForVehicleOwnerIdFkeyUsingVehiclePkeyUpdate = {
  /** An object where the defined keys will be set on the `vehicle` being updated. */
  patch: UpdateVehicleOnVehicleForVehicleOwnerIdFkeyPatch
  id: Scalars['UUID']
}

/** An object where the defined keys will be set on the `vehicle` being updated. */
export type UpdateVehicleOnVehicleForVehicleOwnerIdFkeyPatch = {
  id?: Maybe<Scalars['UUID']>
  name?: Maybe<Scalars['String']>
  licensePlate?: Maybe<Scalars['String']>
  vehicleTypeId?: Maybe<Scalars['UUID']>
  vehicleSizeId?: Maybe<Scalars['UUID']>
  status?: Maybe<StatusT>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  userToOwnerId?: Maybe<VehicleOwnerIdFkeyInput>
  vehicleTypeToVehicleTypeId?: Maybe<VehicleVehicleTypeIdFkeyInput>
  vehicleSizeToVehicleSizeId?: Maybe<VehicleVehicleSizeIdFkeyInput>
}

/** Input for the nested mutation of `user` in the `VehicleInput` mutation. */
export type VehicleOwnerIdFkeyInput = {
  /** The primary key(s) for `user` for the far side of the relationship. */
  connectById?: Maybe<UserUserPkeyConnect>
  /** The primary key(s) for `user` for the far side of the relationship. */
  connectByNodeId?: Maybe<UserNodeIdConnect>
  /** The primary key(s) for `user` for the far side of the relationship. */
  deleteById?: Maybe<UserUserPkeyDelete>
  /** The primary key(s) for `user` for the far side of the relationship. */
  deleteByNodeId?: Maybe<UserNodeIdDelete>
  /** The primary key(s) and patch data for `user` for the far side of the relationship. */
  updateById?: Maybe<UserOnVehicleForVehicleOwnerIdFkeyUsingUserPkeyUpdate>
  /** The primary key(s) and patch data for `user` for the far side of the relationship. */
  updateByNodeId?: Maybe<VehicleOnVehicleForVehicleOwnerIdFkeyNodeIdUpdate>
}

/** The fields on `user` to look up the row to update. */
export type UserOnVehicleForVehicleOwnerIdFkeyUsingUserPkeyUpdate = {
  /** An object where the defined keys will be set on the `user` being updated. */
  patch: UpdateUserOnVehicleForVehicleOwnerIdFkeyPatch
  id: Scalars['UUID']
}

/** An object where the defined keys will be set on the `user` being updated. */
export type UpdateUserOnVehicleForVehicleOwnerIdFkeyPatch = {
  id?: Maybe<Scalars['UUID']>
  name?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['Email']>
  emailConfirmed?: Maybe<Scalars['Boolean']>
  status?: Maybe<StatusT>
  role?: Maybe<Scalars['String']>
  photoUrl?: Maybe<Scalars['String']>
  phone?: Maybe<Scalars['PhoneUs']>
  address?: Maybe<Scalars['JSON']>
  settings?: Maybe<Scalars['JSON']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  /** handles soft delete */
  deleted?: Maybe<Scalars['Boolean']>
  /** shows when is soft deleted */
  deletedAt?: Maybe<Scalars['Datetime']>
  slotsUsingId?: Maybe<SlotOwnerIdFkeyInverseInput>
  vehiclesUsingId?: Maybe<VehicleOwnerIdFkeyInverseInput>
  billingProfilesUsingId?: Maybe<BillingProfileUserIdFkeyInverseInput>
  userSubscriptionsUsingId?: Maybe<UserSubscriptionUserIdFkeyInverseInput>
  parkingSpacesUsingId?: Maybe<ParkingSpaceOwnerIdFkeyInverseInput>
  businessesUsingId?: Maybe<BusinessOwnerIdFkeyInverseInput>
  paymentReceiptsUsingId?: Maybe<PaymentReceiptOwnerIdFkeyInverseInput>
  slotBookingsUsingId?: Maybe<FakeApiSlotBookingsForeignKey1InverseInput>
}

/** Input for the nested mutation of `billingProfile` in the `UserInput` mutation. */
export type BillingProfileUserIdFkeyInverseInput = {
  /** Flag indicating whether all other `billingProfile` records that match this relationship should be removed. */
  deleteOthers?: Maybe<Scalars['Boolean']>
  /** The primary key(s) for `billingProfile` for the far side of the relationship. */
  connectById?: Maybe<Array<BillingProfileBillingProfilePkeyConnect>>
  /** The primary key(s) for `billingProfile` for the far side of the relationship. */
  connectByNodeId?: Maybe<Array<BillingProfileNodeIdConnect>>
  /** The primary key(s) for `billingProfile` for the far side of the relationship. */
  deleteById?: Maybe<Array<BillingProfileBillingProfilePkeyDelete>>
  /** The primary key(s) for `billingProfile` for the far side of the relationship. */
  deleteByNodeId?: Maybe<Array<BillingProfileNodeIdDelete>>
  /** The primary key(s) and patch data for `billingProfile` for the far side of the relationship. */
  updateById?: Maybe<
    Array<BillingProfileOnBillingProfileForBillingProfileUserIdFkeyUsingBillingProfilePkeyUpdate>
  >
  /** The primary key(s) and patch data for `billingProfile` for the far side of the relationship. */
  updateByNodeId?: Maybe<Array<UserOnBillingProfileForBillingProfileUserIdFkeyNodeIdUpdate>>
}

/** The fields on `billingProfile` to look up the row to connect. */
export type BillingProfileBillingProfilePkeyConnect = {
  id: Scalars['UUID']
}

/** The globally unique `ID` look up for the row to connect. */
export type BillingProfileNodeIdConnect = {
  /** The globally unique `ID` which identifies a single `billingProfile` to be connected. */
  nodeId: Scalars['ID']
}

/** The fields on `billingProfile` to look up the row to delete. */
export type BillingProfileBillingProfilePkeyDelete = {
  id: Scalars['UUID']
}

/** The globally unique `ID` look up for the row to delete. */
export type BillingProfileNodeIdDelete = {
  /** The globally unique `ID` which identifies a single `billingProfile` to be deleted. */
  nodeId: Scalars['ID']
}

/** The fields on `billingProfile` to look up the row to update. */
export type BillingProfileOnBillingProfileForBillingProfileUserIdFkeyUsingBillingProfilePkeyUpdate = {
  /** An object where the defined keys will be set on the `billingProfile` being updated. */
  patch: UpdateBillingProfileOnBillingProfileForBillingProfileUserIdFkeyPatch
  id: Scalars['UUID']
}

/** An object where the defined keys will be set on the `billingProfile` being updated. */
export type UpdateBillingProfileOnBillingProfileForBillingProfileUserIdFkeyPatch = {
  id?: Maybe<Scalars['UUID']>
  customerId?: Maybe<Scalars['String']>
  customerObj?: Maybe<Scalars['JSON']>
  billingDetails?: Maybe<Scalars['JSON']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  userToUserId?: Maybe<BillingProfileUserIdFkeyInput>
  userSubscriptionsUsingId?: Maybe<UserSubscriptionBillingProfileIdFkeyInverseInput>
}

/** Input for the nested mutation of `user` in the `BillingProfileInput` mutation. */
export type BillingProfileUserIdFkeyInput = {
  /** The primary key(s) for `user` for the far side of the relationship. */
  connectById?: Maybe<UserUserPkeyConnect>
  /** The primary key(s) for `user` for the far side of the relationship. */
  connectByNodeId?: Maybe<UserNodeIdConnect>
  /** The primary key(s) for `user` for the far side of the relationship. */
  deleteById?: Maybe<UserUserPkeyDelete>
  /** The primary key(s) for `user` for the far side of the relationship. */
  deleteByNodeId?: Maybe<UserNodeIdDelete>
  /** The primary key(s) and patch data for `user` for the far side of the relationship. */
  updateById?: Maybe<UserOnBillingProfileForBillingProfileUserIdFkeyUsingUserPkeyUpdate>
  /** The primary key(s) and patch data for `user` for the far side of the relationship. */
  updateByNodeId?: Maybe<BillingProfileOnBillingProfileForBillingProfileUserIdFkeyNodeIdUpdate>
}

/** The fields on `user` to look up the row to update. */
export type UserOnBillingProfileForBillingProfileUserIdFkeyUsingUserPkeyUpdate = {
  /** An object where the defined keys will be set on the `user` being updated. */
  patch: UpdateUserOnBillingProfileForBillingProfileUserIdFkeyPatch
  id: Scalars['UUID']
}

/** An object where the defined keys will be set on the `user` being updated. */
export type UpdateUserOnBillingProfileForBillingProfileUserIdFkeyPatch = {
  id?: Maybe<Scalars['UUID']>
  name?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['Email']>
  emailConfirmed?: Maybe<Scalars['Boolean']>
  status?: Maybe<StatusT>
  role?: Maybe<Scalars['String']>
  photoUrl?: Maybe<Scalars['String']>
  phone?: Maybe<Scalars['PhoneUs']>
  address?: Maybe<Scalars['JSON']>
  settings?: Maybe<Scalars['JSON']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  /** handles soft delete */
  deleted?: Maybe<Scalars['Boolean']>
  /** shows when is soft deleted */
  deletedAt?: Maybe<Scalars['Datetime']>
  slotsUsingId?: Maybe<SlotOwnerIdFkeyInverseInput>
  vehiclesUsingId?: Maybe<VehicleOwnerIdFkeyInverseInput>
  billingProfilesUsingId?: Maybe<BillingProfileUserIdFkeyInverseInput>
  userSubscriptionsUsingId?: Maybe<UserSubscriptionUserIdFkeyInverseInput>
  parkingSpacesUsingId?: Maybe<ParkingSpaceOwnerIdFkeyInverseInput>
  businessesUsingId?: Maybe<BusinessOwnerIdFkeyInverseInput>
  paymentReceiptsUsingId?: Maybe<PaymentReceiptOwnerIdFkeyInverseInput>
  slotBookingsUsingId?: Maybe<FakeApiSlotBookingsForeignKey1InverseInput>
}

/** Input for the nested mutation of `userSubscription` in the `UserInput` mutation. */
export type UserSubscriptionUserIdFkeyInverseInput = {
  /** Flag indicating whether all other `userSubscription` records that match this relationship should be removed. */
  deleteOthers?: Maybe<Scalars['Boolean']>
  /** The primary key(s) for `userSubscription` for the far side of the relationship. */
  connectById?: Maybe<Array<UserSubscriptionUserSubscriptionPkeyConnect>>
  /** The primary key(s) for `userSubscription` for the far side of the relationship. */
  connectByNodeId?: Maybe<Array<UserSubscriptionNodeIdConnect>>
  /** The primary key(s) for `userSubscription` for the far side of the relationship. */
  deleteById?: Maybe<Array<UserSubscriptionUserSubscriptionPkeyDelete>>
  /** The primary key(s) for `userSubscription` for the far side of the relationship. */
  deleteByNodeId?: Maybe<Array<UserSubscriptionNodeIdDelete>>
  /** The primary key(s) and patch data for `userSubscription` for the far side of the relationship. */
  updateById?: Maybe<
    Array<
      UserSubscriptionOnUserSubscriptionForUserSubscriptionUserIdFkeyUsingUserSubscriptionPkeyUpdate
    >
  >
  /** The primary key(s) and patch data for `userSubscription` for the far side of the relationship. */
  updateByNodeId?: Maybe<Array<UserOnUserSubscriptionForUserSubscriptionUserIdFkeyNodeIdUpdate>>
}

/** The fields on `userSubscription` to look up the row to connect. */
export type UserSubscriptionUserSubscriptionPkeyConnect = {
  id: Scalars['UUID']
}

/** The globally unique `ID` look up for the row to connect. */
export type UserSubscriptionNodeIdConnect = {
  /** The globally unique `ID` which identifies a single `userSubscription` to be connected. */
  nodeId: Scalars['ID']
}

/** The fields on `userSubscription` to look up the row to delete. */
export type UserSubscriptionUserSubscriptionPkeyDelete = {
  id: Scalars['UUID']
}

/** The globally unique `ID` look up for the row to delete. */
export type UserSubscriptionNodeIdDelete = {
  /** The globally unique `ID` which identifies a single `userSubscription` to be deleted. */
  nodeId: Scalars['ID']
}

/** The fields on `userSubscription` to look up the row to update. */
export type UserSubscriptionOnUserSubscriptionForUserSubscriptionUserIdFkeyUsingUserSubscriptionPkeyUpdate = {
  /** An object where the defined keys will be set on the `userSubscription` being updated. */
  patch: UpdateUserSubscriptionOnUserSubscriptionForUserSubscriptionUserIdFkeyPatch
  id: Scalars['UUID']
}

/** An object where the defined keys will be set on the `userSubscription` being updated. */
export type UpdateUserSubscriptionOnUserSubscriptionForUserSubscriptionUserIdFkeyPatch = {
  id?: Maybe<Scalars['UUID']>
  billingProfileId?: Maybe<Scalars['UUID']>
  planSubscriptionId?: Maybe<Scalars['String']>
  status?: Maybe<SubscriptionStatusT>
  endsAt?: Maybe<Scalars['Datetime']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  userToUserId?: Maybe<UserSubscriptionUserIdFkeyInput>
  billingProfileToBillingProfileId?: Maybe<UserSubscriptionBillingProfileIdFkeyInput>
}

/** Input for the nested mutation of `user` in the `UserSubscriptionInput` mutation. */
export type UserSubscriptionUserIdFkeyInput = {
  /** The primary key(s) for `user` for the far side of the relationship. */
  connectById?: Maybe<UserUserPkeyConnect>
  /** The primary key(s) for `user` for the far side of the relationship. */
  connectByNodeId?: Maybe<UserNodeIdConnect>
  /** The primary key(s) for `user` for the far side of the relationship. */
  deleteById?: Maybe<UserUserPkeyDelete>
  /** The primary key(s) for `user` for the far side of the relationship. */
  deleteByNodeId?: Maybe<UserNodeIdDelete>
  /** The primary key(s) and patch data for `user` for the far side of the relationship. */
  updateById?: Maybe<UserOnUserSubscriptionForUserSubscriptionUserIdFkeyUsingUserPkeyUpdate>
  /** The primary key(s) and patch data for `user` for the far side of the relationship. */
  updateByNodeId?: Maybe<
    UserSubscriptionOnUserSubscriptionForUserSubscriptionUserIdFkeyNodeIdUpdate
  >
}

/** The fields on `user` to look up the row to update. */
export type UserOnUserSubscriptionForUserSubscriptionUserIdFkeyUsingUserPkeyUpdate = {
  /** An object where the defined keys will be set on the `user` being updated. */
  patch: UpdateUserOnUserSubscriptionForUserSubscriptionUserIdFkeyPatch
  id: Scalars['UUID']
}

/** An object where the defined keys will be set on the `user` being updated. */
export type UpdateUserOnUserSubscriptionForUserSubscriptionUserIdFkeyPatch = {
  id?: Maybe<Scalars['UUID']>
  name?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['Email']>
  emailConfirmed?: Maybe<Scalars['Boolean']>
  status?: Maybe<StatusT>
  role?: Maybe<Scalars['String']>
  photoUrl?: Maybe<Scalars['String']>
  phone?: Maybe<Scalars['PhoneUs']>
  address?: Maybe<Scalars['JSON']>
  settings?: Maybe<Scalars['JSON']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  /** handles soft delete */
  deleted?: Maybe<Scalars['Boolean']>
  /** shows when is soft deleted */
  deletedAt?: Maybe<Scalars['Datetime']>
  slotsUsingId?: Maybe<SlotOwnerIdFkeyInverseInput>
  vehiclesUsingId?: Maybe<VehicleOwnerIdFkeyInverseInput>
  billingProfilesUsingId?: Maybe<BillingProfileUserIdFkeyInverseInput>
  userSubscriptionsUsingId?: Maybe<UserSubscriptionUserIdFkeyInverseInput>
  parkingSpacesUsingId?: Maybe<ParkingSpaceOwnerIdFkeyInverseInput>
  businessesUsingId?: Maybe<BusinessOwnerIdFkeyInverseInput>
  paymentReceiptsUsingId?: Maybe<PaymentReceiptOwnerIdFkeyInverseInput>
  slotBookingsUsingId?: Maybe<FakeApiSlotBookingsForeignKey1InverseInput>
}

/** Input for the nested mutation of `parkingSpace` in the `UserInput` mutation. */
export type ParkingSpaceOwnerIdFkeyInverseInput = {
  /** Flag indicating whether all other `parkingSpace` records that match this relationship should be removed. */
  deleteOthers?: Maybe<Scalars['Boolean']>
  /** The primary key(s) for `parkingSpace` for the far side of the relationship. */
  connectById?: Maybe<Array<ParkingSpaceParkingSpacePkeyConnect>>
  /** The primary key(s) for `parkingSpace` for the far side of the relationship. */
  connectBySlug?: Maybe<Array<ParkingSpaceParkingSpaceSlugUkeyConnect>>
  /** The primary key(s) for `parkingSpace` for the far side of the relationship. */
  connectByNodeId?: Maybe<Array<ParkingSpaceNodeIdConnect>>
  /** The primary key(s) for `parkingSpace` for the far side of the relationship. */
  deleteById?: Maybe<Array<ParkingSpaceParkingSpacePkeyDelete>>
  /** The primary key(s) for `parkingSpace` for the far side of the relationship. */
  deleteBySlug?: Maybe<Array<ParkingSpaceParkingSpaceSlugUkeyDelete>>
  /** The primary key(s) for `parkingSpace` for the far side of the relationship. */
  deleteByNodeId?: Maybe<Array<ParkingSpaceNodeIdDelete>>
  /** The primary key(s) and patch data for `parkingSpace` for the far side of the relationship. */
  updateById?: Maybe<
    Array<ParkingSpaceOnParkingSpaceForParkingSpaceOwnerIdFkeyUsingParkingSpacePkeyUpdate>
  >
  /** The primary key(s) and patch data for `parkingSpace` for the far side of the relationship. */
  updateBySlug?: Maybe<
    Array<ParkingSpaceOnParkingSpaceForParkingSpaceOwnerIdFkeyUsingParkingSpaceSlugUkeyUpdate>
  >
  /** The primary key(s) and patch data for `parkingSpace` for the far side of the relationship. */
  updateByNodeId?: Maybe<Array<UserOnParkingSpaceForParkingSpaceOwnerIdFkeyNodeIdUpdate>>
  /** A `ParkingSpaceInput` object that will be created and connected to this object. */
  create?: Maybe<Array<ParkingSpaceOwnerIdFkeyParkingSpaceCreateInput>>
}

/** The fields on `parkingSpace` to look up the row to update. */
export type ParkingSpaceOnParkingSpaceForParkingSpaceOwnerIdFkeyUsingParkingSpacePkeyUpdate = {
  /** An object where the defined keys will be set on the `parkingSpace` being updated. */
  patch: UpdateParkingSpaceOnParkingSpaceForParkingSpaceOwnerIdFkeyPatch
  id: Scalars['UUID']
}

/** An object where the defined keys will be set on the `parkingSpace` being updated. */
export type UpdateParkingSpaceOnParkingSpaceForParkingSpaceOwnerIdFkeyPatch = {
  id?: Maybe<Scalars['UUID']>
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  photoUrl?: Maybe<Scalars['String']>
  settings?: Maybe<Scalars['JSON']>
  address?: Maybe<Scalars['JSON']>
  location?: Maybe<Scalars['GeoJSON']>
  slug?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  carEntry?: Maybe<Scalars['GeoJSON']>
  carExit?: Maybe<Scalars['GeoJSON']>
  companyEntrance?: Maybe<Scalars['GeoJSON']>
  parkingspaceMapview?: Maybe<Scalars['GeoJSON']>
  brandLogo?: Maybe<Scalars['String']>
  workingHours?: Maybe<Scalars['JSON']>
  advtLink?: Maybe<Scalars['String']>
  bluePrint?: Maybe<Scalars['String']>
  hiddenField?: Maybe<Scalars['String']>
  pedestrianText?: Maybe<Scalars['String']>
  languageCode?: Maybe<Scalars['String']>
  contributorId?: Maybe<Scalars['UUID']>
  floor?: Maybe<Scalars['Int']>
  category?: Maybe<SpaceCategory>
  status?: Maybe<ParkingSpaceStatus>
  verificationStatus?: Maybe<SpaceVerificationStatus>
  accessRestriction?: Maybe<Array<Maybe<SpaceAccessRestriction>>>
  deleted?: Maybe<Scalars['Boolean']>
  deletedAt?: Maybe<Scalars['Datetime']>
  businessStatusReason?: Maybe<Scalars['String']>
  userToOwnerId?: Maybe<ParkingSpaceOwnerIdFkeyInput>
  slotsUsingId?: Maybe<SlotParkingSpaceIdFkeyInverseInput>
  parkingSpaceAvailabilitiesUsingId?: Maybe<ParkingSpaceAvailabilityParkingSpaceIdFkeyInverseInput>
}

/** Input for the nested mutation of `slot` in the `ParkingSpaceInput` mutation. */
export type SlotParkingSpaceIdFkeyInverseInput = {
  /** Flag indicating whether all other `slot` records that match this relationship should be removed. */
  deleteOthers?: Maybe<Scalars['Boolean']>
  /** The primary key(s) for `slot` for the far side of the relationship. */
  connectById?: Maybe<Array<SlotSlotPkeyConnect>>
  /** The primary key(s) for `slot` for the far side of the relationship. */
  connectByNodeId?: Maybe<Array<SlotNodeIdConnect>>
  /** The primary key(s) for `slot` for the far side of the relationship. */
  deleteById?: Maybe<Array<SlotSlotPkeyDelete>>
  /** The primary key(s) for `slot` for the far side of the relationship. */
  deleteByNodeId?: Maybe<Array<SlotNodeIdDelete>>
  /** The primary key(s) and patch data for `slot` for the far side of the relationship. */
  updateById?: Maybe<Array<SlotOnSlotForSlotParkingSpaceIdFkeyUsingSlotPkeyUpdate>>
  /** The primary key(s) and patch data for `slot` for the far side of the relationship. */
  updateByNodeId?: Maybe<Array<ParkingSpaceOnSlotForSlotParkingSpaceIdFkeyNodeIdUpdate>>
  /** A `SlotInput` object that will be created and connected to this object. */
  create?: Maybe<Array<SlotParkingSpaceIdFkeySlotCreateInput>>
}

/** The fields on `slot` to look up the row to update. */
export type SlotOnSlotForSlotParkingSpaceIdFkeyUsingSlotPkeyUpdate = {
  /** An object where the defined keys will be set on the `slot` being updated. */
  patch: UpdateSlotOnSlotForSlotParkingSpaceIdFkeyPatch
  id: Scalars['UUID']
}

/** An object where the defined keys will be set on the `slot` being updated. */
export type UpdateSlotOnSlotForSlotParkingSpaceIdFkeyPatch = {
  id?: Maybe<Scalars['UUID']>
  name?: Maybe<Scalars['String']>
  ownerId?: Maybe<Scalars['UUID']>
  vehicleSizeId?: Maybe<Scalars['UUID']>
  address?: Maybe<Scalars['JSON']>
  timezone?: Maybe<Scalars['String']>
  pricePerHour?: Maybe<Scalars['BigFloat']>
  status?: Maybe<SlotStatusT>
  photoUrl?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  notes?: Maybe<Scalars['String']>
  slug?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  deleted?: Maybe<Scalars['Boolean']>
  deletedAt?: Maybe<Scalars['Datetime']>
  verificationStatus?: Maybe<SlotVerificationStatus>
  location?: Maybe<Scalars['GeoJSON']>
  shape?: Maybe<Scalars['GeoJSON']>
  accessRestrictions?: Maybe<AccessRestrictions>
  businessStatus?: Maybe<SlotBusinessStatus>
  businessStatusReason?: Maybe<Scalars['String']>
  category?: Maybe<SlotCategory>
  contributorId?: Maybe<Scalars['UUID']>
  level?: Maybe<Scalars['Int']>
  mapSource?: Maybe<Scalars['UUID']>
  slotDimensions?: Maybe<Scalars['JSON']>
  tempUnavailable?: Maybe<Scalars['Boolean']>
  tempUnavailableFrom?: Maybe<Scalars['Datetime']>
  tempUnavailableTo?: Maybe<Scalars['Datetime']>
  waypoints?: Maybe<Scalars['JSON']>
  userToOwnerId?: Maybe<SlotOwnerIdFkeyInput>
  vehicleSizeToVehicleSizeId?: Maybe<SlotVehicleSizeIdFkeyInput>
  parkingSpaceToParkingSpaceId?: Maybe<SlotParkingSpaceIdFkeyInput>
  slotAmenitiesUsingId?: Maybe<SlotAmenitySlotIdFkeyInverseInput>
  slotAvailabilitiesUsingId?: Maybe<SlotAvailabilitySlotIdFkeyInverseInput>
  slotBookingsUsingId?: Maybe<FakeApiSlotBookingsForeignKey0InverseInput>
}

/** Input for the nested mutation of `slotAmenity` in the `SlotInput` mutation. */
export type SlotAmenitySlotIdFkeyInverseInput = {
  /** Flag indicating whether all other `slotAmenity` records that match this relationship should be removed. */
  deleteOthers?: Maybe<Scalars['Boolean']>
  /** The primary key(s) for `slotAmenity` for the far side of the relationship. */
  connectById?: Maybe<Array<SlotAmenitySlotAmenityPkeyConnect>>
  /** The primary key(s) for `slotAmenity` for the far side of the relationship. */
  connectByNodeId?: Maybe<Array<SlotAmenityNodeIdConnect>>
  /** The primary key(s) for `slotAmenity` for the far side of the relationship. */
  deleteById?: Maybe<Array<SlotAmenitySlotAmenityPkeyDelete>>
  /** The primary key(s) for `slotAmenity` for the far side of the relationship. */
  deleteByNodeId?: Maybe<Array<SlotAmenityNodeIdDelete>>
  /** The primary key(s) and patch data for `slotAmenity` for the far side of the relationship. */
  updateById?: Maybe<
    Array<SlotAmenityOnSlotAmenityForSlotAmenitySlotIdFkeyUsingSlotAmenityPkeyUpdate>
  >
  /** The primary key(s) and patch data for `slotAmenity` for the far side of the relationship. */
  updateByNodeId?: Maybe<Array<SlotOnSlotAmenityForSlotAmenitySlotIdFkeyNodeIdUpdate>>
  /** A `SlotAmenityInput` object that will be created and connected to this object. */
  create?: Maybe<Array<SlotAmenitySlotIdFkeySlotAmenityCreateInput>>
}

/** The fields on `slotAmenity` to look up the row to update. */
export type SlotAmenityOnSlotAmenityForSlotAmenitySlotIdFkeyUsingSlotAmenityPkeyUpdate = {
  /** An object where the defined keys will be set on the `slotAmenity` being updated. */
  patch: UpdateSlotAmenityOnSlotAmenityForSlotAmenitySlotIdFkeyPatch
  id: Scalars['UUID']
}

/** An object where the defined keys will be set on the `slotAmenity` being updated. */
export type UpdateSlotAmenityOnSlotAmenityForSlotAmenitySlotIdFkeyPatch = {
  slotToSlotId?: Maybe<SlotAmenitySlotIdFkeyInput>
  amenityId?: Maybe<Scalars['UUID']>
  amenityToAmenityId?: Maybe<SlotAmenityAmenityIdFkeyInput>
}

/** Input for the nested mutation of `amenity` in the `SlotAmenityInput` mutation. */
export type SlotAmenityAmenityIdFkeyInput = {
  /** The primary key(s) for `amenity` for the far side of the relationship. */
  connectById?: Maybe<AmenityAmenityPkeyConnect>
  /** The primary key(s) for `amenity` for the far side of the relationship. */
  connectByNodeId?: Maybe<AmenityNodeIdConnect>
  /** The primary key(s) for `amenity` for the far side of the relationship. */
  deleteById?: Maybe<AmenityAmenityPkeyDelete>
  /** The primary key(s) for `amenity` for the far side of the relationship. */
  deleteByNodeId?: Maybe<AmenityNodeIdDelete>
  /** The primary key(s) and patch data for `amenity` for the far side of the relationship. */
  updateById?: Maybe<AmenityOnSlotAmenityForSlotAmenityAmenityIdFkeyUsingAmenityPkeyUpdate>
  /** The primary key(s) and patch data for `amenity` for the far side of the relationship. */
  updateByNodeId?: Maybe<SlotAmenityOnSlotAmenityForSlotAmenityAmenityIdFkeyNodeIdUpdate>
  /** A `AmenityInput` object that will be created and connected to this object. */
  create?: Maybe<SlotAmenityAmenityIdFkeyAmenityCreateInput>
}

/** The fields on `amenity` to look up the row to connect. */
export type AmenityAmenityPkeyConnect = {
  id: Scalars['UUID']
}

/** The globally unique `ID` look up for the row to connect. */
export type AmenityNodeIdConnect = {
  /** The globally unique `ID` which identifies a single `amenity` to be connected. */
  nodeId: Scalars['ID']
}

/** The fields on `amenity` to look up the row to delete. */
export type AmenityAmenityPkeyDelete = {
  id: Scalars['UUID']
}

/** The globally unique `ID` look up for the row to delete. */
export type AmenityNodeIdDelete = {
  /** The globally unique `ID` which identifies a single `amenity` to be deleted. */
  nodeId: Scalars['ID']
}

/** The fields on `amenity` to look up the row to update. */
export type AmenityOnSlotAmenityForSlotAmenityAmenityIdFkeyUsingAmenityPkeyUpdate = {
  /** An object where the defined keys will be set on the `amenity` being updated. */
  patch: UpdateAmenityOnSlotAmenityForSlotAmenityAmenityIdFkeyPatch
  id: Scalars['UUID']
}

/** An object where the defined keys will be set on the `amenity` being updated. */
export type UpdateAmenityOnSlotAmenityForSlotAmenityAmenityIdFkeyPatch = {
  id?: Maybe<Scalars['UUID']>
  name?: Maybe<Scalars['String']>
  weight?: Maybe<Scalars['Int']>
  description?: Maybe<Scalars['String']>
  status?: Maybe<ContentStatusT>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  slug?: Maybe<Scalars['String']>
  slotAmenitiesUsingId?: Maybe<SlotAmenityAmenityIdFkeyInverseInput>
}

/** The globally unique `ID` look up for the row to update. */
export type SlotAmenityOnSlotAmenityForSlotAmenityAmenityIdFkeyNodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `amenity` to be connected. */
  nodeId: Scalars['ID']
  /** An object where the defined keys will be set on the `amenity` being updated. */
  patch: AmenityPatch
}

/** Represents an update to a `Amenity`. Fields that are set will be updated. */
export type AmenityPatch = {
  id?: Maybe<Scalars['UUID']>
  name?: Maybe<Scalars['String']>
  weight?: Maybe<Scalars['Int']>
  description?: Maybe<Scalars['String']>
  status?: Maybe<ContentStatusT>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  slug?: Maybe<Scalars['String']>
  slotAmenitiesUsingId?: Maybe<SlotAmenityAmenityIdFkeyInverseInput>
}

/** The `amenity` to be created by this mutation. */
export type SlotAmenityAmenityIdFkeyAmenityCreateInput = {
  id?: Maybe<Scalars['UUID']>
  name: Scalars['String']
  weight?: Maybe<Scalars['Int']>
  description?: Maybe<Scalars['String']>
  status?: Maybe<ContentStatusT>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  slug?: Maybe<Scalars['String']>
  slotAmenitiesUsingId?: Maybe<SlotAmenityAmenityIdFkeyInverseInput>
}

/** The globally unique `ID` look up for the row to update. */
export type SlotOnSlotAmenityForSlotAmenitySlotIdFkeyNodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `slotAmenity` to be connected. */
  nodeId: Scalars['ID']
  /** An object where the defined keys will be set on the `slotAmenity` being updated. */
  patch: SlotAmenityPatch
}

/** Represents an update to a `SlotAmenity`. Fields that are set will be updated. */
export type SlotAmenityPatch = {
  slotId?: Maybe<Scalars['UUID']>
  slotToSlotId?: Maybe<SlotAmenitySlotIdFkeyInput>
  amenityId?: Maybe<Scalars['UUID']>
  amenityToAmenityId?: Maybe<SlotAmenityAmenityIdFkeyInput>
}

/** The `slotAmenity` to be created by this mutation. */
export type SlotAmenitySlotIdFkeySlotAmenityCreateInput = {
  id?: Maybe<Scalars['UUID']>
  amenityId?: Maybe<Scalars['UUID']>
  slotToSlotId?: Maybe<SlotAmenitySlotIdFkeyInput>
  amenityToAmenityId?: Maybe<SlotAmenityAmenityIdFkeyInput>
}

/** Input for the nested mutation of `slotAvailability` in the `SlotInput` mutation. */
export type SlotAvailabilitySlotIdFkeyInverseInput = {
  /** Flag indicating whether all other `slotAvailability` records that match this relationship should be removed. */
  deleteOthers?: Maybe<Scalars['Boolean']>
  /** The primary key(s) for `slotAvailability` for the far side of the relationship. */
  connectById?: Maybe<Array<SlotAvailabilitySlotAvailabilityPkeyConnect>>
  /** The primary key(s) for `slotAvailability` for the far side of the relationship. */
  connectByNodeId?: Maybe<Array<SlotAvailabilityNodeIdConnect>>
  /** The primary key(s) for `slotAvailability` for the far side of the relationship. */
  deleteById?: Maybe<Array<SlotAvailabilitySlotAvailabilityPkeyDelete>>
  /** The primary key(s) for `slotAvailability` for the far side of the relationship. */
  deleteByNodeId?: Maybe<Array<SlotAvailabilityNodeIdDelete>>
  /** The primary key(s) and patch data for `slotAvailability` for the far side of the relationship. */
  updateById?: Maybe<
    Array<
      SlotAvailabilityOnSlotAvailabilityForSlotAvailabilitySlotIdFkeyUsingSlotAvailabilityPkeyUpdate
    >
  >
  /** The primary key(s) and patch data for `slotAvailability` for the far side of the relationship. */
  updateByNodeId?: Maybe<Array<SlotOnSlotAvailabilityForSlotAvailabilitySlotIdFkeyNodeIdUpdate>>
  /** A `SlotAvailabilityInput` object that will be created and connected to this object. */
  create?: Maybe<Array<SlotAvailabilitySlotIdFkeySlotAvailabilityCreateInput>>
}

/** The fields on `slotAvailability` to look up the row to connect. */
export type SlotAvailabilitySlotAvailabilityPkeyConnect = {
  id: Scalars['UUID']
}

/** The globally unique `ID` look up for the row to connect. */
export type SlotAvailabilityNodeIdConnect = {
  /** The globally unique `ID` which identifies a single `slotAvailability` to be connected. */
  nodeId: Scalars['ID']
}

/** The fields on `slotAvailability` to look up the row to delete. */
export type SlotAvailabilitySlotAvailabilityPkeyDelete = {
  id: Scalars['UUID']
}

/** The globally unique `ID` look up for the row to delete. */
export type SlotAvailabilityNodeIdDelete = {
  /** The globally unique `ID` which identifies a single `slotAvailability` to be deleted. */
  nodeId: Scalars['ID']
}

/** The fields on `slotAvailability` to look up the row to update. */
export type SlotAvailabilityOnSlotAvailabilityForSlotAvailabilitySlotIdFkeyUsingSlotAvailabilityPkeyUpdate = {
  /** An object where the defined keys will be set on the `slotAvailability` being updated. */
  patch: UpdateSlotAvailabilityOnSlotAvailabilityForSlotAvailabilitySlotIdFkeyPatch
  id: Scalars['UUID']
}

/** An object where the defined keys will be set on the `slotAvailability` being updated. */
export type UpdateSlotAvailabilityOnSlotAvailabilityForSlotAvailabilitySlotIdFkeyPatch = {
  id?: Maybe<Scalars['UUID']>
  dayOfWeek?: Maybe<Scalars['Int']>
  startHour?: Maybe<Scalars['Time']>
  endHour?: Maybe<Scalars['Time']>
  createdAt?: Maybe<Scalars['Datetime']>
  tariffPerHour?: Maybe<Scalars['BigFloat']>
  cancelCharge?: Maybe<Scalars['BigFloat']>
  tariffCurrency?: Maybe<Scalars['UUID']>
  slotToSlotId?: Maybe<SlotAvailabilitySlotIdFkeyInput>
}

/** Input for the nested mutation of `slot` in the `SlotAvailabilityInput` mutation. */
export type SlotAvailabilitySlotIdFkeyInput = {
  /** The primary key(s) for `slot` for the far side of the relationship. */
  connectById?: Maybe<SlotSlotPkeyConnect>
  /** The primary key(s) for `slot` for the far side of the relationship. */
  connectByNodeId?: Maybe<SlotNodeIdConnect>
  /** The primary key(s) for `slot` for the far side of the relationship. */
  deleteById?: Maybe<SlotSlotPkeyDelete>
  /** The primary key(s) for `slot` for the far side of the relationship. */
  deleteByNodeId?: Maybe<SlotNodeIdDelete>
  /** The primary key(s) and patch data for `slot` for the far side of the relationship. */
  updateById?: Maybe<SlotOnSlotAvailabilityForSlotAvailabilitySlotIdFkeyUsingSlotPkeyUpdate>
  /** The primary key(s) and patch data for `slot` for the far side of the relationship. */
  updateByNodeId?: Maybe<
    SlotAvailabilityOnSlotAvailabilityForSlotAvailabilitySlotIdFkeyNodeIdUpdate
  >
  /** A `SlotInput` object that will be created and connected to this object. */
  create?: Maybe<SlotAvailabilitySlotIdFkeySlotCreateInput>
}

/** The fields on `slot` to look up the row to update. */
export type SlotOnSlotAvailabilityForSlotAvailabilitySlotIdFkeyUsingSlotPkeyUpdate = {
  /** An object where the defined keys will be set on the `slot` being updated. */
  patch: UpdateSlotOnSlotAvailabilityForSlotAvailabilitySlotIdFkeyPatch
  id: Scalars['UUID']
}

/** An object where the defined keys will be set on the `slot` being updated. */
export type UpdateSlotOnSlotAvailabilityForSlotAvailabilitySlotIdFkeyPatch = {
  id?: Maybe<Scalars['UUID']>
  name?: Maybe<Scalars['String']>
  ownerId?: Maybe<Scalars['UUID']>
  vehicleSizeId?: Maybe<Scalars['UUID']>
  address?: Maybe<Scalars['JSON']>
  timezone?: Maybe<Scalars['String']>
  pricePerHour?: Maybe<Scalars['BigFloat']>
  status?: Maybe<SlotStatusT>
  photoUrl?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  notes?: Maybe<Scalars['String']>
  slug?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  deleted?: Maybe<Scalars['Boolean']>
  deletedAt?: Maybe<Scalars['Datetime']>
  verificationStatus?: Maybe<SlotVerificationStatus>
  parkingSpaceId?: Maybe<Scalars['UUID']>
  location?: Maybe<Scalars['GeoJSON']>
  shape?: Maybe<Scalars['GeoJSON']>
  accessRestrictions?: Maybe<AccessRestrictions>
  businessStatus?: Maybe<SlotBusinessStatus>
  businessStatusReason?: Maybe<Scalars['String']>
  category?: Maybe<SlotCategory>
  contributorId?: Maybe<Scalars['UUID']>
  level?: Maybe<Scalars['Int']>
  mapSource?: Maybe<Scalars['UUID']>
  slotDimensions?: Maybe<Scalars['JSON']>
  tempUnavailable?: Maybe<Scalars['Boolean']>
  tempUnavailableFrom?: Maybe<Scalars['Datetime']>
  tempUnavailableTo?: Maybe<Scalars['Datetime']>
  waypoints?: Maybe<Scalars['JSON']>
  userToOwnerId?: Maybe<SlotOwnerIdFkeyInput>
  vehicleSizeToVehicleSizeId?: Maybe<SlotVehicleSizeIdFkeyInput>
  parkingSpaceToParkingSpaceId?: Maybe<SlotParkingSpaceIdFkeyInput>
  slotAmenitiesUsingId?: Maybe<SlotAmenitySlotIdFkeyInverseInput>
  slotAvailabilitiesUsingId?: Maybe<SlotAvailabilitySlotIdFkeyInverseInput>
  slotBookingsUsingId?: Maybe<FakeApiSlotBookingsForeignKey0InverseInput>
}

/** Input for the nested mutation of `slotBooking` in the `SlotInput` mutation. */
export type FakeApiSlotBookingsForeignKey0InverseInput = {
  /** The primary key(s) for `slotBooking` for the far side of the relationship. */
  connectById?: Maybe<Array<SlotBookingFakeApiSlotBookingsPrimaryKeyConnect>>
  /** The primary key(s) for `slotBooking` for the far side of the relationship. */
  connectByNodeId?: Maybe<Array<SlotBookingNodeIdConnect>>
  /** The primary key(s) and patch data for `slotBooking` for the far side of the relationship. */
  updateById?: Maybe<
    Array<
      SlotBookingOnSlotBookingForFakeApiSlotBookingsForeignKey0UsingFakeApiSlotBookingsPrimaryKeyUpdate
    >
  >
  /** The primary key(s) and patch data for `slotBooking` for the far side of the relationship. */
  updateByNodeId?: Maybe<Array<SlotOnSlotBookingForFakeApiSlotBookingsForeignKey0NodeIdUpdate>>
}

/** The fields on `slotBooking` to look up the row to connect. */
export type SlotBookingFakeApiSlotBookingsPrimaryKeyConnect = {
  id: Scalars['UUID']
}

/** The globally unique `ID` look up for the row to connect. */
export type SlotBookingNodeIdConnect = {
  /** The globally unique `ID` which identifies a single `slotBooking` to be connected. */
  nodeId: Scalars['ID']
}

/** The fields on `slotBooking` to look up the row to update. */
export type SlotBookingOnSlotBookingForFakeApiSlotBookingsForeignKey0UsingFakeApiSlotBookingsPrimaryKeyUpdate = {
  /** An object where the defined keys will be set on the `slotBooking` being updated. */
  patch: UpdateSlotBookingOnSlotBookingForFakeApiSlotBookingsForeignKey0Patch
  id: Scalars['UUID']
}

/** An object where the defined keys will be set on the `slotBooking` being updated. */
export type UpdateSlotBookingOnSlotBookingForFakeApiSlotBookingsForeignKey0Patch = {
  status?: Maybe<BookingStatusT>
  paymentReceiptId?: Maybe<Scalars['UUID']>
  slotToSlotId?: Maybe<FakeApiSlotBookingsForeignKey0Input>
  userId?: Maybe<Scalars['UUID']>
  userToUserId?: Maybe<FakeApiSlotBookingsForeignKey1Input>
  paymentReceiptToPaymentReceiptId?: Maybe<FakeApiSlotBookingsForeignKey2Input>
}

/** Input for the nested mutation of `slot` in the `SlotBookingInput` mutation. */
export type FakeApiSlotBookingsForeignKey0Input = {
  /** The primary key(s) for `slot` for the far side of the relationship. */
  connectById?: Maybe<SlotSlotPkeyConnect>
  /** The primary key(s) for `slot` for the far side of the relationship. */
  connectByNodeId?: Maybe<SlotNodeIdConnect>
  /** The primary key(s) for `slot` for the far side of the relationship. */
  deleteById?: Maybe<SlotSlotPkeyDelete>
  /** The primary key(s) for `slot` for the far side of the relationship. */
  deleteByNodeId?: Maybe<SlotNodeIdDelete>
  /** The primary key(s) and patch data for `slot` for the far side of the relationship. */
  updateById?: Maybe<SlotOnSlotBookingForFakeApiSlotBookingsForeignKey0UsingSlotPkeyUpdate>
  /** The primary key(s) and patch data for `slot` for the far side of the relationship. */
  updateByNodeId?: Maybe<SlotBookingOnSlotBookingForFakeApiSlotBookingsForeignKey0NodeIdUpdate>
}

/** The fields on `slot` to look up the row to update. */
export type SlotOnSlotBookingForFakeApiSlotBookingsForeignKey0UsingSlotPkeyUpdate = {
  /** An object where the defined keys will be set on the `slot` being updated. */
  patch: UpdateSlotOnSlotBookingForFakeApiSlotBookingsForeignKey0Patch
  id: Scalars['UUID']
}

/** An object where the defined keys will be set on the `slot` being updated. */
export type UpdateSlotOnSlotBookingForFakeApiSlotBookingsForeignKey0Patch = {
  id?: Maybe<Scalars['UUID']>
  name?: Maybe<Scalars['String']>
  ownerId?: Maybe<Scalars['UUID']>
  vehicleSizeId?: Maybe<Scalars['UUID']>
  address?: Maybe<Scalars['JSON']>
  timezone?: Maybe<Scalars['String']>
  pricePerHour?: Maybe<Scalars['BigFloat']>
  status?: Maybe<SlotStatusT>
  photoUrl?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  notes?: Maybe<Scalars['String']>
  slug?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  deleted?: Maybe<Scalars['Boolean']>
  deletedAt?: Maybe<Scalars['Datetime']>
  verificationStatus?: Maybe<SlotVerificationStatus>
  parkingSpaceId?: Maybe<Scalars['UUID']>
  location?: Maybe<Scalars['GeoJSON']>
  shape?: Maybe<Scalars['GeoJSON']>
  accessRestrictions?: Maybe<AccessRestrictions>
  businessStatus?: Maybe<SlotBusinessStatus>
  businessStatusReason?: Maybe<Scalars['String']>
  category?: Maybe<SlotCategory>
  contributorId?: Maybe<Scalars['UUID']>
  level?: Maybe<Scalars['Int']>
  mapSource?: Maybe<Scalars['UUID']>
  slotDimensions?: Maybe<Scalars['JSON']>
  tempUnavailable?: Maybe<Scalars['Boolean']>
  tempUnavailableFrom?: Maybe<Scalars['Datetime']>
  tempUnavailableTo?: Maybe<Scalars['Datetime']>
  waypoints?: Maybe<Scalars['JSON']>
  userToOwnerId?: Maybe<SlotOwnerIdFkeyInput>
  vehicleSizeToVehicleSizeId?: Maybe<SlotVehicleSizeIdFkeyInput>
  parkingSpaceToParkingSpaceId?: Maybe<SlotParkingSpaceIdFkeyInput>
  slotAmenitiesUsingId?: Maybe<SlotAmenitySlotIdFkeyInverseInput>
  slotAvailabilitiesUsingId?: Maybe<SlotAvailabilitySlotIdFkeyInverseInput>
  slotBookingsUsingId?: Maybe<FakeApiSlotBookingsForeignKey0InverseInput>
}

/** The globally unique `ID` look up for the row to update. */
export type SlotBookingOnSlotBookingForFakeApiSlotBookingsForeignKey0NodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `slot` to be connected. */
  nodeId: Scalars['ID']
  /** An object where the defined keys will be set on the `slot` being updated. */
  patch: SlotPatch
}

/** Represents an update to a `Slot`. Fields that are set will be updated. */
export type SlotPatch = {
  id?: Maybe<Scalars['UUID']>
  name?: Maybe<Scalars['String']>
  ownerId?: Maybe<Scalars['UUID']>
  vehicleSizeId?: Maybe<Scalars['UUID']>
  address?: Maybe<Scalars['JSON']>
  timezone?: Maybe<Scalars['String']>
  pricePerHour?: Maybe<Scalars['BigFloat']>
  status?: Maybe<SlotStatusT>
  photoUrl?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  notes?: Maybe<Scalars['String']>
  slug?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  deleted?: Maybe<Scalars['Boolean']>
  deletedAt?: Maybe<Scalars['Datetime']>
  verificationStatus?: Maybe<SlotVerificationStatus>
  parkingSpaceId?: Maybe<Scalars['UUID']>
  location?: Maybe<Scalars['GeoJSON']>
  shape?: Maybe<Scalars['GeoJSON']>
  accessRestrictions?: Maybe<AccessRestrictions>
  businessStatus?: Maybe<SlotBusinessStatus>
  businessStatusReason?: Maybe<Scalars['String']>
  category?: Maybe<SlotCategory>
  contributorId?: Maybe<Scalars['UUID']>
  level?: Maybe<Scalars['Int']>
  mapSource?: Maybe<Scalars['UUID']>
  slotDimensions?: Maybe<Scalars['JSON']>
  tempUnavailable?: Maybe<Scalars['Boolean']>
  tempUnavailableFrom?: Maybe<Scalars['Datetime']>
  tempUnavailableTo?: Maybe<Scalars['Datetime']>
  waypoints?: Maybe<Scalars['JSON']>
  userToOwnerId?: Maybe<SlotOwnerIdFkeyInput>
  vehicleSizeToVehicleSizeId?: Maybe<SlotVehicleSizeIdFkeyInput>
  parkingSpaceToParkingSpaceId?: Maybe<SlotParkingSpaceIdFkeyInput>
  slotAmenitiesUsingId?: Maybe<SlotAmenitySlotIdFkeyInverseInput>
  slotAvailabilitiesUsingId?: Maybe<SlotAvailabilitySlotIdFkeyInverseInput>
  slotBookingsUsingId?: Maybe<FakeApiSlotBookingsForeignKey0InverseInput>
}

/** Input for the nested mutation of `user` in the `SlotBookingInput` mutation. */
export type FakeApiSlotBookingsForeignKey1Input = {
  /** The primary key(s) for `user` for the far side of the relationship. */
  connectById?: Maybe<UserUserPkeyConnect>
  /** The primary key(s) for `user` for the far side of the relationship. */
  connectByNodeId?: Maybe<UserNodeIdConnect>
  /** The primary key(s) for `user` for the far side of the relationship. */
  deleteById?: Maybe<UserUserPkeyDelete>
  /** The primary key(s) for `user` for the far side of the relationship. */
  deleteByNodeId?: Maybe<UserNodeIdDelete>
  /** The primary key(s) and patch data for `user` for the far side of the relationship. */
  updateById?: Maybe<UserOnSlotBookingForFakeApiSlotBookingsForeignKey1UsingUserPkeyUpdate>
  /** The primary key(s) and patch data for `user` for the far side of the relationship. */
  updateByNodeId?: Maybe<SlotBookingOnSlotBookingForFakeApiSlotBookingsForeignKey1NodeIdUpdate>
}

/** The fields on `user` to look up the row to update. */
export type UserOnSlotBookingForFakeApiSlotBookingsForeignKey1UsingUserPkeyUpdate = {
  /** An object where the defined keys will be set on the `user` being updated. */
  patch: UpdateUserOnSlotBookingForFakeApiSlotBookingsForeignKey1Patch
  id: Scalars['UUID']
}

/** An object where the defined keys will be set on the `user` being updated. */
export type UpdateUserOnSlotBookingForFakeApiSlotBookingsForeignKey1Patch = {
  id?: Maybe<Scalars['UUID']>
  name?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['Email']>
  emailConfirmed?: Maybe<Scalars['Boolean']>
  status?: Maybe<StatusT>
  role?: Maybe<Scalars['String']>
  photoUrl?: Maybe<Scalars['String']>
  phone?: Maybe<Scalars['PhoneUs']>
  address?: Maybe<Scalars['JSON']>
  settings?: Maybe<Scalars['JSON']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  /** handles soft delete */
  deleted?: Maybe<Scalars['Boolean']>
  /** shows when is soft deleted */
  deletedAt?: Maybe<Scalars['Datetime']>
  slotsUsingId?: Maybe<SlotOwnerIdFkeyInverseInput>
  vehiclesUsingId?: Maybe<VehicleOwnerIdFkeyInverseInput>
  billingProfilesUsingId?: Maybe<BillingProfileUserIdFkeyInverseInput>
  userSubscriptionsUsingId?: Maybe<UserSubscriptionUserIdFkeyInverseInput>
  parkingSpacesUsingId?: Maybe<ParkingSpaceOwnerIdFkeyInverseInput>
  businessesUsingId?: Maybe<BusinessOwnerIdFkeyInverseInput>
  paymentReceiptsUsingId?: Maybe<PaymentReceiptOwnerIdFkeyInverseInput>
  slotBookingsUsingId?: Maybe<FakeApiSlotBookingsForeignKey1InverseInput>
}

/** Input for the nested mutation of `business` in the `UserInput` mutation. */
export type BusinessOwnerIdFkeyInverseInput = {
  /** Flag indicating whether all other `business` records that match this relationship should be removed. */
  deleteOthers?: Maybe<Scalars['Boolean']>
  /** The primary key(s) for `business` for the far side of the relationship. */
  connectById?: Maybe<Array<BusinessBusinessPkeyConnect>>
  /** The primary key(s) for `business` for the far side of the relationship. */
  connectBySlug?: Maybe<Array<BusinessBusinessSlugUkeyConnect>>
  /** The primary key(s) for `business` for the far side of the relationship. */
  connectByNodeId?: Maybe<Array<BusinessNodeIdConnect>>
  /** The primary key(s) for `business` for the far side of the relationship. */
  deleteById?: Maybe<Array<BusinessBusinessPkeyDelete>>
  /** The primary key(s) for `business` for the far side of the relationship. */
  deleteBySlug?: Maybe<Array<BusinessBusinessSlugUkeyDelete>>
  /** The primary key(s) for `business` for the far side of the relationship. */
  deleteByNodeId?: Maybe<Array<BusinessNodeIdDelete>>
  /** The primary key(s) and patch data for `business` for the far side of the relationship. */
  updateById?: Maybe<Array<BusinessOnBusinessForBusinessOwnerIdFkeyUsingBusinessPkeyUpdate>>
  /** The primary key(s) and patch data for `business` for the far side of the relationship. */
  updateBySlug?: Maybe<Array<BusinessOnBusinessForBusinessOwnerIdFkeyUsingBusinessSlugUkeyUpdate>>
  /** The primary key(s) and patch data for `business` for the far side of the relationship. */
  updateByNodeId?: Maybe<Array<UserOnBusinessForBusinessOwnerIdFkeyNodeIdUpdate>>
  /** A `BusinessInput` object that will be created and connected to this object. */
  create?: Maybe<Array<BusinessOwnerIdFkeyBusinessCreateInput>>
}

/** The fields on `business` to look up the row to connect. */
export type BusinessBusinessPkeyConnect = {
  id: Scalars['UUID']
}

/** The fields on `business` to look up the row to connect. */
export type BusinessBusinessSlugUkeyConnect = {
  slug: Scalars['String']
}

/** The globally unique `ID` look up for the row to connect. */
export type BusinessNodeIdConnect = {
  /** The globally unique `ID` which identifies a single `business` to be connected. */
  nodeId: Scalars['ID']
}

/** The fields on `business` to look up the row to delete. */
export type BusinessBusinessPkeyDelete = {
  id: Scalars['UUID']
}

/** The fields on `business` to look up the row to delete. */
export type BusinessBusinessSlugUkeyDelete = {
  slug: Scalars['String']
}

/** The globally unique `ID` look up for the row to delete. */
export type BusinessNodeIdDelete = {
  /** The globally unique `ID` which identifies a single `business` to be deleted. */
  nodeId: Scalars['ID']
}

/** The fields on `business` to look up the row to update. */
export type BusinessOnBusinessForBusinessOwnerIdFkeyUsingBusinessPkeyUpdate = {
  /** An object where the defined keys will be set on the `business` being updated. */
  patch: UpdateBusinessOnBusinessForBusinessOwnerIdFkeyPatch
  id: Scalars['UUID']
}

/** An object where the defined keys will be set on the `business` being updated. */
export type UpdateBusinessOnBusinessForBusinessOwnerIdFkeyPatch = {
  id?: Maybe<Scalars['UUID']>
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  photoUrl?: Maybe<Scalars['String']>
  markerUrl?: Maybe<Scalars['String']>
  address?: Maybe<Scalars['JSON']>
  location?: Maybe<Scalars['GeoJSON']>
  slug?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  userToOwnerId?: Maybe<BusinessOwnerIdFkeyInput>
}

/** Input for the nested mutation of `user` in the `BusinessInput` mutation. */
export type BusinessOwnerIdFkeyInput = {
  /** The primary key(s) for `user` for the far side of the relationship. */
  connectById?: Maybe<UserUserPkeyConnect>
  /** The primary key(s) for `user` for the far side of the relationship. */
  connectByNodeId?: Maybe<UserNodeIdConnect>
  /** The primary key(s) for `user` for the far side of the relationship. */
  deleteById?: Maybe<UserUserPkeyDelete>
  /** The primary key(s) for `user` for the far side of the relationship. */
  deleteByNodeId?: Maybe<UserNodeIdDelete>
  /** The primary key(s) and patch data for `user` for the far side of the relationship. */
  updateById?: Maybe<UserOnBusinessForBusinessOwnerIdFkeyUsingUserPkeyUpdate>
  /** The primary key(s) and patch data for `user` for the far side of the relationship. */
  updateByNodeId?: Maybe<BusinessOnBusinessForBusinessOwnerIdFkeyNodeIdUpdate>
}

/** The fields on `user` to look up the row to update. */
export type UserOnBusinessForBusinessOwnerIdFkeyUsingUserPkeyUpdate = {
  /** An object where the defined keys will be set on the `user` being updated. */
  patch: UpdateUserOnBusinessForBusinessOwnerIdFkeyPatch
  id: Scalars['UUID']
}

/** An object where the defined keys will be set on the `user` being updated. */
export type UpdateUserOnBusinessForBusinessOwnerIdFkeyPatch = {
  id?: Maybe<Scalars['UUID']>
  name?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['Email']>
  emailConfirmed?: Maybe<Scalars['Boolean']>
  status?: Maybe<StatusT>
  role?: Maybe<Scalars['String']>
  photoUrl?: Maybe<Scalars['String']>
  phone?: Maybe<Scalars['PhoneUs']>
  address?: Maybe<Scalars['JSON']>
  settings?: Maybe<Scalars['JSON']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  /** handles soft delete */
  deleted?: Maybe<Scalars['Boolean']>
  /** shows when is soft deleted */
  deletedAt?: Maybe<Scalars['Datetime']>
  slotsUsingId?: Maybe<SlotOwnerIdFkeyInverseInput>
  vehiclesUsingId?: Maybe<VehicleOwnerIdFkeyInverseInput>
  billingProfilesUsingId?: Maybe<BillingProfileUserIdFkeyInverseInput>
  userSubscriptionsUsingId?: Maybe<UserSubscriptionUserIdFkeyInverseInput>
  parkingSpacesUsingId?: Maybe<ParkingSpaceOwnerIdFkeyInverseInput>
  businessesUsingId?: Maybe<BusinessOwnerIdFkeyInverseInput>
  paymentReceiptsUsingId?: Maybe<PaymentReceiptOwnerIdFkeyInverseInput>
  slotBookingsUsingId?: Maybe<FakeApiSlotBookingsForeignKey1InverseInput>
}

/** Input for the nested mutation of `paymentReceipt` in the `UserInput` mutation. */
export type PaymentReceiptOwnerIdFkeyInverseInput = {
  /** Flag indicating whether all other `paymentReceipt` records that match this relationship should be removed. */
  deleteOthers?: Maybe<Scalars['Boolean']>
  /** The primary key(s) for `paymentReceipt` for the far side of the relationship. */
  connectById?: Maybe<Array<PaymentReceiptPaymentReceiptPkeyConnect>>
  /** The primary key(s) for `paymentReceipt` for the far side of the relationship. */
  connectByNodeId?: Maybe<Array<PaymentReceiptNodeIdConnect>>
  /** The primary key(s) for `paymentReceipt` for the far side of the relationship. */
  deleteById?: Maybe<Array<PaymentReceiptPaymentReceiptPkeyDelete>>
  /** The primary key(s) for `paymentReceipt` for the far side of the relationship. */
  deleteByNodeId?: Maybe<Array<PaymentReceiptNodeIdDelete>>
  /** The primary key(s) and patch data for `paymentReceipt` for the far side of the relationship. */
  updateById?: Maybe<
    Array<PaymentReceiptOnPaymentReceiptForPaymentReceiptOwnerIdFkeyUsingPaymentReceiptPkeyUpdate>
  >
  /** The primary key(s) and patch data for `paymentReceipt` for the far side of the relationship. */
  updateByNodeId?: Maybe<Array<UserOnPaymentReceiptForPaymentReceiptOwnerIdFkeyNodeIdUpdate>>
  /** A `PaymentReceiptInput` object that will be created and connected to this object. */
  create?: Maybe<Array<PaymentReceiptOwnerIdFkeyPaymentReceiptCreateInput>>
}

/** The fields on `paymentReceipt` to look up the row to connect. */
export type PaymentReceiptPaymentReceiptPkeyConnect = {
  id: Scalars['UUID']
}

/** The globally unique `ID` look up for the row to connect. */
export type PaymentReceiptNodeIdConnect = {
  /** The globally unique `ID` which identifies a single `paymentReceipt` to be connected. */
  nodeId: Scalars['ID']
}

/** The fields on `paymentReceipt` to look up the row to delete. */
export type PaymentReceiptPaymentReceiptPkeyDelete = {
  id: Scalars['UUID']
}

/** The globally unique `ID` look up for the row to delete. */
export type PaymentReceiptNodeIdDelete = {
  /** The globally unique `ID` which identifies a single `paymentReceipt` to be deleted. */
  nodeId: Scalars['ID']
}

/** The fields on `paymentReceipt` to look up the row to update. */
export type PaymentReceiptOnPaymentReceiptForPaymentReceiptOwnerIdFkeyUsingPaymentReceiptPkeyUpdate = {
  /** An object where the defined keys will be set on the `paymentReceipt` being updated. */
  patch: UpdatePaymentReceiptOnPaymentReceiptForPaymentReceiptOwnerIdFkeyPatch
  id: Scalars['UUID']
}

/** An object where the defined keys will be set on the `paymentReceipt` being updated. */
export type UpdatePaymentReceiptOnPaymentReceiptForPaymentReceiptOwnerIdFkeyPatch = {
  userToOwnerId?: Maybe<PaymentReceiptOwnerIdFkeyInput>
  slotBookingsUsingId?: Maybe<FakeApiSlotBookingsForeignKey2InverseInput>
}

/** Input for the nested mutation of `user` in the `PaymentReceiptInput` mutation. */
export type PaymentReceiptOwnerIdFkeyInput = {
  /** The primary key(s) for `user` for the far side of the relationship. */
  connectById?: Maybe<UserUserPkeyConnect>
  /** The primary key(s) for `user` for the far side of the relationship. */
  connectByNodeId?: Maybe<UserNodeIdConnect>
  /** The primary key(s) for `user` for the far side of the relationship. */
  deleteById?: Maybe<UserUserPkeyDelete>
  /** The primary key(s) for `user` for the far side of the relationship. */
  deleteByNodeId?: Maybe<UserNodeIdDelete>
  /** The primary key(s) and patch data for `user` for the far side of the relationship. */
  updateById?: Maybe<UserOnPaymentReceiptForPaymentReceiptOwnerIdFkeyUsingUserPkeyUpdate>
  /** The primary key(s) and patch data for `user` for the far side of the relationship. */
  updateByNodeId?: Maybe<PaymentReceiptOnPaymentReceiptForPaymentReceiptOwnerIdFkeyNodeIdUpdate>
}

/** The fields on `user` to look up the row to update. */
export type UserOnPaymentReceiptForPaymentReceiptOwnerIdFkeyUsingUserPkeyUpdate = {
  /** An object where the defined keys will be set on the `user` being updated. */
  patch: UpdateUserOnPaymentReceiptForPaymentReceiptOwnerIdFkeyPatch
  id: Scalars['UUID']
}

/** An object where the defined keys will be set on the `user` being updated. */
export type UpdateUserOnPaymentReceiptForPaymentReceiptOwnerIdFkeyPatch = {
  id?: Maybe<Scalars['UUID']>
  name?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['Email']>
  emailConfirmed?: Maybe<Scalars['Boolean']>
  status?: Maybe<StatusT>
  role?: Maybe<Scalars['String']>
  photoUrl?: Maybe<Scalars['String']>
  phone?: Maybe<Scalars['PhoneUs']>
  address?: Maybe<Scalars['JSON']>
  settings?: Maybe<Scalars['JSON']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  /** handles soft delete */
  deleted?: Maybe<Scalars['Boolean']>
  /** shows when is soft deleted */
  deletedAt?: Maybe<Scalars['Datetime']>
  slotsUsingId?: Maybe<SlotOwnerIdFkeyInverseInput>
  vehiclesUsingId?: Maybe<VehicleOwnerIdFkeyInverseInput>
  billingProfilesUsingId?: Maybe<BillingProfileUserIdFkeyInverseInput>
  userSubscriptionsUsingId?: Maybe<UserSubscriptionUserIdFkeyInverseInput>
  parkingSpacesUsingId?: Maybe<ParkingSpaceOwnerIdFkeyInverseInput>
  businessesUsingId?: Maybe<BusinessOwnerIdFkeyInverseInput>
  paymentReceiptsUsingId?: Maybe<PaymentReceiptOwnerIdFkeyInverseInput>
  slotBookingsUsingId?: Maybe<FakeApiSlotBookingsForeignKey1InverseInput>
}

/** Input for the nested mutation of `slotBooking` in the `UserInput` mutation. */
export type FakeApiSlotBookingsForeignKey1InverseInput = {
  /** The primary key(s) for `slotBooking` for the far side of the relationship. */
  connectById?: Maybe<Array<SlotBookingFakeApiSlotBookingsPrimaryKeyConnect>>
  /** The primary key(s) for `slotBooking` for the far side of the relationship. */
  connectByNodeId?: Maybe<Array<SlotBookingNodeIdConnect>>
  /** The primary key(s) and patch data for `slotBooking` for the far side of the relationship. */
  updateById?: Maybe<
    Array<
      SlotBookingOnSlotBookingForFakeApiSlotBookingsForeignKey1UsingFakeApiSlotBookingsPrimaryKeyUpdate
    >
  >
  /** The primary key(s) and patch data for `slotBooking` for the far side of the relationship. */
  updateByNodeId?: Maybe<Array<UserOnSlotBookingForFakeApiSlotBookingsForeignKey1NodeIdUpdate>>
}

/** The fields on `slotBooking` to look up the row to update. */
export type SlotBookingOnSlotBookingForFakeApiSlotBookingsForeignKey1UsingFakeApiSlotBookingsPrimaryKeyUpdate = {
  /** An object where the defined keys will be set on the `slotBooking` being updated. */
  patch: UpdateSlotBookingOnSlotBookingForFakeApiSlotBookingsForeignKey1Patch
  id: Scalars['UUID']
}

/** An object where the defined keys will be set on the `slotBooking` being updated. */
export type UpdateSlotBookingOnSlotBookingForFakeApiSlotBookingsForeignKey1Patch = {
  status?: Maybe<BookingStatusT>
  paymentReceiptId?: Maybe<Scalars['UUID']>
  slotId?: Maybe<Scalars['UUID']>
  slotToSlotId?: Maybe<FakeApiSlotBookingsForeignKey0Input>
  userToUserId?: Maybe<FakeApiSlotBookingsForeignKey1Input>
  paymentReceiptToPaymentReceiptId?: Maybe<FakeApiSlotBookingsForeignKey2Input>
}

/** Input for the nested mutation of `paymentReceipt` in the `SlotBookingInput` mutation. */
export type FakeApiSlotBookingsForeignKey2Input = {
  /** The primary key(s) for `paymentReceipt` for the far side of the relationship. */
  connectById?: Maybe<PaymentReceiptPaymentReceiptPkeyConnect>
  /** The primary key(s) for `paymentReceipt` for the far side of the relationship. */
  connectByNodeId?: Maybe<PaymentReceiptNodeIdConnect>
  /** The primary key(s) for `paymentReceipt` for the far side of the relationship. */
  deleteById?: Maybe<PaymentReceiptPaymentReceiptPkeyDelete>
  /** The primary key(s) for `paymentReceipt` for the far side of the relationship. */
  deleteByNodeId?: Maybe<PaymentReceiptNodeIdDelete>
  /** The primary key(s) and patch data for `paymentReceipt` for the far side of the relationship. */
  updateById?: Maybe<
    PaymentReceiptOnSlotBookingForFakeApiSlotBookingsForeignKey2UsingPaymentReceiptPkeyUpdate
  >
  /** The primary key(s) and patch data for `paymentReceipt` for the far side of the relationship. */
  updateByNodeId?: Maybe<SlotBookingOnSlotBookingForFakeApiSlotBookingsForeignKey2NodeIdUpdate>
}

/** The fields on `paymentReceipt` to look up the row to update. */
export type PaymentReceiptOnSlotBookingForFakeApiSlotBookingsForeignKey2UsingPaymentReceiptPkeyUpdate = {
  /** An object where the defined keys will be set on the `paymentReceipt` being updated. */
  patch: UpdatePaymentReceiptOnSlotBookingForFakeApiSlotBookingsForeignKey2Patch
  id: Scalars['UUID']
}

/** An object where the defined keys will be set on the `paymentReceipt` being updated. */
export type UpdatePaymentReceiptOnSlotBookingForFakeApiSlotBookingsForeignKey2Patch = {
  ownerId?: Maybe<Scalars['UUID']>
  userToOwnerId?: Maybe<PaymentReceiptOwnerIdFkeyInput>
  slotBookingsUsingId?: Maybe<FakeApiSlotBookingsForeignKey2InverseInput>
}

/** Input for the nested mutation of `slotBooking` in the `PaymentReceiptInput` mutation. */
export type FakeApiSlotBookingsForeignKey2InverseInput = {
  /** The primary key(s) for `slotBooking` for the far side of the relationship. */
  connectById?: Maybe<Array<SlotBookingFakeApiSlotBookingsPrimaryKeyConnect>>
  /** The primary key(s) for `slotBooking` for the far side of the relationship. */
  connectByNodeId?: Maybe<Array<SlotBookingNodeIdConnect>>
  /** The primary key(s) and patch data for `slotBooking` for the far side of the relationship. */
  updateById?: Maybe<
    Array<
      SlotBookingOnSlotBookingForFakeApiSlotBookingsForeignKey2UsingFakeApiSlotBookingsPrimaryKeyUpdate
    >
  >
  /** The primary key(s) and patch data for `slotBooking` for the far side of the relationship. */
  updateByNodeId?: Maybe<
    Array<PaymentReceiptOnSlotBookingForFakeApiSlotBookingsForeignKey2NodeIdUpdate>
  >
}

/** The fields on `slotBooking` to look up the row to update. */
export type SlotBookingOnSlotBookingForFakeApiSlotBookingsForeignKey2UsingFakeApiSlotBookingsPrimaryKeyUpdate = {
  /** An object where the defined keys will be set on the `slotBooking` being updated. */
  patch: UpdateSlotBookingOnSlotBookingForFakeApiSlotBookingsForeignKey2Patch
  id: Scalars['UUID']
}

/** An object where the defined keys will be set on the `slotBooking` being updated. */
export type UpdateSlotBookingOnSlotBookingForFakeApiSlotBookingsForeignKey2Patch = {
  status?: Maybe<BookingStatusT>
  slotId?: Maybe<Scalars['UUID']>
  slotToSlotId?: Maybe<FakeApiSlotBookingsForeignKey0Input>
  userId?: Maybe<Scalars['UUID']>
  userToUserId?: Maybe<FakeApiSlotBookingsForeignKey1Input>
  paymentReceiptToPaymentReceiptId?: Maybe<FakeApiSlotBookingsForeignKey2Input>
}

/** The globally unique `ID` look up for the row to update. */
export type PaymentReceiptOnSlotBookingForFakeApiSlotBookingsForeignKey2NodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `slotBooking` to be connected. */
  nodeId: Scalars['ID']
  /** An object where the defined keys will be set on the `slotBooking` being updated. */
  patch: SlotBookingPatch
}

/** Represents an update to a `SlotBooking`. Fields that are set will be updated. */
export type SlotBookingPatch = {
  status?: Maybe<BookingStatusT>
  paymentReceiptId?: Maybe<Scalars['UUID']>
  slotId?: Maybe<Scalars['UUID']>
  slotToSlotId?: Maybe<FakeApiSlotBookingsForeignKey0Input>
  userId?: Maybe<Scalars['UUID']>
  userToUserId?: Maybe<FakeApiSlotBookingsForeignKey1Input>
  paymentReceiptToPaymentReceiptId?: Maybe<FakeApiSlotBookingsForeignKey2Input>
}

/** The globally unique `ID` look up for the row to update. */
export type SlotBookingOnSlotBookingForFakeApiSlotBookingsForeignKey2NodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `paymentReceipt` to be connected. */
  nodeId: Scalars['ID']
  /** An object where the defined keys will be set on the `paymentReceipt` being updated. */
  patch: PaymentReceiptPatch
}

/** Represents an update to a `PaymentReceipt`. Fields that are set will be updated. */
export type PaymentReceiptPatch = {
  ownerId?: Maybe<Scalars['UUID']>
  userToOwnerId?: Maybe<PaymentReceiptOwnerIdFkeyInput>
  slotBookingsUsingId?: Maybe<FakeApiSlotBookingsForeignKey2InverseInput>
}

/** The globally unique `ID` look up for the row to update. */
export type UserOnSlotBookingForFakeApiSlotBookingsForeignKey1NodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `slotBooking` to be connected. */
  nodeId: Scalars['ID']
  /** An object where the defined keys will be set on the `slotBooking` being updated. */
  patch: SlotBookingPatch
}

/** The globally unique `ID` look up for the row to update. */
export type PaymentReceiptOnPaymentReceiptForPaymentReceiptOwnerIdFkeyNodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `user` to be connected. */
  nodeId: Scalars['ID']
  /** An object where the defined keys will be set on the `user` being updated. */
  patch: UserPatch
}

/** Represents an update to a `User`. Fields that are set will be updated. */
export type UserPatch = {
  id?: Maybe<Scalars['UUID']>
  name?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['Email']>
  emailConfirmed?: Maybe<Scalars['Boolean']>
  status?: Maybe<StatusT>
  role?: Maybe<Scalars['String']>
  photoUrl?: Maybe<Scalars['String']>
  phone?: Maybe<Scalars['PhoneUs']>
  address?: Maybe<Scalars['JSON']>
  settings?: Maybe<Scalars['JSON']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  /** handles soft delete */
  deleted?: Maybe<Scalars['Boolean']>
  /** shows when is soft deleted */
  deletedAt?: Maybe<Scalars['Datetime']>
  slotsUsingId?: Maybe<SlotOwnerIdFkeyInverseInput>
  vehiclesUsingId?: Maybe<VehicleOwnerIdFkeyInverseInput>
  billingProfilesUsingId?: Maybe<BillingProfileUserIdFkeyInverseInput>
  userSubscriptionsUsingId?: Maybe<UserSubscriptionUserIdFkeyInverseInput>
  parkingSpacesUsingId?: Maybe<ParkingSpaceOwnerIdFkeyInverseInput>
  businessesUsingId?: Maybe<BusinessOwnerIdFkeyInverseInput>
  paymentReceiptsUsingId?: Maybe<PaymentReceiptOwnerIdFkeyInverseInput>
  slotBookingsUsingId?: Maybe<FakeApiSlotBookingsForeignKey1InverseInput>
}

/** The globally unique `ID` look up for the row to update. */
export type UserOnPaymentReceiptForPaymentReceiptOwnerIdFkeyNodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `paymentReceipt` to be connected. */
  nodeId: Scalars['ID']
  /** An object where the defined keys will be set on the `paymentReceipt` being updated. */
  patch: PaymentReceiptPatch
}

/** The `paymentReceipt` to be created by this mutation. */
export type PaymentReceiptOwnerIdFkeyPaymentReceiptCreateInput = {
  id?: Maybe<Scalars['UUID']>
  paymentIntentId: Scalars['String']
  receiptUrl?: Maybe<Scalars['String']>
  amount: Scalars['BigFloat']
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  userToOwnerId?: Maybe<PaymentReceiptOwnerIdFkeyInput>
  slotBookingsUsingId?: Maybe<FakeApiSlotBookingsForeignKey2InverseInput>
}

/** The globally unique `ID` look up for the row to update. */
export type BusinessOnBusinessForBusinessOwnerIdFkeyNodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `user` to be connected. */
  nodeId: Scalars['ID']
  /** An object where the defined keys will be set on the `user` being updated. */
  patch: UserPatch
}

/** The fields on `business` to look up the row to update. */
export type BusinessOnBusinessForBusinessOwnerIdFkeyUsingBusinessSlugUkeyUpdate = {
  /** An object where the defined keys will be set on the `business` being updated. */
  patch: UpdateBusinessOnBusinessForBusinessOwnerIdFkeyPatch
  slug: Scalars['String']
}

/** The globally unique `ID` look up for the row to update. */
export type UserOnBusinessForBusinessOwnerIdFkeyNodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `business` to be connected. */
  nodeId: Scalars['ID']
  /** An object where the defined keys will be set on the `business` being updated. */
  patch: BusinessPatch
}

/** Represents an update to a `Business`. Fields that are set will be updated. */
export type BusinessPatch = {
  id?: Maybe<Scalars['UUID']>
  ownerId?: Maybe<Scalars['UUID']>
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  photoUrl?: Maybe<Scalars['String']>
  markerUrl?: Maybe<Scalars['String']>
  address?: Maybe<Scalars['JSON']>
  location?: Maybe<Scalars['GeoJSON']>
  slug?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  userToOwnerId?: Maybe<BusinessOwnerIdFkeyInput>
}

/** The `business` to be created by this mutation. */
export type BusinessOwnerIdFkeyBusinessCreateInput = {
  id?: Maybe<Scalars['UUID']>
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  photoUrl?: Maybe<Scalars['String']>
  markerUrl?: Maybe<Scalars['String']>
  address?: Maybe<Scalars['JSON']>
  location: Scalars['GeoJSON']
  slug?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  userToOwnerId?: Maybe<BusinessOwnerIdFkeyInput>
}

/** The globally unique `ID` look up for the row to update. */
export type SlotBookingOnSlotBookingForFakeApiSlotBookingsForeignKey1NodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `user` to be connected. */
  nodeId: Scalars['ID']
  /** An object where the defined keys will be set on the `user` being updated. */
  patch: UserPatch
}

/** The globally unique `ID` look up for the row to update. */
export type SlotOnSlotBookingForFakeApiSlotBookingsForeignKey0NodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `slotBooking` to be connected. */
  nodeId: Scalars['ID']
  /** An object where the defined keys will be set on the `slotBooking` being updated. */
  patch: SlotBookingPatch
}

/** The globally unique `ID` look up for the row to update. */
export type SlotAvailabilityOnSlotAvailabilityForSlotAvailabilitySlotIdFkeyNodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `slot` to be connected. */
  nodeId: Scalars['ID']
  /** An object where the defined keys will be set on the `slot` being updated. */
  patch: SlotPatch
}

/** The `slot` to be created by this mutation. */
export type SlotAvailabilitySlotIdFkeySlotCreateInput = {
  id?: Maybe<Scalars['UUID']>
  name: Scalars['String']
  ownerId?: Maybe<Scalars['UUID']>
  vehicleSizeId?: Maybe<Scalars['UUID']>
  address?: Maybe<Scalars['JSON']>
  timezone?: Maybe<Scalars['String']>
  pricePerHour: Scalars['BigFloat']
  status?: Maybe<SlotStatusT>
  photoUrl?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  notes?: Maybe<Scalars['String']>
  slug?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  deleted?: Maybe<Scalars['Boolean']>
  deletedAt?: Maybe<Scalars['Datetime']>
  verificationStatus?: Maybe<SlotVerificationStatus>
  parkingSpaceId?: Maybe<Scalars['UUID']>
  location: Scalars['GeoJSON']
  shape?: Maybe<Scalars['GeoJSON']>
  accessRestrictions?: Maybe<AccessRestrictions>
  businessStatus?: Maybe<SlotBusinessStatus>
  businessStatusReason?: Maybe<Scalars['String']>
  category?: Maybe<SlotCategory>
  contributorId?: Maybe<Scalars['UUID']>
  level?: Maybe<Scalars['Int']>
  mapSource?: Maybe<Scalars['UUID']>
  slotDimensions?: Maybe<Scalars['JSON']>
  tempUnavailable?: Maybe<Scalars['Boolean']>
  tempUnavailableFrom?: Maybe<Scalars['Datetime']>
  tempUnavailableTo?: Maybe<Scalars['Datetime']>
  waypoints?: Maybe<Scalars['JSON']>
  userToOwnerId?: Maybe<SlotOwnerIdFkeyInput>
  vehicleSizeToVehicleSizeId?: Maybe<SlotVehicleSizeIdFkeyInput>
  parkingSpaceToParkingSpaceId?: Maybe<SlotParkingSpaceIdFkeyInput>
  slotAmenitiesUsingId?: Maybe<SlotAmenitySlotIdFkeyInverseInput>
  slotAvailabilitiesUsingId?: Maybe<SlotAvailabilitySlotIdFkeyInverseInput>
  slotBookingsUsingId?: Maybe<FakeApiSlotBookingsForeignKey0InverseInput>
}

/** The globally unique `ID` look up for the row to update. */
export type SlotOnSlotAvailabilityForSlotAvailabilitySlotIdFkeyNodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `slotAvailability` to be connected. */
  nodeId: Scalars['ID']
  /** An object where the defined keys will be set on the `slotAvailability` being updated. */
  patch: SlotAvailabilityPatch
}

/** Represents an update to a `SlotAvailability`. Fields that are set will be updated. */
export type SlotAvailabilityPatch = {
  id?: Maybe<Scalars['UUID']>
  slotId?: Maybe<Scalars['UUID']>
  dayOfWeek?: Maybe<Scalars['Int']>
  startHour?: Maybe<Scalars['Time']>
  endHour?: Maybe<Scalars['Time']>
  createdAt?: Maybe<Scalars['Datetime']>
  tariffPerHour?: Maybe<Scalars['BigFloat']>
  cancelCharge?: Maybe<Scalars['BigFloat']>
  tariffCurrency?: Maybe<Scalars['UUID']>
  slotToSlotId?: Maybe<SlotAvailabilitySlotIdFkeyInput>
}

/** The `slotAvailability` to be created by this mutation. */
export type SlotAvailabilitySlotIdFkeySlotAvailabilityCreateInput = {
  id?: Maybe<Scalars['UUID']>
  dayOfWeek: Scalars['Int']
  startHour: Scalars['Time']
  endHour: Scalars['Time']
  createdAt?: Maybe<Scalars['Datetime']>
  tariffPerHour?: Maybe<Scalars['BigFloat']>
  cancelCharge?: Maybe<Scalars['BigFloat']>
  tariffCurrency?: Maybe<Scalars['UUID']>
  slotToSlotId?: Maybe<SlotAvailabilitySlotIdFkeyInput>
}

/** The globally unique `ID` look up for the row to update. */
export type ParkingSpaceOnSlotForSlotParkingSpaceIdFkeyNodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `slot` to be connected. */
  nodeId: Scalars['ID']
  /** An object where the defined keys will be set on the `slot` being updated. */
  patch: SlotPatch
}

/** The `slot` to be created by this mutation. */
export type SlotParkingSpaceIdFkeySlotCreateInput = {
  id?: Maybe<Scalars['UUID']>
  name: Scalars['String']
  ownerId?: Maybe<Scalars['UUID']>
  vehicleSizeId?: Maybe<Scalars['UUID']>
  address?: Maybe<Scalars['JSON']>
  timezone?: Maybe<Scalars['String']>
  pricePerHour: Scalars['BigFloat']
  status?: Maybe<SlotStatusT>
  photoUrl?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  notes?: Maybe<Scalars['String']>
  slug?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  deleted?: Maybe<Scalars['Boolean']>
  deletedAt?: Maybe<Scalars['Datetime']>
  verificationStatus?: Maybe<SlotVerificationStatus>
  location: Scalars['GeoJSON']
  shape?: Maybe<Scalars['GeoJSON']>
  accessRestrictions?: Maybe<AccessRestrictions>
  businessStatus?: Maybe<SlotBusinessStatus>
  businessStatusReason?: Maybe<Scalars['String']>
  category?: Maybe<SlotCategory>
  contributorId?: Maybe<Scalars['UUID']>
  level?: Maybe<Scalars['Int']>
  mapSource?: Maybe<Scalars['UUID']>
  slotDimensions?: Maybe<Scalars['JSON']>
  tempUnavailable?: Maybe<Scalars['Boolean']>
  tempUnavailableFrom?: Maybe<Scalars['Datetime']>
  tempUnavailableTo?: Maybe<Scalars['Datetime']>
  waypoints?: Maybe<Scalars['JSON']>
  userToOwnerId?: Maybe<SlotOwnerIdFkeyInput>
  vehicleSizeToVehicleSizeId?: Maybe<SlotVehicleSizeIdFkeyInput>
  parkingSpaceToParkingSpaceId?: Maybe<SlotParkingSpaceIdFkeyInput>
  slotAmenitiesUsingId?: Maybe<SlotAmenitySlotIdFkeyInverseInput>
  slotAvailabilitiesUsingId?: Maybe<SlotAvailabilitySlotIdFkeyInverseInput>
  slotBookingsUsingId?: Maybe<FakeApiSlotBookingsForeignKey0InverseInput>
}

/** Input for the nested mutation of `parkingSpaceAvailability` in the `ParkingSpaceInput` mutation. */
export type ParkingSpaceAvailabilityParkingSpaceIdFkeyInverseInput = {
  /** Flag indicating whether all other `parkingSpaceAvailability` records that match this relationship should be removed. */
  deleteOthers?: Maybe<Scalars['Boolean']>
  /** The primary key(s) for `parkingSpaceAvailability` for the far side of the relationship. */
  connectById?: Maybe<Array<ParkingSpaceAvailabilityParkingSpaceAvailabilityPkeyConnect>>
  /** The primary key(s) for `parkingSpaceAvailability` for the far side of the relationship. */
  connectByNodeId?: Maybe<Array<ParkingSpaceAvailabilityNodeIdConnect>>
  /** The primary key(s) for `parkingSpaceAvailability` for the far side of the relationship. */
  deleteById?: Maybe<Array<ParkingSpaceAvailabilityParkingSpaceAvailabilityPkeyDelete>>
  /** The primary key(s) for `parkingSpaceAvailability` for the far side of the relationship. */
  deleteByNodeId?: Maybe<Array<ParkingSpaceAvailabilityNodeIdDelete>>
  /** The primary key(s) and patch data for `parkingSpaceAvailability` for the far side of the relationship. */
  updateById?: Maybe<
    Array<
      ParkingSpaceAvailabilityOnParkingSpaceAvailabilityForParkingSpaceAvailabilityParkingSpaceIdFkeyUsingParkingSpaceAvailabilityPkeyUpdate
    >
  >
  /** The primary key(s) and patch data for `parkingSpaceAvailability` for the far side of the relationship. */
  updateByNodeId?: Maybe<
    Array<
      ParkingSpaceOnParkingSpaceAvailabilityForParkingSpaceAvailabilityParkingSpaceIdFkeyNodeIdUpdate
    >
  >
  /** A `ParkingSpaceAvailabilityInput` object that will be created and connected to this object. */
  create?: Maybe<
    Array<ParkingSpaceAvailabilityParkingSpaceIdFkeyParkingSpaceAvailabilityCreateInput>
  >
}

/** The fields on `parkingSpaceAvailability` to look up the row to connect. */
export type ParkingSpaceAvailabilityParkingSpaceAvailabilityPkeyConnect = {
  id: Scalars['UUID']
}

/** The globally unique `ID` look up for the row to connect. */
export type ParkingSpaceAvailabilityNodeIdConnect = {
  /** The globally unique `ID` which identifies a single `parkingSpaceAvailability` to be connected. */
  nodeId: Scalars['ID']
}

/** The fields on `parkingSpaceAvailability` to look up the row to delete. */
export type ParkingSpaceAvailabilityParkingSpaceAvailabilityPkeyDelete = {
  id: Scalars['UUID']
}

/** The globally unique `ID` look up for the row to delete. */
export type ParkingSpaceAvailabilityNodeIdDelete = {
  /** The globally unique `ID` which identifies a single `parkingSpaceAvailability` to be deleted. */
  nodeId: Scalars['ID']
}

/** The fields on `parkingSpaceAvailability` to look up the row to update. */
export type ParkingSpaceAvailabilityOnParkingSpaceAvailabilityForParkingSpaceAvailabilityParkingSpaceIdFkeyUsingParkingSpaceAvailabilityPkeyUpdate = {
  /** An object where the defined keys will be set on the `parkingSpaceAvailability` being updated. */
  patch: UpdateParkingSpaceAvailabilityOnParkingSpaceAvailabilityForParkingSpaceAvailabilityParkingSpaceIdFkeyPatch
  id: Scalars['UUID']
}

/** An object where the defined keys will be set on the `parkingSpaceAvailability` being updated. */
export type UpdateParkingSpaceAvailabilityOnParkingSpaceAvailabilityForParkingSpaceAvailabilityParkingSpaceIdFkeyPatch = {
  id?: Maybe<Scalars['UUID']>
  fromDate?: Maybe<Scalars['Date']>
  toDate?: Maybe<Scalars['Date']>
  defaultFlag?: Maybe<Scalars['Boolean']>
  closedFlag?: Maybe<Scalars['Boolean']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  parkingSpaceToParkingSpaceId?: Maybe<ParkingSpaceAvailabilityParkingSpaceIdFkeyInput>
  parkingOpenHoursUsingId?: Maybe<ParkingOpenHoursParkingSpaceAvailabilityIdFkeyInverseInput>
  parkingWorkingHoursUsingId?: Maybe<ParkingWorkingHoursParkingSpaceAvailabilityIdFkeyInverseInput>
}

/** Input for the nested mutation of `parkingSpace` in the `ParkingSpaceAvailabilityInput` mutation. */
export type ParkingSpaceAvailabilityParkingSpaceIdFkeyInput = {
  /** The primary key(s) for `parkingSpace` for the far side of the relationship. */
  connectById?: Maybe<ParkingSpaceParkingSpacePkeyConnect>
  /** The primary key(s) for `parkingSpace` for the far side of the relationship. */
  connectBySlug?: Maybe<ParkingSpaceParkingSpaceSlugUkeyConnect>
  /** The primary key(s) for `parkingSpace` for the far side of the relationship. */
  connectByNodeId?: Maybe<ParkingSpaceNodeIdConnect>
  /** The primary key(s) for `parkingSpace` for the far side of the relationship. */
  deleteById?: Maybe<ParkingSpaceParkingSpacePkeyDelete>
  /** The primary key(s) for `parkingSpace` for the far side of the relationship. */
  deleteBySlug?: Maybe<ParkingSpaceParkingSpaceSlugUkeyDelete>
  /** The primary key(s) for `parkingSpace` for the far side of the relationship. */
  deleteByNodeId?: Maybe<ParkingSpaceNodeIdDelete>
  /** The primary key(s) and patch data for `parkingSpace` for the far side of the relationship. */
  updateById?: Maybe<
    ParkingSpaceOnParkingSpaceAvailabilityForParkingSpaceAvailabilityParkingSpaceIdFkeyUsingParkingSpacePkeyUpdate
  >
  /** The primary key(s) and patch data for `parkingSpace` for the far side of the relationship. */
  updateBySlug?: Maybe<
    ParkingSpaceOnParkingSpaceAvailabilityForParkingSpaceAvailabilityParkingSpaceIdFkeyUsingParkingSpaceSlugUkeyUpdate
  >
  /** The primary key(s) and patch data for `parkingSpace` for the far side of the relationship. */
  updateByNodeId?: Maybe<
    ParkingSpaceAvailabilityOnParkingSpaceAvailabilityForParkingSpaceAvailabilityParkingSpaceIdFkeyNodeIdUpdate
  >
  /** A `ParkingSpaceInput` object that will be created and connected to this object. */
  create?: Maybe<ParkingSpaceAvailabilityParkingSpaceIdFkeyParkingSpaceCreateInput>
}

/** The fields on `parkingSpace` to look up the row to update. */
export type ParkingSpaceOnParkingSpaceAvailabilityForParkingSpaceAvailabilityParkingSpaceIdFkeyUsingParkingSpacePkeyUpdate = {
  /** An object where the defined keys will be set on the `parkingSpace` being updated. */
  patch: UpdateParkingSpaceOnParkingSpaceAvailabilityForParkingSpaceAvailabilityParkingSpaceIdFkeyPatch
  id: Scalars['UUID']
}

/** An object where the defined keys will be set on the `parkingSpace` being updated. */
export type UpdateParkingSpaceOnParkingSpaceAvailabilityForParkingSpaceAvailabilityParkingSpaceIdFkeyPatch = {
  id?: Maybe<Scalars['UUID']>
  ownerId?: Maybe<Scalars['UUID']>
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  photoUrl?: Maybe<Scalars['String']>
  settings?: Maybe<Scalars['JSON']>
  address?: Maybe<Scalars['JSON']>
  location?: Maybe<Scalars['GeoJSON']>
  slug?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  carEntry?: Maybe<Scalars['GeoJSON']>
  carExit?: Maybe<Scalars['GeoJSON']>
  companyEntrance?: Maybe<Scalars['GeoJSON']>
  parkingspaceMapview?: Maybe<Scalars['GeoJSON']>
  brandLogo?: Maybe<Scalars['String']>
  workingHours?: Maybe<Scalars['JSON']>
  advtLink?: Maybe<Scalars['String']>
  bluePrint?: Maybe<Scalars['String']>
  hiddenField?: Maybe<Scalars['String']>
  pedestrianText?: Maybe<Scalars['String']>
  languageCode?: Maybe<Scalars['String']>
  contributorId?: Maybe<Scalars['UUID']>
  floor?: Maybe<Scalars['Int']>
  category?: Maybe<SpaceCategory>
  status?: Maybe<ParkingSpaceStatus>
  verificationStatus?: Maybe<SpaceVerificationStatus>
  accessRestriction?: Maybe<Array<Maybe<SpaceAccessRestriction>>>
  deleted?: Maybe<Scalars['Boolean']>
  deletedAt?: Maybe<Scalars['Datetime']>
  businessStatusReason?: Maybe<Scalars['String']>
  userToOwnerId?: Maybe<ParkingSpaceOwnerIdFkeyInput>
  slotsUsingId?: Maybe<SlotParkingSpaceIdFkeyInverseInput>
  parkingSpaceAvailabilitiesUsingId?: Maybe<ParkingSpaceAvailabilityParkingSpaceIdFkeyInverseInput>
}

/** The fields on `parkingSpace` to look up the row to update. */
export type ParkingSpaceOnParkingSpaceAvailabilityForParkingSpaceAvailabilityParkingSpaceIdFkeyUsingParkingSpaceSlugUkeyUpdate = {
  /** An object where the defined keys will be set on the `parkingSpace` being updated. */
  patch: UpdateParkingSpaceOnParkingSpaceAvailabilityForParkingSpaceAvailabilityParkingSpaceIdFkeyPatch
  slug: Scalars['String']
}

/** The globally unique `ID` look up for the row to update. */
export type ParkingSpaceAvailabilityOnParkingSpaceAvailabilityForParkingSpaceAvailabilityParkingSpaceIdFkeyNodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `parkingSpace` to be connected. */
  nodeId: Scalars['ID']
  /** An object where the defined keys will be set on the `parkingSpace` being updated. */
  patch: ParkingSpacePatch
}

/** Represents an update to a `ParkingSpace`. Fields that are set will be updated. */
export type ParkingSpacePatch = {
  id?: Maybe<Scalars['UUID']>
  ownerId?: Maybe<Scalars['UUID']>
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  photoUrl?: Maybe<Scalars['String']>
  settings?: Maybe<Scalars['JSON']>
  address?: Maybe<Scalars['JSON']>
  location?: Maybe<Scalars['GeoJSON']>
  slug?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  carEntry?: Maybe<Scalars['GeoJSON']>
  carExit?: Maybe<Scalars['GeoJSON']>
  companyEntrance?: Maybe<Scalars['GeoJSON']>
  parkingspaceMapview?: Maybe<Scalars['GeoJSON']>
  brandLogo?: Maybe<Scalars['String']>
  workingHours?: Maybe<Scalars['JSON']>
  advtLink?: Maybe<Scalars['String']>
  bluePrint?: Maybe<Scalars['String']>
  hiddenField?: Maybe<Scalars['String']>
  pedestrianText?: Maybe<Scalars['String']>
  languageCode?: Maybe<Scalars['String']>
  contributorId?: Maybe<Scalars['UUID']>
  floor?: Maybe<Scalars['Int']>
  category?: Maybe<SpaceCategory>
  status?: Maybe<ParkingSpaceStatus>
  verificationStatus?: Maybe<SpaceVerificationStatus>
  accessRestriction?: Maybe<Array<Maybe<SpaceAccessRestriction>>>
  deleted?: Maybe<Scalars['Boolean']>
  deletedAt?: Maybe<Scalars['Datetime']>
  businessStatusReason?: Maybe<Scalars['String']>
  userToOwnerId?: Maybe<ParkingSpaceOwnerIdFkeyInput>
  slotsUsingId?: Maybe<SlotParkingSpaceIdFkeyInverseInput>
  parkingSpaceAvailabilitiesUsingId?: Maybe<ParkingSpaceAvailabilityParkingSpaceIdFkeyInverseInput>
}

/** The `parkingSpace` to be created by this mutation. */
export type ParkingSpaceAvailabilityParkingSpaceIdFkeyParkingSpaceCreateInput = {
  id?: Maybe<Scalars['UUID']>
  ownerId?: Maybe<Scalars['UUID']>
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  photoUrl?: Maybe<Scalars['String']>
  settings?: Maybe<Scalars['JSON']>
  address?: Maybe<Scalars['JSON']>
  location?: Maybe<Scalars['GeoJSON']>
  slug?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  carEntry?: Maybe<Scalars['GeoJSON']>
  carExit?: Maybe<Scalars['GeoJSON']>
  companyEntrance?: Maybe<Scalars['GeoJSON']>
  parkingspaceMapview?: Maybe<Scalars['GeoJSON']>
  brandLogo?: Maybe<Scalars['String']>
  workingHours?: Maybe<Scalars['JSON']>
  advtLink?: Maybe<Scalars['String']>
  bluePrint?: Maybe<Scalars['String']>
  hiddenField?: Maybe<Scalars['String']>
  pedestrianText?: Maybe<Scalars['String']>
  languageCode?: Maybe<Scalars['String']>
  contributorId?: Maybe<Scalars['UUID']>
  floor?: Maybe<Scalars['Int']>
  category?: Maybe<SpaceCategory>
  status?: Maybe<ParkingSpaceStatus>
  verificationStatus?: Maybe<SpaceVerificationStatus>
  accessRestriction?: Maybe<Array<Maybe<SpaceAccessRestriction>>>
  deleted?: Maybe<Scalars['Boolean']>
  deletedAt?: Maybe<Scalars['Datetime']>
  businessStatusReason?: Maybe<Scalars['String']>
  userToOwnerId?: Maybe<ParkingSpaceOwnerIdFkeyInput>
  slotsUsingId?: Maybe<SlotParkingSpaceIdFkeyInverseInput>
  parkingSpaceAvailabilitiesUsingId?: Maybe<ParkingSpaceAvailabilityParkingSpaceIdFkeyInverseInput>
}

/** Input for the nested mutation of `parkingOpenHour` in the `ParkingSpaceAvailabilityInput` mutation. */
export type ParkingOpenHoursParkingSpaceAvailabilityIdFkeyInverseInput = {
  /** Flag indicating whether all other `parkingOpenHour` records that match this relationship should be removed. */
  deleteOthers?: Maybe<Scalars['Boolean']>
  /** The primary key(s) for `parkingOpenHour` for the far side of the relationship. */
  connectById?: Maybe<Array<ParkingOpenHourParkingOpenHoursPkeyConnect>>
  /** The primary key(s) for `parkingOpenHour` for the far side of the relationship. */
  connectByNodeId?: Maybe<Array<ParkingOpenHourNodeIdConnect>>
  /** The primary key(s) for `parkingOpenHour` for the far side of the relationship. */
  deleteById?: Maybe<Array<ParkingOpenHourParkingOpenHoursPkeyDelete>>
  /** The primary key(s) for `parkingOpenHour` for the far side of the relationship. */
  deleteByNodeId?: Maybe<Array<ParkingOpenHourNodeIdDelete>>
  /** The primary key(s) and patch data for `parkingOpenHour` for the far side of the relationship. */
  updateById?: Maybe<
    Array<
      ParkingOpenHourOnParkingOpenHourForParkingOpenHoursParkingSpaceAvailabilityIdFkeyUsingParkingOpenHoursPkeyUpdate
    >
  >
  /** The primary key(s) and patch data for `parkingOpenHour` for the far side of the relationship. */
  updateByNodeId?: Maybe<
    Array<
      ParkingSpaceAvailabilityOnParkingOpenHourForParkingOpenHoursParkingSpaceAvailabilityIdFkeyNodeIdUpdate
    >
  >
  /** A `ParkingOpenHourInput` object that will be created and connected to this object. */
  create?: Maybe<Array<ParkingOpenHoursParkingSpaceAvailabilityIdFkeyParkingOpenHoursCreateInput>>
}

/** The fields on `parkingOpenHour` to look up the row to connect. */
export type ParkingOpenHourParkingOpenHoursPkeyConnect = {
  id: Scalars['UUID']
}

/** The globally unique `ID` look up for the row to connect. */
export type ParkingOpenHourNodeIdConnect = {
  /** The globally unique `ID` which identifies a single `parkingOpenHour` to be connected. */
  nodeId: Scalars['ID']
}

/** The fields on `parkingOpenHour` to look up the row to delete. */
export type ParkingOpenHourParkingOpenHoursPkeyDelete = {
  id: Scalars['UUID']
}

/** The globally unique `ID` look up for the row to delete. */
export type ParkingOpenHourNodeIdDelete = {
  /** The globally unique `ID` which identifies a single `parkingOpenHour` to be deleted. */
  nodeId: Scalars['ID']
}

/** The fields on `parkingOpenHour` to look up the row to update. */
export type ParkingOpenHourOnParkingOpenHourForParkingOpenHoursParkingSpaceAvailabilityIdFkeyUsingParkingOpenHoursPkeyUpdate = {
  /** An object where the defined keys will be set on the `parkingOpenHour` being updated. */
  patch: UpdateParkingOpenHourOnParkingOpenHourForParkingOpenHoursParkingSpaceAvailabilityIdFkeyPatch
  id: Scalars['UUID']
}

/** An object where the defined keys will be set on the `parkingOpenHour` being updated. */
export type UpdateParkingOpenHourOnParkingOpenHourForParkingOpenHoursParkingSpaceAvailabilityIdFkeyPatch = {
  id?: Maybe<Scalars['UUID']>
  dayOfWeek?: Maybe<Scalars['JSON']>
  fromTime?: Maybe<Scalars['Time']>
  toTime?: Maybe<Scalars['Time']>
  price?: Maybe<Scalars['Float']>
  currency?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  parkingSpaceAvailabilityToParkingSpaceAvailabilityId?: Maybe<
    ParkingOpenHoursParkingSpaceAvailabilityIdFkeyInput
  >
}

/** Input for the nested mutation of `parkingSpaceAvailability` in the `ParkingOpenHourInput` mutation. */
export type ParkingOpenHoursParkingSpaceAvailabilityIdFkeyInput = {
  /** The primary key(s) for `parkingSpaceAvailability` for the far side of the relationship. */
  connectById?: Maybe<ParkingSpaceAvailabilityParkingSpaceAvailabilityPkeyConnect>
  /** The primary key(s) for `parkingSpaceAvailability` for the far side of the relationship. */
  connectByNodeId?: Maybe<ParkingSpaceAvailabilityNodeIdConnect>
  /** The primary key(s) for `parkingSpaceAvailability` for the far side of the relationship. */
  deleteById?: Maybe<ParkingSpaceAvailabilityParkingSpaceAvailabilityPkeyDelete>
  /** The primary key(s) for `parkingSpaceAvailability` for the far side of the relationship. */
  deleteByNodeId?: Maybe<ParkingSpaceAvailabilityNodeIdDelete>
  /** The primary key(s) and patch data for `parkingSpaceAvailability` for the far side of the relationship. */
  updateById?: Maybe<
    ParkingSpaceAvailabilityOnParkingOpenHourForParkingOpenHoursParkingSpaceAvailabilityIdFkeyUsingParkingSpaceAvailabilityPkeyUpdate
  >
  /** The primary key(s) and patch data for `parkingSpaceAvailability` for the far side of the relationship. */
  updateByNodeId?: Maybe<
    ParkingOpenHourOnParkingOpenHourForParkingOpenHoursParkingSpaceAvailabilityIdFkeyNodeIdUpdate
  >
  /** A `ParkingSpaceAvailabilityInput` object that will be created and connected to this object. */
  create?: Maybe<ParkingOpenHoursParkingSpaceAvailabilityIdFkeyParkingSpaceAvailabilityCreateInput>
}

/** The fields on `parkingSpaceAvailability` to look up the row to update. */
export type ParkingSpaceAvailabilityOnParkingOpenHourForParkingOpenHoursParkingSpaceAvailabilityIdFkeyUsingParkingSpaceAvailabilityPkeyUpdate = {
  /** An object where the defined keys will be set on the `parkingSpaceAvailability` being updated. */
  patch: UpdateParkingSpaceAvailabilityOnParkingOpenHourForParkingOpenHoursParkingSpaceAvailabilityIdFkeyPatch
  id: Scalars['UUID']
}

/** An object where the defined keys will be set on the `parkingSpaceAvailability` being updated. */
export type UpdateParkingSpaceAvailabilityOnParkingOpenHourForParkingOpenHoursParkingSpaceAvailabilityIdFkeyPatch = {
  id?: Maybe<Scalars['UUID']>
  parkingSpaceId?: Maybe<Scalars['UUID']>
  fromDate?: Maybe<Scalars['Date']>
  toDate?: Maybe<Scalars['Date']>
  defaultFlag?: Maybe<Scalars['Boolean']>
  closedFlag?: Maybe<Scalars['Boolean']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  parkingSpaceToParkingSpaceId?: Maybe<ParkingSpaceAvailabilityParkingSpaceIdFkeyInput>
  parkingOpenHoursUsingId?: Maybe<ParkingOpenHoursParkingSpaceAvailabilityIdFkeyInverseInput>
  parkingWorkingHoursUsingId?: Maybe<ParkingWorkingHoursParkingSpaceAvailabilityIdFkeyInverseInput>
}

/** Input for the nested mutation of `parkingWorkingHour` in the `ParkingSpaceAvailabilityInput` mutation. */
export type ParkingWorkingHoursParkingSpaceAvailabilityIdFkeyInverseInput = {
  /** Flag indicating whether all other `parkingWorkingHour` records that match this relationship should be removed. */
  deleteOthers?: Maybe<Scalars['Boolean']>
  /** The primary key(s) for `parkingWorkingHour` for the far side of the relationship. */
  connectById?: Maybe<Array<ParkingWorkingHourParkingWorkingHoursPkeyConnect>>
  /** The primary key(s) for `parkingWorkingHour` for the far side of the relationship. */
  connectByNodeId?: Maybe<Array<ParkingWorkingHourNodeIdConnect>>
  /** The primary key(s) for `parkingWorkingHour` for the far side of the relationship. */
  deleteById?: Maybe<Array<ParkingWorkingHourParkingWorkingHoursPkeyDelete>>
  /** The primary key(s) for `parkingWorkingHour` for the far side of the relationship. */
  deleteByNodeId?: Maybe<Array<ParkingWorkingHourNodeIdDelete>>
  /** The primary key(s) and patch data for `parkingWorkingHour` for the far side of the relationship. */
  updateById?: Maybe<
    Array<
      ParkingWorkingHourOnParkingWorkingHourForParkingWorkingHoursParkingSpaceAvailabilityIdFkeyUsingParkingWorkingHoursPkeyUpdate
    >
  >
  /** The primary key(s) and patch data for `parkingWorkingHour` for the far side of the relationship. */
  updateByNodeId?: Maybe<
    Array<
      ParkingSpaceAvailabilityOnParkingWorkingHourForParkingWorkingHoursParkingSpaceAvailabilityIdFkeyNodeIdUpdate
    >
  >
  /** A `ParkingWorkingHourInput` object that will be created and connected to this object. */
  create?: Maybe<
    Array<ParkingWorkingHoursParkingSpaceAvailabilityIdFkeyParkingWorkingHoursCreateInput>
  >
}

/** The fields on `parkingWorkingHour` to look up the row to connect. */
export type ParkingWorkingHourParkingWorkingHoursPkeyConnect = {
  id: Scalars['UUID']
}

/** The globally unique `ID` look up for the row to connect. */
export type ParkingWorkingHourNodeIdConnect = {
  /** The globally unique `ID` which identifies a single `parkingWorkingHour` to be connected. */
  nodeId: Scalars['ID']
}

/** The fields on `parkingWorkingHour` to look up the row to delete. */
export type ParkingWorkingHourParkingWorkingHoursPkeyDelete = {
  id: Scalars['UUID']
}

/** The globally unique `ID` look up for the row to delete. */
export type ParkingWorkingHourNodeIdDelete = {
  /** The globally unique `ID` which identifies a single `parkingWorkingHour` to be deleted. */
  nodeId: Scalars['ID']
}

/** The fields on `parkingWorkingHour` to look up the row to update. */
export type ParkingWorkingHourOnParkingWorkingHourForParkingWorkingHoursParkingSpaceAvailabilityIdFkeyUsingParkingWorkingHoursPkeyUpdate = {
  /** An object where the defined keys will be set on the `parkingWorkingHour` being updated. */
  patch: UpdateParkingWorkingHourOnParkingWorkingHourForParkingWorkingHoursParkingSpaceAvailabilityIdFkeyPatch
  id: Scalars['UUID']
}

/** An object where the defined keys will be set on the `parkingWorkingHour` being updated. */
export type UpdateParkingWorkingHourOnParkingWorkingHourForParkingWorkingHoursParkingSpaceAvailabilityIdFkeyPatch = {
  id?: Maybe<Scalars['UUID']>
  dayOfWeek?: Maybe<Scalars['JSON']>
  fromTime?: Maybe<Scalars['Time']>
  toTime?: Maybe<Scalars['Time']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  parkingSpaceAvailabilityToParkingSpaceAvailabilityId?: Maybe<
    ParkingWorkingHoursParkingSpaceAvailabilityIdFkeyInput
  >
}

/** Input for the nested mutation of `parkingSpaceAvailability` in the `ParkingWorkingHourInput` mutation. */
export type ParkingWorkingHoursParkingSpaceAvailabilityIdFkeyInput = {
  /** The primary key(s) for `parkingSpaceAvailability` for the far side of the relationship. */
  connectById?: Maybe<ParkingSpaceAvailabilityParkingSpaceAvailabilityPkeyConnect>
  /** The primary key(s) for `parkingSpaceAvailability` for the far side of the relationship. */
  connectByNodeId?: Maybe<ParkingSpaceAvailabilityNodeIdConnect>
  /** The primary key(s) for `parkingSpaceAvailability` for the far side of the relationship. */
  deleteById?: Maybe<ParkingSpaceAvailabilityParkingSpaceAvailabilityPkeyDelete>
  /** The primary key(s) for `parkingSpaceAvailability` for the far side of the relationship. */
  deleteByNodeId?: Maybe<ParkingSpaceAvailabilityNodeIdDelete>
  /** The primary key(s) and patch data for `parkingSpaceAvailability` for the far side of the relationship. */
  updateById?: Maybe<
    ParkingSpaceAvailabilityOnParkingWorkingHourForParkingWorkingHoursParkingSpaceAvailabilityIdFkeyUsingParkingSpaceAvailabilityPkeyUpdate
  >
  /** The primary key(s) and patch data for `parkingSpaceAvailability` for the far side of the relationship. */
  updateByNodeId?: Maybe<
    ParkingWorkingHourOnParkingWorkingHourForParkingWorkingHoursParkingSpaceAvailabilityIdFkeyNodeIdUpdate
  >
  /** A `ParkingSpaceAvailabilityInput` object that will be created and connected to this object. */
  create?: Maybe<
    ParkingWorkingHoursParkingSpaceAvailabilityIdFkeyParkingSpaceAvailabilityCreateInput
  >
}

/** The fields on `parkingSpaceAvailability` to look up the row to update. */
export type ParkingSpaceAvailabilityOnParkingWorkingHourForParkingWorkingHoursParkingSpaceAvailabilityIdFkeyUsingParkingSpaceAvailabilityPkeyUpdate = {
  /** An object where the defined keys will be set on the `parkingSpaceAvailability` being updated. */
  patch: UpdateParkingSpaceAvailabilityOnParkingWorkingHourForParkingWorkingHoursParkingSpaceAvailabilityIdFkeyPatch
  id: Scalars['UUID']
}

/** An object where the defined keys will be set on the `parkingSpaceAvailability` being updated. */
export type UpdateParkingSpaceAvailabilityOnParkingWorkingHourForParkingWorkingHoursParkingSpaceAvailabilityIdFkeyPatch = {
  id?: Maybe<Scalars['UUID']>
  parkingSpaceId?: Maybe<Scalars['UUID']>
  fromDate?: Maybe<Scalars['Date']>
  toDate?: Maybe<Scalars['Date']>
  defaultFlag?: Maybe<Scalars['Boolean']>
  closedFlag?: Maybe<Scalars['Boolean']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  parkingSpaceToParkingSpaceId?: Maybe<ParkingSpaceAvailabilityParkingSpaceIdFkeyInput>
  parkingOpenHoursUsingId?: Maybe<ParkingOpenHoursParkingSpaceAvailabilityIdFkeyInverseInput>
  parkingWorkingHoursUsingId?: Maybe<ParkingWorkingHoursParkingSpaceAvailabilityIdFkeyInverseInput>
}

/** The globally unique `ID` look up for the row to update. */
export type ParkingWorkingHourOnParkingWorkingHourForParkingWorkingHoursParkingSpaceAvailabilityIdFkeyNodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `parkingSpaceAvailability` to be connected. */
  nodeId: Scalars['ID']
  /** An object where the defined keys will be set on the `parkingSpaceAvailability` being updated. */
  patch: ParkingSpaceAvailabilityPatch
}

/** Represents an update to a `ParkingSpaceAvailability`. Fields that are set will be updated. */
export type ParkingSpaceAvailabilityPatch = {
  id?: Maybe<Scalars['UUID']>
  parkingSpaceId?: Maybe<Scalars['UUID']>
  fromDate?: Maybe<Scalars['Date']>
  toDate?: Maybe<Scalars['Date']>
  defaultFlag?: Maybe<Scalars['Boolean']>
  closedFlag?: Maybe<Scalars['Boolean']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  parkingSpaceToParkingSpaceId?: Maybe<ParkingSpaceAvailabilityParkingSpaceIdFkeyInput>
  parkingOpenHoursUsingId?: Maybe<ParkingOpenHoursParkingSpaceAvailabilityIdFkeyInverseInput>
  parkingWorkingHoursUsingId?: Maybe<ParkingWorkingHoursParkingSpaceAvailabilityIdFkeyInverseInput>
}

/** The `parkingSpaceAvailability` to be created by this mutation. */
export type ParkingWorkingHoursParkingSpaceAvailabilityIdFkeyParkingSpaceAvailabilityCreateInput = {
  id?: Maybe<Scalars['UUID']>
  parkingSpaceId?: Maybe<Scalars['UUID']>
  fromDate: Scalars['Date']
  toDate: Scalars['Date']
  defaultFlag?: Maybe<Scalars['Boolean']>
  closedFlag?: Maybe<Scalars['Boolean']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  parkingSpaceToParkingSpaceId?: Maybe<ParkingSpaceAvailabilityParkingSpaceIdFkeyInput>
  parkingOpenHoursUsingId?: Maybe<ParkingOpenHoursParkingSpaceAvailabilityIdFkeyInverseInput>
  parkingWorkingHoursUsingId?: Maybe<ParkingWorkingHoursParkingSpaceAvailabilityIdFkeyInverseInput>
}

/** The globally unique `ID` look up for the row to update. */
export type ParkingSpaceAvailabilityOnParkingWorkingHourForParkingWorkingHoursParkingSpaceAvailabilityIdFkeyNodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `parkingWorkingHour` to be connected. */
  nodeId: Scalars['ID']
  /** An object where the defined keys will be set on the `parkingWorkingHour` being updated. */
  patch: ParkingWorkingHourPatch
}

/** Represents an update to a `ParkingWorkingHour`. Fields that are set will be updated. */
export type ParkingWorkingHourPatch = {
  id?: Maybe<Scalars['UUID']>
  parkingSpaceAvailabilityId?: Maybe<Scalars['UUID']>
  dayOfWeek?: Maybe<Scalars['JSON']>
  fromTime?: Maybe<Scalars['Time']>
  toTime?: Maybe<Scalars['Time']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  parkingSpaceAvailabilityToParkingSpaceAvailabilityId?: Maybe<
    ParkingWorkingHoursParkingSpaceAvailabilityIdFkeyInput
  >
}

/** The `parkingWorkingHour` to be created by this mutation. */
export type ParkingWorkingHoursParkingSpaceAvailabilityIdFkeyParkingWorkingHoursCreateInput = {
  id?: Maybe<Scalars['UUID']>
  dayOfWeek: Scalars['JSON']
  fromTime: Scalars['Time']
  toTime: Scalars['Time']
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  parkingSpaceAvailabilityToParkingSpaceAvailabilityId?: Maybe<
    ParkingWorkingHoursParkingSpaceAvailabilityIdFkeyInput
  >
}

/** The globally unique `ID` look up for the row to update. */
export type ParkingOpenHourOnParkingOpenHourForParkingOpenHoursParkingSpaceAvailabilityIdFkeyNodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `parkingSpaceAvailability` to be connected. */
  nodeId: Scalars['ID']
  /** An object where the defined keys will be set on the `parkingSpaceAvailability` being updated. */
  patch: ParkingSpaceAvailabilityPatch
}

/** The `parkingSpaceAvailability` to be created by this mutation. */
export type ParkingOpenHoursParkingSpaceAvailabilityIdFkeyParkingSpaceAvailabilityCreateInput = {
  id?: Maybe<Scalars['UUID']>
  parkingSpaceId?: Maybe<Scalars['UUID']>
  fromDate: Scalars['Date']
  toDate: Scalars['Date']
  defaultFlag?: Maybe<Scalars['Boolean']>
  closedFlag?: Maybe<Scalars['Boolean']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  parkingSpaceToParkingSpaceId?: Maybe<ParkingSpaceAvailabilityParkingSpaceIdFkeyInput>
  parkingOpenHoursUsingId?: Maybe<ParkingOpenHoursParkingSpaceAvailabilityIdFkeyInverseInput>
  parkingWorkingHoursUsingId?: Maybe<ParkingWorkingHoursParkingSpaceAvailabilityIdFkeyInverseInput>
}

/** The globally unique `ID` look up for the row to update. */
export type ParkingSpaceAvailabilityOnParkingOpenHourForParkingOpenHoursParkingSpaceAvailabilityIdFkeyNodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `parkingOpenHour` to be connected. */
  nodeId: Scalars['ID']
  /** An object where the defined keys will be set on the `parkingOpenHour` being updated. */
  patch: ParkingOpenHourPatch
}

/** Represents an update to a `ParkingOpenHour`. Fields that are set will be updated. */
export type ParkingOpenHourPatch = {
  id?: Maybe<Scalars['UUID']>
  parkingSpaceAvailabilityId?: Maybe<Scalars['UUID']>
  dayOfWeek?: Maybe<Scalars['JSON']>
  fromTime?: Maybe<Scalars['Time']>
  toTime?: Maybe<Scalars['Time']>
  price?: Maybe<Scalars['Float']>
  currency?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  parkingSpaceAvailabilityToParkingSpaceAvailabilityId?: Maybe<
    ParkingOpenHoursParkingSpaceAvailabilityIdFkeyInput
  >
}

/** The `parkingOpenHour` to be created by this mutation. */
export type ParkingOpenHoursParkingSpaceAvailabilityIdFkeyParkingOpenHoursCreateInput = {
  id?: Maybe<Scalars['UUID']>
  dayOfWeek: Scalars['JSON']
  fromTime: Scalars['Time']
  toTime: Scalars['Time']
  price: Scalars['Float']
  currency?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  parkingSpaceAvailabilityToParkingSpaceAvailabilityId?: Maybe<
    ParkingOpenHoursParkingSpaceAvailabilityIdFkeyInput
  >
}

/** The globally unique `ID` look up for the row to update. */
export type ParkingSpaceOnParkingSpaceAvailabilityForParkingSpaceAvailabilityParkingSpaceIdFkeyNodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `parkingSpaceAvailability` to be connected. */
  nodeId: Scalars['ID']
  /** An object where the defined keys will be set on the `parkingSpaceAvailability` being updated. */
  patch: ParkingSpaceAvailabilityPatch
}

/** The `parkingSpaceAvailability` to be created by this mutation. */
export type ParkingSpaceAvailabilityParkingSpaceIdFkeyParkingSpaceAvailabilityCreateInput = {
  id?: Maybe<Scalars['UUID']>
  fromDate: Scalars['Date']
  toDate: Scalars['Date']
  defaultFlag?: Maybe<Scalars['Boolean']>
  closedFlag?: Maybe<Scalars['Boolean']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  parkingSpaceToParkingSpaceId?: Maybe<ParkingSpaceAvailabilityParkingSpaceIdFkeyInput>
  parkingOpenHoursUsingId?: Maybe<ParkingOpenHoursParkingSpaceAvailabilityIdFkeyInverseInput>
  parkingWorkingHoursUsingId?: Maybe<ParkingWorkingHoursParkingSpaceAvailabilityIdFkeyInverseInput>
}

/** The fields on `parkingSpace` to look up the row to update. */
export type ParkingSpaceOnParkingSpaceForParkingSpaceOwnerIdFkeyUsingParkingSpaceSlugUkeyUpdate = {
  /** An object where the defined keys will be set on the `parkingSpace` being updated. */
  patch: UpdateParkingSpaceOnParkingSpaceForParkingSpaceOwnerIdFkeyPatch
  slug: Scalars['String']
}

/** The globally unique `ID` look up for the row to update. */
export type UserOnParkingSpaceForParkingSpaceOwnerIdFkeyNodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `parkingSpace` to be connected. */
  nodeId: Scalars['ID']
  /** An object where the defined keys will be set on the `parkingSpace` being updated. */
  patch: ParkingSpacePatch
}

/** The `parkingSpace` to be created by this mutation. */
export type ParkingSpaceOwnerIdFkeyParkingSpaceCreateInput = {
  id?: Maybe<Scalars['UUID']>
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  photoUrl?: Maybe<Scalars['String']>
  settings?: Maybe<Scalars['JSON']>
  address?: Maybe<Scalars['JSON']>
  location?: Maybe<Scalars['GeoJSON']>
  slug?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  carEntry?: Maybe<Scalars['GeoJSON']>
  carExit?: Maybe<Scalars['GeoJSON']>
  companyEntrance?: Maybe<Scalars['GeoJSON']>
  parkingspaceMapview?: Maybe<Scalars['GeoJSON']>
  brandLogo?: Maybe<Scalars['String']>
  workingHours?: Maybe<Scalars['JSON']>
  advtLink?: Maybe<Scalars['String']>
  bluePrint?: Maybe<Scalars['String']>
  hiddenField?: Maybe<Scalars['String']>
  pedestrianText?: Maybe<Scalars['String']>
  languageCode?: Maybe<Scalars['String']>
  contributorId?: Maybe<Scalars['UUID']>
  floor?: Maybe<Scalars['Int']>
  category?: Maybe<SpaceCategory>
  status?: Maybe<ParkingSpaceStatus>
  verificationStatus?: Maybe<SpaceVerificationStatus>
  accessRestriction?: Maybe<Array<Maybe<SpaceAccessRestriction>>>
  deleted?: Maybe<Scalars['Boolean']>
  deletedAt?: Maybe<Scalars['Datetime']>
  businessStatusReason?: Maybe<Scalars['String']>
  userToOwnerId?: Maybe<ParkingSpaceOwnerIdFkeyInput>
  slotsUsingId?: Maybe<SlotParkingSpaceIdFkeyInverseInput>
  parkingSpaceAvailabilitiesUsingId?: Maybe<ParkingSpaceAvailabilityParkingSpaceIdFkeyInverseInput>
}

/** The globally unique `ID` look up for the row to update. */
export type UserSubscriptionOnUserSubscriptionForUserSubscriptionUserIdFkeyNodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `user` to be connected. */
  nodeId: Scalars['ID']
  /** An object where the defined keys will be set on the `user` being updated. */
  patch: UserPatch
}

/** Input for the nested mutation of `billingProfile` in the `UserSubscriptionInput` mutation. */
export type UserSubscriptionBillingProfileIdFkeyInput = {
  /** The primary key(s) for `billingProfile` for the far side of the relationship. */
  connectById?: Maybe<BillingProfileBillingProfilePkeyConnect>
  /** The primary key(s) for `billingProfile` for the far side of the relationship. */
  connectByNodeId?: Maybe<BillingProfileNodeIdConnect>
  /** The primary key(s) for `billingProfile` for the far side of the relationship. */
  deleteById?: Maybe<BillingProfileBillingProfilePkeyDelete>
  /** The primary key(s) for `billingProfile` for the far side of the relationship. */
  deleteByNodeId?: Maybe<BillingProfileNodeIdDelete>
  /** The primary key(s) and patch data for `billingProfile` for the far side of the relationship. */
  updateById?: Maybe<
    BillingProfileOnUserSubscriptionForUserSubscriptionBillingProfileIdFkeyUsingBillingProfilePkeyUpdate
  >
  /** The primary key(s) and patch data for `billingProfile` for the far side of the relationship. */
  updateByNodeId?: Maybe<
    UserSubscriptionOnUserSubscriptionForUserSubscriptionBillingProfileIdFkeyNodeIdUpdate
  >
}

/** The fields on `billingProfile` to look up the row to update. */
export type BillingProfileOnUserSubscriptionForUserSubscriptionBillingProfileIdFkeyUsingBillingProfilePkeyUpdate = {
  /** An object where the defined keys will be set on the `billingProfile` being updated. */
  patch: UpdateBillingProfileOnUserSubscriptionForUserSubscriptionBillingProfileIdFkeyPatch
  id: Scalars['UUID']
}

/** An object where the defined keys will be set on the `billingProfile` being updated. */
export type UpdateBillingProfileOnUserSubscriptionForUserSubscriptionBillingProfileIdFkeyPatch = {
  id?: Maybe<Scalars['UUID']>
  userId?: Maybe<Scalars['UUID']>
  customerId?: Maybe<Scalars['String']>
  customerObj?: Maybe<Scalars['JSON']>
  billingDetails?: Maybe<Scalars['JSON']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  userToUserId?: Maybe<BillingProfileUserIdFkeyInput>
  userSubscriptionsUsingId?: Maybe<UserSubscriptionBillingProfileIdFkeyInverseInput>
}

/** Input for the nested mutation of `userSubscription` in the `BillingProfileInput` mutation. */
export type UserSubscriptionBillingProfileIdFkeyInverseInput = {
  /** Flag indicating whether all other `userSubscription` records that match this relationship should be removed. */
  deleteOthers?: Maybe<Scalars['Boolean']>
  /** The primary key(s) for `userSubscription` for the far side of the relationship. */
  connectById?: Maybe<Array<UserSubscriptionUserSubscriptionPkeyConnect>>
  /** The primary key(s) for `userSubscription` for the far side of the relationship. */
  connectByNodeId?: Maybe<Array<UserSubscriptionNodeIdConnect>>
  /** The primary key(s) for `userSubscription` for the far side of the relationship. */
  deleteById?: Maybe<Array<UserSubscriptionUserSubscriptionPkeyDelete>>
  /** The primary key(s) for `userSubscription` for the far side of the relationship. */
  deleteByNodeId?: Maybe<Array<UserSubscriptionNodeIdDelete>>
  /** The primary key(s) and patch data for `userSubscription` for the far side of the relationship. */
  updateById?: Maybe<
    Array<
      UserSubscriptionOnUserSubscriptionForUserSubscriptionBillingProfileIdFkeyUsingUserSubscriptionPkeyUpdate
    >
  >
  /** The primary key(s) and patch data for `userSubscription` for the far side of the relationship. */
  updateByNodeId?: Maybe<
    Array<BillingProfileOnUserSubscriptionForUserSubscriptionBillingProfileIdFkeyNodeIdUpdate>
  >
}

/** The fields on `userSubscription` to look up the row to update. */
export type UserSubscriptionOnUserSubscriptionForUserSubscriptionBillingProfileIdFkeyUsingUserSubscriptionPkeyUpdate = {
  /** An object where the defined keys will be set on the `userSubscription` being updated. */
  patch: UpdateUserSubscriptionOnUserSubscriptionForUserSubscriptionBillingProfileIdFkeyPatch
  id: Scalars['UUID']
}

/** An object where the defined keys will be set on the `userSubscription` being updated. */
export type UpdateUserSubscriptionOnUserSubscriptionForUserSubscriptionBillingProfileIdFkeyPatch = {
  id?: Maybe<Scalars['UUID']>
  userId?: Maybe<Scalars['UUID']>
  planSubscriptionId?: Maybe<Scalars['String']>
  status?: Maybe<SubscriptionStatusT>
  endsAt?: Maybe<Scalars['Datetime']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  userToUserId?: Maybe<UserSubscriptionUserIdFkeyInput>
  billingProfileToBillingProfileId?: Maybe<UserSubscriptionBillingProfileIdFkeyInput>
}

/** The globally unique `ID` look up for the row to update. */
export type BillingProfileOnUserSubscriptionForUserSubscriptionBillingProfileIdFkeyNodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `userSubscription` to be connected. */
  nodeId: Scalars['ID']
  /** An object where the defined keys will be set on the `userSubscription` being updated. */
  patch: UserSubscriptionPatch
}

/** Represents an update to a `UserSubscription`. Fields that are set will be updated. */
export type UserSubscriptionPatch = {
  id?: Maybe<Scalars['UUID']>
  userId?: Maybe<Scalars['UUID']>
  billingProfileId?: Maybe<Scalars['UUID']>
  planSubscriptionId?: Maybe<Scalars['String']>
  status?: Maybe<SubscriptionStatusT>
  endsAt?: Maybe<Scalars['Datetime']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  userToUserId?: Maybe<UserSubscriptionUserIdFkeyInput>
  billingProfileToBillingProfileId?: Maybe<UserSubscriptionBillingProfileIdFkeyInput>
}

/** The globally unique `ID` look up for the row to update. */
export type UserSubscriptionOnUserSubscriptionForUserSubscriptionBillingProfileIdFkeyNodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `billingProfile` to be connected. */
  nodeId: Scalars['ID']
  /** An object where the defined keys will be set on the `billingProfile` being updated. */
  patch: BillingProfilePatch
}

/** Represents an update to a `BillingProfile`. Fields that are set will be updated. */
export type BillingProfilePatch = {
  id?: Maybe<Scalars['UUID']>
  userId?: Maybe<Scalars['UUID']>
  customerId?: Maybe<Scalars['String']>
  customerObj?: Maybe<Scalars['JSON']>
  billingDetails?: Maybe<Scalars['JSON']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  userToUserId?: Maybe<BillingProfileUserIdFkeyInput>
  userSubscriptionsUsingId?: Maybe<UserSubscriptionBillingProfileIdFkeyInverseInput>
}

/** The globally unique `ID` look up for the row to update. */
export type UserOnUserSubscriptionForUserSubscriptionUserIdFkeyNodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `userSubscription` to be connected. */
  nodeId: Scalars['ID']
  /** An object where the defined keys will be set on the `userSubscription` being updated. */
  patch: UserSubscriptionPatch
}

/** The globally unique `ID` look up for the row to update. */
export type BillingProfileOnBillingProfileForBillingProfileUserIdFkeyNodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `user` to be connected. */
  nodeId: Scalars['ID']
  /** An object where the defined keys will be set on the `user` being updated. */
  patch: UserPatch
}

/** The globally unique `ID` look up for the row to update. */
export type UserOnBillingProfileForBillingProfileUserIdFkeyNodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `billingProfile` to be connected. */
  nodeId: Scalars['ID']
  /** An object where the defined keys will be set on the `billingProfile` being updated. */
  patch: BillingProfilePatch
}

/** The globally unique `ID` look up for the row to update. */
export type VehicleOnVehicleForVehicleOwnerIdFkeyNodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `user` to be connected. */
  nodeId: Scalars['ID']
  /** An object where the defined keys will be set on the `user` being updated. */
  patch: UserPatch
}

/** Input for the nested mutation of `vehicleType` in the `VehicleInput` mutation. */
export type VehicleVehicleTypeIdFkeyInput = {
  /** The primary key(s) for `vehicleType` for the far side of the relationship. */
  connectById?: Maybe<VehicleTypeVehicleTypePkeyConnect>
  /** The primary key(s) for `vehicleType` for the far side of the relationship. */
  connectByName?: Maybe<VehicleTypeVehicleTypeNameUkeyConnect>
  /** The primary key(s) for `vehicleType` for the far side of the relationship. */
  connectByNodeId?: Maybe<VehicleTypeNodeIdConnect>
  /** The primary key(s) for `vehicleType` for the far side of the relationship. */
  deleteById?: Maybe<VehicleTypeVehicleTypePkeyDelete>
  /** The primary key(s) for `vehicleType` for the far side of the relationship. */
  deleteByName?: Maybe<VehicleTypeVehicleTypeNameUkeyDelete>
  /** The primary key(s) for `vehicleType` for the far side of the relationship. */
  deleteByNodeId?: Maybe<VehicleTypeNodeIdDelete>
  /** The primary key(s) and patch data for `vehicleType` for the far side of the relationship. */
  updateById?: Maybe<VehicleTypeOnVehicleForVehicleVehicleTypeIdFkeyUsingVehicleTypePkeyUpdate>
  /** The primary key(s) and patch data for `vehicleType` for the far side of the relationship. */
  updateByName?: Maybe<
    VehicleTypeOnVehicleForVehicleVehicleTypeIdFkeyUsingVehicleTypeNameUkeyUpdate
  >
  /** The primary key(s) and patch data for `vehicleType` for the far side of the relationship. */
  updateByNodeId?: Maybe<VehicleOnVehicleForVehicleVehicleTypeIdFkeyNodeIdUpdate>
  /** A `VehicleTypeInput` object that will be created and connected to this object. */
  create?: Maybe<VehicleVehicleTypeIdFkeyVehicleTypeCreateInput>
}

/** The fields on `vehicleType` to look up the row to connect. */
export type VehicleTypeVehicleTypePkeyConnect = {
  id: Scalars['UUID']
}

/** The fields on `vehicleType` to look up the row to connect. */
export type VehicleTypeVehicleTypeNameUkeyConnect = {
  name: Scalars['String']
}

/** The globally unique `ID` look up for the row to connect. */
export type VehicleTypeNodeIdConnect = {
  /** The globally unique `ID` which identifies a single `vehicleType` to be connected. */
  nodeId: Scalars['ID']
}

/** The fields on `vehicleType` to look up the row to delete. */
export type VehicleTypeVehicleTypePkeyDelete = {
  id: Scalars['UUID']
}

/** The fields on `vehicleType` to look up the row to delete. */
export type VehicleTypeVehicleTypeNameUkeyDelete = {
  name: Scalars['String']
}

/** The globally unique `ID` look up for the row to delete. */
export type VehicleTypeNodeIdDelete = {
  /** The globally unique `ID` which identifies a single `vehicleType` to be deleted. */
  nodeId: Scalars['ID']
}

/** The fields on `vehicleType` to look up the row to update. */
export type VehicleTypeOnVehicleForVehicleVehicleTypeIdFkeyUsingVehicleTypePkeyUpdate = {
  /** An object where the defined keys will be set on the `vehicleType` being updated. */
  patch: UpdateVehicleTypeOnVehicleForVehicleVehicleTypeIdFkeyPatch
  id: Scalars['UUID']
}

/** An object where the defined keys will be set on the `vehicleType` being updated. */
export type UpdateVehicleTypeOnVehicleForVehicleVehicleTypeIdFkeyPatch = {
  id?: Maybe<Scalars['UUID']>
  name?: Maybe<Scalars['String']>
  weight?: Maybe<Scalars['Int']>
  vehiclesUsingId?: Maybe<VehicleVehicleTypeIdFkeyInverseInput>
}

/** Input for the nested mutation of `vehicle` in the `VehicleTypeInput` mutation. */
export type VehicleVehicleTypeIdFkeyInverseInput = {
  /** Flag indicating whether all other `vehicle` records that match this relationship should be removed. */
  deleteOthers?: Maybe<Scalars['Boolean']>
  /** The primary key(s) for `vehicle` for the far side of the relationship. */
  connectById?: Maybe<Array<VehicleVehiclePkeyConnect>>
  /** The primary key(s) for `vehicle` for the far side of the relationship. */
  connectByNodeId?: Maybe<Array<VehicleNodeIdConnect>>
  /** The primary key(s) for `vehicle` for the far side of the relationship. */
  deleteById?: Maybe<Array<VehicleVehiclePkeyDelete>>
  /** The primary key(s) for `vehicle` for the far side of the relationship. */
  deleteByNodeId?: Maybe<Array<VehicleNodeIdDelete>>
  /** The primary key(s) and patch data for `vehicle` for the far side of the relationship. */
  updateById?: Maybe<Array<VehicleOnVehicleForVehicleVehicleTypeIdFkeyUsingVehiclePkeyUpdate>>
  /** The primary key(s) and patch data for `vehicle` for the far side of the relationship. */
  updateByNodeId?: Maybe<Array<VehicleTypeOnVehicleForVehicleVehicleTypeIdFkeyNodeIdUpdate>>
  /** A `VehicleInput` object that will be created and connected to this object. */
  create?: Maybe<Array<VehicleVehicleTypeIdFkeyVehicleCreateInput>>
}

/** The fields on `vehicle` to look up the row to update. */
export type VehicleOnVehicleForVehicleVehicleTypeIdFkeyUsingVehiclePkeyUpdate = {
  /** An object where the defined keys will be set on the `vehicle` being updated. */
  patch: UpdateVehicleOnVehicleForVehicleVehicleTypeIdFkeyPatch
  id: Scalars['UUID']
}

/** An object where the defined keys will be set on the `vehicle` being updated. */
export type UpdateVehicleOnVehicleForVehicleVehicleTypeIdFkeyPatch = {
  id?: Maybe<Scalars['UUID']>
  ownerId?: Maybe<Scalars['UUID']>
  name?: Maybe<Scalars['String']>
  licensePlate?: Maybe<Scalars['String']>
  vehicleSizeId?: Maybe<Scalars['UUID']>
  status?: Maybe<StatusT>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  userToOwnerId?: Maybe<VehicleOwnerIdFkeyInput>
  vehicleTypeToVehicleTypeId?: Maybe<VehicleVehicleTypeIdFkeyInput>
  vehicleSizeToVehicleSizeId?: Maybe<VehicleVehicleSizeIdFkeyInput>
}

/** Input for the nested mutation of `vehicleSize` in the `VehicleInput` mutation. */
export type VehicleVehicleSizeIdFkeyInput = {
  /** The primary key(s) for `vehicleSize` for the far side of the relationship. */
  connectById?: Maybe<VehicleSizeVehicleSizePkeyConnect>
  /** The primary key(s) for `vehicleSize` for the far side of the relationship. */
  connectByNodeId?: Maybe<VehicleSizeNodeIdConnect>
  /** The primary key(s) for `vehicleSize` for the far side of the relationship. */
  deleteById?: Maybe<VehicleSizeVehicleSizePkeyDelete>
  /** The primary key(s) for `vehicleSize` for the far side of the relationship. */
  deleteByNodeId?: Maybe<VehicleSizeNodeIdDelete>
  /** The primary key(s) and patch data for `vehicleSize` for the far side of the relationship. */
  updateById?: Maybe<VehicleSizeOnVehicleForVehicleVehicleSizeIdFkeyUsingVehicleSizePkeyUpdate>
  /** The primary key(s) and patch data for `vehicleSize` for the far side of the relationship. */
  updateByNodeId?: Maybe<VehicleOnVehicleForVehicleVehicleSizeIdFkeyNodeIdUpdate>
  /** A `VehicleSizeInput` object that will be created and connected to this object. */
  create?: Maybe<VehicleVehicleSizeIdFkeyVehicleSizeCreateInput>
}

/** The fields on `vehicleSize` to look up the row to update. */
export type VehicleSizeOnVehicleForVehicleVehicleSizeIdFkeyUsingVehicleSizePkeyUpdate = {
  /** An object where the defined keys will be set on the `vehicleSize` being updated. */
  patch: UpdateVehicleSizeOnVehicleForVehicleVehicleSizeIdFkeyPatch
  id: Scalars['UUID']
}

/** An object where the defined keys will be set on the `vehicleSize` being updated. */
export type UpdateVehicleSizeOnVehicleForVehicleVehicleSizeIdFkeyPatch = {
  id?: Maybe<Scalars['UUID']>
  status?: Maybe<ContentStatusT>
  name?: Maybe<Scalars['String']>
  weight?: Maybe<Scalars['Int']>
  description?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  slotsUsingId?: Maybe<SlotVehicleSizeIdFkeyInverseInput>
  vehiclesUsingId?: Maybe<VehicleVehicleSizeIdFkeyInverseInput>
}

/** Input for the nested mutation of `vehicle` in the `VehicleSizeInput` mutation. */
export type VehicleVehicleSizeIdFkeyInverseInput = {
  /** Flag indicating whether all other `vehicle` records that match this relationship should be removed. */
  deleteOthers?: Maybe<Scalars['Boolean']>
  /** The primary key(s) for `vehicle` for the far side of the relationship. */
  connectById?: Maybe<Array<VehicleVehiclePkeyConnect>>
  /** The primary key(s) for `vehicle` for the far side of the relationship. */
  connectByNodeId?: Maybe<Array<VehicleNodeIdConnect>>
  /** The primary key(s) for `vehicle` for the far side of the relationship. */
  deleteById?: Maybe<Array<VehicleVehiclePkeyDelete>>
  /** The primary key(s) for `vehicle` for the far side of the relationship. */
  deleteByNodeId?: Maybe<Array<VehicleNodeIdDelete>>
  /** The primary key(s) and patch data for `vehicle` for the far side of the relationship. */
  updateById?: Maybe<Array<VehicleOnVehicleForVehicleVehicleSizeIdFkeyUsingVehiclePkeyUpdate>>
  /** The primary key(s) and patch data for `vehicle` for the far side of the relationship. */
  updateByNodeId?: Maybe<Array<VehicleSizeOnVehicleForVehicleVehicleSizeIdFkeyNodeIdUpdate>>
  /** A `VehicleInput` object that will be created and connected to this object. */
  create?: Maybe<Array<VehicleVehicleSizeIdFkeyVehicleCreateInput>>
}

/** The fields on `vehicle` to look up the row to update. */
export type VehicleOnVehicleForVehicleVehicleSizeIdFkeyUsingVehiclePkeyUpdate = {
  /** An object where the defined keys will be set on the `vehicle` being updated. */
  patch: UpdateVehicleOnVehicleForVehicleVehicleSizeIdFkeyPatch
  id: Scalars['UUID']
}

/** An object where the defined keys will be set on the `vehicle` being updated. */
export type UpdateVehicleOnVehicleForVehicleVehicleSizeIdFkeyPatch = {
  id?: Maybe<Scalars['UUID']>
  ownerId?: Maybe<Scalars['UUID']>
  name?: Maybe<Scalars['String']>
  licensePlate?: Maybe<Scalars['String']>
  vehicleTypeId?: Maybe<Scalars['UUID']>
  status?: Maybe<StatusT>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  userToOwnerId?: Maybe<VehicleOwnerIdFkeyInput>
  vehicleTypeToVehicleTypeId?: Maybe<VehicleVehicleTypeIdFkeyInput>
  vehicleSizeToVehicleSizeId?: Maybe<VehicleVehicleSizeIdFkeyInput>
}

/** The globally unique `ID` look up for the row to update. */
export type VehicleSizeOnVehicleForVehicleVehicleSizeIdFkeyNodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `vehicle` to be connected. */
  nodeId: Scalars['ID']
  /** An object where the defined keys will be set on the `vehicle` being updated. */
  patch: VehiclePatch
}

/** Represents an update to a `Vehicle`. Fields that are set will be updated. */
export type VehiclePatch = {
  id?: Maybe<Scalars['UUID']>
  ownerId?: Maybe<Scalars['UUID']>
  name?: Maybe<Scalars['String']>
  licensePlate?: Maybe<Scalars['String']>
  vehicleTypeId?: Maybe<Scalars['UUID']>
  vehicleSizeId?: Maybe<Scalars['UUID']>
  status?: Maybe<StatusT>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  userToOwnerId?: Maybe<VehicleOwnerIdFkeyInput>
  vehicleTypeToVehicleTypeId?: Maybe<VehicleVehicleTypeIdFkeyInput>
  vehicleSizeToVehicleSizeId?: Maybe<VehicleVehicleSizeIdFkeyInput>
}

/** The `vehicle` to be created by this mutation. */
export type VehicleVehicleSizeIdFkeyVehicleCreateInput = {
  id?: Maybe<Scalars['UUID']>
  ownerId?: Maybe<Scalars['UUID']>
  name: Scalars['String']
  licensePlate?: Maybe<Scalars['String']>
  vehicleTypeId?: Maybe<Scalars['UUID']>
  status?: Maybe<StatusT>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  userToOwnerId?: Maybe<VehicleOwnerIdFkeyInput>
  vehicleTypeToVehicleTypeId?: Maybe<VehicleVehicleTypeIdFkeyInput>
  vehicleSizeToVehicleSizeId?: Maybe<VehicleVehicleSizeIdFkeyInput>
}

/** The globally unique `ID` look up for the row to update. */
export type VehicleOnVehicleForVehicleVehicleSizeIdFkeyNodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `vehicleSize` to be connected. */
  nodeId: Scalars['ID']
  /** An object where the defined keys will be set on the `vehicleSize` being updated. */
  patch: VehicleSizePatch
}

/** Represents an update to a `VehicleSize`. Fields that are set will be updated. */
export type VehicleSizePatch = {
  id?: Maybe<Scalars['UUID']>
  status?: Maybe<ContentStatusT>
  name?: Maybe<Scalars['String']>
  weight?: Maybe<Scalars['Int']>
  description?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  slotsUsingId?: Maybe<SlotVehicleSizeIdFkeyInverseInput>
  vehiclesUsingId?: Maybe<VehicleVehicleSizeIdFkeyInverseInput>
}

/** The `vehicleSize` to be created by this mutation. */
export type VehicleVehicleSizeIdFkeyVehicleSizeCreateInput = {
  id?: Maybe<Scalars['UUID']>
  status?: Maybe<ContentStatusT>
  name?: Maybe<Scalars['String']>
  weight?: Maybe<Scalars['Int']>
  description?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  slotsUsingId?: Maybe<SlotVehicleSizeIdFkeyInverseInput>
  vehiclesUsingId?: Maybe<VehicleVehicleSizeIdFkeyInverseInput>
}

/** The globally unique `ID` look up for the row to update. */
export type VehicleTypeOnVehicleForVehicleVehicleTypeIdFkeyNodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `vehicle` to be connected. */
  nodeId: Scalars['ID']
  /** An object where the defined keys will be set on the `vehicle` being updated. */
  patch: VehiclePatch
}

/** The `vehicle` to be created by this mutation. */
export type VehicleVehicleTypeIdFkeyVehicleCreateInput = {
  id?: Maybe<Scalars['UUID']>
  ownerId?: Maybe<Scalars['UUID']>
  name: Scalars['String']
  licensePlate?: Maybe<Scalars['String']>
  vehicleSizeId?: Maybe<Scalars['UUID']>
  status?: Maybe<StatusT>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  userToOwnerId?: Maybe<VehicleOwnerIdFkeyInput>
  vehicleTypeToVehicleTypeId?: Maybe<VehicleVehicleTypeIdFkeyInput>
  vehicleSizeToVehicleSizeId?: Maybe<VehicleVehicleSizeIdFkeyInput>
}

/** The fields on `vehicleType` to look up the row to update. */
export type VehicleTypeOnVehicleForVehicleVehicleTypeIdFkeyUsingVehicleTypeNameUkeyUpdate = {
  /** An object where the defined keys will be set on the `vehicleType` being updated. */
  patch: UpdateVehicleTypeOnVehicleForVehicleVehicleTypeIdFkeyPatch
  name: Scalars['String']
}

/** The globally unique `ID` look up for the row to update. */
export type VehicleOnVehicleForVehicleVehicleTypeIdFkeyNodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `vehicleType` to be connected. */
  nodeId: Scalars['ID']
  /** An object where the defined keys will be set on the `vehicleType` being updated. */
  patch: VehicleTypePatch
}

/** Represents an update to a `VehicleType`. Fields that are set will be updated. */
export type VehicleTypePatch = {
  id?: Maybe<Scalars['UUID']>
  name?: Maybe<Scalars['String']>
  weight?: Maybe<Scalars['Int']>
  vehiclesUsingId?: Maybe<VehicleVehicleTypeIdFkeyInverseInput>
}

/** The `vehicleType` to be created by this mutation. */
export type VehicleVehicleTypeIdFkeyVehicleTypeCreateInput = {
  id?: Maybe<Scalars['UUID']>
  name: Scalars['String']
  weight?: Maybe<Scalars['Int']>
  vehiclesUsingId?: Maybe<VehicleVehicleTypeIdFkeyInverseInput>
}

/** The globally unique `ID` look up for the row to update. */
export type UserOnVehicleForVehicleOwnerIdFkeyNodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `vehicle` to be connected. */
  nodeId: Scalars['ID']
  /** An object where the defined keys will be set on the `vehicle` being updated. */
  patch: VehiclePatch
}

/** The `vehicle` to be created by this mutation. */
export type VehicleOwnerIdFkeyVehicleCreateInput = {
  id?: Maybe<Scalars['UUID']>
  name: Scalars['String']
  licensePlate?: Maybe<Scalars['String']>
  vehicleTypeId?: Maybe<Scalars['UUID']>
  vehicleSizeId?: Maybe<Scalars['UUID']>
  status?: Maybe<StatusT>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  userToOwnerId?: Maybe<VehicleOwnerIdFkeyInput>
  vehicleTypeToVehicleTypeId?: Maybe<VehicleVehicleTypeIdFkeyInput>
  vehicleSizeToVehicleSizeId?: Maybe<VehicleVehicleSizeIdFkeyInput>
}

/** The globally unique `ID` look up for the row to update. */
export type ParkingSpaceOnParkingSpaceForParkingSpaceOwnerIdFkeyNodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `user` to be connected. */
  nodeId: Scalars['ID']
  /** An object where the defined keys will be set on the `user` being updated. */
  patch: UserPatch
}

/** The fields on `parkingSpace` to look up the row to update. */
export type ParkingSpaceOnSlotForSlotParkingSpaceIdFkeyUsingParkingSpaceSlugUkeyUpdate = {
  /** An object where the defined keys will be set on the `parkingSpace` being updated. */
  patch: UpdateParkingSpaceOnSlotForSlotParkingSpaceIdFkeyPatch
  slug: Scalars['String']
}

/** The globally unique `ID` look up for the row to update. */
export type SlotOnSlotForSlotParkingSpaceIdFkeyNodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `parkingSpace` to be connected. */
  nodeId: Scalars['ID']
  /** An object where the defined keys will be set on the `parkingSpace` being updated. */
  patch: ParkingSpacePatch
}

/** The `parkingSpace` to be created by this mutation. */
export type SlotParkingSpaceIdFkeyParkingSpaceCreateInput = {
  id?: Maybe<Scalars['UUID']>
  ownerId?: Maybe<Scalars['UUID']>
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  photoUrl?: Maybe<Scalars['String']>
  settings?: Maybe<Scalars['JSON']>
  address?: Maybe<Scalars['JSON']>
  location?: Maybe<Scalars['GeoJSON']>
  slug?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  carEntry?: Maybe<Scalars['GeoJSON']>
  carExit?: Maybe<Scalars['GeoJSON']>
  companyEntrance?: Maybe<Scalars['GeoJSON']>
  parkingspaceMapview?: Maybe<Scalars['GeoJSON']>
  brandLogo?: Maybe<Scalars['String']>
  workingHours?: Maybe<Scalars['JSON']>
  advtLink?: Maybe<Scalars['String']>
  bluePrint?: Maybe<Scalars['String']>
  hiddenField?: Maybe<Scalars['String']>
  pedestrianText?: Maybe<Scalars['String']>
  languageCode?: Maybe<Scalars['String']>
  contributorId?: Maybe<Scalars['UUID']>
  floor?: Maybe<Scalars['Int']>
  category?: Maybe<SpaceCategory>
  status?: Maybe<ParkingSpaceStatus>
  verificationStatus?: Maybe<SpaceVerificationStatus>
  accessRestriction?: Maybe<Array<Maybe<SpaceAccessRestriction>>>
  deleted?: Maybe<Scalars['Boolean']>
  deletedAt?: Maybe<Scalars['Datetime']>
  businessStatusReason?: Maybe<Scalars['String']>
  userToOwnerId?: Maybe<ParkingSpaceOwnerIdFkeyInput>
  slotsUsingId?: Maybe<SlotParkingSpaceIdFkeyInverseInput>
  parkingSpaceAvailabilitiesUsingId?: Maybe<ParkingSpaceAvailabilityParkingSpaceIdFkeyInverseInput>
}

/** The globally unique `ID` look up for the row to update. */
export type VehicleSizeOnSlotForSlotVehicleSizeIdFkeyNodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `slot` to be connected. */
  nodeId: Scalars['ID']
  /** An object where the defined keys will be set on the `slot` being updated. */
  patch: SlotPatch
}

/** The `slot` to be created by this mutation. */
export type SlotVehicleSizeIdFkeySlotCreateInput = {
  id?: Maybe<Scalars['UUID']>
  name: Scalars['String']
  ownerId?: Maybe<Scalars['UUID']>
  address?: Maybe<Scalars['JSON']>
  timezone?: Maybe<Scalars['String']>
  pricePerHour: Scalars['BigFloat']
  status?: Maybe<SlotStatusT>
  photoUrl?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  notes?: Maybe<Scalars['String']>
  slug?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  deleted?: Maybe<Scalars['Boolean']>
  deletedAt?: Maybe<Scalars['Datetime']>
  verificationStatus?: Maybe<SlotVerificationStatus>
  parkingSpaceId?: Maybe<Scalars['UUID']>
  location: Scalars['GeoJSON']
  shape?: Maybe<Scalars['GeoJSON']>
  accessRestrictions?: Maybe<AccessRestrictions>
  businessStatus?: Maybe<SlotBusinessStatus>
  businessStatusReason?: Maybe<Scalars['String']>
  category?: Maybe<SlotCategory>
  contributorId?: Maybe<Scalars['UUID']>
  level?: Maybe<Scalars['Int']>
  mapSource?: Maybe<Scalars['UUID']>
  slotDimensions?: Maybe<Scalars['JSON']>
  tempUnavailable?: Maybe<Scalars['Boolean']>
  tempUnavailableFrom?: Maybe<Scalars['Datetime']>
  tempUnavailableTo?: Maybe<Scalars['Datetime']>
  waypoints?: Maybe<Scalars['JSON']>
  userToOwnerId?: Maybe<SlotOwnerIdFkeyInput>
  vehicleSizeToVehicleSizeId?: Maybe<SlotVehicleSizeIdFkeyInput>
  parkingSpaceToParkingSpaceId?: Maybe<SlotParkingSpaceIdFkeyInput>
  slotAmenitiesUsingId?: Maybe<SlotAmenitySlotIdFkeyInverseInput>
  slotAvailabilitiesUsingId?: Maybe<SlotAvailabilitySlotIdFkeyInverseInput>
  slotBookingsUsingId?: Maybe<FakeApiSlotBookingsForeignKey0InverseInput>
}

/** The globally unique `ID` look up for the row to update. */
export type SlotOnSlotForSlotVehicleSizeIdFkeyNodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `vehicleSize` to be connected. */
  nodeId: Scalars['ID']
  /** An object where the defined keys will be set on the `vehicleSize` being updated. */
  patch: VehicleSizePatch
}

/** The `vehicleSize` to be created by this mutation. */
export type SlotVehicleSizeIdFkeyVehicleSizeCreateInput = {
  id?: Maybe<Scalars['UUID']>
  status?: Maybe<ContentStatusT>
  name?: Maybe<Scalars['String']>
  weight?: Maybe<Scalars['Int']>
  description?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  slotsUsingId?: Maybe<SlotVehicleSizeIdFkeyInverseInput>
  vehiclesUsingId?: Maybe<VehicleVehicleSizeIdFkeyInverseInput>
}

/** The globally unique `ID` look up for the row to update. */
export type UserOnSlotForSlotOwnerIdFkeyNodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `slot` to be connected. */
  nodeId: Scalars['ID']
  /** An object where the defined keys will be set on the `slot` being updated. */
  patch: SlotPatch
}

/** The `slot` to be created by this mutation. */
export type SlotOwnerIdFkeySlotCreateInput = {
  id?: Maybe<Scalars['UUID']>
  name: Scalars['String']
  vehicleSizeId?: Maybe<Scalars['UUID']>
  address?: Maybe<Scalars['JSON']>
  timezone?: Maybe<Scalars['String']>
  pricePerHour: Scalars['BigFloat']
  status?: Maybe<SlotStatusT>
  photoUrl?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  notes?: Maybe<Scalars['String']>
  slug?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  deleted?: Maybe<Scalars['Boolean']>
  deletedAt?: Maybe<Scalars['Datetime']>
  verificationStatus?: Maybe<SlotVerificationStatus>
  parkingSpaceId?: Maybe<Scalars['UUID']>
  location: Scalars['GeoJSON']
  shape?: Maybe<Scalars['GeoJSON']>
  accessRestrictions?: Maybe<AccessRestrictions>
  businessStatus?: Maybe<SlotBusinessStatus>
  businessStatusReason?: Maybe<Scalars['String']>
  category?: Maybe<SlotCategory>
  contributorId?: Maybe<Scalars['UUID']>
  level?: Maybe<Scalars['Int']>
  mapSource?: Maybe<Scalars['UUID']>
  slotDimensions?: Maybe<Scalars['JSON']>
  tempUnavailable?: Maybe<Scalars['Boolean']>
  tempUnavailableFrom?: Maybe<Scalars['Datetime']>
  tempUnavailableTo?: Maybe<Scalars['Datetime']>
  waypoints?: Maybe<Scalars['JSON']>
  userToOwnerId?: Maybe<SlotOwnerIdFkeyInput>
  vehicleSizeToVehicleSizeId?: Maybe<SlotVehicleSizeIdFkeyInput>
  parkingSpaceToParkingSpaceId?: Maybe<SlotParkingSpaceIdFkeyInput>
  slotAmenitiesUsingId?: Maybe<SlotAmenitySlotIdFkeyInverseInput>
  slotAvailabilitiesUsingId?: Maybe<SlotAvailabilitySlotIdFkeyInverseInput>
  slotBookingsUsingId?: Maybe<FakeApiSlotBookingsForeignKey0InverseInput>
}

/** The globally unique `ID` look up for the row to update. */
export type SlotOnSlotForSlotOwnerIdFkeyNodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `user` to be connected. */
  nodeId: Scalars['ID']
  /** An object where the defined keys will be set on the `user` being updated. */
  patch: UserPatch
}

/** The globally unique `ID` look up for the row to update. */
export type SlotAmenityOnSlotAmenityForSlotAmenitySlotIdFkeyNodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `slot` to be connected. */
  nodeId: Scalars['ID']
  /** An object where the defined keys will be set on the `slot` being updated. */
  patch: SlotPatch
}

/** The `slot` to be created by this mutation. */
export type SlotAmenitySlotIdFkeySlotCreateInput = {
  id?: Maybe<Scalars['UUID']>
  name: Scalars['String']
  ownerId?: Maybe<Scalars['UUID']>
  vehicleSizeId?: Maybe<Scalars['UUID']>
  address?: Maybe<Scalars['JSON']>
  timezone?: Maybe<Scalars['String']>
  pricePerHour: Scalars['BigFloat']
  status?: Maybe<SlotStatusT>
  photoUrl?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  notes?: Maybe<Scalars['String']>
  slug?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  deleted?: Maybe<Scalars['Boolean']>
  deletedAt?: Maybe<Scalars['Datetime']>
  verificationStatus?: Maybe<SlotVerificationStatus>
  parkingSpaceId?: Maybe<Scalars['UUID']>
  location: Scalars['GeoJSON']
  shape?: Maybe<Scalars['GeoJSON']>
  accessRestrictions?: Maybe<AccessRestrictions>
  businessStatus?: Maybe<SlotBusinessStatus>
  businessStatusReason?: Maybe<Scalars['String']>
  category?: Maybe<SlotCategory>
  contributorId?: Maybe<Scalars['UUID']>
  level?: Maybe<Scalars['Int']>
  mapSource?: Maybe<Scalars['UUID']>
  slotDimensions?: Maybe<Scalars['JSON']>
  tempUnavailable?: Maybe<Scalars['Boolean']>
  tempUnavailableFrom?: Maybe<Scalars['Datetime']>
  tempUnavailableTo?: Maybe<Scalars['Datetime']>
  waypoints?: Maybe<Scalars['JSON']>
  userToOwnerId?: Maybe<SlotOwnerIdFkeyInput>
  vehicleSizeToVehicleSizeId?: Maybe<SlotVehicleSizeIdFkeyInput>
  parkingSpaceToParkingSpaceId?: Maybe<SlotParkingSpaceIdFkeyInput>
  slotAmenitiesUsingId?: Maybe<SlotAmenitySlotIdFkeyInverseInput>
  slotAvailabilitiesUsingId?: Maybe<SlotAvailabilitySlotIdFkeyInverseInput>
  slotBookingsUsingId?: Maybe<FakeApiSlotBookingsForeignKey0InverseInput>
}

/** The globally unique `ID` look up for the row to update. */
export type AmenityOnSlotAmenityForSlotAmenityAmenityIdFkeyNodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `slotAmenity` to be connected. */
  nodeId: Scalars['ID']
  /** An object where the defined keys will be set on the `slotAmenity` being updated. */
  patch: SlotAmenityPatch
}

/** The `slotAmenity` to be created by this mutation. */
export type SlotAmenityAmenityIdFkeySlotAmenityCreateInput = {
  id?: Maybe<Scalars['UUID']>
  slotId?: Maybe<Scalars['UUID']>
  slotToSlotId?: Maybe<SlotAmenitySlotIdFkeyInput>
  amenityToAmenityId?: Maybe<SlotAmenityAmenityIdFkeyInput>
}

/** The output of our create `Amenity` mutation. */
export type CreateAmenityPayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `Amenity` that was created by this mutation. */
  amenity?: Maybe<Amenity>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** An edge for our `Amenity`. May be used by Relay 1. */
  amenityEdge?: Maybe<AmenitiesEdge>
}

/** The output of our create `Amenity` mutation. */
export type CreateAmenityPayloadAmenityEdgeArgs = {
  orderBy?: Maybe<Array<AmenitiesOrderBy>>
}

/** All input for the create `Business` mutation. */
export type CreateBusinessInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `Business` to be created by this mutation. */
  business: BusinessInput
}

/** An input for mutations affecting `Business` */
export type BusinessInput = {
  id?: Maybe<Scalars['UUID']>
  ownerId?: Maybe<Scalars['UUID']>
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  photoUrl?: Maybe<Scalars['String']>
  markerUrl?: Maybe<Scalars['String']>
  address?: Maybe<Scalars['JSON']>
  location: Scalars['GeoJSON']
  slug?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  userToOwnerId?: Maybe<BusinessOwnerIdFkeyInput>
}

/** The output of our create `Business` mutation. */
export type CreateBusinessPayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `Business` that was created by this mutation. */
  business?: Maybe<Business>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** Reads a single `User` that is related to this `Business`. */
  owner?: Maybe<User>
  /** An edge for our `Business`. May be used by Relay 1. */
  businessEdge?: Maybe<BusinessesEdge>
}

/** The output of our create `Business` mutation. */
export type CreateBusinessPayloadBusinessEdgeArgs = {
  orderBy?: Maybe<Array<BusinessesOrderBy>>
}

/** All input for the create `Country` mutation. */
export type CreateCountryInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `Country` to be created by this mutation. */
  country: CountryInput
}

/** An input for mutations affecting `Country` */
export type CountryInput = {
  id?: Maybe<Scalars['UUID']>
  code: Scalars['String']
  name: Scalars['String']
  status?: Maybe<StatusT>
}

/** The output of our create `Country` mutation. */
export type CreateCountryPayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `Country` that was created by this mutation. */
  country?: Maybe<Country>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** An edge for our `Country`. May be used by Relay 1. */
  countryEdge?: Maybe<CountriesEdge>
}

/** The output of our create `Country` mutation. */
export type CreateCountryPayloadCountryEdgeArgs = {
  orderBy?: Maybe<Array<CountriesOrderBy>>
}

/** All input for the create `Language` mutation. */
export type CreateLanguageInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `Language` to be created by this mutation. */
  language: LanguageInput
}

/** An input for mutations affecting `Language` */
export type LanguageInput = {
  code: Scalars['String']
  name: Scalars['String']
  weight?: Maybe<Scalars['Int']>
  translationsUsingCode?: Maybe<TranslationLangFkeyInverseInput>
}

/** Input for the nested mutation of `translation` in the `LanguageInput` mutation. */
export type TranslationLangFkeyInverseInput = {
  /** Flag indicating whether all other `translation` records that match this relationship should be removed. */
  deleteOthers?: Maybe<Scalars['Boolean']>
  /** The primary key(s) for `translation` for the far side of the relationship. */
  connectById?: Maybe<Array<TranslationTranslationPkeyConnect>>
  /** The primary key(s) for `translation` for the far side of the relationship. */
  connectByNodeId?: Maybe<Array<TranslationNodeIdConnect>>
  /** The primary key(s) for `translation` for the far side of the relationship. */
  deleteById?: Maybe<Array<TranslationTranslationPkeyDelete>>
  /** The primary key(s) for `translation` for the far side of the relationship. */
  deleteByNodeId?: Maybe<Array<TranslationNodeIdDelete>>
  /** The primary key(s) and patch data for `translation` for the far side of the relationship. */
  updateById?: Maybe<
    Array<TranslationOnTranslationForTranslationLangFkeyUsingTranslationPkeyUpdate>
  >
  /** The primary key(s) and patch data for `translation` for the far side of the relationship. */
  updateByNodeId?: Maybe<Array<LanguageOnTranslationForTranslationLangFkeyNodeIdUpdate>>
  /** A `TranslationInput` object that will be created and connected to this object. */
  create?: Maybe<Array<TranslationLangFkeyTranslationCreateInput>>
}

/** The fields on `translation` to look up the row to connect. */
export type TranslationTranslationPkeyConnect = {
  id: Scalars['UUID']
}

/** The globally unique `ID` look up for the row to connect. */
export type TranslationNodeIdConnect = {
  /** The globally unique `ID` which identifies a single `translation` to be connected. */
  nodeId: Scalars['ID']
}

/** The fields on `translation` to look up the row to delete. */
export type TranslationTranslationPkeyDelete = {
  id: Scalars['UUID']
}

/** The globally unique `ID` look up for the row to delete. */
export type TranslationNodeIdDelete = {
  /** The globally unique `ID` which identifies a single `translation` to be deleted. */
  nodeId: Scalars['ID']
}

/** The fields on `translation` to look up the row to update. */
export type TranslationOnTranslationForTranslationLangFkeyUsingTranslationPkeyUpdate = {
  /** An object where the defined keys will be set on the `translation` being updated. */
  patch: UpdateTranslationOnTranslationForTranslationLangFkeyPatch
  id: Scalars['UUID']
}

/** An object where the defined keys will be set on the `translation` being updated. */
export type UpdateTranslationOnTranslationForTranslationLangFkeyPatch = {
  id?: Maybe<Scalars['UUID']>
  key?: Maybe<Scalars['String']>
  translation?: Maybe<Scalars['String']>
  namespace?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  languageToLang?: Maybe<TranslationLangFkeyInput>
}

/** Input for the nested mutation of `language` in the `TranslationInput` mutation. */
export type TranslationLangFkeyInput = {
  /** The primary key(s) for `language` for the far side of the relationship. */
  connectByCode?: Maybe<LanguageLanguagePkeyConnect>
  /** The primary key(s) for `language` for the far side of the relationship. */
  connectByNodeId?: Maybe<LanguageNodeIdConnect>
  /** The primary key(s) for `language` for the far side of the relationship. */
  deleteByCode?: Maybe<LanguageLanguagePkeyDelete>
  /** The primary key(s) for `language` for the far side of the relationship. */
  deleteByNodeId?: Maybe<LanguageNodeIdDelete>
  /** The primary key(s) and patch data for `language` for the far side of the relationship. */
  updateByCode?: Maybe<LanguageOnTranslationForTranslationLangFkeyUsingLanguagePkeyUpdate>
  /** The primary key(s) and patch data for `language` for the far side of the relationship. */
  updateByNodeId?: Maybe<TranslationOnTranslationForTranslationLangFkeyNodeIdUpdate>
  /** A `LanguageInput` object that will be created and connected to this object. */
  create?: Maybe<TranslationLangFkeyLanguageCreateInput>
}

/** The fields on `language` to look up the row to connect. */
export type LanguageLanguagePkeyConnect = {
  code: Scalars['String']
}

/** The globally unique `ID` look up for the row to connect. */
export type LanguageNodeIdConnect = {
  /** The globally unique `ID` which identifies a single `language` to be connected. */
  nodeId: Scalars['ID']
}

/** The fields on `language` to look up the row to delete. */
export type LanguageLanguagePkeyDelete = {
  code: Scalars['String']
}

/** The globally unique `ID` look up for the row to delete. */
export type LanguageNodeIdDelete = {
  /** The globally unique `ID` which identifies a single `language` to be deleted. */
  nodeId: Scalars['ID']
}

/** The fields on `language` to look up the row to update. */
export type LanguageOnTranslationForTranslationLangFkeyUsingLanguagePkeyUpdate = {
  /** An object where the defined keys will be set on the `language` being updated. */
  patch: UpdateLanguageOnTranslationForTranslationLangFkeyPatch
  code: Scalars['String']
}

/** An object where the defined keys will be set on the `language` being updated. */
export type UpdateLanguageOnTranslationForTranslationLangFkeyPatch = {
  code?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  weight?: Maybe<Scalars['Int']>
  translationsUsingCode?: Maybe<TranslationLangFkeyInverseInput>
}

/** The globally unique `ID` look up for the row to update. */
export type TranslationOnTranslationForTranslationLangFkeyNodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `language` to be connected. */
  nodeId: Scalars['ID']
  /** An object where the defined keys will be set on the `language` being updated. */
  patch: LanguagePatch
}

/** Represents an update to a `Language`. Fields that are set will be updated. */
export type LanguagePatch = {
  code?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  weight?: Maybe<Scalars['Int']>
  translationsUsingCode?: Maybe<TranslationLangFkeyInverseInput>
}

/** The `language` to be created by this mutation. */
export type TranslationLangFkeyLanguageCreateInput = {
  code: Scalars['String']
  name: Scalars['String']
  weight?: Maybe<Scalars['Int']>
  translationsUsingCode?: Maybe<TranslationLangFkeyInverseInput>
}

/** The globally unique `ID` look up for the row to update. */
export type LanguageOnTranslationForTranslationLangFkeyNodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `translation` to be connected. */
  nodeId: Scalars['ID']
  /** An object where the defined keys will be set on the `translation` being updated. */
  patch: TranslationPatch
}

/** Represents an update to a `Translation`. Fields that are set will be updated. */
export type TranslationPatch = {
  id?: Maybe<Scalars['UUID']>
  key?: Maybe<Scalars['String']>
  lang?: Maybe<Scalars['String']>
  translation?: Maybe<Scalars['String']>
  namespace?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  languageToLang?: Maybe<TranslationLangFkeyInput>
}

/** The `translation` to be created by this mutation. */
export type TranslationLangFkeyTranslationCreateInput = {
  id?: Maybe<Scalars['UUID']>
  key: Scalars['String']
  translation: Scalars['String']
  namespace?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  languageToLang?: Maybe<TranslationLangFkeyInput>
}

/** The output of our create `Language` mutation. */
export type CreateLanguagePayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `Language` that was created by this mutation. */
  language?: Maybe<Language>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** An edge for our `Language`. May be used by Relay 1. */
  languageEdge?: Maybe<LanguagesEdge>
}

/** The output of our create `Language` mutation. */
export type CreateLanguagePayloadLanguageEdgeArgs = {
  orderBy?: Maybe<Array<LanguagesOrderBy>>
}

/** All input for the create `ParkingOpenHour` mutation. */
export type CreateParkingOpenHourInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `ParkingOpenHour` to be created by this mutation. */
  parkingOpenHour: ParkingOpenHourInput
}

/** An input for mutations affecting `ParkingOpenHour` */
export type ParkingOpenHourInput = {
  id?: Maybe<Scalars['UUID']>
  parkingSpaceAvailabilityId?: Maybe<Scalars['UUID']>
  dayOfWeek: Scalars['JSON']
  fromTime: Scalars['Time']
  toTime: Scalars['Time']
  price: Scalars['Float']
  currency?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  parkingSpaceAvailabilityToParkingSpaceAvailabilityId?: Maybe<
    ParkingOpenHoursParkingSpaceAvailabilityIdFkeyInput
  >
}

/** The output of our create `ParkingOpenHour` mutation. */
export type CreateParkingOpenHourPayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `ParkingOpenHour` that was created by this mutation. */
  parkingOpenHour?: Maybe<ParkingOpenHour>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** Reads a single `ParkingSpaceAvailability` that is related to this `ParkingOpenHour`. */
  parkingSpaceAvailability?: Maybe<ParkingSpaceAvailability>
  /** An edge for our `ParkingOpenHour`. May be used by Relay 1. */
  parkingOpenHourEdge?: Maybe<ParkingOpenHoursEdge>
}

/** The output of our create `ParkingOpenHour` mutation. */
export type CreateParkingOpenHourPayloadParkingOpenHourEdgeArgs = {
  orderBy?: Maybe<Array<ParkingOpenHoursOrderBy>>
}

/** All input for the create `ParkingSpace` mutation. */
export type CreateParkingSpaceInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `ParkingSpace` to be created by this mutation. */
  parkingSpace: ParkingSpaceInput
}

/** An input for mutations affecting `ParkingSpace` */
export type ParkingSpaceInput = {
  id?: Maybe<Scalars['UUID']>
  ownerId?: Maybe<Scalars['UUID']>
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  photoUrl?: Maybe<Scalars['String']>
  settings?: Maybe<Scalars['JSON']>
  address?: Maybe<Scalars['JSON']>
  location?: Maybe<Scalars['GeoJSON']>
  slug?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  carEntry?: Maybe<Scalars['GeoJSON']>
  carExit?: Maybe<Scalars['GeoJSON']>
  companyEntrance?: Maybe<Scalars['GeoJSON']>
  parkingspaceMapview?: Maybe<Scalars['GeoJSON']>
  brandLogo?: Maybe<Scalars['String']>
  workingHours?: Maybe<Scalars['JSON']>
  advtLink?: Maybe<Scalars['String']>
  bluePrint?: Maybe<Scalars['String']>
  hiddenField?: Maybe<Scalars['String']>
  pedestrianText?: Maybe<Scalars['String']>
  languageCode?: Maybe<Scalars['String']>
  contributorId?: Maybe<Scalars['UUID']>
  floor?: Maybe<Scalars['Int']>
  category?: Maybe<SpaceCategory>
  status?: Maybe<ParkingSpaceStatus>
  verificationStatus?: Maybe<SpaceVerificationStatus>
  accessRestriction?: Maybe<Array<Maybe<SpaceAccessRestriction>>>
  deleted?: Maybe<Scalars['Boolean']>
  deletedAt?: Maybe<Scalars['Datetime']>
  businessStatusReason?: Maybe<Scalars['String']>
  userToOwnerId?: Maybe<ParkingSpaceOwnerIdFkeyInput>
  slotsUsingId?: Maybe<SlotParkingSpaceIdFkeyInverseInput>
  parkingSpaceAvailabilitiesUsingId?: Maybe<ParkingSpaceAvailabilityParkingSpaceIdFkeyInverseInput>
}

/** The output of our create `ParkingSpace` mutation. */
export type CreateParkingSpacePayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `ParkingSpace` that was created by this mutation. */
  parkingSpace?: Maybe<ParkingSpace>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** Reads a single `User` that is related to this `ParkingSpace`. */
  owner?: Maybe<User>
  /** An edge for our `ParkingSpace`. May be used by Relay 1. */
  parkingSpaceEdge?: Maybe<ParkingSpacesEdge>
}

/** The output of our create `ParkingSpace` mutation. */
export type CreateParkingSpacePayloadParkingSpaceEdgeArgs = {
  orderBy?: Maybe<Array<ParkingSpacesOrderBy>>
}

/** All input for the create `ParkingSpaceAvailability` mutation. */
export type CreateParkingSpaceAvailabilityInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `ParkingSpaceAvailability` to be created by this mutation. */
  parkingSpaceAvailability: ParkingSpaceAvailabilityInput
}

/** An input for mutations affecting `ParkingSpaceAvailability` */
export type ParkingSpaceAvailabilityInput = {
  id?: Maybe<Scalars['UUID']>
  parkingSpaceId?: Maybe<Scalars['UUID']>
  fromDate: Scalars['Date']
  toDate: Scalars['Date']
  defaultFlag?: Maybe<Scalars['Boolean']>
  closedFlag?: Maybe<Scalars['Boolean']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  parkingSpaceToParkingSpaceId?: Maybe<ParkingSpaceAvailabilityParkingSpaceIdFkeyInput>
  parkingOpenHoursUsingId?: Maybe<ParkingOpenHoursParkingSpaceAvailabilityIdFkeyInverseInput>
  parkingWorkingHoursUsingId?: Maybe<ParkingWorkingHoursParkingSpaceAvailabilityIdFkeyInverseInput>
}

/** The output of our create `ParkingSpaceAvailability` mutation. */
export type CreateParkingSpaceAvailabilityPayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `ParkingSpaceAvailability` that was created by this mutation. */
  parkingSpaceAvailability?: Maybe<ParkingSpaceAvailability>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** Reads a single `ParkingSpace` that is related to this `ParkingSpaceAvailability`. */
  parkingSpace?: Maybe<ParkingSpace>
  /** An edge for our `ParkingSpaceAvailability`. May be used by Relay 1. */
  parkingSpaceAvailabilityEdge?: Maybe<ParkingSpaceAvailabilitiesEdge>
}

/** The output of our create `ParkingSpaceAvailability` mutation. */
export type CreateParkingSpaceAvailabilityPayloadParkingSpaceAvailabilityEdgeArgs = {
  orderBy?: Maybe<Array<ParkingSpaceAvailabilitiesOrderBy>>
}

/** All input for the create `ParkingWorkingHour` mutation. */
export type CreateParkingWorkingHourInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `ParkingWorkingHour` to be created by this mutation. */
  parkingWorkingHour: ParkingWorkingHourInput
}

/** An input for mutations affecting `ParkingWorkingHour` */
export type ParkingWorkingHourInput = {
  id?: Maybe<Scalars['UUID']>
  parkingSpaceAvailabilityId?: Maybe<Scalars['UUID']>
  dayOfWeek: Scalars['JSON']
  fromTime: Scalars['Time']
  toTime: Scalars['Time']
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  parkingSpaceAvailabilityToParkingSpaceAvailabilityId?: Maybe<
    ParkingWorkingHoursParkingSpaceAvailabilityIdFkeyInput
  >
}

/** The output of our create `ParkingWorkingHour` mutation. */
export type CreateParkingWorkingHourPayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `ParkingWorkingHour` that was created by this mutation. */
  parkingWorkingHour?: Maybe<ParkingWorkingHour>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** Reads a single `ParkingSpaceAvailability` that is related to this `ParkingWorkingHour`. */
  parkingSpaceAvailability?: Maybe<ParkingSpaceAvailability>
  /** An edge for our `ParkingWorkingHour`. May be used by Relay 1. */
  parkingWorkingHourEdge?: Maybe<ParkingWorkingHoursEdge>
}

/** The output of our create `ParkingWorkingHour` mutation. */
export type CreateParkingWorkingHourPayloadParkingWorkingHourEdgeArgs = {
  orderBy?: Maybe<Array<ParkingWorkingHoursOrderBy>>
}

/** All input for the create `PaymentReceipt` mutation. */
export type CreatePaymentReceiptInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `PaymentReceipt` to be created by this mutation. */
  paymentReceipt: PaymentReceiptInput
}

/** An input for mutations affecting `PaymentReceipt` */
export type PaymentReceiptInput = {
  id?: Maybe<Scalars['UUID']>
  ownerId?: Maybe<Scalars['UUID']>
  paymentIntentId: Scalars['String']
  receiptUrl?: Maybe<Scalars['String']>
  amount: Scalars['BigFloat']
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  userToOwnerId?: Maybe<PaymentReceiptOwnerIdFkeyInput>
  slotBookingsUsingId?: Maybe<FakeApiSlotBookingsForeignKey2InverseInput>
}

/** The output of our create `PaymentReceipt` mutation. */
export type CreatePaymentReceiptPayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `PaymentReceipt` that was created by this mutation. */
  paymentReceipt?: Maybe<PaymentReceipt>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** Reads a single `User` that is related to this `PaymentReceipt`. */
  owner?: Maybe<User>
  /** An edge for our `PaymentReceipt`. May be used by Relay 1. */
  paymentReceiptEdge?: Maybe<PaymentReceiptsEdge>
}

/** The output of our create `PaymentReceipt` mutation. */
export type CreatePaymentReceiptPayloadPaymentReceiptEdgeArgs = {
  orderBy?: Maybe<Array<PaymentReceiptsOrderBy>>
}

/** All input for the create `Slot` mutation. */
export type CreateSlotInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `Slot` to be created by this mutation. */
  slot: SlotInput
}

/** An input for mutations affecting `Slot` */
export type SlotInput = {
  id?: Maybe<Scalars['UUID']>
  name: Scalars['String']
  ownerId?: Maybe<Scalars['UUID']>
  vehicleSizeId?: Maybe<Scalars['UUID']>
  address?: Maybe<Scalars['JSON']>
  timezone?: Maybe<Scalars['String']>
  pricePerHour: Scalars['BigFloat']
  status?: Maybe<SlotStatusT>
  photoUrl?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  notes?: Maybe<Scalars['String']>
  slug?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  deleted?: Maybe<Scalars['Boolean']>
  deletedAt?: Maybe<Scalars['Datetime']>
  verificationStatus?: Maybe<SlotVerificationStatus>
  parkingSpaceId?: Maybe<Scalars['UUID']>
  location: Scalars['GeoJSON']
  shape?: Maybe<Scalars['GeoJSON']>
  accessRestrictions?: Maybe<AccessRestrictions>
  businessStatus?: Maybe<SlotBusinessStatus>
  businessStatusReason?: Maybe<Scalars['String']>
  category?: Maybe<SlotCategory>
  contributorId?: Maybe<Scalars['UUID']>
  level?: Maybe<Scalars['Int']>
  mapSource?: Maybe<Scalars['UUID']>
  slotDimensions?: Maybe<Scalars['JSON']>
  tempUnavailable?: Maybe<Scalars['Boolean']>
  tempUnavailableFrom?: Maybe<Scalars['Datetime']>
  tempUnavailableTo?: Maybe<Scalars['Datetime']>
  waypoints?: Maybe<Scalars['JSON']>
  userToOwnerId?: Maybe<SlotOwnerIdFkeyInput>
  vehicleSizeToVehicleSizeId?: Maybe<SlotVehicleSizeIdFkeyInput>
  parkingSpaceToParkingSpaceId?: Maybe<SlotParkingSpaceIdFkeyInput>
  slotAmenitiesUsingId?: Maybe<SlotAmenitySlotIdFkeyInverseInput>
  slotAvailabilitiesUsingId?: Maybe<SlotAvailabilitySlotIdFkeyInverseInput>
  slotBookingsUsingId?: Maybe<FakeApiSlotBookingsForeignKey0InverseInput>
}

/** The output of our create `Slot` mutation. */
export type CreateSlotPayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `Slot` that was created by this mutation. */
  slot?: Maybe<Slot>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** Reads a single `User` that is related to this `Slot`. */
  owner?: Maybe<User>
  /** Reads a single `VehicleSize` that is related to this `Slot`. */
  vehicleSize?: Maybe<VehicleSize>
  /** Reads a single `ParkingSpace` that is related to this `Slot`. */
  parkingSpace?: Maybe<ParkingSpace>
  /** An edge for our `Slot`. May be used by Relay 1. */
  slotEdge?: Maybe<SlotsEdge>
}

/** The output of our create `Slot` mutation. */
export type CreateSlotPayloadSlotEdgeArgs = {
  orderBy?: Maybe<Array<SlotsOrderBy>>
}

/** All input for the create `SlotAmenity` mutation. */
export type CreateSlotAmenityInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `SlotAmenity` to be created by this mutation. */
  slotAmenity: SlotAmenityInput
}

/** An input for mutations affecting `SlotAmenity` */
export type SlotAmenityInput = {
  id?: Maybe<Scalars['UUID']>
  slotId?: Maybe<Scalars['UUID']>
  amenityId?: Maybe<Scalars['UUID']>
  slotToSlotId?: Maybe<SlotAmenitySlotIdFkeyInput>
  amenityToAmenityId?: Maybe<SlotAmenityAmenityIdFkeyInput>
}

/** The output of our create `SlotAmenity` mutation. */
export type CreateSlotAmenityPayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `SlotAmenity` that was created by this mutation. */
  slotAmenity?: Maybe<SlotAmenity>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** Reads a single `Slot` that is related to this `SlotAmenity`. */
  slot?: Maybe<Slot>
  /** Reads a single `Amenity` that is related to this `SlotAmenity`. */
  amenity?: Maybe<Amenity>
  /** An edge for our `SlotAmenity`. May be used by Relay 1. */
  slotAmenityEdge?: Maybe<SlotAmenitiesEdge>
}

/** The output of our create `SlotAmenity` mutation. */
export type CreateSlotAmenityPayloadSlotAmenityEdgeArgs = {
  orderBy?: Maybe<Array<SlotAmenitiesOrderBy>>
}

/** All input for the create `SlotAvailability` mutation. */
export type CreateSlotAvailabilityInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `SlotAvailability` to be created by this mutation. */
  slotAvailability: SlotAvailabilityInput
}

/** An input for mutations affecting `SlotAvailability` */
export type SlotAvailabilityInput = {
  id?: Maybe<Scalars['UUID']>
  slotId?: Maybe<Scalars['UUID']>
  dayOfWeek: Scalars['Int']
  startHour: Scalars['Time']
  endHour: Scalars['Time']
  createdAt?: Maybe<Scalars['Datetime']>
  tariffPerHour?: Maybe<Scalars['BigFloat']>
  cancelCharge?: Maybe<Scalars['BigFloat']>
  tariffCurrency?: Maybe<Scalars['UUID']>
  slotToSlotId?: Maybe<SlotAvailabilitySlotIdFkeyInput>
}

/** The output of our create `SlotAvailability` mutation. */
export type CreateSlotAvailabilityPayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `SlotAvailability` that was created by this mutation. */
  slotAvailability?: Maybe<SlotAvailability>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** Reads a single `Slot` that is related to this `SlotAvailability`. */
  slot?: Maybe<Slot>
  /** An edge for our `SlotAvailability`. May be used by Relay 1. */
  slotAvailabilityEdge?: Maybe<SlotAvailabilitiesEdge>
}

/** The output of our create `SlotAvailability` mutation. */
export type CreateSlotAvailabilityPayloadSlotAvailabilityEdgeArgs = {
  orderBy?: Maybe<Array<SlotAvailabilitiesOrderBy>>
}

/** All input for the create `Translation` mutation. */
export type CreateTranslationInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `Translation` to be created by this mutation. */
  translation: TranslationInput
}

/** An input for mutations affecting `Translation` */
export type TranslationInput = {
  id?: Maybe<Scalars['UUID']>
  key: Scalars['String']
  lang?: Maybe<Scalars['String']>
  translation: Scalars['String']
  namespace?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  languageToLang?: Maybe<TranslationLangFkeyInput>
}

/** The output of our create `Translation` mutation. */
export type CreateTranslationPayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `Translation` that was created by this mutation. */
  translation?: Maybe<Translation>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** Reads a single `Language` that is related to this `Translation`. */
  languageByLang?: Maybe<Language>
  /** An edge for our `Translation`. May be used by Relay 1. */
  translationEdge?: Maybe<TranslationsEdge>
}

/** The output of our create `Translation` mutation. */
export type CreateTranslationPayloadTranslationEdgeArgs = {
  orderBy?: Maybe<Array<TranslationsOrderBy>>
}

/** All input for the create `Vehicle` mutation. */
export type CreateVehicleInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `Vehicle` to be created by this mutation. */
  vehicle: VehicleInput
}

/** An input for mutations affecting `Vehicle` */
export type VehicleInput = {
  id?: Maybe<Scalars['UUID']>
  ownerId?: Maybe<Scalars['UUID']>
  name: Scalars['String']
  licensePlate?: Maybe<Scalars['String']>
  vehicleTypeId?: Maybe<Scalars['UUID']>
  vehicleSizeId?: Maybe<Scalars['UUID']>
  status?: Maybe<StatusT>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  userToOwnerId?: Maybe<VehicleOwnerIdFkeyInput>
  vehicleTypeToVehicleTypeId?: Maybe<VehicleVehicleTypeIdFkeyInput>
  vehicleSizeToVehicleSizeId?: Maybe<VehicleVehicleSizeIdFkeyInput>
}

/** The output of our create `Vehicle` mutation. */
export type CreateVehiclePayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `Vehicle` that was created by this mutation. */
  vehicle?: Maybe<Vehicle>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** Reads a single `User` that is related to this `Vehicle`. */
  owner?: Maybe<User>
  /** Reads a single `VehicleType` that is related to this `Vehicle`. */
  vehicleType?: Maybe<VehicleType>
  /** Reads a single `VehicleSize` that is related to this `Vehicle`. */
  vehicleSize?: Maybe<VehicleSize>
  /** An edge for our `Vehicle`. May be used by Relay 1. */
  vehicleEdge?: Maybe<VehiclesEdge>
}

/** The output of our create `Vehicle` mutation. */
export type CreateVehiclePayloadVehicleEdgeArgs = {
  orderBy?: Maybe<Array<VehiclesOrderBy>>
}

/** All input for the create `VehicleSize` mutation. */
export type CreateVehicleSizeInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `VehicleSize` to be created by this mutation. */
  vehicleSize: VehicleSizeInput
}

/** An input for mutations affecting `VehicleSize` */
export type VehicleSizeInput = {
  id?: Maybe<Scalars['UUID']>
  status?: Maybe<ContentStatusT>
  name?: Maybe<Scalars['String']>
  weight?: Maybe<Scalars['Int']>
  description?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['Datetime']>
  updatedAt?: Maybe<Scalars['Datetime']>
  slotsUsingId?: Maybe<SlotVehicleSizeIdFkeyInverseInput>
  vehiclesUsingId?: Maybe<VehicleVehicleSizeIdFkeyInverseInput>
}

/** The output of our create `VehicleSize` mutation. */
export type CreateVehicleSizePayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `VehicleSize` that was created by this mutation. */
  vehicleSize?: Maybe<VehicleSize>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** An edge for our `VehicleSize`. May be used by Relay 1. */
  vehicleSizeEdge?: Maybe<VehicleSizesEdge>
}

/** The output of our create `VehicleSize` mutation. */
export type CreateVehicleSizePayloadVehicleSizeEdgeArgs = {
  orderBy?: Maybe<Array<VehicleSizesOrderBy>>
}

/** All input for the create `VehicleType` mutation. */
export type CreateVehicleTypeInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `VehicleType` to be created by this mutation. */
  vehicleType: VehicleTypeInput
}

/** An input for mutations affecting `VehicleType` */
export type VehicleTypeInput = {
  id?: Maybe<Scalars['UUID']>
  name: Scalars['String']
  weight?: Maybe<Scalars['Int']>
  vehiclesUsingId?: Maybe<VehicleVehicleTypeIdFkeyInverseInput>
}

/** The output of our create `VehicleType` mutation. */
export type CreateVehicleTypePayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `VehicleType` that was created by this mutation. */
  vehicleType?: Maybe<VehicleType>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** An edge for our `VehicleType`. May be used by Relay 1. */
  vehicleTypeEdge?: Maybe<VehicleTypesEdge>
}

/** The output of our create `VehicleType` mutation. */
export type CreateVehicleTypePayloadVehicleTypeEdgeArgs = {
  orderBy?: Maybe<Array<VehicleTypesOrderBy>>
}

/** All input for the `updateAmenityByNodeId` mutation. */
export type UpdateAmenityByNodeIdInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The globally unique `ID` which will identify a single `Amenity` to be updated. */
  nodeId: Scalars['ID']
  /** An object where the defined keys will be set on the `Amenity` being updated. */
  patch: AmenityPatch
}

/** The output of our update `Amenity` mutation. */
export type UpdateAmenityPayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `Amenity` that was updated by this mutation. */
  amenity?: Maybe<Amenity>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** An edge for our `Amenity`. May be used by Relay 1. */
  amenityEdge?: Maybe<AmenitiesEdge>
}

/** The output of our update `Amenity` mutation. */
export type UpdateAmenityPayloadAmenityEdgeArgs = {
  orderBy?: Maybe<Array<AmenitiesOrderBy>>
}

/** All input for the `updateAmenity` mutation. */
export type UpdateAmenityInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** An object where the defined keys will be set on the `Amenity` being updated. */
  patch: AmenityPatch
  id: Scalars['UUID']
}

/** All input for the `updateBillingProfileByNodeId` mutation. */
export type UpdateBillingProfileByNodeIdInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The globally unique `ID` which will identify a single `BillingProfile` to be updated. */
  nodeId: Scalars['ID']
  /** An object where the defined keys will be set on the `BillingProfile` being updated. */
  patch: BillingProfilePatch
}

/** The output of our update `BillingProfile` mutation. */
export type UpdateBillingProfilePayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `BillingProfile` that was updated by this mutation. */
  billingProfile?: Maybe<BillingProfile>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** Reads a single `User` that is related to this `BillingProfile`. */
  user?: Maybe<User>
  /** An edge for our `BillingProfile`. May be used by Relay 1. */
  billingProfileEdge?: Maybe<BillingProfilesEdge>
}

/** The output of our update `BillingProfile` mutation. */
export type UpdateBillingProfilePayloadBillingProfileEdgeArgs = {
  orderBy?: Maybe<Array<BillingProfilesOrderBy>>
}

/** All input for the `updateBillingProfile` mutation. */
export type UpdateBillingProfileInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** An object where the defined keys will be set on the `BillingProfile` being updated. */
  patch: BillingProfilePatch
  id: Scalars['UUID']
}

/** All input for the `updateBusinessByNodeId` mutation. */
export type UpdateBusinessByNodeIdInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The globally unique `ID` which will identify a single `Business` to be updated. */
  nodeId: Scalars['ID']
  /** An object where the defined keys will be set on the `Business` being updated. */
  patch: BusinessPatch
}

/** The output of our update `Business` mutation. */
export type UpdateBusinessPayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `Business` that was updated by this mutation. */
  business?: Maybe<Business>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** Reads a single `User` that is related to this `Business`. */
  owner?: Maybe<User>
  /** An edge for our `Business`. May be used by Relay 1. */
  businessEdge?: Maybe<BusinessesEdge>
}

/** The output of our update `Business` mutation. */
export type UpdateBusinessPayloadBusinessEdgeArgs = {
  orderBy?: Maybe<Array<BusinessesOrderBy>>
}

/** All input for the `updateBusiness` mutation. */
export type UpdateBusinessInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** An object where the defined keys will be set on the `Business` being updated. */
  patch: BusinessPatch
  id: Scalars['UUID']
}

/** All input for the `updateBusinessBySlug` mutation. */
export type UpdateBusinessBySlugInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** An object where the defined keys will be set on the `Business` being updated. */
  patch: BusinessPatch
  slug: Scalars['String']
}

/** All input for the `updateCountryByNodeId` mutation. */
export type UpdateCountryByNodeIdInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The globally unique `ID` which will identify a single `Country` to be updated. */
  nodeId: Scalars['ID']
  /** An object where the defined keys will be set on the `Country` being updated. */
  patch: CountryPatch
}

/** Represents an update to a `Country`. Fields that are set will be updated. */
export type CountryPatch = {
  id?: Maybe<Scalars['UUID']>
  code?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  status?: Maybe<StatusT>
}

/** The output of our update `Country` mutation. */
export type UpdateCountryPayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `Country` that was updated by this mutation. */
  country?: Maybe<Country>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** An edge for our `Country`. May be used by Relay 1. */
  countryEdge?: Maybe<CountriesEdge>
}

/** The output of our update `Country` mutation. */
export type UpdateCountryPayloadCountryEdgeArgs = {
  orderBy?: Maybe<Array<CountriesOrderBy>>
}

/** All input for the `updateCountry` mutation. */
export type UpdateCountryInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** An object where the defined keys will be set on the `Country` being updated. */
  patch: CountryPatch
  id: Scalars['UUID']
}

/** All input for the `updateCountryByCode` mutation. */
export type UpdateCountryByCodeInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** An object where the defined keys will be set on the `Country` being updated. */
  patch: CountryPatch
  code: Scalars['String']
}

/** All input for the `updateCountryByName` mutation. */
export type UpdateCountryByNameInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** An object where the defined keys will be set on the `Country` being updated. */
  patch: CountryPatch
  name: Scalars['String']
}

/** All input for the `updateLanguageByNodeId` mutation. */
export type UpdateLanguageByNodeIdInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The globally unique `ID` which will identify a single `Language` to be updated. */
  nodeId: Scalars['ID']
  /** An object where the defined keys will be set on the `Language` being updated. */
  patch: LanguagePatch
}

/** The output of our update `Language` mutation. */
export type UpdateLanguagePayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `Language` that was updated by this mutation. */
  language?: Maybe<Language>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** An edge for our `Language`. May be used by Relay 1. */
  languageEdge?: Maybe<LanguagesEdge>
}

/** The output of our update `Language` mutation. */
export type UpdateLanguagePayloadLanguageEdgeArgs = {
  orderBy?: Maybe<Array<LanguagesOrderBy>>
}

/** All input for the `updateLanguage` mutation. */
export type UpdateLanguageInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** An object where the defined keys will be set on the `Language` being updated. */
  patch: LanguagePatch
  code: Scalars['String']
}

/** All input for the `updateParkingOpenHourByNodeId` mutation. */
export type UpdateParkingOpenHourByNodeIdInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The globally unique `ID` which will identify a single `ParkingOpenHour` to be updated. */
  nodeId: Scalars['ID']
  /** An object where the defined keys will be set on the `ParkingOpenHour` being updated. */
  patch: ParkingOpenHourPatch
}

/** The output of our update `ParkingOpenHour` mutation. */
export type UpdateParkingOpenHourPayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `ParkingOpenHour` that was updated by this mutation. */
  parkingOpenHour?: Maybe<ParkingOpenHour>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** Reads a single `ParkingSpaceAvailability` that is related to this `ParkingOpenHour`. */
  parkingSpaceAvailability?: Maybe<ParkingSpaceAvailability>
  /** An edge for our `ParkingOpenHour`. May be used by Relay 1. */
  parkingOpenHourEdge?: Maybe<ParkingOpenHoursEdge>
}

/** The output of our update `ParkingOpenHour` mutation. */
export type UpdateParkingOpenHourPayloadParkingOpenHourEdgeArgs = {
  orderBy?: Maybe<Array<ParkingOpenHoursOrderBy>>
}

/** All input for the `updateParkingOpenHour` mutation. */
export type UpdateParkingOpenHourInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** An object where the defined keys will be set on the `ParkingOpenHour` being updated. */
  patch: ParkingOpenHourPatch
  id: Scalars['UUID']
}

/** All input for the `updateParkingSpaceByNodeId` mutation. */
export type UpdateParkingSpaceByNodeIdInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The globally unique `ID` which will identify a single `ParkingSpace` to be updated. */
  nodeId: Scalars['ID']
  /** An object where the defined keys will be set on the `ParkingSpace` being updated. */
  patch: ParkingSpacePatch
}

/** The output of our update `ParkingSpace` mutation. */
export type UpdateParkingSpacePayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `ParkingSpace` that was updated by this mutation. */
  parkingSpace?: Maybe<ParkingSpace>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** Reads a single `User` that is related to this `ParkingSpace`. */
  owner?: Maybe<User>
  /** An edge for our `ParkingSpace`. May be used by Relay 1. */
  parkingSpaceEdge?: Maybe<ParkingSpacesEdge>
}

/** The output of our update `ParkingSpace` mutation. */
export type UpdateParkingSpacePayloadParkingSpaceEdgeArgs = {
  orderBy?: Maybe<Array<ParkingSpacesOrderBy>>
}

/** All input for the `updateParkingSpace` mutation. */
export type UpdateParkingSpaceInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** An object where the defined keys will be set on the `ParkingSpace` being updated. */
  patch: ParkingSpacePatch
  id: Scalars['UUID']
}

/** All input for the `updateParkingSpaceBySlug` mutation. */
export type UpdateParkingSpaceBySlugInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** An object where the defined keys will be set on the `ParkingSpace` being updated. */
  patch: ParkingSpacePatch
  slug: Scalars['String']
}

/** All input for the `updateParkingSpaceAvailabilityByNodeId` mutation. */
export type UpdateParkingSpaceAvailabilityByNodeIdInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The globally unique `ID` which will identify a single `ParkingSpaceAvailability` to be updated. */
  nodeId: Scalars['ID']
  /** An object where the defined keys will be set on the `ParkingSpaceAvailability` being updated. */
  patch: ParkingSpaceAvailabilityPatch
}

/** The output of our update `ParkingSpaceAvailability` mutation. */
export type UpdateParkingSpaceAvailabilityPayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `ParkingSpaceAvailability` that was updated by this mutation. */
  parkingSpaceAvailability?: Maybe<ParkingSpaceAvailability>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** Reads a single `ParkingSpace` that is related to this `ParkingSpaceAvailability`. */
  parkingSpace?: Maybe<ParkingSpace>
  /** An edge for our `ParkingSpaceAvailability`. May be used by Relay 1. */
  parkingSpaceAvailabilityEdge?: Maybe<ParkingSpaceAvailabilitiesEdge>
}

/** The output of our update `ParkingSpaceAvailability` mutation. */
export type UpdateParkingSpaceAvailabilityPayloadParkingSpaceAvailabilityEdgeArgs = {
  orderBy?: Maybe<Array<ParkingSpaceAvailabilitiesOrderBy>>
}

/** All input for the `updateParkingSpaceAvailability` mutation. */
export type UpdateParkingSpaceAvailabilityInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** An object where the defined keys will be set on the `ParkingSpaceAvailability` being updated. */
  patch: ParkingSpaceAvailabilityPatch
  id: Scalars['UUID']
}

/** All input for the `updateParkingWorkingHourByNodeId` mutation. */
export type UpdateParkingWorkingHourByNodeIdInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The globally unique `ID` which will identify a single `ParkingWorkingHour` to be updated. */
  nodeId: Scalars['ID']
  /** An object where the defined keys will be set on the `ParkingWorkingHour` being updated. */
  patch: ParkingWorkingHourPatch
}

/** The output of our update `ParkingWorkingHour` mutation. */
export type UpdateParkingWorkingHourPayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `ParkingWorkingHour` that was updated by this mutation. */
  parkingWorkingHour?: Maybe<ParkingWorkingHour>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** Reads a single `ParkingSpaceAvailability` that is related to this `ParkingWorkingHour`. */
  parkingSpaceAvailability?: Maybe<ParkingSpaceAvailability>
  /** An edge for our `ParkingWorkingHour`. May be used by Relay 1. */
  parkingWorkingHourEdge?: Maybe<ParkingWorkingHoursEdge>
}

/** The output of our update `ParkingWorkingHour` mutation. */
export type UpdateParkingWorkingHourPayloadParkingWorkingHourEdgeArgs = {
  orderBy?: Maybe<Array<ParkingWorkingHoursOrderBy>>
}

/** All input for the `updateParkingWorkingHour` mutation. */
export type UpdateParkingWorkingHourInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** An object where the defined keys will be set on the `ParkingWorkingHour` being updated. */
  patch: ParkingWorkingHourPatch
  id: Scalars['UUID']
}

/** All input for the `updateSlotByNodeId` mutation. */
export type UpdateSlotByNodeIdInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The globally unique `ID` which will identify a single `Slot` to be updated. */
  nodeId: Scalars['ID']
  /** An object where the defined keys will be set on the `Slot` being updated. */
  patch: SlotPatch
}

/** The output of our update `Slot` mutation. */
export type UpdateSlotPayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `Slot` that was updated by this mutation. */
  slot?: Maybe<Slot>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** Reads a single `User` that is related to this `Slot`. */
  owner?: Maybe<User>
  /** Reads a single `VehicleSize` that is related to this `Slot`. */
  vehicleSize?: Maybe<VehicleSize>
  /** Reads a single `ParkingSpace` that is related to this `Slot`. */
  parkingSpace?: Maybe<ParkingSpace>
  /** An edge for our `Slot`. May be used by Relay 1. */
  slotEdge?: Maybe<SlotsEdge>
}

/** The output of our update `Slot` mutation. */
export type UpdateSlotPayloadSlotEdgeArgs = {
  orderBy?: Maybe<Array<SlotsOrderBy>>
}

/** All input for the `updateSlot` mutation. */
export type UpdateSlotInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** An object where the defined keys will be set on the `Slot` being updated. */
  patch: SlotPatch
  id: Scalars['UUID']
}

/** All input for the `updateSlotAvailabilityByNodeId` mutation. */
export type UpdateSlotAvailabilityByNodeIdInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The globally unique `ID` which will identify a single `SlotAvailability` to be updated. */
  nodeId: Scalars['ID']
  /** An object where the defined keys will be set on the `SlotAvailability` being updated. */
  patch: SlotAvailabilityPatch
}

/** The output of our update `SlotAvailability` mutation. */
export type UpdateSlotAvailabilityPayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `SlotAvailability` that was updated by this mutation. */
  slotAvailability?: Maybe<SlotAvailability>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** Reads a single `Slot` that is related to this `SlotAvailability`. */
  slot?: Maybe<Slot>
  /** An edge for our `SlotAvailability`. May be used by Relay 1. */
  slotAvailabilityEdge?: Maybe<SlotAvailabilitiesEdge>
}

/** The output of our update `SlotAvailability` mutation. */
export type UpdateSlotAvailabilityPayloadSlotAvailabilityEdgeArgs = {
  orderBy?: Maybe<Array<SlotAvailabilitiesOrderBy>>
}

/** All input for the `updateSlotAvailability` mutation. */
export type UpdateSlotAvailabilityInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** An object where the defined keys will be set on the `SlotAvailability` being updated. */
  patch: SlotAvailabilityPatch
  id: Scalars['UUID']
}

/** All input for the `updateSlotBookingByNodeId` mutation. */
export type UpdateSlotBookingByNodeIdInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The globally unique `ID` which will identify a single `SlotBooking` to be updated. */
  nodeId: Scalars['ID']
  /** An object where the defined keys will be set on the `SlotBooking` being updated. */
  patch: SlotBookingPatch
}

/** The output of our update `SlotBooking` mutation. */
export type UpdateSlotBookingPayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `SlotBooking` that was updated by this mutation. */
  slotBooking?: Maybe<SlotBooking>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** Reads a single `Slot` that is related to this `SlotBooking`. */
  slot?: Maybe<Slot>
  /** Reads a single `User` that is related to this `SlotBooking`. */
  user?: Maybe<User>
  /** Reads a single `PaymentReceipt` that is related to this `SlotBooking`. */
  paymentReceipt?: Maybe<PaymentReceipt>
  /** An edge for our `SlotBooking`. May be used by Relay 1. */
  slotBookingEdge?: Maybe<SlotBookingsEdge>
}

/** The output of our update `SlotBooking` mutation. */
export type UpdateSlotBookingPayloadSlotBookingEdgeArgs = {
  orderBy?: Maybe<Array<SlotBookingsOrderBy>>
}

/** All input for the `updateSlotBooking` mutation. */
export type UpdateSlotBookingInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** An object where the defined keys will be set on the `SlotBooking` being updated. */
  patch: SlotBookingPatch
  id: Scalars['UUID']
}

/** All input for the `updateTranslationByNodeId` mutation. */
export type UpdateTranslationByNodeIdInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The globally unique `ID` which will identify a single `Translation` to be updated. */
  nodeId: Scalars['ID']
  /** An object where the defined keys will be set on the `Translation` being updated. */
  patch: TranslationPatch
}

/** The output of our update `Translation` mutation. */
export type UpdateTranslationPayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `Translation` that was updated by this mutation. */
  translation?: Maybe<Translation>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** Reads a single `Language` that is related to this `Translation`. */
  languageByLang?: Maybe<Language>
  /** An edge for our `Translation`. May be used by Relay 1. */
  translationEdge?: Maybe<TranslationsEdge>
}

/** The output of our update `Translation` mutation. */
export type UpdateTranslationPayloadTranslationEdgeArgs = {
  orderBy?: Maybe<Array<TranslationsOrderBy>>
}

/** All input for the `updateTranslation` mutation. */
export type UpdateTranslationInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** An object where the defined keys will be set on the `Translation` being updated. */
  patch: TranslationPatch
  id: Scalars['UUID']
}

/** All input for the `updateVehicleByNodeId` mutation. */
export type UpdateVehicleByNodeIdInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The globally unique `ID` which will identify a single `Vehicle` to be updated. */
  nodeId: Scalars['ID']
  /** An object where the defined keys will be set on the `Vehicle` being updated. */
  patch: VehiclePatch
}

/** The output of our update `Vehicle` mutation. */
export type UpdateVehiclePayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `Vehicle` that was updated by this mutation. */
  vehicle?: Maybe<Vehicle>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** Reads a single `User` that is related to this `Vehicle`. */
  owner?: Maybe<User>
  /** Reads a single `VehicleType` that is related to this `Vehicle`. */
  vehicleType?: Maybe<VehicleType>
  /** Reads a single `VehicleSize` that is related to this `Vehicle`. */
  vehicleSize?: Maybe<VehicleSize>
  /** An edge for our `Vehicle`. May be used by Relay 1. */
  vehicleEdge?: Maybe<VehiclesEdge>
}

/** The output of our update `Vehicle` mutation. */
export type UpdateVehiclePayloadVehicleEdgeArgs = {
  orderBy?: Maybe<Array<VehiclesOrderBy>>
}

/** All input for the `updateVehicle` mutation. */
export type UpdateVehicleInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** An object where the defined keys will be set on the `Vehicle` being updated. */
  patch: VehiclePatch
  id: Scalars['UUID']
}

/** All input for the `updateVehicleSizeByNodeId` mutation. */
export type UpdateVehicleSizeByNodeIdInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The globally unique `ID` which will identify a single `VehicleSize` to be updated. */
  nodeId: Scalars['ID']
  /** An object where the defined keys will be set on the `VehicleSize` being updated. */
  patch: VehicleSizePatch
}

/** The output of our update `VehicleSize` mutation. */
export type UpdateVehicleSizePayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `VehicleSize` that was updated by this mutation. */
  vehicleSize?: Maybe<VehicleSize>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** An edge for our `VehicleSize`. May be used by Relay 1. */
  vehicleSizeEdge?: Maybe<VehicleSizesEdge>
}

/** The output of our update `VehicleSize` mutation. */
export type UpdateVehicleSizePayloadVehicleSizeEdgeArgs = {
  orderBy?: Maybe<Array<VehicleSizesOrderBy>>
}

/** All input for the `updateVehicleSize` mutation. */
export type UpdateVehicleSizeInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** An object where the defined keys will be set on the `VehicleSize` being updated. */
  patch: VehicleSizePatch
  id: Scalars['UUID']
}

/** All input for the `updateVehicleTypeByNodeId` mutation. */
export type UpdateVehicleTypeByNodeIdInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The globally unique `ID` which will identify a single `VehicleType` to be updated. */
  nodeId: Scalars['ID']
  /** An object where the defined keys will be set on the `VehicleType` being updated. */
  patch: VehicleTypePatch
}

/** The output of our update `VehicleType` mutation. */
export type UpdateVehicleTypePayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `VehicleType` that was updated by this mutation. */
  vehicleType?: Maybe<VehicleType>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** An edge for our `VehicleType`. May be used by Relay 1. */
  vehicleTypeEdge?: Maybe<VehicleTypesEdge>
}

/** The output of our update `VehicleType` mutation. */
export type UpdateVehicleTypePayloadVehicleTypeEdgeArgs = {
  orderBy?: Maybe<Array<VehicleTypesOrderBy>>
}

/** All input for the `updateVehicleType` mutation. */
export type UpdateVehicleTypeInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** An object where the defined keys will be set on the `VehicleType` being updated. */
  patch: VehicleTypePatch
  id: Scalars['UUID']
}

/** All input for the `updateVehicleTypeByName` mutation. */
export type UpdateVehicleTypeByNameInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** An object where the defined keys will be set on the `VehicleType` being updated. */
  patch: VehicleTypePatch
  name: Scalars['String']
}

/** All input for the `deleteAmenityByNodeId` mutation. */
export type DeleteAmenityByNodeIdInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The globally unique `ID` which will identify a single `Amenity` to be deleted. */
  nodeId: Scalars['ID']
}

/** The output of our delete `Amenity` mutation. */
export type DeleteAmenityPayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `Amenity` that was deleted by this mutation. */
  amenity?: Maybe<Amenity>
  deletedAmenityNodeId?: Maybe<Scalars['ID']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** An edge for our `Amenity`. May be used by Relay 1. */
  amenityEdge?: Maybe<AmenitiesEdge>
}

/** The output of our delete `Amenity` mutation. */
export type DeleteAmenityPayloadAmenityEdgeArgs = {
  orderBy?: Maybe<Array<AmenitiesOrderBy>>
}

/** All input for the `deleteAmenity` mutation. */
export type DeleteAmenityInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  id: Scalars['UUID']
}

/** All input for the `deleteBillingProfileByNodeId` mutation. */
export type DeleteBillingProfileByNodeIdInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The globally unique `ID` which will identify a single `BillingProfile` to be deleted. */
  nodeId: Scalars['ID']
}

/** The output of our delete `BillingProfile` mutation. */
export type DeleteBillingProfilePayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `BillingProfile` that was deleted by this mutation. */
  billingProfile?: Maybe<BillingProfile>
  deletedBillingProfileNodeId?: Maybe<Scalars['ID']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** Reads a single `User` that is related to this `BillingProfile`. */
  user?: Maybe<User>
  /** An edge for our `BillingProfile`. May be used by Relay 1. */
  billingProfileEdge?: Maybe<BillingProfilesEdge>
}

/** The output of our delete `BillingProfile` mutation. */
export type DeleteBillingProfilePayloadBillingProfileEdgeArgs = {
  orderBy?: Maybe<Array<BillingProfilesOrderBy>>
}

/** All input for the `deleteBillingProfile` mutation. */
export type DeleteBillingProfileInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  id: Scalars['UUID']
}

/** All input for the `deleteBusinessByNodeId` mutation. */
export type DeleteBusinessByNodeIdInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The globally unique `ID` which will identify a single `Business` to be deleted. */
  nodeId: Scalars['ID']
}

/** The output of our delete `Business` mutation. */
export type DeleteBusinessPayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `Business` that was deleted by this mutation. */
  business?: Maybe<Business>
  deletedBusinessNodeId?: Maybe<Scalars['ID']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** Reads a single `User` that is related to this `Business`. */
  owner?: Maybe<User>
  /** An edge for our `Business`. May be used by Relay 1. */
  businessEdge?: Maybe<BusinessesEdge>
}

/** The output of our delete `Business` mutation. */
export type DeleteBusinessPayloadBusinessEdgeArgs = {
  orderBy?: Maybe<Array<BusinessesOrderBy>>
}

/** All input for the `deleteBusiness` mutation. */
export type DeleteBusinessInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  id: Scalars['UUID']
}

/** All input for the `deleteBusinessBySlug` mutation. */
export type DeleteBusinessBySlugInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  slug: Scalars['String']
}

/** All input for the `deleteCountryByNodeId` mutation. */
export type DeleteCountryByNodeIdInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The globally unique `ID` which will identify a single `Country` to be deleted. */
  nodeId: Scalars['ID']
}

/** The output of our delete `Country` mutation. */
export type DeleteCountryPayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `Country` that was deleted by this mutation. */
  country?: Maybe<Country>
  deletedCountryNodeId?: Maybe<Scalars['ID']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** An edge for our `Country`. May be used by Relay 1. */
  countryEdge?: Maybe<CountriesEdge>
}

/** The output of our delete `Country` mutation. */
export type DeleteCountryPayloadCountryEdgeArgs = {
  orderBy?: Maybe<Array<CountriesOrderBy>>
}

/** All input for the `deleteCountry` mutation. */
export type DeleteCountryInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  id: Scalars['UUID']
}

/** All input for the `deleteCountryByCode` mutation. */
export type DeleteCountryByCodeInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  code: Scalars['String']
}

/** All input for the `deleteCountryByName` mutation. */
export type DeleteCountryByNameInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  name: Scalars['String']
}

/** All input for the `deleteLanguageByNodeId` mutation. */
export type DeleteLanguageByNodeIdInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The globally unique `ID` which will identify a single `Language` to be deleted. */
  nodeId: Scalars['ID']
}

/** The output of our delete `Language` mutation. */
export type DeleteLanguagePayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `Language` that was deleted by this mutation. */
  language?: Maybe<Language>
  deletedLanguageNodeId?: Maybe<Scalars['ID']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** An edge for our `Language`. May be used by Relay 1. */
  languageEdge?: Maybe<LanguagesEdge>
}

/** The output of our delete `Language` mutation. */
export type DeleteLanguagePayloadLanguageEdgeArgs = {
  orderBy?: Maybe<Array<LanguagesOrderBy>>
}

/** All input for the `deleteLanguage` mutation. */
export type DeleteLanguageInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  code: Scalars['String']
}

/** All input for the `deleteParkingOpenHourByNodeId` mutation. */
export type DeleteParkingOpenHourByNodeIdInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The globally unique `ID` which will identify a single `ParkingOpenHour` to be deleted. */
  nodeId: Scalars['ID']
}

/** The output of our delete `ParkingOpenHour` mutation. */
export type DeleteParkingOpenHourPayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `ParkingOpenHour` that was deleted by this mutation. */
  parkingOpenHour?: Maybe<ParkingOpenHour>
  deletedParkingOpenHourNodeId?: Maybe<Scalars['ID']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** Reads a single `ParkingSpaceAvailability` that is related to this `ParkingOpenHour`. */
  parkingSpaceAvailability?: Maybe<ParkingSpaceAvailability>
  /** An edge for our `ParkingOpenHour`. May be used by Relay 1. */
  parkingOpenHourEdge?: Maybe<ParkingOpenHoursEdge>
}

/** The output of our delete `ParkingOpenHour` mutation. */
export type DeleteParkingOpenHourPayloadParkingOpenHourEdgeArgs = {
  orderBy?: Maybe<Array<ParkingOpenHoursOrderBy>>
}

/** All input for the `deleteParkingOpenHour` mutation. */
export type DeleteParkingOpenHourInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  id: Scalars['UUID']
}

/** All input for the `deleteParkingSpaceByNodeId` mutation. */
export type DeleteParkingSpaceByNodeIdInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The globally unique `ID` which will identify a single `ParkingSpace` to be deleted. */
  nodeId: Scalars['ID']
}

/** The output of our delete `ParkingSpace` mutation. */
export type DeleteParkingSpacePayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `ParkingSpace` that was deleted by this mutation. */
  parkingSpace?: Maybe<ParkingSpace>
  deletedParkingSpaceNodeId?: Maybe<Scalars['ID']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** Reads a single `User` that is related to this `ParkingSpace`. */
  owner?: Maybe<User>
  /** An edge for our `ParkingSpace`. May be used by Relay 1. */
  parkingSpaceEdge?: Maybe<ParkingSpacesEdge>
}

/** The output of our delete `ParkingSpace` mutation. */
export type DeleteParkingSpacePayloadParkingSpaceEdgeArgs = {
  orderBy?: Maybe<Array<ParkingSpacesOrderBy>>
}

/** All input for the `deleteParkingSpace` mutation. */
export type DeleteParkingSpaceInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  id: Scalars['UUID']
}

/** All input for the `deleteParkingSpaceBySlug` mutation. */
export type DeleteParkingSpaceBySlugInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  slug: Scalars['String']
}

/** All input for the `deleteParkingSpaceAvailabilityByNodeId` mutation. */
export type DeleteParkingSpaceAvailabilityByNodeIdInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The globally unique `ID` which will identify a single `ParkingSpaceAvailability` to be deleted. */
  nodeId: Scalars['ID']
}

/** The output of our delete `ParkingSpaceAvailability` mutation. */
export type DeleteParkingSpaceAvailabilityPayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `ParkingSpaceAvailability` that was deleted by this mutation. */
  parkingSpaceAvailability?: Maybe<ParkingSpaceAvailability>
  deletedParkingSpaceAvailabilityNodeId?: Maybe<Scalars['ID']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** Reads a single `ParkingSpace` that is related to this `ParkingSpaceAvailability`. */
  parkingSpace?: Maybe<ParkingSpace>
  /** An edge for our `ParkingSpaceAvailability`. May be used by Relay 1. */
  parkingSpaceAvailabilityEdge?: Maybe<ParkingSpaceAvailabilitiesEdge>
}

/** The output of our delete `ParkingSpaceAvailability` mutation. */
export type DeleteParkingSpaceAvailabilityPayloadParkingSpaceAvailabilityEdgeArgs = {
  orderBy?: Maybe<Array<ParkingSpaceAvailabilitiesOrderBy>>
}

/** All input for the `deleteParkingSpaceAvailability` mutation. */
export type DeleteParkingSpaceAvailabilityInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  id: Scalars['UUID']
}

/** All input for the `deleteParkingWorkingHourByNodeId` mutation. */
export type DeleteParkingWorkingHourByNodeIdInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The globally unique `ID` which will identify a single `ParkingWorkingHour` to be deleted. */
  nodeId: Scalars['ID']
}

/** The output of our delete `ParkingWorkingHour` mutation. */
export type DeleteParkingWorkingHourPayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `ParkingWorkingHour` that was deleted by this mutation. */
  parkingWorkingHour?: Maybe<ParkingWorkingHour>
  deletedParkingWorkingHourNodeId?: Maybe<Scalars['ID']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** Reads a single `ParkingSpaceAvailability` that is related to this `ParkingWorkingHour`. */
  parkingSpaceAvailability?: Maybe<ParkingSpaceAvailability>
  /** An edge for our `ParkingWorkingHour`. May be used by Relay 1. */
  parkingWorkingHourEdge?: Maybe<ParkingWorkingHoursEdge>
}

/** The output of our delete `ParkingWorkingHour` mutation. */
export type DeleteParkingWorkingHourPayloadParkingWorkingHourEdgeArgs = {
  orderBy?: Maybe<Array<ParkingWorkingHoursOrderBy>>
}

/** All input for the `deleteParkingWorkingHour` mutation. */
export type DeleteParkingWorkingHourInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  id: Scalars['UUID']
}

/** All input for the `deletePaymentReceiptByNodeId` mutation. */
export type DeletePaymentReceiptByNodeIdInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The globally unique `ID` which will identify a single `PaymentReceipt` to be deleted. */
  nodeId: Scalars['ID']
}

/** The output of our delete `PaymentReceipt` mutation. */
export type DeletePaymentReceiptPayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `PaymentReceipt` that was deleted by this mutation. */
  paymentReceipt?: Maybe<PaymentReceipt>
  deletedPaymentReceiptNodeId?: Maybe<Scalars['ID']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** Reads a single `User` that is related to this `PaymentReceipt`. */
  owner?: Maybe<User>
  /** An edge for our `PaymentReceipt`. May be used by Relay 1. */
  paymentReceiptEdge?: Maybe<PaymentReceiptsEdge>
}

/** The output of our delete `PaymentReceipt` mutation. */
export type DeletePaymentReceiptPayloadPaymentReceiptEdgeArgs = {
  orderBy?: Maybe<Array<PaymentReceiptsOrderBy>>
}

/** All input for the `deletePaymentReceipt` mutation. */
export type DeletePaymentReceiptInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  id: Scalars['UUID']
}

/** All input for the `deleteSlotByNodeId` mutation. */
export type DeleteSlotByNodeIdInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The globally unique `ID` which will identify a single `Slot` to be deleted. */
  nodeId: Scalars['ID']
}

/** The output of our delete `Slot` mutation. */
export type DeleteSlotPayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `Slot` that was deleted by this mutation. */
  slot?: Maybe<Slot>
  deletedSlotNodeId?: Maybe<Scalars['ID']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** Reads a single `User` that is related to this `Slot`. */
  owner?: Maybe<User>
  /** Reads a single `VehicleSize` that is related to this `Slot`. */
  vehicleSize?: Maybe<VehicleSize>
  /** Reads a single `ParkingSpace` that is related to this `Slot`. */
  parkingSpace?: Maybe<ParkingSpace>
  /** An edge for our `Slot`. May be used by Relay 1. */
  slotEdge?: Maybe<SlotsEdge>
}

/** The output of our delete `Slot` mutation. */
export type DeleteSlotPayloadSlotEdgeArgs = {
  orderBy?: Maybe<Array<SlotsOrderBy>>
}

/** All input for the `deleteSlot` mutation. */
export type DeleteSlotInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  id: Scalars['UUID']
}

/** All input for the `deleteSlotAmenityByNodeId` mutation. */
export type DeleteSlotAmenityByNodeIdInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The globally unique `ID` which will identify a single `SlotAmenity` to be deleted. */
  nodeId: Scalars['ID']
}

/** The output of our delete `SlotAmenity` mutation. */
export type DeleteSlotAmenityPayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `SlotAmenity` that was deleted by this mutation. */
  slotAmenity?: Maybe<SlotAmenity>
  deletedSlotAmenityNodeId?: Maybe<Scalars['ID']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** Reads a single `Slot` that is related to this `SlotAmenity`. */
  slot?: Maybe<Slot>
  /** Reads a single `Amenity` that is related to this `SlotAmenity`. */
  amenity?: Maybe<Amenity>
  /** An edge for our `SlotAmenity`. May be used by Relay 1. */
  slotAmenityEdge?: Maybe<SlotAmenitiesEdge>
}

/** The output of our delete `SlotAmenity` mutation. */
export type DeleteSlotAmenityPayloadSlotAmenityEdgeArgs = {
  orderBy?: Maybe<Array<SlotAmenitiesOrderBy>>
}

/** All input for the `deleteSlotAmenity` mutation. */
export type DeleteSlotAmenityInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  id: Scalars['UUID']
}

/** All input for the `deleteSlotAvailabilityByNodeId` mutation. */
export type DeleteSlotAvailabilityByNodeIdInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The globally unique `ID` which will identify a single `SlotAvailability` to be deleted. */
  nodeId: Scalars['ID']
}

/** The output of our delete `SlotAvailability` mutation. */
export type DeleteSlotAvailabilityPayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `SlotAvailability` that was deleted by this mutation. */
  slotAvailability?: Maybe<SlotAvailability>
  deletedSlotAvailabilityNodeId?: Maybe<Scalars['ID']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** Reads a single `Slot` that is related to this `SlotAvailability`. */
  slot?: Maybe<Slot>
  /** An edge for our `SlotAvailability`. May be used by Relay 1. */
  slotAvailabilityEdge?: Maybe<SlotAvailabilitiesEdge>
}

/** The output of our delete `SlotAvailability` mutation. */
export type DeleteSlotAvailabilityPayloadSlotAvailabilityEdgeArgs = {
  orderBy?: Maybe<Array<SlotAvailabilitiesOrderBy>>
}

/** All input for the `deleteSlotAvailability` mutation. */
export type DeleteSlotAvailabilityInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  id: Scalars['UUID']
}

/** All input for the `deleteTranslationByNodeId` mutation. */
export type DeleteTranslationByNodeIdInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The globally unique `ID` which will identify a single `Translation` to be deleted. */
  nodeId: Scalars['ID']
}

/** The output of our delete `Translation` mutation. */
export type DeleteTranslationPayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `Translation` that was deleted by this mutation. */
  translation?: Maybe<Translation>
  deletedTranslationNodeId?: Maybe<Scalars['ID']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** Reads a single `Language` that is related to this `Translation`. */
  languageByLang?: Maybe<Language>
  /** An edge for our `Translation`. May be used by Relay 1. */
  translationEdge?: Maybe<TranslationsEdge>
}

/** The output of our delete `Translation` mutation. */
export type DeleteTranslationPayloadTranslationEdgeArgs = {
  orderBy?: Maybe<Array<TranslationsOrderBy>>
}

/** All input for the `deleteTranslation` mutation. */
export type DeleteTranslationInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  id: Scalars['UUID']
}

/** All input for the `deleteUserByNodeId` mutation. */
export type DeleteUserByNodeIdInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The globally unique `ID` which will identify a single `User` to be deleted. */
  nodeId: Scalars['ID']
}

/** The output of our delete `User` mutation. */
export type DeleteUserPayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `User` that was deleted by this mutation. */
  user?: Maybe<User>
  deletedUserNodeId?: Maybe<Scalars['ID']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UsersEdge>
}

/** The output of our delete `User` mutation. */
export type DeleteUserPayloadUserEdgeArgs = {
  orderBy?: Maybe<Array<UsersOrderBy>>
}

/** All input for the `deleteUser` mutation. */
export type DeleteUserInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  id: Scalars['UUID']
}

/** All input for the `deleteUserSubscriptionByNodeId` mutation. */
export type DeleteUserSubscriptionByNodeIdInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The globally unique `ID` which will identify a single `UserSubscription` to be deleted. */
  nodeId: Scalars['ID']
}

/** The output of our delete `UserSubscription` mutation. */
export type DeleteUserSubscriptionPayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `UserSubscription` that was deleted by this mutation. */
  userSubscription?: Maybe<UserSubscription>
  deletedUserSubscriptionNodeId?: Maybe<Scalars['ID']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** Reads a single `User` that is related to this `UserSubscription`. */
  user?: Maybe<User>
  /** Reads a single `BillingProfile` that is related to this `UserSubscription`. */
  billingProfile?: Maybe<BillingProfile>
  /** An edge for our `UserSubscription`. May be used by Relay 1. */
  userSubscriptionEdge?: Maybe<UserSubscriptionsEdge>
}

/** The output of our delete `UserSubscription` mutation. */
export type DeleteUserSubscriptionPayloadUserSubscriptionEdgeArgs = {
  orderBy?: Maybe<Array<UserSubscriptionsOrderBy>>
}

/** All input for the `deleteUserSubscription` mutation. */
export type DeleteUserSubscriptionInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  id: Scalars['UUID']
}

/** All input for the `deleteVehicleByNodeId` mutation. */
export type DeleteVehicleByNodeIdInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The globally unique `ID` which will identify a single `Vehicle` to be deleted. */
  nodeId: Scalars['ID']
}

/** The output of our delete `Vehicle` mutation. */
export type DeleteVehiclePayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `Vehicle` that was deleted by this mutation. */
  vehicle?: Maybe<Vehicle>
  deletedVehicleNodeId?: Maybe<Scalars['ID']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** Reads a single `User` that is related to this `Vehicle`. */
  owner?: Maybe<User>
  /** Reads a single `VehicleType` that is related to this `Vehicle`. */
  vehicleType?: Maybe<VehicleType>
  /** Reads a single `VehicleSize` that is related to this `Vehicle`. */
  vehicleSize?: Maybe<VehicleSize>
  /** An edge for our `Vehicle`. May be used by Relay 1. */
  vehicleEdge?: Maybe<VehiclesEdge>
}

/** The output of our delete `Vehicle` mutation. */
export type DeleteVehiclePayloadVehicleEdgeArgs = {
  orderBy?: Maybe<Array<VehiclesOrderBy>>
}

/** All input for the `deleteVehicle` mutation. */
export type DeleteVehicleInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  id: Scalars['UUID']
}

/** All input for the `deleteVehicleSizeByNodeId` mutation. */
export type DeleteVehicleSizeByNodeIdInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The globally unique `ID` which will identify a single `VehicleSize` to be deleted. */
  nodeId: Scalars['ID']
}

/** The output of our delete `VehicleSize` mutation. */
export type DeleteVehicleSizePayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `VehicleSize` that was deleted by this mutation. */
  vehicleSize?: Maybe<VehicleSize>
  deletedVehicleSizeNodeId?: Maybe<Scalars['ID']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** An edge for our `VehicleSize`. May be used by Relay 1. */
  vehicleSizeEdge?: Maybe<VehicleSizesEdge>
}

/** The output of our delete `VehicleSize` mutation. */
export type DeleteVehicleSizePayloadVehicleSizeEdgeArgs = {
  orderBy?: Maybe<Array<VehicleSizesOrderBy>>
}

/** All input for the `deleteVehicleSize` mutation. */
export type DeleteVehicleSizeInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  id: Scalars['UUID']
}

/** All input for the `deleteVehicleTypeByNodeId` mutation. */
export type DeleteVehicleTypeByNodeIdInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The globally unique `ID` which will identify a single `VehicleType` to be deleted. */
  nodeId: Scalars['ID']
}

/** The output of our delete `VehicleType` mutation. */
export type DeleteVehicleTypePayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `VehicleType` that was deleted by this mutation. */
  vehicleType?: Maybe<VehicleType>
  deletedVehicleTypeNodeId?: Maybe<Scalars['ID']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** An edge for our `VehicleType`. May be used by Relay 1. */
  vehicleTypeEdge?: Maybe<VehicleTypesEdge>
}

/** The output of our delete `VehicleType` mutation. */
export type DeleteVehicleTypePayloadVehicleTypeEdgeArgs = {
  orderBy?: Maybe<Array<VehicleTypesOrderBy>>
}

/** All input for the `deleteVehicleType` mutation. */
export type DeleteVehicleTypeInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  id: Scalars['UUID']
}

/** All input for the `deleteVehicleTypeByName` mutation. */
export type DeleteVehicleTypeByNameInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  name: Scalars['String']
}

/** All input for the `activateUser` mutation. */
export type ActivateUserInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  payload?: Maybe<ActivateUserInputRecordInput>
}

/** An input for mutations affecting `ActivateUserInputRecord` */
export type ActivateUserInputRecordInput = {
  password?: Maybe<Scalars['String']>
  password2?: Maybe<Scalars['String']>
}

/** The output of our `activateUser` mutation. */
export type ActivateUserPayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  jwtToken?: Maybe<Scalars['JwtToken']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** All input for the `authenticateApi` mutation. */
export type AuthenticateApiInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  apiKey?: Maybe<Scalars['String']>
}

/** The output of our `authenticateApi` mutation. */
export type AuthenticateApiPayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  json?: Maybe<Scalars['JSON']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** All input for the `bookSlot` mutation. */
export type BookSlotInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  payload?: Maybe<BookSlotInputRecordInput>
}

/** An input for mutations affecting `BookSlotInputRecord` */
export type BookSlotInputRecordInput = {
  userId?: Maybe<Scalars['UUID']>
  slotId?: Maybe<Scalars['UUID']>
  startTime?: Maybe<Scalars['Datetime']>
  endTime?: Maybe<Scalars['Datetime']>
  licensePlate?: Maybe<Scalars['String']>
  phone?: Maybe<Scalars['PhoneUs']>
}

/** The output of our `bookSlot` mutation. */
export type BookSlotPayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  slotBooking?: Maybe<SlotBooking>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** Reads a single `Slot` that is related to this `SlotBooking`. */
  slot?: Maybe<Slot>
  /** Reads a single `User` that is related to this `SlotBooking`. */
  user?: Maybe<User>
  /** Reads a single `PaymentReceipt` that is related to this `SlotBooking`. */
  paymentReceipt?: Maybe<PaymentReceipt>
  /** An edge for our `SlotBooking`. May be used by Relay 1. */
  slotBookingEdge?: Maybe<SlotBookingsEdge>
}

/** The output of our `bookSlot` mutation. */
export type BookSlotPayloadSlotBookingEdgeArgs = {
  orderBy?: Maybe<Array<SlotBookingsOrderBy>>
}

/** All input for the `createApiKey` mutation. */
export type CreateApiKeyInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  payload?: Maybe<CreateApiKeyInputRecordInput>
}

/** An input for mutations affecting `CreateApiKeyInputRecord` */
export type CreateApiKeyInputRecordInput = {
  userId?: Maybe<Scalars['UUID']>
  description?: Maybe<Scalars['String']>
  expireAt?: Maybe<IntervalInput>
}

/** The output of our `createApiKey` mutation. */
export type CreateApiKeyPayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  createApiKeyResult?: Maybe<CreateApiKeyResult>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

export type CreateApiKeyResult = {
  id?: Maybe<Scalars['UUID']>
  userId?: Maybe<Scalars['UUID']>
  apiKey?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  expireAt?: Maybe<Scalars['Datetime']>
  createdAt?: Maybe<Scalars['Datetime']>
}

/** All input for the `createUser` mutation. */
export type CreateUserInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  payload?: Maybe<CreateUserInputRecordInput>
}

/** An input for mutations affecting `CreateUserInputRecord` */
export type CreateUserInputRecordInput = {
  name?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['Email']>
  phone?: Maybe<Scalars['PhoneUs']>
  status?: Maybe<StatusT>
  role?: Maybe<Scalars['String']>
  photoUrl?: Maybe<Scalars['String']>
  address?: Maybe<Scalars['JSON']>
  settings?: Maybe<Scalars['JSON']>
}

/** The output of our `createUser` mutation. */
export type CreateUserPayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  user?: Maybe<User>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UsersEdge>
}

/** The output of our `createUser` mutation. */
export type CreateUserPayloadUserEdgeArgs = {
  orderBy?: Maybe<Array<UsersOrderBy>>
}

/** All input for the `deleteApiKey` mutation. */
export type DeleteApiKeyInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  apiKeyId?: Maybe<Scalars['UUID']>
}

/** The output of our `deleteApiKey` mutation. */
export type DeleteApiKeyPayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  boolean?: Maybe<Scalars['Boolean']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** All input for the `forgotPassword` mutation. */
export type ForgotPasswordInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  payload?: Maybe<ForgotPasswordInputRecordInput>
}

/** An input for mutations affecting `ForgotPasswordInputRecord` */
export type ForgotPasswordInputRecordInput = {
  email?: Maybe<Scalars['Email']>
}

/** The output of our `forgotPassword` mutation. */
export type ForgotPasswordPayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  boolean?: Maybe<Scalars['Boolean']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** All input for the `login` mutation. */
export type LoginInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  payload?: Maybe<LoginInputRecordInput>
}

/** An input for mutations affecting `LoginInputRecord` */
export type LoginInputRecordInput = {
  email?: Maybe<Scalars['Email']>
  password?: Maybe<Scalars['String']>
  rememberMe?: Maybe<Scalars['Boolean']>
}

/** The output of our `login` mutation. */
export type LoginPayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  jwtToken?: Maybe<Scalars['JwtToken']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** All input for the `refreshToken` mutation. */
export type RefreshTokenInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
}

/** The output of our `refreshToken` mutation. */
export type RefreshTokenPayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  jwtToken?: Maybe<Scalars['JwtToken']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** All input for the `register` mutation. */
export type RegisterInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  payload?: Maybe<RegisterInputRecordInput>
}

/** An input for mutations affecting `RegisterInputRecord` */
export type RegisterInputRecordInput = {
  email: Scalars['Email']
  password?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  phone?: Maybe<Scalars['PhoneUs']>
  licensePlate?: Maybe<Scalars['String']>
  role?: Maybe<Scalars['String']>
}

/** The output of our `register` mutation. */
export type RegisterPayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  jwtToken?: Maybe<Scalars['JwtToken']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** All input for the `resendActivationEmail` mutation. */
export type ResendActivationEmailInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  requestedEmail?: Maybe<Scalars['Email']>
}

/** The output of our `resendActivationEmail` mutation. */
export type ResendActivationEmailPayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  boolean?: Maybe<Scalars['Boolean']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** All input for the `resetPassword` mutation. */
export type ResetPasswordInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  payload?: Maybe<ResetPasswordInputRecordInput>
}

/** An input for mutations affecting `ResetPasswordInputRecord` */
export type ResetPasswordInputRecordInput = {
  password?: Maybe<Scalars['String']>
}

/** The output of our `resetPassword` mutation. */
export type ResetPasswordPayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  boolean?: Maybe<Scalars['Boolean']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** All input for the `slotBookingAttend` mutation. */
export type SlotBookingAttendInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  payload?: Maybe<SlotBookingAttendanceInputRecordInput>
}

/** An input for mutations affecting `SlotBookingAttendanceInputRecord` */
export type SlotBookingAttendanceInputRecordInput = {
  slotBookingId?: Maybe<Scalars['UUID']>
  attendanceType?: Maybe<SlotAttendance>
  time?: Maybe<Scalars['Datetime']>
}

export enum SlotAttendance {
  Checkin = 'CHECKIN',
  Checkout = 'CHECKOUT',
}

/** The output of our `slotBookingAttend` mutation. */
export type SlotBookingAttendPayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  slotBooking?: Maybe<SlotBooking>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** Reads a single `Slot` that is related to this `SlotBooking`. */
  slot?: Maybe<Slot>
  /** Reads a single `User` that is related to this `SlotBooking`. */
  user?: Maybe<User>
  /** Reads a single `PaymentReceipt` that is related to this `SlotBooking`. */
  paymentReceipt?: Maybe<PaymentReceipt>
  /** An edge for our `SlotBooking`. May be used by Relay 1. */
  slotBookingEdge?: Maybe<SlotBookingsEdge>
}

/** The output of our `slotBookingAttend` mutation. */
export type SlotBookingAttendPayloadSlotBookingEdgeArgs = {
  orderBy?: Maybe<Array<SlotBookingsOrderBy>>
}

/** All input for the `updateUser` mutation. */
export type UpdateUserInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>
  payload?: Maybe<UpdateUserInputRecordInput>
}

/** An input for mutations affecting `UpdateUserInputRecord` */
export type UpdateUserInputRecordInput = {
  id?: Maybe<Scalars['UUID']>
  name?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['Email']>
  password?: Maybe<Scalars['String']>
  phone?: Maybe<Scalars['PhoneUs']>
  status?: Maybe<StatusT>
  role?: Maybe<Scalars['String']>
  photoUrl?: Maybe<Scalars['String']>
  address?: Maybe<Scalars['JSON']>
  settings?: Maybe<Scalars['JSON']>
  emailConfirmed?: Maybe<Scalars['Boolean']>
}

/** The output of our `updateUser` mutation. */
export type UpdateUserPayload = {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>
  user?: Maybe<User>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UsersEdge>
}

/** The output of our `updateUser` mutation. */
export type UpdateUserPayloadUserEdgeArgs = {
  orderBy?: Maybe<Array<UsersOrderBy>>
}

export type BookSlotMutationVariables = Exact<{
  payload: BookSlotInputRecordInput
}>

export type BookSlotMutation = {
  bookSlot?: Maybe<{
    slotBooking?: Maybe<{
      id: string
      slotId?: Maybe<string>
      userId?: Maybe<string>
      status?: Maybe<BookingStatusT>
      licensePlate?: Maybe<string>
      phone?: Maybe<any>
      startTime?: Maybe<Date>
      endTime?: Maybe<Date>
      slot?: Maybe<{ id: string; name: string; description?: Maybe<string> }>
    }>
  }>
}

export type SlotBookingAttendMutationVariables = Exact<{
  payload: SlotBookingAttendanceInputRecordInput
}>

export type SlotBookingAttendMutation = {
  slotBookingAttend?: Maybe<{
    slotBooking?: Maybe<{
      id: string
      status?: Maybe<BookingStatusT>
      startTime?: Maybe<Date>
      endTime?: Maybe<Date>
      checkInAt?: Maybe<Date>
      checkOutAt?: Maybe<Date>
    }>
  }>
}

export type UpdateBookingMutationVariables = Exact<{
  id: Scalars['UUID']
  patch: SlotBookingPatch
}>

export type UpdateBookingMutation = {
  updateSlotBooking?: Maybe<{ slotBooking?: Maybe<{ id: string; status?: Maybe<BookingStatusT> }> }>
}

export type CreateBusinessMutationVariables = Exact<{
  payload: CreateBusinessInput
}>

export type CreateBusinessMutation = {
  createBusiness?: Maybe<{
    business?: Maybe<{
      id: string
      name: string
      description?: Maybe<string>
      photoUrl?: Maybe<string>
      markerUrl?: Maybe<string>
      ownerId: string
      address?: Maybe<{ [key: string]: unknown }>
      location: { longitude: number; latitude: number }
    }>
  }>
}

export type DeleteBusinessMutationVariables = Exact<{
  id: Scalars['UUID']
}>

export type DeleteBusinessMutation = {
  deleteBusiness?: Maybe<{ deletedBusinessNodeId?: Maybe<string> }>
}

export type UpdateBusinessMutationVariables = Exact<{
  id: Scalars['UUID']
  patch: BusinessPatch
}>

export type UpdateBusinessMutation = {
  updateBusiness?: Maybe<{
    business?: Maybe<{
      id: string
      name: string
      description?: Maybe<string>
      photoUrl?: Maybe<string>
      markerUrl?: Maybe<string>
      ownerId: string
      address?: Maybe<{ [key: string]: unknown }>
      location: { longitude: number; latitude: number }
    }>
  }>
}

export type CreatePaymentReceiptMutationVariables = Exact<{
  input: CreatePaymentReceiptInput
}>

export type CreatePaymentReceiptMutation = {
  createPaymentReceipt?: Maybe<{
    paymentReceipt?: Maybe<{
      id: string
      ownerId: string
      receiptUrl?: Maybe<string>
      paymentIntentId: string
      amount: any
    }>
  }>
}

export type ActiveBookingQueryVariables = Exact<{
  payload: ActiveBookingInputRecordInput
}>

export type ActiveBookingQuery = { activeBooking?: Maybe<CommonBookingFieldsFragment> }

export type ManageBookingQueryVariables = Exact<{
  id: Scalars['UUID']
}>

export type ManageBookingQuery = { slotBooking?: Maybe<CommonBookingFieldsFragment> }

export type SlotBookingByIdQueryVariables = Exact<{
  id: Scalars['UUID']
}>

export type SlotBookingByIdQuery = {
  slotBooking?: Maybe<{
    id: string
    startTime?: Maybe<Date>
    endTime?: Maybe<Date>
    checkInAt?: Maybe<Date>
    checkOutAt?: Maybe<Date>
    licensePlate?: Maybe<string>
    status?: Maybe<BookingStatusT>
    slot?: Maybe<{
      id: string
      name: string
      photoUrl?: Maybe<string>
      location: { longitude: number; latitude: number }
    }>
    paymentReceipt?: Maybe<{ id: string; amount: any; receiptUrl?: Maybe<string> }>
  }>
}

export type SlotBookingStatusQueryVariables = Exact<{
  payload: SlotBookingStatusInputRecordInput
}>

export type SlotBookingStatusQuery = { slotBookingStatus?: Maybe<SlotAvailabilityBookingStatus> }

export type SlotBookingsByUserIdQueryVariables = Exact<{
  userId: Scalars['UUID']
  filter?: Maybe<SlotBookingFilter>
}>

export type SlotBookingsByUserIdQuery = {
  slotBookingsList?: Maybe<
    Array<
      {
        paymentReceipt?: Maybe<{
          id: string
          paymentIntentId: string
          receiptUrl?: Maybe<string>
          amount: any
        }>
      } & CommonBookingFieldsFragment
    >
  >
}

export type SlotTimetableQueryVariables = Exact<{
  slotId: Scalars['UUID']
  startTime?: Maybe<Scalars['Datetime']>
  endTime?: Maybe<Scalars['Datetime']>
}>

export type SlotTimetableQuery = {
  slotTimetableList?: Maybe<
    Array<{
      slotId: string
      startTime: Date
      endTime: Date
      booked: boolean
      timetableDate: any
      dayOfWeek: number
    }>
  >
}

export type CommonBookingFieldsFragment = {
  id: string
  slotId?: Maybe<string>
  userId?: Maybe<string>
  status?: Maybe<BookingStatusT>
  phone?: Maybe<any>
  licensePlate?: Maybe<string>
  startTime?: Maybe<Date>
  endTime?: Maybe<Date>
  createdAt?: Maybe<Date>
  checkInAt?: Maybe<Date>
  checkOutAt?: Maybe<Date>
  slot?: Maybe<{ id: string; name: string; location: { longitude: number; latitude: number } }>
  user?: Maybe<{ id: string; name: string }>
}

export type MyBusinessListQueryVariables = Exact<{
  ownerId: Scalars['UUID']
}>

export type MyBusinessListQuery = {
  businessesList?: Maybe<
    Array<{
      id: string
      name: string
      description?: Maybe<string>
      photoUrl?: Maybe<string>
      markerUrl?: Maybe<string>
      ownerId: string
      address?: Maybe<{ [key: string]: unknown }>
      location: { longitude: number; latitude: number }
    }>
  >
}

export type ParkingSpacesByIdsQueryVariables = Exact<{
  ids?: Maybe<Array<Scalars['UUID']>>
}>

export type ParkingSpacesByIdsQuery = {
  parkingSpacesList?: Maybe<
    Array<{ id: string; name: string; photoUrl?: Maybe<string>; slotsList: Array<{ id: string }> }>
  >
}

export type SlotsByParkingSpaceQueryVariables = Exact<{
  parkingSpaceId: Scalars['UUID']
}>

export type SlotsByParkingSpaceQuery = {
  slotsList?: Maybe<
    Array<{
      id: string
      name: string
      pricePerHour: any
      photoUrl?: Maybe<string>
      parkingSpaceId?: Maybe<string>
      status: SlotStatusT
    }>
  >
}

export type LoginMutationVariables = Exact<{
  payload: LoginInputRecordInput
}>

export type LoginMutation = { login?: Maybe<{ jwtToken?: Maybe<string> }> }

export type RegisterMutationVariables = Exact<{
  payload?: Maybe<RegisterInputRecordInput>
}>

export type RegisterMutation = { register?: Maybe<{ jwtToken?: Maybe<string> }> }

export type CreateParkingSpaceMutationVariables = Exact<{
  input: CreateParkingSpaceInput
}>

export type CreateParkingSpaceMutation = {
  createParkingSpace?: Maybe<{
    parkingSpace?: Maybe<{
      id: string
      name: string
      slug?: Maybe<string>
      address?: Maybe<{ [key: string]: unknown }>
      status?: Maybe<ParkingSpaceStatus>
      location?: Maybe<{ longitude: number; latitude: number }>
      carEntry?: Maybe<{ longitude: number; latitude: number }>
      carExit?: Maybe<{ longitude: number; latitude: number }>
      parkingSpaceAvailabilitiesList: Array<{
        id: string
        parkingSpaceId: string
        fromDate: any
        toDate: any
        defaultFlag: boolean
        closedFlag: boolean
        parkingWorkingHoursList: Array<{
          id: string
          parkingSpaceAvailabilityId: string
          dayOfWeek: { [key: string]: unknown }
          fromTime: string
          toTime: string
        }>
        parkingOpenHoursList: Array<{
          id: string
          parkingSpaceAvailabilityId: string
          dayOfWeek: { [key: string]: unknown }
          fromTime: string
          toTime: string
          price: number
          currency: string

        }>
      }>
    }>
  }>
}

export type DeleteParkingSpaceMutationVariables = Exact<{
  id: Scalars['UUID']
}>

export type DeleteParkingSpaceMutation = {
  deleteParkingSpace?: Maybe<{ deletedParkingSpaceNodeId?: Maybe<string> }>
}

export type UpdateParkingSpaceMutationVariables = Exact<{
  id: Scalars['UUID']
  patch: ParkingSpacePatch
}>

export type UpdateParkingSpaceMutation = {
  updateParkingSpace?: Maybe<{
    parkingSpace?: Maybe<{
      id: string
      name: string
      slug?: Maybe<string>
      address?: Maybe<{ [key: string]: unknown }>
      status?: Maybe<ParkingSpaceStatus>
      location?: Maybe<{ longitude: number; latitude: number }>
      carEntry?: Maybe<{ longitude: number; latitude: number }>
      carExit?: Maybe<{ longitude: number; latitude: number }>
    }>
  }>
}

export type ActivateUserMutationVariables = Exact<{
  payload: ActivateUserInputRecordInput
}>

export type ActivateUserMutation = { activateUser?: Maybe<{ jwtToken?: Maybe<string> }> }

export type DeleteAccountMutationVariables = Exact<{
  id: Scalars['UUID']
}>

export type DeleteAccountMutation = { deleteUser?: Maybe<{ deletedUserNodeId?: Maybe<string> }> }

export type ForgotPasswordMutationVariables = Exact<{
  payload: ForgotPasswordInputRecordInput
}>

export type ForgotPasswordMutation = { forgotPassword?: Maybe<{ boolean?: Maybe<boolean> }> }

export type ResendActivationEmailMutationVariables = Exact<{
  email: Scalars['Email']
}>

export type ResendActivationEmailMutation = {
  resendActivationEmail?: Maybe<{ success?: Maybe<boolean> }>
}

export type ResetPasswordMutationVariables = Exact<{
  payload: ResetPasswordInputRecordInput
}>

export type ResetPasswordMutation = { resetPassword?: Maybe<{ boolean?: Maybe<boolean> }> }

export type UpdateBillingProfileMutationVariables = Exact<{
  payload: UpdateBillingProfileInput
}>

export type UpdateBillingProfileMutation = {
  updateBillingProfile?: Maybe<{
    user?: Maybe<{
      id: string
      billingProfilesList: Array<{
        id: string
        customerId?: Maybe<string>
        billingDetails?: Maybe<{ [key: string]: unknown }>
      }>
    }>
    billingProfile?: Maybe<{
      id: string
      customerId?: Maybe<string>
      billingDetails?: Maybe<{ [key: string]: unknown }>
    }>
  }>
}

export type UpdateProfileMutationVariables = Exact<{
  payload: UpdateUserInputRecordInput
}>

export type UpdateProfileMutation = {
  updateUser?: Maybe<{
    user?: Maybe<{ id: string; name: string; email: string; phone?: Maybe<any> }>
  }>
}

export type CreateSlotMutationVariables = Exact<{
  payload: CreateSlotInput
}>

export type CreateSlotMutation = {
  createSlot?: Maybe<{
    slot?: Maybe<{
      id: string
      name: string
      timezone: string
      slug?: Maybe<string>
      accessRestrictions?: Maybe<AccessRestrictions>
      parkingSpaceId?: Maybe<string>
      level?: Maybe<number>
      notes?: Maybe<string>
      address?: Maybe<{ [key: string]: unknown }>
      tempUnavailable?: Maybe<boolean>
      tempUnavailableFrom?: Maybe<Date>
      tempUnavailableTo?: Maybe<Date>
      location: { longitude: number; latitude: number }
      slotAmenitiesList: Array<{ amenity?: Maybe<{ id: string; name: string }> }>
      slotAvailabilitiesList: Array<{
        id: string
        dayOfWeek: number
        startHour: string
        endHour: string
      }>
      shape?: Maybe<{ geojson?: Maybe<GeometryObject> }>
    }>
  }>
}

export type DeleteSlotMutationVariables = Exact<{
  id: Scalars['UUID']
}>

export type DeleteSlotMutation = { deleteSlot?: Maybe<{ deletedSlotNodeId?: Maybe<string> }> }

export type UpdateSlotMutationVariables = Exact<{
  id: Scalars['UUID']
  patch: SlotPatch
}>

export type UpdateSlotMutation = {
  updateSlot?: Maybe<{ slot?: Maybe<{ id: string; name: string; status: SlotStatusT }> }>
}

export type CreateTranslationMutationVariables = Exact<{
  payload: CreateTranslationInput
}>

export type CreateTranslationMutation = {
  createTranslation?: Maybe<{ translation?: Maybe<{ key: string }> }>
}

export type UpdateTranslationMutationVariables = Exact<{
  payload: UpdateTranslationInput
}>

export type UpdateTranslationMutation = {
  updateTranslation?: Maybe<{ translation?: Maybe<{ key: string; translation: string }> }>
}

export type CreateVehicleMutationVariables = Exact<{
  payload: CreateVehicleInput
}>

export type CreateVehicleMutation = {
  createVehicle?: Maybe<{
    vehicle?: Maybe<{
      id: string
      status: StatusT
      ownerId: string
      licensePlate?: Maybe<string>
      vehicleTypeId: string
    }>
  }>
}

export type DeleteVehicleMutationVariables = Exact<{
  id: Scalars['UUID']
}>

export type DeleteVehicleMutation = {
  deleteVehicle?: Maybe<{ deletedVehicleNodeId?: Maybe<string> }>
}

export type UpdateVehicleMutationVariables = Exact<{
  id: Scalars['UUID']
  patch: VehiclePatch
}>

export type UpdateVehicleMutation = {
  updateVehicle?: Maybe<{
    vehicle?: Maybe<{
      id: string
      name: string
      status: StatusT
      ownerId: string
      licensePlate?: Maybe<string>
      vehicleTypeId: string
    }>
  }>
}

export type ListAmenitiesQueryVariables = Exact<{ [key: string]: never }>

export type ListAmenitiesQuery = {
  amenitiesList?: Maybe<
    Array<{ id: string; name: string; status: ContentStatusT; slug?: Maybe<string> }>
  >
  categoriesList?: Maybe<
    Array<{ id: string; name: string; status: ContentStatusT; slug?: Maybe<string> }>
  >
}

export type BookingsListQueryVariables = Exact<{ [key: string]: never }>

export type BookingsListQuery = { slotBookingsList?: Maybe<Array<CommonBookingFieldsFragment>> }

export type FindBusinessQueryVariables = Exact<{
  payload: FindBusinessInputRecordInput
}>

export type FindBusinessQuery = {
  findBusinessList?: Maybe<
    Array<{
      id: string
      name: string
      description?: Maybe<string>
      photoUrl?: Maybe<string>
      markerUrl?: Maybe<string>
      ownerId: string
      address?: Maybe<{ [key: string]: unknown }>
      location: { longitude: number; latitude: number }
    }>
  >
}

export type MyParkingSpacesListQueryVariables = Exact<{
  ownerId: Scalars['UUID']
}>

export type MyParkingSpacesListQuery = {
  parkingSpacesList?: Maybe<Array<{ id: string; status?: Maybe<ParkingSpaceStatus>; name: string }>>
}

export type ManageSpaceQueryVariables = Exact<{
  id: Scalars['UUID']
}>

export type ManageSpaceQuery = {
  parkingSpace?: Maybe<{
    id: string
    ownerId: string
    name: string
    description?: Maybe<string>
    photoUrl?: Maybe<string>
    address?: Maybe<{ [key: string]: unknown }>
    languageCode?: Maybe<string>
    floor?: Maybe<number>
    category?: Maybe<SpaceCategory>
    status?: Maybe<ParkingSpaceStatus>
    accessRestriction?: Maybe<Array<Maybe<SpaceAccessRestriction>>>
    businessStatusReason?: Maybe<string>
    location?: Maybe<{ latitude: number; longitude: number }>
    carEntry?: Maybe<{ x: number; y: number }>
    carExit?: Maybe<{ x: number; y: number }>
    companyEntrance?: Maybe<{ x: number; y: number }>
    parkingspaceMapview?: Maybe<{ geojson?: Maybe<GeometryObject> }>
    parkingSpaceAvailabilitiesList: Array<{
      fromDate: any
      toDate: any
      defaultFlag: boolean
      closedFlag: boolean
      parkingWorkingHoursList: Array<{
        dayOfWeek: { [key: string]: unknown }
        fromTime: string
        toTime: string
      }>
      parkingOpenHoursList: Array<{
        dayOfWeek: { [key: string]: unknown }
        fromTime: string
        toTime: string
        price: number
        currency?: Maybe<string>
      }>
    }>
  }>
}

export type SpaceByIdQueryVariables = Exact<{
  id: Scalars['UUID']
}>

export type SpaceByIdQuery = {
  parkingSpace?: Maybe<{
    id: string
    name: string
    description?: Maybe<string>
    photoUrl?: Maybe<string>
    status?: Maybe<ParkingSpaceStatus>
    ownerId: string
    address?: Maybe<{ [key: string]: unknown }>
    location?: Maybe<{ longitude: number; latitude: number }>
    parkingSpaceAvailabilitiesList: Array<{
      id: string
      parkingSpaceId: string
      fromDate: any
      toDate: any
      defaultFlag: boolean
      closedFlag: boolean
      parkingWorkingHoursList: Array<{
        dayOfWeek: { [key: string]: unknown }
        fromTime: string
        toTime: string
      }>
      parkingOpenHoursList: Array<{
        dayOfWeek: { [key: string]: unknown }
        fromTime: string
        toTime: string
        price: number
        currency: string
      }>
    }>
  }>
}

export type SpacesByOwnerQueryVariables = Exact<{
  ownerId: Scalars['UUID']
  timeForBookingCheck: Scalars['Datetime']
  offset?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
}>

export type SpacesByOwnerQuery = { parkingSpace?: Maybe<{ id: string }> }

export type SpacesListQueryVariables = Exact<{ [key: string]: never }>

export type SpacesListQuery = { parkingSpacesList?: Maybe<Array<CommonSpaceFieldsFragment>> }

export type SpacesListByOwnerQueryVariables = Exact<{
  ownerId: Scalars['UUID']
  timeForBookingCheck: Scalars['Datetime']
  offset?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
}>

export type SpacesListByOwnerQuery = { parkingSpacesList?: Maybe<Array<CommonSpaceFieldsFragment>> }

export type CommonSpaceFieldsFragment = {
  id: string
  name: string
  photoUrl?: Maybe<string>
  description?: Maybe<string>
  address?: Maybe<{ [key: string]: unknown }>
  status?: Maybe<ParkingSpaceStatus>
  ownerId: string
  location?: Maybe<{ longitude: number; latitude: number }>
  owner?: Maybe<{ id: string; name: string }>
}

export type ParkingSpaceAvailabilityFieldsFragment = {
  parkingSpaceAvailabilitiesList: Array<{
    id: string
    parkingSpaceId: string
    fromDate: any
    toDate: any
    defaultFlag: boolean
    closedFlag: boolean
  }>
}

export type FindSlotsQueryVariables = Exact<{
  latitude: Scalars['BigFloat']
  longitude: Scalars['BigFloat']
  startTime?: Maybe<Scalars['Datetime']>
  endTime?: Maybe<Scalars['Datetime']>
  distance?: Maybe<Scalars['Int']>
  ownerId?: Maybe<Scalars['UUID']>
  totalLimit?: Maybe<Scalars['Int']>
  slotAmenities?: Maybe<Array<Maybe<Scalars['UUID']>>>
  vehicleSizes?: Maybe<Array<Maybe<Scalars['UUID']>>>
}>

export type FindSlotsQuery = {
  findSlotsList?: Maybe<
    Array<{
      id: string
      status: SlotStatusT
      inWorkingHours: boolean
      inAmenities: boolean
      booked: boolean
      parkingSpaceId?: Maybe<string>
      location: { longitude: number; latitude: number }
    }>
  >
}

export type ManageSlotQueryVariables = Exact<{
  id: Scalars['UUID']
}>

export type ManageSlotQuery = {
  slot?: Maybe<{
    id: string
    name: string
    notes?: Maybe<string>
    timezone: string
    accessRestrictions?: Maybe<AccessRestrictions>
    category?: Maybe<SlotCategory>
    level?: Maybe<number>
    status: SlotStatusT
    description?: Maybe<string>
    pricePerHour: any
    photoUrl?: Maybe<string>
    address?: Maybe<{ [key: string]: unknown }>
    vehicleSizeId: string
    verificationStatus: SlotVerificationStatus
    parkingSpaceId?: Maybe<string>
    businessStatusReason?: Maybe<string>
    tempUnavailable?: Maybe<boolean>
    tempUnavailableFrom?: Maybe<Date>
    tempUnavailableTo?: Maybe<Date>
    waypoints?: Maybe<{ [key: string]: unknown }>
    slotAmenitiesList: Array<{ amenityId: string }>
    slotAvailabilitiesList: Array<{
      id: string
      dayOfWeek: number
      startHour: string
      endHour: string
    }>
    owner?: Maybe<{ id: string; name: string; email: string }>
    location: { longitude: number; latitude: number }
    shape?: Maybe<{ geojson?: Maybe<GeometryObject> }>
  }>
}

export type SlotBookingTimesListQueryVariables = Exact<{
  payload: SlotBookingTimesInputRecordInput
}>

export type SlotBookingTimesListQuery = {
  slotBookingTimesList?: Maybe<
    Array<Maybe<{ slotId?: Maybe<string>; startTime?: Maybe<Date>; endTime?: Maybe<Date> }>>
  >
}

export type SlotByIdQueryVariables = Exact<{
  id: Scalars['UUID']
}>

export type SlotByIdQuery = {
  slot?: Maybe<{
    id: string
    name: string
    description?: Maybe<string>
    notes?: Maybe<string>
    pricePerHour: any
    photoUrl?: Maybe<string>
    status: SlotStatusT
    ownerId: string
    address?: Maybe<{ [key: string]: unknown }>
    location: { longitude: number; latitude: number }
    slotAmenitiesList: Array<{
      id: string
      amenity?: Maybe<{
        id: string
        name: string
        description?: Maybe<string>
        slug?: Maybe<string>
      }>
    }>
    slotAvailabilitiesList: Array<{ dayOfWeek: number; startHour: string; endHour: string }>
  }>
}

export type SlotsAvailabilityByIdQueryVariables = Exact<{
  slotId: Scalars['UUID']
}>

export type SlotsAvailabilityByIdQuery = {
  slot?: Maybe<
    {
      id: string
      name: string
      address?: Maybe<{ [key: string]: unknown }>
      pricePerHour: any
      location: { longitude: number; latitude: number }
    } & AvailabilitySlotFieldsFragment
  >
}

export type SlotsByOwnerQueryVariables = Exact<{
  ownerId: Scalars['UUID']
  timeForBookingCheck: Scalars['Datetime']
  offset?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
}>

export type SlotsByOwnerQuery = {
  slots?: Maybe<{
    totalCount: number
    nodes: Array<
      {
        slotBookingsList: Array<{
          id: string
          phone?: Maybe<any>
          startTime?: Maybe<Date>
          endTime?: Maybe<Date>
          licensePlate?: Maybe<string>
          status?: Maybe<BookingStatusT>
          user?: Maybe<{ id: string; name: string }>
        }>
      } & CommonSlotFieldsFragment
    >
  }>
}

export type SlotsListQueryVariables = Exact<{ [key: string]: never }>

export type SlotsListQuery = { slotsList?: Maybe<Array<CommonSlotFieldsFragment>> }

export type SlotsListByOwnerQueryVariables = Exact<{
  ownerId: Scalars['UUID']
  timeForBookingCheck: Scalars['Datetime']
  offset?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
}>

export type SlotsListByOwnerQuery = {
  slotsList?: Maybe<
    Array<
      {
        slotBookingsList: Array<{
          id: string
          phone?: Maybe<any>
          startTime?: Maybe<Date>
          endTime?: Maybe<Date>
          licensePlate?: Maybe<string>
          status?: Maybe<BookingStatusT>
          user?: Maybe<{ id: string; name: string }>
        }>
      } & CommonSlotFieldsFragment
    >
  >
}

export type AvailabilitySlotFieldsFragment = {
  slotAvailabilitiesList: Array<{
    id: string
    dayOfWeek: number
    startHour: string
    endHour: string
  }>
}

export type CommonSlotFieldsFragment = {
  id: string
  name: string
  notes?: Maybe<string>
  photoUrl?: Maybe<string>
  timezone: string
  description?: Maybe<string>
  pricePerHour: any
  address?: Maybe<{ [key: string]: unknown }>
  status: SlotStatusT
  ownerId: string
  location: { longitude: number; latitude: number }
  owner?: Maybe<{ id: string; name: string }>
}

export type TranslationsListQueryVariables = Exact<{
  lang: Scalars['String']
}>

export type TranslationsListQuery = {
  translations?: Maybe<
    Array<{ lang: string; namespace?: Maybe<string>; key: string; translation: string }>
  >
}

export type CurrentUserQueryVariables = Exact<{ [key: string]: never }>

export type CurrentUserQuery = { currentUser?: Maybe<{ [key: string]: unknown }> }

export type EmailAvailableQueryVariables = Exact<{
  email: Scalars['Email']
}>

export type EmailAvailableQuery = { emailAvailable?: Maybe<boolean> }

export type UserPremiumQueryVariables = Exact<{
  userId: Scalars['UUID']
}>

export type UserPremiumQuery = { userPremium?: Maybe<boolean> }

export type MyVehiclesListQueryVariables = Exact<{
  ownerId: Scalars['UUID']
}>

export type MyVehiclesListQuery = {
  vehiclesList?: Maybe<
    Array<{
      id: string
      name: string
      status: StatusT
      licensePlate?: Maybe<string>
      vehicleTypeId: string
      vehicleSizeId: string
    }>
  >
}

export type VehicleSizesListQueryVariables = Exact<{ [key: string]: never }>

export type VehicleSizesListQuery = {
  vehicleSizesList?: Maybe<
    Array<{ id: string; name?: Maybe<string>; description?: Maybe<string>; status: ContentStatusT }>
  >
}

export type VehicleTypesListQueryVariables = Exact<{ [key: string]: never }>

export type VehicleTypesListQuery = {
  vehicleTypesList?: Maybe<Array<{ id: string; name: string; weight: number }>>
}

export type VehiclesListQueryVariables = Exact<{ [key: string]: never }>

export type VehiclesListQuery = {
  vehiclesList?: Maybe<
    Array<{
      id: string
      name: string
      status: StatusT
      licensePlate?: Maybe<string>
      vehicleTypeId: string
      vehicleSizeId: string
      ownerId: string
      vehicleType?: Maybe<{ id: string; name: string }>
      vehicleSize?: Maybe<{ id: string; name?: Maybe<string>; description?: Maybe<string> }>
      owner?: Maybe<{ id: string; name: string }>
    }>
  >
}

export const CommonBookingFieldsFragmentDoc = gql`
  fragment CommonBookingFields on SlotBooking {
    id
    slotId
    slot {
      id
      name
      location {
        longitude: x
        latitude: y
      }
    }
    userId
    user {
      id
      name
    }
    status
    phone
    licensePlate
    startTime
    endTime
    createdAt
    checkInAt
    checkOutAt
  }
`
export const CommonSpaceFieldsFragmentDoc = gql`
  fragment CommonSpaceFields on ParkingSpace {
    id
    name
    photoUrl
    description
    location {
      longitude
      latitude
    }
    address
    status
    ownerId
    owner {
      id
      name
    }
  }
`
export const ParkingSpaceAvailabilityFieldsFragmentDoc = gql`
  fragment ParkingSpaceAvailabilityFields on ParkingSpace {
    parkingSpaceAvailabilitiesList {
      id
      parkingSpaceId
      fromDate
      toDate
      defaultFlag
      closedFlag
    }
  }
`
export const AvailabilitySlotFieldsFragmentDoc = gql`
  fragment AvailabilitySlotFields on Slot {
    slotAvailabilitiesList {
      id
      dayOfWeek
      startHour
      endHour
    }
  }
`
export const CommonSlotFieldsFragmentDoc = gql`
  fragment CommonSlotFields on Slot {
    id
    name
    notes
    photoUrl
    timezone
    description
    pricePerHour
    location {
      longitude: x
      latitude: y
    }
    address
    status
    ownerId
    owner {
      id
      name
    }
  }
`
export const BookSlotDocument = gql`
  mutation BookSlot($payload: BookSlotInputRecordInput!) {
    bookSlot(input: { payload: $payload }) {
      slotBooking {
        id
        slotId
        slot {
          id
          name
          description
        }
        userId
        status
        licensePlate
        phone
        startTime
        endTime
      }
    }
  }
`
export type BookSlotMutationFn = Apollo.MutationFunction<
  BookSlotMutation,
  BookSlotMutationVariables
>

/**
 * __useBookSlotMutation__
 *
 * To run a mutation, you first call `useBookSlotMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBookSlotMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bookSlotMutation, { data, loading, error }] = useBookSlotMutation({
 *   variables: {
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useBookSlotMutation(
  baseOptions?: Apollo.MutationHookOptions<BookSlotMutation, BookSlotMutationVariables>,
) {
  return Apollo.useMutation<BookSlotMutation, BookSlotMutationVariables>(
    BookSlotDocument,
    baseOptions,
  )
}
export type BookSlotMutationHookResult = ReturnType<typeof useBookSlotMutation>
export type BookSlotMutationResult = Apollo.MutationResult<BookSlotMutation>
export type BookSlotMutationOptions = Apollo.BaseMutationOptions<
  BookSlotMutation,
  BookSlotMutationVariables
>
export const SlotBookingAttendDocument = gql`
  mutation SlotBookingAttend($payload: SlotBookingAttendanceInputRecordInput!) {
    slotBookingAttend(input: { payload: $payload }) {
      slotBooking {
        id
        status
        startTime
        endTime
        checkInAt
        checkOutAt
      }
    }
  }
`
export type SlotBookingAttendMutationFn = Apollo.MutationFunction<
  SlotBookingAttendMutation,
  SlotBookingAttendMutationVariables
>

/**
 * __useSlotBookingAttendMutation__
 *
 * To run a mutation, you first call `useSlotBookingAttendMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSlotBookingAttendMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [slotBookingAttendMutation, { data, loading, error }] = useSlotBookingAttendMutation({
 *   variables: {
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useSlotBookingAttendMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SlotBookingAttendMutation,
    SlotBookingAttendMutationVariables
  >,
) {
  return Apollo.useMutation<SlotBookingAttendMutation, SlotBookingAttendMutationVariables>(
    SlotBookingAttendDocument,
    baseOptions,
  )
}
export type SlotBookingAttendMutationHookResult = ReturnType<typeof useSlotBookingAttendMutation>
export type SlotBookingAttendMutationResult = Apollo.MutationResult<SlotBookingAttendMutation>
export type SlotBookingAttendMutationOptions = Apollo.BaseMutationOptions<
  SlotBookingAttendMutation,
  SlotBookingAttendMutationVariables
>
export const UpdateBookingDocument = gql`
  mutation UpdateBooking($id: UUID!, $patch: SlotBookingPatch!) {
    updateSlotBooking(input: { id: $id, patch: $patch }) {
      slotBooking {
        id
        status
      }
    }
  }
`
export type UpdateBookingMutationFn = Apollo.MutationFunction<
  UpdateBookingMutation,
  UpdateBookingMutationVariables
>

/**
 * __useUpdateBookingMutation__
 *
 * To run a mutation, you first call `useUpdateBookingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBookingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBookingMutation, { data, loading, error }] = useUpdateBookingMutation({
 *   variables: {
 *      id: // value for 'id'
 *      patch: // value for 'patch'
 *   },
 * });
 */
export function useUpdateBookingMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateBookingMutation, UpdateBookingMutationVariables>,
) {
  return Apollo.useMutation<UpdateBookingMutation, UpdateBookingMutationVariables>(
    UpdateBookingDocument,
    baseOptions,
  )
}
export type UpdateBookingMutationHookResult = ReturnType<typeof useUpdateBookingMutation>
export type UpdateBookingMutationResult = Apollo.MutationResult<UpdateBookingMutation>
export type UpdateBookingMutationOptions = Apollo.BaseMutationOptions<
  UpdateBookingMutation,
  UpdateBookingMutationVariables
>
export const CreateBusinessDocument = gql`
  mutation CreateBusiness($payload: CreateBusinessInput!) {
    createBusiness(input: $payload) {
      business {
        id
        name
        description
        photoUrl
        markerUrl
        ownerId
        address
        location {
          longitude
          latitude
        }
      }
    }
  }
`
export type CreateBusinessMutationFn = Apollo.MutationFunction<
  CreateBusinessMutation,
  CreateBusinessMutationVariables
>

/**
 * __useCreateBusinessMutation__
 *
 * To run a mutation, you first call `useCreateBusinessMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBusinessMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBusinessMutation, { data, loading, error }] = useCreateBusinessMutation({
 *   variables: {
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useCreateBusinessMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateBusinessMutation, CreateBusinessMutationVariables>,
) {
  return Apollo.useMutation<CreateBusinessMutation, CreateBusinessMutationVariables>(
    CreateBusinessDocument,
    baseOptions,
  )
}
export type CreateBusinessMutationHookResult = ReturnType<typeof useCreateBusinessMutation>
export type CreateBusinessMutationResult = Apollo.MutationResult<CreateBusinessMutation>
export type CreateBusinessMutationOptions = Apollo.BaseMutationOptions<
  CreateBusinessMutation,
  CreateBusinessMutationVariables
>
export const DeleteBusinessDocument = gql`
  mutation DeleteBusiness($id: UUID!) {
    deleteBusiness(input: { id: $id }) {
      deletedBusinessNodeId
    }
  }
`
export type DeleteBusinessMutationFn = Apollo.MutationFunction<
  DeleteBusinessMutation,
  DeleteBusinessMutationVariables
>

/**
 * __useDeleteBusinessMutation__
 *
 * To run a mutation, you first call `useDeleteBusinessMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBusinessMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBusinessMutation, { data, loading, error }] = useDeleteBusinessMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteBusinessMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteBusinessMutation, DeleteBusinessMutationVariables>,
) {
  return Apollo.useMutation<DeleteBusinessMutation, DeleteBusinessMutationVariables>(
    DeleteBusinessDocument,
    baseOptions,
  )
}
export type DeleteBusinessMutationHookResult = ReturnType<typeof useDeleteBusinessMutation>
export type DeleteBusinessMutationResult = Apollo.MutationResult<DeleteBusinessMutation>
export type DeleteBusinessMutationOptions = Apollo.BaseMutationOptions<
  DeleteBusinessMutation,
  DeleteBusinessMutationVariables
>
export const UpdateBusinessDocument = gql`
  mutation UpdateBusiness($id: UUID!, $patch: BusinessPatch!) {
    updateBusiness(input: { id: $id, patch: $patch }) {
      business {
        id
        name
        description
        photoUrl
        markerUrl
        ownerId
        address
        location {
          longitude
          latitude
        }
      }
    }
  }
`
export type UpdateBusinessMutationFn = Apollo.MutationFunction<
  UpdateBusinessMutation,
  UpdateBusinessMutationVariables
>

/**
 * __useUpdateBusinessMutation__
 *
 * To run a mutation, you first call `useUpdateBusinessMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBusinessMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBusinessMutation, { data, loading, error }] = useUpdateBusinessMutation({
 *   variables: {
 *      id: // value for 'id'
 *      patch: // value for 'patch'
 *   },
 * });
 */
export function useUpdateBusinessMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateBusinessMutation, UpdateBusinessMutationVariables>,
) {
  return Apollo.useMutation<UpdateBusinessMutation, UpdateBusinessMutationVariables>(
    UpdateBusinessDocument,
    baseOptions,
  )
}
export type UpdateBusinessMutationHookResult = ReturnType<typeof useUpdateBusinessMutation>
export type UpdateBusinessMutationResult = Apollo.MutationResult<UpdateBusinessMutation>
export type UpdateBusinessMutationOptions = Apollo.BaseMutationOptions<
  UpdateBusinessMutation,
  UpdateBusinessMutationVariables
>
export const CreatePaymentReceiptDocument = gql`
  mutation CreatePaymentReceipt($input: CreatePaymentReceiptInput!) {
    createPaymentReceipt(input: $input) {
      paymentReceipt {
        id
        ownerId
        receiptUrl
        paymentIntentId
        amount
      }
    }
  }
`
export type CreatePaymentReceiptMutationFn = Apollo.MutationFunction<
  CreatePaymentReceiptMutation,
  CreatePaymentReceiptMutationVariables
>

/**
 * __useCreatePaymentReceiptMutation__
 *
 * To run a mutation, you first call `useCreatePaymentReceiptMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePaymentReceiptMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPaymentReceiptMutation, { data, loading, error }] = useCreatePaymentReceiptMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePaymentReceiptMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreatePaymentReceiptMutation,
    CreatePaymentReceiptMutationVariables
  >,
) {
  return Apollo.useMutation<CreatePaymentReceiptMutation, CreatePaymentReceiptMutationVariables>(
    CreatePaymentReceiptDocument,
    baseOptions,
  )
}
export type CreatePaymentReceiptMutationHookResult = ReturnType<
  typeof useCreatePaymentReceiptMutation
>
export type CreatePaymentReceiptMutationResult = Apollo.MutationResult<CreatePaymentReceiptMutation>
export type CreatePaymentReceiptMutationOptions = Apollo.BaseMutationOptions<
  CreatePaymentReceiptMutation,
  CreatePaymentReceiptMutationVariables
>
export const ActiveBookingDocument = gql`
  query ActiveBooking($payload: ActiveBookingInputRecordInput!) {
    activeBooking(payload: $payload) {
      ...CommonBookingFields
    }
  }
  ${CommonBookingFieldsFragmentDoc}
`

/**
 * __useActiveBookingQuery__
 *
 * To run a query within a React component, call `useActiveBookingQuery` and pass it any options that fit your needs.
 * When your component renders, `useActiveBookingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useActiveBookingQuery({
 *   variables: {
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useActiveBookingQuery(
  baseOptions?: Apollo.QueryHookOptions<ActiveBookingQuery, ActiveBookingQueryVariables>,
) {
  return Apollo.useQuery<ActiveBookingQuery, ActiveBookingQueryVariables>(
    ActiveBookingDocument,
    baseOptions,
  )
}
export function useActiveBookingLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ActiveBookingQuery, ActiveBookingQueryVariables>,
) {
  return Apollo.useLazyQuery<ActiveBookingQuery, ActiveBookingQueryVariables>(
    ActiveBookingDocument,
    baseOptions,
  )
}
export type ActiveBookingQueryHookResult = ReturnType<typeof useActiveBookingQuery>
export type ActiveBookingLazyQueryHookResult = ReturnType<typeof useActiveBookingLazyQuery>
export type ActiveBookingQueryResult = Apollo.QueryResult<
  ActiveBookingQuery,
  ActiveBookingQueryVariables
>
export const ManageBookingDocument = gql`
  query ManageBooking($id: UUID!) {
    slotBooking(id: $id) {
      ...CommonBookingFields
    }
  }
  ${CommonBookingFieldsFragmentDoc}
`

/**
 * __useManageBookingQuery__
 *
 * To run a query within a React component, call `useManageBookingQuery` and pass it any options that fit your needs.
 * When your component renders, `useManageBookingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useManageBookingQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useManageBookingQuery(
  baseOptions?: Apollo.QueryHookOptions<ManageBookingQuery, ManageBookingQueryVariables>,
) {
  return Apollo.useQuery<ManageBookingQuery, ManageBookingQueryVariables>(
    ManageBookingDocument,
    baseOptions,
  )
}
export function useManageBookingLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ManageBookingQuery, ManageBookingQueryVariables>,
) {
  return Apollo.useLazyQuery<ManageBookingQuery, ManageBookingQueryVariables>(
    ManageBookingDocument,
    baseOptions,
  )
}
export type ManageBookingQueryHookResult = ReturnType<typeof useManageBookingQuery>
export type ManageBookingLazyQueryHookResult = ReturnType<typeof useManageBookingLazyQuery>
export type ManageBookingQueryResult = Apollo.QueryResult<
  ManageBookingQuery,
  ManageBookingQueryVariables
>
export const SlotBookingByIdDocument = gql`
  query SlotBookingById($id: UUID!) {
    slotBooking(id: $id) {
      id
      startTime
      endTime
      checkInAt
      checkOutAt
      licensePlate
      status
      slot {
        id
        name
        photoUrl
        location {
          longitude: x
          latitude: y
        }
      }
      paymentReceipt {
        id
        amount
        receiptUrl
      }
    }
  }
`

/**
 * __useSlotBookingByIdQuery__
 *
 * To run a query within a React component, call `useSlotBookingByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useSlotBookingByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSlotBookingByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSlotBookingByIdQuery(
  baseOptions?: Apollo.QueryHookOptions<SlotBookingByIdQuery, SlotBookingByIdQueryVariables>,
) {
  return Apollo.useQuery<SlotBookingByIdQuery, SlotBookingByIdQueryVariables>(
    SlotBookingByIdDocument,
    baseOptions,
  )
}
export function useSlotBookingByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SlotBookingByIdQuery, SlotBookingByIdQueryVariables>,
) {
  return Apollo.useLazyQuery<SlotBookingByIdQuery, SlotBookingByIdQueryVariables>(
    SlotBookingByIdDocument,
    baseOptions,
  )
}
export type SlotBookingByIdQueryHookResult = ReturnType<typeof useSlotBookingByIdQuery>
export type SlotBookingByIdLazyQueryHookResult = ReturnType<typeof useSlotBookingByIdLazyQuery>
export type SlotBookingByIdQueryResult = Apollo.QueryResult<
  SlotBookingByIdQuery,
  SlotBookingByIdQueryVariables
>
export const SlotBookingStatusDocument = gql`
  query SlotBookingStatus($payload: SlotBookingStatusInputRecordInput!) {
    slotBookingStatus(payload: $payload)
  }
`

/**
 * __useSlotBookingStatusQuery__
 *
 * To run a query within a React component, call `useSlotBookingStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useSlotBookingStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSlotBookingStatusQuery({
 *   variables: {
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useSlotBookingStatusQuery(
  baseOptions?: Apollo.QueryHookOptions<SlotBookingStatusQuery, SlotBookingStatusQueryVariables>,
) {
  return Apollo.useQuery<SlotBookingStatusQuery, SlotBookingStatusQueryVariables>(
    SlotBookingStatusDocument,
    baseOptions,
  )
}
export function useSlotBookingStatusLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SlotBookingStatusQuery,
    SlotBookingStatusQueryVariables
  >,
) {
  return Apollo.useLazyQuery<SlotBookingStatusQuery, SlotBookingStatusQueryVariables>(
    SlotBookingStatusDocument,
    baseOptions,
  )
}
export type SlotBookingStatusQueryHookResult = ReturnType<typeof useSlotBookingStatusQuery>
export type SlotBookingStatusLazyQueryHookResult = ReturnType<typeof useSlotBookingStatusLazyQuery>
export type SlotBookingStatusQueryResult = Apollo.QueryResult<
  SlotBookingStatusQuery,
  SlotBookingStatusQueryVariables
>
export const SlotBookingsByUserIdDocument = gql`
  query SlotBookingsByUserId($userId: UUID!, $filter: SlotBookingFilter) {
    slotBookingsList(condition: { userId: $userId }, orderBy: CREATED_AT_DESC, filter: $filter) {
      ...CommonBookingFields
      paymentReceipt {
        id
        paymentIntentId
        receiptUrl
        amount
      }
    }
  }
  ${CommonBookingFieldsFragmentDoc}
`

/**
 * __useSlotBookingsByUserIdQuery__
 *
 * To run a query within a React component, call `useSlotBookingsByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useSlotBookingsByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSlotBookingsByUserIdQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useSlotBookingsByUserIdQuery(
  baseOptions?: Apollo.QueryHookOptions<
    SlotBookingsByUserIdQuery,
    SlotBookingsByUserIdQueryVariables
  >,
) {
  return Apollo.useQuery<SlotBookingsByUserIdQuery, SlotBookingsByUserIdQueryVariables>(
    SlotBookingsByUserIdDocument,
    baseOptions,
  )
}
export function useSlotBookingsByUserIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SlotBookingsByUserIdQuery,
    SlotBookingsByUserIdQueryVariables
  >,
) {
  return Apollo.useLazyQuery<SlotBookingsByUserIdQuery, SlotBookingsByUserIdQueryVariables>(
    SlotBookingsByUserIdDocument,
    baseOptions,
  )
}
export type SlotBookingsByUserIdQueryHookResult = ReturnType<typeof useSlotBookingsByUserIdQuery>
export type SlotBookingsByUserIdLazyQueryHookResult = ReturnType<
  typeof useSlotBookingsByUserIdLazyQuery
>
export type SlotBookingsByUserIdQueryResult = Apollo.QueryResult<
  SlotBookingsByUserIdQuery,
  SlotBookingsByUserIdQueryVariables
>
export const SlotTimetableDocument = gql`
  query SlotTimetable($slotId: UUID!, $startTime: Datetime, $endTime: Datetime) {
    slotTimetableList(
      slotIds: [$slotId]
      timetableStartTime: $startTime
      timetableEndTime: $endTime
    ) {
      slotId
      startTime
      endTime
      booked
      timetableDate
      dayOfWeek
    }
  }
`

/**
 * __useSlotTimetableQuery__
 *
 * To run a query within a React component, call `useSlotTimetableQuery` and pass it any options that fit your needs.
 * When your component renders, `useSlotTimetableQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSlotTimetableQuery({
 *   variables: {
 *      slotId: // value for 'slotId'
 *      startTime: // value for 'startTime'
 *      endTime: // value for 'endTime'
 *   },
 * });
 */
export function useSlotTimetableQuery(
  baseOptions?: Apollo.QueryHookOptions<SlotTimetableQuery, SlotTimetableQueryVariables>,
) {
  return Apollo.useQuery<SlotTimetableQuery, SlotTimetableQueryVariables>(
    SlotTimetableDocument,
    baseOptions,
  )
}
export function useSlotTimetableLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SlotTimetableQuery, SlotTimetableQueryVariables>,
) {
  return Apollo.useLazyQuery<SlotTimetableQuery, SlotTimetableQueryVariables>(
    SlotTimetableDocument,
    baseOptions,
  )
}
export type SlotTimetableQueryHookResult = ReturnType<typeof useSlotTimetableQuery>
export type SlotTimetableLazyQueryHookResult = ReturnType<typeof useSlotTimetableLazyQuery>
export type SlotTimetableQueryResult = Apollo.QueryResult<
  SlotTimetableQuery,
  SlotTimetableQueryVariables
>
export const MyBusinessListDocument = gql`
  query MyBusinessList($ownerId: UUID!) {
    businessesList(condition: { ownerId: $ownerId }, orderBy: CREATED_AT_ASC) {
      id
      name
      description
      photoUrl
      markerUrl
      ownerId
      address
      location {
        longitude
        latitude
      }
    }
  }
`

/**
 * __useMyBusinessListQuery__
 *
 * To run a query within a React component, call `useMyBusinessListQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyBusinessListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyBusinessListQuery({
 *   variables: {
 *      ownerId: // value for 'ownerId'
 *   },
 * });
 */
export function useMyBusinessListQuery(
  baseOptions?: Apollo.QueryHookOptions<MyBusinessListQuery, MyBusinessListQueryVariables>,
) {
  return Apollo.useQuery<MyBusinessListQuery, MyBusinessListQueryVariables>(
    MyBusinessListDocument,
    baseOptions,
  )
}
export function useMyBusinessListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MyBusinessListQuery, MyBusinessListQueryVariables>,
) {
  return Apollo.useLazyQuery<MyBusinessListQuery, MyBusinessListQueryVariables>(
    MyBusinessListDocument,
    baseOptions,
  )
}
export type MyBusinessListQueryHookResult = ReturnType<typeof useMyBusinessListQuery>
export type MyBusinessListLazyQueryHookResult = ReturnType<typeof useMyBusinessListLazyQuery>
export type MyBusinessListQueryResult = Apollo.QueryResult<
  MyBusinessListQuery,
  MyBusinessListQueryVariables
>
export const ParkingSpacesByIdsDocument = gql`
  query ParkingSpacesByIds($ids: [UUID!]) {
    parkingSpacesList(filter: { id: { in: $ids } }) {
      id
      name
      photoUrl
      slotsList {
        id
      }
    }
  }
`

/**
 * __useParkingSpacesByIdsQuery__
 *
 * To run a query within a React component, call `useParkingSpacesByIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useParkingSpacesByIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useParkingSpacesByIdsQuery({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useParkingSpacesByIdsQuery(
  baseOptions?: Apollo.QueryHookOptions<ParkingSpacesByIdsQuery, ParkingSpacesByIdsQueryVariables>,
) {
  return Apollo.useQuery<ParkingSpacesByIdsQuery, ParkingSpacesByIdsQueryVariables>(
    ParkingSpacesByIdsDocument,
    baseOptions,
  )
}
export function useParkingSpacesByIdsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ParkingSpacesByIdsQuery,
    ParkingSpacesByIdsQueryVariables
  >,
) {
  return Apollo.useLazyQuery<ParkingSpacesByIdsQuery, ParkingSpacesByIdsQueryVariables>(
    ParkingSpacesByIdsDocument,
    baseOptions,
  )
}
export type ParkingSpacesByIdsQueryHookResult = ReturnType<typeof useParkingSpacesByIdsQuery>
export type ParkingSpacesByIdsLazyQueryHookResult = ReturnType<
  typeof useParkingSpacesByIdsLazyQuery
>
export type ParkingSpacesByIdsQueryResult = Apollo.QueryResult<
  ParkingSpacesByIdsQuery,
  ParkingSpacesByIdsQueryVariables
>
export const SlotsByParkingSpaceDocument = gql`
  query SlotsByParkingSpace($parkingSpaceId: UUID!) {
    slotsList(condition: { parkingSpaceId: $parkingSpaceId }) {
      id
      name
      pricePerHour
      photoUrl
      parkingSpaceId
      status
    }
  }
`

/**
 * __useSlotsByParkingSpaceQuery__
 *
 * To run a query within a React component, call `useSlotsByParkingSpaceQuery` and pass it any options that fit your needs.
 * When your component renders, `useSlotsByParkingSpaceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSlotsByParkingSpaceQuery({
 *   variables: {
 *      parkingSpaceId: // value for 'parkingSpaceId'
 *   },
 * });
 */
export function useSlotsByParkingSpaceQuery(
  baseOptions?: Apollo.QueryHookOptions<
    SlotsByParkingSpaceQuery,
    SlotsByParkingSpaceQueryVariables
  >,
) {
  return Apollo.useQuery<SlotsByParkingSpaceQuery, SlotsByParkingSpaceQueryVariables>(
    SlotsByParkingSpaceDocument,
    baseOptions,
  )
}
export function useSlotsByParkingSpaceLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SlotsByParkingSpaceQuery,
    SlotsByParkingSpaceQueryVariables
  >,
) {
  return Apollo.useLazyQuery<SlotsByParkingSpaceQuery, SlotsByParkingSpaceQueryVariables>(
    SlotsByParkingSpaceDocument,
    baseOptions,
  )
}
export type SlotsByParkingSpaceQueryHookResult = ReturnType<typeof useSlotsByParkingSpaceQuery>
export type SlotsByParkingSpaceLazyQueryHookResult = ReturnType<
  typeof useSlotsByParkingSpaceLazyQuery
>
export type SlotsByParkingSpaceQueryResult = Apollo.QueryResult<
  SlotsByParkingSpaceQuery,
  SlotsByParkingSpaceQueryVariables
>
export const LoginDocument = gql`
  mutation Login($payload: LoginInputRecordInput!) {
    login(input: { payload: $payload }) {
      jwtToken
    }
  }
`
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>,
) {
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions)
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>
export const RegisterDocument = gql`
  mutation Register($payload: RegisterInputRecordInput) {
    register(input: { payload: $payload }) {
      jwtToken
    }
  }
`
export type RegisterMutationFn = Apollo.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>,
) {
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
    baseOptions,
  )
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>
export const CreateParkingSpaceDocument = gql`
  mutation CreateParkingSpace($input: CreateParkingSpaceInput!) {
    createParkingSpace(input: $input) {
      parkingSpace {
        id
        name
        slug
        location {
          longitude
          latitude
        }
        address
        status
        carEntry {
          longitude: x
          latitude: y
        }
        carExit {
          longitude: x
          latitude: y
        }
        parkingSpaceAvailabilitiesList {
          id
          parkingSpaceId
          fromDate
          toDate
          defaultFlag
          closedFlag
          parkingWorkingHoursList {
            id
            parkingSpaceAvailabilityId
            dayOfWeek
            fromTime
            toTime
          }
          parkingOpenHoursList {
            id
            parkingSpaceAvailabilityId
            dayOfWeek
            fromTime
            toTime
            price
            currency
          }
        }
      }
    }
  }
`
export type CreateParkingSpaceMutationFn = Apollo.MutationFunction<
  CreateParkingSpaceMutation,
  CreateParkingSpaceMutationVariables
>

/**
 * __useCreateParkingSpaceMutation__
 *
 * To run a mutation, you first call `useCreateParkingSpaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateParkingSpaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createParkingSpaceMutation, { data, loading, error }] = useCreateParkingSpaceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateParkingSpaceMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateParkingSpaceMutation,
    CreateParkingSpaceMutationVariables
  >,
) {
  return Apollo.useMutation<CreateParkingSpaceMutation, CreateParkingSpaceMutationVariables>(
    CreateParkingSpaceDocument,
    baseOptions,
  )
}
export type CreateParkingSpaceMutationHookResult = ReturnType<typeof useCreateParkingSpaceMutation>
export type CreateParkingSpaceMutationResult = Apollo.MutationResult<CreateParkingSpaceMutation>
export type CreateParkingSpaceMutationOptions = Apollo.BaseMutationOptions<
  CreateParkingSpaceMutation,
  CreateParkingSpaceMutationVariables
>
export const DeleteParkingSpaceDocument = gql`
  mutation DeleteParkingSpace($id: UUID!) {
    deleteParkingSpace(input: { id: $id }) {
      deletedParkingSpaceNodeId
    }
  }
`
export type DeleteParkingSpaceMutationFn = Apollo.MutationFunction<
  DeleteParkingSpaceMutation,
  DeleteParkingSpaceMutationVariables
>

/**
 * __useDeleteParkingSpaceMutation__
 *
 * To run a mutation, you first call `useDeleteParkingSpaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteParkingSpaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteParkingSpaceMutation, { data, loading, error }] = useDeleteParkingSpaceMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteParkingSpaceMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteParkingSpaceMutation,
    DeleteParkingSpaceMutationVariables
  >,
) {
  return Apollo.useMutation<DeleteParkingSpaceMutation, DeleteParkingSpaceMutationVariables>(
    DeleteParkingSpaceDocument,
    baseOptions,
  )
}
export type DeleteParkingSpaceMutationHookResult = ReturnType<typeof useDeleteParkingSpaceMutation>
export type DeleteParkingSpaceMutationResult = Apollo.MutationResult<DeleteParkingSpaceMutation>
export type DeleteParkingSpaceMutationOptions = Apollo.BaseMutationOptions<
  DeleteParkingSpaceMutation,
  DeleteParkingSpaceMutationVariables
>
export const UpdateParkingSpaceDocument = gql`
  mutation UpdateParkingSpace($id: UUID!, $patch: ParkingSpacePatch!) {
    updateParkingSpace(input: { patch: $patch, id: $id }) {
      parkingSpace {
        id
        name
        slug
        location {
          longitude
          latitude
        }
        address
        status
        carEntry {
          longitude: x
          latitude: y
        }
        carExit {
          longitude: x
          latitude: y
        }
      }
    }
  }
`
export type UpdateParkingSpaceMutationFn = Apollo.MutationFunction<
  UpdateParkingSpaceMutation,
  UpdateParkingSpaceMutationVariables
>

/**
 * __useUpdateParkingSpaceMutation__
 *
 * To run a mutation, you first call `useUpdateParkingSpaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateParkingSpaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateParkingSpaceMutation, { data, loading, error }] = useUpdateParkingSpaceMutation({
 *   variables: {
 *      id: // value for 'id'
 *      patch: // value for 'patch'
 *   },
 * });
 */
export function useUpdateParkingSpaceMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateParkingSpaceMutation,
    UpdateParkingSpaceMutationVariables
  >,
) {
  return Apollo.useMutation<UpdateParkingSpaceMutation, UpdateParkingSpaceMutationVariables>(
    UpdateParkingSpaceDocument,
    baseOptions,
  )
}
export type UpdateParkingSpaceMutationHookResult = ReturnType<typeof useUpdateParkingSpaceMutation>
export type UpdateParkingSpaceMutationResult = Apollo.MutationResult<UpdateParkingSpaceMutation>
export type UpdateParkingSpaceMutationOptions = Apollo.BaseMutationOptions<
  UpdateParkingSpaceMutation,
  UpdateParkingSpaceMutationVariables
>
export const ActivateUserDocument = gql`
  mutation ActivateUser($payload: ActivateUserInputRecordInput!) {
    activateUser(input: { payload: $payload }) {
      jwtToken
    }
  }
`
export type ActivateUserMutationFn = Apollo.MutationFunction<
  ActivateUserMutation,
  ActivateUserMutationVariables
>

/**
 * __useActivateUserMutation__
 *
 * To run a mutation, you first call `useActivateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useActivateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [activateUserMutation, { data, loading, error }] = useActivateUserMutation({
 *   variables: {
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useActivateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<ActivateUserMutation, ActivateUserMutationVariables>,
) {
  return Apollo.useMutation<ActivateUserMutation, ActivateUserMutationVariables>(
    ActivateUserDocument,
    baseOptions,
  )
}
export type ActivateUserMutationHookResult = ReturnType<typeof useActivateUserMutation>
export type ActivateUserMutationResult = Apollo.MutationResult<ActivateUserMutation>
export type ActivateUserMutationOptions = Apollo.BaseMutationOptions<
  ActivateUserMutation,
  ActivateUserMutationVariables
>
export const DeleteAccountDocument = gql`
  mutation DeleteAccount($id: UUID!) {
    deleteUser(input: { id: $id }) {
      deletedUserNodeId
    }
  }
`
export type DeleteAccountMutationFn = Apollo.MutationFunction<
  DeleteAccountMutation,
  DeleteAccountMutationVariables
>

/**
 * __useDeleteAccountMutation__
 *
 * To run a mutation, you first call `useDeleteAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAccountMutation, { data, loading, error }] = useDeleteAccountMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteAccountMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteAccountMutation, DeleteAccountMutationVariables>,
) {
  return Apollo.useMutation<DeleteAccountMutation, DeleteAccountMutationVariables>(
    DeleteAccountDocument,
    baseOptions,
  )
}
export type DeleteAccountMutationHookResult = ReturnType<typeof useDeleteAccountMutation>
export type DeleteAccountMutationResult = Apollo.MutationResult<DeleteAccountMutation>
export type DeleteAccountMutationOptions = Apollo.BaseMutationOptions<
  DeleteAccountMutation,
  DeleteAccountMutationVariables
>
export const ForgotPasswordDocument = gql`
  mutation ForgotPassword($payload: ForgotPasswordInputRecordInput!) {
    forgotPassword(input: { payload: $payload }) {
      boolean
    }
  }
`
export type ForgotPasswordMutationFn = Apollo.MutationFunction<
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables
>

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useForgotPasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>,
) {
  return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(
    ForgotPasswordDocument,
    baseOptions,
  )
}
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables
>
export const ResendActivationEmailDocument = gql`
  mutation ResendActivationEmail($email: Email!) {
    resendActivationEmail(input: { requestedEmail: $email }) {
      success: boolean
    }
  }
`
export type ResendActivationEmailMutationFn = Apollo.MutationFunction<
  ResendActivationEmailMutation,
  ResendActivationEmailMutationVariables
>

/**
 * __useResendActivationEmailMutation__
 *
 * To run a mutation, you first call `useResendActivationEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResendActivationEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resendActivationEmailMutation, { data, loading, error }] = useResendActivationEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useResendActivationEmailMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ResendActivationEmailMutation,
    ResendActivationEmailMutationVariables
  >,
) {
  return Apollo.useMutation<ResendActivationEmailMutation, ResendActivationEmailMutationVariables>(
    ResendActivationEmailDocument,
    baseOptions,
  )
}
export type ResendActivationEmailMutationHookResult = ReturnType<
  typeof useResendActivationEmailMutation
>
export type ResendActivationEmailMutationResult = Apollo.MutationResult<
  ResendActivationEmailMutation
>
export type ResendActivationEmailMutationOptions = Apollo.BaseMutationOptions<
  ResendActivationEmailMutation,
  ResendActivationEmailMutationVariables
>
export const ResetPasswordDocument = gql`
  mutation ResetPassword($payload: ResetPasswordInputRecordInput!) {
    resetPassword(input: { payload: $payload }) {
      boolean
    }
  }
`
export type ResetPasswordMutationFn = Apollo.MutationFunction<
  ResetPasswordMutation,
  ResetPasswordMutationVariables
>

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useResetPasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>,
) {
  return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(
    ResetPasswordDocument,
    baseOptions,
  )
}
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<
  ResetPasswordMutation,
  ResetPasswordMutationVariables
>
export const UpdateBillingProfileDocument = gql`
  mutation UpdateBillingProfile($payload: UpdateBillingProfileInput!) {
    updateBillingProfile(input: $payload) {
      user {
        id
        billingProfilesList {
          id
          customerId
          billingDetails
        }
      }
      billingProfile {
        id
        customerId
        billingDetails
      }
    }
  }
`
export type UpdateBillingProfileMutationFn = Apollo.MutationFunction<
  UpdateBillingProfileMutation,
  UpdateBillingProfileMutationVariables
>

/**
 * __useUpdateBillingProfileMutation__
 *
 * To run a mutation, you first call `useUpdateBillingProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBillingProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBillingProfileMutation, { data, loading, error }] = useUpdateBillingProfileMutation({
 *   variables: {
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useUpdateBillingProfileMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateBillingProfileMutation,
    UpdateBillingProfileMutationVariables
  >,
) {
  return Apollo.useMutation<UpdateBillingProfileMutation, UpdateBillingProfileMutationVariables>(
    UpdateBillingProfileDocument,
    baseOptions,
  )
}
export type UpdateBillingProfileMutationHookResult = ReturnType<
  typeof useUpdateBillingProfileMutation
>
export type UpdateBillingProfileMutationResult = Apollo.MutationResult<UpdateBillingProfileMutation>
export type UpdateBillingProfileMutationOptions = Apollo.BaseMutationOptions<
  UpdateBillingProfileMutation,
  UpdateBillingProfileMutationVariables
>
export const UpdateProfileDocument = gql`
  mutation UpdateProfile($payload: UpdateUserInputRecordInput!) {
    updateUser(input: { payload: $payload }) {
      user {
        id
        name
        email
        phone
      }
    }
  }
`
export type UpdateProfileMutationFn = Apollo.MutationFunction<
  UpdateProfileMutation,
  UpdateProfileMutationVariables
>

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useUpdateProfileMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>,
) {
  return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(
    UpdateProfileDocument,
    baseOptions,
  )
}
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<
  UpdateProfileMutation,
  UpdateProfileMutationVariables
>
export const CreateSlotDocument = gql`
  mutation CreateSlot($payload: CreateSlotInput!) {
    createSlot(input: $payload) {
      slot {
        id
        name
        timezone
        slug
        accessRestrictions
        parkingSpaceId
        level
        location {
          longitude: x
          latitude: y
        }
        notes
        address
        slotAmenitiesList {
          amenity {
            id
            name
          }
        }
        slotAvailabilitiesList {
          id
          dayOfWeek
          startHour
          endHour
        }
        shape {
          geojson
        }
        tempUnavailable
        tempUnavailableFrom
        tempUnavailableTo
      }
    }
  }
`
export type CreateSlotMutationFn = Apollo.MutationFunction<
  CreateSlotMutation,
  CreateSlotMutationVariables
>

/**
 * __useCreateSlotMutation__
 *
 * To run a mutation, you first call `useCreateSlotMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSlotMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSlotMutation, { data, loading, error }] = useCreateSlotMutation({
 *   variables: {
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useCreateSlotMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateSlotMutation, CreateSlotMutationVariables>,
) {
  return Apollo.useMutation<CreateSlotMutation, CreateSlotMutationVariables>(
    CreateSlotDocument,
    baseOptions,
  )
}
export type CreateSlotMutationHookResult = ReturnType<typeof useCreateSlotMutation>
export type CreateSlotMutationResult = Apollo.MutationResult<CreateSlotMutation>
export type CreateSlotMutationOptions = Apollo.BaseMutationOptions<
  CreateSlotMutation,
  CreateSlotMutationVariables
>
export const DeleteSlotDocument = gql`
  mutation DeleteSlot($id: UUID!) {
    deleteSlot(input: { id: $id }) {
      deletedSlotNodeId
    }
  }
`
export type DeleteSlotMutationFn = Apollo.MutationFunction<
  DeleteSlotMutation,
  DeleteSlotMutationVariables
>

/**
 * __useDeleteSlotMutation__
 *
 * To run a mutation, you first call `useDeleteSlotMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSlotMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSlotMutation, { data, loading, error }] = useDeleteSlotMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteSlotMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteSlotMutation, DeleteSlotMutationVariables>,
) {
  return Apollo.useMutation<DeleteSlotMutation, DeleteSlotMutationVariables>(
    DeleteSlotDocument,
    baseOptions,
  )
}
export type DeleteSlotMutationHookResult = ReturnType<typeof useDeleteSlotMutation>
export type DeleteSlotMutationResult = Apollo.MutationResult<DeleteSlotMutation>
export type DeleteSlotMutationOptions = Apollo.BaseMutationOptions<
  DeleteSlotMutation,
  DeleteSlotMutationVariables
>
export const UpdateSlotDocument = gql`
  mutation UpdateSlot($id: UUID!, $patch: SlotPatch!) {
    updateSlot(input: { id: $id, patch: $patch }) {
      slot {
        id
        name
        status
      }
    }
  }
`
export type UpdateSlotMutationFn = Apollo.MutationFunction<
  UpdateSlotMutation,
  UpdateSlotMutationVariables
>

/**
 * __useUpdateSlotMutation__
 *
 * To run a mutation, you first call `useUpdateSlotMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSlotMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSlotMutation, { data, loading, error }] = useUpdateSlotMutation({
 *   variables: {
 *      id: // value for 'id'
 *      patch: // value for 'patch'
 *   },
 * });
 */
export function useUpdateSlotMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateSlotMutation, UpdateSlotMutationVariables>,
) {
  return Apollo.useMutation<UpdateSlotMutation, UpdateSlotMutationVariables>(
    UpdateSlotDocument,
    baseOptions,
  )
}
export type UpdateSlotMutationHookResult = ReturnType<typeof useUpdateSlotMutation>
export type UpdateSlotMutationResult = Apollo.MutationResult<UpdateSlotMutation>
export type UpdateSlotMutationOptions = Apollo.BaseMutationOptions<
  UpdateSlotMutation,
  UpdateSlotMutationVariables
>
export const CreateTranslationDocument = gql`
  mutation CreateTranslation($payload: CreateTranslationInput!) {
    createTranslation(input: $payload) {
      translation {
        key
      }
    }
  }
`
export type CreateTranslationMutationFn = Apollo.MutationFunction<
  CreateTranslationMutation,
  CreateTranslationMutationVariables
>

/**
 * __useCreateTranslationMutation__
 *
 * To run a mutation, you first call `useCreateTranslationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTranslationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTranslationMutation, { data, loading, error }] = useCreateTranslationMutation({
 *   variables: {
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useCreateTranslationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateTranslationMutation,
    CreateTranslationMutationVariables
  >,
) {
  return Apollo.useMutation<CreateTranslationMutation, CreateTranslationMutationVariables>(
    CreateTranslationDocument,
    baseOptions,
  )
}
export type CreateTranslationMutationHookResult = ReturnType<typeof useCreateTranslationMutation>
export type CreateTranslationMutationResult = Apollo.MutationResult<CreateTranslationMutation>
export type CreateTranslationMutationOptions = Apollo.BaseMutationOptions<
  CreateTranslationMutation,
  CreateTranslationMutationVariables
>
export const UpdateTranslationDocument = gql`
  mutation UpdateTranslation($payload: UpdateTranslationInput!) {
    updateTranslation(input: $payload) {
      translation {
        key
        translation
      }
    }
  }
`
export type UpdateTranslationMutationFn = Apollo.MutationFunction<
  UpdateTranslationMutation,
  UpdateTranslationMutationVariables
>

/**
 * __useUpdateTranslationMutation__
 *
 * To run a mutation, you first call `useUpdateTranslationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTranslationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTranslationMutation, { data, loading, error }] = useUpdateTranslationMutation({
 *   variables: {
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useUpdateTranslationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateTranslationMutation,
    UpdateTranslationMutationVariables
  >,
) {
  return Apollo.useMutation<UpdateTranslationMutation, UpdateTranslationMutationVariables>(
    UpdateTranslationDocument,
    baseOptions,
  )
}
export type UpdateTranslationMutationHookResult = ReturnType<typeof useUpdateTranslationMutation>
export type UpdateTranslationMutationResult = Apollo.MutationResult<UpdateTranslationMutation>
export type UpdateTranslationMutationOptions = Apollo.BaseMutationOptions<
  UpdateTranslationMutation,
  UpdateTranslationMutationVariables
>
export const CreateVehicleDocument = gql`
  mutation CreateVehicle($payload: CreateVehicleInput!) {
    createVehicle(input: $payload) {
      vehicle {
        id
        status
        ownerId
        licensePlate
        vehicleTypeId
      }
    }
  }
`
export type CreateVehicleMutationFn = Apollo.MutationFunction<
  CreateVehicleMutation,
  CreateVehicleMutationVariables
>

/**
 * __useCreateVehicleMutation__
 *
 * To run a mutation, you first call `useCreateVehicleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateVehicleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createVehicleMutation, { data, loading, error }] = useCreateVehicleMutation({
 *   variables: {
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useCreateVehicleMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateVehicleMutation, CreateVehicleMutationVariables>,
) {
  return Apollo.useMutation<CreateVehicleMutation, CreateVehicleMutationVariables>(
    CreateVehicleDocument,
    baseOptions,
  )
}
export type CreateVehicleMutationHookResult = ReturnType<typeof useCreateVehicleMutation>
export type CreateVehicleMutationResult = Apollo.MutationResult<CreateVehicleMutation>
export type CreateVehicleMutationOptions = Apollo.BaseMutationOptions<
  CreateVehicleMutation,
  CreateVehicleMutationVariables
>
export const DeleteVehicleDocument = gql`
  mutation DeleteVehicle($id: UUID!) {
    deleteVehicle(input: { id: $id }) {
      deletedVehicleNodeId
    }
  }
`
export type DeleteVehicleMutationFn = Apollo.MutationFunction<
  DeleteVehicleMutation,
  DeleteVehicleMutationVariables
>

/**
 * __useDeleteVehicleMutation__
 *
 * To run a mutation, you first call `useDeleteVehicleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteVehicleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteVehicleMutation, { data, loading, error }] = useDeleteVehicleMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteVehicleMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteVehicleMutation, DeleteVehicleMutationVariables>,
) {
  return Apollo.useMutation<DeleteVehicleMutation, DeleteVehicleMutationVariables>(
    DeleteVehicleDocument,
    baseOptions,
  )
}
export type DeleteVehicleMutationHookResult = ReturnType<typeof useDeleteVehicleMutation>
export type DeleteVehicleMutationResult = Apollo.MutationResult<DeleteVehicleMutation>
export type DeleteVehicleMutationOptions = Apollo.BaseMutationOptions<
  DeleteVehicleMutation,
  DeleteVehicleMutationVariables
>
export const UpdateVehicleDocument = gql`
  mutation UpdateVehicle($id: UUID!, $patch: VehiclePatch!) {
    updateVehicle(input: { id: $id, patch: $patch }) {
      vehicle {
        id
        name
        status
        ownerId
        licensePlate
        vehicleTypeId
      }
    }
  }
`
export type UpdateVehicleMutationFn = Apollo.MutationFunction<
  UpdateVehicleMutation,
  UpdateVehicleMutationVariables
>

/**
 * __useUpdateVehicleMutation__
 *
 * To run a mutation, you first call `useUpdateVehicleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateVehicleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateVehicleMutation, { data, loading, error }] = useUpdateVehicleMutation({
 *   variables: {
 *      id: // value for 'id'
 *      patch: // value for 'patch'
 *   },
 * });
 */
export function useUpdateVehicleMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateVehicleMutation, UpdateVehicleMutationVariables>,
) {
  return Apollo.useMutation<UpdateVehicleMutation, UpdateVehicleMutationVariables>(
    UpdateVehicleDocument,
    baseOptions,
  )
}
export type UpdateVehicleMutationHookResult = ReturnType<typeof useUpdateVehicleMutation>
export type UpdateVehicleMutationResult = Apollo.MutationResult<UpdateVehicleMutation>
export type UpdateVehicleMutationOptions = Apollo.BaseMutationOptions<
  UpdateVehicleMutation,
  UpdateVehicleMutationVariables
>
export const ListAmenitiesDocument = gql`
  query ListAmenities {
    amenitiesList(filter: { slug: { notIn: ["business", "private"] } }) {
      id
      name
      status
      slug
    }
    categoriesList: amenitiesList(filter: { slug: { in: ["business", "private"] } }) {
      id
      name
      status
      slug
    }
  }
`

/**
 * __useListAmenitiesQuery__
 *
 * To run a query within a React component, call `useListAmenitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useListAmenitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListAmenitiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useListAmenitiesQuery(
  baseOptions?: Apollo.QueryHookOptions<ListAmenitiesQuery, ListAmenitiesQueryVariables>,
) {
  return Apollo.useQuery<ListAmenitiesQuery, ListAmenitiesQueryVariables>(
    ListAmenitiesDocument,
    baseOptions,
  )
}
export function useListAmenitiesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ListAmenitiesQuery, ListAmenitiesQueryVariables>,
) {
  return Apollo.useLazyQuery<ListAmenitiesQuery, ListAmenitiesQueryVariables>(
    ListAmenitiesDocument,
    baseOptions,
  )
}
export type ListAmenitiesQueryHookResult = ReturnType<typeof useListAmenitiesQuery>
export type ListAmenitiesLazyQueryHookResult = ReturnType<typeof useListAmenitiesLazyQuery>
export type ListAmenitiesQueryResult = Apollo.QueryResult<
  ListAmenitiesQuery,
  ListAmenitiesQueryVariables
>
export const BookingsListDocument = gql`
  query BookingsList {
    slotBookingsList(orderBy: CREATED_AT_DESC) {
      ...CommonBookingFields
    }
  }
  ${CommonBookingFieldsFragmentDoc}
`

/**
 * __useBookingsListQuery__
 *
 * To run a query within a React component, call `useBookingsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useBookingsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBookingsListQuery({
 *   variables: {
 *   },
 * });
 */
export function useBookingsListQuery(
  baseOptions?: Apollo.QueryHookOptions<BookingsListQuery, BookingsListQueryVariables>,
) {
  return Apollo.useQuery<BookingsListQuery, BookingsListQueryVariables>(
    BookingsListDocument,
    baseOptions,
  )
}
export function useBookingsListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<BookingsListQuery, BookingsListQueryVariables>,
) {
  return Apollo.useLazyQuery<BookingsListQuery, BookingsListQueryVariables>(
    BookingsListDocument,
    baseOptions,
  )
}
export type BookingsListQueryHookResult = ReturnType<typeof useBookingsListQuery>
export type BookingsListLazyQueryHookResult = ReturnType<typeof useBookingsListLazyQuery>
export type BookingsListQueryResult = Apollo.QueryResult<
  BookingsListQuery,
  BookingsListQueryVariables
>
export const FindBusinessDocument = gql`
  query FindBusiness($payload: FindBusinessInputRecordInput!) {
    findBusinessList(payload: $payload) {
      id
      name
      description
      photoUrl
      markerUrl
      ownerId
      address
      location {
        longitude
        latitude
      }
    }
  }
`

/**
 * __useFindBusinessQuery__
 *
 * To run a query within a React component, call `useFindBusinessQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindBusinessQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindBusinessQuery({
 *   variables: {
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useFindBusinessQuery(
  baseOptions?: Apollo.QueryHookOptions<FindBusinessQuery, FindBusinessQueryVariables>,
) {
  return Apollo.useQuery<FindBusinessQuery, FindBusinessQueryVariables>(
    FindBusinessDocument,
    baseOptions,
  )
}
export function useFindBusinessLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FindBusinessQuery, FindBusinessQueryVariables>,
) {
  return Apollo.useLazyQuery<FindBusinessQuery, FindBusinessQueryVariables>(
    FindBusinessDocument,
    baseOptions,
  )
}
export type FindBusinessQueryHookResult = ReturnType<typeof useFindBusinessQuery>
export type FindBusinessLazyQueryHookResult = ReturnType<typeof useFindBusinessLazyQuery>
export type FindBusinessQueryResult = Apollo.QueryResult<
  FindBusinessQuery,
  FindBusinessQueryVariables
>
export const MyParkingSpacesListDocument = gql`
  query MyParkingSpacesList($ownerId: UUID!) {
    parkingSpacesList(condition: { ownerId: $ownerId }, orderBy: NAME_ASC) {
      id
      status
      name
    }
  }
`

/**
 * __useMyParkingSpacesListQuery__
 *
 * To run a query within a React component, call `useMyParkingSpacesListQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyParkingSpacesListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyParkingSpacesListQuery({
 *   variables: {
 *      ownerId: // value for 'ownerId'
 *   },
 * });
 */
export function useMyParkingSpacesListQuery(
  baseOptions?: Apollo.QueryHookOptions<
    MyParkingSpacesListQuery,
    MyParkingSpacesListQueryVariables
  >,
) {
  return Apollo.useQuery<MyParkingSpacesListQuery, MyParkingSpacesListQueryVariables>(
    MyParkingSpacesListDocument,
    baseOptions,
  )
}
export function useMyParkingSpacesListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    MyParkingSpacesListQuery,
    MyParkingSpacesListQueryVariables
  >,
) {
  return Apollo.useLazyQuery<MyParkingSpacesListQuery, MyParkingSpacesListQueryVariables>(
    MyParkingSpacesListDocument,
    baseOptions,
  )
}
export type MyParkingSpacesListQueryHookResult = ReturnType<typeof useMyParkingSpacesListQuery>
export type MyParkingSpacesListLazyQueryHookResult = ReturnType<
  typeof useMyParkingSpacesListLazyQuery
>
export type MyParkingSpacesListQueryResult = Apollo.QueryResult<
  MyParkingSpacesListQuery,
  MyParkingSpacesListQueryVariables
>
export const ManageSpaceDocument = gql`
  query ManageSpace($id: UUID!) {
    parkingSpace(id: $id) {
      id
      ownerId
      name
      description
      photoUrl
      address
      location {
        latitude
        longitude
      }
      carEntry {
        x
        y
      }
      carExit {
        x
        y
      }
      companyEntrance {
        x
        y
      }
      parkingspaceMapview {
        geojson
      }
      languageCode
      floor
      category
      status
      accessRestriction
      businessStatusReason
      parkingSpaceAvailabilitiesList {
        fromDate
        toDate
        defaultFlag
        closedFlag
        parkingWorkingHoursList {
          dayOfWeek
          fromTime
          toTime
        }
        parkingOpenHoursList {
          dayOfWeek
          fromTime
          toTime
          price
          currency
        }
      }
    }
  }
`

/**
 * __useManageSpaceQuery__
 *
 * To run a query within a React component, call `useManageSpaceQuery` and pass it any options that fit your needs.
 * When your component renders, `useManageSpaceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useManageSpaceQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useManageSpaceQuery(
  baseOptions?: Apollo.QueryHookOptions<ManageSpaceQuery, ManageSpaceQueryVariables>,
) {
  return Apollo.useQuery<ManageSpaceQuery, ManageSpaceQueryVariables>(
    ManageSpaceDocument,
    baseOptions,
  )
}
export function useManageSpaceLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ManageSpaceQuery, ManageSpaceQueryVariables>,
) {
  return Apollo.useLazyQuery<ManageSpaceQuery, ManageSpaceQueryVariables>(
    ManageSpaceDocument,
    baseOptions,
  )
}
export type ManageSpaceQueryHookResult = ReturnType<typeof useManageSpaceQuery>
export type ManageSpaceLazyQueryHookResult = ReturnType<typeof useManageSpaceLazyQuery>
export type ManageSpaceQueryResult = Apollo.QueryResult<ManageSpaceQuery, ManageSpaceQueryVariables>
export const SpaceByIdDocument = gql`
  query SpaceById($id: UUID!) {
    parkingSpace(id: $id) {
      id
      name
      description
      photoUrl
      status
      ownerId
      address
      location {
        longitude
        latitude
      }
      parkingSpaceAvailabilitiesList {
        id
        parkingSpaceId
        fromDate
        toDate
        defaultFlag
        closedFlag
        parkingWorkingHoursList {
          dayOfWeek
          fromTime
          toTime
        }
        parkingOpenHoursList {
          dayOfWeek
          fromTime
          toTime
          price
          currency
        }
      }
    }
  }
`

/**
 * __useSpaceByIdQuery__
 *
 * To run a query within a React component, call `useSpaceByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useSpaceByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpaceByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSpaceByIdQuery(
  baseOptions?: Apollo.QueryHookOptions<SpaceByIdQuery, SpaceByIdQueryVariables>,
) {
  return Apollo.useQuery<SpaceByIdQuery, SpaceByIdQueryVariables>(SpaceByIdDocument, baseOptions)
}
export function useSpaceByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SpaceByIdQuery, SpaceByIdQueryVariables>,
) {
  return Apollo.useLazyQuery<SpaceByIdQuery, SpaceByIdQueryVariables>(
    SpaceByIdDocument,
    baseOptions,
  )
}
export type SpaceByIdQueryHookResult = ReturnType<typeof useSpaceByIdQuery>
export type SpaceByIdLazyQueryHookResult = ReturnType<typeof useSpaceByIdLazyQuery>
export type SpaceByIdQueryResult = Apollo.QueryResult<SpaceByIdQuery, SpaceByIdQueryVariables>
export const SpacesByOwnerDocument = gql`
  query SpacesByOwner($ownerId: UUID!, $timeForBookingCheck: Datetime!, $offset: Int, $first: Int) {
    parkingSpace(id: $ownerId) {
      id
    }
  }
`

/**
 * __useSpacesByOwnerQuery__
 *
 * To run a query within a React component, call `useSpacesByOwnerQuery` and pass it any options that fit your needs.
 * When your component renders, `useSpacesByOwnerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpacesByOwnerQuery({
 *   variables: {
 *      ownerId: // value for 'ownerId'
 *      timeForBookingCheck: // value for 'timeForBookingCheck'
 *      offset: // value for 'offset'
 *      first: // value for 'first'
 *   },
 * });
 */
export function useSpacesByOwnerQuery(
  baseOptions?: Apollo.QueryHookOptions<SpacesByOwnerQuery, SpacesByOwnerQueryVariables>,
) {
  return Apollo.useQuery<SpacesByOwnerQuery, SpacesByOwnerQueryVariables>(
    SpacesByOwnerDocument,
    baseOptions,
  )
}
export function useSpacesByOwnerLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SpacesByOwnerQuery, SpacesByOwnerQueryVariables>,
) {
  return Apollo.useLazyQuery<SpacesByOwnerQuery, SpacesByOwnerQueryVariables>(
    SpacesByOwnerDocument,
    baseOptions,
  )
}
export type SpacesByOwnerQueryHookResult = ReturnType<typeof useSpacesByOwnerQuery>
export type SpacesByOwnerLazyQueryHookResult = ReturnType<typeof useSpacesByOwnerLazyQuery>
export type SpacesByOwnerQueryResult = Apollo.QueryResult<
  SpacesByOwnerQuery,
  SpacesByOwnerQueryVariables
>
export const SpacesListDocument = gql`
  query SpacesList {
    parkingSpacesList(orderBy: CREATED_AT_DESC) {
      ...CommonSpaceFields
    }
  }
  ${CommonSpaceFieldsFragmentDoc}
`

/**
 * __useSpacesListQuery__
 *
 * To run a query within a React component, call `useSpacesListQuery` and pass it any options that fit your needs.
 * When your component renders, `useSpacesListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpacesListQuery({
 *   variables: {
 *   },
 * });
 */
export function useSpacesListQuery(
  baseOptions?: Apollo.QueryHookOptions<SpacesListQuery, SpacesListQueryVariables>,
) {
  return Apollo.useQuery<SpacesListQuery, SpacesListQueryVariables>(SpacesListDocument, baseOptions)
}
export function useSpacesListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SpacesListQuery, SpacesListQueryVariables>,
) {
  return Apollo.useLazyQuery<SpacesListQuery, SpacesListQueryVariables>(
    SpacesListDocument,
    baseOptions,
  )
}
export type SpacesListQueryHookResult = ReturnType<typeof useSpacesListQuery>
export type SpacesListLazyQueryHookResult = ReturnType<typeof useSpacesListLazyQuery>
export type SpacesListQueryResult = Apollo.QueryResult<SpacesListQuery, SpacesListQueryVariables>
export const SpacesListByOwnerDocument = gql`
  query SpacesListByOwner(
    $ownerId: UUID!
    $timeForBookingCheck: Datetime!
    $offset: Int
    $first: Int
  ) {
    parkingSpacesList(
      orderBy: CREATED_AT_DESC
      offset: $offset
      first: $first
      condition: { ownerId: $ownerId }
    ) {
      ...CommonSpaceFields
    }
  }
  ${CommonSpaceFieldsFragmentDoc}
`

/**
 * __useSpacesListByOwnerQuery__
 *
 * To run a query within a React component, call `useSpacesListByOwnerQuery` and pass it any options that fit your needs.
 * When your component renders, `useSpacesListByOwnerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpacesListByOwnerQuery({
 *   variables: {
 *      ownerId: // value for 'ownerId'
 *      timeForBookingCheck: // value for 'timeForBookingCheck'
 *      offset: // value for 'offset'
 *      first: // value for 'first'
 *   },
 * });
 */
export function useSpacesListByOwnerQuery(
  baseOptions?: Apollo.QueryHookOptions<SpacesListByOwnerQuery, SpacesListByOwnerQueryVariables>,
) {
  return Apollo.useQuery<SpacesListByOwnerQuery, SpacesListByOwnerQueryVariables>(
    SpacesListByOwnerDocument,
    baseOptions,
  )
}
export function useSpacesListByOwnerLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SpacesListByOwnerQuery,
    SpacesListByOwnerQueryVariables
  >,
) {
  return Apollo.useLazyQuery<SpacesListByOwnerQuery, SpacesListByOwnerQueryVariables>(
    SpacesListByOwnerDocument,
    baseOptions,
  )
}
export type SpacesListByOwnerQueryHookResult = ReturnType<typeof useSpacesListByOwnerQuery>
export type SpacesListByOwnerLazyQueryHookResult = ReturnType<typeof useSpacesListByOwnerLazyQuery>
export type SpacesListByOwnerQueryResult = Apollo.QueryResult<
  SpacesListByOwnerQuery,
  SpacesListByOwnerQueryVariables
>
export const FindSlotsDocument = gql`
  query FindSlots(
    $latitude: BigFloat!
    $longitude: BigFloat!
    $startTime: Datetime
    $endTime: Datetime
    $distance: Int
    $ownerId: UUID
    $totalLimit: Int
    $slotAmenities: [UUID]
    $vehicleSizes: [UUID]
  ) {
    findSlotsList(
      payload: {
        latitude: $latitude
        longitude: $longitude
        startTime: $startTime
        endTime: $endTime
        distance: $distance
        ownerId: $ownerId
        totalLimit: $totalLimit
        slotAmenities: $slotAmenities
        vehicleSizes: $vehicleSizes
      }
    ) {
      id
      status
      inWorkingHours
      inAmenities
      booked
      parkingSpaceId
      location {
        longitude: x
        latitude: y
      }
    }
  }
`

/**
 * __useFindSlotsQuery__
 *
 * To run a query within a React component, call `useFindSlotsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindSlotsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindSlotsQuery({
 *   variables: {
 *      latitude: // value for 'latitude'
 *      longitude: // value for 'longitude'
 *      startTime: // value for 'startTime'
 *      endTime: // value for 'endTime'
 *      distance: // value for 'distance'
 *      ownerId: // value for 'ownerId'
 *      totalLimit: // value for 'totalLimit'
 *      slotAmenities: // value for 'slotAmenities'
 *      vehicleSizes: // value for 'vehicleSizes'
 *   },
 * });
 */
export function useFindSlotsQuery(
  baseOptions?: Apollo.QueryHookOptions<FindSlotsQuery, FindSlotsQueryVariables>,
) {
  return Apollo.useQuery<FindSlotsQuery, FindSlotsQueryVariables>(FindSlotsDocument, baseOptions)
}
export function useFindSlotsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FindSlotsQuery, FindSlotsQueryVariables>,
) {
  return Apollo.useLazyQuery<FindSlotsQuery, FindSlotsQueryVariables>(
    FindSlotsDocument,
    baseOptions,
  )
}
export type FindSlotsQueryHookResult = ReturnType<typeof useFindSlotsQuery>
export type FindSlotsLazyQueryHookResult = ReturnType<typeof useFindSlotsLazyQuery>
export type FindSlotsQueryResult = Apollo.QueryResult<FindSlotsQuery, FindSlotsQueryVariables>
export const ManageSlotDocument = gql`
  query ManageSlot($id: UUID!) {
    slot(id: $id) {
      id
      name
      notes
      timezone
      accessRestrictions
      category
      level
      status
      slotAmenitiesList {
        amenityId
      }
      slotAvailabilitiesList {
        id
        dayOfWeek
        startHour
        endHour
      }
      description
      pricePerHour
      owner {
        id
        name
        email
      }
      status
      photoUrl
      address
      vehicleSizeId
      location {
        longitude: x
        latitude: y
      }
      verificationStatus
      parkingSpaceId
      businessStatusReason
      shape {
        geojson
      }
      tempUnavailable
      tempUnavailableFrom
      tempUnavailableTo
      waypoints
    }
  }
`

/**
 * __useManageSlotQuery__
 *
 * To run a query within a React component, call `useManageSlotQuery` and pass it any options that fit your needs.
 * When your component renders, `useManageSlotQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useManageSlotQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useManageSlotQuery(
  baseOptions?: Apollo.QueryHookOptions<ManageSlotQuery, ManageSlotQueryVariables>,
) {
  return Apollo.useQuery<ManageSlotQuery, ManageSlotQueryVariables>(ManageSlotDocument, baseOptions)
}
export function useManageSlotLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ManageSlotQuery, ManageSlotQueryVariables>,
) {
  return Apollo.useLazyQuery<ManageSlotQuery, ManageSlotQueryVariables>(
    ManageSlotDocument,
    baseOptions,
  )
}
export type ManageSlotQueryHookResult = ReturnType<typeof useManageSlotQuery>
export type ManageSlotLazyQueryHookResult = ReturnType<typeof useManageSlotLazyQuery>
export type ManageSlotQueryResult = Apollo.QueryResult<ManageSlotQuery, ManageSlotQueryVariables>
export const SlotBookingTimesListDocument = gql`
  query SlotBookingTimesList($payload: SlotBookingTimesInputRecordInput!) {
    slotBookingTimesList(payload: $payload) {
      slotId
      startTime
      endTime
    }
  }
`

/**
 * __useSlotBookingTimesListQuery__
 *
 * To run a query within a React component, call `useSlotBookingTimesListQuery` and pass it any options that fit your needs.
 * When your component renders, `useSlotBookingTimesListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSlotBookingTimesListQuery({
 *   variables: {
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useSlotBookingTimesListQuery(
  baseOptions?: Apollo.QueryHookOptions<
    SlotBookingTimesListQuery,
    SlotBookingTimesListQueryVariables
  >,
) {
  return Apollo.useQuery<SlotBookingTimesListQuery, SlotBookingTimesListQueryVariables>(
    SlotBookingTimesListDocument,
    baseOptions,
  )
}
export function useSlotBookingTimesListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SlotBookingTimesListQuery,
    SlotBookingTimesListQueryVariables
  >,
) {
  return Apollo.useLazyQuery<SlotBookingTimesListQuery, SlotBookingTimesListQueryVariables>(
    SlotBookingTimesListDocument,
    baseOptions,
  )
}
export type SlotBookingTimesListQueryHookResult = ReturnType<typeof useSlotBookingTimesListQuery>
export type SlotBookingTimesListLazyQueryHookResult = ReturnType<
  typeof useSlotBookingTimesListLazyQuery
>
export type SlotBookingTimesListQueryResult = Apollo.QueryResult<
  SlotBookingTimesListQuery,
  SlotBookingTimesListQueryVariables
>
export const SlotByIdDocument = gql`
  query SlotById($id: UUID!) {
    slot(id: $id) {
      id
      name
      description
      notes
      pricePerHour
      photoUrl
      status
      ownerId
      address
      location {
        longitude: x
        latitude: y
      }
      slotAmenitiesList {
        id
        amenity {
          id
          name
          description
          slug
        }
      }
      slotAvailabilitiesList {
        dayOfWeek
        startHour
        endHour
      }
    }
  }
`

/**
 * __useSlotByIdQuery__
 *
 * To run a query within a React component, call `useSlotByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useSlotByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSlotByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSlotByIdQuery(
  baseOptions?: Apollo.QueryHookOptions<SlotByIdQuery, SlotByIdQueryVariables>,
) {
  return Apollo.useQuery<SlotByIdQuery, SlotByIdQueryVariables>(SlotByIdDocument, baseOptions)
}
export function useSlotByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SlotByIdQuery, SlotByIdQueryVariables>,
) {
  return Apollo.useLazyQuery<SlotByIdQuery, SlotByIdQueryVariables>(SlotByIdDocument, baseOptions)
}
export type SlotByIdQueryHookResult = ReturnType<typeof useSlotByIdQuery>
export type SlotByIdLazyQueryHookResult = ReturnType<typeof useSlotByIdLazyQuery>
export type SlotByIdQueryResult = Apollo.QueryResult<SlotByIdQuery, SlotByIdQueryVariables>
export const SlotsAvailabilityByIdDocument = gql`
  query SlotsAvailabilityById($slotId: UUID!) {
    slot(id: $slotId) {
      id
      name
      address
      location {
        longitude: x
        latitude: y
      }
      pricePerHour
      ...AvailabilitySlotFields
    }
  }
  ${AvailabilitySlotFieldsFragmentDoc}
`

/**
 * __useSlotsAvailabilityByIdQuery__
 *
 * To run a query within a React component, call `useSlotsAvailabilityByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useSlotsAvailabilityByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSlotsAvailabilityByIdQuery({
 *   variables: {
 *      slotId: // value for 'slotId'
 *   },
 * });
 */
export function useSlotsAvailabilityByIdQuery(
  baseOptions?: Apollo.QueryHookOptions<
    SlotsAvailabilityByIdQuery,
    SlotsAvailabilityByIdQueryVariables
  >,
) {
  return Apollo.useQuery<SlotsAvailabilityByIdQuery, SlotsAvailabilityByIdQueryVariables>(
    SlotsAvailabilityByIdDocument,
    baseOptions,
  )
}
export function useSlotsAvailabilityByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SlotsAvailabilityByIdQuery,
    SlotsAvailabilityByIdQueryVariables
  >,
) {
  return Apollo.useLazyQuery<SlotsAvailabilityByIdQuery, SlotsAvailabilityByIdQueryVariables>(
    SlotsAvailabilityByIdDocument,
    baseOptions,
  )
}
export type SlotsAvailabilityByIdQueryHookResult = ReturnType<typeof useSlotsAvailabilityByIdQuery>
export type SlotsAvailabilityByIdLazyQueryHookResult = ReturnType<
  typeof useSlotsAvailabilityByIdLazyQuery
>
export type SlotsAvailabilityByIdQueryResult = Apollo.QueryResult<
  SlotsAvailabilityByIdQuery,
  SlotsAvailabilityByIdQueryVariables
>
export const SlotsByOwnerDocument = gql`
  query SlotsByOwner($ownerId: UUID!, $timeForBookingCheck: Datetime!, $offset: Int, $first: Int) {
    slots(
      orderBy: CREATED_AT_DESC
      offset: $offset
      first: $first
      condition: { ownerId: $ownerId }
    ) {
      nodes {
        ...CommonSlotFields
        slotBookingsList(
          filter: {
            and: {
              startTime: { lessThan: $timeForBookingCheck }
              endTime: { greaterThan: $timeForBookingCheck }
              status: { notEqualTo: CANCELED }
            }
          }
          first: 1
        ) {
          id
          phone
          startTime
          endTime
          licensePlate
          status
          user {
            id
            name
          }
        }
      }
      totalCount
    }
  }
  ${CommonSlotFieldsFragmentDoc}
`

/**
 * __useSlotsByOwnerQuery__
 *
 * To run a query within a React component, call `useSlotsByOwnerQuery` and pass it any options that fit your needs.
 * When your component renders, `useSlotsByOwnerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSlotsByOwnerQuery({
 *   variables: {
 *      ownerId: // value for 'ownerId'
 *      timeForBookingCheck: // value for 'timeForBookingCheck'
 *      offset: // value for 'offset'
 *      first: // value for 'first'
 *   },
 * });
 */
export function useSlotsByOwnerQuery(
  baseOptions?: Apollo.QueryHookOptions<SlotsByOwnerQuery, SlotsByOwnerQueryVariables>,
) {
  return Apollo.useQuery<SlotsByOwnerQuery, SlotsByOwnerQueryVariables>(
    SlotsByOwnerDocument,
    baseOptions,
  )
}
export function useSlotsByOwnerLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SlotsByOwnerQuery, SlotsByOwnerQueryVariables>,
) {
  return Apollo.useLazyQuery<SlotsByOwnerQuery, SlotsByOwnerQueryVariables>(
    SlotsByOwnerDocument,
    baseOptions,
  )
}
export type SlotsByOwnerQueryHookResult = ReturnType<typeof useSlotsByOwnerQuery>
export type SlotsByOwnerLazyQueryHookResult = ReturnType<typeof useSlotsByOwnerLazyQuery>
export type SlotsByOwnerQueryResult = Apollo.QueryResult<
  SlotsByOwnerQuery,
  SlotsByOwnerQueryVariables
>
export const SlotsListDocument = gql`
  query SlotsList {
    slotsList(orderBy: CREATED_AT_DESC) {
      ...CommonSlotFields
    }
  }
  ${CommonSlotFieldsFragmentDoc}
`

/**
 * __useSlotsListQuery__
 *
 * To run a query within a React component, call `useSlotsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useSlotsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSlotsListQuery({
 *   variables: {
 *   },
 * });
 */
export function useSlotsListQuery(
  baseOptions?: Apollo.QueryHookOptions<SlotsListQuery, SlotsListQueryVariables>,
) {
  return Apollo.useQuery<SlotsListQuery, SlotsListQueryVariables>(SlotsListDocument, baseOptions)
}
export function useSlotsListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SlotsListQuery, SlotsListQueryVariables>,
) {
  return Apollo.useLazyQuery<SlotsListQuery, SlotsListQueryVariables>(
    SlotsListDocument,
    baseOptions,
  )
}
export type SlotsListQueryHookResult = ReturnType<typeof useSlotsListQuery>
export type SlotsListLazyQueryHookResult = ReturnType<typeof useSlotsListLazyQuery>
export type SlotsListQueryResult = Apollo.QueryResult<SlotsListQuery, SlotsListQueryVariables>
export const SlotsListByOwnerDocument = gql`
  query SlotsListByOwner(
    $ownerId: UUID!
    $timeForBookingCheck: Datetime!
    $offset: Int
    $first: Int
  ) {
    slotsList(
      orderBy: CREATED_AT_DESC
      offset: $offset
      first: $first
      condition: { ownerId: $ownerId }
    ) {
      ...CommonSlotFields
      slotBookingsList(
        filter: {
          and: {
            startTime: { lessThan: $timeForBookingCheck }
            endTime: { greaterThan: $timeForBookingCheck }
            status: { notEqualTo: CANCELED }
          }
        }
        first: 1
      ) {
        id
        phone
        startTime
        endTime
        licensePlate
        status
        user {
          id
          name
        }
      }
    }
  }
  ${CommonSlotFieldsFragmentDoc}
`

/**
 * __useSlotsListByOwnerQuery__
 *
 * To run a query within a React component, call `useSlotsListByOwnerQuery` and pass it any options that fit your needs.
 * When your component renders, `useSlotsListByOwnerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSlotsListByOwnerQuery({
 *   variables: {
 *      ownerId: // value for 'ownerId'
 *      timeForBookingCheck: // value for 'timeForBookingCheck'
 *      offset: // value for 'offset'
 *      first: // value for 'first'
 *   },
 * });
 */
export function useSlotsListByOwnerQuery(
  baseOptions?: Apollo.QueryHookOptions<SlotsListByOwnerQuery, SlotsListByOwnerQueryVariables>,
) {
  return Apollo.useQuery<SlotsListByOwnerQuery, SlotsListByOwnerQueryVariables>(
    SlotsListByOwnerDocument,
    baseOptions,
  )
}
export function useSlotsListByOwnerLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SlotsListByOwnerQuery, SlotsListByOwnerQueryVariables>,
) {
  return Apollo.useLazyQuery<SlotsListByOwnerQuery, SlotsListByOwnerQueryVariables>(
    SlotsListByOwnerDocument,
    baseOptions,
  )
}
export type SlotsListByOwnerQueryHookResult = ReturnType<typeof useSlotsListByOwnerQuery>
export type SlotsListByOwnerLazyQueryHookResult = ReturnType<typeof useSlotsListByOwnerLazyQuery>
export type SlotsListByOwnerQueryResult = Apollo.QueryResult<
  SlotsListByOwnerQuery,
  SlotsListByOwnerQueryVariables
>
export const TranslationsListDocument = gql`
  query TranslationsList($lang: String!) {
    translations: translationsList(condition: { lang: $lang }) {
      lang
      namespace
      key
      translation
    }
  }
`

/**
 * __useTranslationsListQuery__
 *
 * To run a query within a React component, call `useTranslationsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useTranslationsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTranslationsListQuery({
 *   variables: {
 *      lang: // value for 'lang'
 *   },
 * });
 */
export function useTranslationsListQuery(
  baseOptions?: Apollo.QueryHookOptions<TranslationsListQuery, TranslationsListQueryVariables>,
) {
  return Apollo.useQuery<TranslationsListQuery, TranslationsListQueryVariables>(
    TranslationsListDocument,
    baseOptions,
  )
}
export function useTranslationsListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<TranslationsListQuery, TranslationsListQueryVariables>,
) {
  return Apollo.useLazyQuery<TranslationsListQuery, TranslationsListQueryVariables>(
    TranslationsListDocument,
    baseOptions,
  )
}
export type TranslationsListQueryHookResult = ReturnType<typeof useTranslationsListQuery>
export type TranslationsListLazyQueryHookResult = ReturnType<typeof useTranslationsListLazyQuery>
export type TranslationsListQueryResult = Apollo.QueryResult<
  TranslationsListQuery,
  TranslationsListQueryVariables
>
export const CurrentUserDocument = gql`
  query CurrentUser {
    currentUser: me
  }
`

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(
  baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>,
) {
  return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(
    CurrentUserDocument,
    baseOptions,
  )
}
export function useCurrentUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>,
) {
  return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(
    CurrentUserDocument,
    baseOptions,
  )
}
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>
export const EmailAvailableDocument = gql`
  query EmailAvailable($email: Email!) {
    emailAvailable(requestedEmail: $email)
  }
`

/**
 * __useEmailAvailableQuery__
 *
 * To run a query within a React component, call `useEmailAvailableQuery` and pass it any options that fit your needs.
 * When your component renders, `useEmailAvailableQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEmailAvailableQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useEmailAvailableQuery(
  baseOptions?: Apollo.QueryHookOptions<EmailAvailableQuery, EmailAvailableQueryVariables>,
) {
  return Apollo.useQuery<EmailAvailableQuery, EmailAvailableQueryVariables>(
    EmailAvailableDocument,
    baseOptions,
  )
}
export function useEmailAvailableLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<EmailAvailableQuery, EmailAvailableQueryVariables>,
) {
  return Apollo.useLazyQuery<EmailAvailableQuery, EmailAvailableQueryVariables>(
    EmailAvailableDocument,
    baseOptions,
  )
}
export type EmailAvailableQueryHookResult = ReturnType<typeof useEmailAvailableQuery>
export type EmailAvailableLazyQueryHookResult = ReturnType<typeof useEmailAvailableLazyQuery>
export type EmailAvailableQueryResult = Apollo.QueryResult<
  EmailAvailableQuery,
  EmailAvailableQueryVariables
>
export const UserPremiumDocument = gql`
  query userPremium($userId: UUID!) {
    userPremium(userId: $userId)
  }
`

/**
 * __useUserPremiumQuery__
 *
 * To run a query within a React component, call `useUserPremiumQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserPremiumQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserPremiumQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserPremiumQuery(
  baseOptions?: Apollo.QueryHookOptions<UserPremiumQuery, UserPremiumQueryVariables>,
) {
  return Apollo.useQuery<UserPremiumQuery, UserPremiumQueryVariables>(
    UserPremiumDocument,
    baseOptions,
  )
}
export function useUserPremiumLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserPremiumQuery, UserPremiumQueryVariables>,
) {
  return Apollo.useLazyQuery<UserPremiumQuery, UserPremiumQueryVariables>(
    UserPremiumDocument,
    baseOptions,
  )
}
export type UserPremiumQueryHookResult = ReturnType<typeof useUserPremiumQuery>
export type UserPremiumLazyQueryHookResult = ReturnType<typeof useUserPremiumLazyQuery>
export type UserPremiumQueryResult = Apollo.QueryResult<UserPremiumQuery, UserPremiumQueryVariables>
export const MyVehiclesListDocument = gql`
  query MyVehiclesList($ownerId: UUID!) {
    vehiclesList(condition: { ownerId: $ownerId }, orderBy: CREATED_AT_ASC) {
      id
      name
      status
      licensePlate
      vehicleTypeId
      vehicleSizeId
    }
  }
`

/**
 * __useMyVehiclesListQuery__
 *
 * To run a query within a React component, call `useMyVehiclesListQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyVehiclesListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyVehiclesListQuery({
 *   variables: {
 *      ownerId: // value for 'ownerId'
 *   },
 * });
 */
export function useMyVehiclesListQuery(
  baseOptions?: Apollo.QueryHookOptions<MyVehiclesListQuery, MyVehiclesListQueryVariables>,
) {
  return Apollo.useQuery<MyVehiclesListQuery, MyVehiclesListQueryVariables>(
    MyVehiclesListDocument,
    baseOptions,
  )
}
export function useMyVehiclesListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MyVehiclesListQuery, MyVehiclesListQueryVariables>,
) {
  return Apollo.useLazyQuery<MyVehiclesListQuery, MyVehiclesListQueryVariables>(
    MyVehiclesListDocument,
    baseOptions,
  )
}
export type MyVehiclesListQueryHookResult = ReturnType<typeof useMyVehiclesListQuery>
export type MyVehiclesListLazyQueryHookResult = ReturnType<typeof useMyVehiclesListLazyQuery>
export type MyVehiclesListQueryResult = Apollo.QueryResult<
  MyVehiclesListQuery,
  MyVehiclesListQueryVariables
>
export const VehicleSizesListDocument = gql`
  query VehicleSizesList {
    vehicleSizesList(orderBy: WEIGHT_ASC) {
      id
      name
      description
      status
    }
  }
`

/**
 * __useVehicleSizesListQuery__
 *
 * To run a query within a React component, call `useVehicleSizesListQuery` and pass it any options that fit your needs.
 * When your component renders, `useVehicleSizesListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVehicleSizesListQuery({
 *   variables: {
 *   },
 * });
 */
export function useVehicleSizesListQuery(
  baseOptions?: Apollo.QueryHookOptions<VehicleSizesListQuery, VehicleSizesListQueryVariables>,
) {
  return Apollo.useQuery<VehicleSizesListQuery, VehicleSizesListQueryVariables>(
    VehicleSizesListDocument,
    baseOptions,
  )
}
export function useVehicleSizesListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<VehicleSizesListQuery, VehicleSizesListQueryVariables>,
) {
  return Apollo.useLazyQuery<VehicleSizesListQuery, VehicleSizesListQueryVariables>(
    VehicleSizesListDocument,
    baseOptions,
  )
}
export type VehicleSizesListQueryHookResult = ReturnType<typeof useVehicleSizesListQuery>
export type VehicleSizesListLazyQueryHookResult = ReturnType<typeof useVehicleSizesListLazyQuery>
export type VehicleSizesListQueryResult = Apollo.QueryResult<
  VehicleSizesListQuery,
  VehicleSizesListQueryVariables
>
export const VehicleTypesListDocument = gql`
  query VehicleTypesList {
    vehicleTypesList(orderBy: WEIGHT_ASC) {
      id
      name
      weight
    }
  }
`

/**
 * __useVehicleTypesListQuery__
 *
 * To run a query within a React component, call `useVehicleTypesListQuery` and pass it any options that fit your needs.
 * When your component renders, `useVehicleTypesListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVehicleTypesListQuery({
 *   variables: {
 *   },
 * });
 */
export function useVehicleTypesListQuery(
  baseOptions?: Apollo.QueryHookOptions<VehicleTypesListQuery, VehicleTypesListQueryVariables>,
) {
  return Apollo.useQuery<VehicleTypesListQuery, VehicleTypesListQueryVariables>(
    VehicleTypesListDocument,
    baseOptions,
  )
}
export function useVehicleTypesListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<VehicleTypesListQuery, VehicleTypesListQueryVariables>,
) {
  return Apollo.useLazyQuery<VehicleTypesListQuery, VehicleTypesListQueryVariables>(
    VehicleTypesListDocument,
    baseOptions,
  )
}
export type VehicleTypesListQueryHookResult = ReturnType<typeof useVehicleTypesListQuery>
export type VehicleTypesListLazyQueryHookResult = ReturnType<typeof useVehicleTypesListLazyQuery>
export type VehicleTypesListQueryResult = Apollo.QueryResult<
  VehicleTypesListQuery,
  VehicleTypesListQueryVariables
>
export const VehiclesListDocument = gql`
  query VehiclesList {
    vehiclesList(orderBy: CREATED_AT_DESC) {
      id
      name
      status
      licensePlate
      vehicleTypeId
      vehicleType {
        id
        name
      }
      vehicleSizeId
      vehicleSize {
        id
        name
        description
      }
      ownerId
      owner {
        id
        name
      }
    }
  }
`

/**
 * __useVehiclesListQuery__
 *
 * To run a query within a React component, call `useVehiclesListQuery` and pass it any options that fit your needs.
 * When your component renders, `useVehiclesListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVehiclesListQuery({
 *   variables: {
 *   },
 * });
 */
export function useVehiclesListQuery(
  baseOptions?: Apollo.QueryHookOptions<VehiclesListQuery, VehiclesListQueryVariables>,
) {
  return Apollo.useQuery<VehiclesListQuery, VehiclesListQueryVariables>(
    VehiclesListDocument,
    baseOptions,
  )
}
export function useVehiclesListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<VehiclesListQuery, VehiclesListQueryVariables>,
) {
  return Apollo.useLazyQuery<VehiclesListQuery, VehiclesListQueryVariables>(
    VehiclesListDocument,
    baseOptions,
  )
}
export type VehiclesListQueryHookResult = ReturnType<typeof useVehiclesListQuery>
export type VehiclesListLazyQueryHookResult = ReturnType<typeof useVehiclesListLazyQuery>
export type VehiclesListQueryResult = Apollo.QueryResult<
  VehiclesListQuery,
  VehiclesListQueryVariables
>

export interface IntrospectionResultData {
  __schema: {
    types: {
      kind: string
      name: string
      possibleTypes: {
        name: string
      }[]
    }[]
  }
}
const result: IntrospectionResultData = {
  __schema: {
    types: [
      {
        kind: 'INTERFACE',
        name: 'Node',
        possibleTypes: [
          {
            name: 'Query',
          },
          {
            name: 'Amenity',
          },
          {
            name: 'SlotAmenity',
          },
          {
            name: 'Slot',
          },
          {
            name: 'User',
          },
          {
            name: 'Vehicle',
          },
          {
            name: 'VehicleType',
          },
          {
            name: 'VehicleSize',
          },
          {
            name: 'ParkingSpace',
          },
          {
            name: 'ParkingSpaceAvailability',
          },
          {
            name: 'ParkingOpenHour',
          },
          {
            name: 'ParkingWorkingHour',
          },
          {
            name: 'GeodataProvider',
          },
          {
            name: 'BillingProfile',
          },
          {
            name: 'UserSubscription',
          },
          {
            name: 'Business',
          },
          {
            name: 'PaymentReceipt',
          },
          {
            name: 'SlotBooking',
          },
          {
            name: 'SlotAvailability',
          },
          {
            name: 'Currency',
          },
          {
            name: 'Country',
          },
          {
            name: 'Language',
          },
          {
            name: 'Translation',
          },
        ],
      },
      {
        kind: 'INTERFACE',
        name: 'GeometryInterface',
        possibleTypes: [
          {
            name: 'GeometryPoint',
          },
          {
            name: 'GeometryPolygon',
          },
          {
            name: 'GeometryLineString',
          },
        ],
      },
      {
        kind: 'INTERFACE',
        name: 'GeometryGeometry',
        possibleTypes: [
          {
            name: 'GeometryPoint',
          },
          {
            name: 'GeometryPolygon',
          },
          {
            name: 'GeometryLineString',
          },
        ],
      },
      {
        kind: 'INTERFACE',
        name: 'GeographyInterface',
        possibleTypes: [
          {
            name: 'GeographyPoint',
          },
          {
            name: 'GeographyPolygon',
          },
          {
            name: 'GeographyLineString',
          },
        ],
      },
      {
        kind: 'INTERFACE',
        name: 'GeographyGeometry',
        possibleTypes: [
          {
            name: 'GeographyPoint',
          },
          {
            name: 'GeographyPolygon',
          },
          {
            name: 'GeographyLineString',
          },
        ],
      },
    ],
  },
}
export default result

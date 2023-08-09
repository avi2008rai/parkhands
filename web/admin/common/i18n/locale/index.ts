export type AvailableLocales = 'en' | 'de'

export const defaultLocale: AvailableLocales = 'en'
export const cookieName = 'ph_locale'

export enum Domain {
  General = 'general',
  Navigation = 'navigation',
  Pages = 'pages',
  User = 'user',
  Amenities = 'amenities',
  Register = 'register',
  Bookings = 'bookings',
  Slots = 'slots',
  Spaces = 'spaces'
}

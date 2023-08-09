export type AvailableLocales = 'en' | 'de'

export const defaultLocale: AvailableLocales = 'en'
export const localeCookieName = 'ph_locale'

export enum Domain {
  General = 'general',
  Navigation = 'navigation',
  Pages = 'pages',
  Forms = 'forms',
  User = 'user',
  Validation = 'validation',
  Amenities = 'amenities',
  Email = 'email',
  Bookings = 'Bookings',
}

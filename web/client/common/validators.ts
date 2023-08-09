import { toUpper } from 'lodash'
import * as Yup from 'yup'
import { StatusT } from 'gql/schema'
import { useDomain, Domain } from 'common/i18n'

const t = useDomain(Domain.Validation)
export const id = Yup.string().required(t('required_id'))

export const name = Yup.string()
  .min(3, t('too_short'))
  .max(100, t('too_long'))
  .required(t('required_name'))

export const email = Yup.string().trim().email(t('invalid_email')).required(t('required_email'))

export const status = Yup.mixed<StatusT>().oneOf([
  StatusT.Enabled,
  StatusT.Disabled,
  StatusT.Pending,
])

export const password = Yup.string()
  .min(8, t('too_short'))
  .max(100, t('too_long'))
  .required(t('required_password'))

const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/
export const phone = Yup.string()
  .trim()
  .min(8, t('too_short'))
  .max(20, t('too_long'))
  .matches(phoneRegex, t('invalid_phonenumber'))
  .required(t('required_phonenumber'))

export const licensePlate = Yup.string()
  .min(5, t('too_short'))
  .max(12, t('too_long'))
  .trim()
  .transform((value) => toUpper(value))
  .required(t('required_license_plate'))

/**
 * Longitude measures how far east or west of the prime meridian a place is located.
 * The prime meridian runs through Greenwich, England. Longitude measurements range
 * from 0° to (+/–)180°.
 *
 * https://en.wikipedia.org/wiki/Longitude#Noting_and_calculating_longitude
 */
export const longitude = Yup.number().min(-180).max(180).required(t('required_longitude'))

/**
 * Latitude measures how far north or south of the equator a place is located.
 * The equator is situated at 0°, the North Pole at 90° north (or 90°, because
 * a positive latitude implies north), and the South Pole at 90° south (or –90°).
 * Latitude measurements range from 0° to (+/–)90°.
 *
 * https://en.wikipedia.org/wiki/Latitude#The_graticule_on_the_sphere
 */
export const latitude = Yup.number().min(-90).max(90).required(t('required_latitude'))

/**
 * https://docs.microsoft.com/en-us/previous-versions/mappoint/aa578799(v=msdn.10)
 */
export const location = Yup.object().shape({
  lat: longitude,
  lng: latitude,
})

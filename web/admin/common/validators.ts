import { toUpper } from 'lodash'
import * as Yup from 'yup'
import { StatusT } from 'gql/schema'

export const id = Yup.string().required('ID is required')

export const name = Yup.string()
  .min(3, 'Too short')
  .max(100, 'Too long')
  .required('Name is required')

export const slotId = Yup.string().max(4, 'Too long').required('Slot Id or Number is required')

export const email = Yup.string().trim().email('Invalid email').required('Email is required')

export const status = Yup.mixed<StatusT>().oneOf([
  StatusT.Enabled,
  StatusT.Disabled,
  StatusT.Pending,
])

export const password = Yup.string()
  .min(8, 'Too short')
  .max(100, 'Too long')
  .required('Password is required')

const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/
export const phone = Yup.string()
  .trim()
  .min(8, 'Too short')
  .max(20, 'Too long')
  .matches(phoneRegex, 'Invalid phone number')
  .required('Phone number is required')

export const licensePlate = Yup.string()
  .min(5, 'Too short')
  .max(12, 'Too long')
  .trim()
  .transform((value) => toUpper(value))
  .required('License plate is required')

/**
 * Longitude measures how far east or west of the prime meridian a place is located.
 * The prime meridian runs through Greenwich, England. Longitude measurements range
 * from 0° to (+/–)180°.
 *
 * https://en.wikipedia.org/wiki/Longitude#Noting_and_calculating_longitude
 */
export const longitude = Yup.number().min(-180).max(180).required('Longitude is required')

/**
 * Latitude measures how far north or south of the equator a place is located.
 * The equator is situated at 0°, the North Pole at 90° north (or 90°, because
 * a positive latitude implies north), and the South Pole at 90° south (or –90°).
 * Latitude measurements range from 0° to (+/–)90°.
 *
 * https://en.wikipedia.org/wiki/Latitude#The_graticule_on_the_sphere
 */
export const latitude = Yup.number().min(-90).max(90).required('Latitude is required')

/**
 * https://docs.microsoft.com/en-us/previous-versions/mappoint/aa578799(v=msdn.10)
 */
export const location = Yup.object().shape({
  lat: longitude,
  lng: latitude,
})

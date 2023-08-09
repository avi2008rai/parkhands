import i18n from 'i18next'
import fetch from 'isomorphic-unfetch'
import initFetch from 'i18next-fetch-backend'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import { resources } from 'common/i18n/locale/resources'
import { defaultLocale, Domain, cookieName } from 'common/i18n/locale'

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(initFetch) // use i18next-fetch-backend
  .use(LanguageDetector)
  .init(
    {
      resources,
      debug: false,
      ns: [Domain.General, Domain.User, Domain.Navigation, Domain.Pages, Domain.Register, Domain.Amenities,Domain.Bookings, Domain.Slots, Domain.Spaces],
      defaultNS: Domain.General,
      fallbackLng: {
        'en-GB': ['en'],
        en: ['en'],
        de: ['de'],
        default: [defaultLocale],
      },
      // returnObjects: true,
      react: {
        useSuspense: false, // not yet supported by SSR
      },
      interpolation: {
        escapeValue: false, // react prevents xss by default
      },
      saveMissing: true,
      backend: {
        addPath: '/api/locales/{{lng}}/{{ns}}/add',
        loadPath: '/api/locales/{{lng}}/{{ns}}',
        allowMultiLoading: true,
        fetch,
      },
      detection: {
        order: [ 'cookie', 'navigator'],
        caches: ['cookie'],
        lookupCookie: cookieName,
      },
    },
    (err) => {
      if (err) return console.error(err)
    },
  )

export const useDomain = (domain: Domain | Domain[]) => i18n.getFixedT(null, domain)

export default i18n

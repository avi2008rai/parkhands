import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import { resources } from 'common/i18n/locale/resources'
import { defaultLocale, Domain, localeCookieName } from 'common/i18n/locale'

export { Domain }

i18n
  // .use(initFetch) // use i18next-fetch-backend
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init(
    {
      resources,
      debug: false,
      ns: [Domain.General, Domain.User, Domain.Navigation, Domain.Pages],
      defaultNS: Domain.General,
      nsSeparator: '@',
      keySeparator: '>>',
      supportedLngs: ['de', 'en'],
      fallbackLng: {
        'en-GB': ['en'],
        en: ['en'],
        de: ['de'],
        default: [defaultLocale],
      },
      fallbackNS: Domain.General,
      // returnObjects: true,
      react: {
        useSuspense: false, // not yet supported by SSR
      },
      interpolation: {
        escapeValue: false, // react prevents xss by default
      },
      saveMissing: false,
      backend: {
        addPath: '/api/locales/{{lng}}/{{ns}}/add',
        loadPath: '/api/locales/{{lng}}/{{ns}}',
        allowMultiLoading: true,
      },
      detection: {
        order: [
          'cookie',
          // 'navigator', // Load locale from visitor's browser
        ],
        caches: ['cookie'],
        lookupCookie: localeCookieName,
      },
    },
    (err) => {
      if (err) return console.error(err)
    },
  )

export const useDomain = (domain: Domain | Domain[]) => i18n.getFixedT(null, domain)

export default i18n

import { createInstance } from 'i18next'
import { initReactI18next } from 'react-i18next'
import { matchPath } from 'react-router-dom'
import resources from './translations.json'

export const LANGS = ['en', 'it']

export const DEFAULT_LANG = 'it'

export function createI18n(pathname: string) {
  const i18nInstance = createInstance()
  i18nInstance
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      resources,
      lng: getStartLang(pathname),

      keySeparator: false, // we do not use keys in form messages.welcome

      interpolation: {
        escapeValue: false, // react already safes from xss
      },
    })
  return i18nInstance
}

export function getLangFromParam(langParam: string) {
  const langParamLower = langParam.toLowerCase()
  // Lang is on of configure...
  if (LANGS.includes(langParamLower)) {
    return langParamLower
  }
  // Fallback 2 default one
  return DEFAULT_LANG
}

export function getStartLang(pathname: string) {
  const langMatch = matchPath('/:lang/*', pathname)
  if (langMatch) {
    return getLangFromParam(langMatch.params.lang ?? '')
  }
  return DEFAULT_LANG
}

import { useTranslation } from 'react-i18next'

// NOTE: Looks kinda stupid but is a good hook to future hacks
export function useLangPathPrefix() {
  const { i18n } = useTranslation()
  return `/${i18n.language}`
}

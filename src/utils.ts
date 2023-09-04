import slugify from 'slugify'
import { useMediaQuery } from 'usehooks-ts'

export function smartSlug(id: number, text: string) {
  return (
    id +
    '_' +
    slugify(text, {
      lower: true,
      strict: true,
    })
  )
}

export function parseSmartSlug(text: string) {
  return text.split('_')[0]
}

export function getLabelFromSlug(text: string) {
  return text.split('_')[1].replace(/-/g, ' ')
}

export function isBrowserMobile() {
  return !useMediaQuery(
    // '((hover: none) and (pointer: coarse)) or (max-width: 1024px)'
    '(min-width: 1024px) or ((hover: hover) and (pointer: fine))'
  )
}
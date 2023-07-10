import slugify from 'slugify'

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
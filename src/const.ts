export const LANGS = ['it', 'en']

const currentDomain = window.location.host
export const IS_WIKI_DOMAIN = currentDomain.includes('wlm-it-app.wmcloud.org') || currentDomain.includes('app.wikilovesmonuments.it')

export const API_URL = import.meta.env.PROD
  ? IS_WIKI_DOMAIN
    ? 'https://wlm-it-visual.wmcloud.org/api/app'
    : 'https://wlm.inmagik.com/api/app'
  : 'http://localhost:8000/api/app'
  
export const API_URL_SECOND = import.meta.env.PROD
  ? IS_WIKI_DOMAIN
    ? 'https://wlm-it-visual.wmcloud.org/api'
    : 'https://wlm.inmagik.com/api'
  : 'http://localhost:8000/api'

export const URL_WIKI = IS_WIKI_DOMAIN
  ? 'https://commons.wikimedia.org/wiki'
  : 'https://wikitest.inmagik.com/index.php'

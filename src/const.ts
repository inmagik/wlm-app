export const LANGS = ['it', 'en']

export const API_URL = import.meta.env.PROD
  ? 'https://wlm.inmagik.com/api/app'
  : 'http://localhost:8000/api/app'
export const API_URL_SECOND = import.meta.env.PROD
  ? 'https://wlm.inmagik.com/api'
  : 'http://localhost:8000/api'

export const URL_WIKI = 'http://188.166.87.243:8080/index.php'

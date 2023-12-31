export interface PaginatedDJResponse<TRecord = any> {
  count: number
  total_count: number
  next: string | null
  previous: string | null
  results: TRecord[]
}

export interface PictureData {
  Artist: string | TrustedHTML
  DateTime: string
  DateTimeOriginal: string
  ImageDescription: string | TrustedHTML
  License: string
  pageid: number
  title: string
}

export interface Picture {
  id: number
  image_date: string
  image_id: string
  image_title: string
  image_url: string
  relevant_image: boolean
  image_type: string
  data?: PictureData
  is_relevant?: boolean
}


export interface MonumentList {
  id: number
  app_category: string
  in_contest: boolean
  label: string
  address?: string
  location: string
  municipality_label: string
  municipality: number
  pictures_wlm_count: number
  pictures_count: number
  distance: number
  position?: {
    type: string
    coordinates: [number, number]
  }
}

export interface CountByCategory {
  categories__app_category__name: string
  count: number
}
export interface Monument {
  id: number
  pictures: Picture[]
  label: string
  q_number: string
  wlm_id: string
  wlm_auth_start_date: string | null
  wlm_auth_end_date: string | null
  approved_by: string[]
  position: {
    type: string
    coordinates: [number, number]
  }
  cover_picture?: {
    id: number
    image_date: string
    image_id: string
    image_title: string
    image_url: string
    image_type: string
  }
  wikidata_creation_date: string
  first_wlm_image_date: string | null
  first_commons_image_date: string | null
  most_recent_wlm_image_date: string | null
  most_recent_commons_image_date: string | null
  municipality: number
  province: number
  region: number
  categories: number[]
  address?: string
  snapshot: number
  municipality_label: string
  province_label: string
  region_label: string
  current_wlm_state: string
  current_commons_state: string
  pictures_count: number
  pictures_wlm_count: number
  pictures_commons_count: number
  to_review: boolean
  app_category: string
  in_contest: boolean
  distance: number
  counts_comune_by_app_category: CountByCategory[]
  wlm_n: string
  relevant_images: string[]
  location: string
  article: string
  categories_urls?: {
    non_wlm_categories: string[]
    wlm_categories: string[]
  }
  data: {
    commons_n: string[]
  }
}

export interface Comune {
  code: number
  label: string
  name: string
  province_code: number
  region_code: number
  centroid: {
    type: string
    coordinates: [number, number]
  }
  province: number
  region: number
}

export interface CategoryDomain {
  name: string
  categories: number[]
}

export interface UploadedImage {
  fake?: boolean
  pageid: number
  ns: number
  title: string
  imagerepository: string
  imageinfo: {
    timestamp: string,
    user: string
    url: string
    descriptionurl: string
    descriptionshorturl: string
  }[]
}

export interface Contest {
  id: number
  label: string
  label_en: string
  start_date: string
  end_date: string
  description?: string
  link?: string
}

export interface MarkerProps {
  id: number
  label: string
  pictures_wlm_count: number
  pictures_count: number
  app_category: string
  in_contest: boolean
  coords: number[],
  coordinate: number[],
  feature: any
}

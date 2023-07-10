export interface PaginatedDJResponse<TRecord = any> {
  count: number
  total_count: number
  next: string | null
  previous: string | null
  results: TRecord[]
}

export interface Monument {
  id: number
  pictures: string[]
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
  wikidata_creation_date: string
  first_wlm_image_date: string | null
  first_commons_image_date: string | null
  most_recent_wlm_image_date: string | null
  most_recent_commons_image_date: string | null
  municipality: number
  province: number
  region: number
  categories: number[]
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
}

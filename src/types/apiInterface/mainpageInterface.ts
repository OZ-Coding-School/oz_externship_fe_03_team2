export interface Lecture {
  id: number
  uuid: string
  title: string
  instructor: string
  thumbnail_img_url: string
  categories: { id: number; name: string }[]
  difficulty: string
  original_price: number
  discount_price: number
  platform: string
  average_rating: number
  duration: number
  url_link: string
  is_bookmarked: boolean
}

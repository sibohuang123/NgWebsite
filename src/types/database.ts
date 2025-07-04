export interface Post {
  id: string
  title: string
  content: string
  tag: string | null
  published_date: string
  is_draft: boolean
  click_count: number
  created_at: string
  updated_at: string
}

export interface Event {
  id: string
  title: string
  content: string
  tag: string | null
  start_date: string
  duration: string
  end_date: string
  location?: string
  is_draft: boolean
  click_count: number
  created_at: string
  updated_at: string
}

export interface Comment {
  id: string
  post_id: string | null
  event_id: string | null
  author_name: string
  content: string
  is_approved?: boolean
  created_at: string
}
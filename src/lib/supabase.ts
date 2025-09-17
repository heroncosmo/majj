import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export interface Profile {
  id: string
  full_name: string
  email: string
  phone: string
  role: 'professional' | 'admin'
  status: 'pending' | 'approved' | 'suspended'
  specialties: string[]
  bio?: string
  profile_image_url?: string
  available: boolean
  created_at: string
  updated_at: string
}

export interface Quote {
  id: string
  client_name: string
  client_email: string
  client_phone: string
  service_type: string
  description: string
  address: string
  preferred_date?: string
  status: 'new' | 'assigned' | 'in_progress' | 'completed'
  assigned_professional_id?: string
  created_at: string
}

export interface Project {
  id: string
  professional_id: string
  title: string
  description: string
  before_images: string[]
  after_images: string[]
  service_type: string
  completion_date?: string
  client_feedback?: string
  created_at: string
}

export interface Notification {
  id: string
  user_id: string
  type: 'new_quote' | 'new_professional' | 'quote_assigned' | 'profile_approved'
  title: string
  message: string
  read: boolean
  created_at: string
}

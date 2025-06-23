import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface WaitlistSignup {
  id: string
  email: string
  persona: string
  website?: string
  created_at: string
}

export interface ContactMessage {
  id: string
  email: string
  subject: string
  message: string
  created_at: string
}

export interface AssessmentRequest {
  id: string
  email: string
  website: string
  persona: string
  status: string
  requested_at: string
}

// API functions
export const addToWaitlist = async (data: {
  email: string
  persona: string
  website?: string
}) => {
  const { data: result, error } = await supabase
    .from('waitlist_signups')
    .insert([data])
    .select()

  if (error) throw error
  return result[0]
}

export const sendContactMessage = async (data: {
  email: string
  subject: string
  message: string
}) => {
  const { data: result, error } = await supabase
    .from('contact_messages')
    .insert([data])
    .select()

  if (error) throw error
  return result[0]
}

export const submitAssessmentRequest = async (data: {
  email: string
  website: string
  persona: string
}) => {
  const { data: result, error } = await supabase
    .from('assessment_requests')
    .insert([data])
    .select()

  if (error) throw error
  return result[0]
}
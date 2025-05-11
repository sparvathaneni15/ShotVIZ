// supabaseClient.js
import { createClient } from '@supabase/supabase-js'

// these come from your Supabase project settings
const SUPABASE_URL   = process.env.SUPABASE_URL
const SUPABASE_ANON  = process.env.SUPABASE_ANON_KEY

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON)
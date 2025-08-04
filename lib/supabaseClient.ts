import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = 'https://vdufgrqsojcrieiriqyl.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkdWZncnFzb2pjcmllaXJpcXlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyNjI5MTksImV4cCI6MjA2OTgzODkxOX0.QPQqcvpnz3_ae77bxBdlnhWneYS4yrCS7MM8yCSslDA'

export const supabase = createBrowserClient(supabaseUrl, supabaseKey)

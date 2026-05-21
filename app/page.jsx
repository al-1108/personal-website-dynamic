import { createClient } from '@supabase/supabase-js'
import HomeClient from './HomeClient'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  )

  const [
    { data: welcomeData },
    { data: educationData },
    { data: blogs },
  ] = await Promise.all([
    supabase.from('welcome').select('message').single(),
    supabase.from('education').select('message').single(),
    supabase.from('blogs').select('slug, title, description, date').order('date', { ascending: false }),
  ])

  return (
    <HomeClient
      welcomeMessage={welcomeData?.message ?? ''}
      educationMessage={educationData?.message ?? ''}
      blogs={blogs ?? []}
    />
  )
}

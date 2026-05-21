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
    { data: experiences },
    { data: skills },
    { data: projects},
  ] = await Promise.all([
    supabase.from('welcome').select('message').single(),
    supabase.from('education').select('message').single(),
    supabase.from('blogs').select('slug, title, description, date').order('date', { ascending: false }),
    supabase.from('experiences').select('id, years, title, company, bullets').order('id', { ascending: false }).limit(2),
    supabase.from('skills').select('languages').single(),
    supabase.from('projects').select('id, years, title, desc, github, image').order('id', { ascending: false }),
  ])

  return (
    <HomeClient
      welcomeMessage={welcomeData?.message ?? ''}
      educationMessage={educationData?.message ?? ''}
      blogs={blogs ?? []}
      experiences={experiences ?? []}
      skills={skills?.languages ?? ''}
      projects={projects ?? []}
    />
  )
}

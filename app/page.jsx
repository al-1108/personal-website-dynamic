import { createClient } from '@supabase/supabase-js'
import HomeClient from './HomeClient'

export default async function Page() {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  )

  const { data } = await supabase
    .from('welcome')
    .select('message')
    .single()

  return <HomeClient welcomeMessage={data?.message ?? ''} />
}

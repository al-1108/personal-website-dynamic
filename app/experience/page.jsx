import { createClient } from '@supabase/supabase-js'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Experience | Alex Lu' }

export default async function ExperiencePage() {
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)

  const { data: experiences } = await supabase
    .from('experiences')
    .select('id, years, title, company, bullets')
    .order('id', { ascending: false })

  return (
    <>
      <SiteHeader back={{ href: '/#experience', label: 'Back' }} />

      <main className="mx-auto max-w-site px-6 py-16 sm:px-8 sm:py-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">01</p>
        <h1 className="mt-2 font-display text-5xl leading-none tracking-tight text-ink sm:text-6xl">Experience</h1>

        <div className="mt-14 max-w-3xl divide-y divide-line border-t border-line">
          {(experiences ?? []).map(exp => (
            <article key={exp.id} className="grid gap-x-10 gap-y-2 py-8 sm:grid-cols-[8rem_1fr]">
              <p className="font-mono text-xs text-muted">{exp.years}</p>
              <div>
                <h2 className="font-display text-2xl leading-tight text-ink">{exp.title}</h2>
                <p className="mt-1 text-sm text-muted">{exp.company}</p>
                <ul className="dash-list mt-5 space-y-2 text-[15px] leading-relaxed text-ink-2">
                  {exp.bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </main>

      <SiteFooter />
    </>
  )
}

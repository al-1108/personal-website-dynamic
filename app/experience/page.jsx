import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Experience | Alex Lu' }

export default async function ExperiencePage() {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  )

  const { data: experiences } = await supabase
    .from('experiences')
    .select('id, years, title, company, bullets')
    .order('id', { ascending: false })

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 bg-slate-900 border-b border-slate-700 w-full z-10">
        <nav className="px-6 py-4 flex justify-between items-center">
          <Link href="/" className="font-display text-2xl font-bold text-sky-400">Alex Lu</Link>
          <a href="/#experience" className="text-slate-300 hover:text-sky-400 transition text-base hover:scale-110 inline-block origin-center">← Back</a>
        </nav>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-12 sm:py-20">
        <h1 className="font-display text-4xl sm:text-5xl font-bold mb-10">Experience</h1>
        <div className="grid gap-6">
          {(experiences ?? []).map((exp) => (
            <div key={exp.id} className="block bg-slate-800 border border-slate-700 rounded-xl p-6">
              <p className="text-sm text-slate-500 mb-2">{exp.years}</p>
              <h3 className="font-display text-xl font-bold mb-1">{exp.title}</h3>
              <p className="text-sm text-sky-400 mb-3">{exp.company}</p>
              <ul className="text-slate-400 text-sm space-y-1 list-disc pl-4 marker:text-sky-400">
                {exp.bullets.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

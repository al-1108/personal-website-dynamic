import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import ThemeToggle from '../ThemeToggle'

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
      <header className="sticky top-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 w-full z-10">
        <nav className="px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link href="/" className="font-display text-2xl font-bold text-sky-400">Alex Lu</Link>
            <ThemeToggle />
          </div>
          <a href="/#experience" className="text-slate-600 dark:text-slate-300 hover:text-sky-400 transition text-base hover:scale-110 inline-block origin-center">← Back</a>
        </nav>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-12 sm:py-20">
        <h1 className="font-display text-4xl sm:text-5xl font-bold mb-10 text-slate-900 dark:text-white">Experience</h1>
        <div className="grid gap-6">
          {(experiences ?? []).map((exp) => (
            <div key={exp.id} className="block bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-6 shadow-sm dark:shadow-none">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">{exp.years}</p>
              <h3 className="font-display text-xl font-bold mb-1 text-slate-900 dark:text-white">{exp.title}</h3>
              <p className="text-sm text-sky-600 dark:text-sky-400 mb-3">{exp.company}</p>
              <ul className="text-slate-600 dark:text-slate-400 text-sm space-y-1 list-disc pl-4 marker:text-sky-500 dark:marker:text-sky-400">
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

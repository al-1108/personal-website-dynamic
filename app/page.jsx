import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import SiteHeader from './components/SiteHeader'
import SiteFooter from './components/SiteFooter'
import Section from './components/Section'
import RefreshIfMissing from './components/RefreshIfMissing'
import LocalTime from './components/LocalTime'
import { formatDate } from './lib/format'

export const dynamic = 'force-dynamic'

const LOCATION = { label: 'Toronto, Canada', timeZone: 'America/Toronto' }
const CONTACTS = [
  { label: 'Email', href: 'mailto:alexlu890@gmail.com', text: 'alexlu890@gmail.com' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/alex-lu-2a788324a/', text: 'linkedin.com/in/alex-lu-2a788324a' },
  { label: 'GitHub', href: 'https://github.com/al-1108', text: 'github.com/al-1108' },
]

export default async function Page() {
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)

  const results = await Promise.allSettled([
    supabase.from('welcome').select('message, image').single(),
    supabase.from('education').select('message').single(),
    supabase.from('blogs').select('slug, title, description, date').order('date', { ascending: false }),
    supabase.from('experiences').select('id, years, title, company, bullets').order('id', { ascending: false }).limit(2),
    supabase.from('skills').select('languages').single(),
    supabase.from('projects').select('id, years, title, desc, github, image').order('id', { ascending: false }),
  ])

  const [welcome, education, blogs, experiences, skillsRow, projects] = results.map(r =>
    r.status === 'fulfilled' ? r.value.data : null
  )

  const welcomeMessage = welcome?.message ?? ''
  const portrait = welcome?.image ?? ''
  const educationMessage = education?.message ?? ''
  const posts = blogs ?? []
  const roles = experiences ?? []
  const work = projects ?? []
  const skills = String(skillsRow?.languages ?? '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean)

  const missing = !welcomeMessage || !educationMessage || !posts.length || !work.length

  return (
    <>
      <RefreshIfMissing missing={missing} />
      <SiteHeader />

      <main className="mx-auto max-w-site px-6 sm:px-8">
        {/* Intro */}
        <section className="hero py-10 sm:py-14 md:py-16">
          {portrait && (
            <img
              src={`/images/${portrait}`}
              alt="Portrait of Alex Lu"
              className="w-24 self-end rounded-sm border border-line object-cover object-top [grid-area:portrait] aspect-[4/5] sm:w-28 md:w-64 lg:w-72"
            />
          )}

          <p className="self-end font-mono text-[11px] uppercase tracking-[0.18em] text-muted [grid-area:label]">
            {educationMessage}
          </p>

          <h1 className="mt-6 font-display text-[2.1rem] leading-[1.06] tracking-tight text-ink [grid-area:title] sm:text-5xl md:mt-4 md:max-w-xl md:text-[3.5rem]">
            {welcomeMessage}
          </h1>

          <dl className="mt-3 grid max-w-sm gap-3 self-end [grid-area:meta] md:mt-7 md:grid-cols-2 md:gap-6">
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">Based in</dt>
              <dd className="mt-1 text-ink">{LOCATION.label}</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">Local time</dt>
              <dd className="mt-1 text-ink">
                <LocalTime timeZone={LOCATION.timeZone} />
              </dd>
            </div>
          </dl>
        </section>

        {/* Experience */}
        <Section id="experience" index="01" title="Experience">
          <div className="divide-y divide-line">
            {roles.map(exp => (
              <article key={exp.id} className="grid gap-x-10 gap-y-2 py-8 first:pt-0 sm:grid-cols-[8rem_1fr]">
                <p className="font-mono text-xs text-muted">{exp.years}</p>
                <div>
                  <h3 className="font-display text-2xl leading-tight text-ink">{exp.title}</h3>
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
          <Link href="/experience" className="link mt-4 inline-block text-sm text-ink-2">
            All experience
          </Link>
        </Section>

        {/* Projects */}
        <Section id="projects" index="02" title="Projects">
          <div className="divide-y divide-line">
            {work.map(project => (
              <a
                key={project.id}
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid gap-x-10 gap-y-3 py-8 first:pt-0 sm:grid-cols-[8rem_1fr_auto]"
              >
                <p className="font-mono text-xs text-muted">{project.years}</p>
                <div className="min-w-0">
                  <h3 className="font-display text-2xl leading-tight text-ink underline decoration-transparent decoration-1 underline-offset-[6px] transition-colors group-hover:decoration-accent">
                    {project.title}
                  </h3>
                  <p className="mt-2 max-w-prose text-[15px] leading-relaxed text-ink-2">{project.desc}</p>
                  <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors group-hover:text-accent group-hover:underline">
                    GitHub ↗
                  </p>
                </div>
                {project.image && (
                  <img
                    src={`/images/${project.image}`}
                    alt=""
                    className="order-first aspect-[4/3] w-32 rounded-sm border border-line object-cover sm:order-none sm:w-36"
                  />
                )}
              </a>
            ))}
          </div>
        </Section>

        {/* Skills */}
        <Section id="skills" index="03" title="Stack">
          <ul className="grid grid-cols-2 gap-x-10 sm:grid-cols-3">
            {skills.map((skill, i) => (
              <li key={skill} className="flex items-baseline gap-3 border-b border-line py-3 text-[15px] text-ink">
                <span className="font-mono text-[11px] text-muted">{String(i + 1).padStart(2, '0')}</span>
                {skill}
              </li>
            ))}
          </ul>
        </Section>

        {/* Writing */}
        <Section id="blogs" index="04" title="Blogs">
          <div className="divide-y divide-line">
            {posts.map(post => (
              <Link
                key={post.slug}
                href={`/blogs/${post.slug}`}
                className="group grid gap-x-10 gap-y-2 py-8 first:pt-0 sm:grid-cols-[8rem_1fr]"
              >
                <p className="font-mono text-xs text-muted">{formatDate(post.date)}</p>
                <div>
                  <h3 className="font-display text-2xl leading-tight text-ink underline decoration-transparent decoration-1 underline-offset-[6px] transition-colors group-hover:decoration-accent">
                    {post.title}
                  </h3>
                  <p className="mt-2 max-w-prose text-[15px] leading-relaxed text-ink-2">{post.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </Section>

        {/* Contact */}
        <Section id="contact" index="05" title="Contact">
          <dl className="divide-y divide-line border-y border-line">
            {CONTACTS.map(({ label, href, text }) => (
              <div key={label} className="grid gap-x-10 gap-y-1 py-4 sm:grid-cols-[8rem_1fr]">
                <dt className="font-mono text-xs text-muted sm:pt-0.5">{label}</dt>
                <dd>
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="link text-ink"
                  >
                    {text}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </Section>
      </main>

      <SiteFooter />
    </>
  )
}

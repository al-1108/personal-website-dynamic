'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-500 dark:text-slate-400 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition mb-3" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
)

const navLinks = [
  { href: '#intro', label: 'Home' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#blogs', label: 'Blogs' },
  { href: '#contact', label: 'Contact' },
]

export default function HomeClient({ welcomeMessage, alexImage, educationMessage, blogs, experiences, skills, projects }) {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [dark, setDark] = useState(true)
  const [emoji, setEmoji] = useState('🙈')
  const emojiRef = useRef(null)

  useEffect(() => {
    const missing = !welcomeMessage || !educationMessage || !blogs.length || !projects.length
    if (!missing) return
    const timer = setTimeout(() => router.refresh(), 2000)
    return () => clearTimeout(timer)
  }, [welcomeMessage, educationMessage, blogs, projects, router])

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'light') {
      setDark(false)
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleDark = () => {
    const next = !dark
    setDark(next)
    if (next) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  useEffect(() => {
    const directional = ['🌝', '🧐', '🙄', '🥴', '😒', '🫠', '😔', '🐤']
    const handleMouseMove = (e) => {
      if (!emojiRef.current) return
      const rect = emojiRef.current.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const angle = Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI)
      setEmoji(directional[Math.round((angle + 180) / 45) % 8])
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const el = document.querySelector(hash)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <header className="sticky top-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 w-full z-10">
        <nav className="px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <a href="#intro" className="font-display text-2xl font-bold text-sky-400">Alex Lu</a>
            <button
              onClick={toggleDark}
              className="text-slate-500 dark:text-slate-400 hover:text-sky-400 dark:hover:text-sky-400 transition p-1"
              aria-label="Toggle dark mode"
            >
              {dark ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 7a5 5 0 100 10 5 5 0 000-10z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop nav */}
          <ul className="hidden md:flex gap-8 text-base text-slate-600 dark:text-slate-300">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <a href={href} className="hover:underline inline-flex hover:text-sky-400 hover:scale-110 transition origin-center">{label}</a>
              </li>
            ))}
          </ul>

          {/* Hamburger button */}
          <button
            className="md:hidden text-slate-600 dark:text-slate-300 hover:text-sky-400 transition p-1"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </nav>

        {/* Mobile dropdown */}
        {menuOpen && (
          <ul className="md:hidden border-t border-slate-200 dark:border-slate-700 flex flex-col text-slate-600 dark:text-slate-300">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className="block px-6 py-3 hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </header>

      {/* Intro */}
      <div id="intro" className="scroll-mt-16 max-w-4xl mx-auto px-6 py-12 sm:py-20">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8">
          <div className="flex-1 text-center">
            <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 mb-4">{educationMessage}</p>
            <p className="font-display text-2xl sm:text-3xl font-bold mb-4 text-slate-900 dark:text-white">{welcomeMessage}</p>
          </div>
          <div className="flex-1 w-full flex justify-center md:justify-end items-center">
            <img src={`/images/${alexImage}`} alt="Alex Lu" className="w-image max-w-image aspect-square object-cover rounded-lg shadow-lg" />
          </div>
        </div>
      </div>

      {/* Experience */}
      <div id="experience" className="scroll-mt-16 bg-slate-200 dark:bg-slate-800 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-8 text-slate-900 dark:text-white">Experience</h2>
          <div className="grid gap-6">
            {experiences.map((exp) => (
              <div key={exp.id} className="block bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-6 shadow-sm dark:shadow-none">
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
          <Link href="/experience" className="inline-block mt-6 text-sky-600 dark:text-sky-400 text-sm font-medium hover:translate-x-1 hover:scale-110 transition-transform origin-left hover:underline">See all experiences →</Link>
        </div>
      </div>

      {/* Projects */}
      <div id="projects" className="scroll-mt-16 max-w-4xl mx-auto px-6 py-12 sm:py-16">
        <h2 className="font-display text-2xl sm:text-3xl font-bold mb-8 text-slate-900 dark:text-white">My Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {projects.map((project) => (
            <a key={project.id} href={project.github} target="_blank" rel="noopener noreferrer"
              style={{ backgroundImage: `linear-gradient(${dark ? 'rgba(15,23,42,0.78)' : 'rgba(248,250,252,0.85)'}, ${dark ? 'rgba(15,23,42,0.70)' : 'rgba(248,250,252,0.65)'}), url('/images/${project.image}')` }}
              className="flex flex-col justify-between border border-slate-300 dark:border-slate-700 rounded-xl p-4 hover:border-sky-500 hover:shadow-lg hover:shadow-sky-900/20 transition group bg-cover bg-center">
              <div>
                <GitHubIcon />
                <p className="text-xs text-slate-600 dark:text-slate-300 mb-1 group-hover:text-sky-500 dark:group-hover:text-sky-400">{project.years}</p>
                <h3 className="font-display text-2xl sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-sky-500 dark:group-hover:text-sky-400 transition mb-2">{project.title}</h3>
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{project.desc}</p>
              </div>
              <span className="text-sky-600 dark:text-sky-400 text-base font-medium transition-transform inline-block mt-2 group-hover:underline group-hover:translate-x-5 md:group-hover:translate-x-3 group-hover:scale-110">GitHub →</span>
            </a>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div id="skills" className="scroll-mt-16 bg-slate-200 dark:bg-slate-800 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-8 text-slate-900 dark:text-white">Languages/Frameworks</h2>
          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 mb-12">{skills}</p>
        </div>
      </div>

      {/* Blogs */}
      <div id="blogs" className="scroll-mt-16 max-w-4xl mx-auto px-6 py-12 sm:py-16">
        <h2 className="font-display text-2xl sm:text-3xl font-bold mb-8 text-slate-900 dark:text-white">Blogs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {blogs.map((post) => (
            <Link key={post.slug} href={`/blogs/${post.slug}`} className="bg-white dark:bg-slate-800 flex flex-col justify-between border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm dark:shadow-none hover:border-sky-500 hover:shadow-md dark:hover:shadow-sky-900/20 transition group">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">{post.date}</p>
                <h3 className="font-display text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-sky-400 transition">{post.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">{post.description}</p>
              </div>
              <span className="inline-block mt-4 text-sky-600 dark:text-sky-400 text-sm font-medium group-hover:translate-x-1 group-hover:scale-110 transition-transform origin-left group-hover:underline">Read more →</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div id="contact" className="scroll-mt-16 bg-slate-200 dark:bg-slate-800 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3 text-slate-900 dark:text-white">Contact Me</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8">alexlu890@gmail.com</p>
          <div className="flex flex-wrap gap-5">
            <a href="https://www.linkedin.com/in/alex-lu-2a788324a/" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-sky-500 dark:hover:border-sky-400 hover:text-sky-600 dark:hover:text-sky-400 hover:scale-110 transition font-medium text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452H17.21v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.985V9h3.102v1.561h.046c.432-.817 1.489-1.678 3.065-1.678 3.278 0 3.883 2.157 3.883 4.965v6.604zM5.337 7.433a1.8 1.8 0 1 1 0-3.601 1.8 1.8 0 0 1 0 3.601zM6.961 20.452H3.71V9h3.251v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
            <a href="https://github.com/al-1108" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-sky-500 dark:hover:border-sky-400 hover:text-sky-600 dark:hover:text-sky-400 hover:scale-110 transition font-medium text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              GitHub
            </a>
            <a href="#" className="group flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-sky-500 dark:hover:border-sky-400 hover:text-sky-600 dark:hover:text-sky-400 hover:scale-110 transition font-medium text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Resume
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

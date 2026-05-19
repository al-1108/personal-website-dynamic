'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-400 group-hover:text-sky-400 transition mb-3" fill="currentColor" viewBox="0 0 24 24">
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

export default function HomeClient({ welcomeMessage }) {
  const [menuOpen, setMenuOpen] = useState(false)

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
      <header className="sticky top-0 bg-slate-900 border-b border-slate-700 w-full z-10">
        <nav className="px-6 py-4 flex justify-between items-center">
          <h1 className="font-display text-2xl font-bold text-sky-400">Alex Lu</h1>

          {/* Desktop nav */}
          <ul className="hidden md:flex gap-8 text-base text-slate-300">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <a href={href} className="inline-flex hover:text-sky-400 hover:scale-110 transition origin-center">{label}</a>
              </li>
            ))}
          </ul>

          {/* Hamburger button */}
          <button
            className="md:hidden text-slate-300 hover:text-sky-400 transition p-1"
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
          <ul className="md:hidden border-t border-slate-700 flex flex-col text-slate-300">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className="block px-6 py-3 hover:text-sky-400 hover:bg-slate-800 transition"
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
            <p className="text-base sm:text-lg text-slate-400 mb-4">Incoming Waterloo Computer Science Student</p>
            <p className="font-display text-2xl sm:text-3xl font-bold mb-2">{welcomeMessage}</p>
          </div>
          <div className="flex-1 w-full flex justify-center md:justify-end items-center">
            <img src="/images/iooo.png" alt="Alex Lu" className="w-image max-w-image aspect-square object-cover rounded-lg shadow-lg" />
          </div>
        </div>
      </div>

      {/* Experience */}
      <div id="experience" className="scroll-mt-16 bg-slate-800 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-8">Experience</h2>
          <div className="grid gap-6">
            <div className="block bg-slate-900 border border-slate-700 rounded-xl p-6">
              <p className="text-sm text-slate-500 mb-2">2025 – 2026</p>
              <h3 className="font-display text-xl font-bold mb-1">Programming Member</h3>
              <p className="text-sm text-sky-400 mb-3">FRC Team 7520</p>
              <ul className="text-slate-400 text-sm space-y-1 list-disc pl-4 marker:text-sky-400">
                <li>Developed robot software including a turret subsystem for the 2026 REBUILT season</li>
                <li>Turret subsystem tracked and shot at a target based on its position on the field and its velocity.</li>
                <li>The turret was able to score at a 95%+ accuracy, leading us to become one of the top 4% teams in the world (ranked 149/3724 on statbotics)</li>
                <li>Qualified for the FIRST Championship, which only 19 of 119 Ontario teams attend</li>
              </ul>
            </div>
          </div>
          <Link href="/experience" className="inline-block mt-6 text-sky-400 text-sm font-medium hover:translate-x-1 hover:scale-110 transition-transform origin-left">See all experiences →</Link>
        </div>
      </div>

      {/* Projects */}
      <div id="projects" className="scroll-mt-16 max-w-4xl mx-auto px-6 py-12 sm:py-16">
        <h2 className="font-display text-2xl sm:text-3xl font-bold mb-8">My Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <a href="https://github.com/al-1108/Personal-Portfolio-Website" target="_blank" rel="noopener noreferrer"
            style={{ backgroundImage: "linear-gradient(rgba(15,23,42,0.70), rgba(15,23,42,0.70)), url('/images/logo.png')" }}
            className="flex flex-col justify-between border border-slate-700 rounded-xl p-4 hover:border-sky-500 hover:shadow-lg hover:shadow-sky-900/20 transition group bg-cover bg-center">
            <div>
              <GitHubIcon />
              <p className="text-xs text-slate-300 mb-1 group-hover:text-sky-400">2026</p>
              <h3 className="font-display text-2xl sm:text-xl font-bold group-hover:text-sky-400 transition mb-2">Personal Portfolio Website</h3>
              <p className="text-slate-300 text-sm leading-relaxed">This website! Built with HTML, Tailwind, and (tbd).</p>
            </div>
            <span className="text-sky-400 text-base font-medium group-hover:scale-110 group-hover:translate-x-3 transition-transform inline-block mt-2">GitHub →</span>
          </a>
          <a href="https://github.com/RyanHuangcodes/CPT_ICS4U" target="_blank" rel="noopener noreferrer"
            style={{ backgroundImage: "linear-gradient(rgba(15,23,42,0.70), rgba(15,23,42,0.70)), url('/images/skellies.png')" }}
            className="flex flex-col justify-between border border-slate-700 rounded-xl p-4 hover:border-sky-500 hover:shadow-lg hover:shadow-sky-900/20 transition group bg-cover bg-center">
            <div>
              <GitHubIcon />
              <p className="text-xs text-slate-300 mb-1 group-hover:text-sky-400">2025</p>
              <h3 className="font-display text-2xl sm:text-xl font-bold group-hover:text-sky-400 transition mb-2">Skellies</h3>
              <p className="text-slate-300 text-sm leading-relaxed">Collaborated on a Unity tower defense game for a computer science CPT, where players place towers to defend their base from zombies that grow stronger each wave.</p>
            </div>
            <span className="text-sky-400 text-base font-medium group-hover:scale-110 group-hover:translate-x-3 transition-transform inline-block mt-2">GitHub →</span>
          </a>
          <a href="https://github.com/dvergeldedios/Dodgesquare" target="_blank" rel="noopener noreferrer"
            style={{ backgroundImage: "linear-gradient(rgba(15,23,42,0.70), rgba(15,23,42,0.70)), url('/images/dodgesquare.png')" }}
            className="flex flex-col justify-between border border-slate-700 rounded-xl p-4 hover:border-sky-500 hover:shadow-lg hover:shadow-sky-900/20 transition group bg-cover bg-center">
            <div>
              <GitHubIcon />
              <p className="text-xs text-slate-300 mb-1 group-hover:text-sky-400">2025</p>
              <h3 className="font-display text-2xl sm:text-xl font-bold group-hover:text-sky-400 transition mb-2">Dodgesquare</h3>
              <p className="text-slate-300 text-sm leading-relaxed">Collaborated on a Unity game for a computer science class. Dodge falling obstacles that increase in number and speed over time!</p>
            </div>
            <span className="text-sky-400 text-base font-medium group-hover:scale-110 group-hover:translate-x-3 transition-transform inline-block mt-2">GitHub →</span>
          </a>
        </div>
      </div>

      {/* Skills */}
      <div id="skills" className="scroll-mt-16 bg-slate-800 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-8">Languages/Frameworks</h2>
          <p className="text-base sm:text-lg text-slate-300 mb-12">C#, Java, Python, HTML, CSS, JS</p>
        </div>
      </div>

      {/* Blogs */}
      <div id="blogs" className="scroll-mt-16 max-w-4xl mx-auto px-6 py-12 sm:py-16">
        <h2 className="font-display text-2xl sm:text-3xl font-bold mb-8">Blogs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Link href="/blogs/frc-worlds" className="bg-slate-800 flex flex-col justify-between border border-slate-700 rounded-xl p-4 hover:border-sky-500 hover:shadow-lg hover:shadow-sky-900/20 transition group">
            <div>
              <p className="text-sm text-slate-500 mb-2">May 11, 2026</p>
              <h3 className="font-display text-xl font-bold mb-3 group-hover:text-sky-400 transition">FIRST Championship Experience</h3>
              <p className="text-slate-400 leading-relaxed text-sm">This post goes over my experience at the 2026 FIRST Championship event!</p>
            </div>
            <span className="inline-block mt-4 text-sky-400 text-sm font-medium group-hover:translate-x-1 group-hover:scale-110 transition-transform origin-left">Read more →</span>
          </Link>
          <Link href="/blogs/first-post" className="bg-slate-800 flex flex-col justify-between border border-slate-700 rounded-xl p-4 hover:border-sky-500 hover:shadow-lg hover:shadow-sky-900/20 transition group">
            <div>
              <p className="text-sm text-slate-500 mb-2">May 10, 2026</p>
              <h3 className="font-display text-xl font-bold mb-3 group-hover:text-sky-400 transition">My First Blog Post</h3>
              <p className="text-slate-400 leading-relaxed text-sm">This is my first post! Learn more about my journey as a developer, my interests, and my experiences!</p>
            </div>
            <span className="inline-block mt-4 text-sky-400 text-sm font-medium group-hover:translate-x-1 group-hover:scale-110 transition-transform origin-left">Read more →</span>
          </Link>
        </div>
      </div>

      {/* Contact */}
      <div id="contact" className="scroll-mt-16 bg-slate-800 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">Contact Me</h2>
          <p className="text-slate-400 mb-8">alexlu890@gmail.com</p>
          <div className="flex flex-wrap gap-4">
            <a href="https://www.linkedin.com/in/alex-lu-2a788324a/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700 hover:bg-sky-500 text-slate-300 hover:text-white transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452H17.21v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.985V9h3.102v1.561h.046c.432-.817 1.489-1.678 3.065-1.678 3.278 0 3.883 2.157 3.883 4.965v6.604zM5.337 7.433a1.8 1.8 0 1 1 0-3.601 1.8 1.8 0 0 1 0 3.601zM6.961 20.452H3.71V9h3.251v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
            <a href="https://github.com/al-1108" target="_blank" rel="noopener noreferrer" className="hover:scale-110 flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700 hover:bg-sky-500 text-slate-300 hover:text-white transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              GitHub
            </a>
            <a href="#" className="hover:scale-110 flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700 hover:bg-sky-500 text-slate-300 hover:text-white transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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

import Link from 'next/link'

export const metadata = { title: 'Experience | Alex Lu' }

export default function ExperiencePage() {
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
          <div className="block bg-slate-800 border border-slate-700 rounded-xl p-6">
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
      </div>
    </div>
  )
}

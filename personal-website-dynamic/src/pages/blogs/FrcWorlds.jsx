import { Link } from 'react-router-dom'

export default function FrcWorlds() {
  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen">
      <header className="sticky top-0 bg-slate-900 border-b border-slate-700 w-full z-10">
        <nav className="px-6 py-4 flex justify-between items-center">
          <Link to="/" className="font-display text-xl sm:text-2xl font-bold text-sky-400">Alex Lu</Link>
          <a href="/#blogs" className="text-slate-300 hover:text-sky-400 transition text-base hover:scale-110 inline-block origin-center">← Back to Blogs</a>
        </nav>
      </header>

      <article className="max-w-2xl mx-auto px-6 py-12 sm:py-20">
        <p className="text-sm text-slate-500 mb-3">May 11, 2026</p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold mb-8">FIRST Championship Experience</h1>
        <div className="prose text-slate-300 leading-relaxed space-y-6">
          <p>
            This past week, I had the incredible opportunity to attend the
            FIRST Robotics Competition (FRC) World Championship in Houston, Texas,
            as a programming member of my community team, 7520.
            It was an unforgettable experience that allowed me to witness the culmination
            of hard work, dedication, and innovation from teams all over the world.
          </p>
          <p>
            We were on the Daly division, and ended up facing both future world champions team 4414 and 1323
            in the qualification rounds. This has been our best season yet as we made playoffs as a first pick for alliance 7!
          </p>
          <div>
            <img src="/images/robot.png" alt="Team 7520 Robot" className="w-3/5 rounded-lg shadow-lg mx-auto block" />
          </div>
        </div>
      </article>
    </div>
  )
}

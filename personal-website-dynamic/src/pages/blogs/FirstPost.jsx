import { Link } from 'react-router-dom'

export default function FirstPost() {
  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen">
      <header className="sticky top-0 bg-slate-900 border-b border-slate-700 w-full z-10">
        <nav className="px-6 py-4 flex justify-between items-center">
          <Link to="/" className="font-display text-xl sm:text-2xl font-bold text-sky-400">Alex Lu</Link>
          <a href="/#blogs" className="text-slate-300 hover:text-sky-400 transition text-base hover:scale-110 inline-block origin-center">← Back to Blogs</a>
        </nav>
      </header>

      <article className="max-w-2xl mx-auto px-6 py-12 sm:py-20">
        <p className="text-sm text-slate-500 mb-3">May 10, 2026</p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold mb-8">My First Blog Post</h1>
        <div className="prose text-slate-300 leading-relaxed space-y-6">
          <p>
            Hello! This is my very first blog post on my personal portfolio!
            This is my very first front-end project, which I just have started learning this year.
          </p>
          <p>
            Here's a little bit about me. My name is Alex Lu, and at this point in time,
            I'm an incoming Computer Science student at the University of Waterloo.
            I'm currently a high school student and also a member of a robotics team, where I do programming work for the team.
            This season I really enjoyed working on the turret subsystem for our robot,
            which involved programming the motors to work together with odometry to aim and shoot balls while moving.
          </p>
          <p>
            Besides coding and all things technology, I also enjoy playing softball, playing the trumpet,
            and skiing!
          </p>
          <div>
            <img src="/images/ski.jpg" alt="Alex Lu skiing" className="w-[45%] rounded-lg shadow-lg mx-auto block" />
          </div>
        </div>
      </article>
    </div>
  )
}

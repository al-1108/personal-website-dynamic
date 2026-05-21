import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function BlogPost({ params }) {
  const { slug } = await params
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  )

  const { data: post } = await supabase
    .from('blogs')
    .select('title, date, content, image, image-desc')
    .eq('slug', slug)
    .single()

  if (!post) notFound()

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 bg-slate-900 border-b border-slate-700 w-full z-10">
        <nav className="px-6 py-4 flex justify-between items-center">
          <Link href="/" className="font-display text-2xl font-bold text-sky-400">Alex Lu</Link>
          <a href="/#blogs" className="text-slate-300 hover:text-sky-400 transition text-base hover:scale-110 inline-block origin-center">← Back to Blogs</a>
        </nav>
      </header>

      <article className="max-w-2xl mx-auto px-6 py-12 sm:py-20">
        <p className="text-sm text-slate-500 mb-3">{post.date}</p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold mb-8">{post.title}</h1>
        <div className="text-slate-300 leading-relaxed space-y-6">
          {post.content}
        </div>
        <br></br>
        <br></br>
        <div>
          <img src={`/images/${post.image}`} alt={post['image-desc']} className="w-[45%] rounded-lg shadow-lg mx-auto block"/>
        </div>
      </article>
    </div>
  )
}

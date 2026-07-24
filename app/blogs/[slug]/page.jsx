import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ThemeToggle from '../../ThemeToggle'

export const dynamic = 'force-dynamic'

function getYouTubeMediaUrls(youtubeUrl) {
  if (!youtubeUrl) return { embedUrl: null, externalUrl: null }

  try {
    const url = new URL(youtubeUrl)
    const isSafeWebUrl = url.protocol === 'https:' || url.protocol === 'http:'

    if (!isSafeWebUrl) return { embedUrl: null, externalUrl: null }

    const hostname = url.hostname.toLowerCase().replace(/^www\./, '')
    let videoId = null

    if (hostname === 'youtu.be') {
      videoId = url.pathname.split('/').filter(Boolean)[0]
    } else if (hostname === 'youtube.com' || hostname === 'm.youtube.com') {
      const pathParts = url.pathname.split('/').filter(Boolean)

      if (pathParts[0] === 'shorts' || pathParts[0] === 'embed') {
        videoId = pathParts[1]
      } else if (pathParts[0] === 'watch') {
        videoId = url.searchParams.get('v')
      }
    }

    if (!videoId || !/^[a-zA-Z0-9_-]{6,}$/.test(videoId)) {
      return { embedUrl: null, externalUrl: url.toString() }
    }

    return {
      embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}`,
      externalUrl: `https://www.youtube.com/shorts/${videoId}`,
    }
  } catch {
    return { embedUrl: null, externalUrl: null }
  }
}

function BlogMedia({ image, imageDescription, youtubeUrl, title }) {
  if (image) {
    return (
      <img
        src={`/images/${image}`}
        alt={imageDescription || title}
        className="w-[45%] rounded-lg shadow-lg mx-auto block"
      />
    )
  }

  const { embedUrl, externalUrl } = getYouTubeMediaUrls(youtubeUrl)

  if (embedUrl) {
    return (
      <figure className="mx-auto w-full max-w-[420px]">
        <div className="relative aspect-[9/16] overflow-hidden rounded-xl bg-slate-100 shadow-lg dark:bg-slate-800">
          <iframe
            src={embedUrl}
            title={`${title} YouTube Short`}
            className="absolute inset-0 h-full w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
        <figcaption className="mt-3 text-center text-sm">
          <a
            href={externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-600 hover:underline dark:text-sky-400"
          >
          </a>
        </figcaption>
      </figure>
    )
  }

  if (externalUrl) {
    return (
      <p className="text-center">
        <a
          href={externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-600 hover:underline dark:text-sky-400"
        >
        </a>
      </p>
    )
  }

  return null
}

export default async function BlogPost({ params }) {
  const { slug } = await params
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  )

  const { data: post } = await supabase
    .from('blogs')
    .select('title, date, content, image, image-desc, youtube_url')
    .eq('slug', slug)
    .single()

  if (!post) notFound()

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 w-full z-10">
        <nav className="px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link href="/" className="font-display text-2xl font-bold text-sky-400">Alex Lu</Link>
            <ThemeToggle />
          </div>
          <a href="/#blogs" className="text-slate-600 dark:text-slate-300 hover:text-sky-400 transition text-base hover:scale-110 inline-block origin-center hover:underline">← Back to Blogs</a>
        </nav>
      </header>

      <article className="max-w-2xl mx-auto px-6 py-12 sm:py-20">
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">{post.date}</p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold mb-8 text-slate-900 dark:text-white">{post.title}</h1>
        <div className="text-slate-700 dark:text-slate-300 leading-relaxed space-y-6">
          {post.content}
        </div>
        <div className="mt-12">
          <BlogMedia
            image={post.image}
            imageDescription={post['image-desc']}
            youtubeUrl={post.youtube_url}
            title={post.title}
          />
        </div>
      </article>
    </div>
  )
}

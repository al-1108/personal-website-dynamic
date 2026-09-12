import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import SiteHeader from '../../components/SiteHeader'
import SiteFooter from '../../components/SiteFooter'
import { formatDate, paragraphs } from '../../lib/format'

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
      <figure className="max-w-sm">
        <img
          src={`/images/${image}`}
          alt={imageDescription || title}
          className="w-full rounded-sm border border-line"
        />
        {imageDescription && (
          <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            {imageDescription}
          </figcaption>
        )}
      </figure>
    )
  }

  const { embedUrl, externalUrl } = getYouTubeMediaUrls(youtubeUrl)

  if (embedUrl) {
    return (
      <figure className="max-w-sm">
        <div className="relative aspect-[9/16] overflow-hidden rounded-sm border border-line bg-paper-2">
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
        <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          <a href={externalUrl} target="_blank" rel="noopener noreferrer" className="link">
            Watch on YouTube ↗
          </a>
        </figcaption>
      </figure>
    )
  }

  if (externalUrl) {
    return (
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
        <a href={externalUrl} target="_blank" rel="noopener noreferrer" className="link">
          Watch on YouTube ↗
        </a>
      </p>
    )
  }

  return null
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)
  const { data: post } = await supabase.from('blogs').select('title, description').eq('slug', slug).single()
  if (!post) return { title: 'Alex Lu' }
  return { title: `${post.title} | Alex Lu`, description: post.description }
}

export default async function BlogPost({ params }) {
  const { slug } = await params
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)

  const { data: post } = await supabase
    .from('blogs')
    .select('title, date, content, image, image-desc, youtube_url')
    .eq('slug', slug)
    .single()

  if (!post) notFound()

  return (
    <>
      <SiteHeader back={{ href: '/#writing', label: 'Back to writing' }} />

      <main className="mx-auto max-w-site px-6 py-16 sm:px-8 sm:py-24">
        <article className="max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{formatDate(post.date)}</p>
          <h1 className="mt-4 font-display text-5xl leading-[1.02] tracking-tight text-ink sm:text-6xl">{post.title}</h1>

          <div className="mt-12 space-y-6 text-[17px] leading-[1.7] text-ink-2">
            {paragraphs(post.content).map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </div>

          <div className="mt-14 border-t border-line pt-10">
            <BlogMedia
              image={post.image}
              imageDescription={post['image-desc']}
              youtubeUrl={post.youtube_url}
              title={post.title}
            />
          </div>
        </article>
      </main>

      <SiteFooter />
    </>
  )
}

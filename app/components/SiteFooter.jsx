export default function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-site flex-wrap items-center justify-between gap-3 px-6 py-8 font-mono text-[11px] uppercase tracking-[0.18em] text-muted sm:px-8">
        <p>&copy; {new Date().getFullYear()} Alex Lu</p>
        <p>Next.js &middot; Supabase &middot; Vercel</p>
      </div>
    </footer>
  )
}

import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
import MobileNav from './MobileNav'

const links = [
  { href: '/#experience', label: 'Experience' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#writing', label: 'Writing' },
  { href: '/#contact', label: 'Contact' },
]

export default function SiteHeader({ back }) {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-paper/90 backdrop-blur-sm">
      <nav className="relative mx-auto flex h-14 max-w-site items-center justify-between px-6 sm:px-8">
        <Link href="/" className="font-display text-2xl leading-none text-ink">
          Alex Lu
        </Link>

        <div className="flex items-center gap-7">
          {back ? (
            <a href={back.href} className="link text-sm text-ink-2">
              {back.label}
            </a>
          ) : (
            <ul className="hidden items-center gap-7 md:flex">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <a href={href} className="text-sm text-ink-2 transition-colors hover:text-ink">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          )}
          <ThemeToggle />
          {!back && <MobileNav links={links} />}
        </div>
      </nav>
    </header>
  )
}

'use client'

import { useState } from 'react'

export default function MobileNav({ links }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-ink"
      >
        {open ? 'Close' : 'Menu'}
      </button>

      {open && (
        <ul id="mobile-nav" className="absolute inset-x-0 top-full border-b border-line bg-paper">
          {links.map(({ href, label }) => (
            <li key={href} className="border-t border-line">
              <a
                href={href}
                onClick={() => setOpen(false)}
                className="block px-6 py-4 font-display text-2xl text-ink"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

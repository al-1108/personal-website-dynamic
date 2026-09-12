'use client'

import { useEffect, useState } from 'react'

// Tracks whether the document is in dark mode. Returns null before mount
// so server and client markup agree; updates when the class changes.
export function useTheme() {
  const [dark, setDark] = useState(null)

  useEffect(() => {
    const root = document.documentElement
    const read = () => setDark(root.classList.contains('dark'))
    read()
    const observer = new MutationObserver(read)
    observer.observe(root, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  return dark
}

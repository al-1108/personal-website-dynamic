'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Supabase occasionally returns nothing on a cold start. When required
// content is missing, re-request the page once after a short delay.
export default function RefreshIfMissing({ missing }) {
  const router = useRouter()

  useEffect(() => {
    if (!missing) return
    const timer = setTimeout(() => router.refresh(), 2000)
    return () => clearTimeout(timer)
  }, [missing, router])

  return null
}

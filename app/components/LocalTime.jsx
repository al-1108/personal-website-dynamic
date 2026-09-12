'use client'

import { useEffect, useState } from 'react'

// Shows the current time in a given zone, refreshed each minute.
// Renders nothing on the server so hydration never disagrees.
export default function LocalTime({ timeZone }) {
  const [time, setTime] = useState('')

  useEffect(() => {
    const format = new Intl.DateTimeFormat('en-US', {
      timeZone,
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short',
    })
    const tick = () => setTime(format.format(new Date()))
    tick()
    const timer = setInterval(tick, 60_000)
    return () => clearInterval(timer)
  }, [timeZone])

  return <span suppressHydrationWarning>{time}</span>
}

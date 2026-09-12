import { Fraunces, Geist, Geist_Mono } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })
const fraunces = Fraunces({
  subsets: ['latin'],
  weight: 'variable',
  style: ['normal', 'italic'],
  axes: ['opsz'],
  variable: '--font-fraunces',
})

export const metadata = {
  title: 'Alex Lu',
  description: 'Alex Lu, a Computer science student at the University of Waterloo.',
  icons: { icon: '/favicon.svg' },
}

// Runs before first paint so the saved theme applies without a flash.
// Falls back to the system preference when nothing has been saved.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark')}catch(e){}})()`

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth" className={`${geist.variable} ${geistMono.variable} ${fraunces.variable}`}>
      <head>
        <Script id="theme" strategy="beforeInteractive">{themeScript}</Script>
      </head>
      <body className="min-h-screen bg-paper font-sans text-ink antialiased">{children}</body>
    </html>
  )
}

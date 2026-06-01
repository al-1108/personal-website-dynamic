import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['700'], variable: '--font-space-grotesk' })

export const metadata = {
  title: 'Alex Lu',
  icons: { icon: '/images/logo.png' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`dark scroll-smooth ${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">{children}</body>
    </html>
  )
}

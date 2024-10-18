import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AuthProvider } from '../context/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NoteNest',
  description: 'Capture your thoughts, unleash your potential',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}><AuthProvider>{children}</AuthProvider></body>
    </html>
  )
}
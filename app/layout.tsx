import './globals.css'
  import type { Metadata } from 'next'
  import { Roboto } from 'next/font/google'

  const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '700'], // Select the font weights you need
    variable: '--font-roboto', // Define a CSS variable for Tailwind usage
  });

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
        <body className={roboto.className}>{children}</body>
      </html>
    )
  }
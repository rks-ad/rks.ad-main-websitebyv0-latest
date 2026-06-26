import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'RKS.Ad - Ravi Kumar Sharma, Advocate',
  description: 'Premium legal counsel and advocacy services. Explore cases, consult with expertise, and connect with Ravi Kumar Sharma, a dedicated advocate.',
  keywords: ['advocate', 'legal counsel', 'lawyer', 'ravi kumar sharma', 'rks.ad'],
  openGraph: {
    title: 'RKS.Ad - Professional Advocate',
    description: 'Premium legal services and counsel',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0f172a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}

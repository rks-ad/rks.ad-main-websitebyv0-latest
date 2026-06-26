import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { StructuredData } from '@/components/structured-data'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'RKS.Ad - Best Advocate in Jaipur | Ravi Kumar Sharma',
  description: 'Best Advocate in Jaipur | Ravi Kumar Sharma provides premium legal counsel, advocacy services, and expert legal solutions. 4.9★ Rated | 1100+ Clients | 980+ Cases Won',
  keywords: [
    'advocate in jaipur',
    'best advocate in jaipur',
    'lawyer jaipur',
    'legal counsel',
    'ravi kumar sharma',
    'rks.ad',
    'top rated advocate',
    'legal expert jaipur',
    'advocate nearby',
    'professional lawyer',
    'court advocate',
    'legal services jaipur',
    'best lawyer in jaipur',
    'legal consultant',
  ],
  authors: [{ name: 'Ravi Kumar Sharma' }],
  creator: 'Ravi Kumar Sharma',
  openGraph: {
    title: 'RKS.Ad - Best Advocate in Jaipur | Ravi Kumar Sharma',
    description: 'Premium legal services, advocacy, and expert legal counsel. 4.9★ Rated | 1100+ Clients | Available 24/7',
    type: 'website',
    url: 'https://rks.ad',
    siteName: 'RKS.Ad',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RKS.Ad - Best Advocate in Jaipur',
    description: 'Professional legal advocate and counsel services',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
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
      <head>
        <StructuredData />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}

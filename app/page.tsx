import { AnimatedBackground } from '@/components/animated-background'
import { HeroSection } from '@/components/hero-section'
import { ActionSection } from '@/components/action-section'
import { VisitorCounter } from '@/components/visitor-counter'
import { ClientsCounter } from '@/components/clients-counter'
import { ThemeToggle } from '@/components/theme-toggle'
import { ThemeScript } from '@/components/theme-script'

export default function Home() {
  return (
    <>
      <ThemeScript />
      <main className="min-h-screen bg-slate-950 text-white overflow-hidden transition-colors duration-300" data-theme="dark">
      <AnimatedBackground />
      <ThemeToggle />
      <HeroSection />
      <ClientsCounter />
      <ActionSection />

      {/* Footer with Visitor Counter */}
      <footer className="border-t border-gray-800 bg-slate-950/50 backdrop-blur py-4 md:py-6 px-4 text-center transition-colors duration-300 data-[theme=light]:border-gray-300 data-[theme=light]:bg-gray-50">
        <div className="max-w-4xl mx-auto">
          {/* Visitor Counter in Footer */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4">
            <VisitorCounter />
          </div>

          {/* Footer Text */}
          <p className="text-xs md:text-sm text-gray-500 transition-colors data-[theme=light]:text-gray-700">© 2026 Ravi Kumar Sharma, Advocate. All rights reserved.</p>
          <p className="text-xs md:text-xs mt-2 text-gray-600 transition-colors">⚖️ Premium Legal Services | 🎯 RKS.Ad | 📍 Jaipur</p>
          <p className="text-xs text-gray-600 mt-1 transition-colors data-[theme=light]:text-gray-700">📞 iam@rks.ad | 🌐 24/7 Available</p>
        </div>
      </footer>
    </main>
    </>
  )
}

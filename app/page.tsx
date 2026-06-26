import { AnimatedBackground } from '@/components/animated-background'
import { HeroSection } from '@/components/hero-section'
import { ActionSection } from '@/components/action-section'
import { VisitorCounter } from '@/components/visitor-counter'
import { ClientsCounter } from '@/components/clients-counter'
import { ThemeToggle } from '@/components/theme-toggle'

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 dark:bg-slate-950 light:bg-white text-slate-950 dark:text-white overflow-hidden transition-colors">
      <AnimatedBackground />
      <ThemeToggle />
      <HeroSection />
      <ClientsCounter />
      <ActionSection />

      {/* Footer with Visitor Counter */}
      <footer className="border-t border-gray-800 dark:border-gray-800 light:border-gray-200 bg-slate-950/50 dark:bg-slate-950/50 light:bg-gray-50/50 backdrop-blur py-4 md:py-6 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Visitor Counter in Footer */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4">
            <VisitorCounter />
          </div>

          {/* Footer Text */}
          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-500">© 2026 Ravi Kumar Sharma, Advocate. All rights reserved.</p>
          <p className="text-xs md:text-xs mt-2 text-gray-600 dark:text-gray-600">⚖️ Premium Legal Services | 🎯 RKS.Ad | 📍 Jaipur</p>
          <p className="text-xs text-gray-600 dark:text-gray-600 mt-1">📞 iam@rks.ad | 🌐 24/7 Available</p>
        </div>
      </footer>
    </main>
  )
}

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
      <style>{`
        main[data-theme="light"] {
          background-color: #ffffff !important;
          color: #0f172a !important;
        }
        main[data-theme="light"] * {
          color: #0f172a;
        }
        main[data-theme="light"] footer {
          background-color: #f3f4f6 !important;
          border-top-color: #d1d5db !important;
        }
        main[data-theme="light"] footer * {
          color: #0f172a;
        }
        main[data-theme="dark"] {
          background-color: #0f172a;
          color: #ffffff;
        }
      `}</style>
      <main className="min-h-screen bg-slate-950 text-white overflow-hidden transition-colors duration-300" data-theme="dark">
      <AnimatedBackground />
      <ThemeToggle />
      <HeroSection />
      <ClientsCounter />
      <ActionSection />

      {/* Footer with Visitor Counter */}
      <footer className="border-t backdrop-blur py-4 md:py-6 px-4 text-center transition-all duration-300" style={{
        borderColor: 'rgba(31, 41, 55, 0.8)',
        backgroundColor: 'rgba(15, 23, 42, 0.5)',
      }}>
        <div className="max-w-4xl mx-auto">
          {/* Visitor Counter in Footer */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4">
            <VisitorCounter />
          </div>

          {/* Footer Text */}
          <p className="text-xs md:text-sm text-gray-500 transition-colors">© 2026 Ravi Kumar Sharma, Advocate. All rights reserved.</p>
          <p className="text-xs md:text-xs mt-2 text-gray-600 transition-colors">⚖️ Premium Legal Services | 🎯 RKS.Ad | 📍 Jaipur</p>
          <p className="text-xs text-gray-600 mt-1 transition-colors">📞 iam@rks.ad | 🌐 24/7 Available</p>
        </div>
      </footer>
    </main>
    </>
  )
}

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
          color: #0f172a !important;
        }
        main[data-theme="light"] p,
        main[data-theme="light"] span,
        main[data-theme="light"] h1,
        main[data-theme="light"] h2,
        main[data-theme="light"] h3,
        main[data-theme="light"] div {
          color: #0f172a !important;
        }
        main[data-theme="light"] a {
          color: #0f172a !important;
        }
        main[data-theme="light"] button {
          color: inherit !important;
        }
        main[data-theme="light"] .text-gray-400 {
          color: #4b5563 !important;
        }
        main[data-theme="light"] .text-gray-500 {
          color: #6b7280 !important;
        }
        main[data-theme="light"] .text-gray-600 {
          color: #4b5563 !important;
        }
        main[data-theme="light"] .text-white {
          color: #0f172a !important;
        }
        main[data-theme="light"] footer {
          background-color: #f3f4f6 !important;
          border-top-color: #d1d5db !important;
        }
        main[data-theme="light"] footer * {
          color: #0f172a !important;
        }
        main[data-theme="light"] section {
          background-color: transparent !important;
        }
        main[data-theme="dark"] {
          background-color: #0f172a;
          color: #ffffff;
        }
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
      <main className="min-h-screen bg-slate-950 text-white overflow-x-hidden transition-colors duration-500" data-theme="dark">
        <AnimatedBackground />
        <ThemeToggle />

        {/* Hero Section */}
        <HeroSection />

        {/* Divider */}
        <div className="relative h-px max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
        </div>

        {/* Stats Section */}
        <ClientsCounter />

        {/* Divider */}
        <div className="relative h-px max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
        </div>

        {/* Action Section */}
        <ActionSection />

        {/* Footer with Visitor Counter */}
        <footer className="relative border-t backdrop-blur-xl py-8 md:py-12 px-4 text-center transition-all duration-500 overflow-hidden">
          {/* Footer background effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute bottom-0 left-1/4 w-64 h-32 bg-amber-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-32 bg-purple-500/10 rounded-full blur-3xl" />
          </div>

          <div className="max-w-4xl mx-auto relative z-10">
            {/* Visitor Counter */}
            <div className="flex justify-center mb-6 md:mb-8">
              <VisitorCounter />
            </div>

            {/* Divider line */}
            <div className="relative h-px mb-6 md:mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
            </div>

            {/* Contact Info */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-6 text-sm">
              <a
                href="mailto:iam@rks.ad"
                className="flex items-center gap-2 text-gray-400 hover:text-amber-400 transition-colors"
              >
                <span>iam@rks.ad</span>
              </a>
              <span className="text-gray-600">|</span>
              <span className="text-gray-400">Jaipur, India</span>
            </div>

            {/* Copyright */}
            <p className="text-xs md:text-sm text-gray-500 mb-2">
              &copy; 2026 Ravi Kumar Sharma, Advocate. All rights reserved.
            </p>

            {/* Tagline */}
            <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-600">
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/10">
                Premium Legal Services
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-purple-500/10">
                RKS.Ad
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-cyan-500/10">
                24/7 Available
              </span>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}

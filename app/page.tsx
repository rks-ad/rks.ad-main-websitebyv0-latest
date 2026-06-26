import { AnimatedBackground } from '@/components/animated-background'
import { HeroSection } from '@/components/hero-section'
import { ActionSection } from '@/components/action-section'
import { VisitorCounter } from '@/components/visitor-counter'
import { ClientsCounter } from '@/components/clients-counter'

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <AnimatedBackground />
      <VisitorCounter />
      <HeroSection />
      <ClientsCounter />
      <ActionSection />

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-slate-950/50 backdrop-blur py-6 md:py-8 px-4 text-center text-gray-500 text-sm md:text-base">
        <p>© 2026 Ravi Kumar Sharma, Advocate. All rights reserved.</p>
        <p className="text-xs md:text-sm mt-2">⚖️ Premium Legal Services | 🎯 RKS.Ad | 📍 Best Advocate in Jaipur</p>
        <p className="text-xs text-gray-600 mt-2">📞 Contact: iam@rks.ad | 🌐 Available 24/7 for Legal Consultations</p>
      </footer>
    </main>
  )
}

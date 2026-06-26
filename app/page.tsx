import { AnimatedBackground } from '@/components/animated-background'
import { HeroSection } from '@/components/hero-section'
import { ActionSection } from '@/components/action-section'
import { VisitorCounter } from '@/components/visitor-counter'

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <AnimatedBackground />
      <VisitorCounter />
      <HeroSection />
      <ActionSection />

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-slate-950/50 backdrop-blur py-8 text-center text-gray-500">
        <p>© 2026 Ravi Kumar Sharma, Advocate. All rights reserved.</p>
        <p className="text-sm mt-2">Premium Legal Services | RKS.Ad</p>
      </footer>
    </main>
  )
}

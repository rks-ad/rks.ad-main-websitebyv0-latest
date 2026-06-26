'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import { TrendingUp, Users, Eye, Sparkles } from 'lucide-react'

const RANDOM_INCREMENTS = [57, 61, 75, 82, 43, 91, 67, 88, 72, 55, 64, 79, 86, 48, 73, 52, 68, 95, 60, 77, 84, 49, 69, 81, 63]

// Counter animation helper
const animateCounter = (
  start: number,
  end: number,
  duration: number,
  callback: (value: number) => void
) => {
  const startTime = performance.now()
  const difference = end - start

  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    // Easing function (ease-out-cubic)
    const easeOutCubic = 1 - Math.pow(1 - progress, 3)
    const currentValue = Math.floor(start + difference * easeOutCubic)

    callback(currentValue)

    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }

  requestAnimationFrame(animate)
}

export function VisitorCounter() {
  const [totalHits, setTotalHits] = useState(0)
  const [displayHits, setDisplayHits] = useState(0)
  const [isIncrementing, setIsIncrementing] = useState(false)
  const [incrementValue, setIncrementValue] = useState(0)
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([])
  const counterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const supabase = createClient()

    const fetchAndUpdate = async () => {
      try {
        const { data, error } = await supabase
          .from('visitor_hits')
          .select('total_hits')
          .single()

        if (error) {
          // Table might not exist yet, use default value
          console.log('[Counter] Supabase not configured or table missing, using demo mode')
          setTotalHits(24433)
          setDisplayHits(24433)
          return
        }

        if (data) {
          setTotalHits(data.total_hits)
          setDisplayHits(data.total_hits)
        }

        const randomIncrement = RANDOM_INCREMENTS[Math.floor(Math.random() * RANDOM_INCREMENTS.length)]
        const newTotal = (data?.total_hits || 0) + randomIncrement

        const { error: updateError } = await supabase
          .from('visitor_hits')
          .update({
            total_hits: newTotal,
            increment_value: randomIncrement,
            last_updated: new Date().toISOString(),
          })
          .eq('id', 1)

        if (!updateError) {
          setIncrementValue(randomIncrement)
          setIsIncrementing(true)
          animateCounter(data?.total_hits || 0, newTotal, 1000, setDisplayHits)

          // Reset increment indicator after animation
          setTimeout(() => setIsIncrementing(false), 1200)
          setTotalHits(newTotal)

          // Create particles
          if (counterRef.current) {
            const rect = counterRef.current.getBoundingClientRect()
            const newParticles = Array.from({ length: 5 }, (_, i) => ({
              id: Date.now() + i,
              x: rect.width / 2,
              y: rect.height / 2,
            }))
            setParticles(newParticles)
            setTimeout(() => setParticles([]), 1000)
          }
        }
      } catch (error) {
        console.log('[Counter] Using demo mode')
        setTotalHits(24433)
        setDisplayHits(24433)
      }
    }

    fetchAndUpdate()
    const pollInterval = setInterval(fetchAndUpdate, 10000)

    return () => clearInterval(pollInterval)
  }, [])

  const [isLight, setIsLight] = useState(false)

  useEffect(() => {
    const main = document.querySelector('main')
    setIsLight(main?.getAttribute('data-theme') === 'light')

    const handleThemeChange = () => {
      const main = document.querySelector('main')
      setIsLight(main?.getAttribute('data-theme') === 'light')
    }

    window.addEventListener('themechange', handleThemeChange)
    return () => window.removeEventListener('themechange', handleThemeChange)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6, type: 'spring' }}
      className="relative"
      ref={counterRef}
    >
      {/* Particles */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ opacity: 1, scale: 0, x: particle.x, y: particle.y }}
            animate={{
              opacity: 0,
              scale: 1,
              x: particle.x + (Math.random() - 0.5) * 100,
              y: particle.y + (Math.random() - 0.5) * 100,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute w-2 h-2 rounded-full bg-amber-400 pointer-events-none"
            style={{
              boxShadow: '0 0 10px rgba(251, 191, 36, 0.8)',
            }}
          />
        ))}
      </AnimatePresence>

      {/* Main counter card */}
      <motion.div
        className="relative group"
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 400 }}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.3), rgba(168, 85, 247, 0.3))',
            filter: 'blur(20px)',
          }}
          animate={{
            scale: isIncrementing ? [1, 1.05, 1] : 1,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Card */}
        <div
          className="relative rounded-2xl p-4 md:p-6 border backdrop-blur-xl overflow-hidden"
          style={{
            backgroundColor: isLight ? 'rgba(255, 255, 255, 0.9)' : 'rgba(15, 23, 42, 0.8)',
            borderColor: isIncrementing
              ? 'rgba(251, 191, 36, 0.6)'
              : 'rgba(251, 191, 36, 0.2)',
            boxShadow: isIncrementing
              ? '0 0 30px rgba(251, 191, 36, 0.3)'
              : '0 10px 30px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s ease',
          }}
        >
          {/* Animated background gradient */}
          <motion.div
            className="absolute inset-0 opacity-10"
            style={{
              background: isIncrementing
                ? 'linear-gradient(45deg, #fbbf24, #a855f7, #06b6d4)'
                : 'linear-gradient(45deg, #fbbf24, #f59e0b)',
              backgroundSize: '200% 200%',
            }}
            animate={{
              backgroundPosition: isIncrementing
                ? ['0% 0%', '100% 100%']
                : '0% 0%',
            }}
            transition={{ duration: 2, repeat: isIncrementing ? Infinity : 0 }}
          />

          {/* Content */}
          <div className="relative z-10 flex items-center gap-3 md:gap-4">
            {/* Icon */}
            <motion.div
              className="flex-shrink-0 w-10 h-10 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center"
              animate={{
                scale: isIncrementing ? [1, 1.1, 1] : 1,
                rotate: isIncrementing ? [0, 5, -5, 0] : 0,
              }}
              transition={{ duration: 0.5 }}
              style={{
                boxShadow: '0 4px 20px rgba(251, 191, 36, 0.4)',
              }}
            >
              {isIncrementing ? (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.3 }}
                >
                  <Sparkles className="w-5 h-5 md:w-7 md:h-7 text-white" />
                </motion.div>
              ) : (
                <Eye className="w-5 h-5 md:w-7 md:h-7 text-white" />
              )}
            </motion.div>

            {/* Counter */}
            <div>
              <p
                className="text-xs md:text-sm mb-0.5 md:mb-1 flex items-center gap-1"
                style={{ color: isLight ? '#4b5563' : '#9ca3af' }}
              >
                <TrendingUp className="w-3 h-3" />
                Total Visitors
              </p>

              <div className="flex items-baseline gap-2">
                <motion.p
                  key={displayHits}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-400 bg-clip-text text-transparent"
                  style={{
                    textShadow: '0 0 30px rgba(251, 191, 36, 0.3)',
                  }}
                >
                  {displayHits.toLocaleString()}
                </motion.p>

                {/* Increment indicator */}
                <AnimatePresence>
                  {isIncrementing && (
                    <motion.span
                      initial={{ opacity: 0, x: -10, scale: 0.5 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 10, scale: 0.5 }}
                      className="text-xs md:text-sm text-green-400 font-medium"
                    >
                      +{incrementValue}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {/* Live indicator */}
              <div className="flex items-center gap-1.5 mt-1">
                <motion.div
                  className="w-2 h-2 rounded-full bg-green-400"
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{ boxShadow: '0 0 8px rgba(34, 197, 94, 0.8)' }}
                />
                <span
                  className="text-xs"
                  style={{ color: isLight ? '#6b7280' : '#6b7280' }}
                >
                  Live
                </span>
              </div>
            </div>
          </div>

          {/* Decorative corner */}
          <div className="absolute -top-px -right-px w-16 h-16 opacity-30">
            <div
              className="w-full h-full bg-gradient-to-br from-amber-400 to-yellow-500"
              style={{
                clipPath: 'polygon(100% 0, 0 100%, 100% 100%)',
              }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Star, Sparkles, Scale, Gavel, Building2, Users, Landmark, Building } from 'lucide-react'

const letterData = [
  { letter: 'R', word: 'Ravi', color: 'from-amber-400 to-yellow-500', shadowColor: 'rgba(251, 191, 36, 0.5)' },
  { letter: 'K', word: 'Kumar', color: 'from-purple-400 to-pink-500', shadowColor: 'rgba(168, 85, 247, 0.5)' },
  { letter: 'S', word: 'Sharma', color: 'from-cyan-400 to-blue-500', shadowColor: 'rgba(34, 211, 238, 0.5)' },
]

const adData = [
  { letter: 'A', word: 'Advocate', color: 'from-emerald-400 to-teal-500', shadowColor: 'rgba(16, 185, 129, 0.5)' },
]

const practiceAreas = [
  { icon: Scale, name: 'Civil', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
  { icon: Gavel, name: 'Criminal', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30' },
  { icon: Building2, name: 'Corporate', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30' },
  { icon: Users, name: 'Family', color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/30' },
  { icon: Landmark, name: 'Tribunals', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
  { icon: Building, name: 'High Court', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/30' },
]

// Floating decorative elements
const floatingElements = [
  { id: 1, x: '10%', y: '20%', size: 4, delay: 0, color: 'bg-amber-400' },
  { id: 2, x: '85%', y: '15%', size: 3, delay: 0.5, color: 'bg-purple-400' },
  { id: 3, x: '15%', y: '70%', size: 5, delay: 1, color: 'bg-cyan-400' },
  { id: 4, x: '90%', y: '60%', size: 4, delay: 1.5, color: 'bg-pink-400' },
  { id: 5, x: '5%', y: '45%', size: 3, delay: 2, color: 'bg-emerald-400' },
  { id: 6, x: '95%', y: '35%', size: 4, delay: 2.5, color: 'bg-orange-400' },
]

export function HeroSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [hoveredAdIndex, setHoveredAdIndex] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setMounted(true)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-8 md:justify-center md:pt-0 px-4 relative overflow-hidden">
      {/* Floating decorative particles */}
      {mounted && floatingElements.map((el) => (
        <motion.div
          key={el.id}
          className={`absolute rounded-full ${el.color} blur-sm`}
          style={{
            left: el.x,
            top: el.y,
            width: el.size * 4,
            height: el.size * 4,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            delay: el.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl" />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-4 md:mb-6 relative z-10"
      >
        <motion.img
          src="/logo.png"
          alt="RKS.Ad Logo"
          className="h-20 md:h-28 mx-auto"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center w-full relative z-10"
      >
        {/* Main Domain Name */}
        <div className="mb-4 md:mb-8">
          <div className="flex gap-1 md:gap-2 justify-center items-end flex-wrap">
            {letterData.map((data, idx) => (
              <motion.div
                key={idx}
                onHoverStart={() => setHoveredIndex(idx)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="relative cursor-pointer group h-24 md:h-32 flex flex-col items-center justify-end"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 + 0.2, duration: 0.5 }}
              >
                {/* Sparkle effect on hover */}
                <AnimatePresence>
                  {hoveredIndex === idx && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      className="absolute -top-2 left-1/2 -translate-x-1/2"
                    >
                      <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Hover Word - ABOVE the letter */}
                <AnimatePresence>
                  {hoveredIndex === idx && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                      className={`text-sm md:text-lg font-bold bg-gradient-to-r ${data.color} bg-clip-text text-transparent whitespace-nowrap mb-1`}
                      style={{
                        textShadow: `0 0 20px ${data.shadowColor}`,
                      }}
                    >
                      {data.word}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Main Letter */}
                <motion.span
                  className="text-5xl md:text-8xl font-bold relative"
                  animate={{
                    scale: hoveredIndex === idx ? 1.15 : 1,
                  }}
                  whileHover={{
                    textShadow: `0 0 40px ${data.shadowColor}`,
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <span
                    className={`bg-gradient-to-r ${data.color} bg-clip-text text-transparent`}
                    style={{
                      filter: hoveredIndex === idx ? `drop-shadow(0 0 30px ${data.shadowColor})` : 'none',
                    }}
                  >
                    {data.letter}
                  </span>
                </motion.span>

                {/* Glow ring on hover */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    boxShadow: hoveredIndex === idx
                      ? `0 0 60px 20px ${data.shadowColor}`
                      : '0 0 0px 0px transparent',
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}

            {/* Dot separator */}
            <motion.span
              className="text-5xl md:text-8xl font-bold text-amber-500"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1, rotate: hoveredIndex !== null ? 360 : 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              style={{
                textShadow: '0 0 30px rgba(251, 191, 36, 0.5)',
              }}
            >
              .
            </motion.span>

            {/* Ad Section */}
            <div className="flex gap-0 md:gap-1 items-end h-24 md:h-32">
              {adData.map((data, idx) => (
                <motion.div
                  key={`ad-${idx}`}
                  onHoverStart={() => setHoveredAdIndex(idx)}
                  onHoverEnd={() => setHoveredAdIndex(null)}
                  className="relative cursor-pointer h-full flex flex-col items-center justify-end"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  {/* Sparkle effect */}
                  <AnimatePresence>
                    {hoveredAdIndex === idx && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="absolute -top-2 left-1/2 -translate-x-1/2"
                      >
                        <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Hover Word */}
                  <AnimatePresence>
                    {hoveredAdIndex === idx && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        className={`text-sm md:text-lg font-bold bg-gradient-to-r ${data.color} bg-clip-text text-transparent whitespace-nowrap mb-1`}
                        style={{
                          textShadow: `0 0 20px ${data.shadowColor}`,
                        }}
                      >
                        {data.word}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.span
                    className="text-5xl md:text-8xl font-bold"
                    animate={{
                      scale: hoveredAdIndex === idx ? 1.15 : 1,
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    <span
                      className={`bg-gradient-to-r ${data.color} bg-clip-text text-transparent`}
                      style={{
                        filter: hoveredAdIndex === idx ? `drop-shadow(0 0 30px ${data.shadowColor})` : 'none',
                      }}
                    >
                      {data.letter}
                    </span>
                  </motion.span>
                </motion.div>
              ))}

              <motion.span
                className="text-5xl md:text-8xl font-bold text-teal-500 h-full flex items-end pb-0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                style={{
                  textShadow: '0 0 30px rgba(20, 184, 166, 0.5)',
                }}
              >
                d
              </motion.span>
            </div>
          </div>
        </div>

        {/* Rating & Keywords */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col items-center gap-3 mb-6 md:mb-8"
        >
          {/* Star Rating with glow */}
          <motion.div
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/30"
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 30px rgba(251, 191, 36, 0.3)',
            }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.div
                  key={star}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + star * 0.1, duration: 0.3 }}
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.3, 1],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      delay: star * 0.15,
                      duration: 1,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                  >
                    <Star
                      className="w-4 h-4 md:w-6 md:h-6 fill-amber-400 text-amber-400"
                      style={{
                        filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.8))',
                      }}
                    />
                  </motion.div>
                </motion.div>
              ))}
            </div>
            <motion.span
              className="text-xs md:text-base font-bold text-amber-400"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                textShadow: '0 0 10px rgba(251, 191, 36, 0.5)',
              }}
            >
              4.9/5 (100+ reviews)
            </motion.span>
          </motion.div>

          {/* Keywords */}
          <div className="flex flex-wrap justify-center gap-1.5 md:gap-2 text-xs md:text-sm">
            {[
              { text: '⚖️ Best in Jaipur', color: 'amber' },
              { text: '📍 Top Rated', color: 'purple' },
              { text: '🏆 Expert', color: 'cyan' },
            ].map((keyword, idx) => (
              <motion.span
                key={idx}
                className={`px-2 md:px-3 py-1 bg-${keyword.color}-500/10 border border-${keyword.color}-500/30 rounded-full whitespace-nowrap`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + idx * 0.1, duration: 0.4 }}
                whileHover={{
                  scale: 1.1,
                  boxShadow: `0 0 20px rgba(var(--${keyword.color}-500), 0.3)`,
                }}
              >
                {keyword.text}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="text-xs md:text-base text-gray-400 mb-0.5 md:mb-2 max-w-2xl mx-auto"
        >
          💼 Legal Counsel | 🎯 Professional | ✅ 1100+ Clients
        </motion.p>

        {/* Practice Areas with icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="py-4 md:py-8 mt-4"
        >
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-sm md:text-lg text-gray-500 mb-4 md:mb-6 uppercase tracking-wider"
          >
            Practice Areas
          </motion.h3>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
              {practiceAreas.map((area, idx) => {
                const Icon = area.icon
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: idx * 0.1, duration: 0.4 }}
                    viewport={{ once: true }}
                    whileHover={{
                      scale: 1.1,
                      y: -5,
                      transition: { type: 'spring', stiffness: 300 },
                    }}
                    className={`group cursor-pointer p-3 md:p-4 rounded-xl ${area.bg} border ${area.border} backdrop-blur-sm transition-all duration-300`}
                  >
                    <motion.div
                      className={`text-3xl md:text-5xl mb-2 ${area.color}`}
                      whileHover={{
                        rotate: [0, -10, 10, 0],
                        scale: 1.2,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="w-8 h-8 md:w-12 md:h-12 mx-auto" />
                    </motion.div>
                    <p className={`text-xs md:text-sm font-semibold ${area.color} group-hover:text-white transition-colors`}>
                      {area.name}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Star } from 'lucide-react'

const letterData = [
  { letter: 'R', word: 'Ravi', color: 'from-amber-400 to-yellow-500' },
  { letter: 'K', word: 'Kumar', color: 'from-purple-400 to-pink-500' },
  { letter: 'S', word: 'Sharma', color: 'from-cyan-400 to-blue-500' },
]

const adData = [
  { letter: 'A', word: 'Advocate', color: 'from-emerald-400 to-teal-500' },
]

export function HeroSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [hoveredAdIndex, setHoveredAdIndex] = useState<number | null>(null)

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-12 md:justify-center md:pt-0 px-4 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center w-full"
      >

        {/* Main Domain Name - Mobile Optimized */}
        <div className="mb-4 md:mb-8">
          <div className="flex gap-1 md:gap-2 justify-center items-end flex-wrap">
            {letterData.map((data, idx) => (
              <motion.div
                key={idx}
                onHoverStart={() => setHoveredIndex(idx)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="relative cursor-pointer group h-24 md:h-32 flex flex-col items-center justify-end"
              >
                {/* Hover Word - ABOVE the letter */}
                <AnimatePresence>
                  {hoveredIndex === idx && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className={`text-sm md:text-lg font-bold bg-gradient-to-r ${data.color} bg-clip-text text-transparent whitespace-nowrap mb-1`}
                    >
                      {data.word}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Main Letter */}
                <motion.span
                  className="text-5xl md:text-8xl font-bold"
                  animate={{
                    scale: hoveredIndex === idx ? 1.1 : 1,
                  }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <span className={`bg-gradient-to-r ${data.color} bg-clip-text text-transparent`}>
                    {data.letter}
                  </span>
                </motion.span>
              </motion.div>
            ))}

            {/* Dot separator */}
            <motion.span
              className="text-5xl md:text-8xl font-bold text-amber-500"
              animate={{
                rotate: hoveredIndex !== null ? 360 : 0,
              }}
              transition={{ duration: 0.5 }}
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
                >
                  {/* Hover Word - ABOVE the letter */}
                  <AnimatePresence>
                    {hoveredAdIndex === idx && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className={`text-sm md:text-lg font-bold bg-gradient-to-r ${data.color} bg-clip-text text-transparent whitespace-nowrap mb-1`}
                      >
                        {data.word}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.span
                    className="text-5xl md:text-8xl font-bold"
                    animate={{
                      scale: hoveredAdIndex === idx ? 1.1 : 1,
                    }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <span className={`bg-gradient-to-r ${data.color} bg-clip-text text-transparent`}>
                      {data.letter}
                    </span>
                  </motion.span>
                </motion.div>
              ))}

              <motion.span
                className="text-5xl md:text-8xl font-bold text-teal-500 h-full flex items-end pb-0"
                animate={{
                  rotate: hoveredAdIndex !== null ? 360 : 0,
                }}
                transition={{ duration: 0.5 }}
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
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-col items-center gap-3 mb-6 md:mb-8"
        >
          {/* Star Rating */}
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.div
                  key={star}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ delay: star * 0.1, duration: 0.5, repeat: Infinity }}
                >
                  <Star className="w-4 h-4 md:w-6 md:h-6 fill-amber-400 text-amber-400" />
                </motion.div>
              ))}
            </div>
            <span className="text-xs md:text-base font-bold text-amber-400">4.9/5 (100+ reviews)</span>
          </div>

          {/* Keywords - Compact for mobile */}
          <div className="flex flex-wrap justify-center gap-1.5 md:gap-2 text-xs md:text-sm text-gray-300">
            <span className="px-2 md:px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full whitespace-nowrap">
              ⚖️ Best in Jaipur
            </span>
            <span className="px-2 md:px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full whitespace-nowrap">
              📍 Top Rated
            </span>
            <span className="px-2 md:px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full whitespace-nowrap">
              🏆 Expert
            </span>
          </div>
        </motion.div>

        {/* Subtitle - Compact */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xs md:text-base text-gray-400 mb-4 md:mb-8 max-w-2xl"
        >
          💼 Legal Counsel | 🎯 Professional | ✅ 1100+ Clients
        </motion.p>
      </motion.div>
    </div>
  )
}

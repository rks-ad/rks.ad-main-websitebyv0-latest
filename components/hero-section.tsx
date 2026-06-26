'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

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
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        {/* Main Domain Name */}
        <div className="mb-8">
          <div className="flex gap-2 justify-center items-center flex-wrap">
            {letterData.map((data, idx) => (
              <motion.div
                key={idx}
                onHoverStart={() => setHoveredIndex(idx)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="relative cursor-pointer group"
              >
                {/* Main Letter */}
                <motion.span
                  className="text-7xl md:text-8xl font-bold"
                  animate={{
                    scale: hoveredIndex === idx ? 1.1 : 1,
                  }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <span className={`bg-gradient-to-r ${data.color} bg-clip-text text-transparent`}>
                    {data.letter}
                  </span>
                </motion.span>

                {/* Hover Word */}
                <AnimatePresence>
                  {hoveredIndex === idx && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: -60 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                      className={`absolute left-1/2 -translate-x-1/2 text-sm font-bold bg-gradient-to-r ${data.color} bg-clip-text text-transparent whitespace-nowrap`}
                    >
                      {data.word}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}

            {/* Dot separator */}
            <motion.span
              className="text-7xl md:text-8xl font-bold text-amber-500"
              animate={{
                rotate: hoveredIndex !== null ? 360 : 0,
              }}
              transition={{ duration: 0.5 }}
            >
              .
            </motion.span>

            {/* Ad Section */}
            <div className="flex gap-1">
              {adData.map((data, idx) => (
                <motion.div
                  key={`ad-${idx}`}
                  onHoverStart={() => setHoveredAdIndex(idx)}
                  onHoverEnd={() => setHoveredAdIndex(null)}
                  className="relative cursor-pointer"
                >
                  <motion.span
                    className="text-7xl md:text-8xl font-bold"
                    animate={{
                      scale: hoveredAdIndex === idx ? 1.1 : 1,
                    }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <span className={`bg-gradient-to-r ${data.color} bg-clip-text text-transparent`}>
                      {data.letter}
                    </span>
                  </motion.span>

                  <AnimatePresence>
                    {hoveredAdIndex === idx && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: -60 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                        className={`absolute left-1/2 -translate-x-1/2 text-sm font-bold bg-gradient-to-r ${data.color} bg-clip-text text-transparent whitespace-nowrap`}
                      >
                        {data.word}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}

              <motion.span
                className="text-7xl md:text-8xl font-bold text-teal-500"
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

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl"
        >
          Advocate & Legal Counsel | Professional Solutions for Your Legal Needs
        </motion.p>
      </motion.div>
    </div>
  )
}

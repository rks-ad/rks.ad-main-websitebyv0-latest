'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function ClientsCounter() {
  const [clientCount, setClientCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (hasAnimated) return

    let currentValue = 0
    const targetValue = 1100
    const increment = Math.ceil(targetValue / 50)
    const duration = 2000 // 2 seconds

    const startTime = Date.now()
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      currentValue = Math.floor(progress * targetValue)
      setClientCount(currentValue)

      if (progress === 1) {
        clearInterval(timer)
        setHasAnimated(true)
      }
    }, 30)

    return () => clearInterval(timer)
  }, [hasAnimated])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="py-3 md:py-6 px-4 bg-gradient-to-r from-amber-500/3 via-purple-500/3 to-cyan-500/3 border-y border-gray-800"
      style={{
        backgroundColor: 'transparent',
      }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 text-center">
          {/* Clients Served */}
          <div className="hover:scale-105 transition-transform duration-300">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0 }}
              className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent mb-2"
            >
              {clientCount.toLocaleString()}+
            </motion.div>
            <p className="text-gray-400 text-sm md:text-base">👥 Clients Served</p>
          </div>

          {/* Years Experience */}
          <div className="hover:scale-105 transition-transform duration-300">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2"
            >
              15+
            </motion.div>
            <p className="text-gray-400 text-sm md:text-base">📅 Years Experience</p>
          </div>

          {/* Cases Won */}
          <div className="col-span-2 md:col-span-1 hover:scale-105 transition-transform duration-300">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2"
            >
              980+
            </motion.div>
            <p className="text-gray-400 text-sm md:text-base">🏆 Cases Won</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

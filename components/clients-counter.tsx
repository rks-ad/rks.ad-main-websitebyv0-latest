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
      className="py-12 md:py-16 px-4 bg-gradient-to-r from-amber-500/5 via-purple-500/5 to-cyan-500/5 border-y border-gray-800"
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
          {/* Clients Served */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0 }}
          >
            <motion.div className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent mb-2">
              {clientCount.toLocaleString()}+
            </motion.div>
            <p className="text-gray-400 text-sm md:text-base">👥 Clients Served</p>
          </motion.div>

          {/* Years Experience */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2">
              15+
            </div>
            <p className="text-gray-400 text-sm md:text-base">📅 Years Experience</p>
          </motion.div>

          {/* Cases Won */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="col-span-2 md:col-span-1"
          >
            <div className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
              980+
            </div>
            <p className="text-gray-400 text-sm md:text-base">🏆 Cases Won</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

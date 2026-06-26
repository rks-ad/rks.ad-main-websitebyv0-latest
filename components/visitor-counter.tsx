'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'

const RANDOM_INCREMENTS = [57, 61, 75, 82, 43, 91, 67, 88, 72, 55, 64, 79, 86, 48, 73, 52, 68, 95, 60, 77, 84, 49, 69, 81, 63]

export function VisitorCounter() {
  const [totalHits, setTotalHits] = useState(0)
  const [displayHits, setDisplayHits] = useState(0)

  useEffect(() => {
    const supabase = createClient()
    let animationFrameId: NodeJS.Timeout

    const fetchAndUpdate = async () => {
      try {
        // Fetch current hits
        const { data, error } = await supabase
          .from('visitor_hits')
          .select('total_hits')
          .single()

        if (error) {
          console.error('[Counter] Error fetching hits:', error.message)
          return
        }

        if (data) {
          setTotalHits(data.total_hits)
          setDisplayHits(data.total_hits)
        }

        // Generate random increment
        const randomIncrement = RANDOM_INCREMENTS[Math.floor(Math.random() * RANDOM_INCREMENTS.length)]
        const newTotal = (data?.total_hits || 0) + randomIncrement

        // Update in database
        const { error: updateError } = await supabase
          .from('visitor_hits')
          .update({
            total_hits: newTotal,
            increment_value: randomIncrement,
            last_updated: new Date().toISOString(),
          })
          .eq('id', 1)

        if (updateError) {
          console.error('[Counter] Error updating hits:', updateError.message)
        } else {
          setTotalHits(newTotal)
        }
      } catch (error) {
        console.error('[Counter] Unexpected error:', error)
      }
    }

    // Fetch on mount
    fetchAndUpdate()

    // Poll for updates every 10 seconds
    const pollInterval = setInterval(fetchAndUpdate, 10000)

    return () => clearInterval(pollInterval)
  }, [])

  // Animate counter changes
  useEffect(() => {
    let currentValue = displayHits
    const targetValue = totalHits

    if (currentValue < targetValue) {
      const difference = targetValue - currentValue
      const stepValue = Math.ceil(difference / 20)

      const timer = setInterval(() => {
        currentValue += stepValue
        if (currentValue >= targetValue) {
          currentValue = targetValue
          clearInterval(timer)
        }
        setDisplayHits(currentValue)
      }, 50)

      return () => clearInterval(timer)
    }
  }, [totalHits, displayHits])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="fixed top-8 right-8 z-50"
    >
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
        <div className="relative bg-gradient-to-br from-slate-900 to-slate-950 rounded-full p-4 border border-amber-500/20 shadow-lg">
          <div className="text-center">
            <p className="text-xs text-gray-400 mb-1">Total Hits</p>
            <motion.p
              key={displayHits}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent"
            >
              {displayHits.toLocaleString()}
            </motion.p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

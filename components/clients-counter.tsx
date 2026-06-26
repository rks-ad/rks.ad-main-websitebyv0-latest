'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { Users, Calendar, Trophy, TrendingUp, Star } from 'lucide-react'

interface StatItem {
  value: number
  suffix: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  gradient: string
  delay: number
}

const stats: StatItem[] = [
  {
    value: 1100,
    suffix: '+',
    label: 'Clients Served',
    icon: Users,
    color: 'text-amber-400',
    gradient: 'from-amber-400 via-yellow-500 to-orange-500',
    delay: 0,
  },
  {
    value: 15,
    suffix: '+',
    label: 'Years Experience',
    icon: Calendar,
    color: 'text-purple-400',
    gradient: 'from-purple-400 via-pink-500 to-rose-500',
    delay: 0.1,
  },
  {
    value: 980,
    suffix: '+',
    label: 'Cases Won',
    icon: Trophy,
    color: 'text-cyan-400',
    gradient: 'from-cyan-400 via-blue-500 to-indigo-500',
    delay: 0.2,
  },
]

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2,
        ease: 'easeOut',
        onUpdate: (latest) => {
          setDisplayValue(Math.floor(latest))
        },
      })
      return () => controls.stop()
    }
  }, [isInView, value])

  return (
    <span ref={ref}>
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  )
}

export function ClientsCounter() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
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
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
      className="relative py-8 md:py-16 px-4 overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <motion.div
          className="absolute top-0 left-1/4 w-64 h-64 md:w-96 md:h-96 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(251, 191, 36, 0.1) 0%, transparent 70%)',
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-64 h-64 md:w-96 md:h-96 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)',
          }}
          animate={{
            x: [0, -30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-center mb-8 md:mb-12"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <TrendingUp className="w-4 h-4 text-amber-400" />
            <span className="text-sm text-amber-400 font-medium">Track Record</span>
          </motion.div>
          <h3 className="text-xl md:text-3xl font-bold text-gray-300">
            Delivering Excellence Since 2009
          </h3>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: stat.delay + 0.2, duration: 0.6, type: 'spring' }}
                whileHover={{
                  y: -8,
                  transition: { type: 'spring', stiffness: 300 },
                }}
                className="group relative"
              >
                {/* Glow background on hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${stat.color.replace('text-', 'rgba(var(--')}, 0.2) 0%, transparent 50%)`,
                  }}
                />

                {/* Card */}
                <div
                  className="relative p-6 md:p-8 rounded-2xl border backdrop-blur-sm transition-all duration-300"
                  style={{
                    backgroundColor: isLight ? 'rgba(255, 255, 255, 0.5)' : 'rgba(15, 23, 42, 0.5)',
                    borderColor: isLight ? 'rgba(209, 213, 219, 0.3)' : 'rgba(55, 65, 81, 0.3)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(251, 191, 36, 0.3)'
                    e.currentTarget.style.boxShadow = `0 20px 40px rgba(0, 0, 0, 0.2)`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = isLight ? 'rgba(209, 213, 219, 0.3)' : 'rgba(55, 65, 81, 0.3)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  {/* Icon */}
                  <motion.div
                    className={`w-12 h-12 md:w-16 md:h-16 rounded-xl mb-4 flex items-center justify-center`}
                    style={{
                      background: `linear-gradient(135deg, var(--${stat.color.replace('text-', '')}), transparent)`,
                      boxShadow: `0 10px 30px rgba(0, 0, 0, 0.2)`,
                    }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}>
                      <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                  </motion.div>

                  {/* Number */}
                  <motion.div
                    className={`text-4xl md:text-6xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: stat.delay + 0.4, duration: 0.5, type: 'spring' }}
                  >
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  </motion.div>

                  {/* Label */}
                  <motion.p
                    className="text-sm md:text-base text-gray-400"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: stat.delay + 0.5 }}
                  >
                    {stat.label}
                  </motion.p>

                  {/* Progress bar (decorative) */}
                  <motion.div
                    className="mt-4 h-1 rounded-full bg-gray-800 overflow-hidden"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: '100%' } : { width: 0 }}
                    transition={{ delay: stat.delay + 0.6, duration: 1 }}
                  >
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${stat.gradient}`}
                      initial={{ width: '0%' }}
                      animate={isInView ? { width: '100%' } : { width: '0%' }}
                      transition={{ delay: stat.delay + 0.8, duration: 1.5, ease: 'easeOut' }}
                    />
                  </motion.div>

                  {/* Rating stars for clients */}
                  {idx === 0 && (
                    <motion.div
                      className="flex gap-0.5 mt-3"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.8 }}
                    >
                      {[1, 2, 3, 4, 5].map((star) => (
                        <motion.div
                          key={star}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ delay: 0.9 + star * 0.05 }}
                        >
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom decorative elements */}
        <motion.div
          className="flex justify-center mt-8 md:mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center gap-4 text-gray-500">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gray-700" />
            <span className="text-xs md:text-sm uppercase tracking-wider">Excellence Guaranteed</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gray-700" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

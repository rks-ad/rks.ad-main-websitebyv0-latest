'use client'

import React, { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Briefcase, Calendar, ArrowRight, Sparkles, Zap } from 'lucide-react'

export function ActionSection() {
  const [isLight, setIsLight] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  React.useEffect(() => {
    const main = document.querySelector('main')
    setIsLight(main?.getAttribute('data-theme') === 'light')

    const handleThemeChange = () => {
      const main = document.querySelector('main')
      setIsLight(main?.getAttribute('data-theme') === 'light')
    }

    window.addEventListener('themechange', handleThemeChange)
    return () => window.removeEventListener('themechange', handleThemeChange)
  }, [])

  const actions = [
    {
      icon: Mail,
      title: 'Email Me',
      subtitle: 'Get in Touch',
      description: 'Direct communication for your legal needs',
      email: 'iam@rks.ad',
      link: 'mailto:iam@rks.ad',
      gradient: 'from-blue-500 via-cyan-500 to-teal-500',
      shadowColor: 'rgba(34, 211, 238, 0.4)',
      bgPattern: 'radial-gradient(circle at 30% 30%, rgba(34, 211, 238, 0.1) 0%, transparent 50%)',
    },
    {
      icon: Briefcase,
      title: 'My Cases',
      subtitle: 'View Portfolio',
      description: 'Explore my successful case history',
      email: 'ecourtsindia.com',
      link: 'https://ecourtsindia.com/advocate/ravi-kumar-sharma',
      gradient: 'from-purple-500 via-pink-500 to-rose-500',
      shadowColor: 'rgba(168, 85, 247, 0.4)',
      bgPattern: 'radial-gradient(circle at 70% 30%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
    },
    {
      icon: Calendar,
      title: 'Consult Now',
      subtitle: 'Book Appointment',
      description: 'Schedule a consultation today',
      email: 'cal.id/lawup',
      link: 'https://cal.id/lawup',
      gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
      shadowColor: 'rgba(16, 185, 129, 0.4)',
      bgPattern: 'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)',
    },
  ]

  return (
    <section ref={sectionRef} className="py-12 md:py-24 px-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-8 md:mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 mb-4"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-xs md:text-sm text-amber-400 font-medium">Let's Connect</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-6xl font-bold mb-3 md:mb-4"
          >
            <span className="bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-400 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="text-gray-400 text-sm md:text-lg max-w-xl mx-auto"
          >
            Ready to discuss your legal matters? Choose your preferred way to connect.
          </motion.p>
        </div>

        {/* Cards Container */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {actions.map((action, idx) => {
            const Icon = action.icon
            return (
              <motion.a
                key={idx}
                href={action.link}
                target={action.link.startsWith('http') ? '_blank' : undefined}
                rel={action.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + idx * 0.15, duration: 0.6 }}
                onHoverStart={() => setHoveredCard(idx)}
                onHoverEnd={() => setHoveredCard(null)}
                className="group relative"
              >
                {/* Glow effect behind card */}
                <motion.div
                  className="absolute inset-0 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: action.gradient,
                    filter: 'blur(40px)',
                    transform: 'scale(1.1)',
                  }}
                />

                {/* Main Card */}
                <motion.div
                  className="relative backdrop-blur-xl border rounded-2xl md:rounded-3xl p-4 md:p-8 transition-all duration-500 overflow-hidden"
                  style={{
                    backgroundColor: isLight ? 'rgba(255, 255, 255, 0.9)' : 'rgba(15, 23, 42, 0.7)',
                    borderColor: isLight ? 'rgba(209, 213, 219, 0.5)' : 'rgba(55, 65, 81, 0.5)',
                  }}
                  whileHover={{
                    y: -8,
                    borderColor: 'rgba(251, 191, 36, 0.5)',
                    boxShadow: `0 20px 40px ${action.shadowColor}`,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  {/* Background pattern */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: action.bgPattern }}
                  />

                  {/* Animated border gradient */}
                  <div className="absolute inset-0 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div
                      className="absolute inset-[-2px] rounded-2xl md:rounded-3xl"
                      style={{
                        background: `linear-gradient(45deg, transparent, ${action.shadowColor}, transparent)`,
                        animation: 'spin 3s linear infinite',
                      }}
                    />
                  </div>

                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"
                    style={{
                      background: 'linear-gradient(105deg, transparent 40%, rgba(255, 255, 255, 0.1) 45%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.1) 55%, transparent 60%)',
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon Container */}
                    <motion.div
                      className={`relative w-14 md:w-20 h-14 md:h-20 rounded-2xl bg-gradient-to-br ${action.gradient} flex items-center justify-center mb-4 md:mb-6`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                      style={{
                        boxShadow: `0 10px 30px ${action.shadowColor}`,
                      }}
                    >
                      {/* Icon glow */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{
                          background: 'inherit',
                          filter: 'blur(10px)',
                        }}
                      />
                      <Icon className="w-6 md:w-10 h-6 md:h-10 text-white relative z-10" />

                      {/* Floating sparkles around icon */}
                      {hoveredCard === idx && (
                        <>
                          <motion.div
                            className="absolute -top-1 -right-1"
                            animate={{ scale: [0, 1, 0], rotate: [0, 180] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                          >
                            <Sparkles className="w-3 h-3 text-white" />
                          </motion.div>
                          <motion.div
                            className="absolute -bottom-1 -left-1"
                            animate={{ scale: [0, 1, 0], rotate: [0, -180] }}
                            transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
                          >
                            <Sparkles className="w-3 h-3 text-white" />
                          </motion.div>
                        </>
                      )}
                    </motion.div>

                    {/* Text Content */}
                    <motion.h3
                      className="text-lg md:text-2xl font-bold mb-1 md:mb-2 group-hover:text-amber-400 transition-colors"
                      style={{ color: isLight ? '#0f172a' : '#ffffff' }}
                      layout
                    >
                      {action.title}
                    </motion.h3>

                    <p
                      className="text-xs md:text-sm mb-2 md:mb-3"
                      style={{ color: isLight ? '#4b5563' : '#9ca3af' }}
                    >
                      {action.description}
                    </p>

                    {/* Email/Link */}
                    <div className="flex items-center gap-2 mb-4 md:mb-6">
                      <div
                        className={`px-3 py-1 rounded-full text-xs md:text-sm font-mono bg-gradient-to-r ${action.gradient} bg-clip-text text-transparent`}
                        style={{
                          backgroundColor: isLight ? 'rgba(251, 191, 36, 0.1)' : 'rgba(251, 191, 36, 0.05)',
                        }}
                      >
                        {action.email}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <motion.div
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/30 group-hover:from-amber-500/30 group-hover:to-yellow-500/30 transition-all"
                      whileHover={{ scale: 1.02 }}
                    >
                      <Zap className="w-4 h-4 text-amber-400" />
                      <span className="text-xs md:text-sm text-amber-400 font-medium">
                        {action.title === 'Email Me' ? 'Send Email' : 'Open Link'}
                      </span>
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="w-4 h-4 text-amber-400" />
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Corner decorations */}
                  <div className="absolute top-0 right-0 w-20 h-20 opacity-20">
                    <div
                      className={`w-full h-full bg-gradient-to-br ${action.gradient}`}
                      style={{
                        clipPath: 'polygon(100% 0, 0 100%, 100% 100%)',
                        filter: 'blur(1px)',
                      }}
                    />
                  </div>
                </motion.div>
              </motion.a>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-8 md:mt-12"
        >
          <p className="text-gray-500 text-xs md:text-sm">
            Available 24/7 for urgent legal matters
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}

'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Briefcase, Calendar } from 'lucide-react'

export function ActionSection() {
  const [isLight, setIsLight] = React.useState(false)

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
      email: 'iam@rks.ad',
      link: 'mailto:iam@rks.ad',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Briefcase,
      title: 'My Cases',
      subtitle: 'View Portfolio',
      email: 'ecourtsindia.com',
      link: 'https://ecourtsindia.com/advocate/ravi-kumar-sharma',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Calendar,
      title: 'Consult Now',
      subtitle: 'Book Appointment',
      email: 'cal.id/lawup',
      link: 'https://cal.id/lawup',
      color: 'from-emerald-500 to-teal-500',
    },
  ]

  return (
    <section className="py-8 md:py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-2xl md:text-5xl font-bold text-center mb-2 md:mb-4 bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
          🎯 Connect
        </h2>
        <p className="text-gray-400 text-center mb-4 md:mb-12 text-xs md:text-base">
          Reach out for legal assistance
        </p>

        <div className="grid md:grid-cols-3 gap-3 md:gap-8">
          {actions.map((action, idx) => {
            const Icon = action.icon
            return (
              <motion.a
                key={idx}
                href={action.link}
                target={action.link.startsWith('http') ? '_blank' : undefined}
                rel={action.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
                className="group relative"
              >
                {/* Card */}
                <div 
                  className="relative backdrop-blur-sm border rounded-xl md:rounded-2xl p-3 md:p-8 transition-all duration-300 overflow-hidden"
                  style={{
                    backgroundColor: isLight ? '#f3f4f6' : 'rgb(15, 23, 42, 0.8)',
                    borderColor: isLight ? '#d1d5db' : 'rgb(55, 65, 81)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = isLight ? '#92400e' : 'rgb(217, 119, 6, 0.8)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = isLight ? '#d1d5db' : 'rgb(55, 65, 81)'
                  }}
                >
                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 opacity-0 group-hover:opacity-30 bg-gradient-to-r from-transparent via-amber-200 to-transparent"></div>

                  {/* Content */}
                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-10 md:w-16 h-10 md:h-16 rounded-full bg-gradient-to-br ${action.color} flex items-center justify-center mb-2 md:mb-6 group-hover:shadow-lg transition-shadow`}
                    >
                      <Icon className="w-5 md:w-8 h-5 md:h-8 text-white" />
                    </motion.div>

                    <h3 
                      className="text-base md:text-2xl font-bold mb-1 md:mb-2 group-hover:text-amber-400 transition-colors"
                      style={{ color: isLight ? '#0f172a' : '#ffffff' }}
                    >
                      {action.title}
                    </h3>
                    <p 
                      className="text-xs md:text-base mb-1 md:mb-4 hidden md:block"
                      style={{ color: isLight ? '#4b5563' : '#9ca3af' }}
                    >
                      {action.subtitle}
                    </p>
                    <p 
                      className="text-xs md:text-sm group-hover:text-amber-300 transition-colors font-mono truncate"
                      style={{ color: isLight ? '#6b7280' : '#9ca3af' }}
                    >
                      {action.email}
                    </p>

                    {/* Arrow indicator - hidden on mobile */}
                    <motion.div
                      className="mt-2 md:mt-6 flex items-center gap-2 text-amber-400 hidden md:flex"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <span className="text-sm">Click to {action.title === 'Email Me' ? 'send' : 'visit'}</span>
                      <span>→</span>
                    </motion.div>
                  </div>
                </div>
              </motion.a>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}

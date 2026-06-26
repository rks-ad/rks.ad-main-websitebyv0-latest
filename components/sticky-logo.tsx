'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export function StickyLogo() {
  const [scrolled, setScrolled] = useState(false)
  const [isLight, setIsLight] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    // Check theme
    const main = document.querySelector('main')
    setIsLight(main?.getAttribute('data-theme') === 'light')

    // Handle theme changes
    const handleThemeChange = () => {
      const main = document.querySelector('main')
      setIsLight(main?.getAttribute('data-theme') === 'light')
    }
    window.addEventListener('themechange', handleThemeChange)

    // Handle scroll
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('themechange', handleThemeChange)
    }
  }, [])

  return (
    <>
      {/* Sticky Logo - Hidden until scroll */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 20 }}
        animate={scrolled ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.5, y: 20 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="fixed top-6 left-6 z-40 pointer-events-auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          backgroundColor: isLight ? '#f3f4f6' : 'rgba(15, 23, 42, 0.95)',
          borderRadius: '12px',
          padding: '6px',
          backdropFilter: 'blur(10px)',
          border: `1px solid ${isLight ? '#d1d5db' : 'rgba(55, 65, 81, 0.5)'}`,
          boxShadow: isHovered
            ? isLight
              ? '0 0 20px rgba(212, 175, 55, 0.5), 0 4px 12px rgba(0, 0, 0, 0.15)'
              : '0 0 25px rgba(212, 175, 55, 0.4), 0 10px 25px rgba(212, 175, 55, 0.2), 0 0 40px rgba(212, 175, 55, 0.1)'
            : isLight 
              ? '0 4px 6px rgba(0, 0, 0, 0.1)'
              : '0 10px 15px rgba(0, 0, 0, 0.3)',
          transition: 'box-shadow 0.3s ease',
        }}
      >
        <motion.a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          className="block cursor-pointer"
        >
          <img
            src="/logo.png"
            alt="RKS.Ad Logo"
            className="h-12 w-12 object-contain transition-all duration-300"
            style={{
              filter: isHovered 
                ? 'drop-shadow(0 0 12px rgba(212, 175, 55, 0.6)) brightness(1.1)' 
                : 'drop-shadow(0 0 0px rgba(212, 175, 55, 0))',
            }}
          />
        </motion.a>
      </motion.div>

      {/* Hero Logo - Visible at top */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mb-4 md:mb-6"
      >
        <img
          src="/logo.png"
          alt="RKS.Ad Logo"
          className="h-20 md:h-28 mx-auto"
        />
      </motion.div>
    </>
  )
}

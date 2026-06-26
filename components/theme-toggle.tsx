'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { motion } from 'framer-motion'

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const initialTheme = saved || systemTheme
    setTheme(initialTheme)
    applyTheme(initialTheme)
  }, [])

  const applyTheme = (newTheme: 'light' | 'dark') => {
    const html = document.documentElement
    const main = document.querySelector('main')
    const footer = document.querySelector('footer')
    
    if (newTheme === 'light') {
      html.style.colorScheme = 'light'
      document.body.style.backgroundColor = '#ffffff'
      if (main) {
        main.style.backgroundColor = '#ffffff !important'
        main.style.color = '#0f172a !important'
        main.setAttribute('data-theme', 'light')
      }
      if (footer) {
        footer.style.backgroundColor = '#f3f4f6 !important'
        footer.style.borderTopColor = '#d1d5db'
      }
    } else {
      html.style.colorScheme = 'dark'
      document.body.style.backgroundColor = '#0f172a'
      if (main) {
        main.style.backgroundColor = '#0f172a'
        main.style.color = '#ffffff'
        main.setAttribute('data-theme', 'dark')
      }
      if (footer) {
        footer.style.backgroundColor = 'rgba(15, 23, 42, 0.5)'
        footer.style.borderTopColor = '#1e293b'
      }
    }
    localStorage.setItem('theme', newTheme)
  }

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    
    // Update data-theme immediately
    const main = document.querySelector('main')
    if (main) {
      main.setAttribute('data-theme', newTheme)
    }
    
    applyTheme(newTheme)
    // Emit custom event for page to listen
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: newTheme } }))
  }

  if (!mounted) return null

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 p-1.5 rounded-full bg-amber-500/20 border border-amber-500/30 hover:border-amber-500 backdrop-blur-sm transition-all"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-amber-400" />
      ) : (
        <Moon className="w-4 h-4 text-amber-400" />
      )}
    </motion.button>
  )
}

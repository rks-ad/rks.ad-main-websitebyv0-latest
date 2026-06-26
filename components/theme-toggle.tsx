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
    
    if (newTheme === 'light') {
      html.style.colorScheme = 'light'
      html.style.backgroundColor = 'white'
      html.style.color = '#1e293b'
      document.body.style.backgroundColor = 'white'
      document.body.style.color = '#1e293b'
      if (main) {
        main.style.backgroundColor = 'white'
        main.style.color = '#1e293b'
        main.setAttribute('data-theme', 'light')
      }
    } else {
      html.style.colorScheme = 'dark'
      html.style.backgroundColor = '#0f172a'
      html.style.color = 'white'
      document.body.style.backgroundColor = '#0f172a'
      document.body.style.color = 'white'
      if (main) {
        main.style.backgroundColor = '#0f172a'
        main.style.color = 'white'
        main.setAttribute('data-theme', 'dark')
      }
    }
    localStorage.setItem('theme', newTheme)
  }

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
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
      className="fixed top-4 right-4 z-50 p-2 rounded-full bg-amber-500/20 border border-amber-500/30 hover:border-amber-500 backdrop-blur-sm transition-all"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-amber-400" />
      ) : (
        <Moon className="w-5 h-5 text-amber-400" />
      )}
    </motion.button>
  )
}

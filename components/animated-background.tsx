'use client'

import React, { useEffect, useRef, useState } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  decay: number
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const gradientOffsetRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Create burst of particles on click
      for (let i = 0; i < 25; i++) {
        const angle = (Math.PI * 2 * i) / 25
        const velocity = 2 + Math.random() * 3
        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          size: 2 + Math.random() * 4,
          opacity: 1,
          decay: 0.02 + Math.random() * 0.03,
        })
      }
    }

    window.addEventListener('resize', handleResize)
    canvas.addEventListener('click', handleClick)

    const animate = () => {
      // Clear with gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradientOffsetRef.current += 0.0005

      const hue1 = (200 + Math.sin(gradientOffsetRef.current) * 30) % 360
      const hue2 = (280 + Math.sin(gradientOffsetRef.current + Math.PI) * 30) % 360

      gradient.addColorStop(0, `hsl(${hue1}, 70%, 15%)`)
      gradient.addColorStop(0.5, `hsl(220, 60%, 12%)`)
      gradient.addColorStop(1, `hsl(${hue2}, 70%, 18%)`)

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((p) => {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.1 // gravity
        p.opacity -= p.decay

        if (p.opacity <= 0) return false

        ctx.fillStyle = `hsla(${40 + Math.random() * 40}, 100%, 50%, ${p.opacity})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()

        return true
      })

      // Draw random particles for ambiance
      if (Math.random() < 0.3) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: 0.5 + Math.random() * 1.5,
          opacity: Math.random() * 0.5,
          decay: 0.005 + Math.random() * 0.01,
        })
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      canvas.removeEventListener('click', handleClick)
    }
  }, [])

  const [isLight, setIsLight] = useState(false)

  useEffect(() => {
    const main = document.querySelector('main')
    const isLightMode = main?.getAttribute('data-theme') === 'light'
    setIsLight(isLightMode)

    const handleThemeChange = () => {
      const main = document.querySelector('main')
      setIsLight(main?.getAttribute('data-theme') === 'light')
    }

    window.addEventListener('themechange', handleThemeChange)
    return () => window.removeEventListener('themechange', handleThemeChange)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      style={{ opacity: isLight ? 0 : 0.5 }}
    />
  )
}

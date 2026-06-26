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
  color: string
  life: number
  maxLife: number
}

interface FloatingShape {
  x: number
  y: number
  size: number
  rotation: number
  rotationSpeed: number
  floatOffset: number
  floatSpeed: number
  opacity: number
  type: 'triangle' | 'square' | 'circle' | 'hexagon'
  color: string
}

interface ConnectionLine {
  x1: number
  y1: number
  x2: number
  y2: number
  opacity: number
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const shapesRef = useRef<FloatingShape[]>([])
  const connectionsRef = useRef<ConnectionLine[]>([])
  const gradientOffsetRef = useRef(0)
  const mouseRef = useRef({ x: 0, y: 0, active: false })
  const timeRef = useRef(0)

  // Color palette
  const colors = {
    gold: '#fbbf24',
    amber: '#f59e0b',
    purple: '#a855f7',
    cyan: '#06b6d4',
    emerald: '#10b981',
    pink: '#ec4899',
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Initialize floating shapes
    const initShapes = () => {
      const shapes: FloatingShape[] = []
      const shapeCount = Math.floor((canvas.width * canvas.height) / 80000)

      for (let i = 0; i < shapeCount; i++) {
        const types: FloatingShape['type'][] = ['triangle', 'square', 'circle', 'hexagon']
        shapes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: 20 + Math.random() * 40,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          floatOffset: Math.random() * Math.PI * 2,
          floatSpeed: 0.5 + Math.random() * 1,
          opacity: 0.03 + Math.random() * 0.08,
          type: types[Math.floor(Math.random() * types.length)],
          color: Object.values(colors)[Math.floor(Math.random() * Object.values(colors).length)],
        })
      }
      shapesRef.current = shapes
    }

    initShapes()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initShapes()
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current.active = false
    }

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Create explosion of particles
      for (let i = 0; i < 50; i++) {
        const angle = (Math.PI * 2 * i) / 50 + Math.random() * 0.2
        const velocity = 2 + Math.random() * 6
        const colorValues = Object.values(colors)
        const randomColor = colorValues[Math.floor(Math.random() * colorValues.length)]

        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          size: 2 + Math.random() * 6,
          opacity: 1,
          decay: 0.015 + Math.random() * 0.02,
          color: randomColor,
          life: 0,
          maxLife: 100,
        })
      }

      // Create ripple effect
      connectionsRef.current.push({
        x1: x,
        y1: y,
        x2: x + 150,
        y2: y,
        opacity: 0.5,
      })
    }

    window.addEventListener('resize', handleResize)
    canvas.addEventListener('click', handleClick)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    // Draw functions
    const drawShape = (shape: FloatingShape, time: number) => {
      const floatY = Math.sin(time * 0.001 * shape.floatSpeed + shape.floatOffset) * 30

      ctx.save()
      ctx.translate(shape.x, shape.y + floatY)
      ctx.rotate(shape.rotation + timeRef.current * shape.rotationSpeed)
      ctx.globalAlpha = shape.opacity

      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, shape.size)
      gradient.addColorStop(0, shape.color)
      gradient.addColorStop(1, 'transparent')

      ctx.strokeStyle = shape.color
      ctx.lineWidth = 1

      switch (shape.type) {
        case 'triangle':
          ctx.beginPath()
          for (let i = 0; i < 3; i++) {
            const angle = (Math.PI * 2 * i) / 3 - Math.PI / 2
            const x = Math.cos(angle) * shape.size
            const y = Math.sin(angle) * shape.size
            if (i === 0) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)
          }
          ctx.closePath()
          ctx.stroke()
          break

        case 'square':
          ctx.strokeRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size)
          break

        case 'circle':
          ctx.beginPath()
          ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2)
          ctx.stroke()
          break

        case 'hexagon':
          ctx.beginPath()
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI * 2 * i) / 6
            const x = Math.cos(angle) * shape.size / 2
            const y = Math.sin(angle) * shape.size / 2
            if (i === 0) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)
          }
          ctx.closePath()
          ctx.stroke()
          break
      }

      ctx.restore()
    }

    const drawAurora = (time: number) => {
      const layers = 5
      for (let layer = 0; layer < layers; layer++) {
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height * 2)
        const hueOffset = Math.sin(time * 0.0003 + layer) * 30

        gradient.addColorStop(0, `hsla(${200 + hueOffset}, 80%, 30%, 0)`)
        gradient.addColorStop(0.3, `hsla(${260 + hueOffset}, 70%, 40%, 0.02)`)
        gradient.addColorStop(0.5, `hsla(${180 + hueOffset}, 60%, 50%, 0.03)`)
        gradient.addColorStop(0.7, `hsla(${300 + hueOffset}, 70%, 40%, 0.02)`)
        gradient.addColorStop(1, `hsla(${220 + hueOffset}, 80%, 30%, 0)`)

        ctx.fillStyle = gradient
        ctx.fillRect(0, layer * 100, canvas.width, canvas.height)
      }
    }

    const drawParticleNetwork = () => {
      const networkParticles: { x: number; y: number }[] = []

      // Add some fixed network nodes
      for (let i = 0; i < 15; i++) {
        networkParticles.push({
          x: Math.sin(timeRef.current * 0.0005 + i * 0.5) * 200 + canvas.width / 2,
          y: Math.cos(timeRef.current * 0.0003 + i * 0.5) * 150 + canvas.height / 2,
        })
      }

      // Draw connections
      ctx.strokeStyle = colors.gold
      ctx.lineWidth = 0.5

      for (let i = 0; i < networkParticles.length; i++) {
        for (let j = i + 1; j < networkParticles.length; j++) {
          const dx = networkParticles[i].x - networkParticles[j].x
          const dy = networkParticles[i].y - networkParticles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 200) {
            ctx.globalAlpha = (1 - dist / 200) * 0.15
            ctx.beginPath()
            ctx.moveTo(networkParticles[i].x, networkParticles[i].y)
            ctx.lineTo(networkParticles[j].x, networkParticles[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      networkParticles.forEach((p, i) => {
        ctx.globalAlpha = 0.3 + Math.sin(timeRef.current * 0.002 + i) * 0.2
        ctx.fillStyle = colors.gold
        ctx.beginPath()
        ctx.arc(p.x, p.y, 3 + Math.sin(timeRef.current * 0.003 + i) * 2, 0, Math.PI * 2)
        ctx.fill()
      })

      ctx.globalAlpha = 1
    }

    const animate = () => {
      timeRef.current = Date.now()
      gradientOffsetRef.current += 0.0003

      // Create base gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      const hue1 = (200 + Math.sin(gradientOffsetRef.current) * 30) % 360
      const hue2 = (280 + Math.sin(gradientOffsetRef.current + Math.PI) * 30) % 360

      gradient.addColorStop(0, `hsl(${hue1}, 70%, 8%)`)
      gradient.addColorStop(0.3, `hsl(230, 60%, 10%)`)
      gradient.addColorStop(0.5, `hsl(240, 50%, 12%)`)
      gradient.addColorStop(0.7, `hsl(250, 60%, 10%)`)
      gradient.addColorStop(1, `hsl(${hue2}, 70%, 8%)`)

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw aurora effect
      drawAurora(timeRef.current)

      // Draw floating shapes
      shapesRef.current.forEach((shape) => {
        drawShape(shape, timeRef.current)
        shape.rotation += shape.rotationSpeed
      })

      // Draw particle network
      drawParticleNetwork()

      // Mouse interaction - attract particles
      if (mouseRef.current.active) {
        const gradient = ctx.createRadialGradient(
          mouseRef.current.x,
          mouseRef.current.y,
          0,
          mouseRef.current.x,
          mouseRef.current.y,
          200
        )
        gradient.addColorStop(0, 'rgba(251, 191, 36, 0.1)')
        gradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.05)')
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((p) => {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.15 // gravity
        p.vx *= 0.99 // friction
        p.opacity -= p.decay
        p.life++

        if (p.opacity <= 0 || p.life > p.maxLife) return false

        // Draw particle with glow
        ctx.save()
        ctx.globalAlpha = p.opacity
        ctx.shadowBlur = 15
        ctx.shadowColor = p.color
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * p.opacity, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        // Draw trail
        ctx.globalAlpha = p.opacity * 0.3
        ctx.strokeStyle = p.color
        ctx.lineWidth = p.size * 0.5
        ctx.beginPath()
        ctx.moveTo(p.x, p.y)
        ctx.lineTo(p.x - p.vx * 3, p.y - p.vy * 3)
        ctx.stroke()
        ctx.globalAlpha = 1

        return true
      })

      // Add ambient floating particles
      if (Math.random() < 0.15) {
        const colorValues = Object.values(colors)
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: canvas.height + 10,
          vx: (Math.random() - 0.5) * 0.5,
          vy: -0.3 - Math.random() * 0.5,
          size: 1 + Math.random() * 2,
          opacity: 0.3 + Math.random() * 0.4,
          decay: 0.002 + Math.random() * 0.003,
          color: colorValues[Math.floor(Math.random() * colorValues.length)],
          life: 0,
          maxLife: 300,
        })
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      canvas.removeEventListener('click', handleClick)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

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
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-auto"
        style={{ opacity: isLight ? 0.05 : 0.7 }}
      />
      {/* Gradient overlay for depth */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: isLight
            ? 'transparent'
            : 'radial-gradient(ellipse at center, transparent 0%, rgba(15, 23, 42, 0.3) 100%)',
        }}
      />
    </>
  )
}

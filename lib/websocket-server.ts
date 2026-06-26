import { Server as SocketServer } from 'socket.io'
import type { Server as HTTPServer } from 'http'

let io: SocketServer | null = null

export function initializeWebSocket(httpServer: HTTPServer) {
  if (io) return io

  io = new SocketServer(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  })

  io.on('connection', (socket) => {
    console.log('[WebSocket] Client connected:', socket.id)

    socket.on('request-hits', () => {
      socket.emit('hits-data', { timestamp: Date.now() })
    })

    socket.on('disconnect', () => {
      console.log('[WebSocket] Client disconnected:', socket.id)
    })
  })

  return io
}

export function getWebSocketServer() {
  return io
}

export function broadcastHitUpdate(totalHits: number) {
  if (io) {
    io.emit('hits-updated', { totalHits, timestamp: Date.now() })
  }
}

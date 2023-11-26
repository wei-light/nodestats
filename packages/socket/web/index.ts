import { type Socket, io } from 'socket.io-client'
import type { IStats, ServerToWebEvents, WebToServerEvents } from '../type'

export function connectWebToServer(cb: (stats: IStats[]) => void) {
  const socket: Socket<ServerToWebEvents, WebToServerEvents> = io()

  socket.on('connect', () => {
    socket.emit('web-server:ready')
  })

  socket.on('server-web:push', cb)
}

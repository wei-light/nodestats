import { type Socket, io } from 'socket.io-client'
import type { ClientToServerEvents, ServerToClientEvents } from '../type'
import { Status } from './status'

export function connectClientToServer(
  ip: string,
  port: number,
  token: string,
) {
  const address = `ws://${ip}:${port}`
  const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(address)

  const status = new Status()

  socket.on('connect', () => {
    socket.emit('client-server:ready', token)
  })

  socket.on('server-client:verified', async () => {
    while (socket.connected) {
      await status.update()
      socket.emit('client-server:push', token, status)

      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  })

  socket.on('disconnect', () => {})
  socket.on('connect_error', () => {})
}

import { type Socket, io } from 'socket.io-client'
import logger from '@nodestats/logger'
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

  logger.info(`Try to connect to ${address} ...`)

  socket.on('connect', () => {
    socket.emit('client-server:ready', token)
  })

  socket.on('server-client:verified', async () => {
    logger.success('Successfully connected to the server')

    while (socket.connected) {
      await status.update()
      socket.emit('client-server:push', token, status)

      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  })

  socket.on('disconnect', (reason) => {
    if (reason === 'io server disconnect')
      logger.warn(`Disconnect: ${reason}, the token may be incorrect`)
    else if (reason === 'transport close')
      logger.warn(`Disconnect: ${reason}, the service may be down`)
    else
      logger.warn(`Disconnect: ${reason}`)
  })

  socket.on('connect_error', () => {
    logger.error('Connect Error: check whether the connection options are correct')
  })
}

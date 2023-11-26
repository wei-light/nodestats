import type http from 'node:http'
import type { Socket } from 'socket.io'
import { Server } from 'socket.io'
import type {
  ClientToServerEvents,
  IClientConfigOptions,
  IStats,
  ServerToClientEvents,
  ServerToWebEvents,
  WebToServerEvents,
} from '../type'
import { randomString, setMapValToArr } from './utils'

export function createSocketIOServer(
  server: http.Server,
  clients: IClientConfigOptions[],
  interval: number,
) {
  const connected = new WeakMap<Socket, string>()
  const stats = new Map<string, IStats>()

  clients.forEach((c) => {
    // eslint-disable-next-line unused-imports/no-unused-vars
    const { token, ...rest } = c
    stats.set(c.token, { key: randomString(), online: false, ...rest })
  })

  const io = new Server(server)

  io.on('connection', (socket) => {
    web(socket, stats, interval)
    client(socket, connected, stats)
  })
}

function web(
  socket: Socket<WebToServerEvents, ServerToWebEvents>,
  stats: Map<string, IStats>,
  interval: number,
) {
  socket.on('web-server:ready', async () => {
    while (socket.connected) {
      socket.emit('server-web:push', setMapValToArr(stats))
      await new Promise(resolve => setTimeout(resolve, interval))
    }
  })
}

function client(
  socket: Socket<ClientToServerEvents, ServerToClientEvents>,
  connected: WeakMap<Socket, string>,
  stats: Map<string, IStats>,
) {
  socket.on('client-server:ready', (token) => {
    const data = stats.get(token)

    if (data) {
      connected.set(socket, token)
      stats.set(token, { ...data, online: true })

      socket.emit('server-client:verified')
    }
    else {
      socket.disconnect()
    }
  })

  socket.on('client-server:push', (token, status) => {
    const data = stats.get(token)

    if (data)
      stats.set(token, { ...data, ...status })
  })

  socket.on('disconnect', () => {
    const token = connected.get(socket)

    if (token) {
      const data = stats.get(token)

      if (data)
        stats.set(token, { ...data, online: false })
    }
  })
}

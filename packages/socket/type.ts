export interface IStatus {
  uptime: number
  avgLoad: number
  cpuUsage: number
  memoryTotal: number
  memoryUsed: number
  swapTotal: number
  swapUsed: number
  diskTotal: number
  diskUsed: number
  diskPartition: Record<string, [number, number]>
}

// Socket Type
export interface ServerToClientEvents {
  'server-client:verified': () => void
}

export interface ClientToServerEvents {
  'client-server:ready': (token: string) => void
  'client-server:push': (token: string, status: IStatus) => void
}

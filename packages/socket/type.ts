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

export interface IClientConfigOptions {
  token: string
  name: string
  os: string
  location: string
}

export type IStats = Partial<IStatus> & Omit<IClientConfigOptions, 'token'> & { key: string, online: boolean }

// Socket Type
export interface ServerToClientEvents {
  'server-client:verified': () => void
}

export interface ClientToServerEvents {
  'client-server:ready': (token: string) => void
  'client-server:push': (token: string, status: IStatus) => void
}

export interface ServerToWebEvents {
  'server-web:push': (stats: IStats[]) => void
}

export interface WebToServerEvents {
  'web-server:ready': () => void
}

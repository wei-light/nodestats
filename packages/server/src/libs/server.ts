import http from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import Koa from 'koa'
import koaStatic from 'koa-static'
import { packageDirectorySync } from 'pkg-dir'
import logger from '@nodestats/shared/logger'
import { createSocketIOServer } from '@nodestats/socket/server'
import type { IClientConfigOptions } from '@nodestats/socket/type'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export function bootServer(port: number, clients: IClientConfigOptions[], interval: number) {
  const app = new Koa()
  const httpServer = http.createServer(app.callback())
  createSocketIOServer(httpServer, clients, interval)

  app.use(koaStatic(path.resolve(packageDirectorySync({ cwd: __dirname })!, 'dist')))

  httpServer.listen(port, () => {
    logger.info(`Ready on http://0.0.0.0:${port}`)
  })
}

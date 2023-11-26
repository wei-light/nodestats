import path from 'node:path'
import fs from 'node:fs'
import { type Plugin, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import yaml from 'js-yaml'

import type { IClientConfigOptions } from '@nodestats/socket/type'
import { createSocketIOServer } from '../socket/server'

export default defineConfig({
  resolve: {
    alias: [
      { find: '@nodestats', replacement: path.resolve(__dirname, '../') },
    ],
  },
  plugins: [
    vue(),
    socketPlug(),
  ],
})

function socketPlug() {
  return {
    name: 'vite-plugin-socket-plug',
    configureServer({ httpServer }) {
      if (httpServer) {
        const doc = yaml.load(fs.readFileSync(path.resolve(__dirname, '../../__config/clients.yaml'), 'utf8')) as IClientConfigOptions[]
        createSocketIOServer(httpServer, doc, 2000)
      }
    },
  } satisfies Plugin
}

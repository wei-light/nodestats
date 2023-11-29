import path from 'node:path'
import { fileURLToPath } from 'node:url'
import shell from 'shelljs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const configPath = path.resolve(__dirname, '../rollup.config.js')

// Build @nodestats/client
shell.exec(`npx cross-env TARGET=client npx rollup -c ${configPath}`)

// Build @nodestats/server
shell.exec(`npx cross-env TARGET=server npx rollup -c ${configPath}`)

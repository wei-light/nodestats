import path from 'node:path'
import { fileURLToPath } from 'node:url'
import figlet from 'figlet'
import pkgDir from 'pkg-dir'
import { readPackageSync } from 'read-pkg'
import { program } from 'commander'
import logger from '@nodestats/shared/logger'
import { integerSchema, portSchema } from '@nodestats/shared/schema'
import { bootServer } from './libs/server'
import { readClients } from './libs/read-clients'

interface ICommandOptions {
  port?: string
  interval?: string
  clientConfig?: string
}

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const { version } = readPackageSync({ cwd: pkgDir.sync(__dirname)! })

program
  .name('nodestats-server')
  .description('CLI to start a nodestats server')
  .option('-p, --port <port>', 'port number')
  .option('-i, --interval <interval>', 'interval push stats to web')
  .option('--client-config <path>', 'client configuration absolute path')
  .version(`v${version}`, '-v, --version', 'output the current version')
  .parse()

const options = program.opts<ICommandOptions>()

const port = Number(options.port ?? 35601)
const interval = !options.interval || Number(options.interval) < 1000 ? 2000 : Number(options.interval)
const clientConfig = options.clientConfig

if (portSchema.validate(port).error) {
  logger.error('The port is invalid')
  process.exit(1)
}
if (integerSchema.validate(interval).error) {
  logger.error('The interval must be an integer')
  process.exit(1)
}
if (!clientConfig || !path.isAbsolute(clientConfig)) {
  logger.error('You must specify the absolute path to the client configuration')
  process.exit(1)
}

const clients = readClients(clientConfig)

if (!clients)
  process.exit(1)

// eslint-disable-next-line no-console
console.log(
  figlet.textSync('nodestats', {
    horizontalLayout: 'fitted',
    verticalLayout: 'default',
    width: 80,
    whitespaceBreak: true,
  }),
)

bootServer(port, clients, interval)

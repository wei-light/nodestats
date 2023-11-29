import { program } from 'commander'
import figlet from 'figlet'
import logger from '@nodestats/shared/logger'
import { ipSchema, portSchema } from '@nodestats/shared/schema'
import { connectClientToServer } from '@nodestats/socket/client'

interface ICommandOptions {
  server?: string
  port?: string
  token?: string
}

program
  .name('nodestats-client')
  .description('CLI to start a nodestats client')
  .option('-s, --server <server>', 'server host')
  .option('-p, --port <port>', 'server port number')
  .option('-t, --token <token>', 'access token')
  .parse()

const options = program.opts<ICommandOptions>()

const server = options.server ?? '127.0.0.1'
const port = Number(options.port ?? 35601)
const token = options.token

if (ipSchema.validate(server).error) {
  logger.error('The ip is invalid')
  process.exit(1)
}
if (portSchema.validate(port).error) {
  logger.error('The port is invalid')
  process.exit(1)
}
if (!token) {
  logger.error('The token must be specified')
  process.exit(1)
}

// eslint-disable-next-line no-console
console.log(
  figlet.textSync('nodestats', {
    horizontalLayout: 'fitted',
    verticalLayout: 'default',
    width: 80,
    whitespaceBreak: true,
  }),
)

connectClientToServer(server, port, token)

import validator from 'validator'
import figlet from 'figlet'
import { program } from 'commander'
import { connectClientToServer } from '@nodestats/socket/client'
import logger from '@nodestats/shared/logger'

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
const port = (options.port ?? 35601).toString()
const token = options.token

if (!validator.isIP(server, 4)) {
  logger.error('The ip you have specified is not a valid ipv4')
  process.exit(1)
}
if (!validator.isPort(port)) {
  logger.error('The port you have specified is not a valid port')
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

connectClientToServer(server, Number(port), token)

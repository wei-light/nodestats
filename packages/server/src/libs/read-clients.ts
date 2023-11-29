import fs from 'node:fs'
import yaml from 'js-yaml'
import logger from '@nodestats/shared/logger'
import type { IClientConfigOptions } from '@nodestats/socket/type'
import { clientArraySchema } from '@nodestats/shared/schema'

export function readClients(filePath: string): IClientConfigOptions[] | undefined {
  const doc = yaml.load(fs.readFileSync(filePath, 'utf8'))

  if (clientArraySchema.validate(doc).error) {
    logger.error('Client configuration file validation failed')
    return
  }

  return doc as IClientConfigOptions[]
}

import { randomBytes } from 'node:crypto'

export const randomString = (size = 16) => randomBytes(Math.ceil(size * 0.5)).toString('hex').slice(0, size)

export function setMapValToArr<T>(map: Map<any, T>) {
  const arr: T[] = []

  for (const val of map.values())
    arr.push(val)

  return arr
}

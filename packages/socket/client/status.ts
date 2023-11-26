import si from 'systeminformation'
import type { IStatus } from '../type'

export class Status implements IStatus {
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

  async getLoad() {
    const [
      { uptime },
      { avgLoad, currentLoad },
    ] = await Promise.all([si.time(), si.currentLoad()])

    this.uptime = uptime
    this.avgLoad = avgLoad
    this.cpuUsage = currentLoad
  }

  async getMemory() {
    const { total, used, swaptotal, swapused } = await si.mem()

    this.memoryTotal = total
    this.memoryUsed = used
    this.swapTotal = swaptotal
    this.swapUsed = swapused
  }

  async getDisk() {
    const fsArr = await si.fsSize()
    this.diskTotal = 0
    this.diskUsed = 0
    this.diskPartition = {}

    for (const fs of fsArr) {
      this.diskTotal += fs.size
      this.diskUsed += fs.used
      this.diskPartition[fs.fs] = [fs.used, fs.size]
    }
  }

  async update() {
    await Promise.all([this.getLoad(), this.getMemory(), this.getDisk()])
  }
}

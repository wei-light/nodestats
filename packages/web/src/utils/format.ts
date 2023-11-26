import bytes from 'bytes'
import humanizeDuration from 'humanize-duration'

const format = {
  bytes: (val: number) => bytes.format(val),
  seconds: (val: number) => humanizeDuration(val, { language: 'zh_CN', largest: 2 }),
}

export {
  format,
}

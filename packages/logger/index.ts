/* eslint-disable no-console */
import chalk from 'chalk'

interface ICustomOptions {
  titleColor: string
}

function custom(title: string, text: string, { titleColor }: ICustomOptions) {
  const time = new Date().toLocaleTimeString()

  if (typeof window === 'undefined')
    console.log(chalk.hex('#aaa')(time), chalk.hex(titleColor)(`[${title}]`), text)
  else
    console.log(`%c${time} %c[${title}] `, `color: #aaa`, `color: ${titleColor}`, text)
}

function factory(title: string, titleColor: string) {
  return (text: string) => custom(title, text, { titleColor })
}

export default {
  info: factory('INFO', '#67e8f9'),
  success: factory('SUCCESS', '#bef264'),
  warn: factory('WARN', '#fde047'),
  error: factory('ERROR', '#fda4af'),
  custom,
}

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'rollup'
import typescript from '@rollup/plugin-typescript'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const resolvePkg = path.resolve(__dirname, 'packages', process.env.TARGET)

export default defineConfig({
  input: path.resolve(resolvePkg, 'src/index.ts'),
  output: {
    file: path.resolve(resolvePkg, 'output.js'),
    format: 'esm',
  },
  plugins: [
    typescript(),
  ],
})

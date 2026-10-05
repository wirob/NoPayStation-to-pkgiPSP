// @ts-check
import { defineConfig } from 'eslint/config'
import { baseConfig } from '@repo/eslint-config/base'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const tsconfigRootDir = dirname(fileURLToPath(import.meta.url))

export default defineConfig(...baseConfig, {
  languageOptions: {
    parserOptions: {
      tsconfigRootDir,
    },
  },
})

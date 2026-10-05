// @ts-check
import { defineConfig } from 'eslint/config'
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'
import globals from 'globals'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const tsconfigRootDir = dirname(fileURLToPath(import.meta.url))

export default defineConfig(
  {
    files: ['**/*.{ts}'],
    ignores: ['dist/', 'node_modules/'],
  },
  {
    extends: [eslint.configs.recommended, tseslint.configs.recommended],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        tsconfigRootDir,
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { fixStyle: 'separate-type-imports' },
      ],
    },
  },
  eslintConfigPrettier,
)

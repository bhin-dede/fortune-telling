import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended', 'prettier'),
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'react-hooks/exhaustive-deps': 'off',
    },
  },
  { ignores: ['dist/', 'build/', 'node_modules/', '.next/', 'scripts/', '*.min.js'] },
]

export default eslintConfig

const path = require('path')
const fs = require('fs')

const rootPath = path.join(__dirname, '../')
const distPath = path.join(rootPath, 'dist')

// package.production.json
const {
  version,
  devDependencies,
  scripts: { start: startScript },
  ...packageJson
} = require(path.join(rootPath, 'package.json'))
const adjustedPackageJson = JSON.stringify({ version, ...packageJson, scripts: { start: startScript } })
fs.writeFileSync(path.join(distPath, 'package.json'), adjustedPackageJson)

// next.config.mjs
// const nextConfig = fs.readFileSync(path.join(rootPath, 'next.config.mjs'), 'utf8')
// fs.writeFileSync(path.join(distPath, 'next.config.mjs'), nextConfig)

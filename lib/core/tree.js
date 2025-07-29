import fs from 'fs'
import path from 'path'
import { loadConfig } from './config.js'

/**
 * Genera el árbol ASCII de un directorio, respetando la configuración.
 */
function buildTree(dirPath, prefix = '', config) {
  const { ignoreFolders, ignoreExtensions, ignoreFiles } = config
  const entries = fs.readdirSync(dirPath, { withFileTypes: true })
    .filter(entry => {
      if (entry.isDirectory()) return !ignoreFolders.includes(entry.name)
      const ext = path.extname(entry.name)
      return !ignoreExtensions.includes(ext) && !ignoreFiles.includes(entry.name)
    })

  const lines = []
  entries.forEach((entry, idx) => {
    const isLast = idx === entries.length - 1
    const pointer = isLast ? '└── ' : '├── '
    const newPrefix = prefix + (isLast ? '    ' : '│   ')
    lines.push(prefix + pointer + entry.name)
    if (entry.isDirectory()) {
      lines.push(...buildTree(path.join(dirPath, entry.name), newPrefix, config))
    }
  })
  return lines
}

/**
 * Devuelve el árbol completo como string.
 */
export function getStructure(root = process.cwd()) {
  const config = loadConfig()
  const baseName = path.basename(root)
  const body = buildTree(root, '', config)
  return [baseName, ...body].join('\n')
}
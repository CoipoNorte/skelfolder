// lib/tree.js

import fs from 'fs'
import path from 'path'
import { loadConfig } from './config.js'

// Cargamos las reglas de ignore desde el JSON
const { ignoreFolders, ignoreExtensions } = loadConfig()
const IGNORE_FOLDERS    = new Set(ignoreFolders)
const IGNORE_EXTENSIONS = new Set(ignoreExtensions)

/**
 * Recorre recursivamente un directorio y genera líneas de árbol ASCII.
 * @param {string} dirPath Ruta al directorio a procesar
 * @param {string} prefix Prefijo ASCII para sangría
 * @returns {string[]} Array de líneas formateadas
 */
function buildTree(dirPath, prefix = '') {
  // Leemos entradas y filtramos según carpetas y extensiones
  const entries = fs
    .readdirSync(dirPath, { withFileTypes: true })
    .filter(entry => {
      if (entry.isDirectory()) {
        return !IGNORE_FOLDERS.has(entry.name)
      } else {
        const ext = path.extname(entry.name)
        return !IGNORE_EXTENSIONS.has(ext)
      }
    })

  const lines = []
  entries.forEach((entry, index) => {
    const isLast = index === entries.length - 1
    // Elegimos el puntero └── para el último o ├── para los demás
    const pointer = isLast ? '└── ' : '├── '
    // Nuevo prefijo para los hijos
    const newPrefix = prefix + (isLast ? '    ' : '│   ')

    // Agregamos la línea con nombre de archivo o carpeta
    lines.push(prefix + pointer + entry.name)
    // Si es carpeta, recurse buildTree
    if (entry.isDirectory()) {
      const childPath = path.join(dirPath, entry.name)
      lines.push(...buildTree(childPath, newPrefix))
    }
  })

  return lines
}

/**
 * Genera el árbol completo con el nombre de la carpeta raíz.
 * @param {string} [root=process.cwd()] Directorio raíz
 * @returns {string} Texto formateado con nuevolines
 */
export function getStructure(root = process.cwd()) {
  const baseName = path.basename(root)
  const header = [baseName]
  const body = buildTree(root)
  // Unimos header y body con saltos de línea
  return header.concat(body).join('\n')
}

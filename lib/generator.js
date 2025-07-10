// lib/generator.js

import fs from 'fs'
import path from 'path'

/**
 * Limpia el nombre:
 *  - Elimina comentarios tras '#'
 *  - Quita '/' final
 *  - Recorta espacios
 */
function cleanName(raw) {
  return raw
    .split('#')[0]          // todo lo antes de '#'
    .replace(/\/$/, '')     // elimina slash final
    .trim()
}

/**
 * Parsea líneas de ASCII-tree y devuelve [{name, level},…]
 * Omite líneas con nombres '...' o que empiecen con '…'
 */
export function parseLines(lines) {
  return lines
    .map(line => {
      const m = line.match(/^([│\s]*)(?:[├└]─+)?\s*(.*)$/)
      const prefix  = m[1] || ''
      const rawName = m[2] || ''
      const name    = cleanName(rawName)
      const level   = Math.floor(prefix.length / 3)
      return { name, level }
    })
    .filter(({ name }) => {
      // filtrar nombres redundantes de IA
      if (!name) return false
      if (name === '...') return false
      if (name.startsWith('…')) return false
      return true
    })
}

/**
 * Crea carpetas y archivos según los nodos,
 * determinando si es archivo si NO tiene hijos inmediatos.
 */
export function buildFromNodes(nodes, rootPath) {
  const stack = [rootPath]

  nodes.forEach((node, idx) => {
    const { name, level } = node
    const next = nodes[idx + 1]
    const hasChild = next && next.level > level
    // Es archivo si NO tiene hijos, o si detecta extensión,
    // o si es un dot-file ('.env', '.gitignore', etc.) hoja.
    const ext = path.extname(name)
    const isFile = !hasChild && (ext !== '' || name.startsWith('.'))

    const parent = stack[level]
    const target = path.join(parent, name)
    stack[level + 1] = target

    if (isFile) {
      fs.mkdirSync(path.dirname(target), { recursive: true })
      fs.writeFileSync(target, '', 'utf-8')
    } else {
      fs.mkdirSync(target, { recursive: true })
    }
  })
}

/**
 * Lee un Markdown, extrae el primer bloque entre backticks,
 * parsea y genera la estructura incluyendo la carpeta raíz.
 */
export function generateFromFile(mdFile, dest = process.cwd()) {
  const content = fs.readFileSync(mdFile, 'utf-8')
  const blk = content.match(/```.*?[\r\n]+([\s\S]*?)```/)
  if (!blk) {
    console.error('No se encontró ningún bloque de código.')
    process.exit(1)
  }

  const allLines = blk[1]
    .split(/\r?\n/)
    .map(l => l.replace(/\t/g, '    '))
    .filter(l => l.trim())
  if (allLines.length < 2) {
    console.error('Bloque demasiado corto para generar estructura.')
    process.exit(1)
  }

  // Línea 0 = carpeta raíz
  const rootName   = cleanName(allLines[0])
  const childLines = allLines.slice(1)
  const nodes      = parseLines(childLines)

  const absRoot = path.resolve(dest, rootName)
  fs.mkdirSync(absRoot, { recursive: true })
  buildFromNodes(nodes, absRoot)

  console.log(`Estructura '${rootName}' creada en ${absRoot}`)
}

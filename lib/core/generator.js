import fs from 'fs'
import path from 'path'
import { isValidName } from '../utils/validate.js'

function cleanName(raw) {
  return raw.split('#')[0].replace(/\/$/, '').trim()
}

export function parseLines(lines) {
  return lines
    .map(line => {
      const m = line.match(/^([│\s]*)(?:[├└]─+)?\s*(.*)$/)
      const prefix = m[1] || ''
      const rawName = m[2] || ''
      const name = cleanName(rawName)
      const level = Math.floor(prefix.length / 3)
      return { name, level }
    })
    .filter(({ name }) => isValidName(name))
}

export function buildFromNodes(nodes, rootPath) {
  const stack = [rootPath]
  nodes.forEach((node, idx) => {
    const { name, level } = node
    const next = nodes[idx + 1]
    const hasChild = next && next.level > level
    const ext = path.extname(name)
    const isFile = !hasChild && (ext !== '' || name.startsWith('.'))
    const parent = stack[level]
    const target = path.join(parent, name)
    stack[level + 1] = target
    if (isFile) {
      fs.mkdirSync(path.dirname(target), { recursive: true })
      if (!fs.existsSync(target)) fs.writeFileSync(target, '', 'utf-8')
    } else {
      fs.mkdirSync(target, { recursive: true })
    }
  })
}

export function generateFromFile(mdFile, dest = process.cwd()) {
  const content = fs.readFileSync(mdFile, 'utf-8')
  const blk = content.match(/```.*?[\r\n]+([\s\S]*?)```/)
  if (!blk) throw new Error('No se encontró ningún bloque de código.')
  const allLines = blk[1].split(/\r?\n/).map(l => l.replace(/\t/g, '    ')).filter(l => l.trim())
  if (allLines.length < 2) throw new Error('Bloque demasiado corto para generar estructura.')
  const rootName = cleanName(allLines[0])
  const childLines = allLines.slice(1)
  const nodes = parseLines(childLines)
  const absRoot = path.resolve(dest, rootName)
  fs.mkdirSync(absRoot, { recursive: true })
  buildFromNodes(nodes, absRoot)
  return absRoot
}
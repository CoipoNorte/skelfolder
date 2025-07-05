// lib/generator.js

import fs from 'fs'
import path from 'path'

/**
 * Parsea líneas de ASCII tree y devuelve nodos con nivel.
 */
export function parseLines(lines) {
  return lines.map(line => {
    const prefixMatch = line.match(/^([│├└─\s]+)/) || ['']
    const prefix = prefixMatch[0]
    const name = line
      .replace(prefix, '')
      .replace(/^[├└]──\s?/, '')
    const level = (prefix.match(/│   |    /g) || []).length
    return { name, level }
  })
}

/**
 * Crea carpetas/archivos según nodos bajo rootPath.
 */
export function buildFromNodes(nodes, rootPath) {
  const stack = [rootPath]
  nodes.forEach(({ name, level }) => {
    const parent = stack[level]
    const target = path.join(parent, name)
    stack[level + 1] = target

    if (path.extname(name)) {
      fs.mkdirSync(path.dirname(target), { recursive: true })
      fs.writeFileSync(target, '', 'utf-8')
    } else {
      fs.mkdirSync(target, { recursive: true })
    }
  })
}

/**
 * Lee un Markdown, extrae el bloque ```plaintext``` (LF/CRLF),
 * omite la primera línea (nombre raíz) y genera dentro de dest.
 */
export function generateFromFile(mdFile, dest = process.cwd()) {
  // Asegura que dest exista
  const absDest = path.resolve(dest)
  if (!fs.existsSync(absDest)) {
    fs.mkdirSync(absDest, { recursive: true })
  }

  const content = fs.readFileSync(mdFile, 'utf-8')
  const regex = /```plaintext\s*[\r\n]+([\s\S]*?)```/i
  const match = content.match(regex)

  if (!match) {
    console.error(
      'No se encontró bloque ```plaintext``` en el Markdown.'
    )
    process.exit(1)
  }

  // Dividimos en líneas y quitamos vacías
  const allLines = match[1].split(/\r?\n/).filter(l => l.trim())
  if (allLines.length < 2) {
    console.error('Tu bloque `plaintext` debe contener al menos dos líneas.')
    process.exit(1)
  }

  // Omitimos la primera (nombre raíz) y ajustamos niveles a partir de cero
  const childLines = allLines.slice(1)
  const childNodes = parseLines(childLines).map(({ name, level }) => ({
    name,
    level: level // nivel 0 se corresponde con raíz ➔ dest
  }))

  buildFromNodes(childNodes, absDest)
  console.log(`Estructura creada en ${absDest}`)
}

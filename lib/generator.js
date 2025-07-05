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
 * crea la carpeta raíz y genera dentro sus hijos.
 */
export function generateFromFile(mdFile, dest = process.cwd()) {
  const content = fs.readFileSync(mdFile, 'utf-8')
  // captura el bloque plaintext
  const regex = /```plaintext\s*[\r\n]+([\s\S]*?)```/i
  const match = content.match(regex)

  if (!match) {
    console.error('No se encontró bloque ```plaintext``` en el Markdown.')
    process.exit(1)
  }

  // dividimos en líneas y quitamos vacías
  const allLines = match[1].split(/\r?\n/).filter(l => l.trim())
  if (allLines.length < 1) {
    console.error('El bloque ```plaintext``` está vacío.')
    process.exit(1)
  }

  // La primera línea es el nombre de la carpeta raíz
  const rootName = allLines[0].trim()
  // Las demás son nodos hijos
  const childLines = allLines.slice(1)
  const childNodes = parseLines(childLines)

  // Preparamos la ruta destino + rootName
  const absDestRoot = path.resolve(dest, rootName)
  fs.mkdirSync(absDestRoot, { recursive: true })

  // Generamos hijos dentro de absDestRoot
  buildFromNodes(childNodes, absDestRoot)
  console.log(`Estructura '${rootName}' creada en ${path.resolve(dest)}`)
}

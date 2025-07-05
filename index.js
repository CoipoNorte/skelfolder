// index.js

import fs from 'fs'
import path from 'path'
import { getStructure } from './lib/tree.js'
import {
  loadConfig,
  saveConfig
} from './lib/config.js'

/**
 * Muestra en consola la estructura de carpetas.
 * @param {string} [root=process.cwd()]
 */
export function read(root = process.cwd()) {
  const tree = getStructure(root)
  console.log(tree)
}

/**
 * Guarda la estructura en un archivo Markdown.
 * @param {string} [root=process.cwd()]
 * @param {string} [filename='STRUCTURE.md']
 */
export function save(root = process.cwd(), filename = 'STRUCTURE.md') {
  const tree = getStructure(root)
  const markdown = '```plaintext\n' + tree + '\n```'
  const dest = path.join(root, filename)
  fs.writeFileSync(dest, markdown, 'utf-8')
  console.log(`Estructura guardada en ${filename}`)
}

/**
 * Añade una carpeta a ignorar y actualiza la config JSON.
 * @param {string} name Nombre de la carpeta
 */
export function addFolder(name) {
  const cfg = loadConfig()
  if (!cfg.ignoreFolders.includes(name)) {
    cfg.ignoreFolders.push(name)
    saveConfig(cfg)
    console.log(`Carpeta '${name}' añadida a ignorar.`)
  } else {
    console.log(`La carpeta '${name}' ya estaba en la lista.`)
  }
}

/**
 * Elimina una carpeta de la lista de ignores.
 * @param {string} name Nombre de la carpeta
 */
export function removeFolder(name) {
  const cfg = loadConfig()
  const idx = cfg.ignoreFolders.indexOf(name)
  if (idx !== -1) {
    cfg.ignoreFolders.splice(idx, 1)
    saveConfig(cfg)
    console.log(`Carpeta '${name}' eliminada de ignorar.`)
  } else {
    console.log(`La carpeta '${name}' no estaba en la lista.`)
  }
}

/**
 * Añade una extensión de archivo a ignorar.
 * @param {string} ext Extensión con o sin punto
 */
export function addExtension(ext) {
  if (!ext.startsWith('.')) ext = '.' + ext
  const cfg = loadConfig()
  if (!cfg.ignoreExtensions.includes(ext)) {
    cfg.ignoreExtensions.push(ext)
    saveConfig(cfg)
    console.log(`Extensión '${ext}' añadida a ignorar.`)
  } else {
    console.log(`La extensión '${ext}' ya estaba en la lista.`)
  }
}

/**
 * Elimina una extensión de la lista de ignores.
 * @param {string} ext Extensión con o sin punto
 */
export function removeExtension(ext) {
  if (!ext.startsWith('.')) ext = '.' + ext
  const cfg = loadConfig()
  const idx = cfg.ignoreExtensions.indexOf(ext)
  if (idx !== -1) {
    cfg.ignoreExtensions.splice(idx, 1)
    saveConfig(cfg)
    console.log(`Extensión '${ext}' eliminada de ignorar.`)
  } else {
    console.log(`La extensión '${ext}' no estaba en la lista.`)
  }
}

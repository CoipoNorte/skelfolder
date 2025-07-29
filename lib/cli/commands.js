import { getStructure } from '../core/tree.js'
import { loadConfig, saveConfig } from '../core/config.js'
import { generateFromFile } from '../core/generator.js'
import { isValidName } from '../utils/validate.js'
import path from 'path'
import fs from 'fs'

export function save(dir) {
  if (typeof dir === 'object' && dir !== null) dir = undefined
  const root = dir || process.cwd()
  const filename = 'STRUCTURE.md'
  try {
    const tree = getStructure(root)
    const markdown = '```plaintext\n' + tree + '\n```'
    const dest = path.join(root, filename)
    fs.writeFileSync(dest, markdown, 'utf-8')
    console.log(`Estructura guardada en ${filename}`)
  } catch (e) {
    console.error('Error al guardar la estructura:', e.message)
  }
}

export function read(dir) {
  if (typeof dir === 'object' && dir !== null) dir = undefined
  const root = dir || process.cwd()
  try {
    const tree = getStructure(root)
    console.log(tree)
  } catch (e) {
    console.error('Error al leer la estructura:', e.message)
  }
}

export function addFolder(name) {
  if (!isValidName(name)) return console.error('Nombre de carpeta inválido.')
  const cfg = loadConfig()
  if (!cfg.ignoreFolders.includes(name)) {
    cfg.ignoreFolders.push(name)
    saveConfig(cfg)
    console.log(`Carpeta '${name}' añadida a ignorar.`)
  } else {
    console.log(`La carpeta '${name}' ya estaba en la lista.`)
  }
}

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

export function viewFolders() {
  const { ignoreFolders } = loadConfig()
  if (ignoreFolders.length === 0) {
    console.log('No hay carpetas en la lista de ignoradas.')
  } else {
    console.log('Carpetas ignoradas:')
    ignoreFolders.forEach(f => console.log('  -', f))
  }
}

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

export function viewExtensions() {
  const { ignoreExtensions } = loadConfig()
  if (ignoreExtensions.length === 0) {
    console.log('No hay extensiones en la lista de ignoradas.')
  } else {
    console.log('Extensiones ignoradas:')
    ignoreExtensions.forEach(e => console.log('  -', e))
  }
}

export function addFile(name) {
  if (!isValidName(name)) return console.error('Nombre de archivo inválido.')
  const cfg = loadConfig()
  if (!cfg.ignoreFiles.includes(name)) {
    cfg.ignoreFiles.push(name)
    saveConfig(cfg)
    console.log(`Archivo '${name}' añadido a ignorar.`)
  } else {
    console.log(`El archivo '${name}' ya estaba en la lista.`)
  }
}

export function removeFile(name) {
  const cfg = loadConfig()
  const idx = cfg.ignoreFiles.indexOf(name)
  if (idx !== -1) {
    cfg.ignoreFiles.splice(idx, 1)
    saveConfig(cfg)
    console.log(`Archivo '${name}' eliminado de ignorar.`)
  } else {
    console.log(`El archivo '${name}' no estaba en la lista.`)
  }
}

export function viewFiles() {
  const { ignoreFiles } = loadConfig()
  if (ignoreFiles.length === 0) {
    console.log('No hay archivos en la lista de ignorados.')
  } else {
    console.log('Archivos ignorados:')
    ignoreFiles.forEach(f => console.log('  -', f))
  }
}

export function generate(mdFile, dest) {
  try {
    const abs = generateFromFile(mdFile, dest || process.cwd())
    console.log(`Estructura generada en: ${abs}`)
  } catch (e) {
    console.error('Error al generar estructura:', e.message)
  }
}
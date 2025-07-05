// lib/config.js

import fs from 'fs'
import path from 'path'

// Nombre del archivo de configuración en la raíz del proyecto
const CONFIG_NAME = 'skelfolder.config.json'
// Ruta absoluta al archivo de configuración
const CONFIG_PATH = path.join(process.cwd(), CONFIG_NAME)

// Valores por defecto si no existe el archivo o está corrupto
const DEFAULT_CONFIG = {
  ignoreFolders: ['.git', 'node_modules'],
  ignoreExtensions: [],
  ignoreFiles: []
}

/**
 * Carga la configuración desde skelfolder.config.json.
 * Si no existe o está corrupto, crea uno nuevo con defaults.
 * Realiza merge con DEFAULT_CONFIG para garantizar todas las claves.
 * @returns {{ignoreFolders: string[], ignoreExtensions: string[], ignoreFiles: string[]}}
 */
export function loadConfig() {
  if (!fs.existsSync(CONFIG_PATH)) {
    saveConfig(DEFAULT_CONFIG)
    return { ...DEFAULT_CONFIG }
  }

  try {
    const content = fs.readFileSync(CONFIG_PATH, 'utf-8')
    const parsed = JSON.parse(content)

    // Merge con valores por defecto
    const merged = {
      ignoreFolders: Array.isArray(parsed.ignoreFolders)
        ? parsed.ignoreFolders
        : DEFAULT_CONFIG.ignoreFolders,
      ignoreExtensions: Array.isArray(parsed.ignoreExtensions)
        ? parsed.ignoreExtensions
        : DEFAULT_CONFIG.ignoreExtensions,
      ignoreFiles: Array.isArray(parsed.ignoreFiles)
        ? parsed.ignoreFiles
        : DEFAULT_CONFIG.ignoreFiles
    }

    // Si faltaba alguna clave o estaba mal, actualizamos el archivo
    if (
      merged.ignoreFolders !== parsed.ignoreFolders ||
      merged.ignoreExtensions !== parsed.ignoreExtensions ||
      merged.ignoreFiles !== parsed.ignoreFiles
    ) {
      saveConfig(merged)
    }

    return merged
  } catch {
    // JSON corrupto: reescribimos con defaults
    saveConfig(DEFAULT_CONFIG)
    return { ...DEFAULT_CONFIG }
  }
}

/**
 * Guarda el objeto de configuración en skelfolder.config.json.
 * @param {{ignoreFolders: string[], ignoreExtensions: string[], ignoreFiles: string[]}} cfg
 */
export function saveConfig(cfg) {
  const json = JSON.stringify(cfg, null, 2)
  fs.writeFileSync(CONFIG_PATH, json, 'utf-8')
}

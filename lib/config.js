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
  ignoreExtensions: []
}

/**
 * Carga la configuración desde skelfolder.config.json.
 * Si no existe o está corrupto, crea uno nuevo con defaults.
 * @returns {object} Configuración con ignoreFolders e ignoreExtensions
 */
export function loadConfig() {
  if (!fs.existsSync(CONFIG_PATH)) {
    // Si no existe, guardamos la config por defecto y la retornamos
    saveConfig(DEFAULT_CONFIG)
    return { ...DEFAULT_CONFIG }
  }

  try {
    // Intentamos parsear el JSON existente
    const content = fs.readFileSync(CONFIG_PATH, 'utf-8')
    return JSON.parse(content)
  } catch {
    // Si falla, reescribimos con defaults y devolvemos defaults
    saveConfig(DEFAULT_CONFIG)
    return { ...DEFAULT_CONFIG }
  }
}

/**
 * Guarda el objeto de configuración en skelfolder.config.json.
 * @param {Object} cfg Objeto con ignoreFolders e ignoreExtensions
 */
export function saveConfig(cfg) {
  const json = JSON.stringify(cfg, null, 2)
  fs.writeFileSync(CONFIG_PATH, json, 'utf-8')
}

import fs from 'fs'
import path from 'path'
import { ensureConfigFile, mergeConfig } from '../utils/fs.js'

const CONFIG_NAME = 'skelfolder.config.json'
const CONFIG_PATH = path.join(process.cwd(), CONFIG_NAME)

export const DEFAULT_CONFIG = {
  ignoreFolders: ['.git', 'node_modules'],
  ignoreExtensions: [],
  ignoreFiles: ['skelfolder.config.json', 'package-lock.json', 'yarn.lock'],
}

/**
 * Carga la configuración, la valida y la mergea con los defaults.
 */
export function loadConfig() {
  ensureConfigFile(CONFIG_PATH, DEFAULT_CONFIG)
  try {
    const content = fs.readFileSync(CONFIG_PATH, 'utf-8')
    const parsed = JSON.parse(content)
    const merged = mergeConfig(parsed, DEFAULT_CONFIG)
    if (JSON.stringify(parsed) !== JSON.stringify(merged)) {
      saveConfig(merged)
    }
    return merged
  } catch (e) {
    saveConfig(DEFAULT_CONFIG)
    return { ...DEFAULT_CONFIG }
  }
}

/**
 * Guarda la configuración.
 */
export function saveConfig(cfg) {
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(cfg, null, 2), 'utf-8')
}
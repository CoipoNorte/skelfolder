import fs from 'fs'

/**
 * Asegura que el archivo de configuración exista.
 */
export function ensureConfigFile(path, defaults) {
  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, JSON.stringify(defaults, null, 2), 'utf-8')
  }
}

/**
 * Mergea la config leída con los defaults.
 */
export function mergeConfig(cfg, defaults) {
  return {
    ignoreFolders: Array.isArray(cfg.ignoreFolders) ? cfg.ignoreFolders : defaults.ignoreFolders,
    ignoreExtensions: Array.isArray(cfg.ignoreExtensions) ? cfg.ignoreExtensions : defaults.ignoreExtensions,
    ignoreFiles: Array.isArray(cfg.ignoreFiles) ? cfg.ignoreFiles : defaults.ignoreFiles
  }
}
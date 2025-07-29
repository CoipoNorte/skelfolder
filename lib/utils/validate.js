/**
 * Valida nombres de archivos/carpetas.
 */
export function isValidName(name) {
  if (!name) return false
  if (name === '...') return false
  if (name.startsWith('…')) return false
  if (name.startsWith('#')) return false
  // + + +
  return true
}
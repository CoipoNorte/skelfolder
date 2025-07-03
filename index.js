// index.js
import fs from 'fs';
import path from 'path';
import { getStructure } from './lib/tree.js';

/**
 * Muestra la estructura de carpetas en consola.
 * @param {string} root Ruta del directorio
 */
export function read(root) {
  const tree = getStructure(root);
  console.log(tree);
}

/**
 * Guarda la estructura de carpetas en un archivo Markdown.
 * @param {string} root Ruta del directorio
 * @param {string} filename Nombre de archivo de salida
 */
export function save(root, filename = 'STRUCTURE.md') {
  const tree = getStructure(root);
  const markdown = '```plaintext\n' + tree + '\n```';
  const dest = path.join(root, filename);
  fs.writeFileSync(dest, markdown, 'utf-8');
  console.log(`Estructura guardada en ${filename}`);
}

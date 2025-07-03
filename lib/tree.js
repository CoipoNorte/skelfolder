// lib/tree.js
import fs from 'fs';
import path from 'path';

/**
 * Recorre un directorio y construye líneas de árbol ASCII.
 * @param {string} dirPath Ruta del directorio
 * @param {string} prefix Prefijo ASCII para sangría
 * @returns {string[]} Array de líneas con la estructura
 */
function buildTree(dirPath, prefix = '') {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const lines = [];

  entries.forEach((entry, index) => {
    const isLast = index === entries.length - 1;
    const pointer = isLast ? '└── ' : '├── ';
    const newPrefix = prefix + (isLast ? '    ' : '│   ');
    lines.push(prefix + pointer + entry.name);

    if (entry.isDirectory()) {
      const childPath = path.join(dirPath, entry.name);
      lines.push(...buildTree(childPath, newPrefix));
    }
  });

  return lines;
}

/**
 * Obtiene la estructura completa del árbol a partir de un root.
 * @param {string} root Directorio raíz (por defecto cwd)
 * @returns {string} Árbol ASCII como string
 */
export function getStructure(root = process.cwd()) {
  const baseName = path.basename(root);
  const header = [baseName];
  const body = buildTree(root);
  return header.concat(body).join('\n');
}

#!/usr/bin/env node

import { Command } from 'commander'
import {
  read,
  save,
  addFolder,
  removeFolder,
  addExtension,
  removeExtension,
  viewFolders,
  viewExtensions,
  generate,
  addFile,
  removeFile,
  viewFiles
} from '../index.js'

import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

// Resolver __dirname en ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Cargar versión desde package.json
const pkg = JSON.parse(
  readFileSync(resolve(__dirname, '../package.json'), 'utf-8')
)
const { version } = pkg

const program = new Command()

program
  .name('skelfolder')
  .description('Lee la estructura de carpetas y la muestra o guarda en Markdown')
  .version(version, '-V, --version', 'Muestra la versión de skelfolder')

program
  .command('read [dir]')
  .description('Muestra el árbol de carpetas en consola')
  .action(dir => {
    read(dir || process.cwd())
  })

program
  .command('save [dir]')
  .description('Guarda el árbol de carpetas en STRUCTURE.md')
  .action(dir => {
    save(dir || process.cwd())
  })

program
  .command('af <folder>')
  .description('Añade una carpeta a la lista de carpetas ignoradas')
  .action(addFolder)

program
  .command('rf <folder>')
  .description('Elimina una carpeta de la lista de carpetas ignoradas')
  .action(removeFolder)

program
  .command('vf')
  .description('Muestra la lista de carpetas ignoradas')
  .action(viewFolders)

program
  .command('ae <ext>')
  .description('Añade una extensión de archivo a la lista de ignoradas')
  .action(addExtension)

program
  .command('re <ext>')
  .description('Elimina una extensión de archivo de la lista de ignoradas')
  .action(removeExtension)

program
  .command('ve')
  .description('Muestra la lista de extensiones ignoradas')
  .action(viewExtensions)

program
  .command('generate <archivo.md> [dest]')
  .description('Genera carpetas y archivos según el árbol definido en un Markdown')
  .action(generate)

program
  .command('aa <file>')
  .description('Añade un archivo (por nombre) a la lista de ignorados')
  .action(addFile)

program
  .command('ra <file>')
  .description('Elimina un archivo de la lista de ignorados')
  .action(removeFile)

program
  .command('va')
  .description('Muestra la lista de archivos ignorados')
  .action(viewFiles)

program.parse(process.argv)

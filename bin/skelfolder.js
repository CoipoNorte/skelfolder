#!/usr/bin/env node

import { Command } from 'commander'
import * as cmds from '../lib/cli/commands.js'
import { helpText } from '../lib/cli/help.js'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const pkg = JSON.parse(readFileSync(resolve(__dirname, '../package.json'), 'utf-8'))
const { version } = pkg

const program = new Command()

program
  .name('skelfolder')
  .description('Lee la estructura de carpetas y la muestra o guarda en Markdown')
  .version(version, '-V, --version', 'Muestra la versión de skelfolder')

program
  .command('read [dir]')
  .description('Muestra el árbol de carpetas en consola')
  .action(cmds.read)

program
  .command('save [dir]')
  .description('Guarda el árbol de carpetas en STRUCTURE.md')
  .action(cmds.save)

program
  .command('af <folder>')
  .description('Añade una carpeta a la lista de carpetas ignoradas')
  .action(cmds.addFolder)

program
  .command('rf <folder>')
  .description('Elimina una carpeta de la lista de carpetas ignoradas')
  .action(cmds.removeFolder)

program
  .command('vf')
  .description('Muestra la lista de carpetas ignoradas')
  .action(cmds.viewFolders)

program
  .command('ae <ext>')
  .description('Añade una extensión de archivo a la lista de ignoradas')
  .action(cmds.addExtension)

program
  .command('re <ext>')
  .description('Elimina una extensión de archivo de la lista de ignoradas')
  .action(cmds.removeExtension)

program
  .command('ve')
  .description('Muestra la lista de extensiones ignoradas')
  .action(cmds.viewExtensions)

program
  .command('generate <archivo.md> [dest]')
  .description('Genera carpetas y archivos según el árbol definido en un Markdown')
  .action(cmds.generate)

program
  .command('aa <file>')
  .description('Añade un archivo (por nombre) a la lista de ignorados')
  .action(cmds.addFile)

program
  .command('ra <file>')
  .description('Elimina un archivo de la lista de ignorados')
  .action(cmds.removeFile)

program
  .command('va')
  .description('Muestra la lista de archivos ignorados')
  .action(cmds.viewFiles)

program.parse(process.argv)